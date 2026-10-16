export interface GodSymbol {
  id: string;
  name?: string;
  src?: string;
  text?: string;
}

export interface ResolvedSectionRow {
  label: string;
  value: string;
}

export interface ResolvedSection {
  key: string;
  title: string;
  rows: ResolvedSectionRow[];
  text?: string;
}

export interface BiodataModel {
  name: string;
  subtitle?: string;
  photo?: string;
  godSymbol?: GodSymbol;
  blessing?: string;
  quote?: string;
  sections: ResolvedSection[];
}

export type SectionKey =
  | 'personal'
  | 'education'
  | 'profession'
  | 'family'
  | 'astrology'
  | 'lifestyle'
  | 'contact'
  | 'about'
  | 'expectations'
  | 'custom';

export type SectionVisibility = Record<SectionKey, boolean>;

export interface SiblingItem {
  id: string;
  relation: 'Brother' | 'Sister';
  name: string;
  details?: string;
}

export interface CustomFieldItem {
  id: string;
  label: string;
  value: string;
}

export interface ProfileData {
  photo?: string;
  godSymbol?: GodSymbol;
  blessing?: string;
  quote?: string;
}

export interface PersonalDetailsData {
  fullName: string;
  gender: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  age: string;
  height: string;
  weight: string;
  bloodGroup: string;
  complexion: string;
  maritalStatus: string;
  nationality?: string;
  motherTongue?: string;
  currentCity?: string;
}

export interface EducationData {
  highestQualification: string;
  degree: string;
  institution: string;
  graduationYear?: string;
  additional: string;
}

export interface ProfessionData {
  occupation: string;
  designation: string;
  company: string;
  workLocation: string;
  annualIncome: string;
  careerGoals?: string;
  industry?: string;
  businessDetails: string;
}

export interface FamilyData {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  siblings: SiblingItem[];
  familyType: string;
  familyValues: string;
  nativePlace: string;
  familyBackground?: string;
}

export interface AstrologyData {
  religion: string;
  caste: string;
  subCaste: string;
  gotra: string;
  rashi: string;
  nakshatra: string;
  manglik: string;
  kuldevta: string;
}

export interface LifestyleData {
  food: string;
  smoking: string;
  drinking: string;
  hobbies: string;
  interests: string;
  languages: string;
}

export interface ContactData {
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface PartnerPreferencesData {
  ageRange?: string;
  height?: string;
  education?: string;
  profession?: string;
  location?: string;
  qualities?: string;
}

export interface FormDataModel {
  profile: ProfileData;
  personal: PersonalDetailsData;
  education: EducationData;
  profession: ProfessionData;
  family: FamilyData;
  astrology: AstrologyData;
  lifestyle: LifestyleData;
  contact: ContactData;
  about: string;
  partnerExpectations: string;
  partnerPreferences?: PartnerPreferencesData;
  customFields: CustomFieldItem[];
}

export const DEFAULT_SECTION_VISIBILITY: SectionVisibility = {
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

export const SECTION_TITLES: Record<SectionKey, string> = {
  personal: 'Personal Details',
  education: 'Education',
  profession: 'Professional Details',
  family: 'Family Details',
  astrology: 'Religion & Astrology',
  lifestyle: 'Lifestyle & Interests',
  contact: 'Contact Details',
  about: 'About Me',
  expectations: 'Partner Expectations',
  custom: 'Additional Information',
};

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function formatDateOfBirth(raw?: string): string {
  if (!raw) return '';
  const trimmed = raw.trim();
  const match = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return trimmed;
  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);
  if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
    return `${day} ${MONTH_NAMES[month - 1]} ${year}`;
  }
  return trimmed;
}

export function formatTimeOfBirth(raw?: string): string {
  if (!raw) return '';
  const trimmed = raw.trim();
  const match = trimmed.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return trimmed;
  const hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${String(displayHours).padStart(2, '0')}:${minutes} ${period}`;
}

export function calculateAgeFromDob(dob?: string): string {
  if (!dob) return '';
  const match = dob.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return '';
  const y = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const d = parseInt(match[3], 10);
  const now = new Date();
  let age = now.getFullYear() - y;
  if (now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)) {
    age -= 1;
  }
  return age >= 0 && age < 120 ? `${age} years` : '';
}

function cleanVal(val?: any): string {
  if (val === null || val === undefined) return '';
  return String(val).trim();
}

function buildRows(entries: [string, string | undefined | null][]): ResolvedSectionRow[] {
  return entries
    .map(([label, val]) => ({ label, value: cleanVal(val) }))
    .filter((row) => row.value.length > 0);
}

/**
 * Resolves the structured user form data and section visibility into the
 * standard BiodataModel that all template renderers consume.
 * Filters empty rows automatically to collapse unused fields.
 */
export function resolveBiodata(
  formData: FormDataModel,
  enabled: SectionVisibility = DEFAULT_SECTION_VISIBILITY
): BiodataModel {
  const sections: ResolvedSection[] = [];

  const addSection = (
    key: SectionKey,
    rows: ResolvedSectionRow[],
    text?: string
  ) => {
    if (!enabled[key]) return;
    const cleanText = cleanVal(text);
    if (rows.length > 0 || cleanText.length > 0) {
      sections.push({
        key,
        title: SECTION_TITLES[key],
        rows,
        text: cleanText || undefined,
      });
    }
  };

  // 1. Personal Details
  const p = formData.personal;
  const dobFormatted = formatDateOfBirth(p.dateOfBirth);
  const tobFormatted = formatTimeOfBirth(p.timeOfBirth);
  const computedAge = cleanVal(p.age) || calculateAgeFromDob(p.dateOfBirth);

  addSection(
    'personal',
    buildRows([
      ['Gender', p.gender],
      ['Date of Birth', dobFormatted],
      ['Time of Birth', tobFormatted],
      ['Place of Birth', p.placeOfBirth],
      ['Age', computedAge],
      ['Height', p.height],
      ['Weight', p.weight],
      ['Blood Group', p.bloodGroup],
      ['Complexion', p.complexion],
      ['Marital Status', p.maritalStatus],
      ['Nationality', p.nationality],
      ['Mother Tongue', p.motherTongue],
      ['Current City', p.currentCity],
    ])
  );

  // 2. Education
  const e = formData.education;
  addSection(
    'education',
    buildRows([
      ['Highest Qualification', e.highestQualification],
      ['Degree', e.degree],
      ['College / University', e.institution],
      ['Graduation Year', e.graduationYear],
      ['Additional Education', e.additional],
    ])
  );

  // 3. Profession
  const pr = formData.profession;
  addSection(
    'profession',
    buildRows([
      ['Occupation', pr.occupation],
      ['Designation', pr.designation],
      ['Company', pr.company],
      ['Work Location', pr.workLocation],
      ['Annual Income', pr.annualIncome],
      ['Career Goals', pr.careerGoals],
      ['Industry', pr.industry],
      ['Business Details', pr.businessDetails],
    ])
  );

  // 4. Family Details
  const f = formData.family;
  const siblingRows: ResolvedSectionRow[] = [];
  if (Array.isArray(f.siblings)) {
    const brotherCount = f.siblings.filter((s) => s.relation === 'Brother').length;
    const sisterCount = f.siblings.filter((s) => s.relation === 'Sister').length;
    let bIdx = 0;
    let sIdx = 0;
    f.siblings.forEach((s) => {
      const name = cleanVal(s.name);
      const details = cleanVal(s.details);
      if (!name && !details) return;
      let label: string = s.relation;
      if (s.relation === 'Brother') {
        bIdx++;
        if (brotherCount > 1) label = `Brother ${bIdx}`;
      } else {
        sIdx++;
        if (sisterCount > 1) label = `Sister ${sIdx}`;
      }
      const val = name && details ? `${name} (${details})` : name || details;
      siblingRows.push({ label, value: val });
    });
  }

  addSection('family', [
    ...buildRows([
      ["Father's Name", f.fatherName],
      ["Father's Occupation", f.fatherOccupation],
      ["Mother's Name", f.motherName],
      ["Mother's Occupation", f.motherOccupation],
    ]),
    ...siblingRows,
    ...buildRows([
      ['Family Type', f.familyType],
      ['Family Values', f.familyValues],
      ['Native Place', f.nativePlace],
      ['Family Background', f.familyBackground],
    ]),
  ]);

  // 5. Astrology
  const a = formData.astrology;
  addSection(
    'astrology',
    buildRows([
      ['Religion', a.religion],
      ['Caste', a.caste],
      ['Sub-caste', a.subCaste],
      ['Gotra', a.gotra],
      ['Rashi', a.rashi],
      ['Nakshatra', a.nakshatra],
      ['Manglik', a.manglik],
      ['Kuldevta', a.kuldevta],
    ])
  );

  // 6. Lifestyle
  const l = formData.lifestyle;
  addSection(
    'lifestyle',
    buildRows([
      ['Food Preference', l.food],
      ['Smoking', l.smoking],
      ['Drinking', l.drinking],
      ['Hobbies', l.hobbies],
      ['Interests', l.interests],
      ['Languages Known', l.languages],
    ])
  );

  // 7. Contact
  const c = formData.contact;
  const fullAddress = [c.address, c.city, c.state, c.country]
    .map(cleanVal)
    .filter(Boolean)
    .join(', ');

  addSection(
    'contact',
    buildRows([
      ['Contact Person', c.contactPerson],
      ['Phone', c.phone],
      ['Email', c.email],
      ['Address', fullAddress],
    ])
  );

  // 8. About Me
  addSection('about', [], formData.about);

  // 9. Expectations / Partner Preferences
  const pref = formData.partnerPreferences;
  const prefRows = pref
    ? buildRows([
        ['Age Range', pref.ageRange],
        ['Height', pref.height],
        ['Education', pref.education],
        ['Profession', pref.profession],
        ['Preferred Location', pref.location],
        ['Desired Qualities', pref.qualities],
      ])
    : [];

  addSection('expectations', prefRows, formData.partnerExpectations);

  // 10. Custom Fields
  const customRows: ResolvedSectionRow[] = [];
  if (Array.isArray(formData.customFields)) {
    formData.customFields.forEach((cf) => {
      const lbl = cleanVal(cf.label);
      const val = cleanVal(cf.value);
      if (lbl && val) {
        customRows.push({ label: lbl, value: val });
      }
    });
  }
  addSection('custom', customRows);

  const candidateName = cleanVal(p.fullName) || 'Your Full Name';
  const subtitle = [cleanVal(pr.designation) || cleanVal(pr.occupation), cleanVal(pr.company)]
    .filter(Boolean)
    .join(' at ');

  const quote =
    cleanVal(formData.profile.quote) ||
    '“Rooted in culture, growing with values, seeking a life partner for a meaningful journey.”';

  return {
    name: candidateName,
    subtitle: subtitle || undefined,
    photo: formData.profile.photo || undefined,
    godSymbol: formData.profile.godSymbol,
    blessing: cleanVal(formData.profile.blessing) || undefined,
    quote,
    sections,
  };
}
