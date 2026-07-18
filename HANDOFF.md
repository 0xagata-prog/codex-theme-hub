Goal:
Build and publish SkinDex, the “Codex 口袋皮肤图鉴”, as a real theme gallery whose current distribution is a standalone `$theme-hub` Skill; defer public plugin distribution until the plugin is listed.

Current state:
The product brand is now SkinDex — The Codex Theme Index / Codex 口袋皮肤图鉴. The public GitHub repository and compatibility identifiers remain `0xagata-prog/codex-theme-hub`, `$theme-hub`, `theme_hub_request`, and `theme-hub/v1` so existing installs and deep links do not break. The latest published standalone Skill release is still v0.3.0 until the rebranded v0.4.0 source is explicitly published to GitHub. GitHub remains the only Skill source/version distribution layer. The public site remains on the legacy-compatible Sites hostname https://codex-theme-hub-cn.jyyang040703.chatgpt.site until the owner provides a custom SkinDex domain; it has a 14-theme D1 catalog, public anonymous browsing, and an owner-only review dashboard.

The live v0.2.0 source implements the first “two clicks” product framework. First install: the website opens a prefilled generic Codex task that verifies the official GitHub Release, target directory, and existing version, then waits for confirmation before writing the Skill. Manual GitHub download remains the fallback. Daily theme use: supported theme cards open a theme-specific `$theme-hub` task carrying only `themeId` and the official Manifest URL. The Skill validates, plans, creates a restore point, and stages; the user still confirms the final Codex Appearance import.

The live v0.3.0 source adds a review-first submission policy. Repository submissions and generated-theme proposals explicitly enter `pending`, return `public: false` plus `publication: review-required`, and cannot appear in the public catalog until their theme status is `approved`. The repository form requires an explicit publication-review checkbox and returns a short review ID. After creating a local theme, the Skill proactively offers submission once; an interested answer is not upload consent, so it then discloses every field and thumbnail and waits for a second confirmation.

The live source includes an owner-only `/review` dashboard. Public browsing remains anonymous, while Sign in with ChatGPT identifies the reviewer and a server-side `THEME_HUB_REVIEWER_EMAIL` allowlist restricts the page, action API, and pending-preview API to the single site-owner account. Generated proposals can be approved into the public `themes` catalog or rejected. GitHub repository submissions can be accepted into manual curation or rejected, but are never auto-published from incomplete metadata. Public generated preview delivery requires the proposal itself to be `approved`.

Catalog API responses now expose a shared installability contract with `native`, `partial`, and `adapter-pending` support levels. Native and partial themes use `guided-import`; adapter-pending themes use `view-source` and never display a false install action. Manifest v1 optionally carries `install.experience` and `install.supportLevel`, while validation and adapter checks remain authoritative.

The website no longer recommends Codex App Manager or directly links unsigned Styler installers as one-click actions. `.codexskin` and Styler entries now show adapter-pending compatibility notices and only link to traceable upstream sources. Native `codex-theme-v1` themes still require final confirmation inside Codex.

Submission endpoints were hardened. GitHub submissions now require exact same-origin browser requests, JSON content type, and a 16 KB declared-body ceiling. Skill proposal submissions accept either exact same-origin browser requests or the standalone Skill client marker, enforce a 750 KB declared-body ceiling, retain the 700 KB file limit, and verify PNG/JPEG/WebP magic bytes before R2 upload. Pending previews remain private and explicit consent is still mandatory.

Files touched or relevant:
README.md
docs/theme-hub-framework.md
docs/skill-install.txt
.github/workflows/release-skill.yml
app/page.tsx
app/globals.css
app/layout.tsx
app/api/submissions/route.ts
app/api/theme-proposals/route.ts
app/api/review/[kind]/[id]/route.ts
app/api/review/proposals/[id]/preview/route.ts
app/api/theme-proposals/[id]/preview/route.ts
app/review/page.tsx
app/review/review-actions.tsx
lib/reviewer-auth.ts
app/downloads/codex-theme-hub-plugin.zip/route.ts
lib/theme-capability.ts
lib/review-policy.ts
lib/image-security.ts
plugins/codex-theme-hub/skills/theme-hub/SKILL.md
plugins/codex-theme-hub/skills/theme-hub/references/deep-link-v1.md
plugins/codex-theme-hub/skills/theme-hub/scripts/theme-hub.mjs
tests/theme-hub-adapter.test.mjs
tests/rendered-html.test.mjs
app/downloads/theme-hub-skill.zip/route.ts

Important decisions:
SkinDex is a brand migration, not a protocol or package rename. Preserve the internal Skill name, install directory, GitHub repository, API request field, schema version, and existing hosted endpoint until a separately planned compatibility migration exists. A new branded hostname requires an owner-controlled custom domain because the existing Sites slug cannot be renamed.

“One click” means opening a safe, reviewable Codex task, not silent browser installation or appearance mutation. The initial installer prompt does not invoke `$theme-hub` because the Skill may not exist yet; it names the official GitHub source and targets `~/.agents/skills/theme-hub` or `%USERPROFILE%\.agents\skills\theme-hub`, discloses writes, protects existing installs, and waits for confirmation. Theme deep links invoke `$theme-hub` only after installation and carry a small structured request. Plugin packaging is the future official installable distribution layer and must not appear on the website until listing. No flow patches the Codex app bundle or silently changes appearance.

All user submissions require review before publication. The first post-creation question asks only whether the user is interested in submitting; the second confirmation, after exact disclosure, authorizes upload.

The user selected owner-only review. The public site must remain public; only `/review` and its data/actions are gated. Generated proposal approval publishes immediately after the owner reviews its private preview and metadata. Repository approval means accepted for curation, not public publication.

Verification:
The v0.3.0 source passes Skill Creator validation, `npm run test:theme-hub` (13 tests), `npm test` (build plus 3 product-policy tests), `npm run lint`, and `git diff --check`. GitHub Actions published v0.3.0 successfully; `theme-hub-skill.zip` passed `unzip -t` and has SHA-256 `9eacb6734454652933e6f69d504ad804b121168653fe441a254f5b42048d9558`. Production smoke tests returned HTTP 200, found the private-review and proactive-offer copy, confirmed all 14 catalog rows are approved, confirmed a missing-consent submission is rejected with HTTP 400 without creating data, and confirmed the legacy Skill URL redirects to the latest GitHub Release.

The owner-review source passes `npm test` (build plus 4 product/security tests), `npm run test:theme-hub` (13 tests), `npm run lint`, and `git diff --check`. The build detects `/review`, the protected review action, private pending preview, and approved-only public preview routes. Sites environment revision 1 contains the single reviewer allowlist value as a secret. Production smoke tests confirmed the public home and catalog remain HTTP 200, `/review` redirects with HTTP 307 to Sign in with ChatGPT, the sign-in dispatcher redirects to OpenAI authorization, anonymous review actions and pending previews return HTTP 403, missing public previews return 404, and all 14 public catalog rows remain approved. No submissions were created or mutated during testing.

Manual in-app browser QA on 2026-07-18 passed public catalog loading (14 themes), search, platform/mode filtering, native theme details and Codex deep-link payloads, adapter-pending compatibility messaging, Skill installation guidance, and repository-submission required/URL/consent validation. The allowlisted owner completed OpenAI sign-in and successfully opened `/review`; the owner session survived a page reload, both pending queues correctly showed empty state, and the browser console reported no errors. No test submission was transmitted and no review action was performed.

What to do next:
Verify that a non-allowlisted OpenAI account is denied only when a safe secondary account is available; do not sign the owner out merely to create a test condition. Perform the first real review only when a genuine submission arrives. Then implement the social-source curation pipeline separately from GitHub-based installer/adapter discovery. Before broad promotion, add managed rate limiting and build the missing `.codexskin` and Styler adapters.

Known risks:
The public hostname and GitHub repository still contain the legacy `codex-theme-hub` slug. The Sites project slug cannot be renamed; changing the visible URL requires binding an owner-controlled custom domain. The currently published v0.3.0 Skill still carries the old display name until the rebranded v0.4.0 release is published.

The guided installer is a prefilled Codex task, not an official install protocol; it still depends on Codex network/filesystem approvals and a new chat after installation. There is no documented direct Codex appearance-import deep link, so supported native imports still require user confirmation. The Skill client marker is a public identifier, not authentication, and there is still no robust server-side rate limit. Changing the owner account email requires updating the reviewer allowlist secret. Accepted repository submissions still need manual curation before publication. Third-party preview URLs create hotlink/privacy risk. Fan-created IP requires rights review. `.codexskin` and Styler adapters remain unavailable.
