# Campus X Launchpad — Guidelines

## Components

The design system exports these components — import them from `@ws-mfkzyzfi2o4usw2umcz0/1d9778e6-2419-43b2-abbb-54ef30157979` and compose them before building anything from scratch:

`AgentTeamPanel`, `AiFixButton`, `AiHelperFab`, `AiosFaq`, `AiosHero`, `AiosJourney`, `AiosTeamsPricing`, `AiosTeaser`, `AiosWorkflow`, `AppLayout`, `AuthProvider`, `BlockEditor`, `BlockView`, `BlocksRenderer`, `BlogStudioWizard`, `Button`, `CompanyMarquee`, `Constants`, `DiscountBadge`, `DiscountRibbon`, `FeatureCarousel`, `FeatureShell`, `FeaturedBlogsSection`, `HeroOrbit`, `HowItWorks`, `LiveCounters`, `LiveFeed`, `LiveStats`, `LiveTicker`, `MarketingLayout`, `NewsletterBlock`, `OpportunityDetailSheet`, `OpportunityFreshness`, `OpportunityNetworkSection`, `RadarScope`, `StrikethroughPrice`, `TeamConsole`, `TeamDetailSheet`, `TeamPurchaseDialog`, `TechMarquee`, `TestimonialsShowcase`, `TypographyPanel`, `UpiPayButtons`

Per-component details (import stanzas, props, variants, examples) live in `.lovable/rules/libraries/{slug}/components.md` — on disk, not auto-loaded. Read that file or the component source when the name alone isn't enough.

## Theme Files

The design system's theme is delivered through the following files. The author's original source files carry the full wiring the design system needs — variable declarations, framework-specific directives, provider objects, etc. — and are the canonical import target.

- `@ws-mfkzyzfi2o4usw2umcz0/1d9778e6-2419-43b2-abbb-54ef30157979/styles.css` (source — preferred import)
- `@ws-mfkzyzfi2o4usw2umcz0/1d9778e6-2419-43b2-abbb-54ef30157979/dist/tokens.css` (auto-generated flat list of CSS custom properties — a raw-values fallback only; does NOT carry framework-specific wiring that the source files above provide)

