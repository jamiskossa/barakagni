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

// Define schemas for structured data that can be used by the frontend cards
const JobRecommendationSchema = z.object({
  id: z.string(),
  employerId: z.string(),
  title: z.string(),
  category: z.string(),
  location: z.string(),
  type: z.string(),
  company: z.string(),
  imageUrl: z.string(),
  dataAiHint: z.string().optional(),
});
export type JobRecommendation = z.infer<typeof JobRecommendationSchema>;

const CourseRecommendationSchema = z.object({
  title: z.string(),
  category: z.string(),
  duration: z.string(),
  certification: z.boolean(),
  provider: z.string(),
  imageUrl: z.string(),
  dataAiHint: z.string().optional(),
});
export type CourseRecommendation = z.infer<typeof CourseRecommendationSchema>;

const KeywordExtractionRecommendationsInputSchema = z.object({
  query: z.string().describe('The user query to extract keywords from.'),
  availableJobs: z.array(JobRecommendationSchema).describe('A list of available jobs for the AI to recommend from.'),
  availableCourses: z.array(CourseRecommendationSchema).describe('A list of available courses for the AI to recommend from.'),
});
export type KeywordExtractionRecommendationsInput = z.infer<typeof KeywordExtractionRecommendationsInputSchema>;

const KeywordExtractionRecommendationsOutputSchema = z.object({
  keywords: z.array(z.string()).describe('The extracted keywords from the user query.'),
  jobRecommendations: z.array(JobRecommendationSchema).describe('The job recommendations based on the extracted keywords.'),
  courseRecommendations: z.array(CourseRecommendationSchema).describe('The course recommendations based on the extracted keywords.'),
});
export type KeywordExtractionRecommendationsOutput = z.infer<typeof KeywordExtractionRecommendationsOutputSchema>;

export async function keywordExtractionRecommendations(
  input: KeywordExtractionRecommendationsInput
): Promise<KeywordExtractionRecommendationsOutput> {
  // If no jobs or courses are available, return empty recommendations to avoid errors.
  if (input.availableJobs.length === 0 && input.availableCourses.length === 0) {
    return {
      keywords: [],
      jobRecommendations: [],
      courseRecommendations: [],
    };
  }
  return keywordExtractionRecommendationsFlow(input);
}

const keywordExtractionPrompt = ai.definePrompt({
  name: 'keywordExtractionPrompt',
  input: {schema: KeywordExtractionRecommendationsInputSchema},
  output: {schema: KeywordExtractionRecommendationsOutputSchema},
  prompt: `You are a career advisor for artisans in Guinea. Your goal is to provide personalized job and course recommendations based on a user's query and a list of available opportunities.

1.  **Analyze the User's Query:** Extract keywords related to job skills, trades, locations, and training courses from the following query:
    > {{{query}}}

2.  **Select Relevant Jobs:** From the list of available jobs below, select up to 3 that best match the extracted keywords. Return them as structured objects.
    Available Jobs:
    \`\`\`json
    {{{json availableJobs}}}
    \`\`\`

3.  **Select Relevant Courses:** From the list of available courses below, select up to 3 that best match the extracted keywords. Return them as structured objects.
    Available Courses:
    \`\`\`json
    {{{json availableCourses}}}
    \`\`\`

4.  **Format the Output:** Return the extracted keywords, the selected job recommendations, and the selected course recommendations in a single, valid JSON object.
`,
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
