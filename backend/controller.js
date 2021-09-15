const excelToJson = require("convert-excel-to-json");
const CandidateModel = require("./model");
class CandidateController {
  static async processFile(req, res) {
    let filePath = __basedir + "\\public\\" + req.file.filename;
    // -> Read Excel File to Json Data
    const excelData = excelToJson({
      sourceFile: filePath,

      sheets: [
        {
          // Excel Sheet Name
          name: "Sheet1",

          // Header Row -> be skipped and will not be present at our result object.
          header: {
            rows: 1,
          },

          // Mapping columns to keys
          columnToKey: {
            A: "Name of the candidates",
            B: "Email",
            C: "Mobile No.",
            D: "Date of Birth",
            E: "Work Experience",
            F: "Resume Title",
            G: "Current Location",
            H: "Postal Address",
            I: "Current Employer",
            J: "Current Designation",
          },
        },
      ],
    });

    // Insert Json-Object to MongoDB
    if (excelData.Sheet1.length > 0) {
      //  CandidateModel.insertMany(excelData.Sheet1, (err, res) => {});
      excelData.Sheet1.forEach((data) => {
        const candidate = new CandidateModel(data);
        candidate.save().catch((i) => {
          console.log(`WARNING : ${i}`);
        });
      });
    }
    res.json({
      msg: "File Uploaded Successfully!",
      file: req.file,
    });
  }
}

module.exports = CandidateController;
