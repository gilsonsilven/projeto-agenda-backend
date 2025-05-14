import { getEventById } from "../../models/eventModel.js";

export default async function getEvent(req, res) {
    const id_event = req.body.id_event
    const event = await getEventById(id_event)
    return res.json(
        event
    )
}