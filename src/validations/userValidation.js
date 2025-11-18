const { default: z, email } = require("zod");
const isValidId = require("../utils/isValidId");

module.exports = schema = {
  updateProfile: {
    body: z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      phoneNumber: z.string().optional(),
      password: z.string().min(6).optional(),
      email: z.string().email().optional(),
    }),
  },

  addAddress: {
    body: z.object({
      name: z.string().min(1),
      street: z.string().min(1),
      city: z.string().min(1),
      state: z.string().min(1),
      zipCode: z.string().min(1),
      country: z.string().min(1),
    }),
  },

  updateAddress: {
    params: z.object({
      addressId: z.refine((id) => isValidId(id), {
        message: "Invalid address id",
      }),
    }),
    body: z.object({
      name: z.string().min(1),
      street: z.string().min(1),
      city: z.string().min(1),
      state: z.string().min(1),
      zipCode: z.string().min(1),
      country: z.string().min(1),
    }),
  },

  removeAddress: {
    params: z.object({
      addressId: z.refine((id) => isValidId(id), {
        message: "Invalid address id",
      }),
    }),
  },
};
