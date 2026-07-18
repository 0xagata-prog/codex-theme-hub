const releaseUrl = "https://github.com/0xagata-prog/codex-theme-hub/releases/latest/download/theme-hub-skill.zip";

export function GET() {
  return Response.redirect(releaseUrl, 307);
}
