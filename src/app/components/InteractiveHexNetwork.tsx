"use client";

import React, { useEffect, useRef } from "react";

interface HexCell {
	q: number;
	r: number;
	baseX: number;
	baseY: number;
	x: number;
	y: number;
	hasInnerAccent: boolean;
	baseAlpha: number;
	textDampen: number; // 0.12 (deep inside text) to 1.0 (free space / right side)
	glow: number; // 0 to 1 smooth eased intensity
}

export default function InteractiveHexNetwork({
	className = "",
	interactive = true,
}: {
	className?: string;
	interactive?: boolean;
}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const mouseRef = useRef({
		x: -1000,
		y: -1000,
		targetX: -1000,
		targetY: -1000,
		parallaxX: 0,
		parallaxY: 0,
		parallaxTargetX: 0,
		parallaxTargetY: 0,
		active: false,
	});

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const ctx = canvas.getContext("2d", { alpha: true });
		if (!ctx) return;

		let animationFrameId: number | null = null;
		let isLoopRunning = false;
		let isInView = true;
		let width = container.clientWidth || 1200;
		let height = container.clientHeight || 800;
		let dpr = 1;

		// Offscreen canvas for caching Pass 1 (resting lattice of 400+ hexagons)
		const offscreenCanvas = document.createElement("canvas");
		const offscreenCtx = offscreenCanvas.getContext("2d", { alpha: true });
		const PARALLAX_PADDING = 30;

		// Cached container rect to eliminate layout thrashing (getBoundingClientRect) on every mousemove
		let cachedRect: { left: number; top: number; width: number; height: number } | null = null;
		const updateCachedRect = () => {
			if (!container) return;
			const r = container.getBoundingClientRect();
			cachedRect = { left: r.left, top: r.top, width: r.width, height: r.height };
		};

		// Hexagon Lattice Geometry (Pointy-topped)
		const HEX_RADIUS = 38;
		const HEX_WIDTH = Math.sqrt(3) * HEX_RADIUS;
		const VERT_DIST = 1.5 * HEX_RADIUS;
		const CORNER_RADIUS = 4.5; // Smooth filleted rounded corners

		// 6 regular pointy-top vertex relative offsets
		const vertexAngles: number[] = [];
		for (let i = 0; i < 6; i++) {
			vertexAngles.push((Math.PI / 180) * (60 * i - 30));
		}

		// Helper: Get vertices array for a hexagon
		const getHexVertices = (cx: number, cy: number, radius: number) => {
			const verts: { x: number; y: number }[] = [];
			for (let i = 0; i < 6; i++) {
				verts.push({
					x: cx + radius * Math.cos(vertexAngles[i]),
					y: cy + radius * Math.sin(vertexAngles[i]),
				});
			}
			return verts;
		};

		// Helper: Draw smooth rounded-corner hexagon path
		const drawRoundedHexagonPath = (
			c: CanvasRenderingContext2D,
			verts: { x: number; y: number }[],
			rCorner: number
		) => {
			c.beginPath();
			const midX = (verts[5].x + verts[0].x) / 2;
			const midY = (verts[5].y + verts[0].y) / 2;
			c.moveTo(midX, midY);

			for (let i = 0; i < 6; i++) {
				const next = (i + 1) % 6;
				c.arcTo(verts[i].x, verts[i].y, verts[next].x, verts[next].y, rCorner);
			}
			c.closePath();
		};

		const cells: HexCell[] = [];

		const setupCanvas = () => {
			if (!canvas || !container) return;
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = container.clientWidth;
			height = container.clientHeight;

			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			// Setup offscreen canvas with extra margin for parallax movement
			const offW = width + PARALLAX_PADDING * 2;
			const offH = height + PARALLAX_PADDING * 2;
			offscreenCanvas.width = Math.round(offW * dpr);
			offscreenCanvas.height = Math.round(offH * dpr);
			if (offscreenCtx) {
				offscreenCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
			}

			updateCachedRect();
		};

		const initGrid = () => {
			cells.length = 0;

			const cols = Math.ceil(width / HEX_WIDTH) + 3;
			const rows = Math.ceil(height / VERT_DIST) + 3;

			for (let r = -1; r < rows; r++) {
				const rOffset = ((r % 2 + 2) % 2) * (HEX_WIDTH / 2);
				for (let q = -1; q < cols; q++) {
					const cx = q * HEX_WIDTH + rOffset;
					const cy = r * VERT_DIST;

					const normX = cx / width;
					const normY = cy / height;

					// Deterministic pseudo-random seed
					const hash = Math.sin(q * 19.341 + r * 53.897) * 43758.5453;
					const rand = hash - Math.floor(hash);

					const isExtremeLeft = normX < 0.14;

					// Text zone is centered around the left headline & copy (normX ~ 0.33, normY ~ 0.46)
					const textCenterX = 0.33;
					const textCenterY = 0.46;
					const dxText = (normX - textCenterX) * 2.2;
					const dyText = (normY - textCenterY) * 1.5;
					const distToText = Math.sqrt(dxText * dxText + dyText * dyText);

					// Text zone dampening factor for mouse interaction
					let textDampen = 1.0;
					if (isExtremeLeft) {
						// Extreme left flank outside text: clear and responsive interaction
						textDampen = 0.75;
					} else if (normX <= 0.56 && distToText < 0.55) {
						const textProximity = Math.max(0, 1 - distToText / 0.55);
						// Deep in text, dampen interaction to 12% so it's whisper-soft
						textDampen = Math.max(0.12, 1 - textProximity * 0.88);
					}

					let isVisible = false;
					let baseAlpha = 0.085;

					if (isExtremeLeft) {
						// Extreme left of the page: boost visibility and population
						isVisible = rand > 0.22;
						baseAlpha = 0.075 + Math.max(0, 0.14 - normX) * 0.15; // 0.075 to ~0.096
					} else if (distToText < 0.32) {
						// Inside the main left text: soft, sparse, and minimal so text reads effortlessly
						isVisible = rand > 0.65;
						baseAlpha = 0.02;
					} else if (distToText < 0.50) {
						// Gentle transition boundary immediately surrounding the left text
						isVisible = rand > 0.45;
						baseAlpha = 0.045;
					} else {
						// Rest of the screen (top, right, bottom, corners): crisp, lively, and prominent
						isVisible = rand > 0.30;
						baseAlpha = 0.09;
					}

					if (isVisible) {
						// Inner accents on extreme left and open spaces, strictly excluded from text zone
						const hasInnerAccent = rand > 0.70 && (isExtremeLeft || distToText >= 0.48);

						cells.push({
							q,
							r,
							baseX: cx,
							baseY: cy,
							x: cx,
							y: cy,
							hasInnerAccent,
							baseAlpha,
							textDampen,
							glow: 0.0,
						});
					}
				}
			}
		};

		// Pre-render Pass 1 (resting letterpress lattice) ONCE to offscreen canvas
		const renderOffscreenLattice = () => {
			if (!offscreenCtx) return;
			const offW = width + PARALLAX_PADDING * 2;
			const offH = height + PARALLAX_PADDING * 2;
			offscreenCtx.clearRect(0, 0, offW, offH);

			offscreenCtx.save();
			offscreenCtx.translate(PARALLAX_PADDING, PARALLAX_PADDING);

			// Render ambient stroke for all resting cells
			for (const cell of cells) {
				const cx = cell.baseX;
				const cy = cell.baseY;
				const verts = getHexVertices(cx, cy, HEX_RADIUS);

				offscreenCtx.save();
				drawRoundedHexagonPath(offscreenCtx, verts, CORNER_RADIUS);
				offscreenCtx.strokeStyle = `rgba(18, 48, 74, ${cell.baseAlpha})`;
				offscreenCtx.lineWidth = 0.7;
				offscreenCtx.stroke();

				// Resting inner geometric motifs
				if (cell.hasInnerAccent) {
					const innerVerts = getHexVertices(cx, cy, HEX_RADIUS * 0.52);
					drawRoundedHexagonPath(offscreenCtx, innerVerts, CORNER_RADIUS * 0.5);
					offscreenCtx.strokeStyle = `rgba(199, 154, 75, ${cell.baseAlpha * 0.75})`;
					offscreenCtx.lineWidth = 0.55;
					offscreenCtx.stroke();
				}

				offscreenCtx.restore();
			}

			offscreenCtx.restore();
		};

		setupCanvas();
		initGrid();
		renderOffscreenLattice();

		const startLoop = () => {
			if (!isLoopRunning && isInView) {
				isLoopRunning = true;
				animationFrameId = requestAnimationFrame(render);
			}
		};

		const stopLoop = () => {
			if (animationFrameId !== null) {
				cancelAnimationFrame(animationFrameId);
				animationFrameId = null;
			}
			isLoopRunning = false;
		};

		const handleResize = () => {
			setupCanvas();
			initGrid();
			renderOffscreenLattice();
			startLoop();
		};

		window.addEventListener("resize", handleResize, { passive: true });

		// Mouse tracking scoped to heroSection to completely eliminate global window mousemove overhead
		const heroSection = (container.closest("section") as HTMLElement) || container;

		const handleMouseMove = (e: MouseEvent) => {
			if (!interactive || !isInView) return;
			if (!cachedRect) updateCachedRect();
			if (!cachedRect) return;

			const x = e.clientX - cachedRect.left;
			const y = e.clientY - cachedRect.top;

			if (x >= 0 && x <= cachedRect.width && y >= 0 && y <= cachedRect.height) {
				const m = mouseRef.current;
				m.targetX = x;
				m.targetY = y;
				m.parallaxTargetX = (x / cachedRect.width - 0.5) * 2;
				m.parallaxTargetY = (y / cachedRect.height - 0.5) * 2;
				m.active = true;
				startLoop();
			} else if (mouseRef.current.active) {
				mouseRef.current.active = false;
				mouseRef.current.parallaxTargetX = 0;
				mouseRef.current.parallaxTargetY = 0;
			}
		};

		const handleMouseEnter = () => {
			updateCachedRect();
			startLoop();
		};

		const handleMouseLeave = () => {
			mouseRef.current.active = false;
			mouseRef.current.parallaxTargetX = 0;
			mouseRef.current.parallaxTargetY = 0;
		};

		heroSection.addEventListener("mousemove", handleMouseMove, { passive: true });
		heroSection.addEventListener("mouseenter", handleMouseEnter, { passive: true });
		heroSection.addEventListener("mouseleave", handleMouseLeave, { passive: true });

		// IntersectionObserver: automatically pauses rendering when scrolled offscreen
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					isInView = entry.isIntersecting;
					if (isInView) {
						updateCachedRect();
						startLoop();
					} else {
						stopLoop();
					}
				}
			},
			{ threshold: 0.05 }
		);
		observer.observe(container);

		// Animation Loop
		let time = 0;
		const render = () => {
			if (!isInView) {
				stopLoop();
				return;
			}

			time += 0.012;
			const m = mouseRef.current;

			// Smooth exponential ease-out for mouse coordinates
			if (m.active) {
				m.x += (m.targetX - m.x) * 0.09;
				m.y += (m.targetY - m.y) * 0.09;
			} else {
				m.x += (-1000 - m.x) * 0.05;
				m.y += (-1000 - m.y) * 0.05;
			}

			// Smooth parallax spring
			m.parallaxX += (m.parallaxTargetX - m.parallaxX) * 0.035;
			m.parallaxY += (m.parallaxTargetY - m.parallaxY) * 0.035;

			const mx = m.x;
			const my = m.y;
			const mouseActive = m.active;
			const px = m.parallaxX;
			const py = m.parallaxY;

			ctx.clearRect(0, 0, width, height);

			// ─── 1. Draw Cached Pre-rendered Pass 1 Lattice (1 Hardware Draw Call!) ───
			ctx.drawImage(
				offscreenCanvas,
				-PARALLAX_PADDING + px * 6,
				-PARALLAX_PADDING + py * 4,
				width + PARALLAX_PADDING * 2,
				height + PARALLAX_PADDING * 2
			);

			// ─── 2. Update Cell Positions & Identify Closest Active Hexagons ───
			for (const cell of cells) {
				cell.x = cell.baseX + px * 6;
				cell.y = cell.baseY + py * 4;
			}

			const MAX_DIST = 145;
			const candidates: { cell: HexCell; dist: number }[] = [];

			if (mouseActive) {
				for (const cell of cells) {
					const d = Math.hypot(mx - cell.x, my - cell.y);
					if (d < MAX_DIST) {
						candidates.push({ cell, dist: d });
					}
				}
				candidates.sort((a, b) => a.dist - b.dist);
			}

			// Strictly cap at top 2 or 3 cells
			const activeTargets = candidates.slice(0, 3);
			const activeMap = new Map<HexCell, { rank: number; dist: number }>();
			activeTargets.forEach((item, idx) => {
				activeMap.set(item.cell, { rank: idx, dist: item.dist });
			});

			let maxGlow = 0;
			for (const cell of cells) {
				const activeInfo = activeMap.get(cell);

				if (activeInfo) {
					const baseGlow = activeInfo.rank === 0 ? 1.0 : activeInfo.rank === 1 ? 0.75 : 0.5;
					const targetGlow = baseGlow * cell.textDampen;
					cell.glow += (targetGlow - cell.glow) * 0.09;
				} else if (cell.glow > 0.005) {
					cell.glow += (0 - cell.glow) * 0.04;
				} else {
					cell.glow = 0;
				}
				if (cell.glow > maxGlow) maxGlow = cell.glow;
			}

			// ─── 3. PASS 2: Embossed Luxury Glass Elevation & Specular Glint ───
			// Rendered strictly for the 2 to 3 activated cells
			if (maxGlow > 0.01) {
				for (const cell of cells) {
					const glow = cell.glow;
					if (glow <= 0.01) continue;

					const cx = cell.x;
					const cy = cell.y;
					const dampen = cell.textDampen;

					ctx.save();

					// Subtle tactile lift (scaled down in text zone so text never feels jostled)
					const curScale = 0.985 + 0.03 * (1 - Math.pow(1 - Math.min(1, glow), 3)) * dampen;
					const curRadius = HEX_RADIUS * curScale;
					const verts = getHexVertices(cx, cy, curRadius);

					// Frosted glass tile fill (whisper-soft in text zone)
					drawRoundedHexagonPath(ctx, verts, CORNER_RADIUS);
					const glassFill = ctx.createLinearGradient(cx, cy - curRadius, cx, cy + curRadius);
					glassFill.addColorStop(0, `rgba(255, 255, 255, ${glow * 0.28 * dampen})`);
					glassFill.addColorStop(0.5, `rgba(250, 247, 242, ${glow * 0.14 * dampen})`);
					glassFill.addColorStop(1, `rgba(199, 154, 75, ${glow * 0.04 * dampen})`);
					ctx.fillStyle = glassFill;
					ctx.fill();

					// Golden stroke outline: whisper-soft behind text, rich outside
					const strokeAlpha = Math.min(0.65, (0.10 + glow * 0.38) * dampen);
					ctx.strokeStyle = `rgba(199, 154, 75, ${strokeAlpha})`;
					ctx.lineWidth = 0.65 + glow * 0.25 * dampen;
					ctx.stroke();

					// Reset shadow
					ctx.shadowBlur = 0;
					ctx.shadowOffsetY = 0;

					// Inner subtle rim (only when outside text area)
					if (dampen > 0.45) {
						const innerVerts = getHexVertices(cx, cy, curRadius - 3.2);
						drawRoundedHexagonPath(ctx, innerVerts, Math.max(1, CORNER_RADIUS - 1.2));
						ctx.strokeStyle = `rgba(255, 255, 255, ${glow * 0.35 * dampen})`;
						ctx.lineWidth = 0.5;
						ctx.stroke();
					}

					// Inner Concentric Hex Accent (only outside text area)
					if (cell.hasInnerAccent && dampen > 0.6) {
						const microVerts = getHexVertices(cx, cy, curRadius * (0.50 + 0.015 * glow));
						drawRoundedHexagonPath(ctx, microVerts, Math.max(1, CORNER_RADIUS * 0.5));
						ctx.strokeStyle = `rgba(199, 154, 75, ${(0.12 + glow * 0.20) * dampen})`;
						ctx.lineWidth = 0.45;
						ctx.stroke();
					}

					ctx.restore();
				}
			}

			// Idle sleep check: if mouse inactive, all glows settled to 0, and parallax at rest
			const parallaxSettled =
				Math.abs(m.parallaxTargetX - m.parallaxX) < 0.001 &&
				Math.abs(m.parallaxTargetY - m.parallaxY) < 0.001;

			if (!mouseActive && maxGlow <= 0.005 && parallaxSettled) {
				stopLoop();
				return;
			}

			animationFrameId = requestAnimationFrame(render);
		};

		// Initial frame render
		startLoop();

		return () => {
			stopLoop();
			observer.disconnect();
			window.removeEventListener("resize", handleResize);
			heroSection.removeEventListener("mousemove", handleMouseMove);
			heroSection.removeEventListener("mouseenter", handleMouseEnter);
			heroSection.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [interactive]);

	return (
		<div
			ref={containerRef}
			className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
		>
			<canvas
				ref={canvasRef}
				className="w-full h-full block"
				style={{ touchAction: "none" }}
			/>
		</div>
	);
}
