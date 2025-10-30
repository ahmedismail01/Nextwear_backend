// seed for promo codes
const promoCodeCommand = require("../src/commands/promoCodeCommand");
const promoCodeQuery = require("../src/queries/promoCodeQuery");

require("dotenv").config();

const samplePromoCodes = [
  {
    code: "WELCOME2023",
    discount: 20,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    maxUses: 100,
    isActive: true,
  },
  {
    code: "SUMMER50",
    discount: 50,
    expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    maxUses: 50,
    isActive: true,
  },
  {
    code: "FLASH25",
    discount: 25,
    expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
    maxUses: 25,
    isActive: true,
  },
];

module.exports.seedPromoCodes = async () => {
  try {
    for (const promoData of samplePromoCodes) {
      const existing = await promoCodeQuery.getRecord({ code: promoData.code });
      if (existing) {
        console.log(`Promo code exists, skipping: ${promoData.code}`);
        continue;
      }
      const promoCode = await promoCodeCommand.createRecord(promoData);
      console.log("Promo code created:", promoCode.code);
    }
  } catch (error) {
    console.error("Error seeding promo codes:", error.message);
  }
};