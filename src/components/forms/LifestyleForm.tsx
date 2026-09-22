"use client";

import { FOOD, YES_NO } from "@/data/form-options";
import { FieldGrid, TextField } from "./fields";

export function LifestyleForm() {
  return (
    <FieldGrid>
      <TextField name="lifestyle.food" label="Food preference" options={FOOD} />
      <TextField name="lifestyle.languages" label="Languages known" placeholder="Hindi, English" />
      <TextField name="lifestyle.smoking" label="Smoking" options={YES_NO} />
      <TextField name="lifestyle.drinking" label="Drinking" options={YES_NO} />
      <TextField name="lifestyle.hobbies" label="Hobbies" placeholder="Traveling, Music" className="sm:col-span-2" maxLength={300} />
      <TextField name="lifestyle.interests" label="Interests" className="sm:col-span-2" maxLength={300} />
    </FieldGrid>
  );
}
