import express from "express"
import createUser from "../controllers/auth/createUser.js"
import loginController from '../controllers/auth/loginController.js'
import logoutController from '../controllers/auth/logoutController.js'

const router = express.Router()

router.post('/', createUser)
router.post('/login', loginController)
router.delete('/logout', logoutController)


export default router