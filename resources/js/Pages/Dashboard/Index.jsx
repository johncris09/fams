import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Card, CardContent } from "@mui/material";
import { Head } from "@inertiajs/react";
import { Link, usePage } from "@inertiajs/react";

export default function Dashboard() {

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />

      <Card>
        {/* <CardContent> Welcome {user.name}</CardContent>{" "} */}
      </Card>
    </AuthenticatedLayout>
  );
}
