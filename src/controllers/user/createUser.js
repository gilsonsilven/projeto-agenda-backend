import { create, userValidation } from "../../models/userModel.js"

export default async function createUser (req, res, next) {

    try{
        const user = req.body

        const { success, error, data} = userValidation(user, {id_user: true})
        

        if(!success){
            return res.status(400).json({
                message: 'Erro ao cadastrar usuário, verifique os dados!',
                errors: error.flatten().fieldErrors
            })
        }    

        const result = await create(data)

        return res.json({
            message: "Usuário criado com sucesso",
            user: result
        })


    }
    catch(error) {
        return next(error);
    }
}