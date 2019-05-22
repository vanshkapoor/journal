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
        default:"general"
    },
    // opening para
    para:{
        type:String
    },
    // rest paras
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

    // rest codes

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
    },
    
    // time required to read
    time:{
        type:String,
        required:true
    }

});

module.exports = Post = mongoose.model('post',postschema);