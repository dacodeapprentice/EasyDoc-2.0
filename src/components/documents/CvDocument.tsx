import React from 'react';
import { CvData, DocumentStyle, ColorTheme, LanguageCode } from '../../types/document';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { getTranslation } from '../../utils/i18n';

interface CvDocumentProps {
  data: CvData;
  style: DocumentStyle;
  theme: ColorTheme;
  lang?: LanguageCode;
}

export const CvDocument: React.FC<CvDocumentProps> = ({
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
      : 'p-10 sm:p-12';

  return (
    <div
      className={`bg-white text-slate-900 w-full min-h-[1050px] transition-all relative ${densityPadding} ${fontClass}`}
      style={{
        boxSizing: 'border-box',
      }}
    >
      {/* Decorative Header Accent */}
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

      {/* Header Section */}
      <header className="mb-8 flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1
            className="font-sans-title text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: theme.textHeader }}
          >
            {data.fullName || 'Candidate Full Name'}
          </h1>
          <p
            className="font-sans-title text-lg sm:text-xl font-semibold mt-1"
            style={{ color: theme.primary }}
          >
            {data.professionalTitle || 'Professional Title'}
          </p>

          {/* Contact Details Bar */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-200 font-sans-title">
            {data.email && (
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>{data.email}</span>
              </span>
            )}
            {data.phone && (
              <span className="inline-flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>{data.phone}</span>
              </span>
            )}
            {data.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>{data.location}</span>
              </span>
            )}
            {data.website && (
              <span className="inline-flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                <span>{data.website}</span>
              </span>
            )}
          </div>
        </div>

        {/* User Photo */}
        {data.photoUrl && (
          <div className="shrink-0 ml-2">
            <img
              src={data.photoUrl}
              alt={data.fullName || 'Profile'}
              className="w-24 h-24 rounded-full object-cover border-2 shadow-sm"
              style={{ borderColor: theme.primary }}
            />
          </div>
        )}
      </header>

      {/* Profile Summary */}
      {data.summary && (
        <section className="mb-7 print-avoid-break">
          <h2
            className="font-sans-title text-xs font-bold uppercase tracking-wider pb-1.5 mb-2.5 border-b"
            style={{
              borderColor: theme.border,
              color: theme.primaryDark,
            }}
          >
            {t('profile_summary')}
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">{data.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-7 print-avoid-break">
          <h2
            className="font-sans-title text-xs font-bold uppercase tracking-wider pb-1.5 mb-4 border-b"
            style={{
              borderColor: theme.border,
              color: theme.primaryDark,
            }}
          >
            {t('work_experience')}
          </h2>

          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id} className="print-avoid-break">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-sans-title">
                  <div className="font-bold text-slate-900 text-sm">
                    {exp.role}{' '}
                    <span className="font-normal text-slate-600">at</span>{' '}
                    <span className="font-semibold text-slate-800">{exp.company}</span>
                  </div>
                  <div className="text-xs font-medium text-slate-500 font-mono-tabular">
                    {exp.period}
                    {exp.location && ` · ${exp.location}`}
                  </div>
                </div>

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="mt-2 list-disc list-outside pl-4 space-y-1 text-xs text-slate-700 leading-normal">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Credentials */}
      {data.education && data.education.length > 0 && (
        <section className="mb-7 print-avoid-break">
          <h2
            className="font-sans-title text-xs font-bold uppercase tracking-wider pb-1.5 mb-3 border-b"
            style={{
              borderColor: theme.border,
              color: theme.primaryDark,
            }}
          >
            {t('education')}
          </h2>

          <div className="space-y-3">
            {data.education.map((edu) => (
              <div
                key={edu.id}
                className="flex flex-col sm:flex-row sm:items-baseline justify-between font-sans-title print-avoid-break"
              >
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">{edu.degree}</div>
                  <div className="text-xs text-slate-600 font-medium">
                    {edu.institution}
                    {edu.details && (
                      <span className="italic text-slate-500 font-normal">
                        {' '}
                        — {edu.details}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-xs font-medium text-slate-500 font-mono-tabular">
                  {edu.year}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Languages Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 print-avoid-break font-sans-title">
        {data.skills && data.skills.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1.5 mb-2 border-b"
              style={{
                borderColor: theme.border,
                color: theme.primaryDark,
              }}
            >
              {t('key_competencies')}
            </h2>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 rounded text-xs font-medium border"
                  style={{
                    backgroundColor: theme.primaryLight,
                    color: theme.primaryDark,
                    borderColor: `${theme.primary}20`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.languages && data.languages.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-1.5 mb-2 border-b"
              style={{
                borderColor: theme.border,
                color: theme.primaryDark,
              }}
            >
              {t('languages')}
            </h2>
            <div className="flex flex-wrap gap-2 text-xs text-slate-700 pt-1">
              {data.languages.map((langItem, index) => (
                <span key={index} className="inline-flex items-center gap-1 font-medium">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <span>{langItem}</span>
                  {index < data.languages.length - 1 && (
                    <span className="text-slate-300 ml-1">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
