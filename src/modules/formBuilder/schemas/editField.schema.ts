import * as z from 'zod';

import { gridSizeBreakpointSchema } from './gridSizeBreakpoints.schema';

export const editFieldSchema = z.object({
  name: z.string(),
  label: z.string(),
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

export type EditFieldValues = z.infer<typeof editFieldSchema>;
