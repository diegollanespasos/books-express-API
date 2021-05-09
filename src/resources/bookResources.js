const express = require('express');
const BookResources = express.Router();
const { BookControllers } = require('../controllers');
const { BookValidations } = require('../validations');

BookResources.get('/', BookControllers.getAll);
BookResources.post('/', BookValidations.createBook(), BookControllers.createBook);
//BookResources.put('/', BookValidations.updateBook, BookControllers.updateBook);

module.exports = BookResources;