import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pharmaceutical Services | Ruskin Chemipharm",
  description:
    "Ruskin Chemipharm services: CDSCO registration support, indenting and global sourcing, pharmaceutical trading and distribution, and import & export facilitation. Serving the industry since 1984.",
  keywords: [
    "CDSCO Registration",
    "Pharmaceutical Indenting",
    "Global API Sourcing",
    "Pharmaceutical Trading and Distribution",
    "Pharma Import Export India",
    "Ruskin Chemipharm Services",
  ],
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
