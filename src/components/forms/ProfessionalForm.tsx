"use client";

import { FieldGrid, TextField } from "./fields";

export function ProfessionalForm() {
  return (
    <FieldGrid>
      <TextField name="profession.occupation" label="Occupation" placeholder="e.g. Software Engineer" />
      <TextField name="profession.designation" label="Designation" />
      <TextField name="profession.company" label="Company" />
      <TextField name="profession.workLocation" label="Work location" />
      <TextField name="profession.annualIncome" label="Annual income" placeholder="e.g. INR 12 LPA" />
      <TextField name="profession.businessDetails" label="Business details" placeholder="If self-employed" />
    </FieldGrid>
  );
}
