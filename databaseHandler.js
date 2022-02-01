import dotenv from "dotenv";
import Mongoose from "mongoose";

dotenv.config();

const connectionString = process.env.connectionString;
console.log(connectionString);

export async function connectToDatabase() {
  await Mongoose.connect(connectionString)
    .then(() => {
      console.log("Connected");
    })
    .catch((err) => {
      console.log("ERRO \n\n\n\n\n\n\n", err);
    });

  return 0;
}
