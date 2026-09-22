"use client";

import { FieldGrid, TextField } from "./fields";

export function ContactForm() {
  return (
    <FieldGrid>
      <TextField name="contact.contactPerson" label="Contact person" placeholder="e.g. Rajesh Sharma (Father)" className="sm:col-span-2" />
      <TextField name="contact.phone" label="Phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" />
      <TextField name="contact.email" label="Email" type="email" inputMode="email" autoComplete="email" />
      <TextField name="contact.address" label="Address" className="sm:col-span-2" maxLength={300} />
      <TextField name="contact.city" label="City" />
      <TextField name="contact.state" label="State" />
      <TextField name="contact.country" label="Country" />
    </FieldGrid>
  );
}
