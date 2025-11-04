const request = require("../request");
// paymob connector

class PaymobConnector {
  constructor() {
    this.baseUrl = "https://accept.paymob.com/v1";
    this.secretKey = process.env.PAYMOB_SECRET_KEY;
  }

  createPayment = async (data) => {
    const options = {
      url: `${this.baseUrl}/intention/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.secretKey}`,
      },
      body: JSON.stringify(data),
    };
    const response = await request.POST(options);
    return response;
  };
}

module.exports = new PaymobConnector();
