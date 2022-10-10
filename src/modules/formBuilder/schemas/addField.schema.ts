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
  options: z
    .object({
      precision: z.number().min(0).max(10).optional(),
      mask: z.string().optional(),
    })
    .optional(),
  validations: z
    .object({
      required: z.boolean().optional(),
      min: z.number().optional(),
      max: z.number().optional(),
      startAllowRetroactiveDates: z.boolean().optional(),
      endAllowRetroactiveDates: z.boolean().optional(),
      startAllowFutureDates: z.boolean().optional(),
      endAllowFutureDates: z.boolean().optional(),
      allowRetroactiveDates: z.boolean().optional(),
      allowFutureDates: z.boolean().optional(),
    })
    .optional(),
});

export type AddFieldValues = z.infer<typeof addFieldSchema>;
