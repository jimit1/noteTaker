const express = require("express");
const router = express.Router();
const fs = require("fs");
const { isArray } = require("util");

router.get("/api", (req, res) => {
  res.json({ msg: "success" });
});

router.get("/api/all", (req, res) => {
  let data = fs.readFileSync("data.json", "utf8");
  data = JSON.parse(data);
  res.json(data);
});

router.post(`/api/new`, (req, res) => {
  let { name, type, moves } = req.body;
  let file = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  let id = file.pokemon.length + 1;

  for (let i = 0; i < file.pokemon.length; i++) {
    if (req.body.name === file.pokemon.name) {
      return res.json({ msg: "pokemon already exists" });
    }
  }

  if (typeof name === "string" && typeof type === "string" && isArray(moves)) {
    file.pokemon.push({ name, id, type, moves });
    fs.writeFileSync("data.json", JSON.stringify(file, null, 2));
    res.json({ msg: "success" });
  } else {
    res.json({ msg: "incorrect format" });
  }
});

module.exports = router;
