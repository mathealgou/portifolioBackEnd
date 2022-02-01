import dotenv from "dotenv";
import Mongoose from "mongoose";

dotenv.config();

const connectionString = process.env.connectionString;

//Mongoose needs a schema in order to create a model
//It also needs a model in order to make queries
const postSchema = new Mongoose.Schema({
  name: String,
  content: String,
});

export async function connectToDatabase() {
  await Mongoose.connect(connectionString)
    .then(() => {
      console.log("Connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function findAllPosts() {
  let post = Mongoose.model("post", postSchema);

  let response = await post
    .find((err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log(response);
      }
    })
    .clone();

  return response;
}

export async function findOnePost(title) {
  let post = Mongoose.model("post", postSchema);
  let response = await post
    .findOne({ name: title }, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log(response);
      }
    })
    .clone()
    .exec();
  return response;
}
