import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface CoachCardProps {
  name: string;
  title: string;
  experience: string;
  specialties: string[];
  imageUrl: string;
  bio: string;
}

export default function CoachCard({ name, title, experience, specialties, imageUrl, bio }: CoachCardProps) {
  return (
    <Card className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <img
          src={imageUrl}
          alt={name}
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        />
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{name}</h3>
        <p className="text-ocean font-medium mb-2">{title}</p>
        <p className="text-slate-600 mb-4">{bio}</p>
        <div className="flex justify-center space-x-2 flex-wrap gap-2">
          {specialties.map((specialty, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-ocean/10 text-ocean"
            >
              {specialty}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
