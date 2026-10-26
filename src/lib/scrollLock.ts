import { useEffect } from "react";

let lockCount = 0;

/**
 * Locks background scrolling completely, including both native document scrolling
 * and Lenis inertial smooth scrolling.
 */
export function lockScroll(): void {
	if (typeof window === "undefined" || typeof document === "undefined") return;

	lockCount++;
	if (lockCount === 1) {
		document.body.style.overflow = "hidden";
		document.documentElement.style.overflow = "hidden";
		document.documentElement.classList.add("lenis-stopped");

		// Dispatch Lenis stop event handled by SmoothScroll
		window.dispatchEvent(new CustomEvent("ruskin:lenis-stop"));

		// Also directly stop Lenis instance if bound on window
		const lenis = (window as unknown as { __lenis?: { stop: () => void } }).__lenis;
		if (lenis && typeof lenis.stop === "function") {
			lenis.stop();
		}
	}
}

/**
 * Unlocks background scrolling once all active modals/drawers have closed.
 */
export function unlockScroll(): void {
	if (typeof window === "undefined" || typeof document === "undefined") return;

	lockCount = Math.max(0, lockCount - 1);
	if (lockCount === 0) {
		document.body.style.overflow = "";
		document.documentElement.style.overflow = "";
		document.documentElement.classList.remove("lenis-stopped");

		// Dispatch Lenis start event handled by SmoothScroll
		window.dispatchEvent(new CustomEvent("ruskin:lenis-start"));

		// Also directly start Lenis instance if bound on window
		const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis;
		if (lenis && typeof lenis.start === "function") {
			lenis.start();
		}
	}
}

/**
 * React hook to lock background scrolling whenever `isLocked` is true.
 * Cleans up automatically on unmount.
 */
export function useScrollLock(isLocked: boolean): void {
	useEffect(() => {
		if (!isLocked) return;
		lockScroll();
		return () => {
			unlockScroll();
		};
	}, [isLocked]);
}
