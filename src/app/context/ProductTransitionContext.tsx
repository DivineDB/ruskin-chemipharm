"use client";

import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export interface RectData {
	top: number;
	left: number;
	width: number;
	height: number;
	fontSize: number;
	lineHeight: string;
	fontWeight: string;
	color: string;
}

export interface TransitionPayload {
	name: string;
	category?: string;
	slug: string;
}

interface ProductTransitionState {
	product: TransitionPayload;
	sourceRect: RectData;
	targetRect: RectData | null;
	defaultTargetFontSize: number;
	status: "starting" | "landing" | "completed";
}

interface ProductTransitionContextType {
	activeProduct: TransitionPayload | null;
	isTransitioningFor: (productName: string) => boolean;
	startTransition: (
		product: TransitionPayload,
		headingEl: HTMLElement,
		cardEl?: HTMLElement | null
	) => void;
	registerTarget: (headingEl: HTMLElement | null) => void;
}

const ProductTransitionContext = createContext<ProductTransitionContextType>({
	activeProduct: null,
	isTransitioningFor: () => false,
	startTransition: () => {},
	registerTarget: () => {},
});

export function ProductTransitionProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const [transitionState, setTransitionState] =
		useState<ProductTransitionState | null>(null);

	// Safety timeout: If transition takes longer than 1200ms, complete cleanly
	useEffect(() => {
		if (transitionState && transitionState.status !== "completed") {
			const timer = setTimeout(() => {
				setTransitionState((prev) =>
					prev ? { ...prev, status: "completed" } : null
				);
				setTimeout(() => setTransitionState(null), 100);
			}, 1200);
			return () => clearTimeout(timer);
		}
	}, [transitionState]);

	// Forward transition: Catalog card -> Product Detail Page
	const startTransition = useCallback(
		(
			product: TransitionPayload,
			headingEl: HTMLElement,
			cardEl?: HTMLElement | null
		) => {
			const rect = headingEl.getBoundingClientRect();
			const computed = window.getComputedStyle(headingEl);
			const fontSize = parseFloat(computed.fontSize) || 17;
			const defaultTargetFontSize =
				typeof window !== "undefined"
					? window.innerWidth >= 1024
						? 48
						: window.innerWidth >= 640
						? 36
						: 30
					: 48;

			setTransitionState({
				product,
				sourceRect: {
					top: rect.top,
					left: rect.left,
					width: rect.width,
					height: rect.height,
					fontSize,
					lineHeight: computed.lineHeight || "1.375",
					fontWeight: computed.fontWeight || "700",
					color: computed.color || "#FFFFFF",
				},
				targetRect: null,
				defaultTargetFontSize,
				status: "starting",
			});

			router.push(`/products/${product.slug}`);
		},
		[router]
	);

	// Register target for forward transition on detail page mount
	const registerTarget = useCallback((headingEl: HTMLElement | null) => {
		if (!headingEl) return;

		// Ensure the new page viewport is anchored to top for pristine alignment
		if (typeof window !== "undefined" && window.scrollY !== 0) {
			window.scrollTo({ top: 0, left: 0, behavior: "instant" });
		}

		const rect = headingEl.getBoundingClientRect();
		const computed = window.getComputedStyle(headingEl);
		const fontSize = parseFloat(computed.fontSize) || 48;

		setTransitionState((prev) => {
			if (!prev || prev.status === "completed") return prev;
			return {
				...prev,
				targetRect: {
					top: rect.top,
					left: rect.left,
					width: rect.width,
					height: rect.height,
					fontSize,
					lineHeight: computed.lineHeight || "1.25",
					fontWeight: computed.fontWeight || "800",
					color: "#12304A",
				},
				status: "landing",
			};
		});
	}, []);

	const isTransitioningFor = useCallback(
		(productName: string) => {
			return (
				transitionState !== null &&
				transitionState.product.name.toLowerCase() ===
					productName.toLowerCase() &&
				transitionState.status !== "completed"
			);
		},
		[transitionState]
	);

	const handleAnimationComplete = () => {
		if (transitionState?.status === "landing") {
			setTransitionState((prev) =>
				prev ? { ...prev, status: "completed" } : null
			);
			setTimeout(() => {
				setTransitionState(null);
			}, 100);
		}
	};

	const targetFontSize =
		transitionState?.targetRect?.fontSize ||
		transitionState?.defaultTargetFontSize ||
		48;
	const sourceScale = transitionState
		? transitionState.sourceRect.fontSize / targetFontSize
		: 1;

	return (
		<ProductTransitionContext.Provider
			value={{
				activeProduct: transitionState ? transitionState.product : null,
				isTransitioningFor,
				startTransition,
				registerTarget,
			}}
		>
			{children}

			{/* Pure Minimal GPU-Accelerated Fluid Typography Transition */}
			<AnimatePresence>
				{transitionState && (
					<div
						className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
						aria-hidden="true"
					>
						<motion.div
							initial={{
								x: transitionState.sourceRect.left,
								y: transitionState.sourceRect.top,
								scale: sourceScale,
								color: "#FFFFFF",
								opacity: 1,
							}}
							animate={
								transitionState.status === "completed"
									? {
											x:
												transitionState.targetRect?.left ??
												transitionState.sourceRect.left,
											y:
												transitionState.targetRect?.top ??
												transitionState.sourceRect.top,
											scale: 1,
											color: "#12304A",
											opacity: 0,
									  }
									: transitionState.targetRect
									? {
											x: transitionState.targetRect.left,
											y: transitionState.targetRect.top,
											scale: 1,
											color: "#12304A",
											opacity: 1,
									  }
									: {
											x: transitionState.sourceRect.left,
											y: transitionState.sourceRect.top - 2,
											scale: sourceScale * 1.015,
											color: "#FFFFFF",
											opacity: 1,
									  }
							}
							transition={
								transitionState.status === "completed"
									? { duration: 0.12, ease: "easeOut" }
									: {
											duration: 0.52,
											ease: [0.16, 1, 0.3, 1],
									  }
							}
							onAnimationComplete={handleAnimationComplete}
							style={{
								position: "fixed",
								top: 0,
								left: 0,
								margin: 0,
								padding: 0,
								fontSize: `${targetFontSize}px`,
								lineHeight:
									transitionState.targetRect?.lineHeight || "1.25",
								fontWeight: 800,
								width: "max-content",
								maxWidth: "90vw",
								fontFamily: "var(--font-plus-jakarta), sans-serif",
								letterSpacing: "-0.025em",
								transformOrigin: "top left",
								textRendering: "optimizeLegibility",
								WebkitFontSmoothing: "antialiased",
								willChange: "transform, color, opacity",
							}}
						>
							{transitionState.product.name}
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</ProductTransitionContext.Provider>
	);
}

export function useProductTransition() {
	return useContext(ProductTransitionContext);
}
