import mongoose from "mongoose";

const connection=()=>mongoose.connect("mongodb://localhost:27017",{
    dbName:"dashboard",
}).then(()=>{
    console.log("connection established successfully");
}).catch((err)=>{
    console.log(err);
});




export default connection;
