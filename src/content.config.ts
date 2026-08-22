import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '[0-9][0-9][0-9][0-9]/[0-9][0-9]/[0-9][0-9]-*.md', base: './src/data/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

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
    path: z.string(),
    publishedAt: z.coerce.date(),
  }),
});

export const collections = { blog, pages, projects };
