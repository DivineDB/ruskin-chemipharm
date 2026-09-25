"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  required = false,
  className = "",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative flex flex-col text-left ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-xs font-semibold text-slate-200 mb-1.5">
          {label} {required && <span className="text-[#C79A4B]">*</span>}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-[#112436] border text-xs text-left px-4 py-3 rounded-xl flex items-center justify-between transition-colors focus:outline-none ${
          isOpen
            ? "border-[#C79A4B] text-white"
            : "border-slate-700/70 hover:border-slate-500 text-slate-200"
        }`}
      >
        <span className={selectedOption ? "text-white font-medium" : "text-slate-400"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#C79A4B]" : ""
          }`}
        />
      </button>

      {/* Animated Dropdown Menu Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#0F2234] border border-slate-700/80 rounded-xl shadow-2xl py-1.5 z-50 max-h-60 overflow-y-auto custom-scrollbar">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? "bg-[#C79A4B]/15 text-[#E5C378] font-bold"
                    : "text-slate-200 hover:bg-[#18344E] hover:text-white"
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#C79A4B]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
