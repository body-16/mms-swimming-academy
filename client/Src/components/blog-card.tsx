import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  title: string;
  excerpt: string;
  author: string;
  category: string;
  publishedDate: string;
  imageUrl: string;
}

export default function BlogCard({ title, excerpt, author, category, publishedDate, imageUrl }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technique':
        return 'bg-ocean/10 text-ocean';
      case 'safety':
        return 'bg-emerald/10 text-emerald';
      case 'training':
        return 'bg-golden/10 text-golden';
      default:
        return 'bg-slate/10 text-slate';
    }
  };

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
        <div className="flex items-center mb-3">
          <Badge className={`${getCategoryColor(category)} text-sm`}>
            {category}
          </Badge>
          <span className="text-sm text-slate-500 ml-3">
            {formatDate(publishedDate)}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 mb-4">{excerpt}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500">By {author}</span>
          <Button variant="link" className="text-ocean hover:text-deep-blue font-medium p-0">
            Read More →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
