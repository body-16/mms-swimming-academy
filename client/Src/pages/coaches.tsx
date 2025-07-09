import { useQuery } from "@tanstack/react-query";
import CoachCard from "@/components/coach-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Award, Users, Clock, Star } from "lucide-react";

export default function Coaches() {
  const { data: coaches, isLoading } = useQuery({
    queryKey: ["/api/coaches"],
  });

  const teamStats = [
    {
      icon: Award,
      title: "Combined Experience",
      value: "50+ Years",
      description: "Decades of professional coaching experience",
    },
    {
      icon: Users,
      title: "Students Trained",
      value: "1,000+",
      description: "Successful swimmers across all levels",
    },
    {
      icon: Clock,
      title: "Training Hours",
      value: "10,000+",
      description: "Hours of dedicated instruction",
    },
    {
      icon: Star,
      title: "Certifications",
      value: "25+",
      description: "International coaching certifications",
    },
  ];

  const coachingPhilosophy = [
    {
      title: "Safety First",
      description: "Every lesson begins with water safety awareness and proper technique to prevent injury.",
      icon: "🛡️",
    },
    {
      title: "Individual Attention",
      description: "We recognize that every swimmer is unique and tailor our approach to individual needs.",
      icon: "👥",
    },
    {
      title: "Positive Environment",
      description: "Creating a supportive atmosphere where students feel confident to learn and grow.",
      icon: "🌟",
    },
    {
      title: "Continuous Learning",
      description: "Our coaches stay updated with the latest techniques and teaching methodologies.",
      icon: "📚",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-ocean to-sky">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold font-poppins mb-6">Meet Our Expert Coaches</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              World-class instructors with Olympic training experience, dedicated to helping you 
              achieve your swimming goals through personalized instruction and proven techniques.
            </p>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-slate-800 mb-4">Our Team by Numbers</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The collective experience and achievements of our coaching staff.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamStats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-ocean/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-ocean" />
                  </div>
                  <h3 className="text-3xl font-bold text-ocean mb-2">{stat.value}</h3>
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">{stat.title}</h4>
                  <p className="text-slate-600">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coaches Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-slate-800 mb-4">Our Coaching Team</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Meet the experienced professionals who will guide your swimming journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-slate-50 rounded-xl p-6 text-center">
                  <Skeleton className="w-32 h-32 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                  <Skeleton className="h-4 w-1/2 mx-auto mb-2" />
                  <Skeleton className="h-4 w-full mx-auto mb-4" />
                  <div className="flex justify-center space-x-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              ))
            ) : (
              coaches?.map((coach: any) => (
                <CoachCard
                  key={coach.id}
                  name={coach.fullName}
                  title="Swimming Coach"
                  experience={`${coach.experience}+ years experience`}
                  specialties={coach.specialties}
                  imageUrl={coach.imageUrl}
                  bio={coach.bio}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Coaching Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-slate-800 mb-4">Our Coaching Philosophy</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that guide our approach to swimming instruction and student development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {coachingPhilosophy.map((principle, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{principle.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">{principle.title}</h3>
                      <p className="text-slate-600">{principle.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-slate-800 mb-4">Coach Qualifications</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Every coach at MMS Swimming Academy meets our rigorous standards for education and certification.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Required Certifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Badge className="bg-ocean/10 text-ocean mr-3">Required</Badge>
                    <span className="text-slate-600">Water Safety Instructor (WSI)</span>
                  </div>
                  <div className="flex items-center">
                    <Badge className="bg-ocean/10 text-ocean mr-3">Required</Badge>
                    <span className="text-slate-600">CPR/AED Certification</span>
                  </div>
                  <div className="flex items-center">
                    <Badge className="bg-ocean/10 text-ocean mr-3">Required</Badge>
                    <span className="text-slate-600">First Aid Certification</span>
                  </div>
                  <div className="flex items-center">
                    <Badge className="bg-emerald/10 text-emerald mr-3">Preferred</Badge>
                    <span className="text-slate-600">Swim Coaching Certification</span>
                  </div>
                  <div className="flex items-center">
                    <Badge className="bg-emerald/10 text-emerald mr-3">Preferred</Badge>
                    <span className="text-slate-600">Competitive Swimming Background</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Ongoing Training</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-ocean rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-slate-600">Monthly professional development workshops</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-ocean rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-slate-600">Annual swimming technique seminars</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-ocean rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-slate-600">Regular safety protocol updates</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-ocean rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-slate-600">Peer mentoring and collaboration</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-ocean rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-slate-600">Access to latest coaching resources</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
