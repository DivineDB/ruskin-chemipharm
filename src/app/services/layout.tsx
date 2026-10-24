import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pharmaceutical Services & Sourcing Capabilities | Ruskin Chemipharm",
  description:
    "Comprehensive pharmaceutical indenting capabilities: Global API sourcing from 250+ audited cGMP facilities, CDSCO/DCGI import registrations, USDMF/CEP technical documentation, domestic distribution, and temperature-controlled cold-chain logistics.",
  keywords: [
    "Pharmaceutical Indenting Services",
    "API Sourcing",
    "DCGI Registration India",
    "CDSCO Form 41 Form 10",
    "USDMF CEP Documentation",
    "Pharma Cold-Chain Logistics",
    "Active Pharmaceutical Ingredients Distribution",
    "cGMP Vendor Auditing",
  ],
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
