import fs from "fs";
import { build } from "esbuild";
import path from "path";

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));

const externals = pkg.dependencies ? Object.keys(pkg.dependencies) : [];

build({
  entryPoints: ["index.js"],
  format: "esm",
  outfile: "dist/index.js",
  bundle: true,
  platform: "node",
  external: externals,
  banner: {
    js: "#!/usr/bin/env node",
  },
  minify: true,
  sourcemap: false,
  logLevel: "info",
})
  .then(() => {
    fs.copyFileSync(
      path.resolve("index.d.ts"),
      path.resolve("dist/index.d.ts")
    );
    console.log("Copied index.d.ts to dist/");
  })
  .catch(() => process.exit(1));
