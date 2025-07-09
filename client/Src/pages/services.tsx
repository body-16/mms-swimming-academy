import { useQuery } from "@tanstack/react-query";
import ProgramCard from "@/components/program-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Users, Clock, Award } from "lucide-react";
import { Link } from "wouter";

export default function Services() {
  const { data: programs, isLoading } = useQuery({
    queryKey: ["/api/programs"],
  });

  const benefits = [
    {
      icon: CheckCircle,
      title: "Expert Instruction",
      description: "Learn from certified coaches with international experience",
    },
    {
      icon: Users,
      title: "Small Classes",
      description: "Maximum 8 students per class for personalized attention",
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Multiple time slots throughout the week",
    },
    {
      icon: Award,
      title: "Progress Tracking",
      description: "Regular assessments and skill development monitoring",
    },
  ];

  const getImageForProgram = (programName: string) => {
    if (programName.includes("Kids")) {
      return "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300";
    } else if (programName.includes("Adult")) {
      return "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300";
    } else {
      return "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-ocean to-sky">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold font-poppins mb-6">Our Swimming Programs</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive swimming programs designed for every age and skill level, 
              from beginners to competitive athletes.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-slate-800 mb-4">Choose Your Program</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Find the perfect swimming program that matches your goals and schedule.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-10 w-24" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              programs?.map((program: any) => (
                <ProgramCard
                  key={program.id}
                  title={program.name}
                  description={program.description}
                  price={program.price}
                  ageGroup={program.ageGroup}
                  imageUrl={getImageForProgram(program.name)}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-slate-800 mb-4">Program Benefits</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Every program includes these essential benefits to ensure your success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-ocean/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-ocean" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-slate-800 mb-4">Program Details</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Detailed information about what each program includes and what you can expect.
            </p>
          </div>

          <div className="space-y-12">
            {/* Kids Program Detail */}
            <Card className="overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="p-8">
                  <Badge className="bg-sky/10 text-sky mb-4">Ages 4-12</Badge>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Kids Program</h3>
                  <p className="text-slate-600 mb-6">
                    Our kids program focuses on water safety, basic swimming skills, and building confidence in the water. 
                    Classes are designed to be fun and engaging while teaching essential swimming techniques.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald mr-3" />
                      <span className="text-slate-600">Water safety fundamentals</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald mr-3" />
                      <span className="text-slate-600">Basic stroke techniques</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald mr-3" />
                      <span className="text-slate-600">Confidence building activities</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald mr-3" />
                      <span className="text-slate-600">Small class sizes (max 8 kids)</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                    alt="Kids swimming lesson"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>

            {/* Adult Program Detail */}
            <Card className="overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="relative order-2 lg:order-1">
                  <img
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                    alt="Adult swimming class"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 order-1 lg:order-2">
                  <Badge className="bg-ocean/10 text-ocean mb-4">Ages 18+</Badge>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Adult Program</h3>
                  <p className="text-slate-600 mb-6">
                    Perfect for adults who want to learn swimming or improve their existing skills. 
                    Our adult program offers flexible scheduling and personalized instruction.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald mr-3" />
                      <span className="text-slate-600">All four swimming strokes</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald mr-3" />
                      <span className="text-slate-600">Fitness and endurance training</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald mr-3" />
                      <span className="text-slate-600">Flexible scheduling options</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald mr-3" />
                      <span className="text-slate-600">Personalized coaching</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Competitive Program Detail */}
            <Card className="overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="p-8">
                  <Badge className="bg-emerald/10 text-emerald mb-4">Ages 12+</Badge>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Competitive Training</h3>
                  <p className="text-slate-600 mb-6">
                    For serious swimmers looking to compete at local, national, or international levels. 
                    Intensive training with Olympic-level coaching and advanced techniques.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald mr-3" />
                      <span className="text-slate-600">Advanced technique refinement</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald mr-3" />
                      <span className="text-slate-600">Race preparation and strategy</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald mr-3" />
                      <span className="text-slate-600">Mental conditioning</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald mr-3" />
                      <span className="text-slate-600">Competition opportunities</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                    alt="Competitive swimming training"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-ocean to-sky">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-poppins text-white mb-6">Ready to Start Swimming?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied swimmers who have transformed their lives at MMS Swimming Academy.
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
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
