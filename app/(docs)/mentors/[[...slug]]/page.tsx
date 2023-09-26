import { notFound } from "next/navigation"
import { allMentors } from "contentlayer/generated"

import { getTableOfContents } from "@/lib/toc"
import { Mdx } from "@/components/mdx-components"
import { DocsPageHeader } from "@/components/page-header"
import { DocsPager } from "@/components/pager"
import { DashboardTableOfContents } from "@/components/toc"

import "@/styles/mdx.css"
import { Metadata } from "next"

import { env } from "@/env.mjs"
import { absoluteUrl } from "@/lib/utils"

interface MentorPageProps {
  params: {
    slug: string[]
  }
}

async function getMentorFromParams(params) {
  const slug = params.slug?.join("/") || ""
  const mentor = allMentors.find((mentor) => mentor.slugAsParams === slug)

  if (!mentor) {
    null
  }

  return mentor
}

export async function generateMetadata({
  params,
}: MentorPageProps): Promise<Metadata> {
  const mentor = await getMentorFromParams(params)

  if (!mentor) {
    return {}
  }

  const url = env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("heading", mentor.description ?? mentor.title)
  ogUrl.searchParams.set("type", "Documentation")
  ogUrl.searchParams.set("mode", "dark")

  return {
    title: mentor.title,
    description: mentor.description,
    openGraph: {
      title: mentor.title,
      description: mentor.description,
      type: "article",
      url: absoluteUrl(mentor.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: mentor.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: mentor.title,
      description: mentor.description,
      images: [ogUrl.toString()],
    },
  }
}

export async function generateStaticParams(): Promise<
  MentorPageProps["params"][]
> {
  return allMentors.map((mentor) => ({
    slug: mentor.slugAsParams.split("/"),
  }))
}

export default async function DocPage({ params }: MentorPageProps) {
  const mentor = await getMentorFromParams(params)

  if (!mentor) {
    notFound()
  }

  const toc = await getTableOfContents(mentor.body.raw)

  return (
    <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader heading={mentor.title} text={mentor.description} />
        <Mdx code={mentor.body.code} />
        <hr className="my-4 md:my-6" />
        <DocsPager doc={mentor} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  )
}
