const express = require('express');
const { getUsers, updateUser, deleteUser, getUserById, getNameUserById} = require('../controllers/user.controller');

const router = express.Router();

router.get('/', getUsers);
router.put('/updateInfoUser', updateUser);    
router.delete('/deleteUser', deleteUser);
router.get('/getInfoUser', getUserById);
router.get('/getNameUser', getNameUserById);
//TO IMPLEMENT
//router.get('/getInfoRestaurantByOwner', getInfoRestaurantByOwner);
//router.get('/getPhotoUser', getPhotoUserById);
//router.get('/updateInfoRestaurant', updateRestaurant);
//router.get('/getReferals', getReferalsById);

module.exports = router;
