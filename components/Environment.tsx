"use server";

import { unstable_noStore as noStore } from "next/cache";

export default async function Environment() {
  noStore();

  return {
    serverHost: process.env.SERVER_HOST ?? "localhost",
    serverPort: process.env.SERVER_PORT ?? "8080",
    serverUsesHttps: process.env.SERVER_USES_HTTPS,
    peerServerHost: process.env.PEER_SERVER_HOST ?? "localhost",
    peerServerPort: parseInt(process.env.PEER_SERVER_PORT ?? "9000"),
    peerServerPath: process.env.PEER_SERVER_PATH ?? "/",
    peerServerConfig: process.env.PEER_SERVER_CONFIG,
  };
}
