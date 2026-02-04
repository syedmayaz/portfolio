'use server';

/**
 * @fileOverview Provides an AI-powered estimate for accounting services.
 *
 * - estimateAccountingCosts - Estimates the cost of accounting services based on business details.
 * - EstimateAccountingCostsInput - The input type for the estimateAccountingCosts function.
 * - EstimateAccountingCostsOutput - The return type for the estimateAccountingCosts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateAccountingCostsInputSchema = z.object({
  businessSize: z
    .string()
    .describe('The size of the business (e.g., small, medium, large).'),
  transactionVolume: z
    .string()
    .describe('The monthly transaction volume (e.g., low, medium, high).'),
  specificNeeds: z
    .string()
    .describe(
      'Specific accounting needs or services required (e.g., bookkeeping, tax preparation, payroll).'
    ),
});
export type EstimateAccountingCostsInput = z.infer<
  typeof EstimateAccountingCostsInputSchema
>;

const EstimateAccountingCostsOutputSchema = z.object({
  costEstimate: z
    .string()
    .describe('An estimated cost range for the accounting services.'),
  estimateBreakdown: z
    .string()
    .describe('A brief explanation of how the estimate was calculated.'),
});
export type EstimateAccountingCostsOutput = z.infer<
  typeof EstimateAccountingCostsOutputSchema
>;

export async function estimateAccountingCosts(
  input: EstimateAccountingCostsInput
): Promise<EstimateAccountingCostsOutput> {
  return estimateAccountingCostsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateAccountingCostsPrompt',
  input: {schema: EstimateAccountingCostsInputSchema},
  output: {schema: EstimateAccountingCostsOutputSchema},
  prompt: `You are an AI assistant specializing in providing cost estimates for accounting services.

  Based on the client's business specifics, generate a cost estimate and a brief explanation.

  Business Size: {{{businessSize}}}
  Transaction Volume: {{{transactionVolume}}}
  Specific Needs: {{{specificNeeds}}}
  `,
});

const estimateAccountingCostsFlow = ai.defineFlow(
  {
    name: 'estimateAccountingCostsFlow',
    inputSchema: EstimateAccountingCostsInputSchema,
    outputSchema: EstimateAccountingCostsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
