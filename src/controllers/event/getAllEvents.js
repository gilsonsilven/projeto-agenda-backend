import { getEventList } from "../../models/eventModel.js";

export default async function getAllEvents(req, res) {

    const id_user = +req.params.id_user;

    const events = await getEventList(id_user);

    return res.json(events)


}