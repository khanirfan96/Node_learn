const express = require("express");
const mongoose = require("mongoose");
const fs = require('fs');
const { timeStamp } = require("console");
// const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

//Connection
mongoose.connect("mongodb+srv://irfankik141:Ed0jG3I8S2nw8Nlc@cluster0.wj6xtgc.mongodb.net/first_learn")
    .then(() => console.log("Mongo Connected"))
    .catch((err) => console.log("Mongo Err", err));


// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    country: {
        type: String,
    }
},
    { timestamps: true })

const users = mongoose.model("user", userSchema);


// Middleware 
app.use(express.urlencoded({ extended: false }));

//REST API
app.get('/api/users', async (req, res) => {
    const alldbuser = await users.find({})
    return res.json(alldbuser);
});

app.route('/api/users/:id')
    .get(async(req, res) => {
        // const id = Number(req.params.id);
        // const user = users.find(user => user.id === id);
        const user = await users.findById(req.params.id);
        return (res.json(user));
    })
    .patch(async(req, res) => {
        // Edit the user with id
        // const body = req.body;
        // const id = Number(req.params.id);
        // const userIndex = users.findIndex(user => user.id === id);

        // if (userIndex !== -1) {
        //     users[userIndex] = { ...users[userIndex], ...body };
        //     console.log(users[userIndex]);
        //     fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        //         if (err) {
        //             return res.status(500).json({ status: "Error", message: "Failed to update user data" });
        //         }
        //         return res.json({ status: "Success", id: id });
        //     });
        // } else {
        //     return res.status(404).json({ status: "Error", message: "User not found" });
        // }

        await users.findByIdAndUpdate(req.params.id, {lastName: 'Changed'});
        return res.json({ status: "Success" });  
    })
    .delete(async (req, res) => {
        // Delete the user with id
        await users.findByIdAndDelete(req.params.id);
        return res.json({ status: "Success" });  
    });

app.post('/api/users', async (req, res) => {
    //TODO: Create new user
    const body = req.body;
    if (!body || !body.firstName || !body.lastName || !body.email || !body.gender || !body.country) {
        return res.status(400).json({ status: "Error", message: "Invalid request" })
    }
    await users.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        country: body.country,

    });
    return res.status(201).json({ status: "Success", message: "User created" });
});

// in dono ko group me krke ek sath upar kr diye kyoki url('/api/users:id') same hai

// app.patch('/api/users:id', (req,res) => {
//     //TODO: Edit the user with id
//     return res.json({status: "pending"});
// })

// app.delete('/api/users:id', (req,res) => {
//     //TODO: Delete the user with id
//     return res.json({status: "pending"});
// })



app.listen(PORT, () => console.log(`PORT Started at PORT: ${PORT}`));