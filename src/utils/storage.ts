import {
  DocumentType,
  DocumentStyle,
  LanguageCode,
  CvData,
  LetterData,
  CensusData,
  ReceiptData,
  CertificateData,
} from '../types/document';

export interface SavedProjectState {
  version: string;
  savedAt: string;
  currentType: DocumentType;
  style: DocumentStyle;
  lang?: LanguageCode;
  cvData: CvData;
  letterData: LetterData;
  censusData: CensusData;
  receiptData: ReceiptData;
  certificateData: CertificateData;
}

const PRIMARY_STORAGE_KEY = 'easydoc_autosave_v2';
const LEGACY_STORAGE_KEY = 'docuform_studio_autosave_v2';

export function saveAutoSave(state: SavedProjectState): void {
  try {
    localStorage.setItem(PRIMARY_STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('Could not auto-save to localStorage (quota or disabled):', err);
  }
}

export function loadAutoSave(): SavedProjectState | null {
  try {
    const raw = localStorage.getItem(PRIMARY_STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedProjectState;
  } catch (err) {
    console.warn('Failed to load auto-saved data from localStorage:', err);
    return null;
  }
}

export function clearAutoSave(): void {
  try {
    localStorage.removeItem(PRIMARY_STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    // Ignore
  }
}

export function saveProjectToFile(state: SavedProjectState): void {
  const blob = new Blob([JSON.stringify(state, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `EasyDoc_${state.currentType}_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function loadProjectFromFile(): Promise<SavedProjectState> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';

    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const parsed = JSON.parse(evt.target?.result as string);
          resolve(parsed as SavedProjectState);
        } catch {
          reject(new Error('Invalid project file format'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    };

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  });
}
