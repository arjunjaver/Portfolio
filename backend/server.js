const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  date: { 
    type: Date, 
    default: () => {
      let istDate = new Date();
      istDate.setHours(istDate.getHours() + 5);
      istDate.setMinutes(istDate.getMinutes() + 30);
      return istDate;
    } 
  }
});

const Contact = mongoose.model("Contact", contactSchema);

// API Route to handle form submission
app.post("/api/contact", async (req, res) => {
  try {
    const { fullName, email, mobile, subject, message } = req.body;
    const newContact = new Contact({ fullName, email, mobile, subject, message });
    await newContact.save();
    res.json({ message: "Message submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


app.delete("/api/contact/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/api/contacts", async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.json({ message: "All contacts deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
