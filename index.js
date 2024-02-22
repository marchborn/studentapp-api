const express = require('express');
const cors = require('cors');

const app =new express();
app.use(cors());
app.use(express.json()); 


app.get("/",(req,res)=>{
    console.log("request received")
    res.json("Hello World")
});

app.get("/hi",(req,res)=>{
    console.log("Hi,request received")
    res.json("welcome")
});

app.get("/people",(req,res)=>{
    console.log("People request received")
    res.json([{name:"Manasa",role:"Student"},
    {name:"Xyz",role:"Trainer"}])
});

app.get("/students",(req,res)=>{
    console.log("People request received")
    res.json([{name:"manasa",age:"20",department:"it"},
    {name:"",age:"",department:""}])
});

app.post("/students",(req,res)=>{
    res.json([{name:"",age:"",department:""}])
    
    console.log(req.body);
    
})
app.listen("4000", ()=>{
    console.log("Started server on 4000");
})