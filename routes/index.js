var express = require('express');
var router = express.Router();
const Details = require('../models/details');
const multer  = require('multer');
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, 'uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.filename+"_"+file.originalname);
    }
  });
  var upload = multer({storage:storage}).single("image");

 router.post("/add",upload,(req,res)=>{
 // console.log(req.body);
  const details = new Details ({
      image:req.file.filename,
      name:req.body.name,
      email:req.body.email,
      studies:req.body.studies,
      phone:req.body.phone,
      age:req.body.age,
      address:req.body.address,
      works:req.body.works,
      hobbies:req.body.hobbies

      // image:req.file.filename
  });
      details.save().then((users)=>{
      res.redirect('/home'),
      console.log(users);
  })
});

router.get('/', function(req, res) {
  res.render("index");
});

router.get('/home',async (req,res)=>{
     Details.find().exec((err,users)=>{
        if(err){
            res.json({message:err.message})
        }
        else{
            res.render('home',{users})
        }
    })

})

router.get('/more/:id', (req,res)=>{
    let id = req.params.id;
 Details.findById(id).exec((err,user)=>{
        if(err){
            res.json({message:err.message})
        }
        else{
            res.render('more',{user})
        }
    })

})


router.get('/edit/:id',(req,res)=>{
  let id = req.params.id;
  Details.findById(id).exec((err,user)=>{
      if(err){
          console.log(err);
      }
      else{
          res.render('edit',{user})
      }
  })
})

router.post('/update/:id',upload,(req,res)=>{
  let id = req.params.id;
  let new_image = "";
   if(req.file){
    new_image = req.file.filename;
    try{
      //
      fs.unlinkSync("/../uploads"+req.body.image);
    }
    catch(err){
        console.log(err);
    }
   }
   else{
    //
    new_image = req.body.image;
   }
  Details.findByIdAndUpdate(id,{
  image:new_image,
  name:req.body.name,
  email:req.body.email,
  studies:req.body.studies,
  phone:req.body.phone,
  age:req.body.age,
  address:req.body.address,
  works:req.body.works,
  hobbies:req.body.hobbies
  },(err)=>{
    if(err){
        res.json({message:err.message})
    }
    else{
        console.log("success");
    }
    res.redirect('/home')
})
})

router.get('/delete/:id',(req,res)=>{
  let id = req.params.id;
  Details.findByIdAndRemove(id,(err,result)=>{
      if(err){console.log(err);}
      else{console.log(result);}
      res.redirect("/home");
  });
});


module.exports = router;
