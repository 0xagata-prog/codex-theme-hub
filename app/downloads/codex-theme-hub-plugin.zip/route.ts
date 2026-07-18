export function GET() {
  return Response.json(
    {
      error: "插件预览包已撤回，请改用独立 Theme Hub Skill；插件将在正式上架后重新开放。",
      skillUrl: "/downloads/theme-hub-skill.zip",
    },
    {
      status: 410,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
