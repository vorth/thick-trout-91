
import { OAuthApp } from "@octokit/oauth-app";
import { createDenoHandler } from "./oauth-app-addon/middleware/deno/index.ts";

const app = new OAuthApp({
  clientType: "oauth-app",
  clientId: Deno.env .get( 'GITHUB_CLIENT_ID' ),
  clientSecret: Deno.env .get( 'GITHUB_CLIENT_SECRET' ),
  redirectUrl: "https://www.vzome.com/app/github-callback",
});

if ( !app )
  console.log( 'No app created' );

const handleRequest = createDenoHandler( app, {
  pathPrefix: "/api/github/oauth",
});

Deno.serve( handleRequest );
