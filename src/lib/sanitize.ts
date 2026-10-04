/**
 * Input sanitisation for public forms. React escapes output by default; this adds a
 * second layer so stored/emailed data is clean: control characters and zero-width
 * characters removed, whitespace normalised, angle brackets stripped from short fields.
 */

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u2028\u2029\uFEFF]/g;

export function cleanText(input: unknown, { multiline = false } = {}): string {
  if (typeof input !== "string") return "";
  let s = input.normalize("NFC").replace(CONTROL_CHARS, "");
  s = s.replace(/<[^>]*>/g, ""); // drop HTML tags
  s = s.replace(/[<>]/g, "");
  if (multiline) {
    s = s.replace(/\r\n?/g, "\n").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n");
  } else {
    s = s.replace(/\s+/g, " ");
  }
  return s.trim();
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Reject header-injection attempts in single-line values that may reach email headers. */
export function hasLineBreaks(s: string): boolean {
  return /[\r\n]/.test(s);
}
