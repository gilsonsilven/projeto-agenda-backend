import { create, contactValidation } from "../../models/contactModel.js";

export default async function createContact(req, res, next) {

    try {
        const contact = req.body;
        const id_user = +req.params.id_user;
        contact.id_user = id_user;

    

        const { success, error, data } = contactValidation(contact, { id_contact: true});

        if(!success){
            return res.status(400).json({
                message: 'Erro ao cadastrar contato, verifique os dados!',
                errors: error.flatten().fieldErrors
            })
        }    

        const result = await create(data, data.id_user);

        return res.json({
            message: "Contato criado com sucesso!",
            contact: result
        });
    }
    catch(error) {
        return next(error);
    }
}
