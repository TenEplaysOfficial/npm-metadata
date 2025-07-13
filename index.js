import fs from "fs";
import path from "path";
import * as url from "url";
import { program } from "commander";
import { name, displayName, description, version } from "./package.json";
import logSymbols from "log-symbols";

program.name(displayName).description(description).version(version);

export async function metadata(name, options = { silentLog: false }) {
  const { silentLog } = options;

  if (!name) {
    if (!silentLog) {
      console.error("Package name is required.");
    }
    return;
  }

  const fetchURL = `https://registry.npmjs.org/${name}`;

  try {
    if (!silentLog) {
      console.log("Fetching package metadata for:", name);
    }
    const res = await fetch(fetchURL);
    if (!res.ok) {
      if (!silentLog) {
        console.error(`Failed to fetch package metadata for ${name}.`);
      }
      return;
    }
    const data = await res.json();
    if (!silentLog) {
      console.log("Package metadata fetched successfully.");
    }
    return data;
  } catch (err) {
    if (!silentLog) {
      console.error(`Error fetching package metadata: ${err.message}`);
    }
  }
}

program
  .option("-n, --name <name>", "Set the name of the package")
  .option(
    "-d, --download [path]",
    "Set the download path for the package (default: current directory)"
  )
  .action(async (options) => {
    if (!options.name) {
      console.log(
        logSymbols.error,
        `No package name provided. Use -n or --name to specify the package name.\n Ex: npx ${name} -n <package-name> -d <download-path>`
      );
      program.help({ error: true });
    }

    const data = await metadata(options.name);
    if (!data) return;

    if ("download" in options) {
      const rawpath = options.download;
      let downloadPath = process.cwd();
      if (typeof rawpath === "string") {
        downloadPath = path.resolve(rawpath);
      }
      const filePath = path.join(downloadPath, `${options.name}.json`);
      try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(
          logSymbols.success,
          `Package metadata for ${options.name} downloaded to ${filePath}`
        );
      } catch (err) {
        console.error(logSymbols.error, `Failed to write file: ${err.message}`);
      }
    } else {
      console.log(
        logSymbols.info,
        "Use the -d option to download the package metadata."
      );
    }
  });

program.on("command:*", () => {
  console.log(logSymbols.warning, "Invalid command:", program.args.join(" "));
  program.help();
});

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  program.parse();
}
