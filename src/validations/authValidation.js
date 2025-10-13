const { z } = require("zod");
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
      password: z.string().min(6),
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      phoneNumber: z.string().optional(),
    }),
  },
};
