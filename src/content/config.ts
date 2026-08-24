import { defineCollection, z } from 'astro:content';

const legals = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.string(),
    title: z.string(),
    /** Per-page meta description. Without this every legal page inherited the
     *  homepage default, so two indexable URLs shared one description. */
    description: z.string().optional(),
    /** BCP-47 language of the page body. The mentions légales are French. */
    lang: z.string().optional(),
  }),
});

export const collections = { legals };
