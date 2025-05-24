const express = require("express");
const app = express();
const fs = require("fs-extra");
const port = process.env.port || 8080;
const usersListDirectory = `${__dirname}/users.json`;

const server = app.listen(port, () => {
  console.log("App running at http://localhost:" + port);
});

// get the whole users' list
app.get("/", (req, res) => {
  fs.readFile(usersListDirectory, "utf-8", (err, data) => {
    res.end(data);
  });
});

// get a specific user's details
app.get("/:id", (req, res, next) => {
  fs.readFile(usersListDirectory, "utf-8", (err, data) => {
    try {
      const users = JSON.parse(data);
      const userIndex = `user${req.params.id}`;
      if (!(userIndex in users)) {
        throw new Error("User doesn't exist", 404);
      }
      const user = users[userIndex];
      res.end(JSON.stringify(user));
    } catch (error) {
      next(error.message);
    }
  });
});
