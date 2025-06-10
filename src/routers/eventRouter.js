import express from "express"
import createEvent from "../controllers/event/createEvent.js"
import getEvent from "../controllers/event/getEvent.js"
import getAllEvents from "../controllers/event/getAllEvents.js"
import editEvent from "../controllers/event/editEvent.js"
import deleteEvent from "../controllers/event/deleteEvent.js"
import deleteAllEvents from "../controllers/event/deleteAllEvents.js"

const router = express.Router()

router.post('/user/:id_user/', createEvent)
router.delete('/user/:id_user/', deleteEvent)
router.delete('/user/:id_user/list', deleteAllEvents)
router.put('/user/:id_user/', editEvent)
router.get('/user/:id_user/list', getAllEvents)
router.get('/user/:id_user/', getEvent)


export default router