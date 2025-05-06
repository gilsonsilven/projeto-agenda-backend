import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export async function create(users) {
    const result = await prisma.users.create({
        data: users
    })
    return result
}


export async function remove(id_user) {
    const result = await prisma.users.delete({
        where: {
            id_user
        }
    })
    return result
}


export async function getList() {
    const result = await prisma.users.findMany()
    return result
}


export async function update(id_user, users) 
{
    const result = await prisma.users.update({
        where: {
            id_user
        },
        data: users
    })
    return result
}