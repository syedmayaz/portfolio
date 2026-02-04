'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookOpen, Calculator, Landmark, Users } from 'lucide-react';

const services = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Bookkeeping',
    description:
      'Meticulous record-keeping to ensure your financial data is accurate, up-to-date, and organized.',
    price: '$99/month',
  },
  {
    icon: <Calculator className="h-8 w-8 text-primary" />,
    title: 'Tax Preparation',
    description:
      'Expert tax planning and preparation to minimize liabilities and ensure full compliance with regulations.',
    price: '$120/month',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Payroll Services',
    description:
      'Efficient and reliable payroll processing, handling everything from payments to tax filings.',
    price: '$5/each employee',
  },
  {
    icon: <Landmark className="h-8 w-8 text-primary" />,
    title: 'Financial Consulting',
    description:
      'Strategic advice and financial planning to help you make informed decisions and achieve your business goals.',
  },
];

export function Services() {
  return (
    <section id="services" className="w-full bg-secondary py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-2 max-w-[700px] text-foreground/80 md:text-xl/relaxed">
            We provide a full range of accounting services to keep your business
            financially healthy.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.title}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  {service.icon}
                  {service.price && (
                    <div className="text-right text-sm font-semibold text-primary">
                      {service.price}
                    </div>
                  )}
                </div>
                <CardTitle className="pt-4">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
