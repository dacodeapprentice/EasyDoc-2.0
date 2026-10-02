import React, { useState } from 'react';
import { CvData, WorkExperienceItem, EducationItem, LanguageCode } from '../../types/document';
import { Plus, Trash2, ChevronDown, ChevronUp, User, Briefcase, GraduationCap, Wrench } from 'lucide-react';
import { ImageUploadCrop } from '../ImageUploadCrop';
import { getTranslation } from '../../utils/i18n';

interface CvFormProps {
  data: CvData;
  onChange: (updated: CvData) => void;
  lang?: LanguageCode;
}

export const CvForm: React.FC<CvFormProps> = ({ data, onChange, lang = 'en' }) => {
  const t = (k: string) => getTranslation(lang, k);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateField = <K extends keyof CvData>(field: K, value: CvData[K]) => {
    onChange({ ...data, [field]: value });
  };

  // Experience Handlers
  const addExperience = () => {
    const newItem: WorkExperienceItem = {
      id: `exp-${Date.now()}`,
      role: 'Senior Position',
      company: 'Company / Organization',
      location: 'City, Country',
      period: '2024 – Present',
      highlights: ['Key responsibility or project accomplishment.'],
    };
    updateField('experience', [newItem, ...data.experience]);
  };

  const updateExperience = (id: string, field: keyof WorkExperienceItem, val: any) => {
    const updated = data.experience.map((item) =>
      item.id === id ? { ...item, [field]: val } : item
    );
    updateField('experience', updated);
  };

  const removeExperience = (id: string) => {
    updateField('experience', data.experience.filter((item) => item.id !== id));
  };

  const addHighlight = (expId: string) => {
    const updated = data.experience.map((item) => {
      if (item.id === expId) {
        return { ...item, highlights: [...item.highlights, ''] };
      }
      return item;
    });
    updateField('experience', updated);
  };

  const updateHighlight = (expId: string, hIdx: number, val: string) => {
    const updated = data.experience.map((item) => {
      if (item.id === expId) {
        const h = [...item.highlights];
        h[hIdx] = val;
        return { ...item, highlights: h };
      }
      return item;
    });
    updateField('experience', updated);
  };

  const removeHighlight = (expId: string, hIdx: number) => {
    const updated = data.experience.map((item) => {
      if (item.id === expId) {
        return { ...item, highlights: item.highlights.filter((_, i) => i !== hIdx) };
      }
      return item;
    });
    updateField('experience', updated);
  };

  // Education Handlers
  const addEducation = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: 'Master of Science / Bachelor Degree',
      institution: 'University / Institute',
      year: '2024',
      details: 'Honors or specialization focus',
    };
    updateField('education', [newItem, ...data.education]);
  };

  const updateEducation = (id: string, field: keyof EducationItem, val: string) => {
    const updated = data.education.map((item) =>
      item.id === id ? { ...item, [field]: val } : item
    );
    updateField('education', updated);
  };

  const removeEducation = (id: string) => {
    updateField('education', data.education.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4 text-sm font-sans-title">
      {/* 1. Personal & Contact Information */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
        <div className="w-full px-4 py-2.5 bg-slate-50 flex items-center justify-between border-b border-slate-200">
          <button
            type="button"
            onClick={() => toggleSection('personal')}
            className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-800 hover:text-emerald-700 transition-colors text-left"
          >
            <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{t('personal_info')}</span>
            {openSections.personal ? (
              <ChevronUp className="w-4 h-4 text-slate-400 ml-1" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
            )}
          </button>
        </div>

        {openSections.personal && (
          <div className="p-4 space-y-4">
            {/* Photo Upload & Crop */}
            <ImageUploadCrop
              label={t('profile_photo')}
              shape="circle"
              currentImage={data.photoUrl}
              onImageChange={(val) => updateField('photoUrl', val)}
              lang={lang}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('full_name')} *
                </label>
                <input
                  type="text"
                  value={data.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="Eleanor Vance"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('job_title')} *
                </label>
                <input
                  type="text"
                  value={data.professionalTitle}
                  onChange={(e) => updateField('professionalTitle', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="Senior Architectural Project Lead"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('email_address')}
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="e.vance@studio.org"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('phone_number')}
                </label>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="+1 (555) 019-2834"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('location_city')}
                </label>
                <input
                  type="text"
                  value={data.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="Seattle, WA"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('website_portfolio')}
                </label>
                <input
                  type="text"
                  value={data.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="eleanorvance.design"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Professional Profile Summary */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
        <div className="w-full px-4 py-2.5 bg-slate-50 flex items-center justify-between border-b border-slate-200">
          <button
            type="button"
            onClick={() => toggleSection('summary')}
            className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-800 hover:text-emerald-700 transition-colors text-left"
          >
            <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{t('profile_summary')}</span>
            {openSections.summary ? (
              <ChevronUp className="w-4 h-4 text-slate-400 ml-1" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
            )}
          </button>
        </div>

        {openSections.summary && (
          <div className="p-4">
            <textarea
              rows={4}
              value={data.summary}
              onChange={(e) => updateField('summary', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded text-xs text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 leading-relaxed"
              placeholder="Dedicated architectural project director with over eleven years of experience leading multi-disciplinary sustainable civic and commercial developments..."
            />
          </div>
        )}
      </div>

      {/* 3. Work Experience */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
        <div className="w-full px-4 py-2.5 bg-slate-50 flex items-center justify-between border-b border-slate-200">
          <button
            type="button"
            onClick={() => toggleSection('experience')}
            className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-800 hover:text-emerald-700 transition-colors text-left"
          >
            <Briefcase className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              {t('work_experience')} ({data.experience.length})
            </span>
            {openSections.experience ? (
              <ChevronUp className="w-4 h-4 text-slate-400 ml-1" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              addExperience();
              setOpenSections((p) => ({ ...p, experience: true }));
            }}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
          >
            <Plus className="w-3 h-3" />
            <span>{t('add_position')}</span>
          </button>
        </div>

        {openSections.experience && (
          <div className="p-4 space-y-4">
            {data.experience.map((exp, index) => (
              <div
                key={exp.id}
                className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-700">
                    {t('position_no')} #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExperience(exp.id)}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                    title={t('remove_position')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-0.5">
                      {t('role_position')}
                    </label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      placeholder="Principal Architectural Lead"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-0.5">
                      {t('company_org')}
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      placeholder="Cascadia Urban Design Studio"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-0.5">
                      {t('employment_period')}
                    </label>
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      placeholder="2021 – Present"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-0.5">
                      {t('location_city')}
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      placeholder="Seattle, WA"
                    />
                  </div>
                </div>

                {/* Highlights / Responsibilities */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-semibold text-slate-600">
                      {t('key_highlights')}
                    </label>
                    <button
                      type="button"
                      onClick={() => addHighlight(exp.id)}
                      className="text-[11px] font-medium text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>{t('add_bullet')}</span>
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {exp.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={h}
                          onChange={(e) => updateHighlight(exp.id, hIdx, e.target.value)}
                          className="flex-1 px-2 py-1 text-xs border border-slate-300 rounded bg-white"
                          placeholder="Accomplishment or project outcome..."
                        />
                        <button
                          type="button"
                          onClick={() => removeHighlight(exp.id, hIdx)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Education Credentials */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
        <div className="w-full px-4 py-2.5 bg-slate-50 flex items-center justify-between border-b border-slate-200">
          <button
            type="button"
            onClick={() => toggleSection('education')}
            className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-800 hover:text-emerald-700 transition-colors text-left"
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              {t('education')} ({data.education.length})
            </span>
            {openSections.education ? (
              <ChevronUp className="w-4 h-4 text-slate-400 ml-1" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              addEducation();
              setOpenSections((p) => ({ ...p, education: true }));
            }}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
          >
            <Plus className="w-3 h-3" />
            <span>{t('add_degree')}</span>
          </button>
        </div>

        {openSections.education && (
          <div className="p-4 space-y-4">
            {data.education.map((edu, index) => (
              <div
                key={edu.id}
                className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-700">
                    {t('education_no')} #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeEducation(edu.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                    title={t('remove_education')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-slate-600 mb-0.5">
                      {t('degree_diploma')}
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      placeholder="Master of Architecture (M.Arch), Honors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-0.5">
                      {t('institution_school')}
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      placeholder="University of Washington"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-0.5">
                      {t('grad_year')}
                    </label>
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      placeholder="2013"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-slate-600 mb-0.5">
                      {t('honors_details')}
                    </label>
                    <input
                      type="text"
                      value={edu.details}
                      onChange={(e) => updateEducation(edu.id, 'details', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      placeholder="Focus on Sustainable Structural Systems & Adaptive Reuse."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Skills & Languages */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
        <div className="w-full px-4 py-2.5 bg-slate-50 flex items-center justify-between border-b border-slate-200">
          <button
            type="button"
            onClick={() => toggleSection('skills')}
            className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-800 hover:text-emerald-700 transition-colors text-left"
          >
            <Wrench className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              {t('key_competencies')} & {t('languages')}
            </span>
            {openSections.skills ? (
              <ChevronUp className="w-4 h-4 text-slate-400 ml-1" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
            )}
          </button>
        </div>

        {openSections.skills && (
          <div className="p-4 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('key_competencies')} (Comma-separated)
              </label>
              <input
                type="text"
                value={data.skills.join(', ')}
                onChange={(e) =>
                  updateField(
                    'skills',
                    e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  )
                }
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="Sustainable Civic Architecture, LEED AP, Mass Timber, Revit..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('languages')} (Comma-separated)
              </label>
              <input
                type="text"
                value={data.languages.join(', ')}
                onChange={(e) =>
                  updateField(
                    'languages',
                    e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  )
                }
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="English (Native), French (Professional), Spanish (Conversational)"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
