import type { MetadataRoute } from "next"

import { locationSlugEntries } from "@/lib/location-links"
import { getMetadataBase } from "@/lib/site-content"

export default function sitemap(): MetadataRoute.Sitemap {
  const metadataBase = getMetadataBase()
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: new URL("/", metadataBase).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/van-hire", metadataBase).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: new URL("/minibus-hire", metadataBase).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: new URL("/truck-hire", metadataBase).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]

  const locationRoutes: MetadataRoute.Sitemap = locationSlugEntries.map(
    (entry) => ({
      url: new URL(`/${entry.slug}`, metadataBase).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  )

  return [...staticRoutes, ...locationRoutes]
}
