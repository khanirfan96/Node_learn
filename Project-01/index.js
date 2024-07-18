const express = require("express");
const fs = require('fs');
const users = require("./MOCK_DATA.json");
const app = express();


const PORT = 5000;

// Middleware 
app.use(express.urlencoded({extended: false}));

// Routes

// HTML 

// app.get("user", (req, res) => {
//     const html = `
//     <ul>
//     &{users.map((user) => `<li>${user.first_name}</li>`)}
//     </ul>
//     `;
//     res.send(html);
// });


//REST API

app.get('/api/users', (req,res) => {
    return res.json(users);
});

app.route('/api/users/:id')
    .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return (res.json(user));
})
    .patch((req,res) => {
    // Edit the user with id
    const body = req.body;
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);

    if(userIndex !== -1){
        users[userIndex] = {...users[userIndex], ...body};
        console.log(users[userIndex]);
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({status: "Error", message: "Failed to update user data"});
            }
            return res.json({status: "Success", id: id});
        });
    } else {
        return res.status(404).json({status: "Error", message: "User not found"});
    }
})
    .delete((req,res) => {
    // Delete the user with id
    return res.json({status: "pending"});
});

app.post('/api/users', (req,res) => {
    //TODO: Create new user
    const body = req.body;
    console.log(body,'body');
    users.push({...body, id:users.length+1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
        return res.status(201).json({status: "Success", id:users.length});  
    });
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