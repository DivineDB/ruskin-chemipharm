"use client";

import React, { useState, useEffect, useMemo, useRef, useDeferredValue } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowUpRight } from "lucide-react";
import CustomSelect from "./CustomSelect";
import { ALL_PRODUCTS, PRODUCT_CATEGORIES, ApiProduct } from "@/lib/products";

export default function SearchModal() {
	const pathname = usePathname();
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string>("All");
	const deferredSearchQuery = useDeferredValue(searchQuery);
	const inputRef = useRef<HTMLInputElement>(null);

	const isProductsPage = pathname === "/products";

	// Listen for global open-search event
	useEffect(() => {
		const handleOpenSearch = () => {
			// Do NOT open modal on the products page
			if (pathname === "/products") return;
			setIsOpen(true);
		};

		window.addEventListener("ruskin:open-search", handleOpenSearch);
		return () => window.removeEventListener("ruskin:open-search", handleOpenSearch);
	}, [pathname]);

	// Auto-focus search input when opened
	useEffect(() => {
		if (isOpen) {
			const timer = setTimeout(() => {
				inputRef.current?.focus();
			}, 60);
			document.body.style.overflow = "hidden";
			return () => {
				clearTimeout(timer);
				document.body.style.overflow = "";
			};
		} else {
			document.body.style.overflow = "";
		}
	}, [isOpen]);

	// Close on Escape key
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				setIsOpen(false);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen]);

	// Close when route changes
	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	// Filter products
	const filteredProducts = useMemo(() => {
		return ALL_PRODUCTS.filter((p: ApiProduct) => {
			if (selectedCategory !== "All" && p.category !== selectedCategory) {
				return false;
			}
			if (deferredSearchQuery.trim() !== "") {
				const q = deferredSearchQuery.toLowerCase();
				return (
					p.name.toLowerCase().includes(q) ||
					p.casNumber.toLowerCase().includes(q) ||
					p.category.toLowerCase().includes(q) ||
					p.manufacturer.toLowerCase().includes(q) ||
					p.tagline.toLowerCase().includes(q) ||
					p.description.toLowerCase().includes(q)
				);
			}
			return true;
		});
	}, [selectedCategory, deferredSearchQuery]);

	const handleRequestQuote = (productName: string) => {
		setIsOpen(false);
		window.dispatchEvent(
			new CustomEvent("ruskin:open-quote", {
				detail: { product: productName },
			})
		);
		// If on contact page, scroll to form
		if (pathname === "/contact") {
			document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
		}
	};

	// Never render modal on /products page
	if (isProductsPage) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-[100] bg-[#12304A]/40 backdrop-blur-sm"
						onClick={() => setIsOpen(false)}
					/>

					{/* Modal Dialog */}
					<motion.div
						initial={{ opacity: 0, scale: 0.94, y: 16 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 12 }}
						transition={{ type: "spring", damping: 28, stiffness: 380 }}
						className="fixed z-[101] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(640px,calc(100vw-32px))] flex flex-col rounded-3xl overflow-hidden bg-white shadow-[0_25px_70px_rgba(18,48,74,0.3)] border border-[#12304A]/10 max-h-[85vh] text-left"
					>
						{/* Header */}
						<div className="px-6 pt-6 pb-4 border-b border-[#12304A]/8 flex items-start justify-between shrink-0 bg-white">
							<div className="flex items-center gap-3.5">
								<div className="w-10 h-10 rounded-xl bg-[#C79A4B]/10 border border-[#C79A4B]/25 flex items-center justify-center shrink-0">
									<Image
										src="/logoonly-gold.svg"
										alt="Ruskin Emblem"
										width={24}
										height={24}
										className="w-6 h-6 object-contain"
									/>
								</div>
								<div>
									<div className="text-[10px] font-bold text-[#C79A4B] uppercase tracking-widest mb-0.5">
										TECHNICAL PRODUCT DIRECTORY
									</div>
									<h3 className="text-lg sm:text-xl font-bold text-[#12304A] leading-snug">
										Search Specifications &amp; Regulatory Status
									</h3>
								</div>
							</div>
							<button
								onClick={() => setIsOpen(false)}
								className="p-1.5 rounded-full text-[#5A7A8E] hover:text-[#12304A] hover:bg-[#12304A]/5 transition-colors shrink-0 cursor-pointer"
								aria-label="Close search"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						{/* Search & Filter Bar */}
						<div className="px-5 py-3 border-b border-[#12304A]/8 flex flex-col sm:flex-row gap-2.5 shrink-0 bg-[#FAF7F2]">
							<div className="relative flex-1">
								<Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A7A8E]" />
								<input
									ref={inputRef}
									type="text"
									placeholder="Search API compound, CAS No., or therapeutic use..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full pl-9 pr-3 py-2.5 rounded-xl text-[#12304A] placeholder-[#5A7A8E]/60 focus:outline-none text-xs bg-white border border-[#12304A]/10 focus:border-[#C79A4B] transition-colors"
								/>
							</div>
							<CustomSelect
								variant="light"
								size="sm"
								value={selectedCategory}
								onChange={(val) => setSelectedCategory(val)}
								options={[
									{ value: "All", label: `All Categories (${ALL_PRODUCTS.length})` },
									...PRODUCT_CATEGORIES.map((c) => ({
										value: c.name,
										label: `${c.name} (${c.count})`,
									})),
								]}
								className="w-full sm:w-[200px] shrink-0"
							/>
						</div>

						{/* Results List */}
						<div className="p-5 overflow-y-auto flex-1 space-y-3 custom-scrollbar text-left bg-[#FAF7F2]/40">
							{filteredProducts.length > 0 ? (
								filteredProducts.map((product) => (
									<div
										key={product.id}
										className="rounded-2xl p-4 border border-[#12304A]/8 bg-white hover:border-[#C79A4B]/40 hover:shadow-md transition-[border-color,box-shadow] duration-200 flex flex-col gap-2"
									>
										<div className="flex items-center justify-between">
											<span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C79A4B]/15 text-[#C79A4B] uppercase tracking-wide">
												{product.category}
											</span>
											<span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
												{product.dmfStatus}
											</span>
										</div>

										<div>
											<h4 className="text-sm font-bold text-[#12304A] hover:text-[#C79A4B] transition-colors">
												<Link
													href={`/products/${product.slug}`}
													onClick={() => setIsOpen(false)}
												>
													{product.name}
												</Link>
											</h4>
											<div className="text-[11px] text-[#5A7A8E] mt-0.5 font-mono flex flex-wrap gap-x-2">
												<span>
													CAS: <strong className="text-[#12304A] font-semibold">{product.casNumber}</strong>
												</span>
												<span>·</span>
												<span>
													Purity: <strong className="text-emerald-700 font-bold">{product.purity}</strong>
												</span>
												{product.grade && (
													<>
														<span>·</span>
														<span>Grade: {product.grade}</span>
													</>
												)}
											</div>
										</div>

										<p className="text-[11px] text-[#5A7A8E] line-clamp-2 leading-relaxed">
											{product.description}
										</p>

										<div className="flex items-center justify-between pt-2.5 border-t border-[#12304A]/6">
											<Link
												href={`/products/${product.slug}`}
												onClick={() => setIsOpen(false)}
												className="text-[11px] font-bold text-[#12304A] hover:text-[#C79A4B] flex items-center gap-1 transition-colors"
											>
												View Molecule Details <ArrowUpRight className="w-3 h-3" />
											</Link>
											<button
												onClick={() => handleRequestQuote(product.name)}
												className="gold-btn px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer"
											>
												Request COA &amp; Quote
											</button>
										</div>
									</div>
								))
							) : (
								<div className="py-14 text-center text-slate-500 text-xs">
									No active compounds found matching &quot;{searchQuery}&quot;.
								</div>
							)}
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
