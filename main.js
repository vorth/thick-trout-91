
import { OAuthApp, createWebWorkerHandler } from "@octokit/oauth-app";
const app = new OAuthApp({
  clientType: "oauth-app",
  clientId: Deno.env .get( 'GITHUB_CLIENT_ID' ),
  clientSecret: Deno.env .get( 'GITHUB_CLIENT_SECRET' ),
});

const handleRequest = createWebWorkerHandler(app, {
  pathPrefix: "/api/github/oauth",
});

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
// can now receive user authorization callbacks at /api/github/oauth/callback
