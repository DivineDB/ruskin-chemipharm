import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Commercial Sourcing Desk | Ruskin Chemipharm",
  description:
    "Direct contact channels to Ruskin Chemipharm's Mumbai headquarters and technical regulatory desk. Request commercial API quotations, USDMF & CEP dossiers, and custom synthesis support.",
  keywords: [
    "Contact Ruskin Chemipharm",
    "Pharma API Inquiry",
    "USDMF Dossier Request",
    "CEP Documentation",
    "Mumbai API Supplier",
    "Chemical Synthesis Consultation",
    "Bhangwadi Kalbadevi Mumbai",
  ],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
