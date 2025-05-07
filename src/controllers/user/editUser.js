import { update } from "../../models/userModel.js";


export default async function editUser(req, res) {
    const id = req.body.id_user
    const user = req.body

    const result = await update(id, user)

    return res.json({
        result
    })
}