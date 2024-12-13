const express = require("express");
const mongoose = require('mongoose');
const users = require('./MOCK_DATA.json');
const fs = require('fs');
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false })) // check the header content type if it is urlencoded it parse it


//-----------------------// MongoDB Connnection //-------------------------------//
mongoose.connect('mongodb://localhost:27017/youtube-piyush-garg').
  then(() => {
    console.log("DB connected successfully");
  }).catch((err) => {
    console.log(err);
  })



//-----------------------// Schema //-------------------------------//
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String
  },
  job_title: {
    type: String
  }
}, { timestamps: true })

//-----------------------// Model //-------------------------------//
const User = mongoose.model('User', userSchema)


// =================================  Routes  ================================= //
app.get("/users", async (req, res) => {
  try {
    console.log("New Request");

    // Fetch all users from the database
    const allDataDB = await User.find({});

    // Generate HTML list dynamically
    const htmlList = allDataDB.map((user) => `<li>${user.first_name}</li>`).join("");

    // Send the HTML response
    res.send(htmlList);

  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Internal Server Error");
  }
});



// // middleware 
// app.use((req, res, next) => {
//   console.log("middleware 1");
//   next();

// })
// app.use((req, res, next) => {
//   console.log("middleware 2");
//   next();

// });



// ----------------------// Rest APIs // -----------------------------

// it will show json  of all users
app.get("/api/users", async (req, res) => {
  console.log("New Request");

  const allDataDB = await User.find({})
  res.setHeader("X-MyName", "Salman"); // custom header
  res.setHeader("X-newHeader", "another Headder") // custom header 

  return res.json(allDataDB)
});


// it will show json with dynamic id
app.get("/api/users/:id", async (req, res) => {
  // const id = Number(req.params.id);

  // const user = users.find((user) => user.id === id);
  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  return res.send(user)
});


// POST REQUEST to submit new data
app.post("/api/users", async (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body.email || !body.first_name || !body.last_name || !body.gender || !body.job_title) {
    return res.status(400).json({ msg: 'email is required' })
  }

  const newUser = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title
  })
  console.log(newUser)
  res.status(201).json({ msg: "success" })
  // users.push({ ...body, id: users.length + 1 })
  // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
  //   console.log(err);

  //   return res.status(201).json({ status: 'Success', id: users.length })
  // })

});


// DELETE REQUEST to DELETE data
app.delete("/api/users/:id",async (req, res) => {
  // const userId = parseInt(req.params.id); // Get 'id' from URL parameter
  // console.log("Delete request for ID:", userId);

  // // Find the index of the user with the given ID
  // const userIndex = users.findIndex(user => user.id === userId);


 const user= await User.findByIdAndDelete(req.params.id)

  if (!user) {
    // If user not found, return an error response
    return res.status(404).json({ status: "Error", message: "User not found" });
  }

  // Remove the user from the array AT SPECIFIC POSITION
  // users.splice(userIndex, 1);

  // Write the updated array back to the file
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
  //   if (err) {
  //     console.error("Error writing file:", err);
  //     return res.status(500).json({ status: "Error", message: "Failed to save changes" });
  //   }
  //   console.log("User deleted successfully.");
  // });

  // Return a success response
  return res.json({ status: "Success", message: "User deleted successfully" });
});

// update specific user 
app.patch("/api/users/:id", async (req, res) => {

  const updatedUser = await User.findByIdAndUpdate(req.params.id, {
    first_name: 'aliiiiiii',
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
    job_title: req.body.job_title
  })
  console.log(updatedUser);

  // Return a success response
  return res.json({ status: "Success", message: "User Updated successfully" });
});

// PUT REQUEST to update data
app.put("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id); // Get 'id' from URL parameter
  const updatedData = req.body; // Get the updated data from the request body
  console.log("Update request for ID:", userId, updatedData);

  // Find the user by ID
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    // If user not found, return an error response
    return res.status(404).json({ status: "Error", message: "User not found" });
  }

  // Update the user's data
  users[userIndex] = { ...users[userIndex], ...updatedData };

  // Write the updated data back to the file
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return res.status(500).json({ status: "Error", message: "Failed to save changes" });
    }
    console.log("User updated successfully.");
  });

  // Return a success response
  return res.json({ status: "Success", message: "User updated successfully", data: users[userIndex] });
});










app.listen(8000, () => {
  console.log("Server started");

})