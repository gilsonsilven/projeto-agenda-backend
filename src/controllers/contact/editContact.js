import { update, contactValidation } from "../../models/contactModel.js";


export default async function editContact(req, res, next) {

    try {
        const contact = req.body;
        contact.id_contact = +req.body.id_contact;

        const { success, error, data} = contactValidation(contact, {id_user: true})

        if(!success){
            return res.status(400).json({
                message: "Erro ao editar contato!",
                errors: error.flatten().fieldErrors
            })
        }

        const result = await update(data.id_contact, data)

        if(!result){
            return res.status(404).json({
                error: 'Contato não encontrado'
            })
        }

        return res.json({
            message: "Contato atualizado com sucesso",
            event: result
        })
    }
    catch(error) {
        next(error);
    }
}