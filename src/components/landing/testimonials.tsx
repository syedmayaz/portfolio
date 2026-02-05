import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah L.',
    title: 'Startup Founder',
    quote:
      "Syed Ayaz transformed our financial chaos into clarity. Their bookkeeping service is second to none, and the AI estimator was surprisingly accurate!",
    rating: 5,
    avatarId: 'testimonial-1',
  },
  {
    name: 'Michael B.',
    title: 'Small Business Owner',
    quote:
      'The tax preparation service saved us a significant amount of money. The team is professional, responsive, and truly cares about their clients. Highly recommended.',
    rating: 5,
    avatarId: 'testimonial-2',
  },
  {
    name: 'David C.',
    title: 'E-commerce Entrepreneur',
    quote:
      "Payroll is no longer a headache thanks to Syed Ayaz. Their service is efficient and reliable, giving me more time to focus on growing my business.",
    rating: 5,
    avatarId: 'testimonial-3',
  },
];

export function Testimonials() {
  const getImage = (id: string) =>
    PlaceHolderImages.find((img) => img.id === id);

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-2 max-w-[700px] text-foreground/80 md:text-xl/relaxed">
            Discover why business owners trust Syed Ayaz with their finances.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="mx-auto w-full max-w-xs sm:max-w-xl lg:max-w-4xl"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="h-full">
                    <CardContent className="flex h-full flex-col justify-between p-6">
                      <div>
                        <Quote className="h-8 w-8 text-primary" />
                        <p className="mt-4 text-sm text-foreground/80">
                          {testimonial.quote}
                        </p>
                      </div>
                      <div className="mt-6">
                        <div className="flex items-center">
                          <div className="relative h-12 w-12">
                            <Image
                              src={getImage(testimonial.avatarId)?.imageUrl || ''}
                              alt={`Avatar of ${testimonial.name}`}
                              data-ai-hint={getImage(testimonial.avatarId)?.imageHint}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                          </div>
                        </div>
                         <div className="mt-4 flex items-center">
                          {Array(testimonial.rating)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className="h-5 w-5 fill-accent text-accent"
                              />
                            ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
