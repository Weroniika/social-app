import express from "express";
import * as usersController from "../controllers/users.js"

const router = express.Router();

router.post('/signup', usersController.signUp)
router.post('/signin', usersController.signIn)

export default router;
