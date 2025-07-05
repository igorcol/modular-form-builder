"use client";
import React, { useState } from "react";
import { FormField, FormFieldType } from "./types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

// Para que o componente pai possa receber o formlário criado
interface FormBuilderProps {
  onFormCreate: (fields: FormField[]) => void;
}

const FormBuilder = ({ onFormCreate }: FormBuilderProps) => {
  const [fields, setFields] = useState<FormField[]>([]);
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState<FormFieldType>("text");
  const [newFieldPlaceholder, setNewFieldPlaceholder] = useState("");
  const [newFieldRequired, setNewFieldRequired] = useState(false);

  const handleAddField = () => {
    if (!newFieldLabel) {
      alert("O nome do campo (Label) é obigatório.");
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

  const handleSaveForm = () => {
    onFormCreate(fields);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Construtor de Formulário</DialogTitle>
          <DialogDescription>
            Adicione e configure os campos do seu formulário.
          </DialogDescription>
        </DialogHeader>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
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
              onValueChange={(Value: FormFieldType) => setNewFieldType(Value)}
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
        <Button variant="outline" onClick={handleAddField}>
          Adicionar Campo
        </Button>

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

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={handleSaveForm}>
              Salvar Formulário
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormBuilder;
