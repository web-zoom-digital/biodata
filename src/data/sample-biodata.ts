import type { BiodataData } from "@/types/biodata";

interface AvatarStyle {
  bgTop: string;
  bgBottom: string;
  skin: string;
  hair: string;
  cloth: string;
  longHair?: boolean;
}

/** Original, illustrated placeholder portrait (not a real person). Returned as a data URL so exports work offline. */
function avatar(s: AvatarStyle) {
  const hair = s.longHair
    ? `<path d="M118 150c-6-58 26-84 62-84s68 26 62 84c-4 44 6 78 14 96h-152c8-18 18-52 14-96z" fill="${s.hair}"/>`
    : `<path d="M126 132c2-40 26-58 54-58s52 18 54 58c-14-22-34-30-54-30s-40 8-54 30z" fill="${s.hair}"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 450"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.bgTop}"/><stop offset="1" stop-color="${s.bgBottom}"/></linearGradient></defs><rect width="360" height="450" fill="url(#g)"/>${s.longHair ? hair : ""}<path d="M70 450c0-84 50-120 110-120s110 36 110 120z" fill="${s.cloth}"/><rect x="160" y="270" width="40" height="70" rx="18" fill="${s.skin}"/><ellipse cx="180" cy="195" rx="58" ry="72" fill="${s.skin}"/>${s.longHair ? "" : hair}<path d="M150 214q30 22 60 0" stroke="#7a3f2b" stroke-width="4" fill="none" stroke-linecap="round" opacity=".55"/><circle cx="160" cy="188" r="4.5" fill="#3b2a22"/><circle cx="200" cy="188" r="4.5" fill="#3b2a22"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const SAMPLE_PHOTO_BOY = avatar({
  bgTop: "#d9efe6",
  bgBottom: "#a7d4c2",
  skin: "#c98f6b",
  hair: "#1f1a17",
  cloth: "#2c3e50",
});

export const SAMPLE_PHOTO_GIRL = avatar({
  bgTop: "#f8e1e4",
  bgBottom: "#e9b7c0",
  skin: "#d39a76",
  hair: "#241a17",
  cloth: "#8c2f45",
  longHair: true,
});

export const DEFAULT_GOD_SYMBOL_SAMPLE = {
  name: "Ganesha Image 1",
  src: "/god_symbol/ganesha_image_1.png",
};

/** Demo content only. The people, numbers and addresses are fictional. */
export const SAMPLE_BIODATA_BOY: BiodataData = {
  profile: {
    photo: SAMPLE_PHOTO_BOY,
    blessing: "|| Shree Ganeshaya Namah ||",
    godSymbol: DEFAULT_GOD_SYMBOL_SAMPLE,
  },
  godSymbol: DEFAULT_GOD_SYMBOL_SAMPLE,
  personal: {
    fullName: "Aarav Sharma",
    gender: "",
    dateOfBirth: "1999-03-12",
    timeOfBirth: "06:45",
    placeOfBirth: "Jaipur, Rajasthan",
    age: "",
    height: "5 ft 10 in",
    weight: "",
    bloodGroup: "B+",
    complexion: "Wheatish",
    maritalStatus: "Never married",
  },
  education: {
    highestQualification: "B.Tech in Computer Science",
    degree: "Bachelor of Technology",
    institution: "Malaviya National Institute of Technology, Jaipur",
    additional: "",
  },
  profession: {
    occupation: "Software Engineer",
    company: "Tech Solutions Pvt. Ltd.",
    designation: "Senior Software Engineer",
    workLocation: "Gurugram, Haryana",
    annualIncome: "INR 18 LPA",
    businessDetails: "",
  },
  family: {
    fatherName: "Rajesh Sharma",
    fatherOccupation: "Retired Bank Manager",
    motherName: "Sunita Sharma",
    motherOccupation: "Homemaker",
    siblings: [{ id: "sib_demo1", relation: "Sister", name: "Riya Sharma", details: "Younger, MBA student" }],
    familyType: "Nuclear",
    familyValues: "",
    nativePlace: "Jaipur, Rajasthan",
  },
  astrology: {
    religion: "Hindu",
    caste: "Brahmin",
    subCaste: "",
    gotra: "Kashyap",
    rashi: "Mithun",
    nakshatra: "Ardra",
    manglik: "No",
    kuldevta: "",
  },
  lifestyle: {
    food: "Vegetarian",
    smoking: "No",
    drinking: "No",
    hobbies: "Traveling, Photography, Music",
    interests: "",
    languages: "Hindi, English, Rajasthani",
  },
  contact: {
    contactPerson: "Rajesh Sharma (Father)",
    phone: "+91 98765 43210",
    email: "family.sharma@example.com",
    address: "Sample Address, Sector 21",
    city: "Gurugram",
    state: "Haryana",
    country: "India",
  },
  about:
    "I am a calm, family-oriented person who enjoys my work and my weekends equally. I value honesty, humour and good conversation. I like to travel, cook on Sundays and stay close to my family.",
  partnerExpectations:
    "Looking for a well-educated, kind and independent partner who values family and respects traditions while being open to new ideas.",
  customFields: [{ id: "cf_demo1", label: "Marriage Plan", value: "Within the next 12 months" }],
};

export const SAMPLE_BIODATA_GIRL: BiodataData = {
  profile: {
    photo: SAMPLE_PHOTO_GIRL,
    blessing: "|| Shree Ganeshaya Namah ||",
    godSymbol: DEFAULT_GOD_SYMBOL_SAMPLE,
  },
  godSymbol: DEFAULT_GOD_SYMBOL_SAMPLE,
  personal: {
    fullName: "Ananya Verma",
    gender: "",
    dateOfBirth: "2000-11-05",
    timeOfBirth: "14:20",
    placeOfBirth: "Lucknow, Uttar Pradesh",
    age: "",
    height: "5 ft 4 in",
    weight: "",
    bloodGroup: "O+",
    complexion: "Fair",
    maritalStatus: "Never married",
  },
  education: {
    highestQualification: "M.Sc. in Chemistry",
    degree: "Master of Science",
    institution: "Banaras Hindu University",
    additional: "",
  },
  profession: {
    occupation: "Research Associate",
    company: "Sample Research Institute",
    designation: "Research Associate",
    workLocation: "Pune, Maharashtra",
    annualIncome: "INR 9 LPA",
    businessDetails: "",
  },
  family: {
    fatherName: "Anil Verma",
    fatherOccupation: "Professor",
    motherName: "Meena Verma",
    motherOccupation: "School Teacher",
    siblings: [{ id: "sib_demo2", relation: "Brother", name: "Kabir Verma", details: "Elder, Civil Engineer" }],
    familyType: "Joint",
    familyValues: "",
    nativePlace: "Lucknow, Uttar Pradesh",
  },
  astrology: {
    religion: "Hindu",
    caste: "Kayastha",
    subCaste: "",
    gotra: "",
    rashi: "Vrishchik",
    nakshatra: "",
    manglik: "No",
    kuldevta: "",
  },
  lifestyle: {
    food: "Vegetarian",
    smoking: "No",
    drinking: "No",
    hobbies: "Kathak, Painting, Gardening",
    interests: "",
    languages: "Hindi, English, Urdu",
  },
  contact: {
    contactPerson: "Anil Verma (Father)",
    phone: "+91 91234 56789",
    email: "family.verma@example.com",
    address: "Sample Colony, Gomti Nagar",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
  },
  about:
    "I enjoy science, art and long conversations over chai. I am ambitious about my career and equally committed to building a warm, respectful home.",
  partnerExpectations:
    "Seeking a supportive and well-settled partner with a good sense of humour, who values family bonds and personal growth.",
  customFields: [],
};

export const SAMPLE_BIODATA = SAMPLE_BIODATA_BOY;
