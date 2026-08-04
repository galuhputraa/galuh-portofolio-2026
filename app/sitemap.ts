import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/** Single-page site — the sections are anchors, not routes, so one entry. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
