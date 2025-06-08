const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: String,
  extension: String,
  fileURL: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("File", fileSchema);
