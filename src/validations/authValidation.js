const { z } = require("zod");

// Password validation regex: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  );

module.exports = schema = {
  login: {
    body: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
  },
  register: {
    body: z.object({
      email: z.string().email(),
      password: passwordSchema,
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      phoneNumber: z.string().optional(),
    }),
  },
};
