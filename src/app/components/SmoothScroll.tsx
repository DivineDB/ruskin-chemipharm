"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollContextType {
	lenis: Lenis | null;
	scrollTo: (target: string | number | HTMLElement, options?: any) => void;
	stop: () => void;
	start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
	lenis: null,
	scrollTo: () => {},
	stop: () => {},
	start: () => {},
});

export const useLenis = () => useContext(SmoothScrollContext);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
	const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
	const lenisRef = useRef<Lenis | null>(null);
	const pathname = usePathname();

	useEffect(() => {
		if (typeof window === "undefined") return;

		// Register GSAP ScrollTrigger plugin
		gsap.registerPlugin(ScrollTrigger);

		// Initialize Lenis luxury inertial smooth scrolling
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			orientation: "vertical",
			gestureOrientation: "vertical",
			smoothWheel: true,
			wheelMultiplier: 1.0,
			touchMultiplier: 1.5,
			autoRaf: false,
		});

		lenisRef.current = lenis;
		setLenisInstance(lenis);

		// Expose globally for instant zero-overhead access
		(window as any).__lenis = lenis;

		// 1. Sync Lenis scroll with GSAP ScrollTrigger
		lenis.on("scroll", ScrollTrigger.update);

		// 2. Drive Lenis through GSAP's unified ticker (eliminates dual-RAF drift & jank)
		const tickerUpdate = (time: number) => {
			lenis.raf(time * 1000);
		};
		gsap.ticker.add(tickerUpdate);
		gsap.ticker.lagSmoothing(0);

		// 3. Global anchor link smooth scroll interceptor (e.g., #capabilities, #hero)
		const handleAnchorClick = (e: MouseEvent) => {
			const anchor = (e.target as HTMLElement)?.closest('a[href*="#"]') as HTMLAnchorElement | null;
			if (!anchor) return;
			const href = anchor.getAttribute("href");
			if (!href) return;

			// Check if anchor is on current page
			const url = new URL(anchor.href, window.location.href);
			if (url.pathname === window.location.pathname && url.hash && url.hash.length > 1) {
				const element = document.querySelector(url.hash);
				if (element) {
					e.preventDefault();
					lenis.scrollTo(element as HTMLElement, {
						offset: -90,
						duration: 1.2,
						easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
					});
					window.history.pushState(null, "", url.hash);
				}
			}
		};
		document.addEventListener("click", handleAnchorClick);

		// 4. Event bridge for locking/unlocking scroll when modals open/close
		const handleStop = () => lenis.stop();
		const handleStart = () => lenis.start();

		window.addEventListener("ruskin:lenis-stop", handleStop);
		window.addEventListener("ruskin:lenis-start", handleStart);

		// 5. Automatic height sync when dynamic DOM updates (filters, tabs, accordions)
		let resizeTimer: NodeJS.Timeout | null = null;
		let resizeObserver: ResizeObserver | null = null;
		if (typeof ResizeObserver !== "undefined") {
			resizeObserver = new ResizeObserver(() => {
				if (resizeTimer) clearTimeout(resizeTimer);
				resizeTimer = setTimeout(() => {
					lenis.resize();
					ScrollTrigger.refresh();
				}, 120);
			});
			resizeObserver.observe(document.body);
		}

		return () => {
			document.removeEventListener("click", handleAnchorClick);
			window.removeEventListener("ruskin:lenis-stop", handleStop);
			window.removeEventListener("ruskin:lenis-start", handleStart);
			if (resizeObserver) resizeObserver.disconnect();
			if (resizeTimer) clearTimeout(resizeTimer);
			gsap.ticker.remove(tickerUpdate);
			lenis.destroy();
			lenisRef.current = null;
			delete (window as any).__lenis;
		};
	}, []);

	// Refresh ScrollTrigger and scroll to top smoothly on page route change
	useEffect(() => {
		if (!lenisRef.current) return;

		// Reset scroll position to top on route change without jarring jump
		lenisRef.current.scrollTo(0, { immediate: true });

		const timer1 = setTimeout(() => {
			lenisRef.current?.resize();
			ScrollTrigger.refresh();
		}, 80);

		const timer2 = setTimeout(() => {
			lenisRef.current?.resize();
			ScrollTrigger.refresh();
		}, 350);

		return () => {
			clearTimeout(timer1);
			clearTimeout(timer2);
		};
	}, [pathname]);

	const scrollTo = (target: string | number | HTMLElement, options?: any) => {
		if (lenisRef.current) {
			lenisRef.current.scrollTo(target, options);
		} else if (typeof window !== "undefined") {
			if (typeof target === "number") {
				window.scrollTo({ top: target, behavior: "smooth" });
			} else if (typeof target === "string") {
				const el = document.querySelector(target);
				el?.scrollIntoView({ behavior: "smooth" });
			} else if (target instanceof HTMLElement) {
				target.scrollIntoView({ behavior: "smooth" });
			}
		}
	};

	const stop = () => lenisRef.current?.stop();
	const start = () => lenisRef.current?.start();

	return (
		<SmoothScrollContext.Provider
			value={{
				lenis: lenisInstance,
				scrollTo,
				stop,
				start,
			}}
		>
			{children}
		</SmoothScrollContext.Provider>
	);
}
