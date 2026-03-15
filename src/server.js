//here i'll create api,listen to it,manage entire app from this file
import express from "express";

//import routes
import movieRoutes from "./routes/movieRoutes.js";



const app = express();


//api routes
app.use(express.json());
app.use("/movies", movieRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//GET post put delete eg of API endpoints
//https://localhost:5001/hello
 
