const express= require('express');
const router=  express.Router();
const {ensureAuth,ensureGuest} = require('../middleware/auth');

const Story = require('../Model/Story');
const User = require('../Model/User');
const upload = require('../middleware/upload');


//@desc Login/Landing Page
// @route GEt/
router.get('/',ensureGuest,(req,res)=>{
    res.render('login',{
        layout:'login',
    });
})

//@desc  dashboard
// @route GEt/ dashboard
router.get('/dashboard',ensureAuth,async(req,res)=>{
    try{
        const stories = await Story.find({ user: req.user.id }).lean()
        console.log(req.user);
         console.log(req.session);
        res.render('dashboard',{
            user_id : req.user._id,
            image : req.user.image,
        name : req.user.firstName,stories
        });
    }
    catch(err){
        console.log(err);
        res.render('error/500')
    }
    
})




//@desc Show profile edit
// @route GEt/profile/edit/id
router.get('/profile/edit/:_id',async(req,res,err)=>{
    try {
        console.log("profile edit", User);
        console.log("profile edit",req.params._id);
        const user = await User.findOne(
            {_id:req.params._id
            }).lean();
        console.log("get on edit profile by finone",user);
        if(!user){
            res.render('error/404')
        }
        res.render('profile/edit',{user,});
    } catch (error) {
        console.log(error);
        console.log("profile edit1",req.params.id);
        console.log("profile edit2",req.params._id);
        console.log("profile edit3", User);
        console.log("profile edit4",_id);
        res.render('error/500')
    }     
});

//@desc ow profile edit
// @route Post/profile/edit/id
router.post('/profile/edit/:_id',upload.single('photo'),async(req,res,err)=>{
    try {
        console.log("profile edit", User);
        console.log("profile edit",req.params._id);
        const user = await User.findOne(
            {_id:req.params._id
            }).lean();
        console.log("get on edit profile by finone",user);
        if(!user){
            res.render('error/404')
        }
        res.render('profile/edit',{user,});
    } catch (error) {
        console.log(error);
        console.log("profile edit1",req.params.id);
        console.log("profile edit2",req.params._id);
        console.log("profile edit3", User);
        console.log("profile edit4",_id);
        res.render('error/500')
    }     
});

module.exports=router;