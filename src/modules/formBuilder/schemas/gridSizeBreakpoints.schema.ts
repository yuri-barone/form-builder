import * as z from 'zod';

export const gridSizeBreakpointSchema = z
  .union([
    z.literal('auto'),
    z.literal('true'),
    z
      .string()
      .optional()
      .nullable()
      .refine((v) => {
        if (!v) return true;
        const num = Number(v);
        return !isNaN(num) && num > 0 && num <= 12;
      }),
  ])
  .optional()
  .nullable();
