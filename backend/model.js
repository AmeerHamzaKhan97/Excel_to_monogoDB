const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(
    process.env.mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch(console.log);

const candidateSchema = new mongoose.Schema({
  "Name of the candidates": { type: String, required: true },
  Email: { type: String, required: true, unique: true, dropDups: true },
  "Mobile No.": Number,
  "Date of Birth": Date,
  "Work Experience": String,
  "Resume Title": String,
  "Current Location": String,
  "Postal Address": String,
  "Current Employer": String,
  "Current Designation": String,
});

const CandidateModel = new mongoose.model("Candidate", candidateSchema);

module.exports = CandidateModel;
