'use client';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  Github,
  Linkedin,
  Twitter,
  Phone,
  Mail,
  MapPin,
  Clock,
} from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="w-full border-t">
      <div className="container grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2 md:px-6 lg:grid-cols-3">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Streamlining your finances with expert accounting
            services.
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
          <h3 className="font-headline text-2xl font-bold">Get In Touch</h3>
          <p className="mb-4 text-muted-foreground">
            Let's Discuss Your Financial Goals
          </p>
          <p className="mb-6 max-w-[600px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
            Ready to take control of your finances? Schedule a free consultation
            to discuss how I can help your business thrive.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Phone className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <a
                    href="tel:+923333720307"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    (+92333) 372-0307
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <a
                    href="mailto:bookkeeping-expert@outlook.com"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    bookkeeping-expert@outlook.com
                  </a>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <h4 className="font-semibold">Office</h4>
                  <p className="text-muted-foreground">
                    Scarborough ON
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <h4 className="font-semibold">Hours</h4>
                  <p className="text-muted-foreground">Mon-Fri: 9am - 5pm</p>
                </div>
              </div>
            </div>
          </div>
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
