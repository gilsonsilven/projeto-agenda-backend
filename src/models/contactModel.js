import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export async function create(contact, id_user) {
    const result = await prisma.contacts.create({
        data: { ...contact, 
            id_user: id_user }
    });
    return result;
}


export async function getContactById(id_contact) {
    const result = await prisma.contacts.findUnique({
        where: {
           id_contact
        },
        select: {
            id_contact: true,
            id_user: true,
            name: true,
            phone: true,
            birth_date: true,
            email: true,
            address: true
        }
    })
    return result
}


export async function getContactList(id_user) {
    
    const result = await prisma.contacts.findMany({
        where: {
            id_user
        }

    })
    return result
}


export async function update(id_contact, contact) {
    const result = await prisma.contacts.update({
        where: {
            id_contact
        },
        data: contact
    })
    return result
}


export async function remove(id_contact) {
    const result = await prisma.contacts.delete({
        where: {
            id_contact
        },
        select: {
            id_contact: true,
            id_user: true,
            name: true,
            phone: true,
            birth_date: true,
            email: true,
            address: true
        }
    })
    return result
}
