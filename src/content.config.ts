// src/content/config.ts

import { defineCollection, reference, z } from 'astro:content';

const noticias = defineCollection({
	type: 'content',
	schema: ({ image }) => z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		description: z.string(),
		author: reference('autores'),
		updatedDate: z.coerce.date().optional(),
		image: z.object({
			src: image(),
			alt: z.string(),
			caption: z.string().optional(),
		}),
		category: z.string(),
		tags: z.array(z.string()),
		draft: z.boolean().optional(),
	}),
});

const receitas = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        description: z.string(),
        author: reference('autores'),
        image: z.object({
            src: image(),
            alt: z.string(),
        }),
        tags: z.array(z.string()),
        draft: z.boolean().optional(),
        
        // ✨ NOVOS CAMPOS PARA A EXPERIÊNCIA DA RECEITA
        prepTime: z.number().describe("Tempo de preparo em minutos"),
        cookTime: z.number().describe("Tempo de cozimento em minutos"),
        servings: z.number().describe("Número de porções que a receita rende"),
        difficulty: z.enum(['Fácil', 'Médio', 'Difícil']),
        
        // Ingredientes agora são dados estruturados!
        ingredients: z.array(z.object({
            amount: z.number().optional(),
            unit: z.string().optional(),
            name: z.string(),
        })),
    }),
});

const midias = defineCollection({
	type: 'content',
	schema: ({ image }) => z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		description: z.string(),
		author: reference('autores'),
		image: z.object({
			src: image(),
			alt: z.string(),
		}).optional(),
		type: z.enum(['Filme', 'Música', 'Série', 'Análise']),
		tags: z.array(z.string()),
		draft: z.boolean().optional(),
	}),
});

const fatosAleatorios = defineCollection({
	type: 'content',
	schema: ({ image }) => z.object({
		title: z.string().max(200, "O fato deve ter no máximo 200 caracteres"),
		pubDate: z.coerce.date(),
		image: z.object({
			src: image(),
			alt: z.string(),
		}).optional(),
		source: z.string().url().optional(),
		tags: z.array(z.string()),
		draft: z.boolean().optional(),
	}),
});

const autores = defineCollection({
    type: 'data',
    schema: ({ image }) => z.object({
        name: z.string(),
        avatar: image(),
        bio: z.string(),
        socials: z.object({
            twitter: z.string().url().optional(),
            instagram: z.string().url().optional(),
            linkedin: z.string().url().optional(),
            last_fm: z.string().url().optional(),
        }).optional(),
    }),
});

export const collections = {
	noticias,
	receitas,
	midias,
	'fatos-aleatorios': fatosAleatorios,
	autores,
};