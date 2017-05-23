var mongoose = require('mongoose');
var book = require('../../models/module').book;
mongoose.connect('mongodb://localhost/hello');
/*hompage*/





module.exports = function(router) {

	router.get('/', function(req, res) {
        book.find(function(err,doc){
            res.json(doc);
        })
    });

    router.get('/add', function(req, res) {
        var newBook=new book({
            id:parseInt(req.query.id),
            name:req.query.name,
            price:req.query.price,
            date:req.query.date
        });
        newBook.save(function(err,doc){
            if(err){
                res.json(err);
            }else{
                res.json(newBook);
            }
        })
    });
}