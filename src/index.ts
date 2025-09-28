import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import express from "express";
import connectDB from "./config/db";
import apiRouter from "./routes/index";


dotenv.config({
    path: path.resolve(__dirname, '../.env')
});

const app = express();


app.use(cors());
app.use(express.json());
app.use("/api" , apiRouter);



const port = process.env.PORT || 3000;
app.listen(port , async () => {
    await connectDB();
    console.log("app is listening on port " , port);
})