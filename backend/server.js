const express = require("express");
const cors = require("cors");
const CandidateController = require("./controller");
const upload = require("./utils");
const PORT = 8000;

const app = express();

app.use(cors());

// -> Express Upload RestAPIs
app.post("/", upload.single("file"), CandidateController.processFile);

// -> Import Excel File to MongoDB database

// Listen at PORT
app.listen(PORT, function () {
  console.log(`App listening at http://localhost:${PORT}`);
});
