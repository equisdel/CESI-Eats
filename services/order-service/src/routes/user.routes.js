const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/user.controller'); // ⚠️

router.post('/', createUser); // << ici l'erreur arrive si createUser n'est pas une fonction

module.exports = router;
