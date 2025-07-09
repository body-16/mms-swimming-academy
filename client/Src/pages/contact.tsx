import ContactForm from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      content: "123 Swimming Lane, New Cairo, Egypt",
      color: "text-ocean",
      bgColor: "bg-ocean/10",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+20 123 456 7890",
      color: "text-sky",
      bgColor: "bg-sky/10",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@mmsswimming.com",
      color: "text-emerald",
      bgColor: "bg-emerald/10",
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Mon-Sat: 6:00 AM - 10:00 PM\nSunday: 8:00 AM - 6:00 PM",
      color: "text-golden",
      bgColor: "bg-golden/10",
    },
  ];

  const departments = [
    {
      name: "General Information",
      email: "info@mmsswimming.com",
      phone: "+20 123 456 7890",
      description: "General inquiries and information about our programs",
    },
    {
      name: "Registration",
      email: "register@mmsswimming.com",
      phone: "+20 123 456 7891",
      description: "New member registration and enrollment questions",
    },
    {
      name: "Billing & Payments",
      email: "billing@mmsswimming.com",
      phone: "+20 123 456 7892",
      description: "Payment inquiries and billing support",
    },
    {
      name: "Facilities",
      email: "facilities@mmsswimming.com",
      phone: "+20 123 456 7893",
      description: "Pool bookings, maintenance, and facility-related inquiries",
    },
  ];

  const faq = [
    {
      question: "What should I bring to my first class?",
      answer: "Bring a swimsuit, towel, goggles, and any personal items you need. We provide kickboards and other training equipment.",
    },
    {
      question: "Are there makeup classes for missed sessions?",
      answer: "Yes, we offer makeup classes for missed sessions with 24-hour advance notice. Please contact us to schedule.",
    },
    {
      question: "What age groups do you serve?",
      answer: "We serve all ages from 4 years old to adults. Our programs are specifically designed for different age groups and skill levels.",
    },
    {
      question: "Do you offer private lessons?",
      answer: "Yes, we offer private and semi-private lessons. Contact us to discuss availability and pricing.",
    },
    {
      question: "What safety measures do you have in place?",
      answer: "We have certified lifeguards on duty, comprehensive safety protocols, and all coaches are trained in water safety and CPR.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-ocean to-sky">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold font-poppins mb-6">Get In Touch</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Have questions about our programs? Ready to start your swimming journey? 
              We're here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-slate-800 mb-4">Contact Information</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Multiple ways to reach us for your convenience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 ${info.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <info.icon className={`w-8 h-8 ${info.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{info.title}</h3>
                  <p className="text-slate-600 whitespace-pre-line">{info.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <ContactForm />
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-slate-800">Find Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-200 rounded-lg h-64 flex items-center justify-center mb-6">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600">Map integration would be here</p>
                      <p className="text-sm text-slate-500">Google Maps or similar service</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Address</h4>
                      <p className="text-slate-600">123 Swimming Lane, New Cairo, Egypt</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Landmarks</h4>
                      <p className="text-slate-600">
                        Located near Cairo Festival City Mall, accessible via Ring Road
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Parking</h4>
                      <p className="text-slate-600">
                        Free parking available for all students and visitors
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-slate-800 mb-4">Department Contacts</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Get in touch with the right department for faster assistance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-slate-800">{dept.name}</h3>
                    <Badge className="bg-ocean/10 text-ocean">Contact</Badge>
                  </div>
                  <p className="text-slate-600 mb-4">{dept.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-slate-400 mr-2" />
                      <span className="text-slate-600">{dept.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-slate-400 mr-2" />
                      <span className="text-slate-600">{dept.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-slate-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Quick answers to common questions about our programs and facilities.
            </p>
          </div>

          <div className="space-y-6">
            {faq.map((item, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">{item.question}</h3>
                  <p className="text-slate-600">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
