import { removeAllEvents } from "../../models/eventModel.js";

export default async function deleteAllEvents(req, res) {

    const id_user = +req.params.id_user;

    const events = await removeAllEvents(id_user);

    console.log(events)

    return res.json(events)


}