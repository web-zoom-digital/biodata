"use client";

import { FieldGrid, TextField } from "./fields";

export function EducationForm() {
  return (
    <FieldGrid>
      <TextField name="education.highestQualification" label="Highest qualification" placeholder="e.g. B.Tech in Computer Science" className="sm:col-span-2" />
      <TextField name="education.degree" label="Degree" />
      <TextField name="education.institution" label="College / university" />
      <TextField name="education.additional" label="Additional education" placeholder="Certifications, diplomas" className="sm:col-span-2" />
    </FieldGrid>
  );
}
