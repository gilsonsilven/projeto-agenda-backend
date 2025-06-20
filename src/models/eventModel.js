import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient()

const eventSchema = z.object({
    id_event: z.number({
        required_error: "O ID do evento é obrigatório",
        invalid_type_error: "O ID do evento deve ser um número"
    })
    .positive({ message: "O ID do evento deve ser um número positivo" }),

    id_user: z.number({
        required_error: "O ID do usuário é obrigatório",
        invalid_type_error: "O ID do usuário deve ser um número"
    })
    .positive({ message: "O ID do usuário deve ser um número positivo" }),

    title: z.string({
        required_error: "O título é obrigatório"
    })
    .min(3, { message: "Título deve ter pelo menos 3 caracteres" })
    .max(50, { message: "Título deve ter no máximo 50 caracteres" }),

    description: z.string({})
    .max(400, { message: "Descrição deve ter no máximo 500 caracteres" })
    .optional()
    .or(z.literal("")),

    event_start_date: z.string({
        required_error: "A data de início do evento é obrigatória"
    }),

    event_end_date: z.string({
        required_error: "A data de término do evento é obrigatória"
    }),

    address: z.string({
    })
    .max(300, { message: "Endereço deve ter no máximo 300 caracteres" })
    .optional()
    .or(z.literal("")),

    contact_names: z.string({
        invalid_type_error: "Os nomes de contato devem ser uma string!"
    })
    .optional()
    .or(z.literal(""))
})

export const eventValidation = (event, partial = null) => {
    if(partial) {
        return eventSchema.partial(partial).safeParse(event)
    }
    return eventSchema.safeParse(event)
}

export async function create(event, id_user) {
    const result = await prisma.events.create({
        data: { ...event, 
            id_user: id_user }
    });
    return result;
}

export async function createManyEvents(events) {
    const result = await prisma.events.createMany({
        data: events
    });
    return result;
}

export async function getEventList(id_user) {
    
    const result = await prisma.events.findMany({
        where: {
            id_user
        }

    })
    return result
}


export async function update(id_event, event) {
    const result = await prisma.events.update({
        where: {
            id_event
        },
        data: event
    })
    return result
}


export async function remove(id_event) {
    const result = await prisma.events.delete({
        where: {
            id_event
        },
        select: {
            id_event: true,
            id_user: true,
            title: true,
            description: true,
            event_start_date: true,
            event_end_date: true,
            address: true,
            contact_names: true
        }
    })
    return result
}


export async function removeAllEvents(id_user) {
    const result = await prisma.events.deleteMany({
        where: {
            id_user
        }
    })
    return result
}