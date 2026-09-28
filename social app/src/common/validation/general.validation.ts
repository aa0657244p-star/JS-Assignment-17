import { z } from "zod";
import { Roles } from "../enum/role.enum";
export const generalValidation = {
    email: z.string().email({ message: "Invalid email format" }).transform(v => v.toLowerCase()),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    username: z.string().min(3).max(20),
    phone: z.string().min(10).max(15),
    age: z.number().min(18).max(60),
    role: z.enum(Object.values(Roles) as [string, ...string[]]).default(Roles.USER)
};