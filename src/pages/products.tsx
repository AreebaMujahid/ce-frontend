import React from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import { useBrands } from "../features/products/hooks/usebrands";
import { useBrandOptions } from "../features/products/hooks/usebrandoptions";
import { useProductLookup } from "../features/products/hooks/useproductlookup";
const SelectField = ({ value, options = [], onChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 outline-none"
      >
        <option value="">Select</option>

        {options.map((opt) => (
          <option key={opt} value={String(opt)}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
const BrandCard = ({ item }) => {
  const [selectedLength, setSelectedLength] = React.useState(null);
  const [selectedWidth, setSelectedWidth] = React.useState(null);

  const { data: options } = useBrandOptions(item.brand);

  const { data: productData } = useProductLookup(
    item.brand,
    selectedLength,
    selectedWidth,
  );

  const availableWidths =
    selectedLength !== null
      ? options?.widthsByLength?.[String(selectedLength)] || []
      : [];

  return (
    <div className="rounded-2xl border p-4 shadow-sm">
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold">{item.brand}</h3>

          {productData && (
            <div className="mt-2">
              <p className="text-sm text-slate-500">SKU: {productData.sku}</p>
              <div className="text-2xl font-bold text-blue-700">
                ${productData.price}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <span className="bg-green-100 px-2 py-1 text-xs rounded">
            Min: ${item.minPrice}
          </span>
          <span className="bg-blue-100 px-2 py-1 text-xs rounded">
            Max: ${item.maxPrice}
          </span>
        </div>
      </div>

      {/* ALWAYS VISIBLE CONTROLS */}
      <div className="grid grid-cols-2 gap-3">
        {/* LENGTH */}
        <div>
          <label className="text-xs text-slate-500">Length</label>
          <SelectField
            value={selectedLength !== null ? String(selectedLength) : ""}
            options={options?.lengths || []}
            onChange={(e) => {
              const val = e.target.value ? Number(e.target.value) : null;
              setSelectedLength(val);
              setSelectedWidth(null);
            }}
          />
        </div>

        {/* WIDTH */}
        <div>
          <label className="text-xs text-slate-500">Width</label>
          <SelectField
            value={selectedWidth !== null ? String(selectedWidth) : ""}
            options={availableWidths}
            onChange={(e) => {
              const val = e.target.value ? Number(e.target.value) : null;
              setSelectedWidth(val);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default function BrandComparisonPage() {
  const [page, setPage] = React.useState(1);
  const [selectedBrand, setSelectedBrand] = React.useState("");

  const { data } = useBrands(page);
  const { data: options } = useBrandOptions(selectedBrand);

  const brands = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Brand Comparison</h1>
      </div>

      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {brands.map((item) => (
          <div key={item.brand} onClick={() => setSelectedBrand(item.brand)}>
            <BrandCard
              item={item}
              isActive={selectedBrand === item.brand}
              options={selectedBrand === item.brand ? options : null}
            />
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {/* PAGINATION */}
      <div className="mt-10 flex items-center justify-center gap-2">
        {/* PREV */}
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={pagination?.currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {/* PAGE NUMBERS */}
        {Array.from({ length: pagination?.totalPages || 0 }).map((_, idx) => {
          const pageNumber = idx + 1;

          return (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`px-3 py-1 border rounded ${
                pagination?.currentPage === pageNumber
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* NEXT */}
        <button
          onClick={() =>
            setPage((p) => Math.min(p + 1, pagination?.totalPages || 1))
          }
          disabled={pagination?.currentPage === pagination?.totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
