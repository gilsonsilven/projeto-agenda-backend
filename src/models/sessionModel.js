import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function create(id_user, client){
    const result = await prisma.session.create({
        data: {id_user, client}
    })
    return result
}

export async function remove(id_session, id_user){
    const result = await prisma.session.delete({
        where: {
            id_session,
            id_user
        }
    })
    return result
}