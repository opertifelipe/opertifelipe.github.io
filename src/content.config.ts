import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pages = defineCollection({
  loader: glob({
    pattern: ['about.md', 'contacts.md', 'cv/README.md'],
    base: './src/data',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    path: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*/README.md', base: './src/data/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    path: z.string(),
    publishedAt: z.coerce.date(),
  }),
});

export const collections = { pages, projects };
