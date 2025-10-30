const { isValidObjectId } = require("mongoose");
const { z } = require("zod");

module.exports = schema = {
  create: {
    body: z.object({
      code: z.string().min(1).max(20),
      discount: z.coerce.number().min(0).max(100),
      expirationDate: z.coerce.date(),
      maxUses: z.coerce.number().int().min(1),
    }),
  },

  list: {
    query: z.object({
      page: z.coerce.number().int().default(1),
      limit: z.coerce.number().int().default(10),
      code: z.string().optional(),
      discount: z.coerce.number().optional(),
      expirationDate: z.date().optional(),
      uses: z.coerce.number().optional(),
    }),
  },

  paramsId: {
    params: z.object({
      id: z.refine((id) => isValidObjectId(id), {
        message: "Invalid promo code id",
      }),
    }),
  },

  updatePromoCodeById: {
    body: z.object({
      code: z.string().optional(),
      discount: z.coerce.number().optional(),
      expirationDate: z.date().optional(),
      maxUses: z.coerce.number().optional(),
    }),
  },
};
