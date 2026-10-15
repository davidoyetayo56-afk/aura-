import { useEffect, useState } from "react";
import { CartProvider, useCart } from "./state/cart.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import { products } from "./data/products.js";
import { WHATSAPP_NUMBER } from "./config.js";

const asset = (name) => import.meta.env.BASE_URL + "images/" + name;
const wa = (message) => "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
const contactUrl = wa("Hello AURAÈ, I'd like to enquire about the collection.");
const enquiryUrl = (product) => wa("Hello AURAÈ, I'm interested in " + product.name + ". Please confirm the current price, available sizes and delivery details.");

function readRoute() {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const [page, id] = raw.split("/");
  return { page: page || "home", id: id || "" };
}

function AppShell() {
  const [route, setRoute] = useState(readRoute);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { count, add } = useCart();
  const selected = products.find((product) => product.id === route.id);

  useEffect(() => {
    const syncRoute = () => {
      setRoute(readRoute());
      setMenuOpen(false);
      setCartOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  useEffect(() => {
    const pageNames = { home: "Dreams in Motion", shop: "The Collection", collections: "Collections", lookbook: "Lookbook", about: "Our Story", product: selected?.name || "The Piece" };
    document.title = "AURAÈ — " + (pageNames[route.page] || "Independent Streetwear");
  }, [route.page, selected?.name]);

  const addToBag = (product, size) => {
    add(product, size || "One size");
    setCartOpen(true);
  };

  return (
    <div className={"site" + (route.page === "home" ? " home-site" : "")}>
      <>
        <div className="topline"><span>DREAMS · FAITH · YOU</span></div>
        <header className="header">
          <a className="wordmark" href="#/" aria-label="AURAÈ home">AURAÈ<span>✳</span></a>
          <button className="menu-toggle glass" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen ? "×" : "☰"}</button>
          <nav className={"navlinks" + (menuOpen ? " open" : "")} aria-label="Main navigation">
            {[["shop","SHOP"],["collections","COLLECTIONS"],["lookbook","LOOKBOOK"],["about","ABOUT"]].map(([page,label]) =>
              <a key={page} className={route.page === page ? "active" : ""} href={"#/" + page}>{label}</a>
            )}
            <a href={contactUrl} target="_blank" rel="noreferrer">CONTACT</a>
          </nav>
          <button className="bag glass" type="button" onClick={() => setCartOpen(true)} aria-label={"Open bag with " + count + " items"}>BAG <span>{String(count).padStart(2,"0")}</span> ↗</button>
        </header>
      </>

      <main key={route.page + route.id}>
        {route.page === "home" && <HomePage onOpenBag={() => setCartOpen(true)} />}
        {route.page === "shop" && <section className="catalog">
          <p className="eyebrow">AURAÈ / COLLECTION 01</p>
          <h1>THE <i>PIECES.</i></h1>
          <p className="intro">Considered details. Statement graphics. Pieces made to mean something. Message us to confirm price, sizes and availability.</p>
          <ProductGrid items={products} addToBag={addToBag} />
        </section>}
        {route.page === "collections" && <CollectionsPage addToBag={addToBag} />}
        {route.page === "product" && selected && <ProductPage key={selected.id} product={selected} addToBag={addToBag} />}
        {route.page === "lookbook" && <LookbookPage />}
        {route.page === "about" && <AboutPage />}
        {![ "home", "shop", "collections", "lookbook", "about", "product" ].includes(route.page) &&
          <section className="catalog empty-state"><p className="eyebrow">AURAÈ</p><h1>THIS PAGE <i>ISN'T HERE.</i></h1><a className="pill primary" href="#/">RETURN HOME ↗</a></section>}
        {route.page === "product" && !selected &&
          <section className="catalog empty-state"><p className="eyebrow">AURAÈ</p><h1>PIECE <i>NOT FOUND.</i></h1><a className="pill primary" href="#/shop">BACK TO THE COLLECTION ↗</a></section>}
      </main>

      {route.page !== "home" && <Footer />}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

function HomePage({ onOpenBag }) {
  const tiles = [
    { n: "01", title: "SHOP", note: "NEW ARRIVALS", image: "hoodie.jpg", href: "#/shop" },
    { n: "02", title: "COLLECTIONS", note: "FIND YOUR PIECE", image: "jersey.jpg", href: "#/collections" },
    { n: "03", title: "LOOKBOOK", note: "THE AURAÈ WORLD", image: "longsleeve.jpg", href: "#/lookbook" },
    { n: "04", title: "OUR STORY", note: "DREAMS · FAITH · YOU", image: "tee.jpg", href: "#/about" }
  ];
  return <section className="home-hero home-premium-layout" aria-labelledby="campaign-title">
    <img className="home-premium-art" src={asset("aurae-campaign.svg")} alt="" fetchPriority="high" decoding="async" />
    <div className="home-premium-shade" aria-hidden="true" />
    <div className="home-premium-kicker">DREAMS. FAITH. YOU.</div>
    <div className="home-premium-copy">
      <p className="eyebrow">A DIFFERENT KIND OF STREETWEAR</p>
      <h1 id="campaign-title">AURAÈ</h1>
      <p className="home-premium-subtitle">SAME GIRL. BIGGER DREAMS.</p>
      <a className="home-premium-cta" href="#/collections">EXPLORE COLLECTIONS <span aria-hidden="true">↗</span></a>
    </div>
    <nav className="home-premium-tiles" aria-label="Explore AURAÈ">
      {tiles.map((tile) => <a className="home-premium-tile" href={tile.href} key={tile.n}>
        <img src={asset(tile.image)} alt="" loading="lazy" decoding="async" />
        <span className="home-premium-tile-shade" aria-hidden="true" />
        <span className="home-premium-tile-number">{tile.n}</span>
        <span className="home-premium-tile-copy"><strong>{tile.title}</strong><small>{tile.note}</small></span>
        <span className="home-premium-tile-arrow" aria-hidden="true">↗</span>
      </a>)}
    </nav>
    <button className="home-premium-bag" type="button" onClick={onOpenBag} aria-label="Open shopping bag">
      BAG <span aria-hidden="true">↗</span>
    </button>
  </section>;
}

function HomeFooter() {
  return <footer className="home-reference-footer">
    <a href="#/shop" className="home-footer-search"><span aria-hidden="true">⌕</span> SEARCH</a>
    <small>© 2026 AURAÈ. ALL RIGHTS RESERVED.</small>
    <div className="home-footer-links">
      <a href="#/lookbook" aria-label="View AURAÈ lookbook"><span aria-hidden="true">◎</span> INSTAGRAM</a>
      <a href={contactUrl} target="_blank" rel="noreferrer"><span aria-hidden="true">◉</span> WHATSAPP</a>
    </div>
  </footer>;
}

function ProductGrid({ items, addToBag }) {
  return <div className="product-grid">{items.map((product, index) =>
    <article className="product-card" key={product.id}>
      <a className="product-photo" href={"#/product/" + product.id} aria-label={"View " + product.name}>
        <img src={product.thumbnail} alt={product.name} loading={index < 2 ? "eager" : "lazy"} decoding="async"/>
        <span className="photo-index">{String(index + 1).padStart(2,"0")}</span>
        <span className="view-piece">VIEW PIECE ↗</span>
      </a>
      <div className="product-meta">
        <div><small>{product.category.toUpperCase()}</small><h2><a href={"#/product/" + product.id}>{product.name}</a></h2></div>
        <button className="plus" type="button" onClick={() => addToBag(product, product.sizes[0] || "One size")} aria-label={"Add " + product.name + " to bag"}>＋</button>
      </div>
      <p className="product-description">{product.description}</p>
      <a className="textlink" href={"#/product/" + product.id}>DETAILS & SIZING ↗</a>
    </article>
  )}</div>;
}

function CollectionsPage({ addToBag }) {
  const collections = [
    { id: "longsleeve", name: "LET BE GOOD", desc: "A soft canvas for a strong message." },
    { id: "faith-hoodie", name: "DREAMS · FAITH · YOU", desc: "Statement graphics, grounded in faith." },
    { id: "jersey-23", name: "SAME DREAMS. BIGGER PLANS.", desc: "The black-and-white signature jersey." },
    { id: "cargo-pants", name: "BUILT FOR THE PLAN", desc: "Utility shapes for everyday movement." },
    { id: "aurae-cap", name: "THE SIGNATURE", desc: "Small details. Clear intention." },
    { id: "aurae-beanie", name: "EVERYDAY ESSENTIALS", desc: "A simple mark, worn your way." }
  ];
  return <section className="catalog">
    <p className="eyebrow">CURATED BY AURAÈ</p><h1>FIND YOUR <i>WORLD.</i></h1>
    <p className="intro">Different pieces. One point of view. Explore the designs and ask us about the current drop.</p>
    <div className="collection-grid">{collections.map((collection) => {
      const product = products.find((item) => item.id === collection.id);
      if (!product) return null;
      return <article className="collection-card" key={collection.id}>
        <a className="collection-main" href={"#/product/" + collection.id} aria-label={"View " + product.name}>
          <div className="collection-image"><img src={product.thumbnail} alt={product.name} loading="lazy" decoding="async"/><span>EXPLORE ↗</span></div>
          <span className="collection-desc">{collection.desc}</span><h2>{collection.name}</h2>
        </a>
        <div className="collection-card-actions">
          <a className="textlink" href={"#/product/" + collection.id}>VIEW PIECE ↗</a>
          <button className="collection-add glass" type="button" onClick={() => addToBag(product, product.sizes[0] || "One size")} aria-label={"Add " + product.name + " to bag"}>
            ADD TO BAG <span aria-hidden="true">＋</span>
          </button>
        </div>
      </article>;
    })}</div>
  </section>;
}

function ProductPage({ product, addToBag }) {
  const [size, setSize] = useState(product.sizes[0] || "One size");
  const [notice, setNotice] = useState(false);
  return <section className="product-page">
    <div className="product-image"><img src={product.thumbnail} alt={product.name + " design reference, including the visible front and back"} fetchPriority="high" decoding="async"/></div>
    <div className="product-info">
      <p className="eyebrow">{product.category.toUpperCase()} / AURAÈ</p>
      <h1>{product.name}</h1>
      <p className="product-tag">“{product.tagline}”</p>
      <p>{product.description}</p>
      <div className="notice"><span className="notice-dot"/> Current pricing and availability are confirmed with AURAÈ before an order is finalised.</div>
      <div className="size-block"><span className="eyebrow">SELECT SIZE</span><div className="sizes">{product.sizes.length ? product.sizes.map((option) =>
        <button className={size === option ? "size-option selected" : "size-option"} type="button" key={option} onClick={() => { setSize(option); setNotice(false); }}>{option}</button>
      ) : <span className="size-option selected">ONE SIZE</span>}</div></div>
      <div className="product-actions">
        <button className="pill primary add-button" type="button" onClick={() => { addToBag(product, size); setNotice(true); }}>ADD TO BAG <span>＋</span></button>
        <a className="pill outline" href={enquiryUrl(product)} target="_blank" rel="noreferrer">ASK ABOUT THIS PIECE ↗</a>
      </div>
      {notice && <p className="added-note" role="status">Added to your bag. You can keep exploring or send your selection to AURAÈ on WhatsApp.</p>}
      <a className="textlink" href="#/shop">← BACK TO THE COLLECTION</a>
    </div>
  </section>;
}

function LookbookPage() {
  return <section className="catalog">
    <p className="eyebrow">AURAÈ / VISUAL DIARY</p><h1>BEYOND THE <i>SURFACE.</i></h1>
    <p className="intro">A study in intention, expression and becoming. The pieces, seen up close.</p>
    <div className="lookbook-grid">
      <figure><img src={asset("lookbook-1.png")} alt="AURAÈ editorial campaign look one" loading="lazy" decoding="async"/><figcaption>01 / THE VISION</figcaption></figure>
      <figure><img src={asset("lookbook-2.png")} alt="AURAÈ editorial campaign look two" loading="lazy" decoding="async"/><figcaption>02 / THE BECOMING</figcaption></figure>
    </div>
    <p className="lookbook-note">DREAMS · FAITH · YOU — COLLECTION 01.</p>
  </section>;
}

function AboutPage() {
  return <section className="about-page">
    <p className="eyebrow">WHY AURAÈ EXISTS</p>
    <h1>MADE FOR<br/><i>THE BECOMING.</i></h1>
    <p>AURAÈ is independent streetwear built around a simple idea: what you wear can remind you who you are and where you are headed.</p>
    <p>Dreams are the vision. Faith is the anchor. You are the becoming. Every print and every detail is a small reminder to move with intention.</p>
    <a className="pill primary" href={contactUrl} target="_blank" rel="noreferrer">TALK TO AURAÈ ↗</a>
  </section>;
}

function Footer() {
  return <footer className="footer">
    <div className="footer-main"><a className="wordmark" href="#/">AURAÈ<span>✳</span></a><p>DREAMS. FAITH. YOU.</p><a className="footer-contact" href={contactUrl} target="_blank" rel="noreferrer">HAVE A QUESTION? SAY HELLO ↗</a></div>
    <nav className="footer-nav"><a href="#/shop">SHOP</a><a href="#/collections">COLLECTIONS</a><a href="#/lookbook">LOOKBOOK</a><a href="#/about">OUR STORY</a></nav>
    <small>© {new Date().getFullYear()} AURAÈ. ALL RIGHTS RESERVED.</small>
  </footer>;
}

export default function App() {
  return <CartProvider><AppShell/></CartProvider>;
}
