export type SectionKey =
  | "personal"
  | "education"
  | "profession"
  | "family"
  | "astrology"
  | "lifestyle"
  | "contact"
  | "about"
  | "expectations"
  | "custom";

export interface GodSymbol {
  name: string;
  src: string;
}

export interface ProfileData {
  /** Data URL of the (cropped) profile photo. */
  photo?: string;
  /** Optional blessing line shown at the top, e.g. "|| Shree Ganeshaya Namah ||". */
  blessing?: string;
  /** Optional religious symbol. */
  godSymbol?: GodSymbol;
}

export interface PersonalData {
  fullName?: string;
  gender?: string;
  dateOfBirth?: string; // ISO yyyy-mm-dd
  timeOfBirth?: string; // HH:mm
  placeOfBirth?: string;
  age?: string;
  height?: string;
  weight?: string;
  bloodGroup?: string;
  complexion?: string;
  maritalStatus?: string;
}

export interface EducationData {
  highestQualification?: string;
  degree?: string;
  institution?: string;
  additional?: string;
}

export interface ProfessionData {
  occupation?: string;
  company?: string;
  designation?: string;
  workLocation?: string;
  annualIncome?: string;
  businessDetails?: string;
}

export interface Sibling {
  id: string;
  relation: "Brother" | "Sister";
  name?: string;
  details?: string;
}

export interface FamilyData {
  fatherName?: string;
  fatherOccupation?: string;
  motherName?: string;
  motherOccupation?: string;
  siblings: Sibling[];
  familyType?: string;
  familyValues?: string;
  nativePlace?: string;
}

export interface ContactData {
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface AstrologyData {
  religion?: string;
  caste?: string;
  subCaste?: string;
  gotra?: string;
  rashi?: string;
  nakshatra?: string;
  manglik?: string;
  kuldevta?: string;
}

export interface LifestyleData {
  food?: string;
  smoking?: string;
  drinking?: string;
  hobbies?: string;
  interests?: string;
  languages?: string;
}

export interface CustomField {
  id: string;
  label: string;
  value: string;
}

/** The single data contract used by the form, preview, every template and every export. */
export interface BiodataData {
  profile: ProfileData;
  godSymbol?: GodSymbol;
  personal: PersonalData;
  education: EducationData;
  profession: ProfessionData;
  family: FamilyData;
  astrology: AstrologyData;
  lifestyle: LifestyleData;
  contact: ContactData;
  about?: string;
  partnerExpectations?: string;
  customFields: CustomField[];
}

export type EnabledSections = Record<SectionKey, boolean>;

export interface Row {
  label: string;
  value: string;
}

/** A section after empty rows have been removed. Templates render these. */
export interface ResolvedSection {
  key: SectionKey;
  title: string;
  rows: Row[];
  /** Long-form text for `about` / `expectations`. */
  text?: string;
}

export interface BiodataViewModel {
  name: string;
  photo?: string;
  blessing?: string;
  godSymbol?: GodSymbol;
  /** Short line under the name, e.g. "Software Engineer, Pune". */
  subtitle: string;
  sections: ResolvedSection[];
  byKey: Partial<Record<SectionKey, ResolvedSection>>;
  isEmpty: boolean;
}
