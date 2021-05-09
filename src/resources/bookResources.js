const express = require('express');
const BookResources = express.Router();
const { BookControllers } = require('../controllers');

BookResources.get('/', BookControllers.getAll);

module.exports = BookResources;