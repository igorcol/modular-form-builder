import { FormBuilder } from "@/components/form-builder/FormBuilder";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = async () => {
  
  // Busca todos os formularios salvos no banco
  const forms = await prisma?.form.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

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
        <FormBuilder />
      </div>

     {/* Lista os formulário */}
     <div className="mt-12 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold">Formulários Criados</h2>
        <div className="mt-4 space-y-3">
          {forms!.length > 0 ? (
            forms!.map((form) => (
              <Link
                key={form.id}
                href={`/form/${form.id}`}
                passHref
              >
                <Button variant="outline" className="w-full justify-start">
                  {form.name}
                </Button>
              </Link>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhum formulário criado ainda. Crie o primeiro!
            </p>
          )}
        </div>
      </div>

    </main>
  );
};

export default Home;
