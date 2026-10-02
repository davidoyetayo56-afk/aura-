import { useState, useEffect } from "react";
import { CartProvider, useCart } from "./state/cart.jsx";
import Showroom from "./components/Showroom.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
function Shell() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  useEffect(() => { const t = setTimeout(() => setReady(true), 1600); return () => clearTimeout(t); }, []);
  return (<>
    <div className={"loader" + (ready ? " done" : "")}><h1>AURAE</h1><p>DREAMS · FAITH · YOU</p><i /></div>
    <header className="nav">
      <b className="logo">AURAE</b>
      <nav><a href="#showroom">SHOP</a><a href="#showroom">COLLECTION</a><a href="#lookbook">LOOKBOOK</a><a href="#about">ABOUT</a></nav>
      <button className="ghost" onClick={() => setOpen(true)}>CART ({count})</button>
    </header>
    <Showroom />
    <CartDrawer open={open} onClose={() => setOpen(false)} />
  </>);
}
export default function App() { return <CartProvider><Shell /></CartProvider>; }
