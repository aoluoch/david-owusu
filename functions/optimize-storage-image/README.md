# Optimize Storage Image

Appwrite Function that compresses newly uploaded media-bucket images.

It is designed to run after an image is uploaded to Appwrite Storage. The
function downloads the new file, converts supported image formats to WebP,
and recreates the file with the same Appwrite file ID so existing public URLs
continue to work.

## Supported Formats

- JPEG
- PNG
- AVIF
- TIFF

WebP, SVG, GIF, and unknown file types are skipped.

## Environment Variables

Set these on the Appwrite Function:

```bash
APPWRITE_API_KEY=server_api_key_with_storage_read_update_delete_permissions
APPWRITE_BUCKET_ID=media
OPTIMIZE_MAX_WIDTH=2200
OPTIMIZE_WEBP_QUALITY=82
OPTIMIZE_MIN_SAVINGS_RATIO=0.08
```

Appwrite usually provides these automatically inside the Function runtime:

```bash
APPWRITE_FUNCTION_API_ENDPOINT
APPWRITE_FUNCTION_PROJECT_ID
```

If your runtime does not provide them, set:

```bash
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your_project_id
```

## Deploy

1. Create a Node.js Appwrite Function with this folder as the source.
2. Set the entrypoint to:

```bash
src/main.js
```

3. Add the environment variables above.
4. Add a Storage file-create event trigger for the `media` bucket.
5. Deploy the function.

You can also invoke it manually for a single file:

```json
{
  "bucketId": "media",
  "fileId": "your_file_id"
}
```

## Notes

- The file ID is preserved, so URLs produced by the website remain valid.
- The replacement upload creates a WebP file. The next storage event is skipped
  because WebP is already optimized by this function.
- Files are only replaced when the optimized version saves at least
  `OPTIMIZE_MIN_SAVINGS_RATIO` storage. The default is `0.08`, meaning 8%.
