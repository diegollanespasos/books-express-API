const { check } = require('express-validator');

const createBook = () => { 
    return [ 
    check('title').exists().withMessage('Title required')
    .bail().isString().withMessage('Title must be a string'),

    check('author').exists().withMessage('Author required')
    .bail().isString().withMessage('Author must be a string'),

    check('year').exists().withMessage('Year required')
    .bail().isNumeric().withMessage('Year must be a number')
    .bail().custom((value) => value > 1454 && value <= new Date().getFullYear()).withMessage('Invalid year'),

    check('tags').exists().withMessage('Tags required')
    .bail().isArray().withMessage('Tags must be an array')
    .bail().custom((arr) => arr.length > 0).withMessage('Tags array must have at least one element')
    .bail().custom((arr) => arr.every(item => typeof item === 'string')).withMessage('Tags must be an array of strings')
    ]
}

//In this case the validations are equal but I built two differentes functions if I need to validate differents properties in the future
const updateBook = () => { 
    return [ 
    check('title').exists().withMessage('Title required')
    .bail().isString().withMessage('Title must be a string'),

    check('author').exists().withMessage('Author required')
    .bail().isString().withMessage('Author must be a string'),

    check('year').exists().withMessage('Year required')
    .bail().isNumeric().withMessage('Year must be a number')
    .bail().custom((value) => value > 1454 && value <= new Date().getFullYear()).withMessage('Invalid year'),

    check('tags').exists().withMessage('Tags required')
    .bail().isArray().withMessage('Tags must be an array')
    .bail().custom((arr) => arr.length > 0).withMessage('Tags array must have at least one element')
    .bail().custom((arr) => arr.every(item => typeof item === 'string')).withMessage('Tags must be an array of strings')
    ]
} 

module.exports = {
    createBook,
    updateBook
}