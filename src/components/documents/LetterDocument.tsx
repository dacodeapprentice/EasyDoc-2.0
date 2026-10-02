import React from 'react';
import { LetterData, DocumentStyle, ColorTheme, LanguageCode } from '../../types/document';
import { Mail, Phone, MapPin } from 'lucide-react';
import { getTranslation } from '../../utils/i18n';

interface LetterDocumentProps {
  data: LetterData;
  style: DocumentStyle;
  theme: ColorTheme;
  lang?: LanguageCode;
}

export const LetterDocument: React.FC<LetterDocumentProps> = ({
  data,
  style,
  theme,
  lang = 'en',
}) => {
  const t = (k: string) => getTranslation(lang, k);
  const fontClass = style.fontFamily === 'lora' ? 'font-serif-lora' : 'font-serif-reading';
  const densityPadding =
    style.density === 'compact'
      ? 'p-8 sm:p-10'
      : style.density === 'generous'
      ? 'p-12 sm:p-16'
      : 'p-10 sm:p-14';

  return (
    <div
      className={`bg-white text-slate-900 w-full min-h-[1050px] transition-all relative ${densityPadding} ${fontClass}`}
      style={{
        boxSizing: 'border-box',
      }}
    >
      {/* Decorative Accents */}
      {style.headerStyle === 'left-bar' && (
        <div
          className="absolute left-0 top-0 bottom-0 w-2.5"
          style={{ backgroundColor: theme.primary }}
        />
      )}
      {style.headerStyle === 'banner' && (
        <div
          className="absolute left-0 top-0 right-0 h-3"
          style={{ backgroundColor: theme.primary }}
        />
      )}

      {/* Header: Sender Letterhead */}
      <header className="border-b pb-6 mb-8 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            {data.logoUrl && (
              <img
                src={data.logoUrl}
                alt="Logo"
                className="w-14 h-14 object-contain rounded-md border border-slate-200 shrink-0"
              />
            )}
            <div>
              <h1
                className="font-sans-title text-2xl sm:text-3xl font-extrabold tracking-tight"
                style={{ color: theme.textHeader }}
              >
                {data.senderName || t('sender_name')}
              </h1>
              {data.senderTitle && (
                <p className="font-sans-title text-sm font-semibold mt-0.5" style={{ color: theme.primary }}>
                  {data.senderTitle}
                </p>
              )}
              {data.senderCompany && (
                <p className="font-sans-title text-xs text-slate-600 font-medium mt-0.5">
                  {data.senderCompany}
                </p>
              )}
            </div>
          </div>

          {/* Sender Contact Column */}
          <div className="text-left sm:text-right font-sans-title text-xs text-slate-500 space-y-1">
            {data.senderAddress && (
              <div className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{data.senderAddress}</span>
              </div>
            )}
            {data.senderEmail && (
              <div className="flex items-center sm:justify-end gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{data.senderEmail}</span>
              </div>
            )}
            {data.senderPhone && (
              <div className="flex items-center sm:justify-end gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{data.senderPhone}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Date */}
      <div className="mb-6 font-sans-title text-xs font-semibold text-slate-600">
        {data.date || 'October 1, 2026'}
      </div>

      {/* Recipient Block */}
      <div className="mb-7 font-sans-title text-xs leading-relaxed print-avoid-break">
        <div className="font-bold text-slate-900 text-sm">{data.recipientName}</div>
        {data.recipientTitle && <div className="text-slate-700">{data.recipientTitle}</div>}
        {data.recipientCompany && (
          <div className="text-slate-800 font-semibold">{data.recipientCompany}</div>
        )}
        {data.recipientAddress && <div className="text-slate-600 mt-0.5">{data.recipientAddress}</div>}
      </div>

      {/* Subject Line */}
      {data.subject && (
        <div
          className="mb-6 py-2 px-3 bg-slate-50 border-l-4 font-sans-title font-bold text-sm text-slate-900 print-avoid-break"
          style={{ borderColor: theme.primary }}
        >
          <span className="text-xs uppercase tracking-wider text-slate-500 mr-1.5">{t('formal_subject')}:</span>
          <span>{data.subject}</span>
        </div>
      )}

      {/* Salutation */}
      <div className="font-sans-title font-semibold text-slate-900 text-sm mb-4">
        {data.salutation || 'Dear Colleague,'}
      </div>

      {/* Letter Body Paragraphs */}
      <div className="space-y-4 text-sm leading-relaxed text-slate-800">
        {data.openingParagraph && <p>{data.openingParagraph}</p>}
        {data.bodyParagraphOne && <p>{data.bodyParagraphOne}</p>}
        {data.bodyParagraphTwo && <p>{data.bodyParagraphTwo}</p>}
        {data.closingParagraph && <p>{data.closingParagraph}</p>}
      </div>

      {/* Formal Signoff & Signature */}
      <div className="mt-8 pt-4 font-sans-title print-avoid-break">
        <div className="text-xs text-slate-600">{data.signoff || t('formal_signoff')}</div>
        <div className="font-bold text-slate-900 text-sm mt-5">{data.senderName}</div>
        {data.senderTitle && <div className="text-xs text-slate-600">{data.senderTitle}</div>}
        {data.senderCompany && <div className="text-xs text-slate-500">{data.senderCompany}</div>}

        {data.enclosureNotice && (
          <div className="mt-6 pt-3 border-t border-slate-200 text-[11px] text-slate-500 italic">
            {data.enclosureNotice}
          </div>
        )}
      </div>
    </div>
  );
};
