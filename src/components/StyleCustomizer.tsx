import React from 'react';
import { DocumentStyle, ColorThemeId, FontFamilyChoice, DensityChoice, HeaderStyleChoice, LanguageCode } from '../types/document';
import { COLOR_THEMES } from '../data/defaultData';
import { Palette, Type, LayoutTemplate, Sparkles } from 'lucide-react';
import { getTranslation } from '../utils/i18n';

interface StyleCustomizerProps {
  style: DocumentStyle;
  onChange: (updated: DocumentStyle) => void;
  lang?: LanguageCode;
}

export const StyleCustomizer: React.FC<StyleCustomizerProps> = ({ style, onChange, lang = 'en' }) => {
  const t = (k: string) => getTranslation(lang, k);

  const updateStyle = <K extends keyof DocumentStyle>(field: K, value: DocumentStyle[K]) => {
    onChange({ ...style, [field]: value });
  };

  return (
    <div className="space-y-5 text-xs font-sans-title">
      {/* 1. Color Palette in Blues & Greens */}
      <div>
        <div className="flex items-center gap-1.5 font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          <Palette className="w-3.5 h-3.5 text-emerald-700" />
          <span>{t('color_palette')}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.values(COLOR_THEMES).map((theme) => {
            const isSelected = style.themeId === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => updateStyle('themeId', theme.id as ColorThemeId)}
                className={`flex items-center gap-2.5 p-2 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center -space-x-1 shrink-0">
                  <span
                    className="w-4 h-4 rounded-full border border-white shadow-xs"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <span
                    className="w-4 h-4 rounded-full border border-white shadow-xs"
                    style={{ backgroundColor: theme.secondary }}
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-slate-900 truncate text-[11px] leading-tight">
                    {theme.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Reading Typography (Serif font pairings) */}
      <div className="pt-3 border-t border-slate-200">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          <Type className="w-3.5 h-3.5 text-emerald-700" />
          <span>{t('reading_typography')}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => updateStyle('fontFamily', 'source-serif' as FontFamilyChoice)}
            className={`p-2.5 rounded-lg border text-left transition-all ${
              style.fontFamily === 'source-serif'
                ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="font-bold text-slate-900 text-xs">Source Serif 4</div>
            <div className="font-serif-reading text-[11px] text-slate-600 mt-1 italic leading-snug">
              Crisp, balanced humanist serif for high legibility.
            </div>
          </button>

          <button
            type="button"
            onClick={() => updateStyle('fontFamily', 'lora' as FontFamilyChoice)}
            className={`p-2.5 rounded-lg border text-left transition-all ${
              style.fontFamily === 'lora'
                ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="font-bold text-slate-900 text-xs">Lora</div>
            <div className="font-serif-lora text-[11px] text-slate-600 mt-1 italic leading-snug">
              Literary contemporary serif with graceful curves.
            </div>
          </button>
        </div>
        <p className="text-[10px] text-slate-500 mt-1.5">
          * Titles and headers use modern geometric sans-serif (Plus Jakarta Sans).
        </p>
      </div>

      {/* 3. Layout Density */}
      <div className="pt-3 border-t border-slate-200">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          <LayoutTemplate className="w-3.5 h-3.5 text-emerald-700" />
          <span>{t('margins_density')}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'compact', label: t('compact'), desc: 'Tight margins' },
            { id: 'standard', label: t('standard'), desc: 'Standard A4' },
            { id: 'generous', label: t('generous'), desc: 'Airy spacing' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => updateStyle('density', item.id as DensityChoice)}
              className={`p-2 rounded-lg border text-center transition-all ${
                style.density === item.id
                  ? 'border-emerald-600 bg-emerald-50/60 font-semibold text-emerald-900 ring-1 ring-emerald-600'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div className="text-xs font-semibold">{item.label}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Accent Header Bar */}
      <div className="pt-3 border-t border-slate-200">
        <div className="font-bold text-slate-800 uppercase tracking-wider mb-2 text-xs">
          {t('header_accent')}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'left-bar', label: t('left_accent') },
            { id: 'banner', label: t('top_banner') },
            { id: 'minimal', label: t('minimal') },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => updateStyle('headerStyle', item.id as HeaderStyleChoice)}
              className={`p-2 rounded-lg border text-center text-xs transition-all ${
                style.headerStyle === item.id
                  ? 'border-emerald-600 bg-emerald-50/60 font-semibold text-emerald-900 ring-1 ring-emerald-600'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
