import { defineCollection, z } from 'astro:content';

const legals = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.string(),
    title: z.string(),
  }),
});

export const collections = { legals };
