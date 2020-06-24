const express = require("express");
const router = express.Router();
const fs = require("fs");
const { isArray } = require("util");
const { stringify } = require("querystring");

router.get("/api", (req, res) => {
  res.json({ msg: "success" });
});

//Get all notes
router.get("/api/notes", (req, res) => {
  let data = fs.readFileSync("./db/db.json", "utf8");
  data = JSON.parse(data);
  res.json(data);
});

//Post a new note
router.post("/api/notes", (req, res) => {
  let data = fs.readFileSync("./db/db.json", "utf8");
  data = JSON.parse(data);
  let newText = req.body;
  newText.id = data.length + 1;
  data.push(newText);
  fs.writeFileSync("./db/db.json", JSON.stringify(data, null, 2));
  res.json({ msg: "Successfully added the todo" });
});

router.delete("/api/notes/:id", (req, res) => {
  let data = fs.readFileSync("./db/db.json", "utf8");
  data = JSON.parse(data);
  let id = req.params.id;
  data.splice(id, 1);
  fs.writeFileSync("./db/db.json", JSON.stringify(data, null, 2));
  res.json({ msg: "Successfully deleted the todo" });
});

module.exports = router;
