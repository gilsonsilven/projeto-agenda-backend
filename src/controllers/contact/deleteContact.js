import { remove } from "../../models/contactModel.js";

export default async function deleteContact(req, res) {

    const id_contact = +req.body.id_contact

    const contact = await remove(id_contact)
    return res.json({
        message: "Contato removido com sucesso!", 
        contact
    })
}