import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Award, Star } from "lucide-react";

export default function About() {
  const achievements = [
    {
      icon: Trophy,
      title: "Olympic Qualifiers",
      description: "15+ swimmers qualified for international competitions",
      count: "15+",
    },
    {
      icon: Users,
      title: "Students Trained",
      description: "Over 1,000 students have learned to swim with us",
      count: "1,000+",
    },
    {
      icon: Award,
      title: "Awards Won",
      description: "National and international recognition",
      count: "25+",
    },
    {
      icon: Star,
      title: "Years of Excellence",
      description: "Serving the community since 2005",
      count: "19+",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-ocean to-sky">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold font-poppins mb-6">About MMS Swimming Academy</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Egypt's premier swimming academy dedicated to excellence in aquatic education, 
              safety, and competitive training for swimmers of all ages and skill levels.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-ocean/10 rounded-full flex items-center justify-center mb-6">
                  <Star className="w-8 h-8 text-ocean" />
                </div>
                <h3 className="text-3xl font-bold font-poppins text-slate-800 mb-4">Our Vision</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  To be the leading swimming academy in Egypt, fostering a culture of excellence, 
                  safety, and passion for aquatic sports. We envision a future where every 
                  individual has the opportunity to learn, grow, and excel in swimming.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-emerald/10 rounded-full flex items-center justify-center mb-6">
                  <Trophy className="w-8 h-8 text-emerald" />
                </div>
                <h3 className="text-3xl font-bold font-poppins text-slate-800 mb-4">Our Mission</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  To provide world-class swimming instruction through innovative teaching methods, 
                  certified coaching, and state-of-the-art facilities. We are committed to 
                  developing skilled swimmers while promoting water safety and healthy lifestyles.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-slate-800 mb-4">Our Achievements</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Years of dedication and excellence have resulted in outstanding achievements 
              and recognition in the swimming community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-ocean/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="w-8 h-8 text-ocean" />
                  </div>
                  <h3 className="text-3xl font-bold text-ocean mb-2">{achievement.count}</h3>
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">{achievement.title}</h4>
                  <p className="text-slate-600">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold font-poppins text-slate-800 mb-6">Our Story</h2>
              <div className="space-y-6 text-slate-600">
                <p>
                  Founded in 2005 by a group of passionate swimming enthusiasts and Olympic-trained coaches, 
                  MMS Swimming Academy began as a small community pool with a big dream - to create 
                  Egypt's premier swimming education center.
                </p>
                <p>
                  Over the years, we've grown from a modest facility to a state-of-the-art academy 
                  with multiple pools, world-class equipment, and an internationally recognized coaching staff. 
                  Our journey has been marked by countless success stories, from teaching children their 
                  first strokes to training Olympic qualifiers.
                </p>
                <p>
                  Today, MMS Swimming Academy stands as a testament to what dedication, expertise, 
                  and genuine care for students can achieve. We continue to evolve and expand our 
                  programs while maintaining our core values of safety, excellence, and inclusivity.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Swimming pool facility"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-slate-800 mb-4">Why Choose MMS?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover the advantages that make MMS Swimming Academy the preferred choice 
              for swimming education in Egypt.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Badge className="bg-ocean/10 text-ocean mb-4">Expert Coaching</Badge>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Certified Instructors</h3>
                <p className="text-slate-600">
                  Our coaches are internationally certified with Olympic training experience 
                  and a passion for teaching.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Badge className="bg-sky/10 text-sky mb-4">Modern Facilities</Badge>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">State-of-the-Art Equipment</h3>
                <p className="text-slate-600">
                  Olympic-standard pools with the latest safety equipment and training technology.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Badge className="bg-emerald/10 text-emerald mb-4">Safety First</Badge>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Water Safety Priority</h3>
                <p className="text-slate-600">
                  Comprehensive safety protocols and certified lifeguards ensure a secure 
                  learning environment.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Badge className="bg-golden/10 text-golden mb-4">Flexible Programs</Badge>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">All Ages & Levels</h3>
                <p className="text-slate-600">
                  From beginner children to competitive athletes, we have programs 
                  tailored for every swimmer.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Badge className="bg-purple-100 text-purple-600 mb-4">Community Focus</Badge>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Inclusive Environment</h3>
                <p className="text-slate-600">
                  We foster a supportive community where everyone feels welcome 
                  and encouraged to achieve their goals.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Badge className="bg-pink-100 text-pink-600 mb-4">Proven Results</Badge>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Track Record</h3>
                <p className="text-slate-600">
                  Our students consistently achieve their swimming goals, from basic 
                  proficiency to competitive excellence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
