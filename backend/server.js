const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/contactDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const Contact = require("./models/contact");

// GET
app.get("/api/contacts", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

// ADD
app.post("/api/contacts", async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json(contact);
});

// DELETE
app.delete("/api/contacts/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// UPDATE
app.put("/api/contacts/:id", async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

app.listen(5000, () => console.log("Server running on port 5000"));