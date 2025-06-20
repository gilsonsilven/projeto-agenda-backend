import { createManyContacts, contactValidation } from "../../models/contactModel.js";
import { createManyEvents, eventValidation } from "../../models/eventModel.js";

export default async function restoreController(req, res, next) {

    try {
        const backupData = req.body;
        const id_user = +req.params.id_user;
        const validContacts = [];
        const validEvents = [];

        console.log("linha 10: ",backupData.contacts)
        
        for(const contact of backupData.contacts) {
            
            if(contact.id_user !== id_user) {
                throw new Error("ID do usuário não corresponde ao ID nos contatos do backup.");
            }

            const { success, error, data } = contactValidation(contact, { id_contact: true});

            if(!success){
                return res.status(400).json({
                    message: 'Erro ao cadastrar contato, verifique os dados!',
                    errors: error.flatten().fieldErrors
                })
            }

            validContacts.push(data);
        };

        for(const event of backupData.events) {

            if(event.id_user !== id_user) {
                throw new Error("ID do usuário não corresponde ao ID nos eventos do backup.");
            }

            const { success, error, data } = eventValidation(event, { id_event: true});

            if(!success){
                return res.status(400).json({
                    message: 'Erro ao cadastrar evento, verifique os dados!',
                    errors: error.flatten().fieldErrors
                })
            }

            validEvents.push(data);
        };


        await createManyEvents(validEvents);
        await createManyContacts(validContacts);

        return res.status(200).json({
            message: "Restauração concluída com sucesso."
        });
    }
    catch(error) {
        return next(error);
    }


}