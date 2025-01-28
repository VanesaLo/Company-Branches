import { z } from "zod";

export const branchSchema = z.object({
  nombre: z.string(),
  email: z.string(),
  descripcion: z.string(),
  pais: z.string(),
  departamento: z.string(),
  city_id: z.string(),
  direccion: z.string(),
  telefono: z.number(),
  imagen: z.string(),
})
export type BranchSchema = z.infer<typeof branchSchema>
