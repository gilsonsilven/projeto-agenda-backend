import express from "express"
import createContact from "../controllers/contact/createContact.js"

const router = express.Router()

router.post('/user/:id_user/', createContact)


export default router