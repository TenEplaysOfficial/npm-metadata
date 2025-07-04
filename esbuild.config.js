import fs from "fs";
import { build } from "esbuild";

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
}).catch(() => process.exit(1));
