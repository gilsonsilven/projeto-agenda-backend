import { getContactList } from "../../models/contactModel.js";

export default async function getAllContacts(req, res) {

    const id_user = +req.params.id_user;

    const contacts = await getContactList(id_user);

    return res.json(contacts)


}