// ═══════════════════════════════════════════════════════════════
//  Har material page ka content. Prices, products, text yahin badlo.
//  Naya product add karna? products[] me ek object add karo.
// ═══════════════════════════════════════════════════════════════
import { asset, video } from './site.js';

// Higgsfield remote filenames (Seedream 4.5 — cinematic dark)
const IMG = {
  candleMold:  "hf_20260905_141240_4d3ff7ce-825a-46a2-8fad-bb3bf1984af0.png",
  candle:      "hf_20260905_141240_8c55a42f-ef7d-4c14-ab6a-265941b92d4f.png",
  soap:        "hf_20260905_141240_d85649fa-8c7e-4df4-a784-a745e6f621a8.png",
  concrete:    "hf_20260905_141240_875068c4-8347-45f0-9442-fd4e8a93c35f.png",
  resin:       "hf_20260905_141240_ec9d52eb-d3b8-4311-97e1-9617674d5ec4.png",
  soapMold:    "hf_20260905_141240_5dac151b-a416-471b-ab0d-b3bccc1a6c06.png",
  concreteMold:"hf_20260905_141241_c9914772-ccd7-46e8-ae2b-3b087ab6b278.png",
  candleTrio:  "hf_20260905_141338_5887f33b-7cb4-4d83-9d84-74c7344b015a.png",
};
const VID = {
  rotate: "hf_20260824_035050_fc4dfd89-cdb1-4a4e-b5ef-4bfa6d5378b7.mp4",
  demold: "hf_20260905_103654_3226d0f5-524b-4a36-9d3c-722e3eb5f20f.mp4",
  range:  "hf_20260824_044007_8c4635fa-026f-48fd-a032-211a2a67a150.mp4",
  // per-material hero films (Seedance, dark cinematic)
  candleHero:   "hf_20260905_103654_3226d0f5-524b-4a36-9d3c-722e3eb5f20f.mp4", // ribbed demold
  soapHero:     "hf_20260906_062320_e0656fea-aced-46b0-9097-73bd87e7e7ba.mp4",
  concreteHero: "hf_20260906_062207_701857b8-fcd1-4aea-8305-30ebc9ba1dbb.mp4",
  resinHero:    "hf_20260906_062138_54a1abe1-18bd-4071-b8ca-65cc622e0335.mp4",
};

export const materialsContent = {
  candles: {
    label: "Candles",
    seoTitle: "Candle Molds — Custom Silicone Candle Molds in Delhi | Saancha",
    seoDesc: "Custom and ready-made silicone candle molds, made in Delhi. Pillars, tapers, fluted shapes. No minimum order, 5–7 day turnaround, fixed shelf prices.",
    heroVideo: video("candles-hero.mp4", VID.candleHero),
    heroPoster: asset("candle.png", IMG.candle),
    hero: "Candle molds, cast to your shape.",
    lede: "Ready-made silicone candle molds at fixed prices, or a custom mold built around your own design. Wax releases clean, every rib intact — pull after pull.",
    facts: [["No","Minimum order"],["5–7","Day custom build"],["100s","Pulls per mold"]],
    whyH: "Made for wax.",
    whyP: [
      "Candle wax needs a mold that flexes — pour hot, let it set, then peel the silicone back without chipping a single flute. Rigid molds fight you; ours release clean, batch after batch.",
      "Every ridge, taper and embossed mark on the master transfers exactly into the cavity, so the hundredth pour looks like the first."
    ],
    whyImg: asset("candle-trio.png", IMG.candleTrio),
    points: [
      ["Heat-stable silicone","Handles hot wax pours without warping."],
      ["Clean release","No sticking, no chipping on detailed flutes."],
      ["Repeatable","Hundreds of identical pulls from one mold."]
    ],
    uses: ["Pillar candles","Tapers","Ribbed & fluted","Sculptural shapes","Scented tins","Floating candles","Branded / embossed","Festival gifting"],
    products: [
      { name:"Ribbed Pillar", meta:"3 in · single cavity", price:"₹1,200", img: asset("candle.png", IMG.candle) },
      { name:"Fluted Cluster", meta:"multi-cavity set", price:"₹2,400", img: asset("candle-trio.png", IMG.candleTrio) },
      { name:"Tall Taper", meta:"pair mold", price:"₹950", img: asset("candle.png", IMG.candle) },
      { name:"Wide Pillar", meta:"4 in · single cavity", price:"₹1,450", img: asset("candle-mold.png", IMG.candleMold) },
    ],
    faq: [
      ["Will the wax stick to the mold?","No — flexible silicone releases wax cleanly once set. For very intricate shapes we add a light release step, which we explain on handover."],
      ["Can you match an existing candle I sell?","Yes. Send the physical candle or clear photos and we build the master to match, then cast the mold around it."],
      ["What wax types work?","Soy, paraffin, beeswax and blends all cast fine. Tell us which you use so we spec the right silicone hardness."]
    ],
  },

  soap: {
    label: "Soap & bath",
    seoTitle: "Soap Molds — Custom Silicone Soap & Bath Molds in Delhi | Saancha",
    seoDesc: "Custom and ready-made silicone soap and bath molds, made in Delhi. Faceted bars, embeds, bath bombs. Food- and cosmetic-grade options, no minimum order.",
    heroVideo: video("soap-hero.mp4", VID.soapHero),
    heroPoster: asset("soap.png", IMG.soap),
    hero: "Soap molds with crisp edges.",
    lede: "Ready-made soap and bath molds at fixed prices, or custom molds built around your bar. Sharp facets that stay defined through curing and clean release.",
    facts: [["No","Minimum order"],["5–7","Day custom build"],["Food","Safe options"]],
    whyH: "Crisp edges, every batch.",
    whyP: [
      "Cold-process and melt-and-pour soap both need sharp corners and a clean unmould. Our trays give you faceted edges that stay defined through curing, and a flex that pops bars out without cracking.",
      "Multi-cavity trays mean you cast a full batch in one pour — the same weight and shape every time."
    ],
    whyImg: asset("soap.png", IMG.soap),
    points: [
      ["Multi-cavity trays","Cast a whole batch in a single pour."],
      ["Sharp facets","Edges stay crisp through cure and release."],
      ["Skin-safe silicone","Food- and cosmetic-grade options available."]
    ],
    uses: ["Faceted bars","Round pucks","Embeds","Layered pours","Bath bombs","Shampoo bars","Guest soaps","Branded / logo"],
    products: [
      { name:"Faceted Bar", meta:"3 cavity tray", price:"₹1,100", img: asset("soap.png", IMG.soap) },
      { name:"Bar Trio", meta:"3 cavity", price:"₹1,300", img: asset("soap-mold.png", IMG.soapMold) },
      { name:"Round Puck", meta:"6 cavity tray", price:"₹1,500", img: asset("soap.png", IMG.soap) },
      { name:"Embed Block", meta:"single cavity", price:"₹900", img: asset("soap-mold.png", IMG.soapMold) },
    ],
    faq: [
      ["Is the silicone safe for skin products?","Yes — we offer food- and cosmetic-grade silicone for soap and bath. Tell us your process (CP / MP) and we spec accordingly."],
      ["Can you do a multi-cavity tray in my bar size?","Yes. Give us your bar weight and dimensions and we lay out a tray that casts them evenly."],
      ["Will bath-bomb molds work too?","Yes — round and custom bath-bomb molds are among our common soap-category requests."]
    ],
  },

  concrete: {
    label: "Concrete",
    seoTitle: "Concrete Molds — Silicone Molds for Planters & Homeware | Saancha",
    seoDesc: "Custom and ready-made two-part silicone molds for concrete planters, trays and homeware, made in Delhi. Handles undercuts and depth. No minimum order.",
    heroVideo: video("concrete-hero.mp4", VID.concreteHero),
    heroPoster: asset("concrete.png", IMG.concrete),
    hero: "Concrete molds, built for depth.",
    lede: "Ready-made concrete molds at fixed prices, or custom on request. Two-part silicone that survives rough mixes and releases a clean, smooth face.",
    facts: [["No","Minimum order"],["5–7","Day custom build"],["2-part","Undercut ready"]],
    whyH: "Built for weight and depth.",
    whyP: [
      "Concrete and plaster are heavy and unforgiving — a mold has to survive rough mixes and still release a clean face. Our two-part molds handle undercuts, deep vessels and faceted geometry that single molds cannot.",
      "The silicone takes the abrasion so your castings come out smooth, with crisp edges and no trapped air on the visible faces."
    ],
    whyImg: asset("concrete.png", IMG.concrete),
    points: [
      ["Two-part construction","Handles undercuts, deep and complex forms."],
      ["Abrasion-tough","Survives grit and rough concrete mixes."],
      ["Smooth faces","Clean visible surfaces, sharp edges."]
    ],
    uses: ["Planters","Trays","Coasters","Vases","Candle vessels","Homeware","Faceted geometry","Branded pieces"],
    products: [
      { name:"Hex Planter", meta:"5 in · two-part", price:"₹1,800", img: asset("concrete.png", IMG.concrete) },
      { name:"Faceted Pot", meta:"4 in · two-part", price:"₹1,650", img: asset("concrete-mold.png", IMG.concreteMold) },
      { name:"Trinket Tray", meta:"shallow single", price:"₹1,200", img: asset("concrete.png", IMG.concrete) },
      { name:"Tall Vessel", meta:"two-part", price:"₹2,100", img: asset("concrete-mold.png", IMG.concreteMold) },
    ],
    faq: [
      ["Can concrete molds handle undercuts?","Yes — that is exactly why we build them two-part. The mold splits to release shapes a rigid single mold would trap."],
      ["How long do concrete molds last?","With care, several hundred casts. Abrasive mixes shorten life; we advise on release agents to extend it."],
      ["Do you do large planters?","Yes, within reason — tell us the finished dimensions and we will confirm feasibility and price."]
    ],
  },

  resin: {
    label: "Resin",
    seoTitle: "Resin Molds — High-Detail Silicone Molds for Resin Art | Saancha",
    seoDesc: "Custom and ready-made high-detail silicone resin molds, made in Delhi. Coasters, jewellery, paperweights, faceted gems. Glass-smooth finish, no minimum order.",
    heroVideo: video("resin-hero.mp4", VID.resinHero),
    heroPoster: asset("resin.png", IMG.resin),
    hero: "Resin molds, detail you see through.",
    lede: "Ready-made resin molds at fixed prices, or a custom mold around your piece. Glass-smooth surfaces and razor facets that read perfectly through clear resin.",
    facts: [["No","Minimum order"],["5–7","Day custom build"],["High","Detail transfer"]],
    whyH: "Detail you can see through.",
    whyP: [
      "Resin is clear and unforgiving — every scratch and seam in the mold shows up in the final piece. Our high-detail silicone gives glass-smooth surfaces and razor facets that read perfectly through transparent casts.",
      "From tiny pendants to deep paperweights, the cavity holds its geometry so light bounces exactly where it should."
    ],
    whyImg: asset("resin.png", IMG.resin),
    points: [
      ["Glass-smooth finish","Mould surface reads clean through clear resin."],
      ["Fine facet transfer","Sharp geometry for gems and jewellery."],
      ["Deep-pour ready","Handles thick single-pour paperweights."]
    ],
    uses: ["Coasters","Jewellery","Pendants","Paperweights","Art objects","Faceted gems","Embeds & inclusions","Keepsakes"],
    products: [
      { name:"Faceted Gem", meta:"two-part block", price:"₹1,400", img: asset("resin.png", IMG.resin) },
      { name:"Coaster Round", meta:"single cavity", price:"₹850", img: asset("resin.png", IMG.resin) },
      { name:"Pendant Set", meta:"multi-cavity", price:"₹1,100", img: asset("soap-mold.png", IMG.soapMold) },
      { name:"Paperweight", meta:"deep single", price:"₹1,250", img: asset("resin.png", IMG.resin) },
    ],
    faq: [
      ["Will mold marks show in clear resin?","Only if the mold is flawed — ours are finished glass-smooth precisely so clear casts come out clean. Any seam is placed where it will not distract."],
      ["Can you cast very fine jewellery detail?","Yes — high-detail silicone is the reason resin is its own category here. Send the master or reference and we match the facets."],
      ["Does resin damage the mold over time?","Repeated curing heat wears any mold eventually. With care you get hundreds of pours; we advise on demoulding to extend life."]
    ],
  },
};
