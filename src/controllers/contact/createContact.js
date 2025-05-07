import { create } from "../../models/contactModel.js";

export default async function createContact (req, res) {

    const contact = req.body
    const id_user = req.params.id_user

    const result = await create(contact, id_user)

    return res.json({
        message: "Contato criado ",
        contact: result
    })
}