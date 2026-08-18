import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const site = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/site' }),
  schema: z.object({ name: z.string().optional() }).passthrough()
});

const solutions = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/solutions' }),
  schema: z.object({ name: z.string().optional() }).passthrough()
});

const services = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/services' }),
  schema: z.object({ name: z.string().optional() }).passthrough()
});

const partners = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/partners' }),
  schema: z.object({ name: z.string().optional() }).passthrough()
});

const support = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/support' }),
  schema: z.object({ name: z.string().optional() }).passthrough()
});

const about = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/about' }),
  schema: z.object({ name: z.string().optional() }).passthrough()
});

const contact = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/contact' }),
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
  site,
  solutions,
  services,
  partners,
  support,
  about,
  contact,
  products,
  posts
};
