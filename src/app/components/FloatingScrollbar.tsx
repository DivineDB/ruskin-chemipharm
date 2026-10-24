"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export default function FloatingScrollbar() {
	const [thumbHeight, setThumbHeight] = useState(0);
	const [mounted, setMounted] = useState(false);
	const [isDragging, setIsDragging] = useState(false);

	const thumbRef = useRef<HTMLDivElement>(null);
	const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const dragStartY = useRef(0);
	const dragStartScrollY = useRef(0);
	const rafScrollId = useRef<number | null>(null);
	const rafDragId = useRef<number | null>(null);

	const cachedDocHeight = useRef(0);
	const cachedWinHeight = useRef(0);
	const cachedThumbHeight = useRef(0);

	const topOffset = 18;
	const bottomOffset = 18;

	const recalculateMetrics = useCallback(() => {
		if (typeof window === "undefined") return;
		const docHeight = document.documentElement.scrollHeight;
		const winHeight = window.innerHeight;
		cachedDocHeight.current = docHeight;
		cachedWinHeight.current = winHeight;
		const maxScroll = docHeight - winHeight;

		if (maxScroll <= 10) {
			setThumbHeight(0);
			cachedThumbHeight.current = 0;
			return;
		}

		// Compact, elegant floating pill (min 28px, max 52px)
		const calculatedHeight = Math.max(
			28,
			Math.min(52, (winHeight / docHeight) * winHeight)
		);
		setThumbHeight(calculatedHeight);
		cachedThumbHeight.current = calculatedHeight;

		// Immediately sync thumb position
		const currentScroll = window.scrollY;
		const progress = Math.min(1, Math.max(0, currentScroll / maxScroll));
		const availableTrack = Math.max(
			0,
			winHeight - topOffset - bottomOffset - calculatedHeight
		);
		const thumbTop = topOffset + progress * availableTrack;

		if (thumbRef.current) {
			thumbRef.current.style.transform = `translate3d(0, ${thumbTop}px, 0)`;
			thumbRef.current.style.height = `${calculatedHeight}px`;
		}
	}, []);

	useEffect(() => {
		setMounted(true);
		recalculateMetrics();

		const handleScroll = () => {
			if (rafScrollId.current !== null) return;

			rafScrollId.current = requestAnimationFrame(() => {
				rafScrollId.current = null;
				const winHeight = cachedWinHeight.current || window.innerHeight;
				const docHeight = cachedDocHeight.current || document.documentElement.scrollHeight;
				const maxScroll = docHeight - winHeight;

				if (maxScroll <= 10 || cachedThumbHeight.current === 0) return;

				const currentScroll = window.scrollY;
				const progress = Math.min(1, Math.max(0, currentScroll / maxScroll));
				const availableTrack = Math.max(
					0,
					winHeight - topOffset - bottomOffset - cachedThumbHeight.current
				);
				const thumbTop = topOffset + progress * availableTrack;

				if (thumbRef.current) {
					thumbRef.current.style.transform = `translate3d(0, ${thumbTop}px, 0)`;
					thumbRef.current.dataset.scrolling = "true";
				}

				if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
				hideTimeoutRef.current = setTimeout(() => {
					if (thumbRef.current) {
						thumbRef.current.dataset.scrolling = "false";
					}
				}, 1200);
			});
		};

		const handleResize = () => {
			recalculateMetrics();
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleResize, { passive: true });

		let resizeObserver: ResizeObserver | null = null;
		if (typeof ResizeObserver !== "undefined") {
			resizeObserver = new ResizeObserver(() => {
				recalculateMetrics();
			});
			resizeObserver.observe(document.body);
		}

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
			if (resizeObserver) resizeObserver.disconnect();
			if (rafScrollId.current) cancelAnimationFrame(rafScrollId.current);
			if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
		};
	}, [recalculateMetrics]);

	// Handle dragging the thumb
	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsDragging(true);
		dragStartY.current = e.clientY;
		dragStartScrollY.current = window.scrollY;
	};

	useEffect(() => {
		if (!isDragging) return;

		const handleMouseMove = (e: MouseEvent) => {
			if (rafDragId.current !== null) return;

			rafDragId.current = requestAnimationFrame(() => {
				rafDragId.current = null;
				const deltaY = e.clientY - dragStartY.current;
				const winHeight = cachedWinHeight.current || window.innerHeight;
				const docHeight = cachedDocHeight.current || document.documentElement.scrollHeight;
				const tHeight = cachedThumbHeight.current;
				const availableTrack = winHeight - topOffset - bottomOffset - tHeight;
				if (availableTrack <= 0) return;

				const scrollRatio = deltaY / availableTrack;
				const targetScroll =
					dragStartScrollY.current + scrollRatio * (docHeight - winHeight);
				window.scrollTo({
					top: targetScroll,
					behavior: "instant" as ScrollBehavior,
				});
			});
		};

		const handleMouseUp = () => {
			setIsDragging(false);
			if (rafDragId.current) {
				cancelAnimationFrame(rafDragId.current);
				rafDragId.current = null;
			}
		};

		window.addEventListener("mousemove", handleMouseMove, { passive: true });
		window.addEventListener("mouseup", handleMouseUp);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
			if (rafDragId.current) cancelAnimationFrame(rafDragId.current);
		};
	}, [isDragging]);

	if (!mounted || thumbHeight === 0) return null;

	return (
		<div
			className="fixed right-0 top-0 bottom-0 w-3 z-[9999] pointer-events-none select-none"
			aria-hidden="true"
		>
			{/* Floating 4px Gold Pill — never touches top, ZERO track box */}
			<div
				ref={thumbRef}
				onMouseDown={handleMouseDown}
				style={{
					height: `${thumbHeight}px`,
					willChange: "transform, opacity",
				}}
				className={`absolute right-1 w-[4px] rounded-full bg-[#C79A4B] hover:bg-[#B58A3E] transition-opacity duration-300 pointer-events-auto cursor-grab active:cursor-grabbing shadow-sm data-[scrolling=true]:opacity-90 ${
					isDragging ? "opacity-90" : "opacity-40 hover:opacity-90"
				}`}
			/>
		</div>
	);
}
