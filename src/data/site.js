// ═══════════════════════════════════════════════════════════════
//  SAANCHA — saari site ki settings EK jagah.
//  Non-technical? Bas yahan ke values badlo. Nav, footer, prices,
//  Nav, footer, email, WhatsApp — sab yahin se control hota hai.
// ═══════════════════════════════════════════════════════════════

export const site = {
  name: "Saancha",
  tagline: "Turning concepts into reality",
  email: "saanchaprint@gmail.com",   // public contact — shown as written text
  whatsapp: "918800559984",          // used ONLY for WhatsApp links (not shown as number)
  city: "Delhi, India",
  domain: "https://www.saancha.in",      // apna domain aane pe badlo
};

// CDN base — abhi Higgsfield se. Apni images public/images/ me daal ke
// USE_LOCAL true kar do (README padho).
export const USE_LOCAL = true;  // images now served locally from public/
const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_39EURzFKi2WVselNBK2rRVHKRD5/";
// local pe images WebP serve hoti hain (compress-images.mjs ne banayi). CDN pe original.
export const asset = (local, remote) => USE_LOCAL ? `/images/${remote.replace(/\.(png|jpe?g)$/i,'.webp')}` : CDN + remote;
export const video = (local, remote) => USE_LOCAL ? `/videos/${remote}` : CDN + remote;

// Nav links — yahan badlo, SAARE pages pe change ho jaayega
export const nav = [
  { label: "Process", href: "/#process" },
  { label: "Options", href: "/#tiers" },
];

// Materials — dropdown + material pages dono yahi se bante hain
export const materials = [
  { slug: "candles",  label: "Candles" },
  { slug: "soap",     label: "Soap & bath" },
  { slug: "concrete", label: "Concrete" },
  { slug: "resin",    label: "Resin" },
];
