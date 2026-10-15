import { useEffect, useState } from "react";
import { CartProvider } from "./state/cart.jsx";
import { products } from "./data/products.js";
import { WHATSAPP_NUMBER } from "./config.js";

const asset = (name) => import.meta.env.BASE_URL + "images/" + name;
const wa = (text) => "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
function readRoute() {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const [page, id] = raw.split("/");
  return { page: page || "home", id: id || "" };
}
function AppShell() {
  const [route, setRoute] = useState(readRoute);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const onHash = () => { setRoute(readRoute()); setMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const go = (page) => { window.location.hash = page === "home" ? "/" : "/" + page; };
  const selected = products.find((p) => p.id === route.id);
  const contact = wa("Hello AURAÈ, I'd like to enquire about the collection.");
  const enquiry = (p) => wa("Hello AURAÈ, I'm interested in " + p.name + ". Please confirm current price, available sizes and delivery details.");
  const title = ({home:"Wear your why.",shop:"The collection",collections:"Collections",lookbook:"Beyond the surface",about:"Dreams. Faith. You."})[route.page] || (selected?.name || "AURAÈ");
  return <div className="site">
    <div className="topline">DREAMS · FAITH · YOU <span>INDEPENDENT STREETWEAR</span></div>
    <header className="header">
      <a className="wordmark" href="#/">AURAÈ<span>+</span></a>
      <button className="menu-toggle glass" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? "CLOSE ×" : "MENU ☰"}</button>
      <nav className={menu ? "navlinks open" : "navlinks"}>
        {[["shop","SHOP"],["collections","COLLECTIONS"],["lookbook","LOOKBOOK"],["about","ABOUT"]].map(([p,label])=><a key={p} href={"#/"+p}>{label}</a>)}
      </nav>
      <a className="bag glass" href="#/shop">EXPLORE <span>↗</span></a>
    </header>
    <main key={route.page + route.id}>
      {route.page === "home" && <><section className="hero">
        <img src={asset("lookbook-1.png")} alt="" className="hero-bg" fetchPriority="high"/>
        <div className="hero-overlay"/>
        <div className="hero-copy"><p className="eyebrow">AURAÈ / COLLECTION 01</p><h1>WEAR<br/><i>YOUR WHY.</i></h1><p>For the ones with a bigger picture. Pieces that carry the dream, the faith, and the person you're becoming.</p><a className="pill primary" href="#/shop">ENTER THE WORLD <span>↗</span></a></div>
        <div className="hero-caption"><span>01 — THE VISION</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section><section className="manifesto"><p className="eyebrow">THE AURAÈ PHILOSOPHY</p><h2>Not just a fit.<br/><i>A point of view.</i></h2><p>Wear the reminder. Become the vision. Streetwear with a message that reaches beyond the fabric.</p><a className="textlink" href="#/about">OUR WORLD ↗</a></section>
      <section className="feature"><div><p className="eyebrow">THE FIRST DROP</p><h2>Pieces with<br/><i>purpose.</i></h2><p>Explore the graphics, textures and details behind AURAÈ.</p><a className="pill glass" href="#/shop">DISCOVER THE PIECES ↗</a></div><img src={asset("lookbook-2.png")} alt="AURAÈ campaign editorial" loading="lazy"/></section>
      <section className="closing"><p className="eyebrow">DREAMS · FAITH · YOU</p><h2>KEEP <i>BECOMING.</i></h2><a className="pill primary" href="#/collections">EXPLORE COLLECTIONS ↗</a></section></>}
      {route.page === "shop" && <section className="catalog"><p className="eyebrow">AURAÈ / THE PIECES</p><h1>THE <i>COLLECTION.</i></h1><p className="intro">Explore the current designs. Message us to confirm pricing, sizes and availability.</p><ProductGrid items={products} enquiry={enquiry}/></section>}
      {route.page === "collections" && <section className="catalog"><p className="eyebrow">CURATED BY AURAÈ</p><h1>FIND YOUR <i>WORLD.</i></h1><div className="collection-grid">{[["LET BE GOOD","Graphic essentials","longsleeve"],["FAITH COLLECTION","Dreams. Faith. You.","faith-hoodie"],["SIGNATURE PIECES","Everyday statements","aurae-tee"]].map(([name,desc,id])=><a className="collection-card" href={"#/product/"+id} key={name}><img src={asset(products.find(p=>p.id===id)?.thumbnail?.replace(/^.*images\//,"") || "lookbook-1.png")} alt=""/><span>{desc}</span><h2>{name}</h2><b>EXPLORE ↗</b></a>)}</div></section>}
      {route.page === "product" && selected && <section className="product-page"><div className="product-image"><img src={asset(selected.thumbnail.replace(/^.*images\//,""))} alt={selected.name}/></div><div className="product-info"><p className="eyebrow">{selected.category.toUpperCase()} / AURAÈ</p><h1>{selected.name}</h1><p className="product-tag">“{selected.tagline}”</p><p>{selected.description}</p><p className="notice">Contact us for current pricing, sizes and availability.</p><div className="sizes">{selected.sizes.length ? selected.sizes.map(s=><span key={s}>{s}</span>) : <span>ONE SIZE</span>}</div><a className="pill primary" href={enquiry(selected)} target="_blank" rel="noreferrer">ENQUIRE ON WHATSAPP ↗</a><a className="textlink" href="#/shop">← BACK TO THE COLLECTION</a></div></section>}
      {route.page === "lookbook" && <section className="catalog"><p className="eyebrow">AURAÈ / VISUAL DIARY</p><h1>BEYOND THE <i>SURFACE.</i></h1><p className="intro">A study in intention, expression and becoming.</p><div className="lookbook-grid"><img src={asset("lookbook-1.png")} alt="AURAÈ campaign, look one"/><img src={asset("lookbook-2.png")} alt="AURAÈ campaign, look two"/></div><p className="lookbook-note">DREAMS. FAITH. YOU. COLLECTION 01.</p></section>}
      {route.page === "about" && <section className="about-page"><p className="eyebrow">WHY AURAÈ EXISTS</p><h1>MADE FOR THE<br/><i>BECOMING.</i></h1><p>AURAÈ is independent streetwear built around a simple idea: what you wear can remind you who you are and where you're headed. Expressive pieces, confident graphics, and a message that reaches beyond the fabric.</p><p>Dreams are the vision. Faith is the anchor. You are the becoming.</p><a className="pill primary" href={contact} target="_blank" rel="noreferrer">TALK TO AURAÈ ↗</a></section>}
      {!["home","shop","collections","lookbook","about","product"].includes(route.page) && <section className="catalog"><h1>PAGE NOT FOUND.</h1><a className="pill primary" href="#/">RETURN HOME ↗</a></section>}
      {route.page === "product" && !selected && <section className="catalog"><h1>PIECE NOT FOUND.</h1><a className="pill primary" href="#/shop">BACK TO SHOP ↗</a></section>}
    </main>
    <footer className="footer"><a className="wordmark" href="#/">AURAÈ<span>+</span></a><p>DREAMS · FAITH · YOU</p><nav><a href="#/shop">SHOP</a><a href="#/lookbook">LOOKBOOK</a><a href="#/about">ABOUT</a><a href={contact} target="_blank" rel="noreferrer">CONTACT ↗</a></nav><small>© {new Date().getFullYear()} AURAÈ. ALL RIGHTS RESERVED.</small></footer>
  </div>;
}
function ProductGrid({items,enquiry}) { return <div className="product-grid">{items.map(p=><article className="product-card" key={p.id}><a href={"#/product/"+p.id} className="product-photo"><img src={p.thumbnail} alt={p.name} loading="lazy"/><span>VIEW PIECE ↗</span></a><div className="product-meta"><div><small>{p.category.toUpperCase()}</small><h2><a href={"#/product/"+p.id}>{p.name}</a></h2></div><a className="plus" href={enquiry(p)} target="_blank" rel="noreferrer" aria-label={"Enquire about "+p.name}>↗</a></div><p className="product-description">{p.description}</p><a className="textlink" href={enquiry(p)} target="_blank" rel="noreferrer">PRICE & AVAILABILITY ↗</a></article>)}</div>; }
export default function App() { return <CartProvider><AppShell/></CartProvider>; }
