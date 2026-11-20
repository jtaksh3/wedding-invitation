const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath = configuredBasePath === "/" ? "" : configuredBasePath;

export function publicAsset(path: `/${string}`): string {
  return `${basePath}${path}`;
}

export const wishesFormEndpoint = "https://formspree.io/f/xoednjkl";
