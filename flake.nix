{
  description = "Nix flake for AerynOS documentation";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
  };

  outputs =
    {
      self,
      systems,
      nixpkgs,
      ...
    }:
    let
      eachSystem = nixpkgs.lib.genAttrs (import systems);
      pkgs = eachSystem (system: nixpkgs.legacyPackages.${system});
    in
    {
      devShells = eachSystem (system: {
        default = pkgs.${system}.mkShell {
          buildInputs = with pkgs.${system}; [
            pnpm
            nodePackages_latest.nodejs
          ];
          shellHook = ''
            pnpm install
          '';
        };
      });
    };
}
