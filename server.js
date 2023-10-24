const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("welcome to ecommerce 2023");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`server runing on ${PORT}`));
