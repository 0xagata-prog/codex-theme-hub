Goal:
Publish SkinDex at the owner-selected canonical URL `https://codex-skindex.vercel.app` while preserving the existing ChatGPT Sites deployment as the D1/R2/SIWC backend.

Current state:
The public GitHub repository is `https://github.com/0xagata-prog/skindex`. The canonical Skill name is `skindex`, invocation is `$skindex`, protocol is `skindex/v1`, and the released repository Skill remains the installation source. A Vercel project named `codex-skindex` owns the exact production alias `https://codex-skindex.vercel.app` and proxies public routes to the existing Sites backend. Vercel deployment `dpl_FUWH45WpRbh8N2BEfVqrbEJLqWdM` is READY with no alias error. Git commit `7562180901d0e25d4a520c94f58e843bdfce2928` is pushed and tagged `v0.5.0`. Sites version 18 is published successfully from that commit with environment revision 2, and GitHub release `v0.5.0` contains the verified Skill ZIP.

Files touched or relevant:
README.md
app/layout.tsx
app/page.tsx
app/api/submissions/route.ts
app/api/theme-proposals/route.ts
lib/trusted-origin.ts
lib/theme-seed.ts
catalog/blue-messenger-2007.json
skill/scripts/skindex.mjs
vercel-proxy/vercel.json
vercel-proxy/fallback.html
tests/skindex-adapter.test.mjs
tests/rendered-html.test.mjs

Important decisions:
Vercel is the public URL layer only; ChatGPT Sites remains the data, object storage, and owner-auth backend. Browser-origin checks use an exact allowlist for `codex-skindex.vercel.app` and the legacy Sites origin, never a wildcard for `vercel.app`. The owner review login may redirect to the legacy Sites hostname because SIWC remains hosted there. The old Sites hostname stays live for compatibility. The Skill default endpoint and all official product links use the new Vercel URL.

What to do next:
Use `https://codex-skindex.vercel.app` as the only public URL in future product copy. Choose a repository LICENSE before accepting outside code contributions. Monitor the upstream Next/PostCSS advisory and update when a compatible fix is released. If desired later, migrate SIWC off the legacy Sites hostname or attach a separately owned custom domain; neither is required for the current public product.

Known risks:
The public URL layer depends on the existing Sites backend, so a Sites outage affects the Vercel URL. Sign in with ChatGPT still uses the legacy Sites origin. Existing seeded D1 rows may retain stored legacy source URLs until a later data migration; newly rendered metadata, official links, and the Skill use the canonical Vercel address.

Verification:
`npm run typecheck` passes, `npm run test:skindex` passes 17/17, `npm test` passes the production build and 7/7 product/security tests, lint passes, and `git diff --check` passes. Production smoke tests return 200 for the homepage, privacy, terms, support, robots, sitemap, and favicon; the catalog contains 14 themes from 4 sources and the live native Manifest validates. The canonical and direct Sites responses include CSP, DENY framing, nosniff, referrer and permissions policies. Attacker Origins receive 403 on both public paths; owner review redirects to SIWC. GitHub CI run 29646490555 and release run 29646518714 succeeded. Main requires the `Quality checks` status, PRs, admin enforcement, linear history, and blocks force-push/deletion; Dependabot security updates are enabled. The `v0.5.0` ZIP passes `unzip -t` and has SHA-256 `ae585c73d18a9295fc35e978a1f40429b24c49845a74a71312728e86f8d15e72`.

Security and product audit (2026-07-18, read-only):
The owner-only SIWC boundary resisted direct header spoofing: fake reviewer requests returned 403. All 8 live native manifests validate, all 29 distinct live source/preview/download/author URLs return 2xx/3xx, secret scanning is enabled with zero open alerts, and no secret-shaped values were found in the working tree or Git history. However, do not promote heavily before addressing: the public proposal route trusts a forgeable `X-SkinDex-Client` marker and has no application-level rate limit; the direct Sites hostname bypasses any Vercel-only WAF; native manifest validation accepts unknown/forbidden fields embedded inside `package.inline`; the installer reads the unprotected `main` branch; main has no branch protection/rulesets and Dependabot is disabled; review pages lack CSP/frame protections; forwarded-host input can poison OG metadata; rejected previews are retained; review queries are unbounded; uploads are not re-encoded or stripped of metadata; public legal/privacy/support pages and a repository LICENSE are absent. Production `npm audit` reports 2 moderate PostCSS/Next findings without an automatic fix; the full dependency tree reports 36 findings, mostly build tooling. Build, lint, and 19 existing tests pass, but standalone TypeScript checking fails because Cloudflare Worker types are not configured. Vercel runtime logs are empty because the project is only an external rewrite; Sites Worker logs are the actual observability source. No product code was changed during this audit.

Repair implementation (2026-07-18):
The actionable application findings above are fixed for v0.5.0. Public submissions now have D1-backed hourly and pending-queue limits that also apply on the direct Sites backend. Generated previews enforce dimensions and reject EXIF/XMP/text metadata; rejected preview objects are deleted. Review queries are capped. Native inline manifests now have exact nested schemas, length/type/color bounds, forbidden-field rejection, and canonicalized staging. The website installer is pinned to `v0.5.0`; GitHub CI and release workflows use commit-pinned Actions and verify typecheck/tests/build/lint before packaging. Metadata has a fixed canonical origin, Worker and Vercel responses set anti-framing and related security headers, and privacy/terms/support/robots/sitemap/favicon are present. Seed writes are versioned, proposal schema/index creation is portable, source counts/stars are corrected and labeled as snapshots. Remaining known items are the upstream Next/PostCSS production audit finding with no available fix, the absent repository LICENSE (owner choice required), and the architectural dependency on the legacy Sites backend/SIWC origin.
