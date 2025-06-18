import { userValidation, getUserByEmail } from "../../models/userModel.js"
import { create } from "../../models/sessionModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'




export default async function loginController(req, res, next) {
    try {

        const user = req.body

        const { success, error, data } = userValidation(user, {id_user: true, name: true, phone: true, birth_date: true, address: true});

        if(!success){
            return res.status(400).json({
                message: "Erro ao validar os dados dE login!",
                errors: error.flatten().fieldErrors
            })
        }


        const result = await getUserByEmail(data.email)        

        if(!result){
            return res.status(400).json({
                message: "Usuário não encontrado",
            })
        }

        const passwordIsValid = bcrypt.compareSync(data.password, result.password);



        if(!passwordIsValid){
            return res.status(400).json({
                message: "Senha não incorreta!"
            })
        }


        const payload = {
            id: result.id_user,
        }

        const sessionResult = await create(result.id_user, req.headers['user-agent'])        

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' })
        const refreshToken = jwt.sign({...payload, id_session: sessionResult.id_session}, process.env.JWT_SECRET, { expiresIn: '3d' })

        res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 3 * 24 * 60 * 60 * 1000 })


        return res.status(200).json({
            message: "Login realizado com sucesso!",
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: result
        })
    }
    catch (error) {
        next(error);
    }
}