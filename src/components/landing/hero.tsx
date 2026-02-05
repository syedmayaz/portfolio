import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40">
      {heroImage && (
        <>
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover -z-10"
          />
          <div className="absolute inset-0 bg-black/60 -z-10" />
        </>
      )}
      <div className="container relative z-0 px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="font-headline text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
              Clarity and Confidence in Your Finances
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
              Syed Ayaz offers expert accounting services tailored
              to your business needs. Get expert help with bookkeeping, tax
              preparation, payroll, and financial consulting.
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild size="lg">
              <a href="#cta">Get Started</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
