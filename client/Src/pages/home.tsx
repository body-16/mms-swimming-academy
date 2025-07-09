import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import ProgramCard from "@/components/program-card";
import CoachCard from "@/components/coach-card";
import BlogCard from "@/components/blog-card";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: programs, isLoading: programsLoading } = useQuery({
    queryKey: ["/api/programs"],
  });

  const { data: coaches, isLoading: coachesLoading } = useQuery({
    queryKey: ["/api/coaches"],
  });

  const { data: blogPosts, isLoading: blogLoading } = useQuery({
    queryKey: ["/api/blog"],
  });

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />

      {/* Services Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-slate-800 mb-4">Our Programs</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive swimming programs designed for every age and skill level.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programsLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
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
              programs?.slice(0, 3).map((program: any) => (
                <ProgramCard
                  key={program.id}
                  title={program.name}
                  description={program.description}
                  price={program.price}
                  ageGroup={program.ageGroup}
                  imageUrl={
                    program.name.includes("Kids")
                      ? "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
                      : program.name.includes("Adult")
                      ? "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
                      : "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
                  }
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Coaches Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-slate-800 mb-4">Meet Our Coaches</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              World-class instructors dedicated to your swimming success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coachesLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
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
              coaches?.slice(0, 3).map((coach: any) => (
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

      {/* Blog Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-slate-800 mb-4">Swimming Blog</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Tips, techniques, and news from the swimming world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <Skeleton className="h-5 w-16 mr-3" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              blogPosts?.slice(0, 3).map((post: any) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  author={post.author}
                  category={post.category}
                  publishedDate={post.publishedDate}
                  imageUrl={post.imageUrl}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
