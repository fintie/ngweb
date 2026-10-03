# NextGenius website

The public website is served from the root of the `gh-pages` branch at nextgenius.com.au. Editable React source lives in `NextGenius/`.

## Development

```sh
cd NextGenius
npm ci --legacy-peer-deps
npm run dev
```

## Build and release

```sh
cd NextGenius
npm run build
node scripts/publish-build.mjs
```

Commit the source, lockfile, root `index.html` and root `assets/` outputs. Publish those files to `gh-pages`; GitHub Pages handles deployment. Keep `CNAME` and `.nojekyll`.

The earlier `static/` assets remain to preserve existing image links and the social preview image. The active site does not load the previous compiled JavaScript bundle.

## Enquiries and OPC expressions of interest

Both forms validate required fields and prepare an encoded email draft to info@nextgenius.com.au. They do not submit data, save leads, confirm appointments or add users to mailing lists. Users must open their email application, review and send the draft. A backend lead form or booking integration can be added when its provider and account are selected.

Project descriptions distinguish product demonstrations from measured customer outcomes. Community OPC content describes an emerging network, not an established paid programme.
