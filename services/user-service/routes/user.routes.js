const express = require('express');
const { getUsers, updateUser, deleteUser, getUserById, getUserByEmail, getNameUser, getUserId, getRestaurantId, getRoleByEmail, getNameRestaurant} = require('../controllers/user.controller');

const router = express.Router();

//router.get('/', getUsers);
router.put('/update/:id', updateUser);    
router.delete('/:id', deleteUser);
router.get('/getId/:email', getUserId);
router.get('/getRestaurantId/:email', getRestaurantId); // //:localhost:8000/api/users/getRestaurantId/:email
router.get('/name/:email', getNameUser);
router.get('/nameRestaurant/:email', getNameRestaurant);
router.get('/email/:email', getUserByEmail);
router.get('/role/:email', getRoleByEmail); // //:localhost:8000/api/users/role/:email
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the user service!' });
});
//router.get('/:id/name', getNameUserById);
//TO IMPLEMENT
//router.get('/getInfoRestaurantByOwner', getInfoRestaurantByOwner);
//router.get('/getPhotoUser', getPhotoUserById);
//router.put('/updateInfoRestaurant', updateRestaurant);
//router.get('/getReferals', getReferalsById);

module.exports = router;
