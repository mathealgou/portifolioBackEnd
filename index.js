import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import { connectToDatabase } from "./databaseHandler.js";

dotenv.config();

const port = process.env.port;
const app = express();

await connectToDatabase();

app.get("/", (req, res) => {
  if (req.query.post) {
    let responseText = "";
    try {
      responseText = fs.readFileSync(`./${req.query.post}.md`, "utf8");
      res.send(responseText);
    } catch (e) {
      res.status(404).send("Not found");
    }
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
