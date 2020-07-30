const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const signupSchema = new Schema({
    fname:String,
    lname :String,
    DOB :String,
    username : String ,
    password : String,
    email: String,
    mob: Number
});
var signupData= mongoose.model('signupData',signupSchema);
module.exports = signupData;