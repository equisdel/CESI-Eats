const express = require('express');
const { createUser, getUsers, updateUser, deleteUser, getUserById, createRestaurantIfProductOwner } = require('../controllers/user.controller');

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.put('/:id', updateUser);    
router.delete('/:id', deleteUser);
router.get('/:id', getUserById);
router.post('/:userId/restaurant', createRestaurantIfProductOwner);

module.exports = router;
