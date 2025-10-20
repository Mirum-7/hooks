import type { BuildConfig } from "@mirum7/bun-build";

const config: BuildConfig = {
  target: "browser",
  minify: true,
  external: ['@mirum7/fn'],
};

export default config;
