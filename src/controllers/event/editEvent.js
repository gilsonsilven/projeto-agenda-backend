import { update } from "../../models/eventModel.js";


export default async function editEvent(req, res) {
    const id_event = req.body.id_event
    const event = req.body

    const result = await update(id_event, event)

    return res.json({
        result
    })
}