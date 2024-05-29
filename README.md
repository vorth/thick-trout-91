
# Experiment with Octokit using Deno

I had given up on this, since the
[relevant Octokit sample](https://github.com/octokit/oauth-app.js) doesn't really work in Deno.
The process exits without `Deno.serve()` running,
and if I add it, as I have, the handler implementation is not suitable.

See [this repo](https://github.com/baoshan/octokit-auth-oauth-user-client.js) for the overall client-server architecture I'm attempting.

See also my Obsidian notes from 2024-05-27.

## Success!

I copied and slightly modified the `createWebWorkerHandler` code from [here](https://github.com/baoshan/oauth-app.js).
It now runs OK, as long as the request is a path like `/api/github/oauth/login`.
From the browser, this triggers a redirect that fails because I'm not providing a client ID.

