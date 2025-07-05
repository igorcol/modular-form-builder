/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FormEvent, useState } from "react";
import { FormField } from "./types";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface FormRendererProps {
  fields: FormField[];
}

const FormRenderer = ({ fields }: FormRendererProps) => {
  // Quarda os dados digitados no formulario (respostas) em um Record
  // Ex: { "Nome Completo": "Caio" }
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Atualiza o form data sempre que o usuario digita algo
  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // Chamada quando o form é enviado
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Dados do form enviados:", formData);
    alert(
      "Formulário enviado! Verifique o console para ver os dados (Pressione F12)."
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border p-6">
      {fields.map((field) => {
        // Para cada objeto de campo no array, criamos um bloco de Label + Input.
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            
            {/* Usamos um switch para decidir qual componente renderizar baseado no tipo do campo */}
            {(() => {
              switch (field.type) {
                case "textarea":
                  return (
                    <Textarea
                      id={field.id}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={formData[field.label] || ""}
                      onChange={(e) =>
                        handleInputChange(field.label, e.target.value)
                      }
                    />
                  );
                case "text":
                case "email":
                case "password":
                case "number":
                  return (
                    <Input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={formData[field.label] || ""}
                      onChange={(e) =>
                        handleInputChange(field.label, e.target.value)
                      }
                    />
                  );
                default:
                  return null; // Não renderiza nada se o tipo for desconhecido
              }
            })()}
          </div>
        );
      })}
      <Button type="submit" className="w-full md:w-auto">
        Enviar Formulário
      </Button>
    </form>
  );
};

export default FormRenderer;
