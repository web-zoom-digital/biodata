"use client";

import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { newCustomField } from "@/lib/biodata";
import type { BiodataData } from "@/types/biodata";
import { Button } from "../ui/Button";
import { FieldGrid, TextField } from "./fields";

export function CustomFieldsForm() {
  const { control } = useFormContext<BiodataData>();
  const { fields, append, remove } = useFieldArray({ control, name: "customFields" });

  return (
    <div className="space-y-3">
      {fields.length === 0 ? <p className="text-sm text-ink/60">Add anything that does not fit above, such as “Marriage plan” or “Family background”.</p> : null}
      <ul className="space-y-3">
        {fields.map((field, index) => (
          <li key={field.id} className="rounded-xl border border-ink/10 bg-mist/60 p-3">
            <FieldGrid cols={1}>
              <TextField name={`customFields.${index}.label`} label="Label" placeholder="e.g. Family background" />
              <TextField name={`customFields.${index}.value`} label="Value" maxLength={400} />
            </FieldGrid>
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-2 inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-red-700 hover:bg-red-50"
              aria-label={`Delete custom field ${index + 1}`}
            >
              <Trash2 className="size-4" aria-hidden="true" /> Delete field
            </button>
          </li>
        ))}
      </ul>
      <Button variant="outline" size="sm" onClick={() => append(newCustomField())}>
        <Plus className="size-4" aria-hidden="true" /> Add field
      </Button>
    </div>
  );
}
