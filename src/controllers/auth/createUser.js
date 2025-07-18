import { create, userValidation } from "../../models/userModel.js"
import bcrypt from "bcrypt";

export default async function createUser (req, res, next) {

    try{
        const user = req.body

        console.log(user)
        
        const { success, error, data} = userValidation(user, {id_user: true})
        

        if(!success){
            return res.status(400).json({
                message: 'Erro ao cadastrar usuário, verifique os dados!',
                errors: error.flatten().fieldErrors
            })
        }    

        data.password = bcrypt.hashSync(data.password, 10);

        const result = await create(data);

        if(!result){
            return res.status(500).json({
                message: "Erro ao criar usuário!"
            })
        }

        return res.json({
            message: "Usuário criado com sucesso",
            user: result
        })


    }
    catch(error) {
       
        return next(error);
    }
}