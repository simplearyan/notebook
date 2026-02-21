import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        author: z.string().default('Kinetix Team'),
        image: z.string().optional(),
        tags: z.array(z.string()).optional()
    })
});

const docsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        order: z.number().default(999),
    })
});

const coursesCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/courses" }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        order: z.number().default(999),
        icon: z.string().optional(),
        color: z.string().optional(),
    })
});

export const collections = {
    'blog': blogCollection,
    'docs': docsCollection,
    'courses': coursesCollection,
};
