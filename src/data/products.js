const img = (n) => `${import.meta.env.BASE_URL}images/${n}`;
const glb = (n) => `${import.meta.env.BASE_URL}models/${n}`;
// PUT REAL 3D FILES in /public/models/ using the names below.
// slot: top | bottom | accessory. Prices are PLACEHOLDERS — edit here.
export const MANNEQUIN_MODEL = glb("mannequin.glb");
export const products = [
 { id:"jersey-23", name:"AURAE 23 Jersey", category:"Jerseys", slot:"top", price:25000, tagline:"Same Dreams. Bigger Plans.", description:"Black mesh jersey with white piping, AURAE script and the 23 numeral front and back.", sizes:["S","M","L","XL","XXL"], model:glb("jersey-23.glb"), thumbnail:img("jersey.jpg"), color:"#101010", available:true },
 { id:"aurae-tee", name:"Oversized AURAE Tee", category:"T-Shirts", slot:"top", price:18000, tagline:"Bigger Dreams. Better Days.", description:"Washed black oversized tee. Small chest wordmark, crowned bear graphic on the back.", sizes:["S","M","L","XL","XXL"], model:glb("aurae-tee.glb"), thumbnail:img("tee.jpg"), color:"#17171a", available:true },
 { id:"faith-hoodie", name:"AURAE Faith Hoodie", category:"Hoodies", slot:"top", price:35000, tagline:"It's Not Luck. It's God.", description:"Washed black zip hoodie with the angel back print. Dreams • Faith • You.", sizes:["S","M","L","XL","XXL"], model:glb("faith-hoodie.glb"), thumbnail:img("hoodie.jpg"), color:"#131313", available:true },
 { id:"longsleeve", name:"AURAE Graphic Long Sleeve", category:"Long Sleeves", slot:"top", price:22000, tagline:"Let Be Good.", description:"Cream heavyweight long sleeve with tribal sleeve prints.", sizes:["S","M","L","XL"], model:glb("longsleeve.glb"), thumbnail:img("longsleeve.jpg"), color:"#d9d3c5", available:true },
 { id:"cargo-pants", name:"AURAE Cargo Pants", category:"Pants", slot:"bottom", price:30000, tagline:"Built for the plan.", description:"Washed black multi-pocket cargos with the AURAE star patch.", sizes:["S","M","L","XL","XXL"], model:glb("cargo-pants.glb"), thumbnail:img("accessories.jpg"), color:"#0d0d0e", available:true },
 { id:"aurae-cap", name:"AURAE Cap", category:"Accessories", slot:"accessory", price:8000, tagline:"Dreams • Faith • You", description:"Black embroidered cap.", sizes:[], model:glb("aurae-cap.glb"), thumbnail:img("accessories.jpg"), color:"#0a0a0a", available:true },
 { id:"aurae-beanie", name:"AURAE Beanie", category:"Accessories", slot:"accessory", price:7000, tagline:"Dreams • Faith • You", description:"Black embroidered beanie. (Add beanie.glb later.)", sizes:[], model:glb("beanie.glb"), thumbnail:img("accessories.jpg"), color:"#0a0a0a", available:true },
];
export const byId = Object.fromEntries(products.map((p) => [p.id, p]));
export const presets = [
 { name:"LOOK 01 · BLACK / WHITE", outfit:{ top:"jersey-23", bottom:"cargo-pants", accessory:null } },
 { name:"LOOK 02 · DREAMS", outfit:{ top:"aurae-tee", bottom:"cargo-pants", accessory:"aurae-cap" } },
 { name:"LOOK 03 · FAITH", outfit:{ top:"faith-hoodie", bottom:"cargo-pants", accessory:null } },
 { name:"LOOK 04 · EVERYDAY", outfit:{ top:"longsleeve", bottom:"cargo-pants", accessory:"aurae-beanie" } },
];
