import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
export var validation = (schema: { body?: ZodType; query?: ZodType; params?: ZodType }) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const issues: any[] = [];
        for (const key of Object.keys(schema) as ("body" | "query" | "params")[]) {
            if (schema[key]) {
                const result = schema[key]!.safeParse(req[key]);
                if (!result.success) {
                    issues.push({ key, issues: result.error.errors });
                }
            }
        }
        if (issues.length > 0) {
            return res.status(400).json({ message: "validation error", issues });
        }
        next();
    };
};