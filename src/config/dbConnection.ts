import mongoose from "mongoose";

const DB_URL: string = process.env.DB_URL!;

if (!DB_URL) {
  console.log("The DB_URL environment variable is missing!");
}

export async function dbConnection() {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected Successfully to DB");
  } catch (error) {
    console.log("There is an error while connecting to DB", error);
  }
}
