// ═══════════════════════════════════════════════════════════════
//  SAANCHA — saari site ki settings EK jagah.
//  Non-technical? Bas yahan ke values badlo. Nav, footer, prices,
//  phone number — sab yahin se control hota hai.
// ═══════════════════════════════════════════════════════════════

export const site = {
  name: "Saancha",
  tagline: "Turning concepts into reality",
  phone: "+91 88005 59984",
  whatsapp: "918800559984",      // country code + number, no + or spaces
  city: "Delhi, India",
  domain: "https://saancha.in",  // apna domain aane pe badlo
};

// CDN base — abhi Higgsfield se. Apni images public/images/ me daal ke
// USE_LOCAL true kar do (README padho).
export const USE_LOCAL = false;
const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_39EURzFKi2WVselNBK2rRVHKRD5/";
export const asset = (local, remote) => USE_LOCAL ? `/images/${local}` : CDN + remote;
export const video = (local, remote) => USE_LOCAL ? `/videos/${local}` : CDN + remote;

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
