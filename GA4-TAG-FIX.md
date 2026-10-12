# Google Analytics Tag Fix

GA4 ID: G-PMYYSHZM0B

The shared Astro layout now uses the provided public ID as a fallback. The `PUBLIC_GA_MEASUREMENT_ID` environment variable can override it. Both static and server-rendered public pages load the tag in the document head. Admin, API, login, and account pages remain excluded as before.

## Deploy
1. Upload this project and redeploy on Vercel.
2. Open `view-source:https://saancha.in/` and search for `G-PMYYSHZM0B`.
3. Then use Google Analytics > Realtime or Tag Assistant, allowing for consent and blockers.
4. Do not also paste the Google tag into individual pages; duplicate tags can double-count events.

Google tag installation alone does not provide compliant consent handling where required. Configure a consent manager appropriate for your visitors and privacy policy.
