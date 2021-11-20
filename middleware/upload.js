const multer = require("multer");
const {v4 : uuidv4 } =  require('uuid');
const path = require("path");


const Storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, '/resource/images');
    },
    
    filename :function(req,file,cb){
        cb(null,  uuidv4() + "-"+ Date.now()+ path.extname(file.originalname));
    }
});

const Filefilter =  (req,file,cb)=>{
    const fileType = [ 'image/png' , 'image/jpeg',  'image/jpg'];
    if(fileType.includes(file.mimetype)){
        cb(null,true);
    }
    else{
        cb("please upload image in PDf JPEG or JPG Format",false);
    }
}

var upload = multer({storage :Storage , fileFilter: Filefilter});
module.exports = upload;