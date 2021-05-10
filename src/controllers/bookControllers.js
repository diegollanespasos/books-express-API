const Book = require('../models/Book');
const { validationResult } = require('express-validator');

const getAll = async (req, res) => {
    try {
        const books = await Book.find();

        return res.status(200).json({
            message: 'Retreived the user',
            data: books
        })

    } catch(e) {
        return res.status(404).send('Users nt found')
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
        const book = await Book.findById(guid);

        if(!book){
            return res.status(404).send({
                message: 'Book not found'
            })
        }

        await book.remove();
        return res.status(200).send({
            message: 'Book deleted',
            GUID: book._id
        })

    } catch(e) {
        console.log(e.message);
        return res.status(500).send({
            message: 'Server Error'
        })
    }
}

module.exports = {
    getAll,
    createBook,
    updateBook,
    deleteBook
}