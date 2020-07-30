const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ShoppingSchema = new Schema({
     
      
});

var shoppingdata = mongoose.model('shoppingList',ShoppingSchema);
module.exports = shoppingdata;