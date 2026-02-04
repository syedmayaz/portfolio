import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Clarity and Confidence in Your Finances
            </h1>
            <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
              syedayaz offers expert freelance accounting services tailored
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
