import React, { useState } from 'react';
import { DocumentType, LanguageCode } from '../types/document';
import { Download, Printer, Loader2, Sparkles, Save, FolderOpen, Globe } from 'lucide-react';
import { LANGUAGES, getTranslation } from '../utils/i18n';

interface NavbarProps {
  currentType: DocumentType;
  onSelectType: (type: DocumentType) => void;
  onDownloadPdf: () => void;
  onPrint: () => void;
  isGeneratingPdf: boolean;
  onResetData: () => void;
  onSaveProgress: () => void;
  onLoadProgress: () => void;
  currentLang: LanguageCode;
  onChangeLang: (lang: LanguageCode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentType,
  onSelectType,
  onDownloadPdf,
  onPrint,
  isGeneratingPdf,
  onResetData,
  onSaveProgress,
  onLoadProgress,
  currentLang,
  onChangeLang,
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const t = (key: string) => getTranslation(currentLang, key);

  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-40 px-3 sm:px-4 lg:px-6 py-2 transition-colors w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 min-w-0">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="/"
            className="font-sans-title text-sm sm:text-base font-bold tracking-tight text-slate-900 flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
            <span>EasyDoc</span>
          </a>
        </div>

        {/* Zone 2: Navigation Links (visible on xl screens, scrollable) */}
        <nav className="hidden xl:flex items-center gap-2 2xl:gap-5 text-xs font-semibold text-slate-600 shrink min-w-0 overflow-x-auto py-0.5 custom-scrollbar">
          <button
            type="button"
            onClick={() => onSelectType('cv')}
            className={`transition-colors hover:text-slate-900 whitespace-nowrap pb-0.5 px-1.5 ${
              currentType === 'cv' ? 'text-emerald-700 border-b-2 border-emerald-600' : ''
            }`}
          >
            {t('curriculum_vitae')}
          </button>
          <button
            type="button"
            onClick={() => onSelectType('letter')}
            className={`transition-colors hover:text-slate-900 whitespace-nowrap pb-0.5 px-1.5 ${
              currentType === 'letter' ? 'text-emerald-700 border-b-2 border-emerald-600' : ''
            }`}
          >
            {t('presentation_letter')}
          </button>
          <button
            type="button"
            onClick={() => onSelectType('census')}
            className={`transition-colors hover:text-slate-900 whitespace-nowrap pb-0.5 px-1.5 ${
              currentType === 'census' ? 'text-emerald-700 border-b-2 border-emerald-600' : ''
            }`}
          >
            {t('census_record')}
          </button>
          <button
            type="button"
            onClick={() => onSelectType('receipt')}
            className={`transition-colors hover:text-slate-900 whitespace-nowrap pb-0.5 px-1.5 ${
              currentType === 'receipt' ? 'text-emerald-700 border-b-2 border-emerald-600' : ''
            }`}
          >
            {t('payment_receipt')}
          </button>
          <button
            type="button"
            onClick={() => onSelectType('certificate')}
            className={`transition-colors hover:text-slate-900 whitespace-nowrap pb-0.5 px-1.5 ${
              currentType === 'certificate' ? 'text-emerald-700 border-b-2 border-emerald-600' : ''
            }`}
          >
            {t('certificate_award')}
          </button>
        </nav>

        {/* Zone 3: Primary Actions & i18n */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 max-w-full">
          {/* Language Switcher */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
              title="Change Language"
            >
              <span>{LANGUAGES[currentLang].flag}</span>
              <span className="uppercase text-[10px] sm:text-[11px] font-bold">{currentLang}</span>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50 animate-in fade-in zoom-in-95">
                {(Object.keys(LANGUAGES) as LanguageCode[]).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      onChangeLang(code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-slate-50 transition-colors ${
                      currentLang === code ? 'font-bold text-emerald-700 bg-emerald-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{LANGUAGES[code].flag}</span>
                      <span>{LANGUAGES[code].name}</span>
                    </span>
                    {currentLang === code && <span className="text-emerald-600">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Save & Load Progress Buttons */}
          <button
            type="button"
            onClick={onSaveProgress}
            title={t('save_progress')}
            className="hidden sm:inline-flex items-center gap-1.5 p-1.5 2xl:px-2.5 2xl:py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            <Save className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden 2xl:inline">{t('save_progress')}</span>
          </button>

          <button
            type="button"
            onClick={onLoadProgress}
            title={t('load_progress')}
            className="hidden sm:inline-flex items-center gap-1.5 p-1.5 2xl:px-2.5 2xl:py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            <FolderOpen className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden 2xl:inline">{t('load_progress')}</span>
          </button>

          <button
            type="button"
            onClick={onResetData}
            title="Reload preset realistic example data"
            className="hidden md:inline-flex items-center gap-1.5 p-1.5 2xl:px-2.5 2xl:py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden 2xl:inline">{t('preset_data')}</span>
          </button>

          <button
            type="button"
            onClick={onPrint}
            title="Instant High-Resolution Browser Vector Print / Save PDF"
            className="inline-flex items-center gap-1 sm:gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden lg:inline">{t('print_vector')}</span>
          </button>

          <button
            type="button"
            onClick={onDownloadPdf}
            disabled={isGeneratingPdf}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-60 rounded-md transition-all shadow-xs whitespace-nowrap shrink-0"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">{t('exporting')}</span>
                <span className="sm:hidden">...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">{t('download_pdf')}</span>
                <span className="sm:hidden">PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
