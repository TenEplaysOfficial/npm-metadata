export interface MetadataOptions {
  /**
   * Suppress console logging if true.
   */
  silentLog?: boolean;
}

export interface NpmPackageMetadata {
  name: string;
  version: string;
  description?: string;
  [key: string]: any;
}

/**
 * Fetch metadata from the npm registry for a given package.
 *
 * @param name - Name of the npm package.
 * @param options - Optional config to suppress logs.
 * @returns A promise resolving to the metadata or undefined.
 */
export declare function metadata(
  name: string,
  options?: MetadataOptions
): Promise<NpmPackageMetadata | undefined>;
