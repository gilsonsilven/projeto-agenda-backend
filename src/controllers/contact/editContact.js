import { update } from "../../models/contactModel.js";


export default async function editContact(req, res) {
    const id_contact = req.body.id_contact
    const contact = req.body

    const result = await update(id_contact, contact)

    return res.json({
        result
    })
}