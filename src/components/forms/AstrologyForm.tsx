"use client";

import { MANGLIK } from "@/data/form-options";
import { FieldGrid, TextField } from "./fields";

export function AstrologyForm() {
  return (
    <FieldGrid>
      <TextField name="astrology.religion" label="Religion" />
      <TextField name="astrology.caste" label="Caste" />
      <TextField name="astrology.subCaste" label="Sub-caste" />
      <TextField name="astrology.gotra" label="Gotra" />
      <TextField name="astrology.rashi" label="Rashi" />
      <TextField name="astrology.nakshatra" label="Nakshatra" />
      <TextField name="astrology.manglik" label="Manglik" options={MANGLIK} />
      <TextField name="astrology.kuldevta" label="Kuldevta" />
    </FieldGrid>
  );
}
