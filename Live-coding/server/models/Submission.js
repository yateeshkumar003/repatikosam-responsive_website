const mongoose = require('mongoose');
const SubSchema = new mongoose.Schema({
  code: String, language: String,
  time: String, result: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Submission', SubSchema);
