const express = require('express');
const BookResources = express.Router();
const { BookControllers } = require('../controllers');
const { BookValidations } = require('../validations');

BookResources.get('/', BookControllers.getByParams);
BookResources.get('/:guid', BookControllers.getByGuid);
BookResources.post('/', BookValidations.createBook(), BookControllers.createBook);
BookResources.put('/:guid', BookValidations.updateBook(), BookControllers.updateBook);
BookResources.delete('/:guid', BookControllers.deleteBook);

module.exports = BookResources;