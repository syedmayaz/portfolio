'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';

import { getEstimate, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';

const EstimateSchema = z.object({
  businessSize: z.string().min(1, { message: 'Business size is required.' }),
  transactionVolume: z
    .string()
    .min(1, { message: 'Transaction volume is required.' }),
  specificNeeds: z.string().min(1, { message: 'Please describe your needs.' }),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating Estimate...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Get AI-Powered Estimate
        </>
      )}
    </Button>
  );
}

export function EstimateForm() {
  const { toast } = useToast();
  const initialState: FormState = { message: 'idle' };
  const [state, formAction] = useFormState(getEstimate, initialState);

  const form = useForm<z.infer<typeof EstimateSchema>>({
    resolver: zodResolver(EstimateSchema),
    defaultValues: {
      businessSize: '',
      transactionVolume: '',
      specificNeeds: '',
    },
  });

  useEffect(() => {
    if (state.message === 'error' && state.errors?.server) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.errors.server,
      });
    }
  }, [state, toast]);

  return (
    <Card className="w-full max-w-lg">
      <Form {...form}>
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Free Cost Estimator
            </CardTitle>
            <CardDescription>
              Answer three questions to get a personalized cost estimate from our AI.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="businessSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your business size?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="small">Small (1-10 employees)</SelectItem>
                      <SelectItem value="medium">Medium (11-50 employees)</SelectItem>
                      <SelectItem value="large">Large (51+ employees)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage>{state.errors?.businessSize}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transactionVolume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your monthly transaction volume?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a volume" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low (Under 100)</SelectItem>
                      <SelectItem value="medium">Medium (100-500)</SelectItem>
                      <SelectItem value="high">High (500+)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage>{state.errors?.transactionVolume}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specificNeeds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What are your specific needs?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Bookkeeping, tax preparation, payroll, financial consulting..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{state.errors?.specificNeeds}</FormMessage>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <SubmitButton />
          </CardFooter>
        </form>
      </Form>
      {state.message === 'success' && state.data && (
        <CardFooter>
          <Card className="w-full bg-secondary">
            <CardHeader>
              <CardTitle className="font-headline text-xl">
                Your Estimated Cost
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-3xl font-bold text-primary">
                {state.data.costEstimate}
              </p>
              <div>
                <h4 className="font-semibold">Estimate Breakdown</h4>
                <p className="text-sm text-muted-foreground">
                  {state.data.estimateBreakdown}
                </p>
              </div>
            </CardContent>
          </Card>
        </CardFooter>
      )}
    </Card>
  );
}
