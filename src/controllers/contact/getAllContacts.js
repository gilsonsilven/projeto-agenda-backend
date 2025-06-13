import { getContactList, contactValidation } from "../../models/contactModel.js";

export default async function getAllContacts(req, res, next) {

    try {

        const contact = {id_user: +req.params.id_user};
    

        const {success, error, data} = contactValidation(contact, {id_contact: true, name: true, phone: true, birth_date: true, email: true, address: true});
        
        if(!success){
            return res.status(400).json({
                message: "Erro ao buscar contatos!",
                errors: error.flatten().fieldErrors
            })
        }

        const result = await getContactList(data.id_user);

        if(!result){
            return res.status(404).json({
                error: 'Contatos não encontrados'
            })
        }        

        return res.json({
            message: "Contatos encontrados com sucesso!", 
            contacts: result
        })


    }
    catch(error) {
        next(error);
    }

}