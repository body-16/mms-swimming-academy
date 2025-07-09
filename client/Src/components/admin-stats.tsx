import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Calendar, BarChart3 } from "lucide-react";

interface AdminStatsProps {
  totalMembers: number;
  activeMembers: number;
  totalRevenue: number;
  activeClasses: number;
  monthlyRevenue: number;
  poolUtilization: number;
}

export default function AdminStats({
  totalMembers,
  activeMembers,
  totalRevenue,
  activeClasses,
  monthlyRevenue,
  poolUtilization,
}: AdminStatsProps) {
  const stats = [
    {
      title: "Total Members",
      value: totalMembers,
      icon: Users,
      gradient: "gradient-ocean",
    },
    {
      title: "Monthly Revenue",
      value: `₪${monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      gradient: "gradient-emerald",
    },
    {
      title: "Active Classes",
      value: activeClasses,
      icon: Calendar,
      gradient: "gradient-golden",
    },
    {
      title: "Pool Utilization",
      value: `${poolUtilization}%`,
      icon: BarChart3,
      gradient: "bg-gradient-to-r from-purple-500 to-pink-400",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className={`${stat.gradient} text-white`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className="text-4xl opacity-80">
                <stat.icon className="w-12 h-12" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
