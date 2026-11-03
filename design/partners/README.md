# Partner page and banner assets

Added 2026-11-01 at the user's request to replace the one-person-business service planner.

## Sources and roles

- Directory and original banners: https://ailearnersclub.com/partners
- https://schnellstart.ai/ - AI implementation, automation and training. Delivery-partner relationship confirmed by the user; Lukas Huber's AI Learners Club Community Manager role comes from the directory.
- https://altamir.ai/ - AI strategy and governance. Delivery-partner relationship confirmed by the user; Dennis Singh's AI Learners Club Vice President role comes from the directory.
- https://openai.com/ - OpenAI Select Partner status confirmed by the user on 2026-11-01. Delivery copy covers AI integration and workflow automation.
- https://fi.co/ - local partner, confirmed by the user. Founder development and mentorship.
- https://www.meetup.com/business-networking-lassie-edwardzia/ - Edward and the business community are local partners, confirmed by the user.
- AI Learners Club ownership by Next Genius Pty Ltd is stated on its partner page.

The page groups OpenAI, schnellstart.ai and Altamir.ai as delivery partners, and Founder Institute and Edward (Lassie & Ed) as local partners, following the user confirmation. Client results and shared customer counts are not claimed. Engagement scope, team and costs are agreed for each project. The enquiry form prepares an email in the visitor's mail app, using the site's existing behaviour.

## Banner provenance

Downloaded source banners are kept under `references/`. Source paths below https://ailearnersclub.com and final public assets:

| Name | Original path | Final asset |
| --- | --- | --- |
| schnellstart.ai | /optimized/versioned/partners/schnellstart-ai-2x1.1120.8abbc60c7d8f.webp | site/public/img/partners/schnellstart.webp |
| Altamir.ai | /optimized/versioned/partners/altamir-ai.1120.e66494695694.webp | site/public/img/partners/altamir.webp |
| OpenAI | /optimized/versioned/partners/openai-banner.1120.b1e3a030a3e6.webp | site/public/img/partners/openai.webp |
| Founder Institute | /optimized/versioned/partners/founder-institute-banner-2x1.1120.26a004157146.webp | site/public/img/partners/founder-institute.webp |
| Lassie & Ed | /optimized/versioned/partners/lassie-ed-business-community-2x1.1120.96c709f85c66.webp | site/public/img/partners/lassie-ed.webp |

Each banner was redesigned with the built-in image-generation tool using its original as the edit input. Shared brief: wide 2:1 editorial banner; warm ivory background, quiet muted palette, generous negative space, recognisable partner identity, no dense promotional paragraphs, no glossy effects or animation. Partner names are repeated as accessible HTML headings. Banners are decorative, not evidence of NextGenius projects or events. The Lassie & Ed photo is a generated adaptation of its source banner, not a documentary NextGenius event photo.

Individual directions: schnellstart retains the yellow arrow mark with restrained ochre shapes; Altamir uses its angular identity on pale sage; OpenAI uses its black knot and wordmark directly on warm ivory, with the grey rectangle removed; Founder Institute uses its green identity with restrained typography; Lassie & Ed pairs its blue identity with the source community-photo composition.

Generated PNGs were converted with sharp to 1200x600 WebP, quality 86. No creative edits were made outside the image-generation tool. All five final files together are about 117 KB and load lazily.

## Routing and content

- New canonical page: `/partners/`; added to the sitemap, menu, footer and related content.
- `/one-person-business/`, `/one-person-business/zh/`, `/opc/` redirect to `/partners/`. Static builds emit Astro meta-refresh redirect pages; production HTTP redirect headers depend on the host.
- Old hash routes forward directly to Partners through `public/site.js`.
- Planner code and language data were removed. Its historical migration units are explicitly retired. New units u161-u167 cover the replacement content.


OpenAI revision (2026-11-01): updated to OpenAI Select Partner at user request. Bubbles: AI integration; Workflow automation. Banner edited with the built-in image tool to remove only the grey rectangle, preserving the wordmark, knot and composition; converted to 1200x600 WebP at quality 86. Generated source: exec-8df68e1a-cff8-464f-bd46-f5e31a0e6134.png.

Brand display revision (2026-11-01): at user request, removed .ai from the Schnellstart and Altamir banners, card headings, link labels, homepage description and partner-page metadata. Website destinations remain https://schnellstart.ai/ and https://altamir.ai/. The two banner edits used the built-in image-generation tool, removing only the wordmark suffix while preserving the existing artwork. Generated sources: exec-43a90dff-6c32-4fdd-9f5d-8d4336a480f8.png and exec-1811d324-bf17-4b22-abe6-719943e3e132.png. Final assets remain 1200x600 WebP at quality 86.
