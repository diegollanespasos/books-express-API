const Book = require('../models/Book');

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

// @desc   Add book
// @route  POST /books
const addbook = async(req, res) => {
    try {
        const newBook = await Book.create(req.body);
    
        return res.status(201).json({
            success: true,
            GUID: newBook._id
        })
    } catch(e){
        if(e.name === 'ValidationError'){
            const messages = Object.values(e.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            })
        }

        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

module.exports = {
    getAll,
    addbook
}