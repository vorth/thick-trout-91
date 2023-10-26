import {
  OAuthApp,
  createAWSLambdaAPIGatewayV2Handler,
} from "@octokit/oauth-app";
const app = new OAuthApp({
  clientType: "oauth-app",
  clientId: Deno.env.get( 'GITHUB_CLIENT_ID' ),
  clientSecret: Deno.env.get( 'GITHUB_CLIENT_SECRET' ),
});

export const handler = createAWSLambdaAPIGatewayV2Handler(app, {
  pathPrefix: "/api/github/oauth",
});

// can now receive user authorization callbacks at /api/github/oauth/callback
