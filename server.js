// const  express = require("express");
// const app = express();
// const multer = require("multer");
// const cors = require("cors");

// // app.use(express.json());
// // app.use(express.urlencoded());
// app.use(cors());

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// let upload = multer({ storage: storage }).single("file");

// app.post("/", function (req, res) {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err);
//     } else if (err) {
//       return res.status(500).json(err);
//     }
//     return res.status(200).send(req.file);
//   });
// });
// // app.post('/',(req,res)=>{
// //     const file = req.body;
// //     console.log(file)
// // })

const fs = require("fs");
const multer = require("multer");
const express = require("express");
const cors = require("cors");



let MongoClient = require("mongodb").MongoClient;
let url =
  "mongodb+srv://ameerkhan:7208270296@cluster0.vvkuk.mongodb.net/Excel_files";

const excelToJson = require("convert-excel-to-json");

const app = express();

app.use(cors());

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// let upload = multer({ storage: storage }).single("file");

// app.post("/", function (req, res) {
//    importExcelData2MongoDB( "public" + req.file.filename);
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err);
//     } else if (err) {
//       return res.status(500).json(err);
//     }
//     return res.status(200).send(req.file);
//   });
// });

global.__basedir = __dirname;

// -> Multer Upload Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "public");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// -> Express Upload RestAPIs
app.post('/', upload.single("file"), (req, res) =>{
    importExcelData2MongoDB(__basedir + 'public' + req.file.filename);
    res.json({
        'msg': 'File uploaded/import successfully!', 'file': req.file
    });
});

// -> Import Excel File to MongoDB database
function importExcelData2MongoDB(public) {
  // -> Read Excel File to Json Data
  const excelData = excelToJson({
    sourceFile: public,
    sheets: [
      {
        // Excel Sheet Name
        name: "CandidateInfo",

        // Header Row -> be skipped and will not be present at our result object.
        header: {
          rows: 1,
        },

        // Mapping columns to keys
        columnToKey: {
          A: "Name of candidates",
          B: "Email",
          C: "Mobile No",
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

  // -> Log Excel Data to Console
  console.log(excelData);

  // Insert Json-Object to MongoDB
  MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    let dbo = db.db("gkzdb");
    dbo.collection("candidate_info").insertMany(excelData.CandidateInfo, (err, res) => {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      /**
                Number of documents inserted: 5
            */
      db.close();
    });
  });

  fs.unlinkSync(public);
}

// Create a Server
let server = app.listen(8000, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});

// app.listen(8000, function () {
//   console.log("App running on port 8000");
// });