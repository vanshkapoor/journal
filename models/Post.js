const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postschema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    title:{
        type:String,
    },
    topic:{
        type:String,
    },
    para:{
        type:String
    },
    p1:{
        type:String
    },
    p2:{
        type:String
    },
    p3:{
        type:String
    },
    p4:{
        type:String
    },
    p5:{
        type:String
    },
    c1:{
        type:String
    },
    c2:{
        type:String
    },
    c3:{
        type:String
    },
    c4:{
        type:String,
    },
    c5:{
        type:String,
    },
    likes:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:'users'
            }
        }
    ],
    link:{
        type:String,
    },
    image:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }

});

module.exports = Post = mongoose.model('post',postschema);