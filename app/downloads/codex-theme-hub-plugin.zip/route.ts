export function GET() {
  return Response.json(
    {
      error: "插件预览包已撤回，请改用独立 SkinDex Skill（兼容命令 $theme-hub）；插件将在正式上架后重新开放。",
      skillUrl: "https://github.com/0xagata-prog/codex-theme-hub/releases/latest/download/theme-hub-skill.zip",
    },
    {
      status: 410,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
