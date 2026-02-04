
'use server';
import {
  estimateAccountingCosts,
  type EstimateAccountingCostsInput,
  type EstimateAccountingCostsOutput,
} from '@/ai/flows/estimate-accounting-costs';
import { z } from 'zod';

const EstimateSchema = z.object({
  businessSize: z.string().min(1, { message: 'Business size is required.' }),
  transactionVolume: z.string().min(1, { message: 'Transaction volume is required.' }),
  specificNeeds: z.string().min(1, { message: 'Please describe your needs.' }),
});

export type FormState = {
  message: 'success' | 'error' | 'idle';
  data?: EstimateAccountingCostsOutput;
  errors?: {
    businessSize?: string[];
    transactionVolume?: string[];
    specificNeeds?: string[];
    server?: string;
  };
};

export async function getEstimate(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawFormData = {
    businessSize: formData.get('businessSize'),
    transactionVolume: formData.get('transactionVolume'),
    specificNeeds: formData.get('specificNeeds'),
  };

  const validatedFields = EstimateSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      message: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const result = await estimateAccountingCosts(
      validatedFields.data as EstimateAccountingCostsInput
    );
    return { message: 'success', data: result };
  } catch (e: unknown) {
    const error = e as Error;
    return {
      message: 'error',
      errors: {
        server: error.message || 'An unknown error occurred.',
      }
    };
  }
}
