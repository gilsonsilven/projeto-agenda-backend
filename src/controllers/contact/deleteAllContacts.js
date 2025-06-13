import { removeAllContacts, contactValidation } from "../../models/contactModel.js";

export default async function deleteAllContacts(req, res, next) {

    try {

        const contact = {id_user: +req.params.id_user};

        const {success, error, data} = contactValidation(contact, {id_contact: true, name: true, phone: true, birth_date: true, email: true, address: true});

        if(!success){
            return res.status(400).json({
                message: "Erro ao deletar contatos!",
                errors: error.flatten().fieldErrors
            })
        }

        const result = await removeAllContacts(data.id_user);

        if(!result){
            return res.status(404).json({
                error: 'Contatos não encontrados'
            })
        }        

        return res.json({
            message: "Contatos deletados com sucesso!", 
            contacts: result
        })

    }
    catch(error) {
        next(error);
    }
}