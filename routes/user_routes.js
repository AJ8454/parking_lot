import express from 'express'

import { userController } from '../controllers/user_controllers.js';

export const router = express.Router()

router.get("/users", userController.getAllUsers);

router.post("/user", userController.createUser);

router.put("/user", userController.updateUser);

router.delete("/user/:id", userController.deleteUser);