//external dependies
const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();

//upload path in upload folder
const uploadsPath = path.join(__dirname, '/');

//multer functions to store files
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, uploadsPath);
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname);
    }
});
//file reading function provide file in data.csv
const uploadFile = multer({storage: storage}).single('data.csv');


//post routes to upload the file parameter name in data.csv
//router type = post
//parameter { data.csv(file):"upload file"}
//hit 127.0.0.1:3000/post

app.post("/file", (req, res) => {
    uploadFile(req, res, function (err) {
        if (err) {
            return res.send({success:false,msg:"Error in uploading the file"});
        }
        return res.send({success:true,msg:"File is uploaded"});
    });
});



app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});