import * as z from 'zod';

import { gridSizeBreakpointSchema } from './gridSizeBreakpoints.schema';

export const addFieldSchema = z.object({
  // dont allow spaces in field and has to be camelCase
  name: z
    .string()
    .min(1)
    .refine((v) => !v.includes(' '))
    .refine(
      (v) =>
        v === v.toLowerCase() ||
        v === v.toUpperCase() ||
        v === v[0].toLocaleLowerCase() + v.slice(1)
    ),
  label: z.string().min(1),
  gridSize: z.object({
    xs: gridSizeBreakpointSchema,
    sm: gridSizeBreakpointSchema,
    md: gridSizeBreakpointSchema,
    lg: gridSizeBreakpointSchema,
    xl: gridSizeBreakpointSchema,
  }),
});

export type AddFieldValues = z.infer<typeof addFieldSchema>;
