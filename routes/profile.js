const express   = require('express');
const router    = express.Router();
const passport  = require('passport');
const mongoose  = require('mongoose');

const User = require('../models/User');
const Profile = require('../models/Profile');


// router.get('/',(req,res)=>{
//     res.send("profile");
// });


//@route /profile/add
//@access Private
//@desc add a profile
router.post('/add',passport.authenticate('jwt',{session: false}),
    (req,res)=>{

        const profilefields = {
            handle:req.body.handle,
            user:req.user.id,
            quote:req.body.quote,
            about:req.body.about
        }
        if(typeof req.body.skills !== 'undefined')
        {
            profilefields.mastery = req.body.mastery.split(',');
        }

        Profile.findOne({ user:req.user.id })
        .then(profile =>{
            if(profile)
            {
                Profile.findOneAndUpdate(
                    { user: req.user.id } ,
                    { $set: profilefields },
                    {new: true}
                ).then(profile => res.json(profile));
            }else{
                Profile.findOne({handle:profilefields.handle})
                .then(profile => {
                    if(profile){
                        res.status(400).json({error:"handle already exists"});
                    }
                    new Profile(profilefields).save()
                    .then(
                        profile => res.json(profile)
                    )
            }
        )}
    })

})
//get all
router.get('/all',(req,res)=>{
	Profile.find()
	.populate('user',['name','email'])
	.then(profile => {
		if(!profile){
			return res.status(404).json({error:"there is no profile"});;
		}
		res.json(profile);
	})
	.catch(err => res.status(404).json({error:'there are no profiles'}));
});



//get api/profile/handle
router.get('/handle/:handle', (req, res) => {
    const errors = {};
  
    Profile.findOne({ handle: req.params.handle })
      .populate('user', ['name', 'email'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          res.status(404).json(errors);
        }
  
        res.json(profile);  
      })
      .catch(err => res.status(404).json(err));
  });
  
  // @route   GET api/profile/user/:user_id
  // @desc    Get profile by user ID
  // @access  Public
  
  router.get('/user/:user_id', (req, res) => {
    const errors = {};
  
    Profile.findOne({ user: req.params.user_id })
      .populate('user', ['name', 'email'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          res.status(404).json(errors);
        }
  
        res.json(profile);
      })
      .catch(err =>
        res.status(404).json({ profile: 'There is no profile for this user' })
      );
  });


//@route /profile/levelup
// router.post('/levelup',
//     passport.authenticate('jwt',{session: false}),
//     (req,res)=>{
//         const profilefield = {};
//         profilefield.level+=1;
//         Profile.findOne({user:req.user.id}) 
//         .then(profile =>{
//             if(profile){
//                 Profile.findOneAndUpdate({user:req.user.id},
//                 {$set: profilefield},
//                 {new: true}
//                ).then(profile => res.json(profile));
//             }
//         })       
//     }
// )
module.exports = router;
