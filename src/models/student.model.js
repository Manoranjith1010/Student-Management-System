const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    studentId: { type: String, required: true, unique: true },
    enrolledCourses: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', StudentSchema);
