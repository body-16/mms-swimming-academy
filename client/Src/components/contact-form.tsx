import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-slate-800">Send Message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="focus:ring-ocean focus:border-ocean"
                placeholder="Your name"
              />
            </div>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="focus:ring-ocean focus:border-ocean"
                placeholder="Your email"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
              Phone (Optional)
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="focus:ring-ocean focus:border-ocean"
              placeholder="Your phone number"
            />
          </div>
          <div>
            <Label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              required
              className="focus:ring-ocean focus:border-ocean"
              placeholder="Message subject"
            />
          </div>
          <div>
            <Label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="focus:ring-ocean focus:border-ocean"
              placeholder="Your message"
            />
          </div>
          <Button
            type="submit"
            className="w-full btn-ocean"
            disabled={contactMutation.isPending}
          >
            {contactMutation.isPending ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
