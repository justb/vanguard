var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define User schema 
var _order = new Schema({ 
    baseinfo:Object,
    ui:Object,
    frontend:Object,
    backend:Object,
    createtime:Date,
});
// export them 
exports.order = mongoose.model('order', _order,'orders');