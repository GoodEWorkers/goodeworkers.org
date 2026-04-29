import { defineCollection, z } from 'astro:content';

const legals = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.string(),
    title: z.string(),
  }),
});

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    cover: z.string().url().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { legals, articles };
