import Link from "next/link"
import { IconMapPin } from "@tabler/icons-react"

import { buildLocationLinks } from "@/lib/location-links"

type NearbyLocationsProps = {
  currentLocationName?: string
  kicker: string
  title: string
  description: string
}

export function NearbyLocations({
  currentLocationName,
  kicker,
  title,
  description,
}: NearbyLocationsProps) {
  const locationLinks = buildLocationLinks(currentLocationName)

  return (
    <section className="px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          {kicker}
        </p>
        <h2 className="font-heading text-4xl font-semibold sm:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
          {description}
        </p>
        <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-3">
          {locationLinks.map((location) => (
            <Link
              key={location.href}
              href={location.href}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border bg-card px-4 text-base font-semibold"
            >
              <IconMapPin className="size-5 shrink-0" />
              {location.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
