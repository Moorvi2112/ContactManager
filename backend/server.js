const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// ✅ USE ENV VARIABLE (IMPORTANT FOR RENDER)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const Contact = require("./models/contact");

// ✅ ROOT ROUTE (fix Cannot GET /)
app.get("/", (req, res) => {
  res.send("🚀 Contact Manager Backend Running");
});

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

// ✅ USE RENDER PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));