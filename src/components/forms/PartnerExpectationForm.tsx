"use client";

import { TextAreaField } from "./fields";

export function PartnerExpectationForm() {
  return (
    <TextAreaField
      name="partnerExpectations"
      label="Partner expectations"
      rows={4}
      hint="Keep it simple: values, education, outlook. Avoid a long list of demands."
      placeholder="What matters most to you in a life partner?"
    />
  );
}
