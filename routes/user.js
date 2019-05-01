const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = require('../models/User');

//@route /user/
router.get('/',(req,res)=>{
    res.send("user");
})

router.post('/register', (req,res)=>{
    User.findOne({ email: req.body.email })
    .then(user =>{
        if(user){
            res.send(400).json({email:'email already exists'});
        }else{

                const newuser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password    
                });
                bcrypt.genSalt(10,(err,salt) => {
                    bcrypt.hash(newuser.password, salt, (err,hash) => {
                        if(err) throw err;
                        newuser.password = hash;

                        newuser.save().
                        then(user => { res.json(user) })
                        .catch(err =>{console.log(err)})
                    
                    })
                })
        }
    })
});


//@route /user/login
router.post('/login',(req,res) =>{
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email : email })
    .then(user =>{
        if(!user){
            return res.status(404).json({email:"user not found"});
        }

        bcrypt.compare(password,user.password)
        .then(isMatch =>{
            if(isMatch){
                res.json({mssg:'success'});
            }else{
                res.status(400).json({password:'password incorrect'});
            }
        })
    })
})


module.exports = router;