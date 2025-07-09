import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "wouter";

interface ProgramCardProps {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  ageGroup: string;
}

export default function ProgramCard({ title, description, price, imageUrl, ageGroup }: ProgramCardProps) {
  return (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <CardHeader className="p-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 mb-4">{description}</p>
        <div className="text-sm text-slate-500 mb-4">Age Group: {ageGroup}</div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex justify-between items-center w-full">
          <span className="text-2xl font-bold text-ocean">₪{price}/month</span>
          <Link href="/register">
            <Button className="btn-ocean">Learn More</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
