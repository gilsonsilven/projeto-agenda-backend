import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function create(event, id_user) {
    const result = await prisma.events.create({
        data: { ...event, 
            id_user: id_user }
    });
    return result;
}


export async function getEventById(id_event) {
    const result = await prisma.events.findUnique({
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