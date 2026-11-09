import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finished Formulations | Human & Animal Healthcare | Ruskin Chemipharm",
  description:
    "Explore Ruskin Chemipharm's WHO-GMP finished formulations portfolio across Human Pharmaceuticals, Supplements, Veterinary Pharmaceuticals, Feed Supplements, and Ectoparasiticides.",
  keywords: [
    "Finished Formulations",
    "Human Pharmaceuticals",
    "Human Supplements",
    "Veterinary Pharmaceuticals",
    "Veterinary Feed Supplements",
    "Ectoparasiticides",
    "WHO-GMP Medicines",
    "Contract Manufacturing",
    "Ruskin Chemipharm",
  ],
};

export default function FinishedFormulationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

