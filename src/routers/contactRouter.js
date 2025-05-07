import express from "express"
import createContact from "../controllers/contact/createContact.js"

const router = express.Router()

router.post('/', createContact)


export default router