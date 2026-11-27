# StorArmor marketing website

Static marketing pages for the Windows Offline edition. This repository is separate from the management application and contains no company records or licensing secrets.

## Files

- `index.html`: product information, existing Features / Purchase / FAQ anchors, edition boundaries, and demo availability.
- `storarmor.css`: responsive navy, teal, and cream presentation.
- `storarmor.js`: accessible product-image preview and demo download link handling.
- `storarmor-config.js`: public demo download URL. An empty URL keeps the public download marked as pending.
- `assets/`: existing StorArmor branding and screenshots from fictional test companies.

## Release links

The verified Payhip product URL appears in the homepage purchase link, FAQ, and structured data. Update those three references together when the listing changes. Set `demoDownloadUrl` only after the exact customer installer is ready for public distribution. Linking Payhip does not itself enable automatic activation; update the activation explanation only after the separate licensing service and installer have passed live acceptance.

## Content evidence

The product descriptions were checked against the application repository's `docs/offline-public-start-here.txt`, `BUSINESS_RULES.md`, and Offline implementation. Planned online integrations, automatic activation, and automatic replacement licensing are not advertised as live.

`home-preview-027.png` and `tenant-preview-027.png` were captured from the StorArmor Offline 0.1.27 interface with fictional storage records in a loopback-only Google Chrome test fixture.

The page has no external script or runtime dependency. Serve the repository with a static web server to preview. Check desktop/mobile layout, navigation, FAQ disclosures, image previews, and all configured external links before publishing.

## Cloudflare deployment

The existing Worker is `storvaultos-website`; its compatibility date remains `2026-11-10`. The existing custom-domain configuration stays in the Cloudflare dashboard. This configuration does not create routes, databases, services, or bindings to the management app.

Run `npm ci`, then `npm run check`, `npm run build`, and `npm run deploy:check`. The build copies only the ten files explicitly listed in `scripts/public-files.js` into `dist/`. README, deployment configuration, source-control metadata, and future files are excluded by default.

Cloudflare Workers Builds should use `npm run build` as its build command and the existing `npx wrangler deploy` as its deploy command. Wrangler deploys `dist/` only. Unmatched requests return 404; no application API or management app route is exposed by this website.
