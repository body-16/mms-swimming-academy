import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, DollarSign, Calendar, BarChart3, TrendingUp, AlertCircle } from "lucide-react";
import { setAuthHeader } from "@/lib/auth";
import { Link } from "wouter";

export default function AdminDashboard() {
  const { user } = useAuth();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
    queryFn: async () => {
      const response = await fetch("/api/admin/stats", {
        headers: setAuthHeader(),
      });
      return response.json();
    },
  });

  const { data: members, isLoading: membersLoading } = useQuery({
    queryKey: ["/api/members"],
    queryFn: async () => {
      const response = await fetch("/api/members", {
        headers: setAuthHeader(),
      });
      return response.json();
    },
  });

  const { data: contacts, isLoading: contactsLoading } = useQuery({
    queryKey: ["/api/contacts"],
    queryFn: async () => {
      const response = await fetch("/api/contacts", {
        headers: setAuthHeader(),
      });
      return response.json();
    },
  });

  const { data: payments, isLoading: paymentsLoading } = useQuery({
    queryKey: ["/api/payments"],
    queryFn: async () => {
      const response = await fetch("/api/payments", {
        headers: setAuthHeader(),
      });
      return response.json();
    },
  });

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Access Denied</h1>
          <p className="text-slate-600 mb-4">You need admin privileges to access this page.</p>
          <Link href="/login">
            <Button className="btn-ocean">Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  const recentMembers = members?.slice(0, 5) || [];
  const recentContacts = contacts?.slice(0, 5) || [];
  const pendingPayments = payments?.filter((p: any) => p.paymentStatus === "pending") || [];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-poppins text-slate-800">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 mt-1">
                Manage your swimming academy operations
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-emerald/10 text-emerald">
                Administrator
              </Badge>
              <Button className="btn-ocean">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Reports
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        {statsLoading ? (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-ocean to-sky text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Members</p>
                    <p className="text-3xl font-bold">{stats?.totalMembers || 0}</p>
                  </div>
                  <Users className="w-8 h-8 opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-emerald to-green-400 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Monthly Revenue</p>
                    <p className="text-3xl font-bold">₪{stats?.monthlyRevenue?.toLocaleString() || 0}</p>
                  </div>
                  <DollarSign className="w-8 h-8 opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-golden to-orange-400 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Active Classes</p>
                    <p className="text-3xl font-bold">{stats?.activeClasses || 0}</p>
                  </div>
                  <Calendar className="w-8 h-8 opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-pink-400 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Pool Utilization</p>
                    <p className="text-3xl font-bold">{stats?.poolUtilization || 0}%</p>
                  </div>
                  <BarChart3 className="w-8 h-8 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Management Panels */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Members */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-slate-800">Recent Members</CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              {membersLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ))}
                </div>
              ) : recentMembers.length > 0 ? (
                <div className="space-y-4">
                  {recentMembers.map((member: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-ocean rounded-full flex items-center justify-center text-white font-medium">
                          {member.fullName.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-slate-800">{member.fullName}</p>
                          <p className="text-sm text-slate-600">{member.program} Program</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600">
                          {new Date(member.registrationDate).toLocaleDateString()}
                        </p>
                        <Badge
                          variant="outline"
                          className={member.status === "active" ? "text-emerald border-emerald" : "text-golden border-golden"}
                        >
                          {member.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600">No members found</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Financial Overview */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-slate-800">Financial Overview</CardTitle>
                <Button variant="outline" size="sm">View Reports</Button>
              </div>
            </CardHeader>
            <CardContent>
              {paymentsLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-800">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-emerald">₪{stats?.monthlyRevenue?.toLocaleString() || 0}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-emerald">+12%</p>
                      <p className="text-sm text-slate-600">vs last month</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-800">Pending Payments</p>
                      <p className="text-2xl font-bold text-golden">₪{pendingPayments.reduce((sum: number, p: any) => sum + parseFloat(p.amount), 0).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-red-500">{pendingPayments.length} pending</p>
                      <p className="text-sm text-slate-600">needs attention</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-800">Total Revenue</p>
                      <p className="text-2xl font-bold text-slate-600">₪{stats?.totalRevenue?.toLocaleString() || 0}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">All time</p>
                      <p className="text-sm text-slate-600">since launch</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Contact Messages */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-slate-800">Recent Contact Messages</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            {contactsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : recentContacts.length > 0 ? (
              <div className="space-y-4">
                {recentContacts.map((contact: any, index: number) => (
                  <div key={index} className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-slate-800">{contact.name}</p>
                        <Badge
                          variant="outline"
                          className={contact.status === "new" ? "text-golden border-golden" : "text-slate-600 border-slate-300"}
                        >
                          {contact.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-1">{contact.subject}</p>
                      <p className="text-sm text-slate-500">{contact.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </p>
                      {contact.status === "new" && (
                        <AlertCircle className="w-4 h-4 text-golden mt-1" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">No contact messages</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
