import FormRenderer from "@/components/form-builder/FormRenderer";
import { FormField } from "@/components/form-builder/types";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const form = await prisma?.form.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!form) {
    notFound();
  }

  const formStructure = Array.isArray(form.structure)
    ? (form.structure as unknown as FormField[])
    : [];

  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24">
        <div className="w-full max-w-2xl">
            <h1 className="text-3xl font-bold mb-2">{form.name}</h1>
            <p className="text-muted-foreground mb-8">
                Preencha o formulário abaixo.
            </p>

            <FormRenderer fields={formStructure}/>
        </div>
    </main>
)
};

export default page;
