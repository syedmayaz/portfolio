'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, UploadCloud, File, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function Cta() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleBooking = () => {
    toast({
      title: 'Consultation Booked!',
      description: `Your consultation for ${selectedDate?.toLocaleDateString()} has been scheduled.`,
    });
    setIsDialogOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedFile(event.target.files[0]);
    }
  };
  
  const handleFileUpload = () => {
    if (uploadedFile) {
      toast({
        title: 'File Uploaded!',
        description: `${uploadedFile.name} has been securely uploaded.`,
      });
      setUploadedFile(null);
    } else {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please choose a file to upload.',
      });
    }
  }

  return (
    <section id="cta" className="w-full bg-secondary py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Ready to Take Control?
          </h2>
          <p className="mt-2 max-w-[700px] text-foreground/80 md:text-xl/relaxed">
            Get started today by booking a free consultation or securely
            uploading your financial documents.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <CalendarDays className="h-8 w-8 text-primary" />
                <CardTitle>Book a Consultation</CardTitle>
              </div>
              <CardDescription>
                Schedule a free 30-minute consultation to discuss your needs.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>
                Find a time that works for you. We&apos;ll discuss your business, answer your questions, and see how we can help you achieve financial clarity.
              </p>
            </CardContent>
            <div className="p-6 pt-0">
              <Button onClick={() => setIsDialogOpen(true)} className="w-full">
                Schedule Now
              </Button>
            </div>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <UploadCloud className="h-8 w-8 text-primary" />
                <CardTitle>Secure Document Upload</CardTitle>
              </div>
              <CardDescription>
                Upload your financial documents through our secure client portal.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {uploadedFile ? (
                <div className="flex items-center justify-between rounded-lg border bg-background p-3">
                  <div className="flex items-center gap-2">
                    <File className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{uploadedFile.name}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setUploadedFile(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Label
                  htmlFor="file-upload"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center hover:bg-muted"
                >
                  <UploadCloud className="mb-2 h-8 w-8 text-muted-foreground" />
                  <span className="font-medium">Click to upload or drag and drop</span>
                  <span className="text-xs text-muted-foreground">PDF, CSV, or image files</span>
                  <Input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                </Label>
              )}
            </CardContent>
            <div className="p-6 pt-0">
              <Button onClick={handleFileUpload} className="w-full" variant="outline">
                Upload Document
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book Your Consultation</DialogTitle>
            <DialogDescription>
              Select a date and time for your free 30-minute consultation.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleBooking} type="submit">
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
