import { z } from "zod";

export const branchSchema = z.object({
  nombre: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  descripcion: z.string().optional(),
  pais: z.string().min(1, "Country is required"),
  departamento: z.string().min(1, "State is required"),
  city_id: z.string().min(1, "City is required"),
  direccion: z.string().min(1, "Address is required"),
  telefono: z.string().min(1, "Phone number is required"),
  imagen: z.string().nonempty("Image is required"),
});
export type BranchSchema = z.infer<typeof branchSchema>
