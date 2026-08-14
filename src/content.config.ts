import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const terminal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/terminal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    path: z.string(),
  }),
});

export const collections = { blog, terminal };
