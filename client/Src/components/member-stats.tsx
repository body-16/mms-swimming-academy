import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface MemberStatsProps {
  classes: any[];
  progress: any[];
  payments: any[];
}

export default function MemberStats({ classes, progress, payments }: MemberStatsProps) {
  const upcomingClasses = classes.filter(c => c.status === "confirmed").length;
  const completedPayments = payments.filter(p => p.paymentStatus === "completed").length;

  const progressData = [
    { stroke: "Freestyle", progress: 85, color: "bg-ocean" },
    { stroke: "Backstroke", progress: 70, color: "bg-sky" },
    { stroke: "Breaststroke", progress: 60, color: "bg-emerald" },
    { stroke: "Butterfly", progress: 30, color: "bg-golden" },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Class Schedule Card */}
      <Card className="bg-white rounded-xl shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-800">My Classes</CardTitle>
            <Badge className="bg-ocean/10 text-ocean">
              {upcomingClasses} upcoming
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {classes.slice(0, 3).map((classItem, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">Adult Intermediate</p>
                  <p className="text-sm text-slate-600">
                    {classItem.dayOfWeek}, {classItem.startTime}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={classItem.status === "confirmed" ? "text-emerald border-emerald" : "text-golden border-golden"}
                >
                  {classItem.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Card */}
      <Card className="bg-white rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">Swimming Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progressData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600">{item.stroke}</span>
                  <span className="text-sm font-medium text-ocean">{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card className="bg-white rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {payments.slice(0, 3).map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">₪{payment.amount}</p>
                  <p className="text-sm text-slate-600">
                    {new Date(payment.paymentDate).toLocaleDateString()}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={payment.paymentStatus === "completed" ? "text-emerald border-emerald" : "text-golden border-golden"}
                >
                  {payment.paymentStatus}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
