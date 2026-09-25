"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenQuote?: () => void;
}

export default function Navbar({ onOpenSearch, onOpenQuote }: NavbarProps) {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isProducts = pathname.startsWith("/products");

  return (
    <header className="bg-[#EAF2F4] border-b border-slate-200/80 shadow-sm py-3.5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left Brand Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/images/logo.svg"
            alt="Ruskin Chemipharm Logo"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </Link>

        {/* Center Navigation Links & Search/CTA */}
        <div className="flex items-center space-x-6 sm:space-x-8">
          <nav className="hidden md:flex items-center space-x-7 text-base font-semibold">
            {/* Home */}
            <Link
              href="/"
              className={`relative py-1 font-semibold text-base transition-colors ${
                isHome ? "text-[#12304A] font-bold" : "text-[#3E5C72] hover:text-[#12304A]"
              }`}
            >
              Home
              {isHome && (
                <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-[#C79A4B] rounded-full" />
              )}
            </Link>

            {/* Products */}
            <Link
              href="/products"
              className={`relative py-1 font-semibold text-base transition-colors ${
                isProducts ? "text-[#12304A] font-bold" : "text-[#3E5C72] hover:text-[#12304A]"
              }`}
            >
              Products
              {isProducts && (
                <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-[#C79A4B] rounded-full" />
              )}
            </Link>

            {/* Services */}
            <a
              href="/#services"
              className="text-[#3E5C72] hover:text-[#12304A] transition-colors py-1 text-base font-semibold"
            >
              Services
            </a>

            {/* Contact */}
            <a
              href="/#contact"
              className="text-[#3E5C72] hover:text-[#12304A] transition-colors py-1 text-base font-semibold"
            >
              Contact
            </a>

            {/* About */}
            <a
              href="/#about"
              className="text-[#3E5C72] hover:text-[#12304A] transition-colors py-1 text-base font-semibold"
            >
              About
            </a>
          </nav>

          {/* Separator Line | */}
          <div className="hidden md:block h-6 w-px bg-slate-300" />

          {/* Search Circle Button & Request Quote Pill */}
          <div className="flex items-center space-x-3">
            {onOpenSearch ? (
              <button
                onClick={onOpenSearch}
                className="w-10 h-10 rounded-full bg-[#12304A] flex items-center justify-center text-white hover:bg-[#0E263B] transition-colors shadow-sm"
                title="Search Catalog"
              >
                <Search className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href="/products"
                className="w-10 h-10 rounded-full bg-[#12304A] flex items-center justify-center text-white hover:bg-[#0E263B] transition-colors shadow-sm"
                title="Search Catalog"
              >
                <Search className="w-4 h-4" />
              </Link>
            )}

            <button
              onClick={() => {
                if (onOpenQuote) {
                  onOpenQuote();
                } else {
                  window.location.href = "/#contact";
                }
              }}
              className="bg-[#12304A] hover:bg-[#0E263B] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm"
            >
              Request Quote
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
