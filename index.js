import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import { connectToDatabase, findAllPosts } from "./databaseHandler.js";

dotenv.config();

const port = process.env.port;
const app = express();

await connectToDatabase();

app.get("/", async (req, res) => {
  if (req.query.post) {
    let responseText = "";
    try {
      //Todo: refactor to read from database instead of file
      responseText = fs.readFileSync(`./${req.query.post}.md`, "utf8");
      res.send(responseText);
    } catch (e) {
      res.status(404).send("Not found");
    }
  } else {
    let allPosts = await findAllPosts();
    console.log("bbbb", allPosts);
    res.send(allPosts);
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
