import express from "express"
import restoreController from "../controllers/backup/restoreController.js"

const router = express.Router()


router.post("/user/:id_user/", restoreController);



export default router