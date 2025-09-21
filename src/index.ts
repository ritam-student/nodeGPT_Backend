
import dotenv from "dotenv";
import path from "path";
import cors from "cors"
import chatRouter from "./routes/chat";
import express from "express";
import connectDB from "./db/connectDB";


dotenv.config({
    path: path.resolve(__dirname, '../.env')
});

const app = express();

app.use(cors())
app.use(express.json())
app.use("/api" , chatRouter)



const port = process.env.PORT || 3000;
app.listen(port , async () => {
    const res = await connectDB();
    console.log("app is listening on port " , port);
})