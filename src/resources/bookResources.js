const express = require('express');
const BookResources = express.Router();
const { BookControllers } = require('../controllers');

BookResources.get('/', BookControllers.getAll);
BookResources.post('/', BookControllers.addbook);

module.exports = BookResources;