import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Finished Formulations | Human & Animal Healthcare | Ruskin Chemipharm",
  description:
    "Explore Ruskin Chemipharm's consolidated WHO-GMP finished formulations portfolio across Human Pharmaceuticals, Supplements, Veterinary Pharmaceuticals, Feed Supplements, and Ectoparasiticides.",
  keywords: [
    "Finished Formulations",
    "Commercial Formulations",
    "Human Pharmaceuticals",
    "Human Supplements",
    "Nutraceuticals",
    "Veterinary Pharmaceuticals",
    "Veterinary Feed Supplements",
    "Ectoparasiticides",
    "WHO-GMP Medicines",
    "CTD Dossier",
    "Ruskin Chemipharm",
  ],
};

export default function FormulationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

