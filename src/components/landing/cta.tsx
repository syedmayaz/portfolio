'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, File, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().optional(),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' }),
});

export function Cta() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Message Sent!',
      description:
        'Thank you for your consultation request. We will get back to you shortly.',
    });
    form.reset();
  }

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
  };

  return (
    <section id="cta" className="w-full bg-secondary py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Ready to Take Control?
          </h2>
          <p className="mt-2 max-w-[700px] text-foreground/80 md:text-xl/relaxed">
            Get started today by requesting a free consultation or securely
            uploading your financial documents.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          <Card>
            <CardHeader>
              <CardTitle>Request a Free Consultation</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john.doe@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Tell me about your business and how I can help...
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <UploadCloud className="h-8 w-8 text-primary" />
                <CardTitle>Secure Document Upload</CardTitle>
              </div>
              <CardDescription>
                Upload your financial documents through our secure client
                portal.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {uploadedFile ? (
                <div className="flex items-center justify-between rounded-lg border bg-background p-3">
                  <div className="flex items-center gap-2">
                    <File className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">
                      {uploadedFile.name}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setUploadedFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Label
                  htmlFor="file-upload"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center hover:bg-muted"
                >
                  <UploadCloud className="mb-2 h-8 w-8 text-muted-foreground" />
                  <span className="font-medium">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-muted-foreground">
                    PDF, CSV, or image files
                  </span>
                  <Input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </Label>
              )}
            </CardContent>
            <div className="p-6 pt-0">
              <Button
                onClick={handleFileUpload}
                className="w-full"
                variant="outline"
              >
                Upload Document
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
