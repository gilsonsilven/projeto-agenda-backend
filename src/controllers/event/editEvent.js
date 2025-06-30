import { update, eventValidation } from "../../models/eventModel.js";


export default async function editEvent(req, res, next) {

    try {
        
        const event = req.body;
        event.id_event = +req.body.id_event;

        const { success, error, data} = eventValidation(event, {id_user: true})

        if(!success){
            return res.status(400).json({
                message: "Erro ao editar evento!",
                errors: error.flatten().fieldErrors
            })
        }

        const result = await update(data.id_event, data)

        if(!result){
            return res.status(404).json({
                errors: {Erro: ['Evento não encontrado']}
            })
        }

        return res.json({
            message: "Evento atualizado com sucesso",
            event: result
        })
    }
    catch(error) {
        return next(error);
    }
}