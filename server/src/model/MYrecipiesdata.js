const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var myRecipiesSchema = new Schema({
     name: String,
     imageUrl:String,
     description:String,
     source:String,
     preparation:String,
     cooking:String,
     serve: String,
     category:String,
     subcategory:String,
     ingredients: [[]],
     steps:[[]],
     calories: String
});
var myRecipiesData = mongoose.model('myrecipies',myRecipiesSchema);
module.exports = myRecipiesData;