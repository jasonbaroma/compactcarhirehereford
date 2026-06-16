import type { MetadataRoute } from "next"

import { getMetadataBase } from "@/lib/site-content"

export default function robots(): MetadataRoute.Robots {
  const metadataBase = getMetadataBase()

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", metadataBase).toString(),
    host: metadataBase.toString(),
  }
}
