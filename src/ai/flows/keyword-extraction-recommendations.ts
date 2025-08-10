'use server';

/**
 * @fileOverview A Genkit flow for extracting keywords from user queries and providing personalized job and course recommendations.
 *
 * - keywordExtractionRecommendations - A function that handles the keyword extraction and recommendation process.
 * - KeywordExtractionRecommendationsInput - The input type for the keywordExtractionRecommendations function.
 * - KeywordExtractionRecommendationsOutput - The return type for the keywordExtractionRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const KeywordExtractionRecommendationsInputSchema = z.object({
  query: z.string().describe('The user query to extract keywords from.'),
});
export type KeywordExtractionRecommendationsInput = z.infer<typeof KeywordExtractionRecommendationsInputSchema>;

const KeywordExtractionRecommendationsOutputSchema = z.object({
  keywords: z.array(z.string()).describe('The extracted keywords from the user query.'),
  jobRecommendations: z.array(z.string()).describe('The job recommendations based on the extracted keywords.'),
  courseRecommendations: z.array(z.string()).describe('The course recommendations based on the extracted keywords.'),
});
export type KeywordExtractionRecommendationsOutput = z.infer<typeof KeywordExtractionRecommendationsOutputSchema>;

export async function keywordExtractionRecommendations(
  input: KeywordExtractionRecommendationsInput
): Promise<KeywordExtractionRecommendationsOutput> {
  return keywordExtractionRecommendationsFlow(input);
}

const keywordExtractionPrompt = ai.definePrompt({
  name: 'keywordExtractionPrompt',
  input: {schema: KeywordExtractionRecommendationsInputSchema},
  output: {schema: KeywordExtractionRecommendationsOutputSchema},
  prompt: `You are a career advisor. Extract keywords related to job skills and training courses from the following user query: {{{query}}}.\n\nBased on the extracted keywords, provide personalized job and course recommendations. Return the keywords, job recommendations, and course recommendations in JSON format.\n`,
});

const keywordExtractionRecommendationsFlow = ai.defineFlow(
  {
    name: 'keywordExtractionRecommendationsFlow',
    inputSchema: KeywordExtractionRecommendationsInputSchema,
    outputSchema: KeywordExtractionRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await keywordExtractionPrompt(input);
    return output!;
  }
);
