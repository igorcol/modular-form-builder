"use client";

import { useState, useRef, useEffect } from "react";
import { useFormState } from "react-dom";
import { Trash2, PlusCircle } from "lucide-react";

import { FormField, FormFieldType } from "./types";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { saveFormStructure, State } from "@/lib/actions/actions";

export function FormBuilder() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState<FormFieldType>("text");
  const [newFieldPlaceholder, setNewFieldPlaceholder] = useState("");
  const [newFieldRequired, setNewFieldRequired] = useState(false);

  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(saveFormStructure, initialState);

  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (state.message?.includes("sucesso")) {
      dialogCloseRef.current?.click();
      setFields([]);
    }
  }, [state]);

  const handleAddField = () => {
    if (!newFieldLabel) {
      alert("O nome do campo (Label) é obrigatório.");
      return;
    }
    const newField: FormField = {
      id: `field_${Date.now()}`,
      label: newFieldLabel,
      type: newFieldType,
      placeholder: newFieldPlaceholder,
      required: newFieldRequired,
    };
    setFields([...fields, newField]);
    setNewFieldLabel("");
    setNewFieldPlaceholder("");
    setNewFieldType("text");
    setNewFieldRequired(false);
  };
  const handleDeleteField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Criar Novo Formulário
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <form action={dispatch}>
          <DialogHeader>
            <DialogTitle>Novo Formulário</DialogTitle>
            <DialogDescription>
              Dê um nome ao seu formulário e adicione os campos necessários.
            </DialogDescription>
          </DialogHeader>

          <div className="my-4">
            <Label htmlFor="name">Nome do Formulário</Label>
            <Input
              id="name"
              name="name"
              placeholder="Ex: Cadastro de Membros"
              required
            />
            {state.errors?.name && (
              <p className="text-sm text-red-500 mt-1">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          <Separator />

          <div className="py-4">
            <h4 className="mb-4 text-lg font-medium">Adicionar Campos</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="field-label">Nome do Campo (Label)</Label>
                <Input
                  id="field-label"
                  value={newFieldLabel}
                  onChange={(e) => setNewFieldLabel(e.target.value)}
                  placeholder="Ex: Nome Completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="field-type">Tipo do Campo</Label>
                <Select
                  value={newFieldType}
                  onValueChange={(value: FormFieldType) =>
                    setNewFieldType(value)
                  }
                >
                  <SelectTrigger id="field-type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Texto</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="password">Senha</SelectItem>
                    <SelectItem value="number">Número</SelectItem>
                    <SelectItem value="textarea">Área de Texto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="field-placeholder">
                  Texto de Exemplo (Placeholder)
                </Label>
                <Input
                  id="field-placeholder"
                  value={newFieldPlaceholder}
                  onChange={(e) => setNewFieldPlaceholder(e.target.value)}
                  placeholder="Ex: digite seu nome aqui..."
                />
              </div>
              <div className="flex items-center space-x-2 self-end pb-2">
                <Checkbox
                  id="field-required"
                  checked={newFieldRequired}
                  onCheckedChange={(checked) =>
                    setNewFieldRequired(Boolean(checked))
                  }
                />
                <Label htmlFor="field-required">Obrigatório</Label>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleAddField}
              className="mt-4"
            >
              Adicionar Campo
            </Button>
          </div>

          <Separator className="my-4" />
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Campos Adicionados</h4>
            {fields.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhum campo adicionado ainda.
              </p>
            ) : (
              <div className="space-y-3 rounded-md border p-4">
                {fields.map((field) => (
                  <div
                    key={field.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold">
                        {field.label}{" "}
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Tipo: {field.type} | Placeholder:{" "}
                        {field.placeholder || "N/A"}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteField(field.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            type="hidden"
            name="structure"
            value={JSON.stringify(fields)}
          />

          <DialogFooter className="mt-4">
            {state.message && (
              <p
                className={`text-sm ${
                  state.message.includes("sucesso")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {state.message}
              </p>
            )}
            <DialogClose ref={dialogCloseRef} asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit">Salvar Formulário</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
