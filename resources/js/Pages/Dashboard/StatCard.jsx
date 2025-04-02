import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, ArrowUpRight } from "lucide-react";

function StatCard({
  title,
  description,
  value,
  icon,
  gradientFrom,
  gradientTo,
}) {
  return (
    <div>
      <Card
        className={`w-full bg-gradient-to-br from-${gradientFrom}-400 via-${gradientFrom}-500 to-${gradientTo}-600 shadow-md text-white `}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">{`${title}`}</CardTitle>
            <CardDescription className="text-blue-100">
              {description}
            </CardDescription>
          </div>
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{value.toLocaleString()}</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default StatCard;
