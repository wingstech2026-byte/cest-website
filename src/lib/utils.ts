export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Renders text, turning any "[PLACEHOLDER]" tokens into data for <Rich>. */
export function splitPlaceholders(text: string): Array<{ text: string; placeholder: boolean }> {
  const out: Array<{ text: string; placeholder: boolean }> = [];
  const re = /\[[^\]]+\]/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ text: text.slice(last, i), placeholder: false });
    out.push({ text: m[0], placeholder: true });
    last = i + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last), placeholder: false });
  return out;
}

export function whatsappLink(number: string, message?: string) {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
