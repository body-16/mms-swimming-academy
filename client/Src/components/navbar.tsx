import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Coaches", href: "/coaches" },
    { name: "Schedule", href: "/schedule" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    return location === href;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 gradient-ocean rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold font-poppins text-ocean">
                MMS Swimming Academy
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-ocean"
                      : "text-slate-600 hover:text-ocean"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href={user.role === "admin" ? "/admin-dashboard" : "/member-dashboard"}
                  className="text-slate-600 hover:text-ocean font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="text-slate-600 hover:text-ocean"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-slate-600 hover:text-ocean font-medium transition-colors"
                >
                  Login
                </Link>
                <Link href="/register">
                  <Button className="btn-ocean">Register</Button>
                </Link>
              </>
            )}
            <button className="text-slate-600 hover:text-ocean">
              <span className="text-sm">عربي</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-ocean bg-blue-50"
                    : "text-slate-600 hover:text-ocean hover:bg-blue-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-slate-200">
              {user ? (
                <div className="space-y-2">
                  <Link
                    href={user.role === "admin" ? "/admin-dashboard" : "/member-dashboard"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-ocean hover:bg-blue-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="mx-3 text-slate-600 hover:text-ocean"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-ocean hover:bg-blue-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="btn-ocean mx-3">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
