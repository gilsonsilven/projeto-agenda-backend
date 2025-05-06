import { create } from "../../models/userModel.js"

export default async function createUser (req, res) {

    const user = req.body

    const result = await create(user)

    return res.json({
        message: "Usuário criado com sucesso",
        user: result
    })
}