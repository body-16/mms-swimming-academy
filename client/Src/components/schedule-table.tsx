import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

interface ScheduleTableProps {
  classes: any[];
  programs: any[];
  coaches: any[];
}

export default function ScheduleTable({ classes, programs, coaches }: ScheduleTableProps) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const times = ["9:00 AM", "11:00 AM", "4:00 PM", "6:00 PM"];

  const getClassForTimeAndDay = (time: string, day: string) => {
    return classes.find(cls => cls.startTime === time.split(' ')[0] && cls.dayOfWeek === day);
  };

  const getProgramName = (programId: number) => {
    const program = programs.find(p => p.id === programId);
    return program?.name || "Unknown Program";
  };

  const getCoachName = (coachId: number) => {
    const coach = coaches.find(c => c.id === coachId);
    return coach?.fullName || "Unknown Coach";
  };

  const getBadgeColor = (programName: string) => {
    if (programName.includes("Kids")) return "bg-sky/10 text-sky";
    if (programName.includes("Adult")) return "bg-ocean/10 text-ocean";
    if (programName.includes("Competitive")) return "bg-emerald/10 text-emerald";
    return "bg-slate/10 text-slate";
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="text-center">Class Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-ocean text-white">
              <tr>
                <th className="px-6 py-4 text-left">Time</th>
                {days.map(day => (
                  <th key={day} className="px-6 py-4 text-left">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {times.map(time => (
                <tr key={time}>
                  <td className="px-6 py-4 font-medium text-slate-800">{time}</td>
                  {days.map(day => {
                    const classData = getClassForTimeAndDay(time, day);
                    return (
                      <td key={day} className="px-6 py-4">
                        {classData ? (
                          <div className="space-y-1">
                            <Badge className={`${getBadgeColor(getProgramName(classData.programId))} text-sm`}>
                              {getProgramName(classData.programId)}
                            </Badge>
                            <p className="text-xs text-slate-500">
                              {getCoachName(classData.coachId)}
                            </p>
                            <p className="text-xs text-slate-500">
                              {classData.currentEnrollment}/{classData.capacity}
                            </p>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-sm">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50 text-center mt-6">
          <Link href="/register">
            <Button className="btn-ocean">Book Your Class</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
