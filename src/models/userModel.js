import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export async function create(user) {
    const result = await prisma.users.create({
        data: user
    })
    return result
}


export async function remove(id_user) {
    const result = await prisma.users.delete({
        where: {
            id_user
        },
        select: {
            id_user: true,
            name: true,
            email: true,
            birth_date: true,
            phone: true,
            address: true
        }
    })
    return result
}


export async function getUserById(id) {
    const user = await prisma.users.findUnique({
        where: {
           id_user:id
        }
    })
    return user
}


export async function update(id_user, user) 
{
    const result = await prisma.users.update({
        where: {
            id_user
        },
        data: user
    })
    return result
}