const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/add-information", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} ...`);
});
