import express from "express"
import createUser from "../controllers/user/createUser.js"
import deleteUser from "../controllers/user/deleteUser.js"
import getUser from "../controllers/user/getUser.js"
import editUser from "../controllers/user/editUser.js"

const router = express.Router()

router.post('/', createUser)
router.delete('/', deleteUser)
router.get('/', getUser)
router.put('/', editUser)

export default router