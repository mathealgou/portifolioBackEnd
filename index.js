import express from "express";

const port = process.env.PORT || 3000;

// Create a new express application instance
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
