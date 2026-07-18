export function GET(request: Request) {
  return Response.redirect(new URL("/downloads/skindex-skill.zip", request.url), 307);
}
