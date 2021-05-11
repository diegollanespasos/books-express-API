const Book = require('../models/Book');
const { validationResult } = require('express-validator');

const getByGuid = async(req, res) => {
    try {
        const { guid } = req.params;
        const book = await Book.findById(guid);
        res.status(200).send(book);

    } catch(e){
        return res.status(404).send({
            message: 'Book not found'
        })
    }
  };

const getByParams = async (req, res) => {
    try {
        const queries = Object.keys(req.query);

        if(queries.length === 0){
            const allBooks = await Book.find();

            return res.status(200).send({
                books: allBooks
            })
        }

        const { title, author, year, tags } = req.query;
        const allBooks = await Book.find({$or:[{title: title},{author: author}, {year: year},{tags: tags}]});

        if(typeof tags === 'undefined'){
            const filteredBooks = allBooks.filter(book => queries.every(val => String(book[val]) === req.query[val]));        
            return res.status(200).send({
                books: filteredBooks
            })
        } else {
            const queriesWithoutTags = queries.filter(value => value !== 'tags'); 
            const filteredBooks = allBooks.filter(book => queriesWithoutTags.every(val => String(book[val]) === req.query[val])).filter(book => book.tags.includes(tags));        
  
            return res.status(200).send({
                books: filteredBooks
            })
        }

    } catch(e) {
        return res.status(500).send('Server error');
    }
}

const createBook = async(req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { title, author, year } = req.body;
        const isBookDuplicate = await Book.find({ title: title, author: author ,year: year });

        if(isBookDuplicate.length > 0){
            return res.status(409).send({
                message: 'Book already exists in DB'
            })
        }

        const newBook = await Book.create(req.body);
    
        return res.status(201).send({
            GUID: newBook._id,
            message: 'Successfully created book'
        })
    } catch(e){
        return res.status(500).send({
            error: 'Server Error'
        })
    }
}

const updateBook = async(req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { title, author, year, tags } = req.body;
        const { params: { guid } } = req;

        const updatedBook = await Book.findOneAndUpdate({ _id: guid }, { title: title, author: author ,year: year, tags: tags }, {
            new: true,
            useFindAndModify: false
        });
    
        return res.status(200).send({
            message: 'Successfully updated book',
            updatedBook: updatedBook
        })
    } catch(e){
        if(e.name === 'CastError'){
            return res.status(404).send({
                message: 'Book not found',
            })
        }

        return res.status(500).send({
            error: 'Server Error'
        })
    }
}

const deleteBook = async(req, res) => {
    try {
        const { guid } = req.params;
        const deletedBook = await Book.findByIdAndDelete(guid);

        return res.status(200).send({
            message: 'Book deleted',
            GUID: deletedBook._id
        })

    } catch(e) {
        return res.status(404).send({
            message: 'Book not found'
        })
    }
}

module.exports = {
    getByGuid,
    getByParams,
    createBook,
    updateBook,
    deleteBook
}