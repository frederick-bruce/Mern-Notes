import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_CONNECTION_STRING || ""
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
}
