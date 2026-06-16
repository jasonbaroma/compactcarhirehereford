import type { Metadata } from "next"

import { HomePage } from "@/components/homepage"
import { servicePages, withCanonicalPath } from "@/lib/site-content"

const pageContent = servicePages["truck-hire"]

export const metadata: Metadata = withCanonicalPath(
  pageContent.metadata,
  "/truck-hire",
)

export default function Page() {
  return <HomePage {...pageContent} />
}
