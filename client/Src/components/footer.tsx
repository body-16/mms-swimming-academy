import { Link } from "wouter";
import { Heart, Twitter, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 gradient-ocean rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold font-poppins">
                MMS Swimming Academy
              </span>
            </div>
            <p className="text-slate-300 mb-4">
              Egypt's premier swimming academy dedicated to excellence in aquatic education.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-300 hover:text-white transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/coaches" className="text-slate-300 hover:text-white transition-colors">
                  Coaches
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="text-slate-300 hover:text-white transition-colors">
                  Schedule
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Programs</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Kids Classes
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Adult Training
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Competitive Swimming
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Private Lessons
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Water Safety
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-slate-300">
              <li>123 Swimming Lane</li>
              <li>New Cairo, Egypt</li>
              <li>+20 123 456 7890</li>
              <li>info@mmsswimming.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 MMS Swimming Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
