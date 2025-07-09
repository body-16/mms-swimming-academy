import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";
import { registerSchema, type RegisterData } from "@shared/schema";
import { Link } from "wouter";
import { Eye, EyeOff, User, Mail, Phone, Calendar, Activity, Heart, Users } from "lucide-react";

export default function Register() {
  const [location, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { register: registerUser, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      phone: "",
      age: 18,
      swimmingLevel: "beginner",
      program: "adult",
      medicalInfo: "",
      emergencyContact: "",
    },
  });

  const onSubmit = async (data: RegisterData) => {
    if (!acceptedTerms) {
      return;
    }

    try {
      await registerUser(data);
      setLocation("/member-dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const formSteps = [
    {
      title: "Personal Information",
      icon: User,
      fields: ["fullName", "email", "password", "phone"],
    },
    {
      title: "Swimming Details",
      icon: Activity,
      fields: ["age", "swimmingLevel", "program"],
    },
    {
      title: "Health & Emergency",
      icon: Heart,
      fields: ["medicalInfo", "emergencyContact"],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-poppins text-slate-800 mb-4">
            Join MMS Swimming Academy
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Start your swimming journey with Egypt's premier swimming academy. 
            Fill out the form below to create your account and enroll in our programs.
          </p>
        </div>

        {/* Registration Form */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold text-slate-800">
              Create Your Account
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-ocean/10 rounded-full flex items-center justify-center mr-3">
                    <User className="w-5 h-5 text-ocean" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Personal Information</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName" className="text-slate-700">Full Name *</Label>
                    <Input
                      id="fullName"
                      {...register("fullName")}
                      className="mt-1 focus:ring-ocean focus:border-ocean"
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-slate-700">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="mt-1 focus:ring-ocean focus:border-ocean"
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-slate-700">Password *</Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        className="pr-10 focus:ring-ocean focus:border-ocean"
                        placeholder="Create a secure password"
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

                  <div>
                    <Label htmlFor="phone" className="text-slate-700">Phone Number *</Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      className="mt-1 focus:ring-ocean focus:border-ocean"
                      placeholder="+20 1XX XXX XXXX"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Swimming Details */}
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-sky/10 rounded-full flex items-center justify-center mr-3">
                    <Activity className="w-5 h-5 text-sky" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Swimming Details</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="age" className="text-slate-700">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      {...register("age", { valueAsNumber: true })}
                      className="mt-1 focus:ring-ocean focus:border-ocean"
                      placeholder="Enter your age"
                      min="4"
                      max="100"
                    />
                    {errors.age && (
                      <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="swimmingLevel" className="text-slate-700">Swimming Level *</Label>
                    <Select
                      onValueChange={(value) => setValue("swimmingLevel", value as any)}
                      defaultValue="beginner"
                    >
                      <SelectTrigger className="mt-1 focus:ring-ocean focus:border-ocean">
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (No experience)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (Basic strokes)</SelectItem>
                        <SelectItem value="advanced">Advanced (All strokes)</SelectItem>
                        <SelectItem value="competitive">Competitive (Racing experience)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.swimmingLevel && (
                      <p className="mt-1 text-sm text-red-600">{errors.swimmingLevel.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="program" className="text-slate-700">Program Interest *</Label>
                    <Select
                      onValueChange={(value) => setValue("program", value as any)}
                      defaultValue="adult"
                    >
                      <SelectTrigger className="mt-1 focus:ring-ocean focus:border-ocean">
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kids">Kids Program (4-12 years)</SelectItem>
                        <SelectItem value="adult">Adult Program (18+)</SelectItem>
                        <SelectItem value="competitive">Competitive Training</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.program && (
                      <p className="mt-1 text-sm text-red-600">{errors.program.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Health & Emergency */}
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center mr-3">
                    <Heart className="w-5 h-5 text-emerald" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Health & Emergency Information</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="medicalInfo" className="text-slate-700">Medical Information</Label>
                    <Textarea
                      id="medicalInfo"
                      {...register("medicalInfo")}
                      className="mt-1 focus:ring-ocean focus:border-ocean"
                      rows={4}
                      placeholder="Any medical conditions, allergies, or medications we should know about?"
                    />
                    <p className="mt-1 text-sm text-slate-500">
                      Optional but recommended for your safety
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="emergencyContact" className="text-slate-700">Emergency Contact</Label>
                    <Textarea
                      id="emergencyContact"
                      {...register("emergencyContact")}
                      className="mt-1 focus:ring-ocean focus:border-ocean"
                      rows={4}
                      placeholder="Name, relationship, and phone number of emergency contact"
                    />
                    <p className="mt-1 text-sm text-slate-500">
                      Someone we can contact in case of emergency
                    </p>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  />
                  <div className="text-sm">
                    <Label htmlFor="terms" className="text-slate-700 cursor-pointer">
                      I agree to the{" "}
                      <Link href="/terms" className="text-ocean hover:underline">
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-ocean hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">What happens next?</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• You'll receive a confirmation email</li>
                    <li>• Our team will contact you within 24 hours</li>
                    <li>• Schedule your first class or trial session</li>
                    <li>• Complete payment and start swimming!</li>
                  </ul>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full btn-ocean text-lg py-4"
                  disabled={loading || !acceptedTerms}
                >
                  {loading ? "Creating Account..." : "Create Account & Join MMS"}
                </Button>

                <div className="text-center">
                  <p className="text-slate-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-ocean hover:underline font-medium">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
