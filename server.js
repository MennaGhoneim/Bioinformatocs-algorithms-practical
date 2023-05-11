const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

//connect to local DB
mongoose.connect("mongodb://0.0.0.0:27017/E_learning")

app.listen(3000, function () {
    console.log('server now is opened')
})

//Add new collections
//Student schema
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    phone: String
});
let studentModel = mongoose.model("student", studentSchema);

//Level schema
const levelSchema = new mongoose.Schema({
    level: String
});
let levelModel = mongoose.model("level", levelSchema);

//Material schema
const matrialSchema = new mongoose.Schema({
    material: String,
    degree : String
});
let materialModel = mongoose.model("matrial", matrialSchema);



//Students collection

//endpoint fetch all STUDENTS from database
app.get('/E_learning/student', async (req, res) => {
    let allStudents = await studentModel.find();
    res.status(200);
    res.json(allStudents);
    console.log(allStudents.length)
})

//add new STUDENT by user
app.put('/E_learning/student', (req, res) => {
    let newUser = new studentModel({
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone
    }).save();
    res.status(200).json(newUser);
})

//update new STUDENT by user
app.put('/E_learning/student/:_id', async (req, res) => {
    await studentModel.findByIdAndUpdate({ _id: req.params._id }, {
        $set: {
            name: req.body.name,
            age: req.body.age,
            phone: req.body.phone
        }
    }, { new: true })
    res.status(201).send("Updated Successfully")
})



//Level collection

//endpoint fetch all LEVELS from database
app.get('/E_learning/level', async (req, res) => {
    let allLevels = await levelModel.find();
    res.status(200);
    res.json(allLevels);
    console.log(allLevels.length)
})

//add new LEVEL by user
app.put('/E_learning/level', (req, res) => {
    let newLevel = new levelModel({
        level: req.body.level
    }).save();
    res.status(200).json(newLevel);
})

//update new LEVEL by user
app.put('/E_learning/level/:_id', async (req, res) => {
    await levelModel.findByIdAndUpdate({ _id: req.params._id }, {
        $set: {
            level: req.body.level
        }
    }, { new: true })
    res.status(201).send("Updated Successfully")
})




//MATERIAL collection

//endpoint fetch all MATERIALS from database
app.get('/E_learning/material', async (req, res) => {
    let allMaterials = await materialModel.find();
    res.status(200);
    res.json(allMaterials);
    console.log(allMaterials.length)
})

//add new MATERIAL by user
app.put('/E_learning/material', (req, res) => {
    let newMaterial = new materialModel({
        material: req.body.material,
        degree: req.body.degree
    }).save();
    res.status(200).json(newMaterial);
})

//update new MATERIAL by user
app.put('/E_learning/material/:_id', async (req, res) => {
    await materialModel.findByIdAndUpdate({ _id: req.params._id }, {
        $set: {
            material: req.body.material,
            degree: req.body.degree
        }
    }, { new: true })
    res.status(201).send("Updated Successfully")
})

