import { remove } from "../../models/userModel.js";

const deleteUser = async(req, res) => {

    const id = req.body.id_user
    const user = await remove(id)
    return res.json({
        message: "Usuário removido com sucesso!", 
        user
    })
}


export default deleteUser