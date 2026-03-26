//here i'll create api,listen to it,manage entire app from this file
import express from "express";
import { config } from "dotenv";
import {connectDB,disconnectDB} from "./config/db.js";
//import routes
import movieRoutes from "./routes/movieRoutes.js";

import authRoutes from "./routes/authRoutes.js";
config();
connectDB();


const app = express();
//body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//api routes
//app.use(express.json());

app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//handle unhandled promise rejections e.g db conn errors
process.once("unhandledRejection",(err)=>{
  console.error("Unhandled Rejection:",err);
  app.close(async ()=>{
    await disconnectDB();
    process.exit(1);
  });
});

//handle uncaught exceptions e.g syntax errors
process.on("uncaughtException",async (err)=>{
  console.error("Uncaught Exception:",err);
  await disconnectDB();
  process.exit(1);
});

//graceful shutdown on SIGINT and SIGTERM signals
process.on("SIGTERM",async ()=>{
  console.log("SIGTERM received, shutting down gracefully...");
  await disconnectDB();
  process.exit(0);
});



//GET post put delete eg of API endpoints
//https://localhost:5001/hello
 
