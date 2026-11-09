export type FormulationDivisionId =
  | "human-pharma"
  | "human-nutra"
  | "vet-pharma"
  | "vet-supplements"
  | "ectoparasiticides";

export interface FinishedProduct {
  id: string;
  name: string;
  composition: string;
  category: string;
  division: FormulationDivisionId;
  form: string;
  packSize: string;
  description: string;
  standard?: string;
  targetSpecies?: string;
}

export interface FormulationCategoryMeta {
  id: FormulationDivisionId;
  title: string;
  shortTitle: string;
  segment: "Human Healthcare" | "Animal Healthcare";
  badge: string;
  description: string;
  highlightStats: string;
  dosageForms: string[];
}

export const FORMULATION_CATEGORIES: FormulationCategoryMeta[] = [
  {
    id: "human-pharma",
    title: "Human Pharmaceuticals",
    shortTitle: "Human Pharma",
    segment: "Human Healthcare",
    badge: "WHO-GMP Certified",
    description:
      "Essential and life-saving finished formulations manufactured under strict cGMP protocols, catering to high-burden therapeutic indications worldwide.",
    highlightStats: "10 Formulations · Multi-Market Dossiers",
    dosageForms: ["Tablets", "Capsules", "Oral Solids", "Alu-Alu Packs"],
  },
  {
    id: "human-nutra",
    title: "Human Supplements",
    shortTitle: "Nutraceuticals",
    segment: "Human Healthcare",
    badge: "FSSAI & GMP Approved",
    description:
      "Advanced dietary nutrients, daily wellness formulas, and high-potency restorative softgels supporting immunity, joint vitality, and cellular energy.",
    highlightStats: "7 Formulations · Bioavailable Actives",
    dosageForms: ["Softgels", "Coated Tablets", "Capsules", "Powder Tins"],
  },
  {
    id: "vet-pharma",
    title: "Veterinary Pharmaceuticals",
    shortTitle: "Vet Pharma",
    segment: "Animal Healthcare",
    badge: "Livestock & Herd Grade",
    description:
      "High-potency veterinary therapeutics engineered for herd health management, livestock anti-infectives, long-acting injections, and anti-inflammatory relief.",
    highlightStats: "7 Formulations · Large Animal Health",
    dosageForms: ["Sterile Injections", "Oral Liquids", "Boluses", "Suspensions"],
  },
  {
    id: "vet-supplements",
    title: "Veterinary Feed Supplements",
    shortTitle: "Feed Supplements",
    segment: "Animal Healthcare",
    badge: "Feed Mill & Dairy Grade",
    description:
      "Chelated mineral pre-mixes, lactation boosters, toxin binders, and bypass fats formulated to maximize dairy yield, feed conversion, and immunity in poultry and cattle.",
    highlightStats: "6 Formulations · Yield Maximizers",
    dosageForms: ["Cans & Bulk Liquids", "Chelated Powders", "Multi-wall Bags"],
  },
  {
    id: "ectoparasiticides",
    title: "Ectoparasiticides",
    shortTitle: "Ectoparasiticides",
    segment: "Animal Healthcare",
    badge: "High-Efficacy Acaricides",
    description:
      "Targeted topical parasiticide solutions protecting dairy herds, sheep, and companion animals against ticks, mites, biting lice, flies, and flea infestations.",
    highlightStats: "5 Formulations · Residual Protection",
    dosageForms: ["Pour-on Solutions", "EC Concentrates", "Pump Sprays"],
  },
];

export const FINISHED_PRODUCTS: FinishedProduct[] = [
  // ── 1. HUMAN PHARMACEUTICALS (10 products) ──
  {
    id: "hp-1",
    name: "RUS-PARA 500",
    composition: "Paracetamol BP 500mg",
    category: "Analgesic & Antipyretic",
    division: "human-pharma",
    form: "Tablet",
    packSize: "10 x 10 Blister",
    standard: "BP",
    description:
      "Rapid relief from mild to moderate pain including headache, toothache, and lowering high fever in acute viral and bacterial syndromes.",
  },
  {
    id: "hp-2",
    name: "AMOXY-RUS 500",
    composition: "Amoxicillin Trihydrate BP eq. to Amoxicillin 500mg",
    category: "Antibacterial / Antibiotic",
    division: "human-pharma",
    form: "Capsule",
    packSize: "10 x 10 Alu-Alu",
    standard: "BP",
    description:
      "Broad-spectrum penicillin antibiotic indicated for bacterial infections of the respiratory tract, urinary tract, ENT, and soft tissues.",
  },
  {
    id: "hp-3",
    name: "AZITH-RUS 500",
    composition: "Azithromycin Dihydrate USP eq. to Azithromycin 500mg",
    category: "Macrolide Antibiotic",
    division: "human-pharma",
    form: "Tablet",
    packSize: "1 x 3 Blister / 1 x 5 Blister",
    standard: "USP",
    description:
      "Advantageous short-course treatment for upper and lower respiratory tract infections, tonsillitis, community-acquired pneumonia, and skin infections.",
  },
  {
    id: "hp-4",
    name: "GLYCI-RUS 500",
    composition: "Metformin Hydrochloride IP 500mg",
    category: "Oral Antidiabetic",
    division: "human-pharma",
    form: "Tablet",
    packSize: "10 x 15 Blister",
    standard: "IP",
    description:
      "First-line oral biguanide medication for the management of Type-2 diabetes mellitus, assisting in glycemic control without inducing hypoglycemia.",
  },
  {
    id: "hp-5",
    name: "LIPID-RUS 10",
    composition: "Atorvastatin Calcium IP eq. to Atorvastatin 10mg",
    category: "Cardiovascular / Lipid-lowering",
    division: "human-pharma",
    form: "Tablet",
    packSize: "10 x 10 Alu-Alu",
    standard: "IP",
    description:
      "HMG-CoA reductase inhibitor (statin) indicated to lower circulating LDL cholesterol and triglycerides, mitigating long-term cardiovascular risks.",
  },
  {
    id: "hp-6",
    name: "OME-RUS 20",
    composition: "Omeprazole BP 20mg (as enteric coated granules)",
    category: "Gastrointestinal / Proton Pump Inhibitor",
    division: "human-pharma",
    form: "Capsule",
    packSize: "10 x 10 Alu-Alu",
    standard: "BP",
    description:
      "Highly effective enteric PPI used to treat gastroesophageal reflux disease (GERD), gastric and duodenal ulcers, and acid hypersecretion syndromes.",
  },
  {
    id: "hp-7",
    name: "PANTO-RUS 40",
    composition: "Pantoprazole Sodium BP eq. to Pantoprazole 40mg",
    category: "Gastrointestinal / Proton Pump Inhibitor",
    division: "human-pharma",
    form: "Tablet",
    packSize: "10 x 10 Alu-Alu",
    standard: "BP",
    description:
      "Gastro-resistant delayed-release formulation for severe hyperacidity, duodenal ulcers, and reflux esophagitis maintenance therapy.",
  },
  {
    id: "hp-8",
    name: "CIPRO-RUS 500",
    composition: "Ciprofloxacin Hydrochloride USP eq. to Ciprofloxacin 500mg",
    category: "Fluoroquinolone Antibiotic",
    division: "human-pharma",
    form: "Tablet",
    packSize: "10 x 10 Blister",
    standard: "USP",
    description:
      "Potent broad-spectrum bactericidal fluoroquinolone antibacterial used for complicated urinary tract, bone, joint, and severe gastrointestinal infections.",
  },
  {
    id: "hp-9",
    name: "RUS-NAC 50",
    composition: "Diclofenac Sodium BP 50mg",
    category: "NSAID / Pain Specialist",
    division: "human-pharma",
    form: "Tablet",
    packSize: "10 x 10 Blister",
    standard: "BP",
    description:
      "Non-steroidal anti-inflammatory analgesic providing sustained therapeutic relief from inflammatory arthritis, postoperative pain, and musculoskeletal trauma.",
  },
  {
    id: "hp-10",
    name: "HIST-RUS 10",
    composition: "Cetirizine Hydrochloride BP 10mg",
    category: "Antihistamine / Anti-Allergy",
    division: "human-pharma",
    form: "Tablet",
    packSize: "10 x 10 Blister",
    standard: "BP",
    description:
      "Second-generation non-sedating H1 receptor antagonist for the prompt relief of allergic rhinitis, ocular itching, and chronic idiopathic urticaria.",
  },

  // ── 2. HUMAN SUPPLEMENTS (7 products) ──
  {
    id: "hn-1",
    name: "VITA-RUS GOLD",
    composition: "Multivitamins, Essential Minerals, Ginseng & Trace Elements",
    category: "Daily Wellness & Vitality",
    division: "human-nutra",
    form: "Tablet",
    packSize: "3 x 10 Blister / Bottle of 30s",
    standard: "Nutraceutical",
    description:
      "Comprehensive multivitamin-multimineral dietary supplement designed to replenish daily micronutrient gaps, boost cellular immunity, and sustain stamina.",
  },
  {
    id: "hn-2",
    name: "CAL-RUS D3",
    composition: "Calcium Carbonate USP 1250mg eq. to Elemental Calcium 500mg + Vitamin D3 250 IU",
    category: "Bone & Joint Support",
    division: "human-nutra",
    form: "Tablet",
    packSize: "10 x 10 Blister",
    standard: "USP",
    description:
      "Synergistic mineral-cholecalciferol formulation optimizing intestinal calcium absorption, bone mineral density, and osteopenia prevention.",
  },
  {
    id: "hn-3",
    name: "OMEGA-RUS 1000",
    composition: "Fish Oil BP 1000mg yielding EPA 180mg + DHA 120mg",
    category: "Cardiovascular & Cognitive Wellness",
    division: "human-nutra",
    form: "Softgel",
    packSize: "Bottle of 60s / 10 x 1 x 10 Blister",
    standard: "BP",
    description:
      "Premium molecularly distilled marine lipids delivering standardized EPA and DHA to reinforce arterial flexibility, brain function, and visual acuity.",
  },
  {
    id: "hn-4",
    name: "CO-RUS Q10",
    composition: "Coenzyme Q10 USP 100mg",
    category: "Cellular Energy & Cardiovascular Health",
    division: "human-nutra",
    form: "Capsule",
    packSize: "3 x 10 Alu-Alu",
    standard: "USP",
    description:
      "Mitochondrial antioxidant catalyst supporting cardiac muscle efficiency, endothelial protection, and counteracting statin-induced muscle fatigue.",
  },
  {
    id: "hn-5",
    name: "NEURO-RUS B12",
    composition: "Methylcobalamin (Vitamin B12) 1500mcg",
    category: "Neurological & Red Blood Cell Booster",
    division: "human-nutra",
    form: "Tablet",
    packSize: "10 x 10 Alu-Alu",
    standard: "Nutraceutical",
    description:
      "Bioactive neurological coenzyme form of Vitamin B12 fostering myelin sheath regeneration, peripheral nerve health, and megaloblastic hematopoiesis.",
  },
  {
    id: "hn-6",
    name: "HEMA-RUS Z",
    composition: "Carbonyl Iron eq. to Elemental Iron 100mg + Folic Acid 1.5mg + Zinc Sulfate 61.8mg",
    category: "Hematinic / Blood Enricher",
    division: "human-nutra",
    form: "Capsule",
    packSize: "10 x 10 Blister",
    standard: "Nutraceutical",
    description:
      "High-purity microfine carbonyl iron complex providing superior bioavailability with minimal gastric irritation, ideal during pregnancy and chronic anemia.",
  },
  {
    id: "hn-7",
    name: "RUS-COLLAGEN PEPTIDES",
    composition: "Hydrolyzed Collagen Peptides, Glucosamine, Chondroitin & Vitamin C",
    category: "Joint Matrix & Skin Restorative",
    division: "human-nutra",
    form: "Powder",
    packSize: "200g Premium Tin Jar",
    standard: "Nutraceutical",
    description:
      "Fortified bioactive collagen peptide blend lubricating synovial joints, rebuilding connective cartilage, and restoring dermal elasticity from within.",
  },

  // ── 3. VETERINARY PHARMACEUTICALS (7 products) ──
  {
    id: "vp-1",
    name: "IVER-RUS 1% INJ",
    composition: "Ivermectin BP 1.0% w/v",
    category: "Broad-spectrum Endectocide",
    division: "vet-pharma",
    form: "Injection",
    packSize: "10ml / 50ml / 100ml Vial",
    standard: "BP",
    targetSpecies: "Cattle, Sheep, Swine",
    description:
      "Highly effective systemic injectable parasiticide for simultaneous eradication of gastrointestinal roundworms, lungworms, sucking lice, and scabies mites.",
  },
  {
    id: "vp-2",
    name: "ALBEN-RUS 600 BOLUS",
    composition: "Albendazole USP 600mg",
    category: "Broad-spectrum Anthelmintic",
    division: "vet-pharma",
    form: "Bolus",
    packSize: "10 x 4 Bolus Box",
    standard: "USP",
    targetSpecies: "Cattle, Buffalo, Sheep",
    description:
      "Single-dose therapeutic deworming bolus targeting adult and larval roundworms, lungworms, tapeworms, and adult liver flukes (Fasciola hepatica).",
  },
  {
    id: "vp-3",
    name: "ENRO-RUS 10% ORAL",
    composition: "Enrofloxacin USP 10% w/v",
    category: "Broad-spectrum Antibacterial",
    division: "vet-pharma",
    form: "Oral Liquid",
    packSize: "100ml / 500ml / 1L Bottle",
    standard: "USP",
    targetSpecies: "Poultry, Calves, Swine",
    description:
      "High-potency fluoroquinolone water-soluble chemotherapy indicated for complicated CRD, colibacillosis, salmonellosis, and infectious coryza in poultry.",
  },
  {
    id: "vp-4",
    name: "MELO-RUS 5 INJ",
    composition: "Meloxicam BP 5mg/ml",
    category: "Non-Steroidal Anti-inflammatory (NSAID)",
    division: "vet-pharma",
    form: "Injection",
    packSize: "30ml / 100ml Vial",
    standard: "BP",
    targetSpecies: "Cattle, Calves, Horses",
    description:
      "Selective COX-2 anti-inflammatory injection providing prompt relief from pyrexia, endotoxemia in acute mastitis, and bovine respiratory disease.",
  },
  {
    id: "vp-5",
    name: "OTC-RUS 20% L.A. INJ",
    composition: "Oxytetracycline Dihydrate eq. to Oxytetracycline 200mg/ml (L.A.)",
    category: "Long-acting Tetracycline Antibiotic",
    division: "vet-pharma",
    form: "Injection",
    packSize: "50ml / 100ml Glass Vial",
    standard: "USP",
    targetSpecies: "Cattle, Sheep, Swine",
    description:
      "Engineered sustained-release formulation providing 72 hours of persistent therapeutic plasma levels after a single intramuscular dose against shipping fever and anaplasmosis.",
  },
  {
    id: "vp-6",
    name: "FEN-RUS 2.5% SUSP",
    composition: "Fenbendazole BP 2.5% w/v",
    category: "Anthelmintic (Dewormer)",
    division: "vet-pharma",
    form: "Oral Liquid",
    packSize: "100ml / 500ml / 1L Bottle",
    standard: "BP",
    targetSpecies: "Cattle, Sheep, Goats",
    description:
      "Gentle, ovicidal oral anthelmintic suspension for ruminants, eradicating gastrointestinal and respiratory nematodes without causing abortion or milk drop.",
  },
  {
    id: "vp-7",
    name: "CEFTI-RUS 1.0G STERILE",
    composition: "Sterile Ceftiofur Sodium eq. to Ceftiofur 1.0g",
    category: "Third-Generation Cephalosporin",
    division: "vet-pharma",
    form: "Injection",
    packSize: "1g Vial with Sterile Diluent",
    standard: "USP Sterile",
    targetSpecies: "Dairy Cattle, Swine, Horses",
    description:
      "Advanced veterinary cephalosporin of choice for acute bovine respiratory disease and interdigital foot rot, with zero milk-withholding duration.",
  },

  // ── 4. VETERINARY FEED SUPPLEMENTS (6 products) ──
  {
    id: "vs-1",
    name: "RUS-CAL LIQUID",
    composition: "Calcium Phosphates, Vitamin D3, B12, and Carbohydrates",
    category: "High-yield Lactation & Growth Booster",
    division: "vet-supplements",
    form: "Oral Liquid",
    packSize: "1L / 5L / 10L Can",
    standard: "Veterinary Feed Grade",
    targetSpecies: "Dairy Cattle, Buffaloes",
    description:
      "Highly bioavailable calcium-phosphorus syrup fortified with Vitamin D3. Rapidly elevates milk yield in lactating ruminants and prevents post-calving milk fever.",
  },
  {
    id: "vs-2",
    name: "RUS-MIX CHELATED",
    composition: "Chelated Essential Minerals, Vitamins, Yeast Culture & Amino Acids",
    category: "Complete Mineral Optimization Supplement",
    division: "vet-supplements",
    form: "Powder",
    packSize: "1kg Bag / 5kg Bag / 25kg Bulk Bag",
    standard: "Veterinary Feed Grade",
    targetSpecies: "Ruminants, Dairy Cattle",
    description:
      "Fortified organic chelated trace mineral premix boosting reproductive cyclicity, conception rates, milk fat percentage, and hoof keratin integrity.",
  },
  {
    id: "vs-3",
    name: "HEPA-RUS LIVER TONIC",
    composition: "Choline Chloride, Liver Extract, B-Complex Vitamins & Herbal Extract Mix",
    category: "Hepatoprotective & Metabolic Stimulant",
    division: "vet-supplements",
    form: "Oral Liquid",
    packSize: "500ml / 1L / 5L Can",
    standard: "Veterinary Feed Grade",
    targetSpecies: "Poultry, Cattle, Sheep",
    description:
      "Metabolic detoxifier shielding hepatic parenchyma from aflatoxins, stimulating digestive enzyme secretion, and accelerating weight gain in broilers.",
  },
  {
    id: "vs-4",
    name: "RUS-BIND ULTRA",
    composition: "HSCAS, Organic Acids, Mannan Oligosaccharides (MOS) & Carbon Activators",
    category: "Broad-Spectrum Toxin Binder",
    division: "vet-supplements",
    form: "Powder",
    packSize: "25kg Multi-wall Paper Bag",
    standard: "Feed Mill Grade",
    targetSpecies: "Poultry, Aqua, Swine",
    description:
      "Advanced multi-component mycotoxin binder selectively adsorbing aflatoxins, ochratoxins, and T-2 toxins without depleting dietary vitamins or minerals.",
  },
  {
    id: "vs-5",
    name: "HEAT-RUS ELECTROLYTES",
    composition: "Sodium, Potassium, Dextrose Monohydrate, Vitamin C & Betaine",
    category: "Anti-Heat Stress Powder",
    division: "vet-supplements",
    form: "Powder",
    packSize: "200g Sachet / 1kg Pouch",
    standard: "Feed Grade",
    targetSpecies: "Poultry Flocks, Dairy Herds",
    description:
      "Osmotic electrolyte stabilizer mitigating dehydration, panting, and respiratory alkalosis in poultry flocks and cattle during severe summer heat waves.",
  },
  {
    id: "vs-6",
    name: "RUS-FAT BYPASS",
    composition: "Fractionated Palm Fats (Rumen Bypass Fatty Acids 99%)",
    category: "Rumen Bypass Energy Boost",
    division: "vet-supplements",
    form: "Powder",
    packSize: "25kg Bag",
    standard: "Dairy Feed Grade",
    targetSpecies: "High-yielding Dairy Cows",
    description:
      "High-density rumen-inert fractional energy source supporting peak milk production and preventing negative energy balance during early lactation.",
  },

  // ── 5. ECTOPARASITICIDES (5 products) ──
  {
    id: "ep-1",
    name: "AMITRAZ-RUS 12.5% EC",
    composition: "Amitraz BP 12.5% w/v",
    category: "Ectoparasiticide / Acaricide",
    division: "ectoparasiticides",
    form: "Emulsifiable Concentrate",
    packSize: "15ml / 50ml / 250ml / 1L Alum Bottle",
    standard: "BP (Vet)",
    targetSpecies: "Cattle, Sheep, Goats, Pigs",
    description:
      "Powerful acaricide for dipping or spray wash, rapidly paralyzing and killing multi-host ticks, mange mites, and sucking lice on livestock.",
  },
  {
    id: "ep-2",
    name: "CYPER-RUS 10%",
    composition: "Cypermethrin BP 10% w/v",
    category: "Synthetic Pyrethroid Ectoparasiticide",
    division: "ectoparasiticides",
    form: "Liquid Concentrate",
    packSize: "100ml / 1L HDPE Bottle",
    standard: "BP (Vet)",
    targetSpecies: "Cattle, Poultry, Barns",
    description:
      "Rapid-action pyrethroid insecticide providing extensive knockdown and long residual protection against horn flies, stable flies, lice, and red mites in poultry sheds.",
  },
  {
    id: "ep-3",
    name: "DELTA-RUS POUR-ON",
    composition: "Deltamethrin BP 1.25% w/v",
    category: "Convenient Pour-On Parasiticide",
    division: "ectoparasiticides",
    form: "Pour-on Solution",
    packSize: "250ml / 1L Squeeze & Measure Bottle",
    standard: "BP (Vet)",
    targetSpecies: "Beef & Dairy Cattle, Sheep",
    description:
      "Spill-free spine pour-on formulation delivering up to 6 weeks of continuous repellent action against tsetse flies, nuisance flies, and biting lice.",
  },
  {
    id: "ep-4",
    name: "FLUME-RUS 1% POUR-ON",
    composition: "Flumethrin 1% w/v",
    category: "Acaricide & Tick Specialist",
    division: "ectoparasiticides",
    form: "Pour-on Solution",
    packSize: "250ml / 500ml / 1L Squeeze Measure Bottle",
    standard: "Veterinary Grade",
    targetSpecies: "Cattle, Sheep, Horses",
    description:
      "High-precision pour-on for the control and total elimination of resistant tick strains (including Boophilus microplus) with excellent cutaneous tolerability.",
  },
  {
    id: "ep-5",
    name: "FIPRO-RUS SPRAY",
    composition: "Fipronil BP 0.25% w/v",
    category: "Companion Animal Flea & Tick Guard",
    division: "ectoparasiticides",
    form: "Spray",
    packSize: "100ml / 250ml Spray Pump Bottle",
    standard: "BP (Vet)",
    targetSpecies: "Dogs & Cats",
    description:
      "Veterinarian-approved contact spray killing adult fleas before egg-laying and providing up to 90 days of sustained protection on dogs and cats.",
  },
];

export function getProductsByCategory(divisionId: FormulationDivisionId | "all"): FinishedProduct[] {
  if (divisionId === "all") return FINISHED_PRODUCTS;
  return FINISHED_PRODUCTS.filter((p) => p.division === divisionId);
}

export function getCategoryMeta(divisionId: FormulationDivisionId): FormulationCategoryMeta | undefined {
  return FORMULATION_CATEGORIES.find((c) => c.id === divisionId);
}

