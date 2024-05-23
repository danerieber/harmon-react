{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.11";
    utils.url = "github:numtide/flake-utils";
  };
  outputs = { self, nixpkgs, utils }:
    utils.lib.eachDefaultSystem (system:
      let pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            bun
            nodejs_20
            nodePackages.typescript
            nodePackages.typescript-language-server
            nodePackages.prettier
            nodePackages.eslint
          ];
        };

        packages = rec {
          harmon-react = pkgs.callPackage ./default.nix {
            nodeOutputHash =
              "sha256-XY/PL8s1/xL2wEb92YAQLN1YVPNwCgu8jmUv1TrbGvw=";
          };
          default = harmon-react;
        };

        apps = rec {
          harmon-react =
            utils.lib.mkApp { drv = self.packages.${system}.harmon-react; };
          default = harmon-react;
        };
      });
}
