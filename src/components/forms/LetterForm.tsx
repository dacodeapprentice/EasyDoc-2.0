import React, { useState } from 'react';
import { LetterData, LanguageCode } from '../../types/document';
import { ChevronDown, ChevronUp, Mail, User, FileText, CheckSquare } from 'lucide-react';
import { ImageUploadCrop } from '../ImageUploadCrop';
import { getTranslation } from '../../utils/i18n';

interface LetterFormProps {
  data: LetterData;
  onChange: (updated: LetterData) => void;
  lang?: LanguageCode;
}

export const LetterForm: React.FC<LetterFormProps> = ({ data, onChange, lang = 'en' }) => {
  const t = (k: string) => getTranslation(lang, k);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    sender: true,
    recipient: true,
    body: true,
    signoff: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateField = <K extends keyof LetterData>(field: K, value: LetterData[K]) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4 text-sm font-sans-title">
      {/* 1. Sender Letterhead */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('sender')}
          className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-800">
            <User className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('sender_letterhead')}</span>
          </div>
          {openSections.sender ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.sender && (
          <div className="p-4 space-y-4">
            <ImageUploadCrop
              label={t('company_logo')}
              shape="square"
              currentImage={data.logoUrl}
              onImageChange={(val) => updateField('logoUrl', val)}
              lang={lang}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('sender_name')} *
                </label>
                <input
                  type="text"
                  value={data.senderName}
                  onChange={(e) => updateField('senderName', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="Dr. Arthur Pendelton"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('sender_title')}
                </label>
                <input
                  type="text"
                  value={data.senderTitle}
                  onChange={(e) => updateField('senderTitle', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="Chief Medical Director"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('sender_company')}
                </label>
                <input
                  type="text"
                  value={data.senderCompany}
                  onChange={(e) => updateField('senderCompany', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="Cascadia Health Systems"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('phone_number')}
                </label>
                <input
                  type="tel"
                  value={data.senderPhone}
                  onChange={(e) => updateField('senderPhone', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="+1 (617) 555-0142"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('sender_address')}
                </label>
                <input
                  type="text"
                  value={data.senderAddress}
                  onChange={(e) => updateField('senderAddress', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="400 Harvard Medical Way, Boston, MA"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('email_address')}
                </label>
                <input
                  type="email"
                  value={data.senderEmail}
                  onChange={(e) => updateField('senderEmail', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="a.pendelton@cascadia.org"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('issue_date')}
                </label>
                <input
                  type="text"
                  value={data.date}
                  onChange={(e) => updateField('date', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="October 1, 2026"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Recipient Information */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('recipient')}
          className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-800">
            <Mail className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('recipient_details')}</span>
          </div>
          {openSections.recipient ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.recipient && (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('recipient_name')} *
              </label>
              <input
                type="text"
                value={data.recipientName}
                onChange={(e) => updateField('recipientName', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="Eleanor Vance, PE"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('recipient_title')}
              </label>
              <input
                type="text"
                value={data.recipientTitle}
                onChange={(e) => updateField('recipientTitle', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="Director of Sustainable Facilities"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('recipient_company')}
              </label>
              <input
                type="text"
                value={data.recipientCompany}
                onChange={(e) => updateField('recipientCompany', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="Metropolitan Civic Hospital Foundation"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('recipient_address')}
              </label>
              <input
                type="text"
                value={data.recipientAddress}
                onChange={(e) => updateField('recipientAddress', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="1200 Beacon Street, Cambridge, MA"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('formal_subject')}
              </label>
              <input
                type="text"
                value={data.subject}
                onChange={(e) => updateField('subject', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-semibold"
                placeholder="Letter of Introduction & Formal Project Partnership Proposal"
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. Letter Body Paragraphs */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('body')}
          className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-800">
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>Letter Body & Content Paragraphs</span>
          </div>
          {openSections.body ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.body && (
          <div className="p-4 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('salutation_greeting')}
              </label>
              <input
                type="text"
                value={data.salutation}
                onChange={(e) => updateField('salutation', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="Dear Ms. Vance,"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('opening_paragraph')}
              </label>
              <textarea
                rows={2}
                value={data.openingParagraph}
                onChange={(e) => updateField('openingParagraph', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded text-xs bg-white text-slate-900 leading-relaxed focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="It is my distinct privilege to write to you regarding our upcoming..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('body_paragraph_1')}
              </label>
              <textarea
                rows={3}
                value={data.bodyParagraphOne}
                onChange={(e) => updateField('bodyParagraphOne', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded text-xs bg-white text-slate-900 leading-relaxed focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="Main argument or narrative presentation..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('closing_paragraph')}
              </label>
              <textarea
                rows={2}
                value={data.closingParagraph}
                onChange={(e) => updateField('closingParagraph', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded text-xs bg-white text-slate-900 leading-relaxed focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="We look forward to an opportunity to collaborate..."
              />
            </div>
          </div>
        )}
      </div>

      {/* 4. Signoff & Enclosure */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('signoff')}
          className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-800">
            <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>Formal Signoff & Attachments</span>
          </div>
          {openSections.signoff ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.signoff && (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('formal_signoff')}
              </label>
              <input
                type="text"
                value={data.signoff}
                onChange={(e) => updateField('signoff', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="Respectfully and sincerely yours,"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('enclosure_notice')}
              </label>
              <input
                type="text"
                value={data.enclosureNotice}
                onChange={(e) => updateField('enclosureNotice', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="Enclosures: Detailed Technical Memorandum (12 pp.)"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
