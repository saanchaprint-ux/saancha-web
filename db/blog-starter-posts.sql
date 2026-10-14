-- ═══════════════════════════════════════════════════════════════
--  SAANCHA — 4 starter blog posts (real SEO content)
--  Run AFTER phase-blog.sql. Supabase → SQL Editor → paste → Run
-- ═══════════════════════════════════════════════════════════════
insert into public.blog_posts (slug, title, excerpt, cover_url, body, published) values
(
 'how-to-choose-the-right-candle-mould',
 'How to choose the right candle mould',
 'Pillar, taper or sculpted — picking the right candle mould comes down to wax type, detail, and how many you plan to pour. Here is how we guide customers.',
 'https://d8j0ntlcm91z4.cloudfront.net/user_39EURzFKi2WVselNBK2rRVHKRD5/hf_20261013_143538_3818f0fe-c920-4af1-a117-e6b3de497000.png',
 'Choosing a candle mould is less about looks and more about what you are pouring and how often. The wrong mould wastes wax and time; the right one releases cleanly, pour after pour.

Start with your wax. Soy, paraffin and beeswax all behave differently as they set. Soft waxes release easily from flexible silicone, while harder blends need a mould with the right flexibility so the candle pops out without cracking a detailed edge.

Think about detail. A smooth pillar is forgiving. A ribbed or fluted design, a logo, or sharp geometry needs a mould that captures fine detail and still flexes enough to release it. This is where silicone beats rigid printed moulds for anything intricate.

Consider your volume. If you are testing a shape, a single-cavity mould is enough. If you are selling, a multi-cavity tray lets you pour a full batch at once — same weight, same shape, every time.

At Saancha we ask three questions before building: what wax, what detail, and how many a month. From there we spec the right silicone hardness and cavity layout. Order one to test, or scale to production — the mould stays the same.',
 true
),
(
 'silicone-vs-3d-printed-moulds',
 'Silicone vs 3D-printed moulds: which do you need?',
 'Both have a place. Printed moulds are cheaper and faster for testing; silicone wins on detail, release and long production runs. Here is the honest comparison.',
 'https://d8j0ntlcm91z4.cloudfront.net/user_39EURzFKi2WVselNBK2rRVHKRD5/hf_20261013_143538_2fc2dca6-4a31-4da5-aa87-03606b701a0f.png',
 'People often ask whether they need a silicone mould or a directly 3D-printed one. The honest answer: it depends on where you are in your product journey.

A 3D-printed mould is quick and cheap. It is great for proving a shape before you invest — you can hold it, cast a few test pieces, and decide if the design works. But printed moulds are rigid. They struggle with undercuts, fine detail and clean release, and they wear out faster.

A silicone mould is cast from a 3D-printed master. It flexes, so it releases detailed shapes without cracking them, handles undercuts, and survives hundreds of pulls. This is what most businesses use for real production.

A simple way to think about it: print to test, silicone to sell. Many of our customers start with a trial mould to validate a shape, then move to a silicone production mould once they know it sells.

The material also depends on what you cast. Hot wax, resin, concrete and soap each have different needs, and the right silicone hardness matters. Tell us the product and the volume, and we pick the method — you do not have to learn the difference.',
 true
),
(
 'make-sharp-handmade-soap-bars',
 'How to get crisp edges on handmade soap bars',
 'Soft corners and rough faces are usually a mould problem, not a recipe problem. Here is how the right mould gives you sharp, repeatable soap bars.',
 'https://d8j0ntlcm91z4.cloudfront.net/user_39EURzFKi2WVselNBK2rRVHKRD5/hf_20261013_143538_0c36378d-b963-44cc-a37c-26fc0bcaebea.png',
 'If your handmade soap comes out with soft edges or a rough surface, the mould is often the culprit — not your recipe.

Cold-process and melt-and-pour soap both need a mould that holds a sharp edge through curing and releases without dragging the surface. A flexible silicone mould with crisp internal corners gives you faceted, defined bars that look professional on a shelf.

Batch consistency matters too. If you are selling, every bar should be the same weight and size. A multi-cavity tray pours a whole batch at once, so you are not guessing volumes bar to bar.

For skin-safe production, the silicone itself matters. We offer food- and cosmetic-grade options for soap and bath products, so there is no worry about what touches the final bar.

Whether you want faceted bars, round pucks, embeds, or bath bombs, the principle is the same: sharp mould, clean release, repeatable results. Send us your bar size and process, and we lay out a tray that pours evenly.',
 true
),
(
 'concrete-homeware-moulds-guide',
 'Casting concrete planters and homeware: a starter guide',
 'Concrete is heavy and unforgiving, so the mould has to do the hard work. Here is what makes a good concrete mould for planters, trays and decor.',
 'https://d8j0ntlcm91z4.cloudfront.net/user_39EURzFKi2WVselNBK2rRVHKRD5/hf_20261013_143538_d0380791-6755-4844-b608-31e72b6404e9.png',
 'Concrete and plaster are rewarding to cast but hard on moulds. The mix is abrasive, heavy, and unforgiving of weak mould design. Getting a clean, smooth result starts with the right mould.

The biggest challenge is undercuts and depth. A tapered planter or a faceted vessel cannot come out of a single rigid mould — it gets trapped. This is why we build concrete moulds as two-part silicone: the mould splits to release shapes that would otherwise be stuck.

Surface finish is the next thing. The silicone takes the abrasion so your casting comes out smooth, with crisp edges and no trapped air on the visible faces. A good mould hides the seam where it will not distract.

Durability is real too. Abrasive mixes shorten any mould life, so we advise on release agents and handling to get the most pulls out of each one.

Planters, trays, coasters, vases, candle vessels — if it is concrete homeware, the approach is the same: two-part where needed, smooth faces, sharp edges. Tell us the finished dimensions and we will confirm what is feasible.',
 true
)
on conflict (slug) do nothing;
