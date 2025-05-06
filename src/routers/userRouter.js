import express from "express"
import createUser from "../controllers/user/createUser.js"
import deleteUser from "../controllers/user/deleteUser.js"

const router = express.Router()

router.post('/', createUser)
router.delete('/', deleteUser)

export default router