import { useQuery } from "@tanstack/react-query";
import BlogCard from "@/components/blog-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Calendar, User, Tag } from "lucide-react";
import { useState } from "react";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ["/api/blog"],
  });

  const categories = [
    { id: "all", name: "All Posts", count: 0 },
    { id: "technique", name: "Technique", count: 0 },
    { id: "safety", name: "Safety", count: 0 },
    { id: "training", name: "Training", count: 0 },
    { id: "news", name: "News", count: 0 },
  ];

  const filteredPosts = blogPosts?.filter((post: any) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           post.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts?.[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-ocean to-sky">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold font-poppins mb-6">Swimming Blog</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Expert tips, swimming techniques, safety advice, and the latest news from 
              the world of swimming. Stay informed and improve your skills.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 focus:ring-ocean focus:border-ocean"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "btn-ocean" : ""}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && !isLoading && (
        <section className="py-12 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-poppins text-slate-800 mb-4">Featured Article</h2>
            </div>
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid lg:grid-cols-2">
                <div className="relative">
                  <img
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-ocean text-white">
                    Featured
                  </Badge>
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <Badge className="bg-ocean/10 text-ocean mr-3">
                      {featuredPost.category}
                    </Badge>
                    <span className="text-sm text-slate-500">
                      {new Date(featuredPost.publishedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{featuredPost.title}</h3>
                  <p className="text-slate-600 mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-slate-400 mr-2" />
                      <span className="text-sm text-slate-500">By {featuredPost.author}</span>
                    </div>
                    <Button className="btn-ocean">Read More</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-slate-800 mb-4">Latest Articles</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Stay updated with our latest swimming tips, techniques, and news.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
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
            ) : filteredPosts?.length > 0 ? (
              filteredPosts.map((post: any) => (
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
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-slate-400 mb-4">
                  <Search className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                  <p>Try adjusting your search terms or category filter.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="p-8">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-3xl font-bold font-poppins text-slate-800">
                Stay Updated
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-lg text-slate-600 mb-8">
                Subscribe to our newsletter to receive the latest swimming tips, techniques, 
                and academy news directly in your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 focus:ring-ocean focus:border-ocean"
                />
                <Button className="btn-ocean">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-slate-500 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
