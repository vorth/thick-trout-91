import { OctokitResponse } from "../types.ts";

export function sendResponse(octokitResponse: OctokitResponse): Response {
  return new Response(octokitResponse.text, {
    status: octokitResponse.status,
    headers: octokitResponse.headers,
  });
}
