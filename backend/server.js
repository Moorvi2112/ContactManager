require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// ✅ FIX MODEL NAME (IMPORTANT)
const Contact = require("./models/contact");

// ROOT
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// GET
app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD (THIS IS YOUR ERROR PART)
app.post("/api/contacts", async (req, res) => {
  try {
    console.log("Incoming:", req.body); // debug

    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    });

    await contact.save();

    res.json(contact);
  } catch (err) {
    console.log("POST ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete("/api/contacts/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.put("/api/contacts/:id", async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));