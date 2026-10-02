import React from 'react';
import { DocumentType, LanguageCode } from '../types/document';
import { FileText, Mail, FileSpreadsheet, Receipt, Award } from 'lucide-react';
import { getTranslation } from '../utils/i18n';

interface DocumentSelectorProps {
  currentType: DocumentType;
  onSelect: (type: DocumentType) => void;
  lang?: LanguageCode;
}

export const DocumentSelector: React.FC<DocumentSelectorProps> = ({
  currentType,
  onSelect,
  lang = 'en',
}) => {
  const t = (k: string) => getTranslation(lang, k);

  const options: Array<{
    type: DocumentType;
    title: string;
    description: string;
    icon: React.ReactNode;
  }> = [
    {
      type: 'cv',
      title: t('curriculum_vitae'),
      description: 'Professional resume with career history, education, skills, and optional portrait photo.',
      icon: <FileText className="w-5 h-5 text-emerald-600" />,
    },
    {
      type: 'letter',
      title: t('presentation_letter'),
      description: 'Formal business correspondence and cover letter with executive letterhead and branding.',
      icon: <Mail className="w-5 h-5 text-emerald-600" />,
    },
    {
      type: 'census',
      title: t('census_record'),
      description: 'Official household demographic survey with dwelling characteristics and resident roster.',
      icon: <FileSpreadsheet className="w-5 h-5 text-emerald-600" />,
    },
    {
      type: 'receipt',
      title: t('payment_receipt'),
      description: 'Itemized commercial invoice and payment voucher with tax, discount, and balance totals.',
      icon: <Receipt className="w-5 h-5 text-emerald-600" />,
    },
    {
      type: 'certificate',
      title: t('certificate_award'),
      description: 'Distinguished certificate of achievement, completion, or honor with dual institutional signatories.',
      icon: <Award className="w-5 h-5 text-emerald-600" />,
    },
  ];

  return (
    <div className="space-y-3 font-sans-title">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
        {t('templates')}
      </div>
      <div className="grid grid-cols-1 gap-2.5">
        {options.map((option) => {
          const isSelected = currentType === option.type;
          return (
            <button
              key={option.type}
              type="button"
              onClick={() => onSelect(option.type)}
              className={`p-3.5 rounded-lg border text-left transition-all flex items-start gap-3.5 ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-600'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 bg-white'
              }`}
            >
              <div
                className={`p-2 rounded-md shrink-0 transition-colors ${
                  isSelected ? 'bg-emerald-100/70 text-emerald-800' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {option.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                    {option.title}
                  </h4>
                  {isSelected && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                      {lang === 'pt' ? 'Ativo' : lang === 'es' ? 'Activo' : lang === 'fr' ? 'Actif' : 'Active'}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {option.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
