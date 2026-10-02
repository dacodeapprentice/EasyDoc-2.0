import React, { useState } from 'react';
import { ReceiptData, ReceiptItem, LanguageCode } from '../../types/document';
import { Plus, Trash2, ChevronDown, ChevronUp, FileText, UserCheck, Calculator, Receipt } from 'lucide-react';
import { ImageUploadCrop } from '../ImageUploadCrop';
import { getTranslation } from '../../utils/i18n';

interface ReceiptFormProps {
  data: ReceiptData;
  onChange: (updated: ReceiptData) => void;
  lang?: LanguageCode;
}

export const ReceiptForm: React.FC<ReceiptFormProps> = ({ data, onChange, lang = 'en' }) => {
  const t = (k: string) => getTranslation(lang, k);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    header: true,
    customer: true,
    items: true,
    financials: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateField = <K extends keyof ReceiptData>(field: K, value: ReceiptData[K]) => {
    onChange({ ...data, [field]: value });
  };

  const safeNum = (v: any, fallback = 0) => {
    const n = parseFloat(v);
    return isNaN(n) ? fallback : n;
  };

  const addItem = () => {
    const newItem: ReceiptItem = {
      id: `item-${Date.now()}`,
      description: 'New Billable Service or Product Item',
      quantity: 1,
      unitPrice: 100,
      total: 100,
    };
    updateField('items', [...data.items, newItem]);
  };

  const updateItem = (id: string, field: keyof ReceiptItem, val: any) => {
    const updated = data.items.map((item) => {
      if (item.id === id) {
        const next = { ...item, [field]: val };
        if (field === 'quantity' || field === 'unitPrice') {
          const q = safeNum(next.quantity);
          const p = safeNum(next.unitPrice);
          next.total = Number((q * p).toFixed(2));
        }
        return next;
      }
      return item;
    });
    updateField('items', updated);
  };

  const removeItem = (id: string) => {
    updateField(
      'items',
      data.items.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="space-y-4 text-sm font-sans-title">
      {/* 1. Business & Receipt Details */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
        <div className="w-full px-4 py-2.5 bg-slate-50 flex items-center justify-between border-b border-slate-200">
          <button
            type="button"
            onClick={() => toggleSection('header')}
            className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-800 hover:text-emerald-700 transition-colors text-left"
          >
            <Receipt className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{t('commercial_receipt')}</span>
            {openSections.header ? (
              <ChevronUp className="w-4 h-4 text-slate-400 ml-1" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
            )}
          </button>
        </div>

        {openSections.header && (
          <div className="p-4 space-y-4">
            {/* Business Logo Upload */}
            <ImageUploadCrop
              label={t('business_logo')}
              shape="square"
              currentImage={data.logoUrl}
              onImageChange={(val) => updateField('logoUrl', val)}
              lang={lang}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('business_name')} *
                </label>
                <input
                  type="text"
                  value={data.businessName}
                  onChange={(e) => updateField('businessName', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="Verdant Precision Solutions LLC"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('business_tax_id')}
                </label>
                <input
                  type="text"
                  value={data.businessTaxId}
                  onChange={(e) => updateField('businessTaxId', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="EIN: 84-2947192"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('business_address')}
                </label>
                <input
                  type="text"
                  value={data.businessAddress}
                  onChange={(e) => updateField('businessAddress', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="100 Meridian Blvd, Denver, CO"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('business_email')}
                </label>
                <input
                  type="email"
                  value={data.businessEmail}
                  onChange={(e) => updateField('businessEmail', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="billing@verdantprecision.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('receipt_no')} *
                </label>
                <input
                  type="text"
                  value={data.receiptNumber}
                  onChange={(e) => updateField('receiptNumber', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="RCP-2026-09418"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('issue_date')}
                </label>
                <input
                  type="date"
                  value={data.issueDate}
                  onChange={(e) => updateField('issueDate', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('payment_method')}
                </label>
                <input
                  type="text"
                  value={data.paymentMethod}
                  onChange={(e) => updateField('paymentMethod', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="Bank Wire (SEPA / Fedwire)"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('transaction_ref')}
                </label>
                <input
                  type="text"
                  value={data.transactionRef}
                  onChange={(e) => updateField('transactionRef', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="TXN-984210385-CLR"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Customer Information */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
        <div className="w-full px-4 py-2.5 bg-slate-50 flex items-center justify-between border-b border-slate-200">
          <button
            type="button"
            onClick={() => toggleSection('customer')}
            className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-800 hover:text-emerald-700 transition-colors text-left"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{t('billed_to')}</span>
            {openSections.customer ? (
              <ChevronUp className="w-4 h-4 text-slate-400 ml-1" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
            )}
          </button>
        </div>

        {openSections.customer && (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('customer_name')} *
              </label>
              <input
                type="text"
                value={data.customerName}
                onChange={(e) => updateField('customerName', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="Aria Thorne"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('customer_company')}
              </label>
              <input
                type="text"
                value={data.customerCompany}
                onChange={(e) => updateField('customerCompany', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="Highland Environmental Systems Inc."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('customer_email')}
              </label>
              <input
                type="email"
                value={data.customerEmail}
                onChange={(e) => updateField('customerEmail', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="athorne@highland.org"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('customer_address')}
              </label>
              <input
                type="text"
                value={data.customerAddress}
                onChange={(e) => updateField('customerAddress', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="820 Aspen Crest Parkway, Boulder, CO"
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. Itemized Products & Services */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
        <div className="w-full px-4 py-2.5 bg-slate-50 flex items-center justify-between border-b border-slate-200">
          <button
            type="button"
            onClick={() => toggleSection('items')}
            className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-800 hover:text-emerald-700 transition-colors text-left"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              {t('item_description')} ({data.items.length})
            </span>
            {openSections.items ? (
              <ChevronUp className="w-4 h-4 text-slate-400 ml-1" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              addItem();
              setOpenSections((p) => ({ ...p, items: true }));
            }}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
          >
            <Plus className="w-3 h-3" />
            <span>{t('add_item')}</span>
          </button>
        </div>

        {openSections.items && (
          <div className="p-4 space-y-3">
            {data.items.map((item, index) => {
              const qty = safeNum(item.quantity);
              const price = safeNum(item.unitPrice);
              const total = (qty * price).toFixed(2);

              return (
                <div
                  key={item.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      Item #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-600 mb-0.5">
                      {t('item_description')}
                    </label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      placeholder="Consulting Services, Transducers, etc."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-0.5">
                        {t('quantity')}
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(item.id, 'quantity', e.target.value === '' ? '' : Number(e.target.value))
                        }
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-0.5">
                        {t('unit_price')}
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(item.id, 'unitPrice', e.target.value === '' ? '' : Number(e.target.value))
                        }
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-0.5">
                        {t('line_total')}
                      </label>
                      <div className="px-2.5 py-1.5 text-xs font-mono font-bold text-slate-800 bg-slate-100 rounded border border-slate-200">
                        ${total}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Financial Calculations, Tax & Signatory */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
        <div className="w-full px-4 py-2.5 bg-slate-50 flex items-center justify-between border-b border-slate-200">
          <button
            type="button"
            onClick={() => toggleSection('financials')}
            className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-800 hover:text-emerald-700 transition-colors text-left"
          >
            <Calculator className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Tax, Discount & Accounting Signatory</span>
            {openSections.financials ? (
              <ChevronUp className="w-4 h-4 text-slate-400 ml-1" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
            )}
          </button>
        </div>

        {openSections.financials && (
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('tax_rate')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={data.taxRatePercent}
                  onChange={(e) =>
                    updateField(
                      'taxRatePercent',
                      e.target.value === '' ? 0 : Number(e.target.value)
                    )
                  }
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="6.5"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('discount_amount')}
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={data.discountAmount}
                  onChange={(e) =>
                    updateField(
                      'discountAmount',
                      e.target.value === '' ? 0 : Number(e.target.value)
                    )
                  }
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('authorized_signatory')}
                </label>
                <input
                  type="text"
                  value={data.cashierOrAgent}
                  onChange={(e) => updateField('cashierOrAgent', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="Elena Rostova, CAO"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('notes_terms')}
              </label>
              <textarea
                rows={2}
                value={data.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded text-xs bg-white text-slate-900 leading-relaxed focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="Payment received in full. Warranty terms, etc."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
