"use client";

import { TextAreaField } from "./fields";

export function AboutForm() {
  return (
    <TextAreaField
      name="about"
      label="About me"
      rows={5}
      hint="Two to four sentences: your nature, values and what you enjoy."
      placeholder="Write a short, honest introduction."
    />
  );
}
