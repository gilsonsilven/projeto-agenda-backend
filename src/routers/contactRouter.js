import express from "express"
import createContact from "../controllers/contact/createContact.js"
import deleteContact from "../controllers/contact/deleteContact.js"
import editContact from "../controllers/contact/editContact.js"
import getAllContacts from "../controllers/contact/getAllContacts.js"
import deleteAllContacts from "../controllers/contact/deleteAllContacts.js"

const router = express.Router()

router.post('/user/:id_user/', createContact)
router.delete('/user/:id_user/', deleteContact)
router.delete('/user/:id_user/list', deleteAllContacts)
router.put('/user/:id_user/', editContact)
router.get('/user/:id_user/list', getAllContacts)



export default router