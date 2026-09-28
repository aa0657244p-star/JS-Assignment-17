import { z } from "zod";
import { generalValidation } from "../../common/validation/general.validation";
export var loginSchema = {
    body: z.object({
        email: generalValidation.email,
        password: generalValidation.password
    })
};
export var registerSchema = {
    body: z.object({
        fname: z.string().min(2),
        lname: z.string().min(2),
        username: generalValidation.username,
        email: generalValidation.email,
        password: generalValidation.password,
        age: generalValidation.age,
        phone: generalValidation.phone,
        role: generalValidation.role
    })
};