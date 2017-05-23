var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define User schema 
var _Book = new Schema({ 
    id : Number,
    name : String,
    price : String,
    date : String
});
// export them 
exports.book = mongoose.model('book', _Book,'books');