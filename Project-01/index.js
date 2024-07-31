const express = require("express");
const user_router = require("./routes/user");
const { connectMongoDB } = require("./config");

const app = express();
const PORT = 8000;

// Connection
connectMongoDB(
  "mongodb+srv://irfankik141:Ed0jG3I8S2nw8Nlc@cluster0.wj6xtgc.mongodb.net/first_learn"
).then(() => {
    console.log("MongoDB Connected!")
});

// Middleware
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", user_router);

app.listen(PORT, () => console.log(`PORT Started at PORT: ${PORT}`));
