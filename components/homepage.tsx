import Image from "next/image"
import {
  IconBriefcase,
  IconCalendarCheck,
  IconCar,
  IconChevronDown,
  IconClock,
  IconPhone,
  IconReceipt,
  IconShieldCheck,
  IconSparkles,
} from "@tabler/icons-react"

import { NearbyLocations } from "@/components/nearby-locations"
import { Navbar } from "@/components/navbar"
import {
  type Faq,
  type LocalRelevanceBlock,
  siteConfig,
  type Vehicle,
  type WhyChooseItem,
} from "@/lib/site-content"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type HomePageProps = {
  currentLocationName?: string
  heroImage: string
  heroAlt: string
  heroTitle: string
  heroDescription: string
  heroSecondaryActionLabel?: string
  inventorySectionId?: string
  mainServiceKicker?: string
  mainServiceTitle: string
  mainServiceDescription: string
  mainVehicles: Vehicle[]
  mainVehicleAction: boolean
  whyChooseKicker?: string
  whyChooseTitle: string
  whyChooseDescription: string
  whyChooseItems: WhyChooseItem[]
  additionalServicesKicker?: string
  additionalServicesTitle?: string
  additionalServicesDescription?: string
  additionalVehicles?: Vehicle[]
  featureCtaTitle: string
  featureCtaDescription: string
  serviceAreasKicker?: string
  serviceAreasTitle?: string
  serviceAreasDescription?: string
  localRelevanceKicker?: string
  localRelevanceTitle: string
  localRelevanceDescription: string
  localRelevanceBlocks: LocalRelevanceBlock[]
  bottomCtaTitle: string
  bottomCtaDescription: string
  faqKicker?: string
  faqTitle?: string
  faqs: Faq[]
}

const whyChooseIcons = [
  IconCar,
  IconBriefcase,
  IconSparkles,
  IconClock,
  IconReceipt,
  IconShieldCheck,
]

function tokenFallback(name: string) {
  return `{{${name}}}`
}

function isTemplateToken(value: string) {
  return value.startsWith("{{") && value.endsWith("}}")
}

function getHeroImageFallback(inventorySectionId: string) {
  switch (inventorySectionId) {
    case "van-hire-vehicles":
      return "/van/hero.png"
    case "truck-hire-vehicles":
      return "/truck/hero.png"
    case "minibus-hire-vehicles":
      return "/minibus/hero.png"
    default:
      return "/compact-car/hero.png"
  }
}

function normalizeHeroImageSource(
  value: string,
  inventorySectionId: string,
) {
  if (isTemplateToken(value)) {
    return getHeroImageFallback(inventorySectionId)
  }

  if (value.startsWith("/")) {
    return value
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value
  }

  const normalized = value
    .replace(/^\.?\//, "")
    .replace(/^public\//, "")

  if (normalized.startsWith("images/")) {
    return `/${normalized}`
  }

  return `/images/${normalized}`
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-primary">
      {children}
    </p>
  )
}

function renderParagraphs(
  content: string,
  className: string,
  keyPrefix: string,
) {
  return content.split(/\n\s*\n/).map((paragraph, index) => (
    <p key={`${keyPrefix}-${index}`} className={className}>
      {paragraph.trim()}
    </p>
  ))
}

function faqAnswer(question: string) {
  if (question.toLowerCase().includes("cost")) {
    return "The cost depends on the vehicle, hire length, booking date, availability and collection requirements. Daily, weekend and weekly hire options may all be available, so it is worth calling to compare the most suitable price for your plans."
  }

  if (question.toLowerCase().includes("central")) {
    return "Yes, compact car hire near Cardiff Central is a common choice for people arriving by train, staying in the city centre or heading to meetings nearby. It is especially convenient if you want to continue your journey without relying on taxis or public transport."
  }

  if (question.toLowerCase().includes("suitable for driving")) {
    return "Yes, a compact car is well suited to Cardiff because it is easier to park, economical to run and comfortable for city driving. It is useful around the city centre, Cardiff Bay, residential districts and local business areas."
  }

  if (question.toLowerCase().includes("same day")) {
    return "Same-day availability depends on the fleet and booking demand. Calling as early as possible gives you the best chance of securing a suitable compact car for urgent travel."
  }

  if (question.toLowerCase().includes("automatic")) {
    return "Automatic compact cars may be available, including options such as the Hyundai i10 Auto and Focus Auto. Availability can be more limited than manual vehicles, so it is best to request an automatic car when booking."
  }

  if (question.toLowerCase().includes("airport")) {
    return "Yes, compact car hire works well for Cardiff Airport travel, short stays, business trips and onward journeys across South Wales. It gives you flexibility after arriving and is easier to park than many larger vehicles."
  }

  return "Before booking, you will usually need a valid driving licence, proof of ID and a suitable payment card. Deposit requirements, insurance conditions, driver age rules and card policies can vary, so it is best to confirm the details when you call."
}

export function HomePage(props: HomePageProps) {
  const {
    currentLocationName = siteConfig.locationName,
    heroImage,
    heroAlt,
    heroTitle,
    heroDescription,
    heroSecondaryActionLabel = tokenFallback("heroSecondaryCtaLabel"),
    inventorySectionId = "featured-vehicles",
    mainServiceKicker = tokenFallback("mainSectionKicker"),
    mainServiceTitle,
    mainServiceDescription,
    mainVehicles,
    mainVehicleAction,
    whyChooseKicker = tokenFallback("whyChooseKicker"),
    whyChooseTitle,
    whyChooseDescription,
    whyChooseItems,
    additionalServicesKicker = tokenFallback("additionalServicesKicker"),
    additionalServicesTitle,
    additionalServicesDescription,
    additionalVehicles,
    featureCtaTitle,
    featureCtaDescription,
    serviceAreasKicker = tokenFallback("serviceAreasKicker"),
    serviceAreasTitle,
    serviceAreasDescription,
    localRelevanceKicker = tokenFallback("localRelevanceKicker"),
    localRelevanceTitle,
    localRelevanceDescription,
    localRelevanceBlocks,
    bottomCtaTitle,
    bottomCtaDescription,
    faqKicker = tokenFallback("faqKicker"),
    faqTitle = tokenFallback("faqTitle"),
    faqs,
  } = props

  const phoneHref = `tel:${siteConfig.phone.replaceAll(" ", "")}`
  const resolvedHeroImage = normalizeHeroImageSource(
    heroImage,
    inventorySectionId,
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar currentLocationName={currentLocationName} />

      <main>
        <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden">
          <Image
            src={resolvedHeroImage}
            alt={heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
            <div className="max-w-3xl text-white">
              <h1 className="font-heading text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
                {heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-xl leading-9 text-white/88">
                {heroDescription}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-11 px-5">
                  <a href={phoneHref}>
                    <IconPhone className="size-4" />
                    Call {siteConfig.displayPhone}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 border-white/30 bg-white/10 px-5 text-white hover:bg-sidebar-foreground/20 hover:text-white"
                >
                  <a href={`#${inventorySectionId}`}>
                    <IconCalendarCheck className="size-4" />
                    {heroSecondaryActionLabel}
                  </a>
                </Button>
              </div>
            </div>

            <Card className="border border-white/30 bg-white/10 px-4 py-6 text-white shadow-2xl backdrop-blur-md">
              <CardHeader className="px-2">
                <div className="flex items-center gap-2">
                  <IconClock className="size-5" />
                  <p className="font-semibold uppercase tracking-[0.16em]">
                    Opening Hours
                  </p>
                </div>
              </CardHeader>
              <CardContent className="px-4">
                <dl className="space-y-4">
                  <div className="flex items-center justify-between gap-4 border-b pb-3">
                    <dt className="font-medium">Monday - Friday</dt>
                    <dd className="font-semibold text-primary">
                      8:00 AM - 6:00 PM
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b pb-3">
                    <dt className="font-medium">Saturday</dt>
                    <dd className="font-semibold text-primary">
                      8:00 AM - 5:00 PM
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="font-medium">Sunday</dt>
                    <dd className="font-semibold text-primary">
                      9:00 AM - 5:00 PM
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id={inventorySectionId} className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Kicker>{mainServiceKicker}</Kicker>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-4xl font-semibold sm:text-5xl">
                {mainServiceTitle}
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                {mainServiceDescription}
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-4">
              {mainVehicles.map((vehicle) => (
                <Card key={vehicle.title} className="shadow-sm">
                  <div className="relative aspect-4/3 bg-muted/35">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-3"
                    />
                  </div>
                  <CardContent className="flex min-h-64 flex-col px-5">
                    <CardTitle className="text-2xl font-semibold">
                      {vehicle.title}
                    </CardTitle>
                    <CardDescription className="mb-5 mt-3 flex-1 text-base leading-7">
                      {vehicle.body}
                    </CardDescription>
                    {mainVehicleAction && (
                      <Button asChild className="text-md w-full py-4">
                        <a href={phoneHref}>{siteConfig.ui.bookNowLabel}</a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/45 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Kicker>{whyChooseKicker}</Kicker>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-4xl font-semibold sm:text-5xl">
                {whyChooseTitle}
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                {whyChooseDescription}
              </p>
            </div>
            <div className="mt-10 grid gap-9 sm:grid-cols-2 lg:grid-cols-3">
              {whyChooseItems.map((item, index) => {
                const Icon = whyChooseIcons[index % whyChooseIcons.length]

                return (
                  <Card key={item.title} className="px-5 py-7">
                    <CardHeader className="flex flex-row items-center gap-3 px-0 py-2">
                      <Icon className="size-9 shrink-0 text-primary" />
                      <CardTitle className="text-2xl font-semibold">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0">
                      <CardDescription>{item.body}</CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {additionalServicesTitle && additionalServicesDescription && (
          <section className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <Kicker>{additionalServicesKicker}</Kicker>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-heading text-4xl font-semibold sm:text-5xl">
                  {additionalServicesTitle}
                </h2>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  {additionalServicesDescription}
                </p>
              </div>
              {additionalVehicles && (
                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {additionalVehicles.map((vehicle) => (
                    <Card key={vehicle.title} className="shadow-md/5">
                      <div className="relative aspect-4/3 bg-muted/35">
                        <Image
                          src={vehicle.image}
                          alt={vehicle.alt}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-contain p-3"
                        />
                      </div>
                      <CardHeader className="px-5">
                        <CardTitle className="text-xl font-semibold">
                          {vehicle.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-5">
                        <CardDescription className="text-base leading-7">
                          {vehicle.body}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <section className="bg-primary px-4 py-16 text-primary-foreground sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-3xl text-start">
              <h2 className="font-heading text-4xl font-semibold">
                {featureCtaTitle}
              </h2>
              <p className="mt-3 text-lg leading-8 text-primary-foreground/88">
                {featureCtaDescription}
              </p>
            </div>
            <Button asChild variant="secondary" size="lg" className="h-11 px-5">
              <a href={phoneHref}>Call {siteConfig.displayPhone}</a>
            </Button>
          </div>
        </section>

        <NearbyLocations
          currentLocationName={currentLocationName}
          kicker={serviceAreasKicker}
          title={serviceAreasTitle ?? tokenFallback("serviceAreasTitle")}
          description={
            serviceAreasDescription ?? tokenFallback("serviceAreasDescription")
          }
        />

        <section className="bg-muted/45 px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Kicker>{localRelevanceKicker}</Kicker>
            <h2 className="font-heading text-4xl font-semibold sm:text-5xl">
              {localRelevanceTitle}
            </h2>
            <div className="mx-auto mt-4 max-w-3xl space-y-4 text-lg leading-8 text-muted-foreground">
              {renderParagraphs(
                localRelevanceDescription,
                "text-lg leading-8 text-muted-foreground",
                "local-description",
              )}
            </div>
            <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-10">
              {localRelevanceBlocks.map((block) => (
                <section key={block.title} className="text-start">
                  <h3 className="font-heading text-2xl font-semibold">
                    {block.title}
                  </h3>
                  <div className="mt-3 space-y-4">
                    {renderParagraphs(
                      block.body,
                      "text-lg leading-8 text-muted-foreground",
                      block.title,
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Kicker>{faqKicker}</Kicker>
            <h2 className="font-heading text-4xl font-semibold sm:text-5xl">
              {faqTitle}
            </h2>
            <div className="mt-10 space-y-6 text-left">
              {faqs.map((faq) => {
                const question = typeof faq === "string" ? faq : faq.question
                const answer =
                  typeof faq === "string" ? faqAnswer(faq) : faq.answer

                return (
                  <Card key={question}>
                    <details className="group px-5 py-2">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium [&::-webkit-details-marker]:hidden">
                        {question}
                        <IconChevronDown className="size-5 shrink-0 text-primary transition group-open:rotate-180" />
                      </summary>
                      <p className="mt-3 text-base leading-7 text-muted-foreground">
                        {answer}
                      </p>
                    </details>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-lg border border-primary/30 bg-primary px-6 py-14 text-center text-primary-foreground shadow-2xl shadow-primary/25 sm:px-10">
            <h2 className="font-heading text-4xl font-semibold sm:text-5xl">
              {bottomCtaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-primary-foreground/90">
              {bottomCtaDescription}
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-base mt-8 h-11 px-5"
            >
              <a href={phoneHref}>Call {siteConfig.displayPhone}</a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-nav-footer-bg px-4 py-12 text-center text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-5">
          <div className="flex items-center justify-center gap-2">
            <Image
              src="/logo.png"
              alt={`${siteConfig.businessName} logo`}
              width={70}
              height={70}
              className="h-auto w-auto object-contain"
            />
            <span className="font-heading text-2xl font-semibold">
              {currentLocationName}
            </span>
          </div>
          <a href={phoneHref} className="text-lg font-semibold text-white">
            {siteConfig.displayPhone}
          </a>
          <p className="text-base text-white/72">
            {siteConfig.ui.footerCopyrightLabel}
          </p>
        </div>
      </footer>
    </div>
  )
}
