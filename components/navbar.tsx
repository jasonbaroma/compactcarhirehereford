"use client"

import Image from "next/image"
import Link from "next/link"
import { IconCalendarCheck } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { buildLocationLinks } from "@/lib/location-links"
import { serviceNavigation, siteConfig } from "@/lib/site-content"

export function Navbar({
  currentLocationName = siteConfig.locationName,
}: {
  currentLocationName?: string
}) {
  const locations = buildLocationLinks(currentLocationName)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-nav-footer-bg text-white shadow-sm">
      <nav className="mx-auto flex min-h-20 w-full max-w-7xl flex-wrap items-center justify-center gap-4 px-4 py-3 sm:px-6 md:justify-between lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/logo.png"
            alt={`${siteConfig.businessName} logo`}
            width={70}
            height={70}
            className="h-auto w-auto object-contain"
            priority
          />
          <div className="flex min-w-0 flex-col justify-center truncate font-heading text-xl font-semibold leading-tight sm:text-2xl">
            {currentLocationName}
          </div>
        </Link>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <NavigationMenu
            viewport={false}
            className="flex-none justify-end gap-3"
          >
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-10 rounded-md bg-transparent px-3 text-base font-medium text-white/88 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-open:bg-white/10 data-open:text-white">
                  {siteConfig.ui.navLocationsLabel}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute top-full z-50 mt-2 w-60 rounded-md border border-border bg-popover p-2 text-popover-foreground shadow-xl sm:w-72">
                  {locations.map((area) => (
                    <NavigationMenuLink
                      key={area.href}
                      asChild
                      className="flex min-h-12 w-full items-center rounded-sm px-4 py-3 text-base font-medium leading-6 text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                    >
                      <Link href={area.href}>{area.label}</Link>
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-10 rounded-md bg-transparent px-3 text-base font-medium text-white/88 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-open:bg-white/10 data-open:text-white">
                  {siteConfig.ui.navServicesLabel}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute top-full z-50 mt-2 w-max min-w-60 max-w-[calc(100vw-2rem)] rounded-md border border-border bg-popover p-2 text-popover-foreground shadow-xl">
                  {serviceNavigation.map((service) => (
                    <NavigationMenuLink
                      key={service.label}
                      asChild
                      className="flex min-h-12 w-full items-center whitespace-nowrap rounded-sm px-4 py-3 text-base font-medium leading-6 text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                    >
                      <Link href={service.route}>{service.label}</Link>
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button
            asChild
            size="lg"
            className="h-10 w-full px-3 text-base sm:px-4 md:w-auto"
          >
            <a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}>
              <IconCalendarCheck className="size-4" />
              <span className="hidden sm:inline">
                {siteConfig.ui.navCallToBookLabel}
              </span>
              <span className="sm:hidden">{siteConfig.ui.navCallShortLabel}</span>
            </a>
          </Button>
        </div>
      </nav>
    </header>
  )
}
