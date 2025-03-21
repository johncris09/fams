import React, { useState } from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/Components/ui/separator"
import { Breadcrumbs } from "@/Components/Breadcrumb"
import { ToastContainer } from "react-toastify"

export default function Layout({ children }) {
  const [open, setOpen] = useState(true)

  return (
    <SidebarProvider defaultOpen={true} open={open} onOpenChange={setOpen}>
      <AppSidebar />

      <SidebarInset className=" !mt-0">
        <header className="flex sticky top-0 z-10 gap-2 items-center h-16 border-b shrink-0 bg-background">
          <div className="flex gap-2 items-center px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs  />
          </div>
        </header>
        <div className="flex overflow-y-auto flex-col flex-1 gap-4 p-4 pt-8">
          {children}
        </div>

      <ToastContainer />
      </SidebarInset>
    </SidebarProvider>
  )
}
