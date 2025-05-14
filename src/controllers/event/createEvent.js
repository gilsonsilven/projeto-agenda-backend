import { create } from "../../models/eventModel.js";

export default async function createEvent(req, res) {
    const event = req.body;
    const id_user = +req.params.id_user;

    const result = await create(event, id_user);

    return res.json({
        message: "Evento criado com sucesso",
        event: result
    });
}