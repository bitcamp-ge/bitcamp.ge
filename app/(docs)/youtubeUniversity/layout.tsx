import { docsConfig } from "@/config/docs"
import { DocsSidebarNav } from "@/components/sidebar-nav"

interface ProgramsLayoutProps {
  children: React.ReactNode
}

export default function ProgramLayout({ children }: ProgramsLayoutProps) {
  return <div>{children}</div>
}
// <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-10">
{
  /* <DocsSidebarNav items={docsConfig.YoutubeUniversityNav} /> */
}
// </aside>
