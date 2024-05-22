import { User } from "@/types/types";

const endpoint = "localhost:8080";
const httpEndpoint = "http://" + endpoint;
const wsEndpoint = "ws://" + endpoint + "/ws";

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
