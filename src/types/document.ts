export type DocumentType = 'cv' | 'letter' | 'census' | 'receipt' | 'certificate';

export type LanguageCode = 'en' | 'pt' | 'es' | 'fr';

export type ColorThemeId = 'slate-emerald' | 'navy-cerulean' | 'nordic-forest' | 'teal-aegean' | 'cobalt-seafoam';

export interface ColorTheme {
  id: ColorThemeId;
  name: string;
  primary: string; // e.g. #059669
  primaryDark: string; // e.g. #065f46
  primaryLight: string; // e.g. #ecfdf5
  secondary: string; // e.g. #0284c7
  accent: string; // e.g. #0d9488
  border: string; // e.g. #cbd5e1
  textHeader: string; // e.g. #0f172a
  tagColor: string;
  badgeBg: string;
  badgeText: string;
}

export type FontFamilyChoice = 'source-serif' | 'lora';
export type DensityChoice = 'compact' | 'standard' | 'generous';
export type HeaderStyleChoice = 'minimal' | 'left-bar' | 'banner' | 'classic';

export interface DocumentStyle {
  themeId: ColorThemeId;
  fontFamily: FontFamilyChoice;
  density: DensityChoice;
  headerStyle: HeaderStyleChoice;
  showWatermarkOrSeal: boolean;
}

// 1. CV Data Types
export interface WorkExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
  details: string;
}

export interface CvData {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  photoUrl?: string | null;
  experience: WorkExperienceItem[];
  education: EducationItem[];
  skills: string[];
  languages: string[];
}

// 2. Presentation Letter Data Types
export interface LetterData {
  senderName: string;
  senderTitle: string;
  senderCompany: string;
  senderAddress: string;
  senderEmail: string;
  senderPhone: string;
  logoUrl?: string | null;
  date: string;
  recipientName: string;
  recipientTitle: string;
  recipientCompany: string;
  recipientAddress: string;
  subject: string;
  salutation: string;
  openingParagraph: string;
  bodyParagraphOne: string;
  bodyParagraphTwo: string;
  closingParagraph: string;
  signoff: string;
  enclosureNotice: string;
}

// 3. Census / Household Demographic Record Types
export interface HouseholdMember {
  id: string;
  fullName: string;
  relationship: string;
  age: number | string;
  gender: string;
  educationLevel: string;
  occupation: string;
}

export interface CensusData {
  censusCode: string;
  districtRegion: string;
  enumerationArea: string;
  surveyDate: string;
  headOfHousehold: string;
  residentialAddress: string;
  dwellingType: string;
  tenureStatus: string;
  totalRooms: number | string;
  primaryWaterSource: string;
  electricityAccess: string;
  householdMembers: HouseholdMember[];
  officialNotes: string;
  enumeratorName: string;
  supervisorSignatureRef: string;
}

// 4. Official Receipt Data Types
export interface ReceiptItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface ReceiptData {
  receiptNumber: string;
  issueDate: string;
  paymentMethod: string;
  transactionRef: string;
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  businessTaxId: string;
  logoUrl?: string | null;
  customerName: string;
  customerCompany: string;
  customerEmail: string;
  customerAddress: string;
  items: ReceiptItem[];
  taxRatePercent: number;
  discountAmount: number;
  notes: string;
  cashierOrAgent: string;
}

// 5. Certificate Data Types
export interface CertificateData {
  certificateId: string;
  recipientName: string;
  title: string;
  courseOrAchievement: string;
  issuingOrganization: string;
  dateOfAward: string;
  description: string;
  sealUrl?: string | null;
  primarySignatoryName: string;
  primarySignatoryTitle: string;
  secondarySignatoryName: string;
  secondarySignatoryTitle: string;
}
