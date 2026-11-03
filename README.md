# NextGenius website rebuild

Private working repository for the new nextgenius.com.au. Nothing here is published automatically.

- `site/`: the new website, 15 pages built with Astro. Start with `site/NOTES.md`.
- `design/`: the design templates. `hero3` is the accepted one; `hero` and `hero2` are kept for comparison.
- `knowledge-base/`: everything from the old site as searchable text, with a knowledge graph and the migration map (`knowledge-base/migration/`).
- `tools/`: scripts for crawling, the migration map and all checks.

## Run the site

```bash
cd site && npm install && npx astro build
```

```bash
node tools/serve.mjs site/dist 8805
```

Then open http://127.0.0.1:8805/

## Test deployment

Test site: https://nextgenius-test.djdev123.workers.dev (Cloudflare Workers static assets).
This is separate from the production domain. Search indexing is discouraged with
`X-Robots-Tag: noindex, nofollow` and a disallow-all test `robots.txt`.

To rebuild and deploy from the repository root in PowerShell with Wrangler logged in:

```powershell
npm --prefix site run build
Set-Content site/dist/_headers "/*`n  X-Robots-Tag: noindex, nofollow" -Encoding utf8
Set-Content site/dist/robots.txt "User-agent: *`nDisallow: /" -Encoding utf8
wrangler deploy --config wrangler.test.jsonc --no-autoconfig
```

The indexing controls apply to the build output; repeat these commands after every build.

## Not in this repository
`out/` holds crawl output, screen recordings and study copies of reference sites, which stay local because they are third-party material. Scripts that study reference sites, and a few checks, write to it; `motion-compare` needs logs from `motion-log` first. Some tools expect the shared harness at `C:/Dev/Claude_harness`.
