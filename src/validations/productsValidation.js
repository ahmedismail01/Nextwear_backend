const { z } = require("zod");
const isValidId = require("../utils/isValidId");
const { id } = require("zod/locales");
module.exports = schema = {
  list: {
    query: z.object({
      page: z.coerce.number().int().default(1),
      limit: z.coerce.number().int().default(10),
      materials: z.array(z.string()).optional(),
      featured: z.coerce.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      categoryId: z.refine((id) => isValidId(id), {
        message: "Invalid category id",
      }).optional(),
      sort: z.string().optional(),

      searchString: z.string().optional(),

      minAverageRating: z.coerce.number().int().min(0).max(5).optional(),
      maxAverageRating: z.coerce.number().int().min(0).max(5).optional(),
      minPrice: z.coerce.number().optional(),
      maxPrice: z.coerce.number().optional(),
    }),
  },
  paramsId: {
    params: z.object({
      id: z.refine((id) => isValidId(id), {
        message: "Invalid product id",
      }),
    }),
  },

  createProduct: {
    body: z.object({
      name: z.string(),
      description: z.string(),
      materials: z.array(z.string()),
      category: z.refine((id) => isValidId(id), {
        message: "Invalid category id",
      }),
      discount: z.coerce.number().max(100).min(0).default(0),
      featured: z.coerce.boolean(),
    }),
  },
  updateProductById: {
    body: z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      materials: z.array(z.string()).optional(),
      price: z.coerce.number().optional(),
      discount: z.coerce.number().max(100).min(0).optional(),
      featured: z.coerce.boolean().optional(),
      category: z.refine((id) => isValidId(id), {
        message: "Invalid category id",
      }),
    }),
  },
  variant: {
    body: z.object({
      size: z.string(),
      color: z.string(),
      price: z.coerce.number().min(0),
      quantity: z.coerce.number().int().min(0).default(0),
    }),
  },

  updateVariant: {
    body: z.object({
      images: z.array(z.string()).optional(),
      size: z.string().optional(),
      color: z.string().optional(),
      price: z.coerce.number().min(0).optional(),
      quantity: z.coerce.number().int().min(0).default(0),
    }),
  },

  variantParams: {
    params: z.object({
      productId: z.refine((id) => isValidId(id), {
        message: "Invalid product id",
      }),
      variantId: z.refine((id) => isValidId(id), {
        message: "Invalid variant id",
      }),
    }),
  },
  updateProduct: {
    body: z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      materials: z.array(z.string()).optional(),
      discount: z.coerce.number().max(100).min(0).optional(),
      featured: z.coerce.boolean().optional(),
      category: z.refine((id) => isValidId(id), {
        message: "Invalid category id",
      }),
    }),
    params: z.object({
      id: z.refine((id) => isValidId(id), {
        message: "Invalid product id",
      }),
    }),
  },
};
