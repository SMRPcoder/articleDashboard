import express, { json } from "express";
import { Express } from "express-serve-static-core";
import ArticleRoutes from "./routes/ArticleRouter";
import connection from "./database/connection";
import cors from "cors";

const app:Express=express();
const PORT=3001;

app.use(cors());
app.use(json());
connection();


app.use("/api/article",ArticleRoutes);



app.listen(PORT,()=>{
    console.log("Hosting A server on Port: ",PORT);
});