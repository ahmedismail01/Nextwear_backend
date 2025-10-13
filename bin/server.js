require("dotenv").config()
const app = require("express")()
const http = require("http").createServer(app)
const port = process.env.PORT || 3000

http.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})


