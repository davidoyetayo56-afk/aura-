import { createContext, useContext, useState, useMemo } from "react";
import { whatsappUrl } from "../utils/whatsapp";
const Ctx = createContext(null);
export const useCart = () => useContext(Ctx);
export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // {key,product,size,qty}
  const add = (product, size) => setItems((c) => {
    const key = product.id + "|" + (size || "");
    return c.find((i) => i.key === key) ? c.map((i) => i.key === key ? { ...i, qty: i.qty + 1 } : i) : [...c, { key, product, size, qty: 1 }];
  });
  const setQty = (key, q) => setItems((c) => c.map((i) => i.key === key ? { ...i, qty: Math.max(1, q) } : i));
  const remove = (key) => setItems((c) => c.filter((i) => i.key !== key));
  const v = useMemo(() => {
    const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);
    const url = whatsappUrl(items.map((i) => ({ name: i.product.name, size: i.size, qty: i.qty, price: i.product.price })), total);
    return { items, add, setQty, remove, total, count: items.reduce((s, i) => s + i.qty, 0), url };
  }, [items]);
  return <Ctx.Provider value={v}>{children}</Ctx.Provider>;
}
