const users = require("../models/user");

async function handleGetAllUsers(req, res) {
  const alldbuser = await users.find({});
  return res.json(alldbuser);
}

async function handleGetUserByID(req, res) {
  const user = await users.findById(req.params.id);
  return res.json(user);
}

async function handleUpdateUseByID(req, res) {
  const body = req.body;
  await users.findByIdAndUpdate(req.params.id, { lastName: body });
  return res.json({ status: "Success" });
}

async function handleDeleteUserByID(req, res) {
  await users.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success" });
}

async function handleCreateNewUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.gender ||
    !body.country
  ) {
    return res
      .status(400)
      .json({ status: "Error", message: "Invalid request" });
  }
  const results = await users.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    country: body.country,
  });
  return res
    .status(201)
    .json({ status: "Success", id: results._id, message: "User created" });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserByID,
  handleUpdateUseByID,
  handleDeleteUserByID,
  handleCreateNewUser,
};
