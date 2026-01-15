import { defineCollection, reference, z } from 'astro:content';

const authorRef = reference('autores');

const baseSchema = z.object({
  title: z.string(),
  pubDate: z.coerce.date(),
  tags: z.array(z.string()),
  author: authorRef,
  draft: z.boolean().optional(),
  description: z.string().optional(),
});

const standardImage = (image: any) =>
  z.object({
    src: image(),
    alt: z.string(),
  });

const noticias = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    baseSchema.extend({
      description: z.string(),
      updatedDate: z.coerce.date().optional(),
      category: z.string(),
      image: standardImage(image).extend({
        caption: z.string().optional(),
      }),
    }),
});

const receitas = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    baseSchema.extend({
      description: z.string(),
      image: standardImage(image),

      prepTime: z.number().describe('Tempo de preparo em minutos'),
      cookTime: z.number().describe('Tempo de cozimento em minutos'),
      servings: z.number().describe('Número de porções'),

      difficulty: z.enum(['Fácil', 'Médio', 'Difícil']),

      ingredients: z.array(
        z.object({
          amount: z.number().optional(),
          unit: z.string().optional(),
          name: z.string(),
        })
      ),
    }),
});

const midias = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    baseSchema.extend({
      description: z.string(),
      image: standardImage(image),

      type: z.enum(['Filme', 'Música', 'Série', 'Análise', 'Jogo']),
      rating: z.number().min(0).max(5).optional(),
      platform: z.string().optional(),
      duration: z.string().optional(),
    }),
});

const fatosAleatorios = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    baseSchema.extend({
      title: z.string().max(200, 'O fato deve ter no máximo 200 caracteres'),
      image: standardImage(image).optional(),
      source: z.string().url(),
    }),
});

const previsoes = defineCollection({
  type: 'data',
  schema: z.object({
    forecasts: z.array(
      z.object({
        nome: z.string(),
        texto: z.string(),
      })
    ),
  }),
});

const autores = defineCollection({
  type: 'data',
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
  'fatos-aleatorios': fatosAleatorios,
  previsoes,
  autores,
};
