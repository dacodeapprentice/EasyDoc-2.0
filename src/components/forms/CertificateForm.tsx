import React, { useState } from 'react';
import { CertificateData, LanguageCode } from '../../types/document';
import { ChevronDown, ChevronUp, Award, Users, FileText } from 'lucide-react';
import { getTranslation } from '../../utils/i18n';

interface CertificateFormProps {
  data: CertificateData;
  onChange: (updated: CertificateData) => void;
  lang?: LanguageCode;
}

export const CertificateForm: React.FC<CertificateFormProps> = ({
  data,
  onChange,
  lang = 'en',
}) => {
  const t = (k: string) => getTranslation(lang, k);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    distinction: true,
    signatories: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateField = <K extends keyof CertificateData>(
    field: K,
    value: CertificateData[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4 text-sm font-sans-title">
      {/* 1. Recipient & Distinction */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('distinction')}
          className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-800">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Recipient & Achievement Distinction</span>
          </div>
          {openSections.distinction ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.distinction && (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('cert_recipient')} *
              </label>
              <input
                type="text"
                value={data.recipientName}
                onChange={(e) => updateField('recipientName', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-bold"
                placeholder="Genevieve Moreau"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Certificate Title
              </label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => updateField('title', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="Certificate of Professional Excellence"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('cert_org')}
              </label>
              <input
                type="text"
                value={data.issuingOrganization}
                onChange={(e) => updateField('issuingOrganization', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="The Green Heritage Engineering Institute"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('cert_distinction')}
              </label>
              <input
                type="text"
                value={data.courseOrAchievement}
                onChange={(e) => updateField('courseOrAchievement', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="Advanced Sustainable Infrastructure & Carbon Lifecycle Assessment"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('cert_date')}
              </label>
              <input
                type="text"
                value={data.dateOfAward}
                onChange={(e) => updateField('dateOfAward', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="October 1, 2026"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Certificate Registry ID
              </label>
              <input
                type="text"
                value={data.certificateId}
                onChange={(e) => updateField('certificateId', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="CERT-2026-ENV-4921"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('cert_citation')}
              </label>
              <textarea
                rows={3}
                value={data.description}
                onChange={(e) => updateField('description', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded text-xs bg-white text-slate-900 leading-relaxed focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="In formal recognition of exceptional dedication, rigorous technical analysis..."
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Institutional Signatories */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('signatories')}
          className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-800">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>Institutional Signatories</span>
          </div>
          {openSections.signatories ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.signatories && (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('primary_signatory')}
              </label>
              <input
                type="text"
                value={data.primarySignatoryName}
                onChange={(e) => updateField('primarySignatoryName', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="Dr. Henrik Lindqvist"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('primary_title')}
              </label>
              <input
                type="text"
                value={data.primarySignatoryTitle}
                onChange={(e) => updateField('primarySignatoryTitle', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="Dean of Engineering & Sustainable Systems"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('secondary_signatory')}
              </label>
              <input
                type="text"
                value={data.secondarySignatoryName}
                onChange={(e) => updateField('secondarySignatoryName', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="Margaret O’Connor, PE"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('secondary_title')}
              </label>
              <input
                type="text"
                value={data.secondarySignatoryTitle}
                onChange={(e) => updateField('secondarySignatoryTitle', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="Executive Director of Institutional Accreditation"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
