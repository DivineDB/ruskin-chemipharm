import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MolecularDecoration, FloatingHex, HEX_CLIP } from "./Hex";

interface FooterProps {
	onOpenCatalog: () => void;
}

export default function Footer({ onOpenCatalog }: FooterProps) {
	return (
		<footer
			id="contact"
			className="bg-[#071521] text-white pt-16 pb-10 relative overflow-hidden border-t border-white/10"
		>
			{/* ── Ambient Background Elements (Pure CSS, 0 JS overhead, 120 FPS) ── */}
			<div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
				{/* Layer 1: Scaled-down Big Molecular Cluster */}
				<div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-[160px] sm:w-[200px] lg:w-[240px]">
					<MolecularDecoration
						color="#C79A4B"
						opacity={0.14}
						className="w-full h-auto"
					/>
				</div>

				{/* Layer 2: Micro-Hex 1 */}
				<div className="absolute bottom-28 left-[17%] sm:left-[21%] hidden sm:block">
					<FloatingHex
						size={24}
						color="#C79A4B"
						opacity={0.24}
						strokeWidth={1.2}
						hasInner
						hasDot
					/>
				</div>

				{/* Layer 3: Micro-Hex 2 */}
				<div className="absolute bottom-40 left-[8%] sm:left-[11%] hidden md:block">
					<FloatingHex
						size={20}
						color="#FFFFFF"
						opacity={0.15}
						strokeWidth={1}
					/>
				</div>

				{/* Layer 4: Micro-Hex 3 */}
				<div className="absolute bottom-12 left-[27%] sm:left-[30%] hidden lg:block">
					<FloatingHex
						size={16}
						color="#C79A4B"
						opacity={0.18}
						strokeWidth={1}
					/>
				</div>

				{/* Ruskin emblem watermark */}
				<div className="absolute bottom-14 sm:bottom-16 lg:bottom-20 right-8 sm:right-12 lg:right-20 w-32 h-32 sm:w-36 sm:h-36 lg:w-44 lg:h-44 pointer-events-none select-none opacity-[0.04]">
					<Image
						src="/logoonly.svg"
						alt="Ruskin Chemipharm Emblem"
						width={176}
						height={176}
						className="w-full h-full object-contain"
					/>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
				{/* Top layout: 3 well-balanced columns with clean, open typography */}
				<div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start text-left w-full">
					{/* Column 1: Brand & Headquarters */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
						className="md:col-span-5 space-y-6"
					>
						<div className="-mt-3.5 sm:-mt-4 lg:-mt-[18px]">
							<Image
								src="/logolong.svg"
								alt="Ruskin Chemipharm Logo"
								width={220}
								height={68}
								className="h-12 sm:h-14 lg:h-[56px] w-auto object-contain drop-shadow-sm"
							/>
						</div>

						{/* Contact info with hex icons */}
						<div className="space-y-4">
							<div className="flex gap-3 items-start group">
								<div
									className="w-7 h-8 flex-shrink-0 flex items-center justify-center mt-0.5 bg-[#C79A4B] shadow-sm group-hover:scale-105 transition-transform"
									style={{ clipPath: HEX_CLIP }}
								>
									<span
										className="w-2 h-2.5 bg-white"
										style={{ clipPath: HEX_CLIP }}
									/>
								</div>
								<div>
									<p className="text-sm font-bold text-white">Mumbai, India</p>
									<p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
										4/A, Bhangwadi Shopping Arcade,
										<br />
										Kalbadevi Road, Mumbai – 400 002.
									</p>
								</div>
							</div>

							<div className="flex gap-3 items-start group">
								<div
									className="w-7 h-8 flex-shrink-0 flex items-center justify-center mt-0.5 bg-[#C79A4B] shadow-sm group-hover:scale-105 transition-transform"
									style={{ clipPath: HEX_CLIP }}
								>
									<span
										className="w-2 h-2.5 bg-white"
										style={{ clipPath: HEX_CLIP }}
									/>
								</div>
								<div>
									<p className="text-sm font-bold text-white">Phone</p>
									<div className="flex flex-col text-xs text-slate-300 mt-0.5 leading-relaxed">
										<a
											href="tel:+912222059494"
											className="hover:text-[#C79A4B] transition-colors py-0.5"
										>
											+91 22 22059494
										</a>
										<a
											href="tel:+912222068330"
											className="hover:text-[#C79A4B] transition-colors py-0.5"
										>
											+91 22 22068330
										</a>
									</div>
								</div>
							</div>

							<div className="flex gap-3 items-start group">
								<div
									className="w-7 h-8 flex-shrink-0 flex items-center justify-center mt-0.5 bg-[#C79A4B] shadow-sm group-hover:scale-105 transition-transform"
									style={{ clipPath: HEX_CLIP }}
								>
									<span
										className="w-2 h-2.5 bg-white"
										style={{ clipPath: HEX_CLIP }}
									/>
								</div>
								<div>
									<p className="text-sm font-bold text-white">Email</p>
									<div className="flex flex-col text-xs text-slate-300 mt-0.5 leading-relaxed">
										<a
											href="mailto:sourcing@ruskinchemipharm.in"
											className="hover:text-[#C79A4B] transition-colors py-0.5"
										>
											sourcing@ruskinchemipharm.in
										</a>
										<a
											href="mailto:sales@ruskinchemipharm.in"
											className="hover:text-[#C79A4B] transition-colors py-0.5"
										>
											sales@ruskinchemipharm.in
										</a>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Column 2: Quick Links */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
						className="md:col-span-3 space-y-4"
					>
						<div>
							<h4 className="text-sm font-bold text-white uppercase tracking-wider">
								Quick Links
							</h4>
							<div className="w-8 h-[2px] bg-[#C79A4B] mt-2 rounded-full" />
						</div>

						<ul className="space-y-3 text-xs text-slate-300">
							<li>
								<button
									onClick={onOpenCatalog}
									className="hover:text-[#C79A4B] hover:translate-x-1 transition-all duration-200 text-left cursor-pointer inline-block"
								>
									Products Directory
								</button>
							</li>
							<li>
								<Link
									href="/services"
									className="hover:text-[#C79A4B] hover:translate-x-1 transition-all duration-200 inline-block"
								>
									Services
								</Link>
							</li>
							<li>
								<Link
									href="/services#regulatory"
									className="hover:text-[#C79A4B] hover:translate-x-1 transition-all duration-200 inline-block"
								>
									Regulatory Specs
								</Link>
							</li>
							<li>
								<Link
									href="/about"
									className="hover:text-[#C79A4B] hover:translate-x-1 transition-all duration-200 inline-block"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="hover:text-[#C79A4B] hover:translate-x-1 transition-all duration-200 inline-block"
								>
									Contact &amp; Offices
								</Link>
							</li>
						</ul>
					</motion.div>

					{/* Column 3: Reach Us */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
						className="md:col-span-4 space-y-4"
					>
						<div>
							<h4 className="text-sm font-bold text-white uppercase tracking-wider">
								Reach Us
							</h4>
							<div className="w-8 h-[2px] bg-[#C79A4B] mt-2 rounded-full" />
						</div>

						<div className="space-y-4 text-xs text-slate-300 leading-relaxed">
							<div>
								<p className="font-semibold text-slate-400 text-[11px] uppercase tracking-wide mb-2">
									Direct Contacts
								</p>
								<div className="space-y-2">
									<p>
										<span className="text-slate-400">Yash:</span>{" "}
										<a
											href="tel:+919819826611"
											className="text-slate-200 hover:text-[#C79A4B] transition-colors font-medium"
										>
											+91 98198 26611
										</a>
									</p>
									<p>
										<span className="text-slate-400">Krishna:</span>{" "}
										<a
											href="tel:+919322226307"
											className="text-slate-200 hover:text-[#C79A4B] transition-colors font-medium"
										>
											+91 93222 26307
										</a>
									</p>
									<p>
										<span className="text-slate-400">Atman:</span>{" "}
										<a
											href="tel:+919967155543"
											className="text-slate-200 hover:text-[#C79A4B] transition-colors font-medium"
										>
											+91 99671 55543
										</a>
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-400">
					<div className="space-y-1">
						<p className="font-bold text-slate-200 text-sm">
							Ruskin Chemipharm · Est. 1984 · Mumbai, India
						</p>
						<p>
							&copy; {new Date().getFullYear()} Ruskin Chemipharm. All rights
							reserved.
						</p>
						<p className="text-[10px] text-slate-400 max-w-2xl leading-normal">
							Disclaimer: API/Substances covered by patent are not offered to
							countries where patent law is in force. Final responsibility lies
							with the customer.
						</p>
					</div>
					<div className="flex items-center gap-3 text-slate-400 font-medium shrink-0">
						<span className="hover:text-white cursor-pointer transition-colors">
							Privacy Policy
						</span>
						<span className="text-slate-600">·</span>
						<span className="hover:text-white cursor-pointer transition-colors">
							Terms of Use
						</span>
						<span className="text-slate-600">·</span>
						<span className="hover:text-white cursor-pointer transition-colors">
							FAQ
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
