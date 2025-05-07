import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export async function create(contact, id_user) {


    const result = await prisma.contacts.create({
        data: {...contact, id_user}
    })
    return result
}
