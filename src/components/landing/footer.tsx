'use client';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const { toast } = useToast();

  const handleInquirySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: 'Inquiry Sent!',
      description: "Thanks for reaching out. We'll get back to you shortly.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <footer id="contact" className="w-full border-t">
      <div className="container grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2 md:px-6 lg:grid-cols-3">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Streamlining your finances with expert freelance accounting services.
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="#" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
        <div className="lg:col-span-2">
          <h3 className="font-headline text-2xl font-bold">Have a Question?</h3>
          <p className="mb-4 text-muted-foreground">
            Fill out the form below and we&apos;ll get back to you as soon as
            possible.
          </p>
          <form className="space-y-4" onSubmit={handleInquirySubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Your message or inquiry"
                required
              />
            </div>
            <Button type="submit">Send Inquiry</Button>
          </form>
        </div>
      </div>
      <div className="border-t py-4">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} syedayaz. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
