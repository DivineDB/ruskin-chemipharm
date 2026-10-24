"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  /** "dark" = navy dark bg (default, for dark sections); "light" = white bg (for cream/white sections) */
  variant?: "dark" | "light";
  size?: "sm" | "md";
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  required = false,
  className = "",
  variant = "dark",
  size = "md",
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

  const isDark = variant === "dark";
  const pyClass = size === "sm" ? "px-3 py-2" : "px-4 py-3";

  return (
    <div className={`relative flex flex-col text-left ${className}`} ref={dropdownRef}>
      {label && (
        <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-slate-200" : "text-[#12304A]"}`}>
          {label} {required && <span className="text-[#C79A4B]">*</span>}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-xs text-left ${pyClass} rounded-xl flex items-center justify-between transition-colors focus:outline-none border ${
          isDark
            ? isOpen
              ? "bg-[#0B1E2E] border-[#C79A4B] text-white"
              : "bg-[#0B1E2E] border-slate-700/70 hover:border-slate-500 text-slate-200"
            : isOpen
            ? "bg-white border-[#C79A4B] text-[#12304A] shadow-sm"
            : "bg-white border-[#12304A]/10 hover:border-[#C79A4B]/50 text-[#12304A] shadow-sm"
        }`}
      >
        <span
          className={
            selectedOption
              ? isDark
                ? "text-white font-medium"
                : "text-[#12304A] font-medium"
              : isDark
              ? "text-slate-400"
              : "text-[#5A7A8E]"
          }
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#C79A4B]" : isDark ? "text-slate-400" : "text-[#5A7A8E]"
          }`}
        />
      </button>

      {/* Dropdown Menu with silky smooth spring physics */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute top-full left-0 right-0 mt-1.5 rounded-xl shadow-2xl py-1.5 z-50 max-h-60 overflow-y-auto custom-scrollbar border ${
              isDark
                ? "bg-[#071521] border-slate-700/80"
                : "bg-white border-[#12304A]/10"
            }`}
          >
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
                      ? "bg-[#C79A4B]/15 text-[#C79A4B] font-bold"
                      : isDark
                      ? "text-slate-200 hover:bg-[#12304A] hover:text-white"
                      : "text-[#5A7A8E] hover:bg-[#FAF7F2] hover:text-[#12304A]"
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#C79A4B]" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
