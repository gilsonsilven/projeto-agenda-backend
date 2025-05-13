import { getList } from "../../models/contactModel.js";

export default async function getAllContacts(req, res) {

    const id_user = +req.params.id_user;

    const contacts = await getList(id_user);

    return res.json({
        contacts
    })


}