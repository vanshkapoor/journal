const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');
const nodemailer = require('nodemailer');
var Transport = require('nodemailer-sendgrid-transport');

var options = {
    auth: {
        api_key: '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'
    }
}

const mailer = nodemailer.createTransport(Transport(options));

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
                        then(user => { 
                            var email = {
                                to: req.body.email,
                                from: 'vanshkapoorvk7@gmail.com',
                                subject: 'successfully signed up to Journal',
                                html: '<h1>Hiii!!  Thankyou for registering to Journal</h1> <p> <br/> ~by <strong>Vansh</strong></p>'
                            };                             
                            mailer.sendMail(email);

                            res.json(user);
                         })
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

                const payload = { id:user.id, name:user.name };
                jwt.sign(payload,'secret',{ expiresIn:5000 },(err,token) =>{
                    res.json({
                        success:true,
                        token:'Bearer ' + token
                    });
                });


                //res.json({mssg:'success'});
            }else{
                res.status(400).json({password:'password incorrect'});
            }
        })
    })
})

//@route /user/current
router.get('/current',passport.authenticate('jwt',{ session:false }),(req,res) => {
        res.json({usr : req.user});
});

//@route /user/all
//access public
//desc lists all users
router.get('/all',(req,res)=>{
    User.find()
    .then(users => {
        if(!users){
            res.status(404).json({error:'no user'});
        }
        res.json(users);
    })
    .catch(err => res.status(400).json({error:'no users found'}));
})


module.exports = router;