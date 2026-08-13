import { useRef, useState } from "react";
import { ImageUp, Loader2 } from "lucide-react";
import { uploadMedia } from "../../lib/api";
import { isAppwriteConfigured } from "../../lib/appwrite";
import { hasMediaUrl } from "../../lib/utils";
import { Input } from "./ui";

interface MediaInputProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

/**
 * Image field: paste a URL directly, or upload a file to the Appwrite media
 * bucket (which stores the returned public URL).
 */
export function MediaInput({ value, onChange, placeholder }: MediaInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const url = await uploadMedia(file);
      onChange(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? "https://… or upload"}
        />
        <button
          type="button"
          disabled={uploading || !isAppwriteConfigured}
          onClick={() => inputRef.current?.click()}
          title={
            isAppwriteConfigured
              ? "Upload image"
              : "Configure Appwrite to enable uploads"
          }
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-gray-300 px-3 text-sm font-semibold text-slate-700 transition hover:bg-gray-50 disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <ImageUp size={16} />
          )}
          Upload
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {hasMediaUrl(value) && (
        <img
          src={value}
          alt="preview"
          className="mt-3 h-28 w-auto rounded-lg border border-gray-100 object-cover"
        />
      )}
    </div>
  );
}
