import { EstimateForm } from '@/components/ai/estimate-form';

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Clarity and Confidence in Your Finances
              </h1>
              <p className="max-w-[600px] text-foreground/80 md:text-xl">
                AccountEase offers expert freelance accounting services tailored
                to your business needs. Get an instant cost estimate with our AI-powered tool.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <EstimateForm />
          </div>
        </div>
      </div>
    </section>
  );
}
