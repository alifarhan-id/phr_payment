const express = require("express");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/phr_payment", (req, res) => {
  res.json({ message: "Hello World" });
});

require("./app/routes/pembayaranPajak")(app);


app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});