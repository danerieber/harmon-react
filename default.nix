{ stdenv, lib, bun, nodejs_20, nodePackages, makeBinaryWrapper, nodeOutputHash
}:
let
  src = ./.;
  version = "0.1.0";
  node_modules = stdenv.mkDerivation {
    pname = "harmon-react-node_modules";
    inherit src version;
    impureEnvVars = lib.fetchers.proxyImpureEnvVars
      ++ [ "GIT_PROXY_COMMAND" "SOCKS_SERVER" ];
    nativeBuildInputs = [ bun ];
    buildPhase = ''
      bun install --no-progress --frozen-lockfile
    '';
    installPhase = ''
      mkdir -p $out/node_modules

      cp -R ./node_modules $out
    '';
    outputHash = nodeOutputHash;
    outputHashAlgo = "sha256";
    outputHashMode = "recursive";
  };
in stdenv.mkDerivation {
  pname = "harmon-react";
  inherit src version;
  nativeBuildInputs = [ makeBinaryWrapper bun nodejs_20 ];

  NODE_TLS_REJECT_UNAUTHORIZED = "0";

  dontConfigure = true;
  dontBuild = true;

  installPhase = ''
    runHook preInstall

    mkdir -p $out/bin

    ln -s ${node_modules}/node_modules $out
    cp -R ./* $out

    cd $out
    bunx next build

    # bun is referenced naked in the package.json generated script
    makeBinaryWrapper ${bun}/bin/bun $out/bin/harmon-react \
      --prefix PATH : ${lib.makeBinPath [ bun ]} \
      --add-flags "run --prefer-offline --no-install start $out"

    runHook postInstall
  '';
}
