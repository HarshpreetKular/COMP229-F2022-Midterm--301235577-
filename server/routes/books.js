// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  res.render('books/add', { title: 'Add book' });
})

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/
  let newBoook = Book({
    "name": req.body.name,
    "price": req.body.price,
    "author": req.body.author,
    "genre": req.body.genre
  });
  Book.create(newBoook, (err, Book) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/books');
    }
  })

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/let id = req.params.id;
  Book.findById(id, (err, bookToEdit) => {
    //check for error
    if (err) {
      console.log(err);
      res.end(err);
    }
    //render details page if no error
    else {
      res.redirect('views/books/details', { title: 'Edit Book', book: bookToEdit });
    }
  })
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/
   let id=req.params.id;
   let updatedBook=Book({"id":id,
   "name": req.body.name,
   "price": req.body.price,
   "author": req.body.author,
   "genre": req.body.genre
   });
   Book.updateOne({_id:id}, updatedBook,(err)=>{
       if(err){
           console.log(err);
           res.end(err);
       }
       else{
           res.redirect('/books');
       }
   });
   
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/
   let id=req.params.id;
   Book.remove({_id:id},(err)=>{
       if(err){
           console.log(err);
           res.end(err);
       }
       else{
           res.redirect('/bookList');
       }
   });
});


module.exports = router;
