import { application } from "express";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected");
    application.listen(port, () => {
      console.log("Server running on port: " + port);
    });
  })
  .catch(console.error);
