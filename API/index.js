const express = require("express");

const app = express();
const PORT = 3000;
app.get("/cats", (req, res) => {
  res.status(200);
  res.send([
    {
      name: "Penny",
      age: 3,
      nationality: "Canada",
    },
    {
      name: "Bony",
      age: 4,
      nationality: "Bangladesh",
    },
  ]);
});

app.get("/humans", (req, res) => {
  res.status(200);
  res.send([
    {
      name: "Romy",
      hobby: "travelling",
    },
    {
      name: "Telot",
      hobby: "Photography",
    },
  ]);
});

app.listen(PORT, (error) => {
  if (!error) console.log("API is listening on port " + PORT);
  else console.log("Error running the API", error);
});
