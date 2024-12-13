const express = require("express");
const users = require('./MOCK_DATA.json');
const fs = require('fs');
const { json } = require("stream/consumers");
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }))

// Routes 
// it will rendor an html 
app.get("/users", (req, res) => {
    console.log("New Request");
    const htmlfile = `${users.map((user) => { `<li>${user.first_name}\n </li>` })}`
    res.send(htmlfile);
})



// middleware 
app.use((req,res,next)=>{
    console.log("middleware 1");
    next();
    
})
app.use((req,res,next)=>{
    console.log("middleware 2");
    next();
    
});
// ----------------------// Rest APIs // -----------------------------

// it will show json  of all users
app.get("/api/users", (req, res) => {
    console.log("New Request");
    return res.json(users)
});


// it will show json with dynamic id
app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.send(user)
});


// POST REQUEST to submit new data
app.post("/api/users", (req, res) => {
    const body = req.body;
    console.log(body);
    users.push({ ...body, id: users.length + 1 })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        console.log(err);

        return res.json({ status: 'Success',id:users.length })
    })

});


// DELETE REQUEST to DELETE data
app.delete("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id); // Get 'id' from URL parameter
    console.log("Delete request for ID:", userId);
  
    // Find the index of the user with the given ID
    const userIndex = users.findIndex(user => user.id === userId);
  
    if (userIndex === -1) {
      // If user not found, return an error response
      return res.status(404).json({ status: "Error", message: "User not found" });
    }
  
    // Remove the user from the array AT SPECIFIC POSITION
    users.splice(userIndex, 1);
  
    // Write the updated array back to the file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).json({ status: "Error", message: "Failed to save changes" });
      }
      console.log("User deleted successfully.");
    });
  
    // Return a success response
    return res.json({ status: "Success", message: "User deleted successfully" });
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