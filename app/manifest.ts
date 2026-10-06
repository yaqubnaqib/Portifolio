import type { MetadataRoute } from "next";
import { PROFILE } from "@/data/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${PROFILE.name}, ${PROFILE.role}`,
    short_name: PROFILE.name,
    description: PROFILE.metaDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    lang: "en",
    dir: "ltr",
    theme_color: "#9cd5ee",
    background_color: "#262626",
    categories: ["portfolio", "developer"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
