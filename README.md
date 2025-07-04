# NPM Metadata

[![Version](https://img.shields.io/npm/v/npm-metadata?style=flat-square)](https://www.npmjs.com/package/npm-metadata)
[![npm downloads](https://img.shields.io/npm/dm/npm-metadata?style=flat-square)](https://www.npmjs.com/package/npm-metadata)
[![npm install](https://nodei.co/npm/npm-metadata.png?downloads=true&downloadRank=true)](https://www.npmjs.com/package/npm-metadata)

A lightweight Node.js utility to fetch metadata for any npm package. Works both as a CLI tool and as an ES module.

## Installation

Install globally via npm:

```bash
npm install -g npm-metadata
```

Or use it directly with npx:

```bash
npx npm-metadata -n <package-name> [-d <download-path>]
```

## Command-Line Interface (CLI)

Fetch and show metadata, or download it as JSON.

```bash
npm-metadata -n <package-name> [-d <download-path>]
```

### Options

- `-n, --name <name>`

  - **Required.** Specifies the npm package name whose metadata you want to fetch.

- `-d, --download [path]`
  - _Optional._ If this option is provided, downloads metadata to `<download-path>/<package-name>.json`.
  - If `path` is omitted, defaults to current working directory.

### Examples

- Fetch metadata for `express` and log it:

  ```bash
  npm-metadata -n express
  ```

- Fetch metadata and save it to `./data/express.json`:

  ```bash
  npm-metadata -n express -d ./data
  ```

## ES Module Integration

Use `npm-metadata` directly in your JavaScript/TypeScript code via ESM import:

```js
import { metadata } from "npm-metadata";

async function showLatest(tag) {
  const data = await metadata(tag);
  if (data && data["dist-tags"] && data["dist-tags"].latest) {
    console.log(`Latest version of ${tag}:`, data["dist-tags"].latest);
  } else {
    console.error("Failed to retrieve metadata for", tag);
  }
}

showLatest("react");
```

### How it Works

- `metadata(name: string) → Promise<any>`

  - Logs fetching status to console.
  - Uses `fetch` to get data from `https://registry.npmjs.org/<name>`.
  - Returns parsed JSON object.
  - Catches and logs errors if fetch fails.

## API Reference

### `async function metadata(name: string): Promise<any>`

Fetches metadata for the given npm package name.

- **Parameters**:

  - `name` — the package identifier (e.g., `express`, `lodash`).

- **Returns**:

  - A promise that resolves to the metadata object returned by the npm registry.

- **Errors**:

  - Logs error message and returns `undefined` if fetch fails or no name is provided.

## Sample Outputs

- **Console output** (without `-d`):

  ```
  Fetching package metadata for: express
  Package metadata fetched successfully.
  Use the -d option to download the package metadata.
  ```

- **Successful download**:

  ```
  Fetching package metadata for: express
  Package metadata fetched successfully.
  Package metadata for express downloaded to /path/to/express.json
  ```

## Why Use npm-metadata

- Instant access to full npm registry metadata (versions, dependencies, maintainers, etc.).
- Ideal for automation, reporting, or integration in build tools and CI/CD pipelines.
- Lightweight and simple API surface.

## License & Contributions

Licensed under MIT. Contributions via issues or pull requests are welcome.

## Quick Reference

| Mode         | Command / Code                                                     |
| ------------ | ------------------------------------------------------------------ |
| CLI fetch    | `npm-metadata -n <pkg>`                                            |
| CLI download | `npm-metadata -n <pkg> -d ./some-folder`                           |
| ES Module    | `import { metadata } from 'npm-metadata';` `await metadata('pkg')` |
