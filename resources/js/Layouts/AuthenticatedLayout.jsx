import React, { useEffect, useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/Components/ui/separator";
import { Breadcrumbs } from "@/Components/Breadcrumb";
import { ToastContainer } from "react-toastify";
import { NavUser } from "@/Components/nav-user";
import { usePage } from "@inertiajs/react";
import { X } from "lucide-react";

export default function Layout({ children }) {
  const [open, setOpen] = useState(true);
  const { auth, flash } = usePage().props;

  const [visible, setVisible] = useState(true);
  const [messages, setMessages] = useState([]);
  // Process flash messages when they change
  useEffect(() => {
    const newMessages = [];

    if (flash.success) {
      newMessages.push({ message: flash.success, type: "success" });
    }

    if (flash.error) {
      newMessages.push({ message: flash.error, type: "error" });
    }

    if (flash.warning) {
      newMessages.push({ message: flash.warning, type: "warning" });
    }

    if (flash.info) {
      newMessages.push({ message: flash.info, type: "info" });
    }

    if (flash.message) {
      newMessages.push({ message: flash.message, type: "info" });
    }

    if (newMessages.length > 0) {
      setMessages(newMessages);
      setVisible(true);

      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setVisible(false);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [flash]);

  return (
    <SidebarProvider defaultOpen={true} open={open} onOpenChange={setOpen}>
      <AppSidebar auth={auth.user} />

      <SidebarInset className=" !mt-0">
        <header className="flex sticky top-0 z-10 gap-2 items-center h-16 border-b shrink-0 bg-background">
          <div className="flex gap-2 items-center px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs />
          </div>
          <div className="ml-auto">
            <NavUser isNavbar />
          </div>
        </header>
        <div className="flex overflow-y-auto flex-col flex-1 gap-4 p-4 pt-8">
          <div className="fixed top-4 right-4 z-50 w-full max-w-md space-y-2">
            {visible &&
              messages.length > 0 &&
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`rounded-md p-4 shadow-md transition-all duration-300 ${
                    msg.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : msg.type === "error"
                      ? "bg-red-50 text-red-800 border border-red-200"
                      : msg.type === "warning"
                      ? "bg-yellow-50 text-yellow-800 border border-yellow-200"
                      : "bg-blue-50 text-blue-800 border border-blue-200"
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{msg.message}</p>
                    </div>
                    <button
                      type="button"
                      className="ml-4 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={() => setVisible(false)}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
          {children}
        </div>

        <ToastContainer />
      </SidebarInset>
    </SidebarProvider>
  );
}
