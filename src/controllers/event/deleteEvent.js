import { remove } from "../../models/eventModel.js";

export default async function deleteEvent(req, res) {

    const id_event = +req.body.id_event

    const event = await remove(id_event)
    return res.json({
        message: "Evento removido com sucesso!", 
        event
    })
}