import { cn } from "../../lib/utils";

interface RichTextProps {
  html: string;
  className?: string;
}

/**
 * Renders admin-authored HTML (from the RichTextEditor) with brand-styled
 * typography. Content originates from authenticated admins only.
 */
export function RichText({ html, className }: RichTextProps) {
  return (
    <div
      className={cn("richtext", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
