import * as z from 'zod';

export const addFieldSchema = z.object({
  name: z.string(),
  label: z.string(),
  gridSize: z.object({
    xs: z.number().max(12).optional().nullable(),
    sm: z.number().max(12).optional().nullable(),
    md: z.number().max(12).optional().nullable(),
    lg: z.number().max(12).optional().nullable(),
    xl: z.number().max(12).optional().nullable(),
  }),
});

export type AddFieldValues = z.infer<typeof addFieldSchema>;
