"use client";

import React from "react";

/* ───────────────────────────────────────────────────────────────────────────
   HEX GEOMETRY — one source of truth for every hexagon on the site.
   Pointy-top regular hexagons: width = √3 · r, height = 2r.
   ─────────────────────────────────────────────────────────────────────────── */

export const HEX_CLIP =
	"polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

/** Aspect ratio (w/h) of a regular pointy-top hexagon. */
export const HEX_RATIO = Math.sqrt(3) / 2;

export const hexVertex = (cx: number, cy: number, i: number, r: number) => {
	const a = (Math.PI / 180) * (60 * i - 90);
	return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
};

export const hexPoints = (cx: number, cy: number, r: number) =>
	Array.from({ length: 6 }, (_, i) => {
		const v = hexVertex(cx, cy, i, r);
		return `${v.x.toFixed(2)},${v.y.toFixed(2)}`;
	}).join(" ");

/* ───────────────────────────────────────────────────────────────────────────
   MolecularDecoration — fused benzene-style ring cluster
   ─────────────────────────────────────────────────────────────────────────── */
const R = 28;
const W = R * Math.sqrt(3);
const cellCenter = (q: number, r: number) => ({
	x: 80 + W * (q + r / 2),
	y: 70 + 1.5 * R * r,
});

const CELLS: { q: number; r: number; fill?: number; ring?: boolean }[] = [
	{ q: 0, r: 0, ring: true },
	{ q: 1, r: 0, fill: 0.12 },
	{ q: 0, r: 1 },
	{ q: 1, r: 1, fill: 0.06 },
	{ q: 2, r: 1, ring: true },
	{ q: 0, r: 2, fill: 0.12 },
];
const BONDS: [number, number][] = [
	[0, 0],
	[1, 1],
	[4, 2],
	[5, 3],
	[2, 4],
];
const CENTERS = CELLS.map((c) => cellCenter(c.q, c.r));

// Pre-computed static geometry (zero runtime trigonometric math during render)
const STATIC_CELL_POINTS = CELLS.map((_, i) => hexPoints(CENTERS[i].x, CENTERS[i].y, R));
const STATIC_BOND_DATA = BONDS.map(([ci, vi]) => {
	const { x, y } = CENTERS[ci];
	const a = hexVertex(x, y, vi, R);
	const b = hexVertex(x, y, vi, R + 22);
	return { a, b };
});
const STATIC_DOTS = CENTERS.map((c, i) => hexVertex(c.x, c.y, (i * 2) % 6, R));

export function MolecularDecoration({
	className = "",
	color = "#12304A",
	opacity = 0.15,
}: {
	className?: string;
	color?: string;
	opacity?: number;
}) {
	return (
		<svg
			viewBox="0 0 300 260"
			className={className}
			style={{ opacity }}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			focusable="false"
		>
			<g stroke={color} strokeWidth="1.75" strokeLinejoin="round">
				{CELLS.map((c, i) => (
					<polygon
						key={i}
						points={STATIC_CELL_POINTS[i]}
						fill={c.fill ? color : "none"}
						fillOpacity={c.fill ?? 0}
					/>
				))}
			</g>
			<g stroke={color} strokeWidth="1.25" opacity="0.7">
				{CELLS.map((c, i) =>
					c.ring ? (
						<circle key={i} cx={CENTERS[i].x} cy={CENTERS[i].y} r={R * 0.5} />
					) : null,
				)}
			</g>
			{STATIC_BOND_DATA.map(({ a, b }, k) => (
				<g key={k}>
					<line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={color} strokeWidth="1.5" />
					<circle cx={b.x} cy={b.y} r="4" fill={color} />
				</g>
			))}
			<g fill={color}>
				{STATIC_DOTS.map((v, i) => (
					<circle key={i} cx={v.x} cy={v.y} r="2.5" />
				))}
			</g>
		</svg>
	);
}

/* ───────────────────────────────────────────────────────────────────────────
   HexImage — a regular hexagon photo with a crisp frame.
   clip-path clips CSS borders, so the frame is an outer hex + inset inner hex.
   ─────────────────────────────────────────────────────────────────────────── */
export function HexImage({
	src,
	alt,
	width,
	height: customHeight,
	frame = "#FFFFFF",
	frameWidth = 4,
	className = "",
	imgClassName = "",
	glow = false,
	priority = false,
}: {
	src: string;
	alt: string;
	/** rendered width in px; height follows the regular-hexagon ratio */
	width?: number;
	height?: number;
	frame?: string;
	frameWidth?: number;
	className?: string;
	imgClassName?: string;
	glow?: boolean;
	priority?: boolean;
}) {
	const height = customHeight ?? (width ? Math.round(width / HEX_RATIO) : undefined);
	return (
		<div
			className={`relative transition-[filter,transform] duration-300 ${
				glow
					? "drop-shadow-[0_24px_45px_rgba(199,154,75,0.3)]"
					: "drop-shadow-[0_22px_40px_rgba(11,30,46,0.18)]"
			} ${className}`}
			style={{
				width: width ? `${width}px` : undefined,
				height: height ? `${height}px` : undefined,
				aspectRatio: !width && !height ? `${HEX_RATIO} / 1` : undefined,
			}}
		>
			<div className="absolute inset-0 transition-colors duration-300" style={{ clipPath: HEX_CLIP, background: frame }} />
			<div
				className="absolute overflow-hidden"
				style={{
					inset: frameWidth,
					clipPath: HEX_CLIP,
				}}
			>
				<img
					src={src}
					alt={alt}
					loading={priority ? "eager" : "lazy"}
					fetchPriority={priority ? "high" : "auto"}
					decoding="async"
					className={`w-full h-full object-cover transition-transform duration-700 ease-out ${imgClassName}`}
				/>
			</div>
		</div>
	);
}

/* ───────────────────────────────────────────────────────────────────────────
   HexIcon — small solid hex with an icon inside (lists, contact rows, etc.)
   ─────────────────────────────────────────────────────────────────────────── */
export function HexIcon({
	children,
	size = 32,
	bg = "#C79A4B",
	className = "",
}: {
	children: React.ReactNode;
	size?: number;
	bg?: string;
	className?: string;
}) {
	return (
		<span
			className={`inline-flex items-center justify-center flex-shrink-0 ${className}`}
			style={{ width: size * HEX_RATIO * 1.08, height: size, clipPath: HEX_CLIP, background: bg }}
		>
			{children}
		</span>
	);
}

/* ───────────────────────────────────────────────────────────────────────────
   HexBadge — outlined numbered hex (services / process steps)
   ─────────────────────────────────────────────────────────────────────────── */
export function HexBadge({ num, active }: { num: number; active?: boolean }) {
	return (
		<div className="relative flex-shrink-0 w-14 h-14 flex items-center justify-center">
			<svg viewBox="0 0 60 60" className="absolute inset-0 w-full h-full" fill="none" aria-hidden="true">
				<polygon
					points={hexPoints(30, 30, 28)}
					fill={active ? "#C79A4B" : "transparent"}
					stroke="#C79A4B"
					strokeWidth="1.5"
					strokeLinejoin="round"
					style={{ transition: "fill 0.4s ease" }}
				/>
				<polygon
					points={hexPoints(30, 30, 22)}
					stroke={active ? "rgba(255,255,255,0.45)" : "rgba(199,154,75,0.35)"}
					strokeWidth="1"
					strokeLinejoin="round"
				/>
			</svg>
			<span
				className={`stat-num relative text-base z-10 transition-colors duration-300 ${active ? "text-white" : "text-[#C79A4B]"}`}
			>
				{String(num).padStart(2, "0")}
			</span>
		</div>
	);
}

/* ───────────────────────────────────────────────────────────────────────────
   FloatingHex — delicate animated geometric floating hexagon
   ─────────────────────────────────────────────────────────────────────────── */
export function FloatingHex({
	size = 24,
	color = "#C79A4B",
	strokeWidth = 1.25,
	opacity = 0.2,
	hasInner = false,
	hasDot = false,
	className = "",
}: {
	size?: number;
	color?: string;
	strokeWidth?: number;
	opacity?: number;
	hasInner?: boolean;
	hasDot?: boolean;
	className?: string;
}) {
	const cx = size / 2;
	const cy = size / 2;
	const r = (size - 4) / 2;
	return (
		<svg
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			className={className}
			style={{ opacity }}
			fill="none"
			aria-hidden="true"
		>
			<polygon
				points={hexPoints(cx, cy, r)}
				stroke={color}
				strokeWidth={strokeWidth}
				fill="none"
				strokeLinejoin="round"
			/>
			{hasInner && (
				<polygon
					points={hexPoints(cx, cy, r * 0.52)}
					stroke={color}
					strokeWidth={strokeWidth * 0.8}
					fill="none"
					strokeLinejoin="round"
					opacity="0.7"
				/>
			)}
			{hasDot && <circle cx={cx} cy={cy} r="2" fill={color} opacity="0.8" />}
		</svg>
	);
}
