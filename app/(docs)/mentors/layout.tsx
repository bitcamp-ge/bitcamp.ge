import { docsConfig } from "@/config/docs"
import { DocsSidebarNav } from "@/components/sidebar-nav"

interface MentorsLayoutProps {
  children: React.ReactNode
}

export default function MentorLayout({ children }: MentorsLayoutProps) {
  return (
    <div className="flex-1 md:grid md:gap-6 lg:gap-10">
      {/* <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-10">
        <DocsSidebarNav items={docsConfig.aboutProgramsNav} />
        <DocsSidebarNav items={docsConfig.mentorsNav} />
      </aside> */}
      {children}
    </div>
  )
}
