import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { HomePage } from "@/components/homepage"
import { locationSlugEntries } from "@/lib/location-links"
import { locationPageContents, withCanonicalPath } from "@/lib/site-content"

type PageProps = {
  params: Promise<{
    location: string
  }>
}

export function generateStaticParams() {
  return locationSlugEntries.map((entry) => ({
    location: entry.slug,
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { location } = await params
  const match = locationSlugEntries.find((entry) => entry.slug === location)

  if (!match) {
    return {}
  }

  return withCanonicalPath(
    locationPageContents[match.index].metadata,
    `/${match.slug}`,
  )
}

export default async function LocationSlugPage({ params }: PageProps) {
  const { location } = await params
  const match = locationSlugEntries.find((entry) => entry.slug === location)

  if (!match) {
    notFound()
  }

  return <HomePage {...locationPageContents[match.index]} />
}
