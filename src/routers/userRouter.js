import express from "express"
import deleteUser from "../controllers/user/deleteUser.js"
import getUser from "../controllers/user/getUser.js"
import editUser from "../controllers/user/editUser.js"

const router = express.Router()

//router.post('/', createUser)
router.delete('/:id_user', deleteUser)
router.get('/:id_user', getUser)
router.put('/:id_user', editUser)

export default router