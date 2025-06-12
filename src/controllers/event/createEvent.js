import { create, eventValidation } from "../../models/eventModel.js";

export default async function createEvent(req, res, next) {

    try {
        const event = req.body;
        const id_user = +req.params.id_user;
        event.id_user = id_user;

        const { success, error, data } = eventValidation(event, { id_event: true});

        if(!success){
            return res.status(400).json({
                message: 'Erro ao cadastrar evento, verifique os dados!',
                errors: error.flatten().fieldErrors
            })
        }    

        const result = await create(data, data.id_user);

        return res.json({
            message: "Evento criado com sucesso!",
            event: result
        });
    }
    catch(error) {
        return next(error);
    }


}