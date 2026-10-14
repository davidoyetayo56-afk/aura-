import { useCart } from "../state/cart.jsx";
import { naira } from "../config.js";

export default function CartDrawer({ open, onClose }) {
  const { items, setQty, remove, total, url } = useCart();

  return (
    <>
      <button
        className={"drawer-scrim" + (open ? " visible" : "")}
        type="button"
        aria-label="Close shopping cart"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
      <aside
        className={"drawer" + (open ? " open" : "")}
        role="dialog"
        aria-modal={open}
        aria-hidden={!open}
        aria-label="Shopping cart"
      >
        <div className="row">
          <h3>YOUR CART <span className="cart-items-count">({items.reduce((sum, item) => sum + item.qty, 0)})</span></h3>
          <button className="ghost" type="button" onClick={onClose}>CLOSE ×</button>
        </div>

        <div className="drawer-items">
          {!items.length && <p className="dim cart-empty">Your cart is waiting for its first piece.</p>}
          {items.map((item) => (
            <div className="line" key={item.key}>
              <img src={item.product.thumbnail} alt={item.product.name} />
              <div>
                <b>{item.product.name}</b>
                <small>{item.size ? "Size " + item.size : "One size"} · {naira(item.product.price)}</small>
                <div className="qty">
                  <button type="button" aria-label={"Decrease " + item.product.name + " quantity"} onClick={() => setQty(item.key, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button type="button" aria-label={"Increase " + item.product.name + " quantity"} onClick={() => setQty(item.key, item.qty + 1)}>+</button>
                  <button className="ghost" type="button" onClick={() => remove(item.key)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="row"><span>Subtotal</span><b>{naira(total)}</b></div>
          <p>Delivery details can be confirmed directly with AURAÈ when placing your order.</p>
          <a
            className={"btn" + (items.length ? "" : " off")}
            href={items.length ? url : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!items.length}
            onClick={(event) => { if (!items.length) event.preventDefault(); }}
          >Order on WhatsApp <span aria-hidden="true">↗</span></a>
          <button className="continue-shopping" type="button" onClick={onClose}>Continue exploring</button>
        </div>
      </aside>
    </>
  );
}
