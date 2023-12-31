import express from 'express'
import morgan from 'morgan'
import cors from "cors";
import "dotenv/config";
import connectToDb from './Connection/config.js';
import userRouter from "./Routes/userRouer.js";
import path from 'path'


const app=express()
const PORT = process.env.PORT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, "dist")));

/*student route*/
app.use("/user", userRouter);
/*instructor route*/

connectToDb();

app.listen(PORT,()=>{
    console.log("Server started");
})





