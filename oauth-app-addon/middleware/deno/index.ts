import { parseRequest } from "./parse-request.ts";
import { sendResponse } from "./send-response.ts";
import { handleRequest } from "../handle-request.ts";
import { onUnhandledRequestDefault } from "../on-unhandled-request-default.ts";
import { ClientType, OAuthApp, Options } from "@octokit/oauth-app";
import { HandlerOptions } from "../types.ts";

async function onUnhandledRequestDefaultWebWorker(
  request: Request
): Promise<Response> {
  const octokitRequest = parseRequest(request);
  const octokitResponse = onUnhandledRequestDefault(octokitRequest);
  return sendResponse(octokitResponse);
}

export function createDenoHandler<T extends Options<ClientType>>(
  app: OAuthApp<T>,
  {
    pathPrefix,
    onUnhandledRequest = onUnhandledRequestDefaultWebWorker,
  }: HandlerOptions & {
    onUnhandledRequest?: (request: Request) => Response | Promise<Response>;
  } = {}
) {
  return async function (request: Request): Promise<Response> {
    const octokitRequest = parseRequest(request);
    const octokitResponse = await handleRequest(
      app,
      { pathPrefix },
      octokitRequest
    );
    return octokitResponse
      ? sendResponse(octokitResponse)
      : await onUnhandledRequest(request);
  };
}
