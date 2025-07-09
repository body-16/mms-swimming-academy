import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { loginSchema, type LoginData } from "@shared/schema";
import { Link } from "wouter";
import { Eye, EyeOff, Heart, Mail, Lock } from "lucide-react";

export default function Login() {
  const [location, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginData) => {
    try {
      await login(data.email, data.password);
      setLocation("/member-dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const benefits = [
    "Access to your personalized dashboard",
    "Book and manage your swimming classes",
    "Track your progress and achievements",
    "View payment history and invoices",
    "Connect with coaches and get feedback",
    "Access exclusive member content",
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 gradient-ocean rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold font-poppins text-slate-800 mb-4">
            Welcome Back to MMS Swimming Academy
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Sign in to your account to access your dashboard, manage your classes, and track your swimming progress.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Login Form */}
          <Card className="bg-white shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold text-slate-800">
                Sign In to Your Account
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-slate-700 text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="pl-10 focus:ring-ocean focus:border-ocean"
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password" className="text-slate-700 text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className="pl-10 pr-10 focus:ring-ocean focus:border-ocean"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-slate-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-slate-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-ocean focus:ring-ocean border-slate-300 rounded"
                    />
                    <Label htmlFor="remember-me" className="ml-2 text-sm text-slate-700">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-ocean hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full btn-ocean text-lg py-3"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>

                <div className="text-center">
                  <p className="text-slate-600">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-ocean hover:underline font-medium">
                      Register here
                    </Link>
                  </p>
                </div>
              </form>

              {/* Demo Credentials */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2">Demo Credentials</h4>
                <div className="text-sm text-slate-600 space-y-1">
                  <p><strong>Admin:</strong> admin@mmsswimming.com</p>
                  <p><strong>Coach:</strong> ahmed.hassan@mmsswimming.com</p>
                  <p><strong>Password:</strong> password123</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="space-y-8">
            <Card className="bg-gradient-to-r from-ocean to-sky text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Why Sign In?</h3>
                <p className="text-blue-100 mb-6">
                  Access your personalized swimming experience with exclusive member benefits.
                </p>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-blue-100">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Need Help?</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-700">Forgot Your Password?</h4>
                    <p className="text-slate-600 text-sm">
                      Use the "Forgot password?" link above to reset your password.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700">New to MMS?</h4>
                    <p className="text-slate-600 text-sm">
                      <Link href="/register" className="text-ocean hover:underline">
                        Create an account
                      </Link>{" "}
                      to start your swimming journey with us.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700">Technical Issues?</h4>
                    <p className="text-slate-600 text-sm">
                      Contact our support team at{" "}
                      <a href="mailto:support@mmsswimming.com" className="text-ocean hover:underline">
                        support@mmsswimming.com
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
