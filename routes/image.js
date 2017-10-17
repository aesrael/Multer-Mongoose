var express = require('express');
var router = express.Router();
var multer=require('multer');
var Image =require('../models/image');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//Upload image
router.post('/', upload.any(), function (req, res, next) {
  
      res.send(req.files);
  

      var newImage=new Image({
          path:req.files[0].path,
          originalname:req.files[0].originalname
  
      })
      Image.addImage(newImage, function (err) {
              if (err){throw err}
      });
  
  });

  // To get all the images/files stored in MongoDB
router.get('/images', function (req, res) {

  Image.getImages(function (err,images) {
      if (err) {
          throw err;
      }
      res.json(images);

  });
});

router.get('/images/:id', function (req, res) {

  Image.getImageById(req.params.id, function (err, image) {
      if (err) {
          throw err;
      }
      //res.download(genres.path);
      res.send(image.path)
  });
});
  
module.exports = router;
