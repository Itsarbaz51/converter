import { z } from "zod";

export const createToolValidation = z.object({
  name: z.string().min(3),

  slug: z.string().min(3),

  category: z.string(),

  description: z.string().optional(),

  inputFormats: z.array(z.string()).min(1),

  outputFormats: z.array(z.string()).min(1),

  icon: z.string().optional(),

  color: z.string().optional(),

  engine: z.string(),

  priority: z.number().optional(),

  isPopular: z.boolean().optional(),

  active: z.boolean().optional(),
});

export const updateToolValidation = createToolValidation.partial();
