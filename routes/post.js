const express   = require('express');
const router    = express.Router();
const passport  = require('passport');
const mongoose  = require('mongoose');

const Post = require('../models/Post');
const User = require('../models/User');

router.get('/',(req,res)=>{
    res.send("post");
});


//@route post/add
//@desc create post
//access private
router.post('/add',passport.authenticate('jwt',{ session:false }),(req,res) =>{

    Post.findOne({title:req.body.title}).then(post =>{
        if(post){
            res.status(400).json({error:'post already exists'})
        }
        const newpost = {
            user:req.user.id,
            title:req.body.title,
            topic:req.body.topic,
            p1:req.body.p1,
            p2:req.body.p2,
            p3:req.body.p3,
            p4:req.body.p4,
            p5:req.body.p5,
            c1:req.body.c1,
            c2:req.body.c2,
            c3:req.body.c3,
            c4:req.body.c4,
            c5:req.body.c5,
            link:req.body.link,
            image:req.body.image
        }
        new Post(newpost).save().then(post => res.json(post));
    })
});


//@route post/all
//@desc get all posts
//@access public
router.get('/all',(req,res)=>{
    Post.find()
    .sort({date:-1})
    .then(posts =>{
        if(posts.length > 0){
            res.json(posts);
        }else{
            res.status(400).json({errpr:"no post at the moment"})
        }
    })
    .catch(err => res.status(400).json({error:"no post at the moment"}));
});

//@route post/react
//@desc gets blogs of particular topic 
router.get('/all/react',(req,res)=>{
    Post.find({topic:"react"})
    .sort({date:-1})
    .then(posts =>res.json(posts))
    .catch(err => res.status(400).json({error:"no post at the moment"}));
});


router.get('/:id',(req,res) =>{
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({error: "no post"}))
})


//@route post/like/:id
//@access private
router.post('/like/:id',passport.authenticate('jwt',{ session:false }),(req,res)=>{
    User.findOne({id:req.user.id}).then(user => { 
        Post.findById(req.params.id)
        .then(post =>{
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                return res.status(404).json({error:"user already liked"})
            }
            post.likes.push({user:req.user.id});
            post.save(post).then(post => res.json(post));
        })
        .catch(err =>res.status(404).json({error:"no post found"}))
    })
})


//@route post/unlike/:id
//@access private
router.post('/unlike/:id',passport.authenticate('jwt',{ session:false }),(req,res)=>{
    User.findOne({id:req.user.id})
    .then(user =>{
        Post.findById(req.params.id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0)
            {
                return res.status(404).json({error:"you have not liked it earlier"})
            }
            const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

            post.likes.splice(removeIndex,1);
            post.save(post).then(post => res.json(post));

        })
        .catch(err =>res.status(404).json({error:"no post found"}))
    })
})



module.exports = router;
