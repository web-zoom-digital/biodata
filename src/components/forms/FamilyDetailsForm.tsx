"use client";

import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FAMILY_TYPE, FAMILY_VALUES } from "@/data/form-options";
import { newSibling } from "@/lib/biodata";
import type { BiodataData } from "@/types/biodata";
import { Button } from "../ui/Button";
import { FieldGrid, TextField } from "./fields";

export function FamilyDetailsForm() {
  const { control } = useFormContext<BiodataData>();
  const { fields, append, remove } = useFieldArray({ control, name: "family.siblings" });

  return (
    <div className="space-y-5">
      <FieldGrid>
        <TextField name="family.fatherName" label="Father's name" />
        <TextField name="family.fatherOccupation" label="Father's occupation" />
        <TextField name="family.motherName" label="Mother's name" />
        <TextField name="family.motherOccupation" label="Mother's occupation" />
      </FieldGrid>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-ink">Brothers and sisters</h4>
        {fields.length === 0 ? <p className="mb-3 text-sm text-ink/60">None added yet. Add each sibling separately.</p> : null}
        <ul className="space-y-3">
          {fields.map((field, index) => (
            <li key={field.id} className="rounded-xl border border-ink/10 bg-mist/60 p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold">{field.relation}</span>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-red-700 hover:bg-red-50"
                  aria-label={`Remove ${field.relation} ${index + 1}`}
                >
                  <Trash2 className="size-4" aria-hidden="true" /> Remove
                </button>
              </div>
              <FieldGrid>
                <TextField name={`family.siblings.${index}.name`} label="Name" />
                <TextField name={`family.siblings.${index}.details`} label="Details" placeholder="Elder, married, engineer" />
              </FieldGrid>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => append(newSibling("Brother"))}>
            <Plus className="size-4" aria-hidden="true" /> Add brother
          </Button>
          <Button variant="outline" size="sm" onClick={() => append(newSibling("Sister"))}>
            <Plus className="size-4" aria-hidden="true" /> Add sister
          </Button>
        </div>
      </div>

      <FieldGrid>
        <TextField name="family.familyType" label="Family type" options={FAMILY_TYPE} />
        <TextField name="family.familyValues" label="Family values" options={FAMILY_VALUES} />
        <TextField name="family.nativePlace" label="Native place" className="sm:col-span-2" />
      </FieldGrid>
    </div>
  );
}
