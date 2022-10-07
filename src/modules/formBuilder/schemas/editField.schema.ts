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
});

export type EditFieldValues = z.infer<typeof editFieldSchema>;
