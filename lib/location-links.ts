import { slugifyLocation } from "@/lib/utils"

export const mainLocationLink = {
  label: "Hereford",
  href: "/",
}

const LOCATION_NAMES = [
  "Leominster",
  "Ross-on-Wye",
  "Monmouth",
  "Worcester",
  "Ledbury",
  "Abergavenny",
  "Ludlow",
  "Gloucester",
] as const

export const nearbyLocationLinks = LOCATION_NAMES.map((label, index) => ({
  index: index + 1,
  label,
  href: `/${slugifyLocation(label)}`,
}))

export function buildLocationLinks(currentLocationLabel?: string) {
  return [mainLocationLink, ...getNearbyLocationLinks(currentLocationLabel)]
}

export function getNearbyLocationLinks(currentLocationLabel?: string) {
  const currentSlug = currentLocationLabel
    ? slugifyLocation(currentLocationLabel)
    : ""

  return nearbyLocationLinks.filter(
    (location) => location.href !== `/${currentSlug}`,
  )
}

export const locationSlugEntries = LOCATION_NAMES.map((label, index) => ({
  index: index + 1,
  label,
  slug: slugifyLocation(label),
}))
