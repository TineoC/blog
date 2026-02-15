export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      return Response.redirect(
        `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=repo&allow_signup=true`,
        302
      );
    }

    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      const response = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "accept": "application/json",
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });
      const result = await response.json();

      if (result.error) {
        return new Response(result.error_description || result.error, { status: 400 });
      }

      // Security: Verify that the user is authorized
      const userResponse = await fetch("https://api.github.com/user", {
        headers: {
          "Authorization": `token ${result.access_token}`,
          "User-Agent": "Decap-CMS-Auth-Gateway",
        },
      });
      const user = await userResponse.json();
      const allowedUser = env.ALLOWED_USER || "TineoC";

      if (user.login !== allowedUser) {
        return new Response("Unauthorized: Access restricted to " + allowedUser, { status: 403 });
      }

      return new Response(`
        <script>
          const receiveMessage = (message) => {
            window.opener.postMessage(
              'authorization:github:success:' + JSON.stringify({
                token: "${result.access_token}",
                provider: "github"
              }),
              message.origin
            );
            window.removeEventListener("message", receiveMessage, false);
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        </script>
      `, { headers: { "content-type": "text/html" } });
    }

    return new Response("Not Found", { status: 404 });
  }
};
