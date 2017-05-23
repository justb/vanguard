var mongoose = require('mongoose');
var book = require('../../models/module').order;
mongoose.connect('mongodb://localhost/hello');





module.exports = function(router) {

	router.get('/', function(req, res) {
        book.find(function(err,doc){
            res.json(doc);
        })
    });

    router.post('/add', function(req, res) {
        var newBook=new book(req.body.order);
        newBook.save(function(err,doc){
            if(err){
                res.json(err);
            }else{
                res.json(newBook);
            }
        })
    });
}