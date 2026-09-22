"use client";

import { BLOOD_GROUPS, COMPLEXION, GENDER, MARITAL_STATUS } from "@/data/form-options";
import { FieldGrid, TextField } from "./fields";

export function PersonalDetailsForm() {
  return (
    <FieldGrid>
      <TextField name="personal.fullName" label="Full name" placeholder="e.g. Aarav Sharma" autoComplete="name" className="sm:col-span-2" />
      <TextField name="personal.gender" label="Gender" options={GENDER} />
      <TextField name="personal.dateOfBirth" label="Date of birth" type="date" hint="Age is worked out from this if you leave Age empty." />
      <TextField name="personal.timeOfBirth" label="Time of birth" type="time" />
      <TextField name="personal.placeOfBirth" label="Place of birth" placeholder="City, State" />
      <TextField name="personal.age" label="Age" placeholder="Auto from date of birth" />
      <TextField name="personal.height" label="Height" placeholder={`e.g. 5 ft 8 in`} />
      <TextField name="personal.weight" label="Weight" placeholder="e.g. 68 kg" />
      <TextField name="personal.bloodGroup" label="Blood group" options={BLOOD_GROUPS} />
      <TextField name="personal.complexion" label="Complexion" options={COMPLEXION} />
      <TextField name="personal.maritalStatus" label="Marital status" options={MARITAL_STATUS} />
    </FieldGrid>
  );
}
