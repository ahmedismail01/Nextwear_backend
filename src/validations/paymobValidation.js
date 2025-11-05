const { z } = require("zod");

module.exports = schema = {
  createPayment: {
    body: z.object({
      amount: z.number().transform((amount) => amount * 100),
      currency: z.string(),
      payment_methods: z.array(z.string()),
      billing_data: z.object({
        first_name: z.string(),
        last_name: z.string(),
        phone_number: z.string(),
      }),
      special_reference: z.string(),
      items: z.array(
        z.object({
          name: z.string().optional(),
          quantity: z.number().optional(),
          amount: z.number().transform((amount) => amount * 100),
        })
      ),
    }),
  },
};
