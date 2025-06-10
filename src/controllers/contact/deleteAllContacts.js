import { removeAllContacts } from "../../models/contactModel.js";

export default async function deleteAllContacts(req, res) {

    const id_user = +req.params.id_user;

    const contacts = await removeAllContacts(id_user);

    console.log(contacts)

    return res.json(contacts)


}