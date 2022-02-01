import express from "express";
import dotenv from "dotenv";
import {
  connectToDatabase,
  findAllPosts,
  findOnePost,
} from "./databaseHandler.js";

dotenv.config();

const port = process.env.port;
const app = express();

await connectToDatabase();

app.get("/", async (req, res) => {
  //In case there's a query string, we'll use that as the title
  //to search for a post.
  if (req.query.post) {
    try {
      let response = await findOnePost(req.query.post);
      res.status(200).send(response);
    } catch (e) {
      res.status(404).send("Not found");
    }
  }
  //Otherwise, we'll just send all the posts.
  else {
    try {
      let allPosts = await findAllPosts();
      res.send(allPosts);
    } catch (e) {
      res.status(404).send("Not found");
    }
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
