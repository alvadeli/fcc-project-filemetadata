var express = require('express');
var cors = require('cors');
var multer = require("multer");
var bodyParser = require("body-parser");
require('dotenv').config();

var app = express();
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post("/api/fileanalyse", upload.single('upfile'),(req,res) =>{
  const file = req.file;
  console.log('File received:', file);

  res.json({name: file.originalname, type: file.mimetype, size: file.size});
})


const port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
  //console.log(`Server is running at http://localhost:${listener.address().port}`);
});


