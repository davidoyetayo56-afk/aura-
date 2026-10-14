import { useEffect, useState } from "react";
import { CartProvider, useCart } from "./state/cart.jsx";
import Showroom from "./components/Showroom.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import { WHATSAPP_NUMBER } from "./config.js";

const image = (name) => import.meta.env.BASE_URL + "images/" + name;

function Shell() {
  const [ready, setReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 1150);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setCartOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const contactUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent("Hello AURAÈ, I would like to know more about the collection.");
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className={"loader" + (ready ? " done" : "")} aria-hidden={ready}>
        <div className="loader-wordmark">AURA<span>È</span></div>
        <p>DREAMS · FAITH · YOU</p>
        <i />
      </div>

      <div className="announcement">
        <span>Dreams · Faith · You</span>
        <span className="announcement-divider">/</span>
        <a href="#showroom">Discover the collection <span aria-hidden="true">↗</span></a>
      </div>

      <header className="nav">
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
        <a className="logo" href="#home" aria-label="AURAÈ home">AURA<span>È</span></a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#showroom">The collection</a>
          <a href="#lookbook">Lookbook</a>
          <a href="#about">Our world</a>
        </nav>

        <div className="nav-actions">
          <a className="nav-contact" href={contactUrl} target="_blank" rel="noreferrer">Contact <span aria-hidden="true">↗</span></a>
          <button className="cart-trigger" type="button" onClick={() => setCartOpen(true)} aria-label={"Open shopping cart with " + count + " items"}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16l-1.3 12H5.3L4 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>
            <span>Bag <b>{count.toString().padStart(2, "0")}</b></span>
          </button>
        </div>
      </header>

      <div className={"mobile-menu" + (menuOpen ? " open" : "")} aria-hidden={!menuOpen}>
        <button className="mobile-menu-close" type="button" onClick={closeMenu} aria-label="Close navigation">Close ×</button>
        <nav aria-label="Mobile navigation">
          <a href="#showroom" onClick={closeMenu}>The collection <span>↗</span></a>
          <a href="#lookbook" onClick={closeMenu}>Lookbook <span>↗</span></a>
          <a href="#about" onClick={closeMenu}>Our world <span>↗</span></a>
          <a href={contactUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>Contact AURAÈ <span>↗</span></a>
        </nav>
        <p>Wear the reminder. Become the vision.</p>
      </div>

      <main id="home">
        <section className="hero" aria-labelledby="hero-title">
          <img className="hero-image" src={image("lookbook-1.png")} alt="AURAÈ streetwear campaign photograph" fetchPriority="high" />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow"><span /> AURAÈ / Independent streetwear</p>
            <h1 id="hero-title">Wear your<br /><em>why.</em></h1>
            <p className="hero-copy">For the ones with a bigger picture. Pieces that carry the dream, the faith, and the person you're becoming.</p>
            <div className="hero-actions">
              <a className="button button-light" href="#showroom">Explore the collection <span aria-hidden="true">↗</span></a>
              <a className="hero-text-link" href="#lookbook">Discover our world <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className="hero-foot"><span>Collection 01 — AURAÈ</span><span>01 / 03</span><span className="hero-scroll">Scroll to explore <i /></span></div>
        </section>

        <div className="brand-ribbon" aria-label="AURAÈ brand values">
          <div className="ribbon-track">
            {Array.from({ length: 3 }, (_, index) => (
              <span key={index}>DREAMS <i>✳</i> FAITH <i>✳</i> YOU <i>✳</i> KEEP BECOMING <i>✳</i></span>
            ))}
          </div>
        </div>

        <section className="manifesto" id="about">
          <div className="manifesto-index"><span>01</span><i /></div>
          <div className="manifesto-main">
            <p className="eyebrow">The AURAÈ philosophy</p>
            <h2>Not just a fit.<br />A <em>point of view.</em></h2>
          </div>
          <div className="manifesto-copy">
            <p>What you wear can remind you who you are and where you're headed. AURAÈ is streetwear built around that idea: expressive pieces, confident graphics, and a message that reaches beyond the fabric.</p>
            <a className="text-link" href="#lookbook">The story behind the pieces <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section className="lookbook" id="lookbook">
          <div className="lookbook-copy">
            <p className="eyebrow">AURAÈ / Visual diary</p>
            <h2>Made for the<br /><em>becoming.</em></h2>
            <p>Big dreams rarely arrive fully formed. They're built in the quiet decisions, the long days, and the choice to keep going. Wear the reminder.</p>
            <a className="button button-dark" href="#showroom">Find your piece <span aria-hidden="true">↗</span></a>
            <div className="lookbook-count"><span>THE LOOKBOOK</span><span>ISSUE Nº 001</span></div>
          </div>
          <div className="lookbook-images">
            <figure className="lookbook-image lookbook-image-main"><img src={image("lookbook-1.png")} alt="AURAÈ campaign look, collection one" loading="lazy" /><figcaption>01 / The vision</figcaption></figure>
            <figure className="lookbook-image lookbook-image-secondary"><img src={image("lookbook-2.png")} alt="AURAÈ streetwear styling detail" loading="lazy" /><figcaption>02 / The becoming</figcaption></figure>
            <span className="lookbook-stamp">A<span>È</span></span>
          </div>
        </section>

        <section className="shop-heading">
          <div><p className="eyebrow">The pieces / The possibilities</p><h2>Build your <em>look.</em></h2></div>
          <p>Choose your pieces. Style them on the 3D mannequin. When your look feels right, send your order straight to AURAÈ on WhatsApp.</p>
        </section>

        <Showroom />

        <section className="values-strip" aria-label="AURAÈ values">
          <article><span>01 / INTENTION</span><h3>Wear it with purpose.</h3><p>Pieces designed to carry a message, not just a logo.</p></article>
          <article><span>02 / EXPRESSION</span><h3>Your style. Your story.</h3><p>Make the fit your own, one considered piece at a time.</p></article>
          <article><span>03 / BECOMING</span><h3>Keep moving forward.</h3><p>A little reminder of the bigger picture, every day.</p></article>
        </section>

        <section className="closing-banner">
          <img src={image("lookbook-2.png")} alt="" loading="lazy" />
          <div className="closing-shade" />
          <div className="closing-content"><p className="eyebrow">This is only the beginning</p><h2>Keep <em>becoming.</em></h2><a className="button button-light" href="#showroom">Explore AURAÈ <span aria-hidden="true">↗</span></a></div>
          <span className="closing-signature">DREAMS · FAITH · YOU</span>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand"><a className="footer-logo" href="#home">AURA<span>È</span></a><p>Independent streetwear for the ones becoming who they were meant to be.</p><span className="footer-motto">DREAMS · FAITH · YOU</span></div>
          <div className="footer-column"><h3>Explore</h3><a href="#showroom">The collection</a><a href="#lookbook">Lookbook</a><a href="#about">Our philosophy</a></div>
          <div className="footer-column"><h3>Client care</h3><a href={contactUrl} target="_blank" rel="noreferrer">Orders & enquiries ↗</a><a href={contactUrl} target="_blank" rel="noreferrer">Delivery information ↗</a><a href={contactUrl} target="_blank" rel="noreferrer">Need a hand? ↗</a></div>
          <div className="footer-cta"><p>Have a question about a piece?</p><a className="text-link" href={contactUrl} target="_blank" rel="noreferrer">Talk to AURAÈ on WhatsApp <span aria-hidden="true">↗</span></a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} AURAÈ. All rights reserved.</span><a href="#home">Back to the top ↑</a><span>Built around dreams, faith & you.</span></div>
      </footer>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default function App() {
  return <CartProvider><Shell /></CartProvider>;
}
