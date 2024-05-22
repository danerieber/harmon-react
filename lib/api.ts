import { User } from "@/types/types";

const endpoint =
  (process.env.NEXT_PUBLIC_SERVER_HOST ?? "localhost") +
  ":" +
  (process.env.NEXT_PUBLIC_SERVER_PORT ?? "8080");
const httpEndpoint =
  (process.env.NEXT_PUBLIC_SERVER_USES_HTTPS ? "https://" : "http://") +
  endpoint;
const wsEndpoint =
  (process.env.NEXT_PUBLIC_SERVER_USES_HTTPS ? "wss://" : "ws://") +
  endpoint +
  "/ws";

async function json(res: Promise<Response>) {
  const j = await (await res).json();
  console.log(j);
  return j;
}

const api = {
  async register(): Promise<{ token: string }> {
    return await json(fetch(httpEndpoint + "/register"));
  },
  async login(
    token: string,
  ): Promise<{ sessionToken: string; userId: string; user: User }> {
    return await json(
      fetch(httpEndpoint + "/login", {
        method: "POST",
        body: JSON.stringify({ token }),
      }),
    );
  },
  socket() {
    return new WebSocket(wsEndpoint);
  },
};

export default api;
