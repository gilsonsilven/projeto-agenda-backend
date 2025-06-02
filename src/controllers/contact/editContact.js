import { update } from "../../models/contactModel.js";


export default async function editContact(req, res) {

    const contact = req.body;

    const {id_contact, ...data} = contact;

    const result = await update(id_contact, data)

    return res.json({
        result
    })
}