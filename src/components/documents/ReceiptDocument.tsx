import React from 'react';
import { ReceiptData, DocumentStyle, ColorTheme, LanguageCode } from '../../types/document';
import { Receipt, CheckCircle2 } from 'lucide-react';
import { getTranslation } from '../../utils/i18n';

interface ReceiptDocumentProps {
  data: ReceiptData;
  style: DocumentStyle;
  theme: ColorTheme;
  lang?: LanguageCode;
}

export const ReceiptDocument: React.FC<ReceiptDocumentProps> = ({
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

  const safeNum = (v: any, fallback = 0) => {
    const n = parseFloat(v);
    return isNaN(n) ? fallback : n;
  };

  const subtotal = data.items.reduce(
    (sum, item) => sum + safeNum(item.quantity) * safeNum(item.unitPrice),
    0
  );
  const taxRate = safeNum(data.taxRatePercent);
  const taxAmount = (subtotal * taxRate) / 100;
  const discountAmount = safeNum(data.discountAmount);
  const grandTotal = Math.max(0, subtotal + taxAmount - discountAmount);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(lang === 'pt' ? 'pt-PT' : lang === 'es' ? 'es-ES' : lang === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: lang === 'pt' || lang === 'es' || lang === 'fr' ? 'EUR' : 'USD',
    }).format(amount);
  };

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

      {/* Header: Company & Receipt Details */}
      <header className="border-b pb-6 mb-6 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            {data.logoUrl && (
              <img
                src={data.logoUrl}
                alt="Business Logo"
                className="w-16 h-16 object-contain rounded-md border border-slate-200 shrink-0 bg-white"
              />
            )}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-1 rounded bg-slate-100 text-slate-800">
                  <Receipt className="w-5 h-5" style={{ color: theme.primary }} />
                </span>
                <span className="font-sans-title text-xs font-bold uppercase tracking-widest text-slate-500">
                  {t('official_voucher')}
                </span>
              </div>
              <h1
                className="font-sans-title text-2xl sm:text-3xl font-extrabold tracking-tight"
                style={{ color: theme.textHeader }}
              >
                {data.businessName || 'Business Name'}
              </h1>
              {data.businessTaxId && (
                <p className="font-mono-tabular text-xs text-slate-500 mt-1">
                  {data.businessTaxId}
                </p>
              )}
              {data.businessAddress && (
                <p className="font-sans-title text-xs text-slate-600 mt-0.5">
                  {data.businessAddress}
                </p>
              )}
              {data.businessEmail && (
                <p className="font-sans-title text-xs text-slate-500 mt-0.5">
                  {data.businessEmail}
                </p>
              )}
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold uppercase tracking-wide mb-2"
              style={{
                backgroundColor: theme.badgeBg,
                color: theme.badgeText,
              }}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t('payment_received')}</span>
            </div>
            <div className="text-xs text-slate-500 font-sans-title">
              {t('receipt_no')}:{' '}
              <strong className="font-mono-tabular font-bold text-slate-800">
                {data.receiptNumber || 'RCP-0000'}
              </strong>
            </div>
            <div className="text-xs text-slate-500 font-sans-title mt-0.5">
              {t('issue_date')}: {data.issueDate || '—'}
            </div>
            {data.paymentMethod && (
              <div className="text-xs text-slate-500 font-sans-title mt-0.5">
                {t('payment_method')}: {data.paymentMethod}
              </div>
            )}
            {data.transactionRef && (
              <div className="text-[11px] font-mono-tabular text-slate-400 mt-0.5">
                Ref: {data.transactionRef}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Bill To Customer Information */}
      <section className="mb-6 p-4 rounded-md border border-slate-200 bg-slate-50/60 font-sans-title print-avoid-break">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          {t('billed_to')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <div className="font-bold text-slate-900 text-sm">
              {data.customerName || 'Customer Name'}
            </div>
            {data.customerCompany && (
              <div className="text-slate-700 font-medium">{data.customerCompany}</div>
            )}
          </div>
          <div className="text-slate-600 sm:text-right">
            {data.customerEmail && <div>{data.customerEmail}</div>}
            {data.customerAddress && <div>{data.customerAddress}</div>}
          </div>
        </div>
      </section>

      {/* Line Items Table */}
      <section className="mb-6 print-avoid-break">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b-2 border-slate-300 font-sans-title text-slate-700 font-bold bg-slate-50/80">
              <th className="py-2.5 px-3">{t('item_description')}</th>
              <th className="py-2.5 px-3 text-center w-16">{t('quantity')}</th>
              <th className="py-2.5 px-3 text-right w-28">{t('unit_price')}</th>
              <th className="py-2.5 px-3 text-right w-28">{t('line_total')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.items.map((item, idx) => {
              const qty = safeNum(item.quantity);
              const price = safeNum(item.unitPrice);
              const lineTot = qty * price;
              return (
                <tr key={item.id || idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-3">
                    <span className="font-semibold text-slate-900 block">
                      {item.description || 'Service or item description'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono-tabular text-slate-600">
                    {qty}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-tabular text-slate-600">
                    {formatCurrency(price)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-tabular font-bold text-slate-900">
                    {formatCurrency(lineTot)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Financial Totals Breakdown */}
      <section className="flex justify-end mb-8 print-avoid-break">
        <div className="w-72 font-sans-title text-xs space-y-2">
          <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
            <span>{t('subtotal')}:</span>
            <span className="font-mono-tabular font-semibold text-slate-900">
              {formatCurrency(subtotal)}
            </span>
          </div>

          {taxRate > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
              <span>
                {t('tax_vat')} ({taxRate}%):
              </span>
              <span className="font-mono-tabular font-semibold text-slate-900">
                {formatCurrency(taxAmount)}
              </span>
            </div>
          )}

          {discountAmount > 0 && (
            <div className="flex justify-between py-1 border-b border-slate-100 text-emerald-700">
              <span>{t('discount')}:</span>
              <span className="font-mono-tabular font-semibold">
                -{formatCurrency(discountAmount)}
              </span>
            </div>
          )}

          <div
            className="flex justify-between pt-2 pb-1 border-t-2 text-sm font-extrabold"
            style={{
              borderColor: theme.primary,
              color: theme.primaryDark,
            }}
          >
            <span>{t('total_paid')}:</span>
            <span className="font-mono-tabular">{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </section>

      {/* Additional Terms & Notes */}
      {data.notes && (
        <section className="mb-8 p-3 rounded bg-slate-50 border-l-3 border-slate-400 font-sans-title text-xs text-slate-600 print-avoid-break">
          <span className="font-bold text-slate-700 block mb-0.5">
            {t('notes_terms')}:
          </span>
          <p className="leading-relaxed">{data.notes}</p>
        </section>
      )}

      {/* Signatory & Security Footer */}
      <footer className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans-title text-xs text-slate-500 print-avoid-break">
        <div>
          {data.cashierOrAgent && (
            <div>
              {t('authorized_signatory')}:{' '}
              <strong className="text-slate-800">{data.cashierOrAgent}</strong>
            </div>
          )}
          <div className="text-[11px] text-slate-400 mt-0.5">
            {t('electronic_record')}
          </div>
        </div>
        <div className="text-right text-[11px] text-slate-400">
          <div>Verified & Reconciled</div>
          <div className="font-mono-tabular">AUTH-ID: {data.receiptNumber || '000'}</div>
        </div>
      </footer>
    </div>
  );
};
