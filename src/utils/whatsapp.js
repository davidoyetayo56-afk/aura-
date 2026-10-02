import { WHATSAPP_NUMBER, naira } from "../config";
// lines: [{name,size,qty,price}]
export function whatsappUrl(lines, total) {
  const body = lines.map((l, i) => `${i + 1}. ${l.name}${l.size ? ` — Size ${l.size}` : ""} — Qty ${l.qty} — ${naira(l.price)}`).join("\n");
  const msg = `Hello AURAE, I would like to place this order:\n\n${body}\n\nTotal: ${naira(total)}\n\nThank you.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
