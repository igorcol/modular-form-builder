"use client";
import FormBuilder from "@/components/form-builder/FormBuilder";
import FormRenderer from "@/components/form-builder/FormRenderer";
import { FormField } from "@/components/form-builder/types";
import React, { useState } from "react";

const Home = () => {
  // Guarda a estrutura do formulário
  const [formStructure, setFormStructure] = useState<FormField[] | null>(null);


  // Callback que o FormBuilder chama
  const handleFormCreation = (fields: FormField[]) => {
    console.log("Estrutura recebida na página principal:", fields);
    setFormStructure(fields);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Form Builder
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Ferramenta para criar formulário modulares.
        </p>
      </div>

      <div className="mt-10">
        <FormBuilder onFormCreate={handleFormCreation} />
      </div>

      {/* JSON Da Estutura */}
      {formStructure && (
        <div className="mt-12 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold">
            Estrutura do Formulário Gerada (JSON)
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            &quot;Esqueleto&quot; do formulário.
          </p>
          <pre className="mt-4 rounded-lg border bg-muted p-4 text-sm">
            <code>{JSON.stringify(formStructure, null, 2)}</code>
          </pre>
        </div>
      )}

      {/* Form Renderer */}
      {formStructure && formStructure.length > 0 && (
        <div className="mt-12 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold">Formulário Renderizado</h2>
          <p className="mt-2 text-sm text-muted-foreground mb-4">
            Resultado final.
          </p>
          <FormRenderer fields={formStructure}/>
        </div>
      )}

    </main>
  );
};

export default Home;
