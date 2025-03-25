import {
  CreditCard, GroupIcon,
  LayoutDashboard, UserCheck2,
  UserIcon
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter, SidebarRail
} from "@/components/ui/sidebar";
import {
  ChecklistOutlined, SickOutlined
} from "@mui/icons-material";
import { usePage } from "@inertiajs/react";

export function AppSidebar({ ...props }) {
  const { auth } = usePage().props;
  const userRoles = auth.user?.roles || []; // Get user roles
  const userPermissions = auth.user?.permissions || []; // Get user permissions

  // This is sample data.
  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: route("dashboard"),
        icon: LayoutDashboard,
        isActive: true,
        roles: ["Super Admin", "Admin", "User"],
      },
      {
        title: "Patients",
        url: route("patients.index"),
        icon: SickOutlined,
        roles: ["Super Admin", "Admin", "User"],
      },
      {
        title: "Claimants",
        url: route("claimants.index"),
        icon: UserCheck2,
        roles: ["Super Admin", "Admin", "User"],
      },
      {
        title: "Financial Types",
        url: route("financial_types.index"),
        icon: ChecklistOutlined,
        roles: ["Super Admin", "Admin", "User"],
      },
      {
        title: "Cash Advances",
        url: route("cash_advances.index"),
        icon: CreditCard,
        roles: ["Super Admin", "Admin", "User"],
      },
      {
        title: "Users",
        url: route("users.index"),
        icon: UserIcon,
        roles: ["Super Admin" ],
      },
      {
        title: "Roles",
        url: route("roles.index"),
        icon: GroupIcon,
        roles: ["Super Admin" ],
      },
    ],
  };

  const filteredNavMain = data.navMain.filter(
    (item) =>
      !item.roles ||
      item.roles.some((role) => userRoles.includes(role)) ||
      (item.permissions &&
        item.permissions.some((perm) => userPermissions.includes(perm)))
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={filteredNavMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
