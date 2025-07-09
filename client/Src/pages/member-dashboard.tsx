import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, DollarSign, Trophy, User, Activity } from "lucide-react";
import { setAuthHeader } from "@/lib/auth";
import { Link } from "wouter";

export default function MemberDashboard() {
  const { user, profile } = useAuth();

  const { data: bookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ["/api/bookings/me"],
    queryFn: async () => {
      const response = await fetch("/api/bookings/me", {
        headers: setAuthHeader(),
      });
      return response.json();
    },
  });

  const { data: payments, isLoading: paymentsLoading } = useQuery({
    queryKey: ["/api/payments/me"],
    queryFn: async () => {
      const response = await fetch("/api/payments/me", {
        headers: setAuthHeader(),
      });
      return response.json();
    },
  });

  const { data: progress, isLoading: progressLoading } = useQuery({
    queryKey: ["/api/progress/me"],
    queryFn: async () => {
      const response = await fetch("/api/progress/me", {
        headers: setAuthHeader(),
      });
      return response.json();
    },
  });

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Access Denied</h1>
          <p className="text-slate-600 mb-4">Please log in to access your dashboard.</p>
          <Link href="/login">
            <Button className="btn-ocean">Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  const upcomingClasses = bookings?.filter((b: any) => b.status === "confirmed") || [];
  const completedPayments = payments?.filter((p: any) => p.paymentStatus === "completed") || [];
  const totalSpent = completedPayments.reduce((sum: number, p: any) => sum + parseFloat(p.amount), 0);

  const progressData = [
    { stroke: "Freestyle", progress: 85, color: "bg-ocean" },
    { stroke: "Backstroke", progress: 70, color: "bg-sky" },
    { stroke: "Breaststroke", progress: 60, color: "bg-emerald" },
    { stroke: "Butterfly", progress: 30, color: "bg-golden" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-poppins text-slate-800">
                Welcome back, {profile.fullName}!
              </h1>
              <p className="text-slate-600 mt-1">
                {profile.program} Program • {profile.swimmingLevel} Level
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-emerald/10 text-emerald">
                {profile.status}
              </Badge>
              <Link href="/schedule">
                <Button className="btn-ocean">Book Classes</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-ocean to-sky text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Upcoming Classes</p>
                  <p className="text-3xl font-bold">{upcomingClasses.length}</p>
                </div>
                <Calendar className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-emerald to-green-400 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Paid</p>
                  <p className="text-3xl font-bold">₪{totalSpent.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-golden to-orange-400 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Member Since</p>
                  <p className="text-3xl font-bold">
                    {new Date(profile.registrationDate).getFullYear()}
                  </p>
                </div>
                <User className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-400 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Progress</p>
                  <p className="text-3xl font-bold">
                    {Math.round(progressData.reduce((sum, p) => sum + p.progress, 0) / progressData.length)}%
                  </p>
                </div>
                <Trophy className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Classes */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-slate-800">My Classes</CardTitle>
                <Badge className="bg-ocean/10 text-ocean">
                  {upcomingClasses.length} upcoming
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {bookingsLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : upcomingClasses.length > 0 ? (
                <div className="space-y-3">
                  {upcomingClasses.slice(0, 3).map((booking: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-800">{profile.program} Program</p>
                        <p className="text-sm text-slate-600">
                          <Clock className="w-4 h-4 inline mr-1" />
                          Next session scheduled
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-emerald border-emerald"
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600">No upcoming classes</p>
                  <Link href="/schedule">
                    <Button className="btn-ocean mt-4">Book a Class</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Progress */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">Swimming Progress</CardTitle>
            </CardHeader>
            <CardContent>
              {progressLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i}>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-2 w-full" />
                    </div>
                  ))}
                </div>
              ) : (
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
              )}
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              {paymentsLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : payments?.length > 0 ? (
                <div className="space-y-3">
                  {payments.slice(0, 3).map((payment: any, index: number) => (
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
              ) : (
                <div className="text-center py-8">
                  <DollarSign className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600">No payment history</p>
                </div>
              )}
              <Button className="w-full btn-ocean mt-4">
                View All Payments
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Link href="/schedule">
                  <Button className="w-full btn-ocean">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Class
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  <Activity className="w-4 h-4 mr-2" />
                  View Progress
                </Button>
                <Button variant="outline" className="w-full">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Make Payment
                </Button>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    Contact Coach
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
