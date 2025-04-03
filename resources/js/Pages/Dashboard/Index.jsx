import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Head } from "@inertiajs/react";
import { Link, usePage } from "@inertiajs/react";
import {
  ArrowUpDown,
  DollarSign,
  FilesIcon,
  PersonStandingIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, ArrowUpRight, UserCheck2 } from "lucide-react";
import StatCard from "./StatCard";
import {
  Balance,
  BalanceOutlined,
  BalanceTwoTone,
  Money,
  MoneyOff,
  MoneySharp,
  MoneyTwoTone,
  SickOutlined,
} from "@mui/icons-material";
import { useMemo, useState } from "react";
export default function Dashboard() {
  const {
    totalCashAdvance,
    totalAmountClaims,
    remainingCashAdvance,
    user,
    totalClaimants,
    totalPatients,
    totalUsers,
    totalClaims,
    totalAmountByFinancialAssistanceTypes,
  } = usePage().props;

  // Calculate total
  const total = useMemo(() => {
    return totalAmountByFinancialAssistanceTypes.reduce(
      (sum, item) => sum + Number.parseFloat(item.total_amount),
      0
    );
  }, [totalAmountByFinancialAssistanceTypes]);

  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("type");

  // Sort data
  const sortedData = useMemo(() => {
    return [...totalAmountByFinancialAssistanceTypes].sort((a, b) => {
      if (sortColumn === "type") {
        return sortDirection === "asc"
          ? a.type.localeCompare(b.type)
          : b.type.localeCompare(a.type);
      } else {
        return sortDirection === "asc"
          ? Number.parseFloat(a.total_amount) -
              Number.parseFloat(b.total_amount)
          : Number.parseFloat(b.total_amount) -
              Number.parseFloat(a.total_amount);
      }
    });
  }, [totalAmountByFinancialAssistanceTypes, sortColumn, sortDirection]);

  // Toggle sort
  const toggleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Balance"
          description="Remaining Balance"
          value={remainingCashAdvance}
          icon={<BalanceOutlined className="h-5 w-5 text-primary" />}
          gradientFrom="blue"
          gradientTo="blue"
        />
        <StatCard
          title="Cash Advance"
          description="Total Cash Advance"
          value={totalCashAdvance}
          icon={<Money className="h-5 w-5 text-primary" />}
          gradientFrom="blue"
          gradientTo="blue"
        />

        <StatCard
          title="Total Patients"
          description="All registered Patients"
          value={totalPatients}
          icon={<SickOutlined className="h-5 w-5 text-primary" />}
          gradientFrom="red"
          gradientTo="red"
        />
        <StatCard
          title="Total Claimants"
          description="All registered Claimants"
          value={totalClaimants}
          icon={<UserCheck2 className="h-5 w-5 text-primary" />}
          gradientFrom="yellow"
          gradientTo="yellow"
        />
        <StatCard
          title="Total Claims"
          description="All Claims"
          value={totalClaims}
          icon={<FilesIcon className="h-5 w-5 text-primary" />}
          gradientFrom="pink"
          gradientTo="pink"
        />

        <StatCard
          title="Total Users"
          description="All registered users"
          value={totalUsers}
          icon={<Users className="h-5 w-5 text-primary" />}
          gradientFrom="blue"
          gradientTo="blue"
        />
      </div>
      <Card className="w-full   shadow-md  ">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Summary</CardTitle>
            <CardDescription>
              Total amount by Financial Assistance Type
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-[60%]">
                    <Button
                      variant="ghost"
                      onClick={() => toggleSort("type")}
                      className="flex items-center gap-1 font-medium"
                    >
                      Assistance Type
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button
                      variant="ghost"
                      onClick={() => toggleSort("total_amount")}
                      className="flex items-center gap-1 font-medium ml-auto"
                    >
                      Total Amount
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.type}</TableCell>
                    <TableCell className="text-right">
                      {item.total_amount}
                    </TableCell>
                  </TableRow>
                ))}
                {/* <TableRow className="bg-gray-50 font-bold">
                <TableCell>Total</TableCell>
                <TableCell className="text-right">{total_amount.toString()}</TableCell>
              </TableRow> */}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AuthenticatedLayout>
  );
}
