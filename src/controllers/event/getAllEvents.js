import { getEventList, eventValidation } from "../../models/eventModel.js";

export default async function getAllEvents(req, res, next) {

    try {

        const event = {id_user: +req.params.id_user};
    

        const {success, error, data} = eventValidation(event, {id_event: true, title: true, description: true, event_start_date: true, event_end_date: true , address: true, contact_names: true});
        
        if(!success){
            return res.status(400).json({
                message: "Erro ao buscar eventos!",
                errors: error.flatten().fieldErrors
            })
        }

        const result = await getEventList(data.id_user);

        if(!result){
            return res.status(404).json({
                error: 'Eventos não encontrados'
            })
        }        

        return res.json({
            message: "Eventos encontrados com sucesso!", 
            events: result
        })


    }
    catch(error) {
        return next(error);
    }


}