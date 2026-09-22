import { z } from "zod";
import type { BiodataData, EnabledSections, SectionKey } from "@/types/biodata";

const text = z.string().optional();
const emailOk = (v?: string) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const phoneOk = (v?: string) => !v || /^[+\d][\d\s\-()]{5,}$/.test(v.trim());

const godSymbolSchema = z.object({ name: z.string(), src: z.string() }).optional();

/** Field-level schema used by the editor form. Cultural fields are never validated strictly. */
export const biodataSchema = z.object({
  profile: z.object({ photo: text, blessing: text, godSymbol: godSymbolSchema }),
  godSymbol: godSymbolSchema,
  personal: z
    .object({
      fullName: text,
      gender: text,
      dateOfBirth: text,
      timeOfBirth: text,
      placeOfBirth: text,
      age: text,
      height: text,
      weight: text,
      bloodGroup: text,
      complexion: text,
      maritalStatus: text,
    })
    .superRefine((p, ctx) => {
      if (!p.fullName?.trim()) ctx.addIssue({ code: "custom", path: ["fullName"], message: "Please enter the full name" });
      if (!p.dateOfBirth?.trim()) ctx.addIssue({ code: "custom", path: ["dateOfBirth"], message: "Please select the date of birth" });
    }),
  education: z.object({
    highestQualification: text,
    degree: text,
    institution: text,
    additional: text,
  }),
  profession: z.object({
    occupation: text,
    company: text,
    designation: text,
    workLocation: text,
    annualIncome: text,
    businessDetails: text,
  }),
  family: z.object({
    fatherName: text,
    fatherOccupation: text,
    motherName: text,
    motherOccupation: text,
    siblings: z.array(
      z.object({
        id: z.string(),
        relation: z.enum(["Brother", "Sister"]),
        name: text,
        details: text,
      }),
    ),
    familyType: text,
    familyValues: text,
    nativePlace: text,
  }),
  astrology: z.object({
    religion: text,
    caste: text,
    subCaste: text,
    gotra: text,
    rashi: text,
    nakshatra: text,
    manglik: text,
    kuldevta: text,
  }),
  lifestyle: z.object({
    food: text,
    smoking: text,
    drinking: text,
    hobbies: text,
    interests: text,
    languages: text,
  }),
  contact: z.object({
    contactPerson: text,
    phone: z.string().optional().refine(phoneOk, "Enter a valid phone number"),
    email: z.string().optional().refine(emailOk, "Enter a valid email address"),
    address: text,
    city: text,
    state: text,
    country: text,
  }),
  about: text,
  partnerExpectations: text,
  customFields: z.array(z.object({ id: z.string(), label: z.string(), value: z.string() })),
});

export interface DownloadIssue {
  section: SectionKey;
  message: string;
}

/**
 * Minimum requirements before a download: name, date of birth and — if the contact
 * section is switched on — at least one contact detail.
 */
export function checkDownloadReady(data: BiodataData, enabled: EnabledSections): DownloadIssue[] {
  const issues: DownloadIssue[] = [];
  if (!data.personal.fullName?.trim()) issues.push({ section: "personal", message: "Add the full name" });
  if (!data.personal.dateOfBirth?.trim()) issues.push({ section: "personal", message: "Add the date of birth" });
  if (enabled.contact) {
    const c = data.contact;
    const hasContact = [c.phone, c.email, c.address, c.city, c.contactPerson].some((v) => v?.trim());
    if (!hasContact) issues.push({ section: "contact", message: "Add at least one contact detail, or switch the contact section off" });
    if (!emailOk(c.email)) issues.push({ section: "contact", message: "Fix the email address" });
    if (!phoneOk(c.phone)) issues.push({ section: "contact", message: "Fix the phone number" });
  }
  return issues;
}
