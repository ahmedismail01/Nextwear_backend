const paymobService = require("../services/paymentService");
const webhookService = require("../services/webhookService");

const onNotification = async (req, res) => {
  const data = req.body;
  await webhookService.onPaymobNotification(data);
  res.status(200).json({ success: true });
};

const onCallback = async (req, res) => {
  const { success, amount_cents, merchant_order_id } = req.query;

  const paymentStatus = success === "true" ? "Successful" : "Failed";
  const amount = amount_cents
    ? (parseInt(amount_cents) / 100).toFixed(2)
    : "0.00";
  const orderId = merchant_order_id || "N/A";

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Payment Status</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
          }
          .container {
            background-color: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 400px;
            width: 90%;
          }
          .status {
            font-size: 1.5rem;
            margin: 1rem 0;
            padding: 0.5rem;
            border-radius: 5px;
            color: white;
          }
          .success {
            background-color: #4CAF50;
          }
          .failure {
            background-color: #f44336;
          }
          .details {
            margin: 1rem 0;
            padding: 1rem;
            background-color: #f8f9fa;
            border-radius: 5px;
          }
          .button {
            background-color: #007bff;
            color: white;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            display: inline-block;
            margin-top: 1rem;
          }
          .button:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Payment Status</h1>
          <div class="status ${success ? "success" : "failure"}">
            Payment ${paymentStatus}
          </div>
          <div class="details">
            <p><strong>Amount:</strong> $${amount}</p>
            <p><strong>Order ID:</strong> ${orderId}</p>
          </div>
          <a href="/" class="button">Return to Home</a>
        </div>
      </body>
    </html>
  `;

  res.send(html);
};

module.exports = {
  onNotification,
  onCallback,
};
