import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const translations = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/translations' }),
  schema: z.object({ name: z.string().optional() }).passthrough()
});

const products = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    image: z.string().optional().default(''),
    category: z.enum(['software', 'edge', 'sensor', 'connect', 'auto']).default('software'),
    order: z.number().default(0)
  })
});

const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().optional(),
    image: z.string().optional()
  })
});

export const collections = {
  translations,
  products,
  posts
};
