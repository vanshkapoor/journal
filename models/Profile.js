const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileschema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    handle:{
        type:String,
        required:true
    },
    quote:{
        type:String
    },
    about:{
        type:String
    },
    level:{
        type:Number,
        default:0,
    },
    mastery:{
        type:[String],
        required:true
    }

});
module.exports = profile = mongoose.model('profile',profileschema);