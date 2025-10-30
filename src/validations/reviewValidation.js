const { default: z } = require("zod");
const isValidId = require("../utils/isValidId");

module.exports = schema = {
  list: {
    query: z.object({
      page: z.coerce.number().int().default(1),
      limit: z.coerce.number().int().default(10),
      product: z
        .refine((id) => isValidId(id), { 
          message: "Invalid product id",
        })
        .optional(),
      rating: z.coerce.number().int().min(1).max(5).optional(),
      createdAt: z.coerce.date().optional(),
      sort: z.string().optional(),
      searchString: z.string().optional(),
    }),
  },

  getOne: {
    params: z.object({
      id: z.refine((id) => isValidId(id), {
        message: "Invalid review id",
      }),
    }),
  },

  create: {
    body: z.object({
      userId: z.refine((id) => isValidId(id), {
        message: "Invalid user id",
      }),
      email: z.string().email(),
      comment: z.string().min(1),
      rating: z.coerce.number().int().min(1).max(5),
      product: z.refine((id) => isValidId(id), {
        message: "Invalid product id",
      }),
    }),
  },

  update: {
    body: z.object({
      comment: z.string().min(1).optional(),
      rating: z.coerce.number().int().min(1).max(5).optional(),
    }),
    params: z.object({
      id: z.refine((id) => isValidId(id), {
        message: "Invalid review id",
      }),
    }),
  },

  delete: {
    params: z.object({
      id: z.refine((id) => isValidId(id), {
        message: "Invalid review id",
      }),
    }),
  },
};
