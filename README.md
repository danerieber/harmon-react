# Harmon

A simple, fun, and fast way to chat with your friends.

harmon-react provides a web interface for messaging and voice calling that interacts with the [harmon-server-go](https://github.com/danerieber/harmon-server-go) API service.

# Features

- Text chat
- Voice calling
- User list with presence/status
- User customizations: username colors, icons, banner images, and statuses
- Simple vim/helix style keybinds for quick navigation

# Requirements

Nix users can just use `nix develop` or use [nix-direnv](https://github.com/nix-community/nix-direnv) and `direnv allow .` to automatically load the requirements when you enter the folder.

Otherwise, please manually install the following required software:

- Bun
- Node 20
- ESLint (for contributors)
- Prettier (for contributors)

# Get Started

Install Bun packages

```sh
bun i
```

Start development server (note: you will also need to run [harmon-server-go](https://github.com/danerieber/harmon-server-go))

```sh
# start peerjs if you want calls to work
bunx peerjs --port 9000
bun run dev
```

Build/run for production

```sh
bun run build
bun run start
```

# Contributing

As long as you are not on an iPad editing code through the GitHub website... Go ahead and open an issue or a PR!
