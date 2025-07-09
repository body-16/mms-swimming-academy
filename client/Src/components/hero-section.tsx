import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gradient-to-r from-ocean/80 to-sky/60"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold font-poppins text-white mb-6 leading-tight">
          Dive Into Excellence
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
          Professional swimming training for all ages and skill levels. Join Egypt's premier swimming academy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button className="btn-golden px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all">
              Start Your Journey
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 text-lg font-semibold backdrop-blur-sm border-white/30"
            >
              Book Trial Session
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
