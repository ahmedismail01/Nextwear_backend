const isValidId = require("../utils/isValidId");
const { z } = require("zod");
module.exports = schema = {
  create: {
    body: z.object({
      name: z.string().min(1),
    }),
  },

  update: {
    params: z.object({
      id: z.refine((id) => isValidId(id), {
        message: "Invalid category id",
      }),
    }),

    body: z.object({
      name: z.string().min(1).optional(),
    }),
  },

  paramsId: {
    params: z.object({
      id: z.refine((id) => isValidId(id), {
        message: "Invalid category id",
      }),
    }),
  },
};
