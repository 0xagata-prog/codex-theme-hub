Goal:
Unify the public product, repository, standalone Skill, command, protocol, and release asset under SkinDex, while keeping the existing Sites hostname and legacy download redirects usable.

Current state:
The public GitHub repository is now `https://github.com/0xagata-prog/skindex`. The source is fully migrated to the canonical Skill name `skindex`, explicit invocation `$skindex`, deep-link field `skindex_request`, Manifest schema `skindex/v1`, and client marker `skindex-skill-v1`. The Skill source is the simple repository folder `skill/`; catalog and schema files are at `catalog/` and `schemas/`. The old plugin source bundle was removed because public plugin distribution remains deferred.

The website installer is now a short Codex task invoking the built-in `$skill-installer` against `https://github.com/0xagata-prog/skindex/tree/main/skill`, explicitly naming the installation `skindex`. The UI no longer explains download locations or offers a manual ZIP as the primary path. Theme deep links require the installed `skindex` Skill and carry `skindex_request`.

Sites version 15 is published with the new SkinDex flow and display title. Legacy website routes remain as compatibility redirects or retirement responses. The public Sites hostname still contains `codex-theme-hub-cn` because that hosted slug cannot be renamed; there is no Vercel project in the connected account. A new URL requires binding an owner-controlled custom domain to Sites. The reviewer allowlist prefers `SKINDEX_REVIEWER_EMAIL` but temporarily falls back to the already-deployed `THEME_HUB_REVIEWER_EMAIL` secret so owner review is not broken.

Files touched or relevant:
README.md
docs/skindex-framework.md
docs/skill-install.txt
skill/SKILL.md
skill/agents/openai.yaml
skill/references/deep-link-v1.md
skill/references/manifest-v1.md
skill/scripts/skindex.mjs
catalog/*.json
schemas/theme-manifest-v1.schema.json
app/page.tsx
app/layout.tsx
app/downloads/skindex-skill.zip/route.ts
app/downloads/theme-hub-skill.zip/route.ts
app/downloads/codex-theme-hub-plugin.zip/route.ts
lib/theme-manifest.ts
lib/theme-capability.ts
lib/reviewer-auth.ts
.github/workflows/release-skill.yml
tests/skindex-adapter.test.mjs
tests/rendered-html.test.mjs

Important decisions:
Use the built-in `$skill-installer` for the main installation flow. Keep GitHub as the only source and version layer. Keep final Codex Appearance confirmation and restore points. Do not distribute a plugin until it is publicly listed. Preserve legacy website routes and the server-side reviewer environment fallback only as migration compatibility; do not show the old `$theme-hub` command in the main product flow.

Verification:
Skill Creator validation passes. `npm run test:skindex` passes 13/13 tests. `npm test` passes the production build and 4/4 product/security tests. `npm run lint` and `git diff --check` pass. GitHub Actions published `v0.4.0`; the released `skindex-skill.zip` passes `unzip -t` with SHA-256 `8d989fe876a70cb2f5bc267393127bd52f103a2771da178b9ea9bdc527a332cd`. The official `$skill-installer` helper successfully installed the live GitHub `skill/` path into a temporary `skindex` destination and Skill Creator validated that installed copy. Production smoke tests found HTTP 200 for the homepage, `skindex/v1` for a live Manifest, a 307 from the new Skill download route to GitHub, and a 307 from `/review` to Sign in with ChatGPT. A legacy download redirect bug was found and fixed locally after version 15; republish this small fix.

What to do next:
Commit and push the legacy redirect fix plus this handoff, publish the resulting Sites version, and confirm the legacy route returns 307 instead of 500. To replace the visible `codex-theme-hub-cn.jyyang040703.chatgpt.site` hostname, ask the owner for the exact custom domain they control and attach it with Sites custom-domain management.

Known risks:
The public Sites slug cannot be renamed and the connected Vercel account currently has no projects, so do not create a duplicate Vercel deployment: the app depends on Sites D1, R2, and Sign in with ChatGPT. A new public URL needs an owner-controlled custom domain. The current production reviewer secret still uses the legacy environment variable until a separate hosted-secret migration is completed.
