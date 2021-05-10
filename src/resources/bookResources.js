const express = require('express');
const BookResources = express.Router();
const { BookControllers } = require('../controllers');
const { BookValidations } = require('../validations');

BookResources.get('/', BookControllers.getAll);
//UserResources.get('/:guid', UserControllers.getByGuid);
BookResources.post('/', BookValidations.createBook(), BookControllers.createBook);
BookResources.put('/:guid', BookValidations.updateBook(), BookControllers.updateBook);
BookResources.delete('/:guid', BookControllers.deleteBook);

module.exports = BookResources;