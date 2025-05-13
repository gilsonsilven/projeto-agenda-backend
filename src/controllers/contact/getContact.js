import { getContactById } from "../../models/contactModel.js";

export default async function getContact(req, res) {
    const id_contact = req.body.id_contact
    const contact = await getContactById(id_contact)
    return res.json(
        contact
    )
}