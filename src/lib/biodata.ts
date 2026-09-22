import { uid } from "@/lib/utils";
import type {
  BiodataData,
  BiodataViewModel,
  EnabledSections,
  ResolvedSection,
  Row,
  SectionKey,
} from "@/types/biodata";

export const SECTION_ORDER: SectionKey[] = [
  "personal",
  "education",
  "profession",
  "family",
  "astrology",
  "lifestyle",
  "contact",
  "about",
  "expectations",
  "custom",
];

export const SECTION_TITLES: Record<SectionKey, string> = {
  personal: "Personal Details",
  education: "Education",
  profession: "Professional Details",
  family: "Family Details",
  astrology: "Religion & Astrology",
  lifestyle: "Lifestyle & Interests",
  contact: "Contact Details",
  about: "About Me",
  expectations: "Partner Expectations",
  custom: "Additional Information",
};

/** Sections that users can switch off. Personal details always stay on. */
export const OPTIONAL_SECTIONS: SectionKey[] = SECTION_ORDER.filter((k) => k !== "personal");

export const DEFAULT_GOD_SYMBOL = {
  name: "Ganesha Image 1",
  src: "/god_symbol/ganesha_image_1.png",
};

export function createEmptyBiodata(): BiodataData {
  return {
    profile: {
      godSymbol: DEFAULT_GOD_SYMBOL,
      blessing: "|| Shree Ganeshaya Namah ||",
    },
    godSymbol: DEFAULT_GOD_SYMBOL,
    personal: {},
    education: {},
    profession: {},
    family: { siblings: [] },
    astrology: {},
    lifestyle: {},
    contact: {},
    about: "",
    partnerExpectations: "",
    customFields: [],
  };
}

export function defaultEnabledSections(): EnabledSections {
  return {
    personal: true,
    education: true,
    profession: true,
    family: true,
    astrology: true,
    lifestyle: true,
    contact: true,
    about: true,
    expectations: true,
    custom: true,
  };
}

/** Merge a possibly partial / older object over the empty shape so the app never crashes on bad drafts. */
export function normalizeBiodata(input: Partial<BiodataData> | undefined | null): BiodataData {
  const base = createEmptyBiodata();
  if (!input || typeof input !== "object") return base;

  const rawSymbol = input.godSymbol ?? input.profile?.godSymbol;
  const godSymbol =
    rawSymbol && typeof rawSymbol === "object" && typeof rawSymbol.src === "string" && rawSymbol.src.trim()
      ? { name: String(rawSymbol.name || "").trim(), src: String(rawSymbol.src).trim() }
      : base.godSymbol;

  const blessing =
    typeof input.profile?.blessing === "string" && input.profile.blessing.trim() !== ""
      ? input.profile.blessing
      : base.profile.blessing;

  return {
    profile: {
      ...base.profile,
      ...input.profile,
      godSymbol,
      blessing,
    },
    godSymbol,
    personal: { ...base.personal, ...input.personal },
    education: { ...base.education, ...input.education },
    profession: { ...base.profession, ...input.profession },
    family: {
      ...base.family,
      ...input.family,
      siblings: Array.isArray(input.family?.siblings) ? input.family!.siblings : [],
    },
    astrology: { ...base.astrology, ...input.astrology },
    lifestyle: { ...base.lifestyle, ...input.lifestyle },
    contact: { ...base.contact, ...input.contact },
    about: input.about ?? "",
    partnerExpectations: input.partnerExpectations ?? "",
    customFields: Array.isArray(input.customFields) ? input.customFields : [],
  };
}

export function newSibling(relation: "Brother" | "Sister") {
  return { id: uid("sib"), relation, name: "", details: "" };
}

export function newCustomField() {
  return { id: uid("cf"), label: "", value: "" };
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function parseIso(iso?: string) {
  const m = iso?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  return { y: Number(m[1]), m: Number(m[2]), d: Number(m[3]) };
}

export function formatDob(iso?: string) {
  const p = parseIso(iso);
  if (!p || p.m < 1 || p.m > 12) return iso?.trim() ?? "";
  return `${p.d} ${MONTHS[p.m - 1]} ${p.y}`;
}

export function formatTime(hhmm?: string) {
  const m = hhmm?.match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return hhmm?.trim() ?? "";
  const h = Number(m[1]);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m[2]} ${suffix}`;
}

export function computeAge(iso?: string, now = new Date()) {
  const p = parseIso(iso);
  if (!p) return "";
  let age = now.getFullYear() - p.y;
  const beforeBirthday = now.getMonth() + 1 < p.m || (now.getMonth() + 1 === p.m && now.getDate() < p.d);
  if (beforeBirthday) age -= 1;
  return age >= 0 && age < 120 ? `${age} years` : "";
}

const clean = (v?: string) => (v ?? "").trim();

function rows(pairs: [string, string | undefined][]): Row[] {
  return pairs
    .map(([label, value]) => ({ label, value: clean(value) }))
    .filter((r) => r.value.length > 0);
}

function siblingRows(data: BiodataData): Row[] {
  const counts = { Brother: 0, Sister: 0 };
  const totals = {
    Brother: data.family.siblings.filter((s) => s.relation === "Brother" && (clean(s.name) || clean(s.details))).length,
    Sister: data.family.siblings.filter((s) => s.relation === "Sister" && (clean(s.name) || clean(s.details))).length,
  };
  const out: Row[] = [];
  for (const s of data.family.siblings) {
    const name = clean(s.name);
    const details = clean(s.details);
    if (!name && !details) continue;
    counts[s.relation] += 1;
    const label = totals[s.relation] > 1 ? `${s.relation} ${counts[s.relation]}` : s.relation;
    out.push({ label, value: name && details ? `${name} (${details})` : name || details });
  }
  return out;
}

/**
 * Turns raw form data into what templates render: empty rows and empty sections are removed,
 * dates are formatted and age is derived from date of birth when left blank.
 */
export function buildViewModel(data: BiodataData, enabled: EnabledSections = defaultEnabledSections()): BiodataViewModel {
  const p = data.personal;
  const pr = data.profession;
  const c = data.contact;

  const all: ResolvedSection[] = [];
  const push = (key: SectionKey, sectionRows: Row[], text?: string) => {
    if (!enabled[key]) return;
    if (sectionRows.length === 0 && !clean(text)) return;
    all.push({ key, title: SECTION_TITLES[key], rows: sectionRows, text: clean(text) || undefined });
  };

  push(
    "personal",
    rows([
      ["Gender", p.gender],
      ["Date of Birth", formatDob(p.dateOfBirth)],
      ["Time of Birth", formatTime(p.timeOfBirth)],
      ["Place of Birth", p.placeOfBirth],
      ["Age", clean(p.age) || computeAge(p.dateOfBirth)],
      ["Height", p.height],
      ["Weight", p.weight],
      ["Blood Group", p.bloodGroup],
      ["Complexion", p.complexion],
      ["Marital Status", p.maritalStatus],
    ]),
  );
  push(
    "education",
    rows([
      ["Highest Qualification", data.education.highestQualification],
      ["Degree", data.education.degree],
      ["College / University", data.education.institution],
      ["Additional Education", data.education.additional],
    ]),
  );
  push(
    "profession",
    rows([
      ["Occupation", pr.occupation],
      ["Designation", pr.designation],
      ["Company", pr.company],
      ["Work Location", pr.workLocation],
      ["Annual Income", pr.annualIncome],
      ["Business Details", pr.businessDetails],
    ]),
  );
  const f = data.family;
  push("family", [
    ...rows([
      ["Father's Name", f.fatherName],
      ["Father's Occupation", f.fatherOccupation],
      ["Mother's Name", f.motherName],
      ["Mother's Occupation", f.motherOccupation],
    ]),
    ...siblingRows(data),
    ...rows([
      ["Family Type", f.familyType],
      ["Family Values", f.familyValues],
      ["Native Place", f.nativePlace],
    ]),
  ]);
  const a = data.astrology;
  push(
    "astrology",
    rows([
      ["Religion", a.religion],
      ["Caste", a.caste],
      ["Sub-caste", a.subCaste],
      ["Gotra", a.gotra],
      ["Rashi", a.rashi],
      ["Nakshatra", a.nakshatra],
      ["Manglik", a.manglik],
      ["Kuldevta", a.kuldevta],
    ]),
  );
  const l = data.lifestyle;
  push(
    "lifestyle",
    rows([
      ["Food Preference", l.food],
      ["Smoking", l.smoking],
      ["Drinking", l.drinking],
      ["Hobbies", l.hobbies],
      ["Interests", l.interests],
      ["Languages Known", l.languages],
    ]),
  );
  const address = [c.address, c.city, c.state, c.country].map(clean).filter(Boolean).join(", ");
  push(
    "contact",
    rows([
      ["Contact Person", c.contactPerson],
      ["Phone", c.phone],
      ["Email", c.email],
      ["Address", address],
    ]),
  );
  push("about", [], data.about);
  push("expectations", [], data.partnerExpectations);
  push(
    "custom",
    data.customFields
      .map((cf) => ({ label: clean(cf.label), value: clean(cf.value) }))
      .filter((r) => r.label && r.value),
  );

  const byKey: BiodataViewModel["byKey"] = {};
  for (const s of all) byKey[s.key] = s;

  const role = clean(pr.designation) || clean(pr.occupation);
  const subtitle = [role, clean(pr.company)].filter(Boolean).join(" at ");

  return {
    name: clean(p.fullName),
    photo: data.profile.photo || undefined,
    blessing: clean(data.profile.blessing) || undefined,
    godSymbol: data.profile.godSymbol?.src ? data.profile.godSymbol : data.godSymbol?.src ? data.godSymbol : undefined,
    subtitle,
    sections: all,
    byKey,
    isEmpty: !clean(p.fullName) && all.length === 0,
  };
}
