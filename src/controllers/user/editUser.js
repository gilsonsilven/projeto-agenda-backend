import { update, userValidation } from "../../models/userModel.js";


export default async function editUser(req, res, next) {

    try {

        const id = +req.params.id_user;
        const user = req.body;
        user.id_user = id;

        const { success, error, data} = userValidation(user, {password: true})

        if(!success){
            return res.status(400).json({
                message: "Erro ao editar usuário!",
                errors: error.flatten().fieldErrors
            })
        }

        const result = await update(data.id_user, data)

        if(!result){
            return res.status(404).json({
                error: 'Usuário não encontrado'
            })
        }

        return res.json({
            message: "Usuário atualizado com sucesso",
            user: result
        })
    }
    catch(error) {
        return next(error);
    }
}