
// Tipos de input
export type FormFieldType = "text" | "email" | "password" | "number" | "textarea";

// Estrutura de um único campo do formulário
export interface FormField {
    id: string
    type: FormFieldType
    label: string
    placeholder?: string
    required: boolean
}