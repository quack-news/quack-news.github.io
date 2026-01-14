// src/content/config.ts

import { defineCollection, reference, z } from "astro:content";

const noticias = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      description: z.string(),
      author: reference("autores"),
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
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      description: z.string(),
      author: reference("autores"),
      image: z.object({
        src: image(),
        alt: z.string(),
      }),
      tags: z.array(z.string()),
      draft: z.boolean().optional(),

      prepTime: z.number().describe("Tempo de preparo em minutos"),
      cookTime: z.number().describe("Tempo de cozimento em minutos"),
      servings: z.number().describe("Número de porções que a receita rende"),
      difficulty: z.enum(["Fácil", "Médio", "Difícil"]),

      ingredients: z.array(
        z.object({
          amount: z.number().optional(),
          unit: z.string().optional(),
          name: z.string(),
        }),
      ),
    }),
});

const midias = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      description: z.string(),
      author: reference("autores"),
      image: z.object({
        src: image(),
        alt: z.string(),
      }),
      type: z.enum(["Filme", "Música", "Série", "Análise", "Jogo"]),
      tags: z.array(z.string()),

      rating: z.number().min(0).max(5).optional(),
      platform: z.string().optional(),
      duration: z.string().optional(),

      draft: z.boolean().optional(),
    }),
});

const fatosAleatorios = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string().max(200, "O fato deve ter no máximo 200 caracteres"),
      description: z.string().optional(),
      image: z
        .object({
          src: image(),
          alt: z.string(),
        })
        .optional(),
      pubDate: z.coerce.date(),
      source: z.string().url(),
      tags: z.array(z.string()),
      draft: z.boolean().optional(),
    }),
});

const previsoes = defineCollection({
  type: "data",
  schema: z.object({
    forecasts: z.array(
      z.object({
        nome: z.string(),
        texto: z.string(),
      }),
    ),
  }),
});

const autores = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      username: z.string(),
      avatar: image(),
      bio: z.string(),
      socials: z
        .object({
          twitter: z.string().url().optional(),
          instagram: z.string().url().optional(),
          linkedin: z.string().url().optional(),
          last_fm: z.string().url().optional(),
        })
        .optional(),
    }),
});

export const collections = {
  noticias,
  receitas,
  midias,
  "fatos-aleatorios": fatosAleatorios,
  previsoes,
  autores,
};
