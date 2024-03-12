import { ReactComponentElement } from "react"
import { User } from "@prisma/client"
import type { Icon } from "lucide-react"

import { Icons } from "@/components/icons"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
    facebook: string
    discord: string
  }
}

export type YoutubeUniversity = {
  name: string
  badge: string
  description: string
  url: string
  icon: string
}

export type Program = {
  name: string
  badge: string
  description: string
  url: string
  icon: string
  technologies: string[]
  products: {
    ProductId: number
    title: string
    price: string
    description: string
  }[]
}

export type Mentor = {
  name: string
  badge: string
  description: string
  url: string
  icon: string
  technologies: string[]
  products: {
    ProductId: number
    title: string
    price: string
    description: string
  }[]
}

export type Subject = {
  name: string
  badge: string
  description: string
  url: string
  icon: string
  technologies: string[]
}

export type DocsConfig = {
  YoutubeUniversityNav: SidebarNavItem[]
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
  aboutProgramsNav: SidebarNavItem[]
  universalProgramsNav: SidebarNavItem[]
  frontendProgramsNav: SidebarNavItem[]
  backendProgramsNav: SidebarNavItem[]
  fullstackProgramsNav: SidebarNavItem[]
  kidsProgramsNav: SidebarNavItem[]
  mentorsNav: SidebarNavItem[]
  classesNav: SidebarNavItem[]
  javasScript2023ClassNav: SidebarNavItem[]
  javasScript2024ClassNav: SidebarNavItem[]
  frontEndBasics2023ClassNav: SidebarNavItem[]
  python2023ClassNav: SidebarNavItem[]
  react2022ClassNav: SidebarNavItem[]
  react2023ClassNav: SidebarNavItem[]
  python2024ClassNav: SidebarNavItem[]
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }

declare global {
  interface Window {
    fbq: Function
  }
}

export type IntentItem = {
  machine_name: string
  description: string
  url: string
  service_id: number
  program_id: number
  mentor_id: number
  status: string
  action: string
  actionLabel: string
}

export type IntentItems = {
  free: IntentItem
  minimal: IntentItem
  common: IntentItem
  private: IntentItem
  pro: IntentItem
  kids: IntentItem
  none: IntentItem
}
