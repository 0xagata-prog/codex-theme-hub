import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("keeps guided installation in Codex with GitHub as the fallback source", async () => {
  const [page, skillRedirect, pluginRetirement] = await Promise.all([
    source("../app/page.tsx"),
    source("../app/downloads/theme-hub-skill.zip/route.ts"),
    source("../app/downloads/codex-theme-hub-plugin.zip/route.ts"),
  ]);

  assert.match(page, /function skillInstallerChatUrl\(\)/);
  assert.match(page, /在 Codex 中开始安装/);
  assert.match(page, /等待我确认后再安装/);
  assert.match(page, /\$HOME\/\.agents\/skills\/theme-hub/);
  assert.match(page, /releases\/latest\/download\/theme-hub-skill\.zip/);
  assert.match(skillRedirect, /Response\.redirect\(releaseUrl, 307\)/);
  assert.match(pluginRetirement, /status: 410/);
  assert.doesNotMatch(page, /codex plugin marketplace add/);
});

test("routes theme actions through declared support levels", async () => {
  const [page, themesRoute, capability, skill] = await Promise.all([
    source("../app/page.tsx"),
    source("../app/api/themes/route.ts"),
    source("../lib/theme-capability.ts"),
    source("../plugins/codex-theme-hub/skills/theme-hub/SKILL.md"),
  ]);

  assert.match(themesRoute, /install: getThemeInstallability\(theme\)/);
  assert.match(capability, /"native" \| "partial" \| "adapter-pending"/);
  assert.match(capability, /action: "guided-import"/);
  assert.match(capability, /action: "view-source"/);
  assert.match(page, /href=\{themeUseChatUrl\(theme\)\}/);
  assert.match(page, /theme_hub_request=/);
  assert.match(page, /适配器开发中/);
  assert.match(skill, /`verified`, `staged`, `awaiting-confirmation`, or `confirmed`/);
});
