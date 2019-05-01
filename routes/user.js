const express = require('express');
const router = express.Router();

//@route /user/
router.get('/',(req,res)=>{
    res.send("user");
})



module.exports = router;