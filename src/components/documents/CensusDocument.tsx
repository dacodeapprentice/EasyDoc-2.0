import React from 'react';
import { CensusData, DocumentStyle, ColorTheme, LanguageCode } from '../../types/document';
import { ShieldCheck, FileSpreadsheet, MapPin, Calendar, Home } from 'lucide-react';
import { getTranslation } from '../../utils/i18n';

interface CensusDocumentProps {
  data: CensusData;
  style: DocumentStyle;
  theme: ColorTheme;
  lang?: LanguageCode;
}

export const CensusDocument: React.FC<CensusDocumentProps> = ({
  data,
  style,
  theme,
  lang = 'en',
}) => {
  const t = (k: string) => getTranslation(lang, k);
  const fontClass = style.fontFamily === 'lora' ? 'font-serif-lora' : 'font-serif-reading';
  const densityPadding =
    style.density === 'compact'
      ? 'p-6 sm:p-8'
      : style.density === 'generous'
      ? 'p-10 sm:p-14'
      : 'p-8 sm:p-12';

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

      {/* Header: Official Census Authority */}
      <header className="border-b pb-5 mb-6 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 rounded bg-slate-100 text-slate-700">
                <FileSpreadsheet className="w-4 h-4" style={{ color: theme.primary }} />
              </span>
              <span className="font-sans-title text-xs font-bold uppercase tracking-widest text-slate-500">
                {t('census_registry')}
              </span>
            </div>
            <h1
              className="font-sans-title text-2xl sm:text-3xl font-extrabold tracking-tight"
              style={{ color: theme.textHeader }}
            >
              Demographic Household Survey
            </h1>
            <p className="font-sans-title text-xs text-slate-600 mt-1">
              District Jurisdiction: <strong>{data.districtRegion || 'Metropolitan District'}</strong>
              {data.enumerationArea && ` · Area Code: ${data.enumerationArea}`}
            </p>
          </div>

          {/* Census Code Badge */}
          <div className="sm:text-right font-sans-title shrink-0">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider"
              style={{
                backgroundColor: theme.badgeBg,
                color: theme.badgeText,
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Record</span>
            </div>
            <div className="font-mono-tabular text-xs font-semibold text-slate-700 mt-1.5">
              ID: {data.censusCode || 'CENSUS-0000'}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {t('survey_date')}: {data.surveyDate || '—'}
            </div>
          </div>
        </div>
      </header>

      {/* Dwelling & Household Demographics */}
      <section className="mb-6 p-4 rounded-md border border-slate-200 bg-slate-50/70 font-sans-title text-xs print-avoid-break">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <div>
            <span className="text-slate-500 text-[11px] block">{t('head_household')}:</span>
            <strong className="text-slate-900 text-sm font-bold block mt-0.5">
              {data.headOfHousehold || '—'}
            </strong>
          </div>

          <div className="sm:col-span-2">
            <span className="text-slate-500 text-[11px] block">{t('residential_address')}:</span>
            <span className="text-slate-800 font-semibold block mt-0.5">
              {data.residentialAddress || '—'}
            </span>
          </div>

          <div>
            <span className="text-slate-500 text-[11px] block">{t('dwelling_type')}:</span>
            <span className="text-slate-800 font-medium block mt-0.5">{data.dwellingType}</span>
          </div>

          <div>
            <span className="text-slate-500 text-[11px] block">{t('tenure_status')}:</span>
            <span className="text-slate-800 font-medium block mt-0.5">{data.tenureStatus}</span>
          </div>

          <div>
            <span className="text-slate-500 text-[11px] block">{t('total_rooms')}:</span>
            <span className="text-slate-800 font-mono-tabular font-bold block mt-0.5">
              {data.totalRooms}
            </span>
          </div>

          <div>
            <span className="text-slate-500 text-[11px] block">{t('water_source')}:</span>
            <span className="text-slate-800 font-medium block mt-0.5">
              {data.primaryWaterSource}
            </span>
          </div>

          <div className="sm:col-span-2">
            <span className="text-slate-500 text-[11px] block">{t('electricity_access')}:</span>
            <span className="text-slate-800 font-medium block mt-0.5">
              {data.electricityAccess}
            </span>
          </div>
        </div>
      </section>

      {/* Household Residents Roster Table */}
      <section className="mb-6 print-avoid-break">
        <div className="flex items-center justify-between mb-2 font-sans-title">
          <h2
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: theme.primaryDark }}
          >
            {t('resident_roster')} ({data.householdMembers.length} Occupants)
          </h2>
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b-2 border-slate-300 font-sans-title text-slate-700 font-bold bg-slate-50">
              <th className="py-2 px-2 text-center w-8">#</th>
              <th className="py-2 px-3">{t('full_name')}</th>
              <th className="py-2 px-3">Relationship</th>
              <th className="py-2 px-2 text-center w-12">Age</th>
              <th className="py-2 px-2 text-center w-16">Gender</th>
              <th className="py-2 px-3">Education</th>
              <th className="py-2 px-3">Occupation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.householdMembers.map((member, idx) => (
              <tr key={member.id || idx} className="hover:bg-slate-50/50">
                <td className="py-2.5 px-2 text-center font-mono-tabular text-slate-400">
                  {idx + 1}
                </td>
                <td className="py-2.5 px-3 font-semibold text-slate-900 font-sans-title">
                  {member.fullName}
                </td>
                <td className="py-2.5 px-3 text-slate-700 font-sans-title">
                  {member.relationship}
                </td>
                <td className="py-2.5 px-2 text-center font-mono-tabular text-slate-700">
                  {member.age}
                </td>
                <td className="py-2.5 px-2 text-center font-sans-title text-slate-600">
                  {member.gender}
                </td>
                <td className="py-2.5 px-3 text-slate-600 text-[11px] font-sans-title">
                  {member.educationLevel}
                </td>
                <td className="py-2.5 px-3 text-slate-600 text-[11px] font-sans-title">
                  {member.occupation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Field Notes */}
      {data.officialNotes && (
        <section className="mb-6 p-3 rounded bg-slate-50 border-l-3 border-slate-400 font-sans-title text-xs text-slate-700 print-avoid-break">
          <strong className="block text-slate-800 mb-0.5">{t('field_notes')}:</strong>
          <p>{data.officialNotes}</p>
        </section>
      )}

      {/* Signatures & Certification Footer */}
      <footer className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 font-sans-title text-xs text-slate-600 print-avoid-break">
        <div>
          <div className="text-[11px] text-slate-400">{t('enumerator_name')}:</div>
          <div className="font-bold text-slate-900 mt-0.5">{data.enumeratorName}</div>
        </div>

        <div className="sm:text-right border p-2.5 rounded bg-slate-50 border-slate-200">
          <div className="text-[11px] text-slate-500 font-medium">
            {data.supervisorSignatureRef}
          </div>
          <div className="text-[10px] text-slate-400 font-mono-tabular mt-0.5">
            Official Municipal Archive Record
          </div>
        </div>
      </footer>
    </div>
  );
};
