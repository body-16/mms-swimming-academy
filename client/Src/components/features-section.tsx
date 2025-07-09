import { Settings, Building, CheckCircle } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Settings,
      title: "Expert Coaches",
      description: "Certified international coaches with Olympic training experience",
      color: "text-ocean",
      bgColor: "bg-ocean/10",
    },
    {
      icon: Building,
      title: "Modern Facilities",
      description: "Olympic-standard pools with the latest safety and training equipment",
      color: "text-sky",
      bgColor: "bg-sky/10",
    },
    {
      icon: CheckCircle,
      title: "Proven Results",
      description: "Track record of producing national champions and Olympic qualifiers",
      color: "text-emerald",
      bgColor: "bg-emerald/10",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-poppins text-slate-800 mb-4">
            Why Choose MMS Swimming Academy?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Experience world-class swimming instruction with our certified coaches and state-of-the-art facilities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
