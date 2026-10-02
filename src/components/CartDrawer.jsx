import { useCart } from "../state/cart.jsx";
import { naira } from "../config";
export default function CartDrawer({ open, onClose }) {
  const { items, setQty, remove, total, url } = useCart();
  return (<aside className={"drawer" + (open ? " open" : "")}>
    <div className="row"><h3>YOUR CART</h3><button className="ghost" onClick={onClose}>CLOSE</button></div>
    {!items.length && <p className="dim">Your cart is empty.</p>}
    {items.map((i) => (<div className="line" key={i.key}>
      <img src={i.product.thumbnail} alt="" />
      <div><b>{i.product.name}</b><small>{i.size ? "Size " + i.size : "One size"} · {naira(i.product.price)}</small>
        <div className="qty"><button onClick={() => setQty(i.key, i.qty - 1)}>−</button>{i.qty}<button onClick={() => setQty(i.key, i.qty + 1)}>+</button>
          <button className="ghost" onClick={() => remove(i.key)}>REMOVE</button></div></div></div>))}
    <div className="row"><span>TOTAL</span><b>{naira(total)}</b></div>
    <button className="ghost" onClick={onClose}>CONTINUE SHOPPING</button>
    <a className={"btn" + (items.length ? "" : " off")} href={items.length ? url : undefined} target="_blank" rel="noreferrer">ORDER CART ON WHATSAPP</a>
  </aside>);
}
