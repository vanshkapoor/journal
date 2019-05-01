var express    = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var database = require("./config/keys").mongoURI;
const user = require('./routes/user');
const passport = require('passport');

var app        = express();

//api routes



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect(database,{ useNewUrlParser: true },(err)=>
    {
    if(err){
        console.log(err)
    }else{
        console.log("connected to db");
    }
    });

app.use(passport.initialize());
//passport 
require('./config/passport')(passport);




app.get('/',(req,res)=>{
res.send("check !!");
});

app.use("/user", user);






const port = process.env.PORT||5000;
app.listen(port , (err) =>{
    if(err){
        console.log(err);
    }else{
        console.log(`server is running on PORT ${port} `);
    }
})