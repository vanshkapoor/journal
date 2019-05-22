const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Levelschema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    level:{
        type:Number,
        default:0
    }
});


module.exports = level = mongoose.Schema('level',Levelschema);