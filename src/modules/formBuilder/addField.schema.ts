import * as z from 'zod';

export const addFieldSchema = z.object({
  name: z.string(),
  label: z.string(),
  haveMin: z.boolean().optional(),
  haveMax: z.boolean().optional(),
  gridSize: z.object({
    xs: z.number().max(12),
    sm: z.number().max(12).optional().nullable(),
    md: z.number().max(12).optional().nullable(),
    lg: z.number().max(12).optional().nullable(),
    xl: z.number().max(12).optional().nullable(),
  }),
  constraints: z.object({
    required: z.boolean().optional(),
    min: z.number().optional().nullable(),
    max: z.number().optional().nullable(),
  }),
});

export type AddFieldValues = z.infer<typeof addFieldSchema>;
