const express = require(`express`);
const router = express.Router();
let books = require(`../../public/js/books.json`);

//get books
router.get('/', (req, res) =>  res.render('index', {books}));

//get single book
router.get('/:isbn', (req, res) => {
    const found = books.some(book => book.isbn === req.params.isbn);
    if(found)
        res.json(books.filter(book => book.isbn === req.params.isbn));
    else
        res.status(400).json({msg: "book not found"});
    
});

//get available books
router.get('/available/true', (req, res) => {
        res.render('index', {books: books.filter(book => book.available === true)});
});

//create book
router.post('/', (req, res) => {
    const newBook = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        author: req.body.author,
        publisher: req.body.publisher,
        available: true
    };

    if(!newBook.title || !newBook.author)
        return res.status(400).json({msg: 'no name'});
    books.push(newBook);
    res.redirect('/');

});

//update book

router.put('/:isbn', (req, res) => {
    const found = books.some(book => book.isbn === req.params.isbn);
    if(found){
        const updBook = req.body;
        books.forEach(book => {
            if(book.isbn === req.params.isbn){
                book.title = updBook.title ? updBook.title : book.title;
                book.author = updBook.author ? updBook.author : book.author;
                book.published = updBook.published ? updBook.published : book.published;
                res.json({msg: 'book was updated', book: book});
            }
        });
    }
    else
        res.status(400).json({msg: "book not found"});
    
});

router.get("/card.html", (req, res) => {
    res.render("card");
});

//delete book 
router.delete('/:isbn', (req, res) => {
    const found = books.some(book => book.isbn === req.params.isbn);
    
    if(found){
        books = books.filter(book => book.isbn !== req.params.isbn);
        res.render('index', {books});
    }
    else
        res.status(400).json({msg: "book not found"});
    
});

module.exports = router;