export interface ApiProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  casNumber: string;
  purity: string;
  grade: string;
  dmfStatus: string;
  manufacturer: string;
  tagline: string;
  description: string;
}

export const ALL_PRODUCTS: ApiProduct[] = [
  // Contrast Media (7)
  {
    id: "cm1",
    slug: "iohexol",
    name: "Iohexol",
    category: "Contrast Media",
    casNumber: "66108-95-0",
    purity: "99.5%",
    grade: "IP, USP, EP",
    dmfStatus: "Under Registration",
    manufacturer: "Jiangsu Yutian Pharmaceutical Co., Ltd.",
    tagline: "Non-ionic, water-soluble iodinated contrast agent for X-ray and CT imaging.",
    description: "Contrast media actives enable high-precision diagnostic visualization across radiologic, vascular and computed tomography procedures. Ruskin Chemipharm imports high-purity Contrast Media APIs sourced directly from audited WHO-GMP manufacturing facilities, fully backed by DCGI registration, Certificate of Analysis (COA), and complete regulatory dossier support."
  },
  {
    id: "cm2",
    slug: "iodixanol",
    name: "Iodixanol",
    category: "Contrast Media",
    casNumber: "92339-11-2",
    purity: "99.8%",
    grade: "IP, USP, EP",
    dmfStatus: "CEP Certified",
    manufacturer: "Star Lake Bioscience Co., Ltd.",
    tagline: "Iso-osmolar, non-ionic dimeric contrast agent for intravascular diagnostic procedures.",
    description: "Iso-osmolar dimeric non-ionic iodinated radiocontrast agent engineered for nephro-protective cardiac catheterization and vascular imaging procedures under strict cGMP protocols."
  },
  {
    id: "cm3",
    slug: "iopamidol",
    name: "Iopamidol",
    category: "Contrast Media",
    casNumber: "60166-93-0",
    purity: "99.6%",
    grade: "USP, BP, EP",
    dmfStatus: "USDMF Available",
    manufacturer: "Brisk Pharma Chemical Corp.",
    tagline: "Non-ionic iodine-based contrast agent used in diagnostic X-ray procedures.",
    description: "High-purity non-ionic tri-iodinated monomeric contrast medium offering minimal osmolarity and low systemic toxicity for neuroradiology and body computed tomography."
  },
  {
    id: "cm4",
    slug: "ioversol",
    name: "Ioversol",
    category: "Contrast Media",
    casNumber: "87771-40-2",
    purity: "99.4%",
    grade: "USP, EP",
    dmfStatus: "USDMF Available",
    manufacturer: "Hebei Shengxue Dacheng Co., Ltd.",
    tagline: "Non-ionic radio-opaque contrast agent utilized for computer tomography scanning.",
    description: "Low-viscosity iodinated contrast active providing exceptional vascular tolerance and optimal opacification in peripheral and renal arteriography."
  },
  {
    id: "cm5",
    slug: "iopromide",
    name: "Iopromide",
    category: "Contrast Media",
    casNumber: "73334-07-3",
    purity: "99.7%",
    grade: "Ph. Eur., USP",
    dmfStatus: "CEP Certified",
    manufacturer: "Zhejiang Hisun Pharmaceutical Co., Ltd.",
    tagline: "Low-osmolality non-ionic iodinated contrast medium for diagnostic imaging.",
    description: "Ultra-low osmolality radiocontrast agent synthesized for parenteral administration across urography, CT enhancement, and digital subtraction angiography."
  },
  {
    id: "cm6",
    slug: "iomeprol",
    name: "Iomeprol",
    category: "Contrast Media",
    casNumber: "78649-41-9",
    purity: "99.5%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "USDMF Available",
    manufacturer: "Zhejiang Medicine Co., Ltd.",
    tagline: "High-solubility non-ionic contrast agent for vascular radiocontrast procedures.",
    description: "Advanced non-ionic contrast compound featuring high iodine concentration payload and minimal neural tissue reaction for demanding radiological investigations."
  },
  {
    id: "cm7",
    slug: "gadobutrol",
    name: "Gadobutrol",
    category: "Contrast Media",
    casNumber: "138071-82-6",
    purity: "99.9%",
    grade: "USP High Purity",
    dmfStatus: "USDMF Available",
    manufacturer: "Jiangsu Hengrui Pharmaceuticals Co., Ltd.",
    tagline: "Macrocyclic gadolinium-based MRI contrast agent for neuro and cardiovascular imaging.",
    description: "High-concentration macrocyclic gadolinium chelate providing superior T1 relaxivity for magnetic resonance imaging of cranial and spinal lesions."
  },

  // Anesthetics (5)
  {
    id: "an1",
    slug: "procaine-penicillin",
    name: "Procaine Penicillin",
    category: "Anesthetics",
    casNumber: "54-35-3",
    purity: "99.2%",
    grade: "USP, IP",
    dmfStatus: "CEP Certified",
    manufacturer: "Shandong Lukang Pharmaceutical Co., Ltd.",
    tagline: "Repository form of penicillin with local anesthetic profile for slow absorption.",
    description: "Deep intramuscular repository antibacterial complex engineered for extended plasma retention and localized anesthetic relief during administration."
  },
  {
    id: "an2",
    slug: "mefenamic-acid",
    name: "Mefenamic Acid",
    category: "Anesthetics",
    casNumber: "61-68-7",
    purity: "99.5%",
    grade: "Ph. Eur., USP, IP",
    dmfStatus: "USDMF Available",
    manufacturer: "Aarti Drugs Ltd.",
    tagline: "Non-steroidal anti-inflammatory and analgesic for moderate pain management.",
    description: "Fenamate NSAID active ingredient synthesized under stringent temperature controls to guarantee ultra-low micro-impurity levels for oral solid dosage formulations."
  },
  {
    id: "an3",
    slug: "propofol",
    name: "Propofol",
    category: "Anesthetics",
    casNumber: "2078-54-8",
    purity: "99.8%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "USDMF Available",
    manufacturer: "Fresenius Kabi Active Ingredients",
    tagline: "Short-acting intravenous hypnotic and general anesthetic formulation grade.",
    description: "Alkyphenol general anesthetic active compound for parenteral lipid emulsion formulations utilized in surgical induction and critical care sedation."
  },
  {
    id: "an4",
    slug: "lidocaine",
    name: "Lidocaine",
    category: "Anesthetics",
    casNumber: "137-58-6",
    purity: "99.9%",
    grade: "USP, Ph. Eur., IP",
    dmfStatus: "CEP Certified",
    manufacturer: "Shree Ganesh Remedies Ltd.",
    tagline: "Amide local anesthetic and class 1B antiarrhythmic high-purity active compound.",
    description: "Premier grade amide local anesthetic active ingredient blocking fast voltage-gated sodium channels for topical, infiltration, and regional nerve blockade."
  },
  {
    id: "an5",
    slug: "bupivacaine",
    name: "Bupivacaine",
    category: "Anesthetics",
    casNumber: "2180-92-9",
    purity: "99.6%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "USDMF Available",
    manufacturer: "Aurobindo Pharma Ltd.",
    tagline: "Long-acting local anesthetic for regional, epidural, and spinal anesthesia.",
    description: "Potent long-duration amide local anesthetic synthesized for epidural, spinal, and peripheral nerve block formulations requiring extended analgesic coverage."
  },

  // Antibacterials (11)
  {
    id: "ab1",
    slug: "amphotericin",
    name: "Amphotericin",
    category: "Antibacterials",
    casNumber: "1397-89-3",
    purity: "99.1%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "USDMF Available",
    manufacturer: "Lifecare Innovations Ltd.",
    tagline: "Polyene antifungal antibiotic active against systemic deep-seated fungal infections.",
    description: "Fermentation-derived polyene macrolide active ingredient forming trans-membrane pores for deep systemic mycoses and visceral leishmaniasis therapies."
  },
  {
    id: "ab2",
    slug: "azithromycin",
    name: "Azithromycin",
    category: "Antibacterials",
    casNumber: "83905-01-5",
    purity: "99.5%",
    grade: "USP, Ph. Eur., IP",
    dmfStatus: "CEP Certified",
    manufacturer: "Alembic Pharmaceuticals Ltd.",
    tagline: "Broad-spectrum azalide antibiotic effective against respiratory and skin infections.",
    description: "Second-generation macrolide active ingredient with enhanced acid stability and tissue distribution for upper respiratory tract and venereal formulations."
  },
  {
    id: "ab3",
    slug: "teicoplanin",
    name: "Teicoplanin",
    category: "Antibacterials",
    casNumber: "61036-62-2",
    purity: "99.3%",
    grade: "Ph. Eur.",
    dmfStatus: "USDMF Available",
    manufacturer: "Biocon Ltd.",
    tagline: "Glycopeptide antibiotic active against Gram-positive bacterial pathogens.",
    description: "Semi-synthetic glycopeptide complex active against methicillin-resistant Staphylococcus aureus (MRSA) and enterococcal systemic infections."
  },
  {
    id: "ab4",
    slug: "arbekacin-sulphate",
    name: "Arbekacin Sulphate",
    category: "Antibacterials",
    casNumber: "51025-85-5",
    purity: "99.0%",
    grade: "JP, USP",
    dmfStatus: "USDMF Available",
    manufacturer: "Meiji Seika Pharma Co., Ltd.",
    tagline: "Semi-synthetic aminoglycoside antibiotic targeting MRSA and resistant strains.",
    description: "Broad-spectrum aminoglycoside active ingredient refractory to bacterial inactivating enzymes, indicated for refractory nosocomial pneumonias."
  },
  {
    id: "ab5",
    slug: "benzylpenicillin-sodium",
    name: "Benzylpenicillin Sodium",
    category: "Antibacterials",
    casNumber: "69-57-8",
    purity: "99.6%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "CEP Certified",
    manufacturer: "North China Pharmaceutical Co., Ltd.",
    tagline: "Natural penicillin antibiotic for severe systemic bacterial infections.",
    description: "Crystalline sodium salt of Penicillin G produced via sterile submersed fermentation for immediate high-peak bactericidal serum concentrations."
  },
  {
    id: "ab6",
    slug: "benzathine-penicillin",
    name: "Benzathine Penicillin",
    category: "Antibacterials",
    casNumber: "1538-09-6",
    purity: "99.4%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "USDMF Available",
    manufacturer: "CSPC Pharmaceutical Group Ltd.",
    tagline: "Ultra long-acting depot penicillin formulation for rheumatic fever prophylaxis.",
    description: "Depot dibenzylethylenediamine salt offering low water solubility for monthly sustained-release prophylaxis against streptococcal reinfections."
  },
  {
    id: "ab7",
    slug: "levamisole",
    name: "Levamisole",
    category: "Antibacterials",
    casNumber: "14769-73-4",
    purity: "99.5%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "CEP Certified",
    manufacturer: "Janssen Pharmaceutica NV",
    tagline: "Immunomodulatory synthetic imidazothiazole derivative compound.",
    description: "Synthetic imidazothiazole derivative enhancing T-cell cell-mediated immunity and phagocytic activity across veterinary and therapeutic regimens."
  },
  {
    id: "ab8",
    slug: "amoxicillin-trihydrate",
    name: "Amoxicillin Trihydrate",
    category: "Antibacterials",
    casNumber: "61336-70-7",
    purity: "99.2%",
    grade: "Ph. Eur., USP, IP",
    dmfStatus: "USDMF Available",
    manufacturer: "Centrient Pharmaceuticals",
    tagline: "Broad-spectrum beta-lactam antibiotic active against Gram-positive & Gram-negative bacteria.",
    description: "Enzymatically synthesized semi-synthetic aminopenicillin for high oral bioavailability and superior gastric stability in pediatric & adult oral suspensions."
  },
  {
    id: "ab9",
    slug: "ciprofloxacin-hcl",
    name: "Ciprofloxacin HCl",
    category: "Antibacterials",
    casNumber: "86393-32-0",
    purity: "99.5%",
    grade: "USP, BP, EP",
    dmfStatus: "USDMF Available",
    manufacturer: "Cipla Ltd.",
    tagline: "Second-generation fluoroquinolone antibacterial compound for severe infectious formulations.",
    description: "Potent bacterial DNA gyrase and topoisomerase IV inhibitor providing broad-spectrum coverage against Gram-negative Enterobacteriaceae."
  },
  {
    id: "ab10",
    slug: "metformin-hcl",
    name: "Metformin HCl",
    category: "Antibacterials",
    casNumber: "1115-70-4",
    purity: "99.8%",
    grade: "Ph. Eur., USP, IP",
    dmfStatus: "CEP Certified",
    manufacturer: "Harman Finochem Ltd.",
    tagline: "First-line biguanide antihyperglycemic agent for Type-2 Diabetes oral formulations.",
    description: "Ultra-pure biguanide active synthesized to strictly control dimethylamine impurities for high-dose direct compression tablet formulations."
  },
  {
    id: "ab11",
    slug: "ceftriaxone-sodium",
    name: "Ceftriaxone Sodium",
    category: "Antibacterials",
    casNumber: "104376-79-6",
    purity: "99.7%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "CEP Certified",
    manufacturer: "Orchid Pharma Ltd.",
    tagline: "Third-generation cephalosporin antibiotic with broad spectrum antibacterial activity.",
    description: "Long half-life parenteral cephalosporin active featuring high beta-lactamase stability for once-daily severe bacterial infection regimens."
  },

  // Antivirals (2)
  {
    id: "av1",
    slug: "acyclovir",
    name: "Acyclovir",
    category: "Antivirals",
    casNumber: "59277-89-3",
    purity: "99.6%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "CEP Certified",
    manufacturer: "Hetero Drugs Ltd.",
    tagline: "Guanosine analogue antiviral drug used for herpes simplex virus infections.",
    description: "Selective viral thymidine kinase substrate terminating HSV and VZV viral DNA chain synthesis with low cellular cytotoxicity."
  },
  {
    id: "av2",
    slug: "favipiravir",
    name: "Favipiravir",
    category: "Antivirals",
    casNumber: "259793-96-9",
    purity: "99.4%",
    grade: "JP, USP",
    dmfStatus: "USDMF Available",
    manufacturer: "Toyama Chemical Co., Ltd.",
    tagline: "Pyrazinecarboxamide derivative RNA polymerase inhibitor antiviral active ingredient.",
    description: "Selective RNA-dependent RNA polymerase inhibitor converted intracellularly to active phosphoribosylated form for RNA viral pandemic research."
  },

  // Oncology (4)
  {
    id: "onc1",
    slug: "paclitaxel",
    name: "Paclitaxel",
    category: "Oncology",
    casNumber: "33069-62-4",
    purity: "99.7%",
    grade: "USP High Purity",
    dmfStatus: "USDMF Available",
    manufacturer: "Phytogen Life Sciences Inc.",
    tagline: "Taxane microtubule stabilizer chemotherapy active for targeted oncology therapy.",
    description: "Semi-synthetic taxane antineoplastic promoting tubulin polymerization and preventing microtubule depolymerization during mitotic cell division."
  },
  {
    id: "onc2",
    slug: "docetaxel",
    name: "Docetaxel",
    category: "Oncology",
    casNumber: "114977-28-5",
    purity: "99.6%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "USDMF Available",
    manufacturer: "ScinoPharm Taiwan, Ltd.",
    tagline: "Semi-synthetic taxane antineoplastic agent for solid tumor formulations.",
    description: "High-potency taxane analogue synthesized from 10-deacetylbaccatin III for advanced breast, non-small cell lung, and prostate carcinoma therapeutics."
  },
  {
    id: "onc3",
    slug: "gemcitabine",
    name: "Gemcitabine",
    category: "Oncology",
    casNumber: "95058-81-4",
    purity: "99.8%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "CEP Certified",
    manufacturer: "Sun Pharmaceutical Industries Ltd.",
    tagline: "Nucleoside analogue antimetabolite chemotherapy active ingredient.",
    description: "Fluorinated deoxycytidine analogue active inhibiting ribonucleotide reductase and incorporating into DNA to trigger apoptosis in solid tumors."
  },
  {
    id: "onc4",
    slug: "cisplatin",
    name: "Cisplatin",
    category: "Oncology",
    casNumber: "15663-27-1",
    purity: "99.9%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "USDMF Available",
    manufacturer: "Heraeus Precious Metals GmbH",
    tagline: "Platinum-based antineoplastic coordination complex for malignant neoplasms.",
    description: "Heavy metal platinum complex cross-linking purine bases on DNA to inhibit replication and transcription in germ cell and epithelial malignancies."
  },

  // Hormones (3)
  {
    id: "hor1",
    slug: "hydrocortisone",
    name: "Hydrocortisone",
    category: "Hormones",
    casNumber: "50-23-7",
    purity: "99.5%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "CEP Certified",
    manufacturer: "Pfizer CentreOne",
    tagline: "Steroid corticosteroid hormone used for immunosuppressive & anti-inflammatory drugs.",
    description: "Primary endogenous glucocorticoid synthesized under cGMP conditions for adrenal replacement therapy, anti-inflammatory, and antiallergic preparations."
  },
  {
    id: "hor2",
    slug: "progesterone",
    name: "Progesterone",
    category: "Hormones",
    casNumber: "57-83-0",
    purity: "99.7%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "USDMF Available",
    manufacturer: "Bespak Europe Ltd.",
    tagline: "Micronized endogenous progestogen steroid hormone for endocrine therapeutics.",
    description: "Micronized bioidentical steroid hormone active with defined particle-size distribution for enhanced systemic oral and vaginal mucosal absorption."
  },
  {
    id: "hor3",
    slug: "levothyroxine",
    name: "Levothyroxine",
    category: "Hormones",
    casNumber: "51-48-9",
    purity: "99.6%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "USDMF Available",
    manufacturer: "Merck KGaA Active Ingredients",
    tagline: "Synthetic thyroid hormone T4 active pharmaceutical ingredient.",
    description: "Synthetic L-tetraiodothyronine sodium salt active ingredient providing identical peripheral physiological metabolic actions to endogenous T4 hormone."
  },

  // Vitamins & Keto-Acids (14)
  {
    id: "vit1",
    slug: "ketosteril",
    name: "Ketosteril",
    category: "Vitamins & Keto-Acids",
    casNumber: "N/A",
    purity: "99.0%",
    grade: "Ph. Eur.",
    dmfStatus: "Tech Pack Ready",
    manufacturer: "Fresenius Kabi AG",
    tagline: "Keto-acid complex formulation for chronic kidney disease dietary management.",
    description: "Co-precipitated calcium salts of essential keto-analogues and amino acids for nitrogen-free supplementation during chronic renal insufficiency."
  },
  {
    id: "vit2",
    slug: "alpha-ketoanalogues",
    name: "Alpha Ketoanalogues",
    category: "Vitamins & Keto-Acids",
    casNumber: "N/A",
    purity: "99.2%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "USDMF Available",
    manufacturer: "Kyowa Hakko Bio Co., Ltd.",
    tagline: "Essential amino acid keto-analogues blend for renal nutrition therapy.",
    description: "High-purity alpha-keto acid salts utilized to reuse amino nitrogen and suppress uremic toxin buildup in advanced CKD management."
  },
  {
    id: "vit3",
    slug: "ascorbic-acid",
    name: "Ascorbic Acid",
    category: "Vitamins & Keto-Acids",
    casNumber: "50-81-7",
    purity: "99.8%",
    grade: "USP, Ph. Eur., IP",
    dmfStatus: "CEP Certified",
    manufacturer: "DSM Nutritional Products",
    tagline: "Vitamin C active antioxidant pharmaceutical and oral formulation grade.",
    description: "Crystalline L-ascorbic acid manufactured to strict heavy metal specifications for pharmaceutical antioxidant stabilization and vitamin products."
  },
  {
    id: "vit4",
    slug: "pyridoxine-hcl",
    name: "Pyridoxine HCl",
    category: "Vitamins & Keto-Acids",
    casNumber: "58-56-0",
    purity: "99.5%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "CEP Certified",
    manufacturer: "BASF Pharma",
    tagline: "Vitamin B6 hydrochloride active compound for metabolic enzyme formulations.",
    description: "Water-soluble vitamin B6 active ingredient acting as coenzyme pyridoxal phosphate precursor for amino acid decarboxylation and transamination."
  },
  {
    id: "vit5",
    slug: "cyanocobalamin",
    name: "Cyanocobalamin",
    category: "Vitamins & Keto-Acids",
    casNumber: "68-19-9",
    purity: "99.0%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "USDMF Available",
    manufacturer: "Sanofi Active Ingredients",
    tagline: "Vitamin B12 crystalline active for hematoregulatory oral and injectable products.",
    description: "Deep red crystalline cobalamin active essential for erythropoiesis, myelin sheath integrity, and nucleoprotein synthesis."
  },
  {
    id: "vit6",
    slug: "thiamine-hcl",
    name: "Thiamine HCl",
    category: "Vitamins & Keto-Acids",
    casNumber: "67-03-8",
    purity: "99.4%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "CEP Certified",
    manufacturer: "Zhejiang Tianxin Pharmaceutical Co., Ltd.",
    tagline: "Vitamin B1 hydrochloride active ingredient for neurological health therapies.",
    description: "Crystalline vitamin B1 active serving as thiamine pyrophosphate coenzyme in carbohydrate metabolism and neural conduction."
  },
  {
    id: "vit7",
    slug: "riboflavin",
    name: "Riboflavin",
    category: "Vitamins & Keto-Acids",
    casNumber: "83-88-5",
    purity: "99.1%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "USDMF Available",
    manufacturer: "Hubei Guangji Pharmaceutical Co., Ltd.",
    tagline: "Vitamin B2 active ingredient for multivitamin and specialized therapeutic specs.",
    description: "Yellow-orange crystalline vitamin B2 substrate forming flavin mononucleotide (FMN) and flavin adenine dinucleotide (FAD) respiratory coenzymes."
  },
  {
    id: "vit8",
    slug: "folic-acid",
    name: "Folic Acid",
    category: "Vitamins & Keto-Acids",
    casNumber: "59-30-3",
    purity: "99.3%",
    grade: "USP, Ph. Eur., IP",
    dmfStatus: "CEP Certified",
    manufacturer: "Changzhou Pharmacy Factory Co., Ltd.",
    tagline: "Vitamin B9 active ingredient required for DNA synthesis and cellular growth.",
    description: "Essential B-complex active converted to tetrahydrofolate required for purine/pyrimidine biosynthesis and prevention of neural tube defects."
  },
  {
    id: "vit9",
    slug: "cholecalciferol",
    name: "Cholecalciferol",
    category: "Vitamins & Keto-Acids",
    casNumber: "67-97-0",
    purity: "99.6%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "USDMF Available",
    manufacturer: "Dishman Carbogen Amcis Ltd.",
    tagline: "Vitamin D3 active fat-soluble secosteroid for calcium metabolism.",
    description: "Ultra-pure crystalline vitamin D3 synthesized via UV-irradiation of 7-dehydrocholesterol for calcium homeostasis and bone mineralization."
  },
  {
    id: "vit10",
    slug: "tocopherol-acetate",
    name: "Tocopherol Acetate",
    category: "Vitamins & Keto-Acids",
    casNumber: "7695-91-2",
    purity: "99.5%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "CEP Certified",
    manufacturer: "Zhejiang Medicine Co., Ltd.",
    tagline: "Vitamin E acetate lipid antioxidant for pharmaceutical oral softgels.",
    description: "Stable esterified form of alpha-tocopherol protecting cellular membrane polyunsaturated fatty acids against free-radical lipid peroxidation."
  },
  {
    id: "vit11",
    slug: "niacinamide",
    name: "Niacinamide",
    category: "Vitamins & Keto-Acids",
    casNumber: "98-92-0",
    purity: "99.7%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "CEP Certified",
    manufacturer: "Jubilant Ingrevia Ltd.",
    tagline: "Vitamin B3 nicotinamide active ingredient for metabolic therapeutics.",
    description: "Amide derivative of nicotinic acid serving as NAD and NADP coenzyme component without triggering cutaneous vasodilation flush."
  },
  {
    id: "vit12",
    slug: "menadione",
    name: "Menadione",
    category: "Vitamins & Keto-Acids",
    casNumber: "58-27-5",
    purity: "99.2%",
    grade: "USP",
    dmfStatus: "USDMF Available",
    manufacturer: "Onetech Chemical Co., Ltd.",
    tagline: "Synthetic precursor Vitamin K3 compound for coagulation therapeutic formulations.",
    description: "Synthetic naphthoquinone active converted hepatic ally to bioactive phylloquinone forms essential for prothrombin clotting factor synthesis."
  },
  {
    id: "vit13",
    slug: "calcium-pantothenate",
    name: "Calcium Pantothenate",
    category: "Vitamins & Keto-Acids",
    casNumber: "137-08-6",
    purity: "99.4%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "CEP Certified",
    manufacturer: "Shandong Xinfeng Pharmaceutical Co., Ltd.",
    tagline: "Vitamin B5 calcium salt for coenzyme A precursor formulation requirements.",
    description: "Calcium salt of D-pantothenic acid serving as structural building block of Coenzyme A (CoA) for fatty acid and carbohydrate intermediary metabolism."
  },
  {
    id: "vit14",
    slug: "biotin",
    name: "Biotin",
    category: "Vitamins & Keto-Acids",
    casNumber: "58-85-5",
    purity: "99.5%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "USDMF Available",
    manufacturer: "Zhejiang Shengda Bio-Pharm Co., Ltd.",
    tagline: "Vitamin B7 coenzyme active ingredient for metabolic & hair/skin formulation.",
    description: "Crystalline D-biotin active acting as essential coenzyme for carboxylase enzymes in gluconeogenesis, fatty acid synthesis, and amino acid catabolism."
  },
];

export function getProductBySlugOrId(identifier: string): ApiProduct | undefined {
  const lower = identifier.toLowerCase();
  return ALL_PRODUCTS.find(
    (p) => p.id.toLowerCase() === lower || p.slug.toLowerCase() === lower || p.name.toLowerCase() === lower
  );
}

export function getRelatedProducts(currentProduct: ApiProduct, limit = 4): ApiProduct[] {
  return ALL_PRODUCTS.filter(
    (p) => p.category === currentProduct.category && p.id !== currentProduct.id
  ).slice(0, limit);
}
