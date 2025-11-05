const createOrderDto = ({ products, user, trackingNumber, finalPrice }) => {
  return {
    amount: finalPrice,
    special_reference: trackingNumber,
    currency: "EGP",
    payment_methods: ["test"],
    billing_data: {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      phone_number: user.phoneNumber,
    },
    items: products,
  };
};

module.exports = { createOrderDto };
