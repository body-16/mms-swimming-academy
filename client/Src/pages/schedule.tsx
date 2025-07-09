import { useQuery } from "@tanstack/react-query";
import ScheduleTable from "@/components/schedule-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, Users, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function Schedule() {
  const { data: classes, isLoading: classesLoading } = useQuery({
    queryKey: ["/api/classes"],
  });

  const { data: programs, isLoading: programsLoading } = useQuery({
    queryKey: ["/api/programs"],
  });

  const { data: coaches, isLoading: coachesLoading } = useQuery({
    queryKey: ["/api/coaches"],
  });

  const isLoading = classesLoading || programsLoading || coachesLoading;

  const facilityInfo = [
    {
      icon: MapPin,
      title: "Main Pool",
      description: "Olympic-standard 50m pool for competitive training and adult classes",
    },
    {
      icon: MapPin,
      title: "Training Pool",
      description: "25m pool designed for kids programs and beginner classes",
    },
    {
      icon: MapPin,
      title: "Therapy Pool",
      description: "Heated pool for rehabilitation and water therapy sessions",
    },
  ];

  const scheduleNotes = [
    "All classes are limited to maximum capacity for safety and quality instruction",
    "Please arrive 15 minutes before your scheduled class time",
    "Makeup classes are available for missed sessions with 24-hour notice",
    "Pool facilities open 30 minutes before first class and close 30 minutes after last class",
    "Locker rooms and changing facilities are available for all students",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-ocean to-sky">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold font-poppins mb-6">Class Schedule</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Find the perfect time for your swimming lessons with our flexible scheduling options. 
              Classes are available throughout the week for all skill levels.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-ocean/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-ocean" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">6</h3>
                <p className="text-slate-600">Days per Week</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-sky/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-sky" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">4</h3>
                <p className="text-slate-600">Time Slots Daily</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-emerald" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">8</h3>
                <p className="text-slate-600">Max Students per Class</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-golden/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-golden" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">3</h3>
                <p className="text-slate-600">Pool Facilities</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Schedule Table */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-slate-800 mb-4">Weekly Schedule</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Browse our comprehensive schedule to find classes that fit your availability.
            </p>
          </div>

          {isLoading ? (
            <Card className="bg-white rounded-xl shadow-lg overflow-hidden">
              <CardHeader>
                <Skeleton className="h-8 w-48 mx-auto" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </CardContent>
            </Card>
          ) : (
            <ScheduleTable
              classes={classes || []}
              programs={programs || []}
              coaches={coaches || []}
            />
          )}
        </div>
      </section>

      {/* Facility Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-slate-800 mb-4">Our Facilities</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              State-of-the-art swimming facilities designed for optimal learning and safety.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {facilityInfo.map((facility, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-ocean/10 rounded-full flex items-center justify-center mb-4">
                    <facility.icon className="w-8 h-8 text-ocean" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{facility.title}</h3>
                  <p className="text-slate-600">{facility.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Notes */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-bold text-slate-800">Important Notes</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4">
                  {scheduleNotes.map((note, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-ocean rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-slate-600">{note}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-bold text-slate-800">Operating Hours</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Monday - Friday</span>
                    <Badge className="bg-ocean/10 text-ocean">6:00 AM - 10:00 PM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Saturday</span>
                    <Badge className="bg-ocean/10 text-ocean">8:00 AM - 8:00 PM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Sunday</span>
                    <Badge className="bg-ocean/10 text-ocean">8:00 AM - 6:00 PM</Badge>
                  </div>
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-500">
                      Holiday hours may vary. Please check our website or call for updates.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-ocean to-sky">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-poppins text-white mb-6">Ready to Book Your Class?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our swimming program and start your journey to becoming a confident swimmer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="btn-golden px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all">
                Register Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 text-lg font-semibold backdrop-blur-sm border-white/30"
              >
                Ask Questions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
