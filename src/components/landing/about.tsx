import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function About() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-me');

  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Your Trusted Financial Partner
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                With over 15 years of experience serving small businesses and entrepreneurs, I understand the unique financial challenges you face. My approach combines personalized attention with strategic expertise.
              </p>
            </div>
            <div className="max-w-[600px] space-y-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                <p>
                I believe every business deserves access to professional accounting services that go beyond just crunching numbers. My goal is to be your financial partner, helping you make informed decisions that drive growth and profitability.
              </p>
              <p>
                Whether you&apos;re a startup finding your footing or an established business looking to optimize, I&apos;m here to provide the clarity and guidance you need.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {aboutImage && (
              <div className="relative h-[450px] w-[300px] overflow-hidden rounded-xl shadow-2xl transition-all hover:scale-105 sm:h-[500px] sm:w-[350px] lg:h-[550px] lg:w-[400px]">
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  data-ai-hint={aboutImage.imageHint}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
