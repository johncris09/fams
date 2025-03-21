
import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  CreditCard,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  PieChart,
  Settings,
  Settings2,
  Settings2Icon,
  SquareTerminal,
  UserCheck2,
  UserIcon,
  Users,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ChecklistOutlined, Money, MoneyOffCsred, MoneyOffSharp, MoneyOutlined, Sick, SickOutlined } from "@mui/icons-material"
// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: route("dashboard"),
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Patients",
      url: route("patients.index"),
      icon: SickOutlined,
    },
    {
      title: "Claimants",
      url: route("claimants.index"),
      icon: UserCheck2,
    },
    {
      title: "Financial Types",
      url: route("financial_types.index"),
      icon: ChecklistOutlined,
    },
    {
      title: "Cash Advances",
      url: route("cash_advances.index"),
      icon: CreditCard,
    },
    // {
    //   title: "Users",
    //   url: route("users.index"),
    //   icon: Users,
    //   items: [
    //     {
    //       title: "Genesis",
    //       url: "#",
    //     },
    //     {
    //       title: "Explorer",
    //       url: "#",
    //     },
    //     {
    //       title: "Quantum",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Account",
    //   url: route("profile.edit"),
    //   icon: Settings,
    //   items: [
    //     {
    //       title: "Profile",
    //       url: route("profile.edit"),
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2Icon,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
}

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
