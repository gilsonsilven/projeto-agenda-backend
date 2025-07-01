import { PrismaClient } from "@prisma/client";
import { z } from "zod";


const prisma = new PrismaClient()

const userSchema = z.object({

    id_user: z.number({
        required_error: "O ID é obrigatório",
        invalid_type_error: "O ID deve ser um número"

    })
    .positive({ message: "O ID deve ser um número positivo" }),
    
    name: z.string({
        required_error: "O nome é obrigatório!",
        invalid_type_error: "O nome deve conter alguma letra!"
    })
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),

    password: z.string({
        required_error: "Senha é obrigatória!",
        invalid_type_error: "Senha deve ser uma string"
    })
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres!" })
    .max(30, { message: "Senha deve ter no máximo 30 caracteres!" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,30}$/, {
        message: "Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número."
    }),

    email: z.string({
        required_error: "Email é obrigatório!",
        invalid_type_error: "Email deve ser uma string!"
    })
    .email({ message: "Email inválido!" })
    .max(100, { message: "Email deve ter no máximo 100 caracteres" }),

    birth_date: z.string({
        invalid_type_error: "Data de nascimento deve ser uma data válida"
    })
    .optional()
    .nullable(),

    phone: z.string({
        required_error: "Telefone é obrigatório!",
    })
    .min(10, { message: "Telefone deve ter pelo menos 10 número!" })
    .max(11, { message: "Telefone deve ter no máximo 11 números!" })
    .regex(/^\d+$/, { message: "Telefone deve conter apenas números!"}),

    address: z.string({
        invalid_type_error: "Endereço deve conter alguma palavra!"
    })
    .max(300, { message: "Endereço deve ter no máximo 300 caracteres" })
    .optional()
    .or(z.literal(""))
})

export const userValidation = (user, partial = null) => {
    if(partial) {
        return userSchema.partial(partial).safeParse(user)
    }
    return userSchema.safeParse(user)
}


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


export async function getUserById(id_user) {
    const result = await prisma.users.findUnique({
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

export async function getUserByEmail(email) {
    const result = await prisma.users.findUnique({
        where: {
           email
        }
    })
    return result
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