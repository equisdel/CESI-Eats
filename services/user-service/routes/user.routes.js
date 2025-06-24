const express = require('express');
const { getUsers, updateUser, deleteUser, getUser, getNameUser, getRole, getNameRestaurant} = require('../controllers/user.controller');

const router = express.Router();

//router.get('/', getUsers);
router.put('/update/:user_id', updateUser);    
router.delete('/:user_id', deleteUser);
router.get('/name/:user_id', getNameUser);
router.get('/nameRestaurant/:restaurant_id', getNameRestaurant);
router.get('/user/:user_id', getUser);
router.get('/role/:user_id', getRole); // //:localhost:8000/api/users/role/:email
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the user service!' });
});
//TO IMPLEMENT
//router.get('/getInfoRestaurantByOwner', getInfoRestaurantByOwner);
//router.get('/getPhotoUser', getPhotoUserById);
//router.put('/updateInfoRestaurant', updateRestaurant);
//router.get('/getReferals', getReferalsById);

module.exports = router;