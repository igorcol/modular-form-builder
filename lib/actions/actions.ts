"use server"
import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Schema para validar os dados que esperamos receber
const FormSchema = z.object({
    name: z.string().min(3, { message: "O nome do formulário precisa ter pelo menos 3 caracteres."}),
    structure: z.string()
});

// Tipo usado no formulario para o estado de resposta da action
export type State = {
    errors?: {
        name?: string[];
        structure?: string[];
    }
    message?: string | null;
}

// * Server action. Recebe o estado anterior e os dados do formulário
export async function saveFormStructure(prevState: State, formData: FormData) {
    const validatedFields = FormSchema.safeParse({
        name: formData.get("name"),
        structure: formData.get("structure")
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Erro de validação. Por Favor, verifique os campos."
        }
    }

    const { name, structure } = validatedFields.data;

    try {
        await prisma.form.create({
            data: {
                name: name,
                structure: JSON.parse(structure)
            }
        });
    }
    catch {
        return {
            message: "Erro no banco de dados: não foi possivel salvar o formulário."
        }
    }

    revalidatePath("/");

    return { message: "Formulário salvo com sucesso!" }
}