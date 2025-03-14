require("express-async-errors");
const express = require("express");
const errorHandlerMiddleware = require("./middlewares/errorHandler.js");
const router = require("./routes/register.js");
const app = express();
const PORT = process.env.PORT;

app.use(express.static("public"));
app.use(express.json());

app.use("/api/v1/register", router);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`The server listen on port ${PORT}`);
});
