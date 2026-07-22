export function cn(
  ...values: Array<string | number | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}

/**
 * True for links that should be rendered as a plain <a> rather than a
 * react-router <Link> (absolute URLs, mailto:, tel:, and hash anchors).
 */
export function isExternalUrl(to: string): boolean {
  return /^(https?:)?\/\//i.test(to) || /^(mailto:|tel:|#)/i.test(to);
}

/** Convert an arbitrary title into a URL-safe slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
