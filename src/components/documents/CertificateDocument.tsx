import React from 'react';
import { CertificateData, DocumentStyle, ColorTheme, LanguageCode } from '../../types/document';
import { Award, CheckCircle } from 'lucide-react';
import { getTranslation } from '../../utils/i18n';

interface CertificateDocumentProps {
  data: CertificateData;
  style: DocumentStyle;
  theme: ColorTheme;
  lang?: LanguageCode;
}

export const CertificateDocument: React.FC<CertificateDocumentProps> = ({
  data,
  style,
  theme,
  lang = 'en',
}) => {
  const t = (k: string) => getTranslation(lang, k);
  const fontClass = style.fontFamily === 'lora' ? 'font-serif-lora' : 'font-serif-reading';

  return (
    <div
      className={`bg-white text-slate-900 w-full min-h-[1050px] transition-all relative p-10 sm:p-14 ${fontClass} flex flex-col justify-between`}
      style={{
        boxSizing: 'border-box',
      }}
    >
      {/* Ornate Double Border */}
      <div
        className="absolute inset-4 sm:inset-6 pointer-events-none border-2"
        style={{ borderColor: theme.primary }}
      />
      <div
        className="absolute inset-5 sm:inset-7 pointer-events-none border"
        style={{ borderColor: theme.border }}
      />

      {/* Top Header & Emblem */}
      <div className="relative text-center pt-4">
        <div className="flex justify-center mb-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-xs"
            style={{ backgroundColor: theme.primaryLight }}
          >
            <Award className="w-6 h-6" style={{ color: theme.primary }} />
          </div>
        </div>

        <p className="font-sans-title text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
          {data.issuingOrganization || 'Academy of Professional Excellence'}
        </p>
        <h1
          className="font-sans-title text-2xl sm:text-4xl font-extrabold tracking-tight"
          style={{ color: theme.textHeader }}
        >
          {data.title || 'Certificate of Achievement'}
        </h1>
        <div className="w-16 h-1 mx-auto mt-3 rounded-full" style={{ backgroundColor: theme.primary }} />
      </div>

      {/* Main Body */}
      <div className="relative text-center my-8 max-w-xl mx-auto space-y-4">
        <p className="font-sans-title text-xs uppercase tracking-wider text-slate-500">
          {t('in_recognition')}
        </p>

        <h2
          className="font-sans-title text-3xl sm:text-4xl font-extrabold"
          style={{ color: theme.primaryDark }}
        >
          {data.recipientName || 'Recipient Name'}
        </h2>

        <p className="text-sm sm:text-base leading-relaxed text-slate-700 italic pt-2">
          {data.description ||
            'For demonstrated mastery, rigorous academic scholarship, and distinguished technical leadership.'}
        </p>

        {data.courseOrAchievement && (
          <div
            className="font-sans-title text-sm sm:text-base font-bold py-2 px-4 rounded-md inline-block mt-2 border"
            style={{
              backgroundColor: theme.primaryLight,
              color: theme.primaryDark,
              borderColor: `${theme.primary}30`,
            }}
          >
            {data.courseOrAchievement}
          </div>
        )}

        <div className="font-sans-title text-xs text-slate-500 pt-3">
          {t('awarded_on')}:{' '}
          <strong className="text-slate-800">{data.dateOfAward || 'October 1, 2026'}</strong>
        </div>
      </div>

      {/* Dual Signatures & Seal Footer */}
      <div className="relative border-t border-slate-200 pt-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-6 font-sans-title text-xs">
        {/* Primary Signatory */}
        <div className="text-center sm:text-left">
          <div className="w-36 h-0.5 bg-slate-400 mb-2 mx-auto sm:mx-0" />
          <div className="font-bold text-slate-900">{data.primarySignatoryName}</div>
          <div className="text-[11px] text-slate-500">{data.primarySignatoryTitle}</div>
        </div>

        {/* Center Seal */}
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full border-2 border-dashed flex flex-col items-center justify-center p-1 mx-auto"
            style={{ borderColor: theme.primary }}
          >
            <CheckCircle className="w-4 h-4 mb-0.5" style={{ color: theme.primary }} />
            <span className="text-[8px] font-bold uppercase tracking-wider text-slate-600">
              {t('verified')}
            </span>
          </div>
          <div className="text-[9px] font-mono-tabular text-slate-400 mt-1">
            {data.certificateId || 'CERT-0000'}
          </div>
        </div>

        {/* Secondary Signatory */}
        <div className="text-center sm:text-right">
          <div className="w-36 h-0.5 bg-slate-400 mb-2 mx-auto sm:ml-auto" />
          <div className="font-bold text-slate-900">{data.secondarySignatoryName}</div>
          <div className="text-[11px] text-slate-500">{data.secondarySignatoryTitle}</div>
        </div>
      </div>
    </div>
  );
};
