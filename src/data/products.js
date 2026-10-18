const img = (name) => `${import.meta.env.BASE_URL}images/${name}`;
const glb = (name) => `${import.meta.env.BASE_URL}models/${name}`;

// Current Collection 01 mannequin photography. Prices stay unconfirmed until AURAÈ sets them.
export const MANNEQUIN_MODEL = glb("mannequin.glb");
export const products = [
  {
    id: "spider-shorts",
    name: "AURAÈ Spider Shorts",
    category: "Shorts",
    slot: "bottom",
    price: null,
    tagline: "Details that move differently.",
    description: "Light grey relaxed-fit shorts with the AURAÈ waistband, white drawstrings, statement spider graphic and signature script.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    model: glb("spider-shorts.glb"),
    thumbnail: img("aurae-spider-shorts.webp"),
    color: "#d4d4d3",
    available: true
  },
  {
    id: "thorn-shirt",
    name: "AURAÈ Thorn Shirt",
    category: "Shirts",
    slot: "top",
    price: null,
    tagline: "Make your mark.",
    description: "Red short-sleeve button-up with black thorn-inspired front artwork, AURAÈ wordmark and a matching statement back graphic.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    model: glb("thorn-shirt.glb"),
    thumbnail: img("aurae-thorn-shirt.webp"),
    color: "#c51e22",
    available: true
  },
  {
    id: "money-maker-tee",
    name: "AURAÈ Money Maker Tee",
    category: "T-Shirts",
    slot: "top",
    price: null,
    tagline: "Work for what you envision.",
    description: "Oversized black tee with red AURAÈ lettering and a bold Money Maker graphic across the back.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    model: glb("money-maker-tee.glb"),
    thumbnail: img("aurae-money-maker-tee.webp"),
    color: "#111111",
    available: true
  }
];

export const byId = Object.fromEntries(products.map((product) => [product.id, product]));

export const presets = [
  { name: "LOOK 01 · SPIDER SHORTS", outfit: { top: null, bottom: "spider-shorts", accessory: null } },
  { name: "LOOK 02 · THORN", outfit: { top: "thorn-shirt", bottom: null, accessory: null } },
  { name: "LOOK 03 · MONEY MAKER", outfit: { top: "money-maker-tee", bottom: null, accessory: null } }
];
