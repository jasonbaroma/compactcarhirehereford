import type { Metadata } from "next"

import { HomePage } from "@/components/homepage"
import { servicePages, withCanonicalPath } from "@/lib/site-content"

const pageContent = servicePages["minibus-hire"]

export const metadata: Metadata = withCanonicalPath(
  pageContent.metadata,
  "/minibus-hire",
)

export default function Page() {
  return <HomePage {...pageContent} />
}
