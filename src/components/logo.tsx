import { Briefcase } from 'lucide-react';

export function Logo() {
  return (
    <a href="/" className="flex items-center gap-2" aria-label="Syed Ayaz Home">
      <Briefcase className="h-7 w-7 text-primary" />
      <span className="font-headline text-2xl font-bold text-foreground">Syed Ayaz</span>
    </a>
  );
}
