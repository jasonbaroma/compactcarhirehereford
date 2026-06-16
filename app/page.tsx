import type { Metadata } from "next"

import { HomePage } from "@/components/homepage"
import { servicePages, withCanonicalPath } from "@/lib/site-content"

const pageContent = servicePages["compact-car"]

export const metadata: Metadata = withCanonicalPath(pageContent.metadata, "/")

export default function Page() {
  return <HomePage {...pageContent} />
}
