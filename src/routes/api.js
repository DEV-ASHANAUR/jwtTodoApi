const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthController');
const UserController = require('../controller/UserController');
const VerifyTokenMiddleware = require('../middleware/VerifyTokenMiddleware');
const upload = require('../utilites/multer');
const TodoController = require('../controller/TodoController');

//Auth Routes
router.post('/register',AuthController.register);
router.post('/login',AuthController.login);

//profile
router.put('/update-profile',VerifyTokenMiddleware.CheckUserAuth,upload.single('avater'),UserController.UpdateProfile);

//todo
router.get('/todos',VerifyTokenMiddleware.CheckUserAuth,TodoController.getTodo);
router.get('/todos/:id',VerifyTokenMiddleware.CheckUserAuth,TodoController.getById);
router.post('/todos',VerifyTokenMiddleware.CheckUserAuth,TodoController.create);
router.put('/todos/:id',VerifyTokenMiddleware.CheckUserAuth,TodoController.update);
router.delete('/todos/:id',VerifyTokenMiddleware.CheckUserAuth,TodoController.delete);


//exports router
module.exports = router;