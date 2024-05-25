import Environment from "@/components/Environment";
import { User } from "@/types/types";

async function env() {
  const endpoint =
    (await Environment()).serverHost + ":" + (await Environment()).serverPort;
  return {
    endpoint,
    httpEndpoint:
      ((await Environment()).serverUsesHttps ? "https://" : "http://") +
      endpoint,
    wsEndpoint:
      ((await Environment()).serverUsesHttps ? "wss://" : "ws://") +
      endpoint +
      "/ws",
  };
}

async function json(res: Promise<Response>) {
  try {
    return await (await res).json();
  } catch (e) {}
}

const api = {
  async register(): Promise<{ token: string }> {
    return await json(fetch((await env()).httpEndpoint + "/register"));
  },
  async login(
    token: string,
  ): Promise<{ sessionToken: string; userId: string; user: User } | undefined> {
    return await json(
      fetch((await env()).httpEndpoint + "/login", {
        method: "POST",
        body: JSON.stringify({ token }),
      }),
    );
  },
  async uploadImage(
    image: ArrayBuffer,
    fileType: string,
    sessionToken: string,
  ): Promise<URL | undefined> {
    const res = await fetch(
      (await env()).httpEndpoint + "/image/name." + fileType,
      {
        method: "POST",
        headers: {
          Authorization: sessionToken,
        },
        body: image,
      },
    );
    if (res.status === 200) {
      return new URL(
        (await env()).httpEndpoint + "/image/" + (await res.text()),
      );
    }
  },
  async getEndpoint() {
    return (await env()).httpEndpoint;
  },
  async socket() {
    return new WebSocket((await env()).wsEndpoint);
  },
};

export default api;
