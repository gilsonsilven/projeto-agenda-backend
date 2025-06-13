import { remove, contactValidation } from "../../models/contactModel.js";

export default async function deleteContact(req, res, next) {

    try {

        const contact = {id_contact: +req.body.id_contact};

        const {success, error, data} = contactValidation(contact, {id_user: true, name: true, phone: true, birth_date: true, email: true, address: true});

        if(!success){
            return res.status(400).json({
                message: "Erro ao deletar contato!",
                errors: error.flatten().fieldErrors
            })
        }

        const result = await remove(data.id_contact);

        if(!result){
            return res.status(404).json({
                error: 'Contato não encontrado'
            })
        }        

        return res.json({
            message: "Contato deletado com sucesso!", 
            contact: result
        })
    }
    catch(error) {
        next(error);
    }
}