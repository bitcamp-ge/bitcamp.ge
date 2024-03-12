import { notFound } from "next/navigation"
import { allPrograms } from "contentlayer/generated"

import { getTableOfContents } from "@/lib/toc"
import { Badge } from "@/components/ui/badge"
import { Mdx } from "@/components/mdx-components"
import { DocsPageHeader } from "@/components/page-header"
import { DocsPager } from "@/components/pager"
import { DashboardTableOfContents } from "@/components/toc"

import "@/styles/mdx.css"
import { Metadata } from "next"
import Link from "next/link"

import { env } from "@/env.mjs"
import { programs } from "@/config/programs"
import { absoluteUrl, generateDefaultMetaData } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface ProgramPageProps {
  params: {
    slug: string[]
  }
}

async function getProgramFromParams(params) {
  const slug = params.slug?.join("/") || ""
  const program = allPrograms.find((program) => program.slugAsParams === slug)

  if (!program) {
    null
  }

  return program
}

export async function generateMetadata({ params }: ProgramPageProps) {
  const page = await getProgramFromParams(params)

  if (!page) {
    return {}
  }

  return generateDefaultMetaData(page)
}

export async function generateStaticParams(): Promise<
  ProgramPageProps["params"][]
> {
  return allPrograms.map((program) => ({
    slug: program.slugAsParams.split("/"),
  }))
}

const ProgramCards = () => {
  return (
    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {programs.map((program) => {
        const Icon = Icons[program.icon]
        return (
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[400px] flex-col justify-between rounded-md p-6">
              <span className="mx-auto my-0">
                <Icon className="h-12 w-12" />
              </span>
              <div className="space-y-2">
                <h3 className="font-bold">
                  {program.name}{" "}
                  <Badge variant="outline" className="mr-2">
                    {program.badge}
                  </Badge>
                </h3>
                <p className="text-sm text-muted-foreground">
                  {program.description}
                </p>
                <div className="py-4">
                  {program.technologies.map((technology) => (
                    <Badge variant="secondary" className="mr-2">
                      {technology}
                    </Badge>
                  ))}
                </div>
                <div className="flex">
                  <Link
                    href={program.url}
                    className={
                      buttonVariants({ variant: "default" }) + " mb-4 w-full"
                    }
                  >
                    ვრცლად
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default async function DocPage({ params }: ProgramPageProps) {
  const program = await getProgramFromParams(params)


  if (!program) {
    notFound()
  }

  const toc = await getTableOfContents(program.body.raw)
  return (
    <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid">
      <div className="mx-auto w-full min-w-0">
        {program.title === "BitCamp - ის პროგრამები" ? (
          <ProgramCards /> 
        ) : (
          <>
            <DocsPageHeader
              heading={program.title}
              text={program.description}
            />
            <Mdx code={program.body.code} />
            <hr className="my-4 md:my-6" />
            <DocsPager doc={program} />
          </>
        )}
      </div>
      {/* <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div> */}
    </main>
  )
}
