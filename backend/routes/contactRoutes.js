const express = require("express");
const router = express.Router();
const Contact = require("./models/contact");

// GET all
router.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

// ADD
router.post("/", async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json(contact);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

module.exports = router;