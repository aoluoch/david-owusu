import { Client, Permission, Role, Storage } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import sharp from "sharp";

const DEFAULT_BUCKET_ID = "media";
const MAX_WIDTH = Number(process.env.OPTIMIZE_MAX_WIDTH ?? 2200);
const WEBP_QUALITY = Number(process.env.OPTIMIZE_WEBP_QUALITY ?? 82);
const MIN_SAVINGS_RATIO = Number(process.env.OPTIMIZE_MIN_SAVINGS_RATIO ?? 0.08);
const SUPPORTED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/avif",
  "image/tiff",
]);

function jsonResponse(res, status, body) {
  return res.json(body, status);
}

function parseBody(req) {
  if (req.bodyJson && typeof req.bodyJson === "object") return req.bodyJson;
  if (!req.body) return {};

  try {
    return JSON.parse(req.body);
  } catch {
    return {};
  }
}

function getAppwriteEnv() {
  const endpoint =
    process.env.APPWRITE_FUNCTION_API_ENDPOINT ??
    process.env.APPWRITE_ENDPOINT ??
    process.env.VITE_APPWRITE_ENDPOINT;
  const projectId =
    process.env.APPWRITE_FUNCTION_PROJECT_ID ??
    process.env.APPWRITE_PROJECT_ID ??
    process.env.VITE_APPWRITE_PROJECT_ID;
  const apiKey =
    process.env.APPWRITE_FUNCTION_API_KEY ?? process.env.APPWRITE_API_KEY;

  if (!endpoint || !projectId || !apiKey) {
    throw new Error(
      "Missing Appwrite endpoint, project ID, or function API key.",
    );
  }

  return { endpoint, projectId, apiKey };
}

function extractFileRef(payload) {
  const bucketId =
    payload.bucketId ??
    payload.bucketInternalId ??
    payload.bucket?.$id ??
    process.env.APPWRITE_BUCKET_ID ??
    process.env.VITE_APPWRITE_BUCKET_ID ??
    DEFAULT_BUCKET_ID;

  const fileId =
    payload.fileId ??
    payload.$id ??
    payload.file?.$id ??
    payload.file?.fileId ??
    payload.data?.$id;

  return { bucketId, fileId };
}

function optimizedName(name = "image") {
  const baseName = name.replace(/\.[^.]+$/, "") || "image";
  return `${baseName}.webp`;
}

async function optimizeBuffer(buffer) {
  return sharp(buffer, { animated: false })
    .rotate()
    .resize({
      width: MAX_WIDTH,
      height: MAX_WIDTH,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: WEBP_QUALITY,
      effort: 5,
      smartSubsample: true,
    })
    .toBuffer();
}

export default async ({ req, res, log, error }) => {
  try {
    const payload = parseBody(req);
    const { bucketId, fileId } = extractFileRef(payload);

    if (!fileId) {
      return jsonResponse(res, 400, {
        ok: false,
        message: "No file ID found in request payload.",
      });
    }

    const { endpoint, projectId, apiKey } = getAppwriteEnv();
    const client = new Client()
      .setEndpoint(endpoint)
      .setProject(projectId)
      .setKey(apiKey);
    const storage = new Storage(client);

    const file = await storage.getFile({ bucketId, fileId });
    const mimeType = String(file.mimeType ?? "").toLowerCase();
    const originalSize = Number(file.sizeOriginal ?? file.chunksTotal ?? 0);

    if (!SUPPORTED_MIME_TYPES.has(mimeType)) {
      log(`Skipped ${fileId}: unsupported mime type ${mimeType || "unknown"}.`);
      return jsonResponse(res, 200, {
        ok: true,
        skipped: true,
        reason: "unsupported-mime-type",
        mimeType,
      });
    }

    const download = await storage.getFileDownload({ bucketId, fileId });
    const inputBuffer = Buffer.from(download);
    const optimized = await optimizeBuffer(inputBuffer);
    const savedRatio = 1 - optimized.byteLength / inputBuffer.byteLength;

    if (savedRatio < MIN_SAVINGS_RATIO) {
      log(
        `Skipped ${fileId}: optimized file saved ${(savedRatio * 100).toFixed(
          1,
        )}%, below threshold.`,
      );
      return jsonResponse(res, 200, {
        ok: true,
        skipped: true,
        reason: "below-savings-threshold",
        originalBytes: inputBuffer.byteLength,
        optimizedBytes: optimized.byteLength,
      });
    }

    const permissions =
      Array.isArray(file.$permissions) && file.$permissions.length > 0
        ? file.$permissions
        : [Permission.read(Role.any())];

    await storage.deleteFile({ bucketId, fileId });
    await storage.createFile({
      bucketId,
      fileId,
      file: InputFile.fromBuffer(optimized, optimizedName(file.name)),
      permissions,
    });

    log(
      `Optimized ${fileId}: ${inputBuffer.byteLength} bytes -> ${optimized.byteLength} bytes.`,
    );
    return jsonResponse(res, 200, {
      ok: true,
      fileId,
      bucketId,
      originalBytes: originalSize || inputBuffer.byteLength,
      optimizedBytes: optimized.byteLength,
      savedRatio,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    error(message);
    return jsonResponse(res, 500, { ok: false, message });
  }
};
