import { remove, userValidation } from "../../models/userModel.js";

export default async function deleteUser(req, res, next) {

    try {

        const user = {id_user: +req.params.id_user}

        const {success, error, data} = userValidation(user, {name: true, email: true, password: true, birth_date: true, phone: true, address: true})

        if(!success){
            return res.status(400).json({
                message: "Erro ao deletar usuário!",
                errors: error.flatten().fieldErrors
            })
        }

        const result = await remove(data.id_user)

        if(!result){
            return res.status(404).json({
                error: 'Usuário não encontrado'
            })
        }

        return res.json({
            message: "Usuário removido com sucesso!", 
            user: result
        })
    }
    catch(error){
        return next(error);
    }
}


