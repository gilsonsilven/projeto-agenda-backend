import { getUserById } from "../../models/userModel.js";

export default async function getUser(req, res) {
    const id = req.body.id_user
    const user = await getUserById(id)
    return res.json(
        user
    )
}