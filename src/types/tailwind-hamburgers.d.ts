declare module "tailwind-hamburgers" {
  import type { Config } from "tailwindcss";

  const plugin: NonNullable<Config["plugins"]>[number];
  export default plugin;
}
