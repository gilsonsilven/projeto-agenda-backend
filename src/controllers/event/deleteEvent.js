import { remove, eventValidation } from "../../models/eventModel.js";

export default async function deleteEvent(req, res, next) {

    try {

        const event = {id_event: +req.body.id_event};

        const {success, error, data} = eventValidation(event, {id_user: true, title: true, description: true, event_start_date: true, event_end_date: true , address: true, contact_names: true});

        if(!success){
            return res.status(400).json({
                message: "Erro ao deletar evento!",
                errors: error.flatten().fieldErrors
            })
        }

        const result = await remove(data.id_event);

        if(!result){
            return res.status(404).json({
                error: 'Evento não encontrado'
            })
        }        

        return res.json({
            message: "Evento removido com sucesso!", 
            event
        })
    }
    catch(error) {
        return next(error);
    }

}