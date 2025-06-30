import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient()

const contactSchema = z.object({
    id_contact: z.number({
        required_error: "O ID do contato é obrigatório",
        invalid_type_error: "O ID do contato deve ser um número"
    })
    .positive({ message: "O ID do contato deve ser um número positivo" }),

    id_user: z.number({
        required_error: "O ID do usuário é obrigatório",
        invalid_type_error: "O ID do usuário deve ser um número"
    })
    .positive({ message: "O ID do usuário deve ser um número positivo" }),

    name: z.string({
        required_error: "O nome é obrigatório!",
        invalid_type_error: "O nome deve conter alguma letra!"
    })
    .min(1, { message: "Nome deve ter pelo menos 1 caractere!" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres!" }),

    phone: z.string({
        required_error: "O telefone é obrigatório! "
    })
    .min(10, { message: "Telefone deve ter pelo menos 10 caracteres!" })
    .max(11, { message: "Telefone deve ter no máximo 15 caracteres!" })
    .regex(/^\d+$/, { message: "Telefone deve conter apenas números!"}),

    birth_date: z.string({
        invalid_type_error: "Data de nascimento deve ser uma data válida!",        
    })
    .optional()
    .nullable(),

    email: z.string({
    })
    .email({ message: "Email inválido!" })
    .max(100, { message: "Email deve ter no máximo 100 caracteres!" })
    .optional()
    .or(z.literal("")),

    address: z.string({
        invalid_type_error: "Endereço deve conter alguma palavra!"
    })
    .max(300, { message: "Endereço deve ter no máximo 300 caracteres" })
    .optional()
    .or(z.literal("")),
});


export const contactValidation = (contact, partial = null) => {
    if(partial) {
        return contactSchema.partial(partial).safeParse(contact)
    }
    return contactSchema.safeParse(contact)
}

export async function create(contact, id_user) {
    const result = await prisma.contacts.create({
        data: { ...contact, 
            id_user: id_user }
    });
    return result;
}

export async function createManyContacts(contacts) {
    const result = await prisma.contacts.createMany({
        data: contacts
    });
    return result;
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
        data: contact,
        select: {
            name: true,
            phone: true,
            birth_date: true,
            email: true,
            address: true
        }
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


export async function removeAllContacts(id_user) {
    const result = await prisma.contacts.deleteMany({
        where: {
            id_user
        }
    })
    return result
}