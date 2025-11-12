# Next Wear Backend

## A fully functional online store backend using ExpressJs and MongoDB

This project was made for an online store to serve user's products online with a payment integration to help customers pay online and it offers the following:

- Admin routes for handling users, orders, promocodes and products.
- Client routes for customers users to be able to see product and create orders.
- Payment integration using Paymob.
- Cloudinary integration for storing the media files.

## How to install this project

1 - clone the project
2 - install node if you dont have it
3 - open project folder
4 - open terminal and install the packages using `npm i`
5 - setup your environment variables

and your good to go

## Environment variables example

```dotenv
PORT=
ADMIN_PASSWORD=
ADMIN_EMAIL=
DB_STRING=
JWT_SECRET=
PAYMOB_PUBLIC_KEY=
PAYMOB_PAYMENT_URL=https://accept.paymob.com/unifiedcheckout
PAYMOB_SECRET_KEY=
PAYMOB_HMAC_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

# Find a bug?

If you found an issue or would like to submit an improvement to this project, please submit an issue using the issues tab above. If you would like to submit a PR with a fix, reference the issue you created!
