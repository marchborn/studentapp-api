const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app =new express();
app.use(cors());
app.use(bodyParser.json()); 

let Student = require('./students.model');

mongoose.connect("mongodb+srv://friendofheartxz:vyd03sHRud8biuRP@cluster0.t1xlkf5.mongodb.net/studentdb?retryWrites=true&w=majority&appName=Cluster0");

const connection=mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB connection established successfully");
})



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

app.get("/students", async (req,res)=>{
    console.log("Student request received")
    let data = await Student.find().catch(err =>{
        res.json("Error loading data");
    });
    res.json(data)
    // res.json([{name:"manasa",age:"20",department:"it"},
    // {name:"gowri",age:"25",department:"cse"},
    // {name:"anjal",age:"21",department:"ce"}])
});

app.get("/students/:id" , async (req,res) => {
    let id = req.params.id;
    let data = await Student.findById(id).catch(err => {
        res.json("Error finding student");
    });
    if(!data){
        res.json("Not found");
    }
    else{
        res.json(data);
    }
})

app.post("/students",(req,res)=>{
    console.log(req.body);
    let students = new Student(req.body);
    students.save().then(()=>{
        res.json("Saved successfully");
    }).catch(err=>{
        res.json("Error:" + err);
    });
});

app.delete("/students/:id" , async (req,res) => {
    let id = req.params.id;
    let data = await Student.findByIdAndDelete(id).catch(err => {
        res.json("Data removed successfully");
    });
    if(!data){
        res.json("Failed deleting data");
    }
    else{
        res.json(data);
    }
})

app.listen("4000", ()=>{
    console.log("Started server on 4000");
})