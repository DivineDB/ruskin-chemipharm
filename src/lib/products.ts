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
  // =========================================================================
  // 1. PHARMA (Contrast Media, Anesthetics, Antibacterials, Oncology & Hormones)
  // Sourced directly from Ruskin's registered DCGI portfolio (productList.xlsx)
  // =========================================================================
  {
    id: "cm1",
    slug: "iohexol",
    name: "Iohexol",
    category: "Pharma",
    casNumber: "66108-95-0",
    purity: "99.5%",
    grade: "IP, USP, EP",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Jiangsu Yutian Pharmaceutical Co., Ltd.",
    tagline: "Non-ionic, water-soluble iodinated contrast agent for X-ray and CT imaging.",
    description: "Contrast media active enabling high-precision diagnostic visualization across radiologic, vascular and computed tomography procedures. Ruskin Chemipharm imports high-purity Iohexol sourced directly from Jiangsu Yutian Pharmaceutical Co., Ltd., backed by DCGI registration dossiers, complete Certificate of Analysis (COA), and cGMP verification."
  },
  {
    id: "cm2",
    slug: "iodixanol",
    name: "Iodixanol",
    category: "Pharma",
    casNumber: "92339-11-2",
    purity: "99.8%",
    grade: "IP, USP, EP",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Jiangsu Yutian Pharmaceutical Co., Ltd.",
    tagline: "Iso-osmolar, non-ionic dimeric contrast agent for intravascular diagnostic procedures.",
    description: "Iso-osmolar dimeric non-ionic iodinated radiocontrast agent engineered for nephro-protective cardiac catheterization and vascular imaging procedures, manufactured under strict cGMP protocols by Jiangsu Yutian."
  },
  {
    id: "cm3",
    slug: "iopamidol",
    name: "Iopamidol",
    category: "Pharma",
    casNumber: "60166-93-0",
    purity: "99.6%",
    grade: "USP, BP, EP",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Jiangsu Yutian Pharmaceutical Co., Ltd.",
    tagline: "Non-ionic iodine-based contrast agent used in diagnostic X-ray procedures.",
    description: "High-purity non-ionic tri-iodinated monomeric contrast medium offering minimal osmolarity and low systemic toxicity for neuroradiology and body computed tomography."
  },
  {
    id: "cm4",
    slug: "ioversol",
    name: "Ioversol",
    category: "Pharma",
    casNumber: "87771-40-2",
    purity: "99.4%",
    grade: "USP, EP",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Jiangsu Yutian Pharmaceutical Co., Ltd.",
    tagline: "Non-ionic radio-opaque contrast agent utilized for computer tomography scanning.",
    description: "Low-viscosity iodinated contrast active providing exceptional vascular tolerance and optimal opacification in peripheral and renal arteriography."
  },
  {
    id: "cm5",
    slug: "iopromide",
    name: "Iopromide",
    category: "Pharma",
    casNumber: "73334-07-3",
    purity: "99.7%",
    grade: "Ph. Eur., USP",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Jiangsu Yutian Pharmaceutical Co., Ltd.",
    tagline: "Low-osmolality non-ionic iodinated contrast medium for diagnostic imaging.",
    description: "Ultra-low osmolality radiocontrast agent synthesized for parenteral administration across urography, CT enhancement, and digital subtraction angiography."
  },
  {
    id: "cm6",
    slug: "iomeprol",
    name: "Iomeprol",
    category: "Pharma",
    casNumber: "78649-41-9",
    purity: "99.5%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Jiangsu Yutian Pharmaceutical Co., Ltd.",
    tagline: "High-solubility non-ionic contrast agent for vascular radiocontrast procedures.",
    description: "Advanced non-ionic contrast compound featuring high iodine concentration payload and minimal neural tissue reaction for demanding radiological investigations."
  },
  {
    id: "cm7",
    slug: "iobitridol",
    name: "Iobitridol",
    category: "Pharma",
    casNumber: "136033-49-3",
    purity: "99.6%",
    grade: "EP, USP",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Jiangsu Yutian Pharmaceutical Co., Ltd.",
    tagline: "Stable, non-ionic water-soluble X-ray contrast agent with low chemotoxicity.",
    description: "Low osmolar, non-ionic iodinated intravascular contrast medium offering outstanding neural and cardiovascular tolerance across intravenous urography and angiography."
  },
  {
    id: "cm8",
    slug: "gadobutrol",
    name: "Gadobutrol",
    category: "Pharma",
    casNumber: "138071-82-6",
    purity: "99.9%",
    grade: "USP High Purity",
    dmfStatus: "USDMF Available",
    manufacturer: "Jiangsu Hengrui Pharmaceuticals Co., Ltd.",
    tagline: "Macrocyclic gadolinium-based MRI contrast agent for neuro and cardiovascular imaging.",
    description: "High-concentration macrocyclic gadolinium chelate providing superior T1 relaxivity for magnetic resonance imaging of cranial and spinal lesions."
  },
  {
    id: "ane1",
    slug: "desflurane",
    name: "Desflurane Inhaler / USP",
    category: "Pharma",
    casNumber: "57041-67-5",
    purity: "99.9%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Shanghai Hengrui / Heilongjiang Dino / Jiangsu Yutian",
    tagline: "Fluorinated methyl ethyl ether general inhalation anesthetic for surgical procedures.",
    description: "High-precision fluorinated volatile anesthetic providing rapid induction and the fastest emergence of all halogenated volatile anesthetics, sourced with full DCGI dossier support."
  },
  {
    id: "ane2",
    slug: "isoflurane",
    name: "Isoflurane",
    category: "Pharma",
    casNumber: "26675-46-7",
    purity: "99.9%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Heilongjiang Dino / Jiangsu Yutian Pharmaceutical Co., Ltd.",
    tagline: "Halogenated ether general inhalation anesthetic offering smooth induction.",
    description: "Industry-standard inhalation anesthetic characterized by minimal organ metabolism, low cardiac sensitisation, and rapid depth control during major surgical interventions."
  },
  {
    id: "ane3",
    slug: "sevoflurane",
    name: "Sevoflurane U.S.P.",
    category: "Pharma",
    casNumber: "28523-86-6",
    purity: "99.9%",
    grade: "USP, EP",
    dmfStatus: "DCGI Registered",
    manufacturer: "Jiangsu Hengrui Pharmaceuticals Co., Ltd.",
    tagline: "Sweet-smelling, non-pungent fluorinated isopropyl methyl ether anesthetic.",
    description: "Gold standard non-irritant general inhalation anesthetic agent ideal for pediatric and adult mask inductions with minimal respiratory airway resistance."
  },
  {
    id: "ane4",
    slug: "rocuronium-bromide",
    name: "Rocuronium Bromide",
    category: "Pharma",
    casNumber: "119302-91-9",
    purity: "99.5%",
    grade: "Ph. Eur., USP",
    dmfStatus: "DCGI Registered",
    manufacturer: "Chengdu Sino-Strong Pharmaceutical Co. Ltd.",
    tagline: "Intermediate-acting aminosteroid non-depolarizing neuromuscular blocking agent.",
    description: "Fast-onset neuromuscular blocker designed to facilitate endotracheal intubation and skeletal muscle relaxation during surgery and critical care ventilation."
  },
  {
    id: "an2",
    slug: "mefenamic-acid",
    name: "Mefenamic Acid IP",
    category: "Pharma",
    casNumber: "61-68-7",
    purity: "99.5%",
    grade: "IP, Ph. Eur., USP",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Shanxi Baoxin Pharmaceutical Co. Ltd",
    tagline: "Non-steroidal anti-inflammatory and analgesic for moderate pain management.",
    description: "Fenamate NSAID active ingredient synthesized under stringent temperature controls to guarantee ultra-low micro-impurity levels for oral solid dosage formulations."
  },
  {
    id: "an3",
    slug: "propofol",
    name: "Propofol",
    category: "Pharma",
    casNumber: "2078-54-8",
    purity: "99.8%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "USDMF Available",
    manufacturer: "Fresenius Kabi Active Ingredients",
    tagline: "Short-acting intravenous hypnotic and general anesthetic formulation grade.",
    description: "Alkyphenol general anesthetic active compound for parenteral lipid emulsion formulations utilized in surgical induction and critical care sedation."
  },
  {
    id: "an5",
    slug: "bupivacaine",
    name: "Bupivacaine",
    category: "Pharma",
    casNumber: "2180-92-9",
    purity: "99.6%",
    grade: "USP, Ph. Eur.",
    dmfStatus: "USDMF Available",
    manufacturer: "Aurobindo Pharma Ltd.",
    tagline: "Long-acting local anesthetic for regional, epidural, and spinal anesthesia.",
    description: "Potent long-duration amide local anesthetic synthesized for epidural, spinal, and peripheral nerve block formulations requiring extended analgesic coverage."
  },
  {
    id: "ab1",
    slug: "amphotericin",
    name: "Amphotericin B I.P",
    category: "Pharma",
    casNumber: "1397-89-3",
    purity: "99.1%",
    grade: "IP, USP, Ph. Eur.",
    dmfStatus: "DCGI Registered",
    manufacturer: "North China Pharmaceutical Huasheng Co. Ltd.",
    tagline: "Polyene antifungal antibiotic active against systemic deep-seated fungal infections.",
    description: "Fermentation-derived polyene macrolide active ingredient forming trans-membrane pores for deep systemic mycoses, mucormycosis, and visceral leishmaniasis therapies."
  },
  {
    id: "ab4",
    slug: "arbekacin-sulphate",
    name: "Arbekacin Sulphate J.P",
    category: "Pharma",
    casNumber: "51025-85-5",
    purity: "99.0%",
    grade: "JP, USP",
    dmfStatus: "DCGI Registered",
    manufacturer: "Reyon Pharmaceutical Co. Ltd.",
    tagline: "Semi-synthetic aminoglycoside antibiotic targeting MRSA and resistant strains.",
    description: "Broad-spectrum aminoglycoside active ingredient refractory to bacterial inactivating enzymes, indicated for refractory nosocomial pneumonias and sepsis."
  },
  {
    id: "ab2",
    slug: "azithromycin",
    name: "Azithromycin I.P",
    category: "Pharma",
    casNumber: "83905-01-5",
    purity: "99.5%",
    grade: "IP, USP, Ph. Eur.",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Zhejiang Jinhua Conba BioPharma Co., Ltd",
    tagline: "Broad-spectrum azalide antibiotic effective against respiratory and skin infections.",
    description: "Second-generation macrolide active ingredient with enhanced acid stability and tissue distribution for upper respiratory tract and venereal formulations."
  },
  {
    id: "ab12",
    slug: "rifampicin",
    name: "Rifampicin IP",
    category: "Pharma",
    casNumber: "13292-46-1",
    purity: "99.2%",
    grade: "IP, USP, BP",
    dmfStatus: "DCGI Registered",
    manufacturer: "Shenyang Antibiotic Manufacturer",
    tagline: "First-line semi-synthetic rifamycin antibiotic for tuberculosis management.",
    description: "Bactericidal DNA-dependent RNA polymerase inhibitor active against Mycobacterium tuberculosis and severe staphylococcal biofilm infections."
  },
  {
    id: "ab13",
    slug: "streptomycin",
    name: "Streptomycin Sterile IP",
    category: "Pharma",
    casNumber: "3810-74-0",
    purity: "99.4%",
    grade: "IP, USP",
    dmfStatus: "DCGI Registered",
    manufacturer: "North China Pharmaceutical Huasheng Co. Ltd.",
    tagline: "Sterile aminoglycoside antibiotic for mycobacterial and zoonotic bacterial regimens.",
    description: "Sterile crystalline sulfate salt of streptomycin binding the 30S ribosomal subunit to treat multidrug-resistant tuberculosis, tularemia, and plague."
  },
  {
    id: "ab3",
    slug: "teicoplanin",
    name: "Teicoplanin IP",
    category: "Pharma",
    casNumber: "61036-62-2",
    purity: "99.3%",
    grade: "IP, Ph. Eur.",
    dmfStatus: "DCGI Registered",
    manufacturer: "Dongkook Pharmaceutical Co. Ltd.",
    tagline: "Glycopeptide antibiotic active against Gram-positive bacterial pathogens.",
    description: "Semi-synthetic glycopeptide complex active against methicillin-resistant Staphylococcus aureus (MRSA) and enterococcal systemic infections."
  },
  {
    id: "av3",
    slug: "lamivudine",
    name: "Lamivudine IP",
    category: "Pharma",
    casNumber: "134678-17-4",
    purity: "99.7%",
    grade: "IP, USP, Ph. Eur.",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Anhui Biochem Pharmaceutical Co., Ltd",
    tagline: "Nucleoside reverse transcriptase inhibitor (NRTI) for HIV-1 and Hepatitis B therapy.",
    description: "High-purity cytosine nucleoside analogue terminating viral reverse transcription across first-line anti-retroviral and chronic hepatitis B therapies."
  },
  {
    id: "av4",
    slug: "tenofovir-disoproxil-fumarate",
    name: "Tenofovir Disoproxil Fumarate IP",
    category: "Pharma",
    casNumber: "201341-05-1",
    purity: "99.5%",
    grade: "IP, USP",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Anhui Biochem Pharmaceutical Co., Ltd",
    tagline: "Oral nucleotide prodrug reverse transcriptase inhibitor for chronic viral management.",
    description: "Acyclic nucleoside phosphonate diester prodrug providing potent systemic suppression of HIV-1 replication and hepatitis B viral loads."
  },
  {
    id: "onc5",
    slug: "mitomycin",
    name: "Mitomycin",
    category: "Pharma",
    casNumber: "50-07-7",
    purity: "99.1%",
    grade: "USP, IP",
    dmfStatus: "DCGI Registered",
    manufacturer: "Wuxi Fortune Pharmaceutical Co. Ltd.",
    tagline: "Potent antitumor antibiotic and DNA alkylating chemotherapy active agent.",
    description: "Streptomyces caespitosus fermentation-derived aziridine antineoplastic cross-linking complementary DNA strands to suppress gastric, pancreatic, and bladder carcinomas."
  },
  {
    id: "imm1",
    slug: "tacrolimus",
    name: "Tacrolimus IP",
    category: "Pharma",
    casNumber: "104987-11-3",
    purity: "99.4%",
    grade: "IP, USP, EP",
    dmfStatus: "DCGI Registered",
    manufacturer: "North China Pharmaceutical Huasheng Co. Ltd.",
    tagline: "Calcineurin inhibitor macrolide immunosuppressant for solid organ transplant care.",
    description: "Potent macrolide immunosuppressive agent blocking T-lymphocyte signal transduction and interleukin-2 transcription to prevent allograft rejection."
  },
  {
    id: "imm2",
    slug: "cyclosporine",
    name: "Cyclosporine IP",
    category: "Pharma",
    casNumber: "59865-13-3",
    purity: "99.3%",
    grade: "IP, USP, Ph. Eur.",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "North China Pharmaceutical Huasheng Co. Ltd.",
    tagline: "Cyclic polypeptide immunosuppressive active for transplant & autoimmune indications.",
    description: "Calcineurin-binding cyclic peptide suppressing cell-mediated immunocompetence across renal, cardiac, and hepatic transplantation protocols."
  },
  {
    id: "onc6",
    slug: "oxaliplatin",
    name: "Oxaliplatin IP",
    category: "Pharma",
    casNumber: "61825-94-3",
    purity: "99.8%",
    grade: "IP, USP, Ph. Eur.",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Kunming Guiyan Pharmaceutical Co. Ltd",
    tagline: "Third-generation platinum coordination complex antineoplastic for colorectal cancer.",
    description: "Organoplatinum complex featuring a 1,2-diaminocyclohexane carrier ligand inhibiting DNA synthesis and cell proliferation in metastatic colorectal carcinomas."
  },
  {
    id: "hor4",
    slug: "ethinylestradiol",
    name: "Ethinylestradiol",
    category: "Pharma",
    casNumber: "57-63-6",
    purity: "99.6%",
    grade: "IP, USP, Ph. Eur.",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Qinhuangdao Zizhu Pharmaceutical",
    tagline: "Synthetic derivative of 17β-estradiol for oral contraceptive & hormone formulations.",
    description: "Bioactive estrogenic steroid providing high oral bioavailability and ovulation suppression across combined oral contraceptives and hormone replacement therapies."
  },
  {
    id: "hor5",
    slug: "levonorgestrel",
    name: "Levonorgestrel",
    category: "Pharma",
    casNumber: "797-63-7",
    purity: "99.5%",
    grade: "IP, USP, Ph. Eur.",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Qinhuangdao Zizhu Pharmaceutical",
    tagline: "Second-generation synthetic progestogen for emergency and long-acting contraception.",
    description: "Active D-enantiomer of norgestrel delivering potent progestational and anti-estrogenic actions for oral tablets, subdermal implants, and intrauterine systems."
  },
  {
    id: "hor6",
    slug: "mifepristone",
    name: "Mifepristone",
    category: "Pharma",
    casNumber: "84371-65-3",
    purity: "99.7%",
    grade: "IP, USP, Ph. Eur.",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Qinhuangdao Zizhu Pharmaceutical",
    tagline: "Synthetic steroid antiprogestational and antiglucocorticoid active pharmaceutical ingredient.",
    description: "High-affinity competitive antagonist of progesterone and glucocorticoid receptors utilized in gynecological procedures and Cushing's syndrome medical therapy."
  },

  // =========================================================================
  // 2. ANIMAL CARE (Veterinary Actives & Herd Health)
  // Sourced directly from Ruskin's registered DCGI portfolio & veterinary lines
  // =========================================================================
  {
    id: "ab7",
    slug: "levamisole",
    name: "Levamisole",
    category: "Animal Care",
    casNumber: "14769-73-4",
    purity: "99.5%",
    grade: "BP Vet, USP, Ph. Eur.",
    dmfStatus: "DCGI Registered",
    manufacturer: "Guilin Pharmaceutical",
    tagline: "Broad-spectrum anthelmintic and immunomodulator for veterinary livestock.",
    description: "Synthetic imidazothiazole derivative acting as a potent nematicide and immune restoration active across cattle, sheep, swine, and poultry veterinary therapeutics."
  },
  {
    id: "an1",
    slug: "procaine-penicillin",
    name: "Procaine Penicillin IP",
    category: "Animal Care",
    casNumber: "54-35-3",
    purity: "99.2%",
    grade: "IP, USP, BP Vet",
    dmfStatus: "DCGI Registered",
    manufacturer: "CSPC Zhongnuo Pharmaceutical Co. Ltd",
    tagline: "Repository penicillin suspension active for sustained veterinary antibiotic therapy.",
    description: "Deep intramuscular repository antibacterial complex engineered for extended plasma retention and localized comfort during veterinary livestock treatments."
  },
  {
    id: "ab6",
    slug: "benzathine-penicillin",
    name: "Benzathine Penicillin IP",
    category: "Animal Care",
    casNumber: "1538-09-6",
    purity: "99.4%",
    grade: "IP, USP, BP Vet",
    dmfStatus: "DCGI Registered",
    manufacturer: "CSPC Zhongnuo Pharmaceutical Co. Ltd",
    tagline: "Ultra long-acting depot veterinary penicillin for herd infection prophylaxis.",
    description: "Depot dibenzylethylenediamine salt offering low water solubility for prolonged sustained-release prophylaxis against veterinary bacterial infections."
  },
  {
    id: "ab5",
    slug: "benzylpenicillin-sodium",
    name: "Benzylpenicillin Sodium IP",
    category: "Animal Care",
    casNumber: "69-57-8",
    purity: "99.6%",
    grade: "IP, USP, Ph. Eur.",
    dmfStatus: "DCGI Registered",
    manufacturer: "CSPC Zhongnuo Pharmaceutical Co. Ltd",
    tagline: "Natural penicillin antibiotic for rapid veterinary injection and herd care.",
    description: "Crystalline sodium salt of Penicillin G produced via sterile submersed fermentation for immediate high-peak bactericidal serum concentrations in livestock."
  },
  {
    id: "vit12",
    slug: "menadione",
    name: "Menadione (Vitamin K3)",
    category: "Animal Care",
    casNumber: "58-27-5",
    purity: "99.2%",
    grade: "USP, Feed Grade",
    dmfStatus: "USDMF Available",
    manufacturer: "Onetech Chemical Co., Ltd.",
    tagline: "Synthetic Vitamin K3 active for animal nutrition, poultry, and blood clotting support.",
    description: "Synthetic naphthoquinone active converted hepatically to bioactive phylloquinone forms essential for prothrombin clotting factor synthesis in poultry and livestock feeds."
  },
  {
    id: "vet1",
    slug: "ivermectin",
    name: "Ivermectin",
    category: "Animal Care",
    casNumber: "70288-86-7",
    purity: "99.0%",
    grade: "USP, BP Vet, EP",
    dmfStatus: "CEP Certified",
    manufacturer: "Hebei Veyong Bio-Chemical Co., Ltd.",
    tagline: "Macrocyclic lactone broad-spectrum endectocide for livestock and companion animal parasite control.",
    description: "High-potency avermectin derivative selectively opening glutamate-gated chloride channels in parasites. Formulated into injectables, pour-ons, and oral veterinary paste for cattle, swine, and equine."
  },
  {
    id: "vet2",
    slug: "enrofloxacin",
    name: "Enrofloxacin",
    category: "Animal Care",
    casNumber: "93106-60-6",
    purity: "99.5%",
    grade: "BP Vet, USP",
    dmfStatus: "USDMF Available",
    manufacturer: "Zhejiang Guobang Pharmaceutical Co., Ltd.",
    tagline: "Veterinary-specific fluoroquinolone antibacterial active for respiratory and enteric infections.",
    description: "Bactericidal DNA gyrase inhibitor specially synthesized for veterinary therapeutic formulations across bovine respiratory disease (BRD), poultry colibacillosis, and swine actinobacillosis."
  },
  {
    id: "vet3",
    slug: "tilmicosin",
    name: "Tilmicosin",
    category: "Animal Care",
    casNumber: "108050-54-0",
    purity: "99.0%",
    grade: "USP Vet, EP",
    dmfStatus: "USDMF Available",
    manufacturer: "Shandong Luxi Animal Medicine Co., Ltd.",
    tagline: "Semi-synthetic veterinary macrolide targeting respiratory pathogens in cattle and swine.",
    description: "Advanced tylosin derivative designed for veterinary therapeutic administration, delivering targeted pulmonary tissue accumulation against Mannheimia haemolytica and Pasteurella multocida."
  },
  {
    id: "vet4",
    slug: "fipronil",
    name: "Fipronil",
    category: "Animal Care",
    casNumber: "120068-37-3",
    purity: "99.2%",
    grade: "Vet Technical Grade",
    dmfStatus: "Tech Pack Ready",
    manufacturer: "GSP Crop Science Pvt. Ltd.",
    tagline: "Broad-spectrum phenylpyrazole ectoparasiticide for companion animals and livestock hygiene.",
    description: "Potent GABA-gated chloride channel disruptor utilized in spot-on, spray, and collar formulations for long-lasting prevention and treatment of fleas, ticks, and lice in veterinary applications."
  },

  // =========================================================================
  // 3. EXCIPIENTS (Binders, Disintegrants & Polymers for Formulators)
  // Sourced from audited global excipient manufacturing partners
  // =========================================================================
  {
    id: "exc1",
    slug: "microcrystalline-cellulose",
    name: "Microcrystalline Cellulose (MCC)",
    category: "Excipients",
    casNumber: "9004-34-6",
    purity: "99.5%",
    grade: "USP-NF, Ph. Eur., IP",
    dmfStatus: "USDMF Available",
    manufacturer: "FMC BioPolymer / DuPont Nutrition",
    tagline: "Premier direct-compression binder, diluent, and disintegrant for oral solid dosage forms.",
    description: "Purified, partially depolymerized alpha-cellulose exhibiting superior compactibility, excellent flowability, and low friability across pharmaceutical tablet compression."
  },
  {
    id: "exc2",
    slug: "povidone-k30",
    name: "Povidone (PVP K30 / K90)",
    category: "Excipients",
    casNumber: "9003-39-8",
    purity: "99.0%",
    grade: "USP, Ph. Eur., IP",
    dmfStatus: "CEP Certified",
    manufacturer: "BASF Pharma Solutions",
    tagline: "Synthetic polymer wet granulation binder, solubilizer, and film former.",
    description: "Linear 1-vinyl-2-pyrrolidone polymer widely utilized as an essential wet-granulation tablet binder, suspension stabilizer, and bioavailability enhancer for poorly soluble APIs."
  },
  {
    id: "exc3",
    slug: "croscarmellose-sodium",
    name: "Croscarmellose Sodium",
    category: "Excipients",
    casNumber: "74811-65-7",
    purity: "99.2%",
    grade: "USP-NF, Ph. Eur.",
    dmfStatus: "USDMF Available",
    manufacturer: "Roquette Frères",
    tagline: "Superdisintegrant providing rapid water wicking and tablet disintegration.",
    description: "Internally cross-linked sodium carboxymethylcellulose designed for accelerated tablet disintegration and active pharmaceutical ingredient dissolution at low use concentrations (1-5%)."
  },
  {
    id: "exc4",
    slug: "hydroxypropyl-methylcellulose",
    name: "Hydroxypropyl Methylcellulose (HPMC)",
    category: "Excipients",
    casNumber: "9004-65-3",
    purity: "99.0%",
    grade: "USP, Ph. Eur., IP",
    dmfStatus: "USDMF Available",
    manufacturer: "Shin-Etsu Chemical Co., Ltd.",
    tagline: "Controlled-release matrix polymer and premier film-coating agent.",
    description: "Semi-synthetic viscoelastic cellulosic polymer acting as the worldwide standard for hydrophilic extended-release matrix tablets and barrier film coating systems."
  },
  {
    id: "exc5",
    slug: "magnesium-stearate",
    name: "Magnesium Stearate (Vegetable Grade)",
    category: "Excipients",
    casNumber: "557-04-0",
    purity: "99.4%",
    grade: "USP-NF, Ph. Eur., IP",
    dmfStatus: "CEP Certified",
    manufacturer: "Peter Greven GmbH & Co. KG",
    tagline: "High-lubricity pharmaceutical tableting lubricant preventing die wall adhesion.",
    description: "High-surface-area vegetable-derived magnesium stearate ensuring optimal punch ejection and tooling longevity in high-speed rotary tablet compression machines."
  },
  {
    id: "exc6",
    slug: "polysorbate-80",
    name: "Polysorbate 80 (Tween 80)",
    category: "Excipients",
    casNumber: "9005-65-6",
    purity: "99.0%",
    grade: "USP-NF, Ph. Eur., IP",
    dmfStatus: "USDMF Available",
    manufacturer: "Croda International Plc",
    tagline: "Non-ionic surfactant, micellar solubilizer, and parenteral emulsion stabilizer.",
    description: "Polyoxyethylene sorbitan monooleate excipient utilized in oral, topical, and parenteral biopharmaceutical drug formulations to prevent protein aggregation and solubilize lipophilic actives."
  },
  {
    id: "exc7",
    slug: "sodium-starch-glycolate",
    name: "Sodium Starch Glycolate",
    category: "Excipients",
    casNumber: "9063-38-1",
    purity: "99.1%",
    grade: "USP-NF, BP, EP",
    dmfStatus: "USDMF Available",
    manufacturer: "DFE Pharma",
    tagline: "Cross-linked superdisintegrant with exceptional swelling capacity.",
    description: "Sodium salt of a carboxymethyl ether of potato starch swelling up to 300-fold in volume upon contact with gastric fluids for rapid capsule and tablet dissolution."
  },
  {
    id: "exc8",
    slug: "colloidal-silicon-dioxide",
    name: "Colloidal Silicon Dioxide",
    category: "Excipients",
    casNumber: "112945-52-5",
    purity: "99.8%",
    grade: "USP-NF, Ph. Eur.",
    dmfStatus: "USDMF Available",
    manufacturer: "Evonik Industries AG",
    tagline: "High surface area fumed silica glidant, moisture adsorbent, and anti-caking agent.",
    description: "Sub-micron hydrophilic fumed silica providing uniform particle surface coverage to enhance blend flowability, eliminate powder bridging, and stabilize moisture-sensitive formulations."
  },

  // =========================================================================
  // 4. FOOD & NUTRITION (CoQ10, Renal Keto-Analogues & Dietary Vitamins)
  // Sourced directly from Ruskin's registered DCGI portfolio (productList.xlsx)
  // =========================================================================
  {
    id: "nut1",
    slug: "coenzyme-q10",
    name: "Coenzyme Q10 USP (Ubidecarenone)",
    category: "Food & Nutrition",
    casNumber: "303-98-0",
    purity: "99.5%",
    grade: "USP, EP",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Shenzhou Biology & Technology Co. Ltd.",
    tagline: "Essential lipid-soluble antioxidant and mitochondrial cellular energy nutraceutical.",
    description: "High-purity bio-fermented Ubidecarenone acting as the crucial electron carrier in mitochondrial ATP synthesis and premier cellular antioxidant defense in clinical and dietary nutrition."
  },
  {
    id: "vit4",
    slug: "pyridoxine-hcl",
    name: "Pyridoxine Hydrochloride (Vitamin B6) IP/EP",
    category: "Food & Nutrition",
    casNumber: "58-56-0",
    purity: "99.5%",
    grade: "IP, EP, USP",
    dmfStatus: "DCGI Registered",
    manufacturer: "Jiangxi Tianxin Pharmaceutical Co., Ltd.",
    tagline: "Vitamin B6 active ingredient for metabolic enzyme systems and fortified food nutrition.",
    description: "Water-soluble vitamin B6 active ingredient acting as coenzyme pyridoxal phosphate precursor for amino acid decarboxylation, transamination, and metabolic wellness."
  },
  {
    id: "nut2",
    slug: "thiamine-mononitrate",
    name: "Thiamine Mononitrate (Thiamine Nitrate) IP/EP",
    category: "Food & Nutrition",
    casNumber: "532-43-4",
    purity: "99.4%",
    grade: "IP, EP, USP",
    dmfStatus: "DCGI Registered",
    manufacturer: "Jiangxi Tianxin Pharmaceutical Co., Ltd.",
    tagline: "Stable non-hygroscopic Vitamin B1 nitrate salt for food fortification and multivitamins.",
    description: "High-stability mononitrate salt of thiamine designed specifically for dry powder blends, dietary supplement tablets, and fortified cereal foods requiring superior moisture resistance."
  },
  {
    id: "keto1",
    slug: "dl-alpha-hydroxymethionine-calcium",
    name: "D,L-α-Hydroxymethionine Calcium",
    category: "Food & Nutrition",
    casNumber: "4857-44-3",
    purity: "99.2%",
    grade: "Ph. Eur., Medical Food",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Hebei Yipin Pharmaceutical Co. Ltd.",
    tagline: "Calcium salt of alpha-hydroxy methionine for nitrogen-free renal nutrition therapy.",
    description: "Specialized calcium keto/hydroxy analogue of methionine enabling the capture and reuse of amino nitrogen for chronic kidney disease (CKD) conservative medical management."
  },
  {
    id: "keto2",
    slug: "dl-alpha-ketoisoleucine-calcium",
    name: "D,L-α-Ketoisoleucine Calcium",
    category: "Food & Nutrition",
    casNumber: "51828-95-6",
    purity: "99.2%",
    grade: "Ph. Eur., Medical Food",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Hebei Yipin Pharmaceutical Co. Ltd.",
    tagline: "Essential keto-analogue of isoleucine for dietary management in advanced renal insufficiency.",
    description: "Co-precipitated calcium salt of alpha-keto isoleucine facilitating transamination into essential isoleucine without introducing nitrogenous waste products."
  },
  {
    id: "keto3",
    slug: "alpha-ketoleucine-calcium",
    name: "α-Ketoleucine Calcium",
    category: "Food & Nutrition",
    casNumber: "51828-94-5",
    purity: "99.3%",
    grade: "Ph. Eur., Medical Food",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Hebei Yipin Pharmaceutical Co. Ltd.",
    tagline: "Alpha-keto analogue of leucine for metabolic protein-restricted clinical nutrition.",
    description: "High-purity calcium salt converting into essential leucine to maintain nitrogen balance and prevent uremic toxicity in renal nutrition regimes."
  },
  {
    id: "keto4",
    slug: "alpha-ketophenylalanine-calcium",
    name: "α-Ketophenylalanine Calcium",
    category: "Food & Nutrition",
    casNumber: "51828-93-4",
    purity: "99.1%",
    grade: "Ph. Eur., Medical Food",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Hebei Yipin Pharmaceutical Co. Ltd.",
    tagline: "Alpha-keto analogue of phenylalanine for dietary management of chronic kidney disease.",
    description: "Essential aromatic amino acid keto-precursor capturing endogenous urea nitrogen and lowering blood urea nitrogen (BUN) levels in dialysis-delaying therapy."
  },
  {
    id: "keto5",
    slug: "alpha-ketovaline-calcium",
    name: "α-Ketovaline Calcium",
    category: "Food & Nutrition",
    casNumber: "51828-97-8",
    purity: "99.2%",
    grade: "Ph. Eur., Medical Food",
    dmfStatus: "Under Registration (DCGI)",
    manufacturer: "Hebei Yipin Pharmaceutical Co. Ltd.",
    tagline: "Branched-chain keto-analogue of valine for renal nutritional formulations.",
    description: "High-purity calcium 3-methyl-2-oxobutyrate serving as structural building block for valine synthesis during protein-restricted CKD nutrition."
  },
  {
    id: "vit3",
    slug: "ascorbic-acid",
    name: "Ascorbic Acid (Vitamin C)",
    category: "Food & Nutrition",
    casNumber: "50-81-7",
    purity: "99.8%",
    grade: "USP, Ph. Eur., IP, FCC",
    dmfStatus: "CEP Certified",
    manufacturer: "DSM Nutritional Products",
    tagline: "Vitamin C active antioxidant for dietary nutrition and food fortification.",
    description: "Crystalline L-ascorbic acid manufactured to strict heavy metal specifications for food antioxidant stabilization, nutritional beverage enrichment, and dietary supplement tablets."
  },
  {
    id: "vit9",
    slug: "cholecalciferol",
    name: "Cholecalciferol (Vitamin D3)",
    category: "Food & Nutrition",
    casNumber: "67-97-0",
    purity: "99.6%",
    grade: "USP, Ph. Eur., FCC",
    dmfStatus: "USDMF Available",
    manufacturer: "Dishman Carbogen Amcis Ltd.",
    tagline: "Vitamin D3 active fat-soluble secosteroid for bone mineralization and immune nutrition.",
    description: "Ultra-pure crystalline vitamin D3 synthesized via UV-irradiation of 7-dehydrocholesterol for dietary calcium homeostasis, bone fortification, and wellness supplements."
  },
  {
    id: "vit10",
    slug: "tocopherol-acetate",
    name: "Tocopherol Acetate (Vitamin E)",
    category: "Food & Nutrition",
    casNumber: "7695-91-2",
    purity: "99.5%",
    grade: "USP, Ph. Eur., Food Grade",
    dmfStatus: "CEP Certified",
    manufacturer: "Zhejiang Medicine Co., Ltd.",
    tagline: "Vitamin E acetate lipid antioxidant for nutraceutical softgels and food fortification.",
    description: "Stable esterified form of alpha-tocopherol protecting cellular membrane polyunsaturated fatty acids against free-radical oxidation in nutritional applications."
  },
  {
    id: "vit5",
    slug: "cyanocobalamin",
    name: "Cyanocobalamin (Vitamin B12)",
    category: "Food & Nutrition",
    casNumber: "68-19-9",
    purity: "99.0%",
    grade: "USP, Ph. Eur., FCC",
    dmfStatus: "USDMF Available",
    manufacturer: "Sanofi Active Ingredients",
    tagline: "Vitamin B12 crystalline active for cellular energy, hematoregulatory drinks and supplements.",
    description: "Deep red crystalline cobalamin active essential for red blood cell formation, cellular energy metabolism, and nervous system nutritional health."
  },

  // =========================================================================
  // 5. NOOTROPICS (Cognitive Enhancers & Neuro-Actives)
  // Sourced directly from Ruskin's registered DCGI portfolio & neuro bio-actives
  // =========================================================================
  {
    id: "noo2",
    slug: "piracetam",
    name: "Piracetam IP",
    category: "Nootropics",
    casNumber: "7491-74-9",
    purity: "99.6%",
    grade: "IP, Ph. Eur., BP",
    dmfStatus: "DCGI Registered",
    manufacturer: "Jiangxi Yuehua Pharmaceutical Co. Ltd",
    tagline: "Flagship racetam nootropic enhancing synaptic neurotransmission and cerebral microcirculation.",
    description: "Cyclic GABA derivative allosterically modulating AMPA receptors and improving erythrocyte deformability for heightened cerebral blood flow, mental processing speed, and cognitive retention. Directly registered with DCGI."
  },
  {
    id: "vit6",
    slug: "thiamine-hcl",
    name: "Thiamine Hydrochloride (Vitamin B1) IP/EP",
    category: "Nootropics",
    casNumber: "67-03-8",
    purity: "99.4%",
    grade: "IP, EP, USP",
    dmfStatus: "DCGI Registered",
    manufacturer: "Jiangxi Tianxin Pharmaceutical Co., Ltd.",
    tagline: "Vitamin B1 hydrochloride neural coenzyme for cerebral glucose metabolism and neural energy.",
    description: "Crystalline vitamin B1 active serving as essential thiamine pyrophosphate (TPP) coenzyme required for neural ATP energy generation, nerve impulse conduction, and cognitive clarity. Directly registered with DCGI."
  },
  {
    id: "noo1",
    slug: "citicoline-sodium",
    name: "Citicoline Sodium (CDP-Choline)",
    category: "Nootropics",
    casNumber: "33818-15-4",
    purity: "99.5%",
    grade: "USP, Ph. Eur., Nutraceutical Grade",
    dmfStatus: "USDMF Available",
    manufacturer: "Kyowa Hakko Bio Co., Ltd.",
    tagline: "Flagship cholinergic nootropic supporting phospholipid synthesis, focus, and memory.",
    description: "High-bioavailability cytidine 5'-diphosphocholine sodium active supplying both choline and cytidine across the blood-brain barrier for neuronal membrane repair, dopamine receptor density, and mental acuity."
  },
  {
    id: "noo3",
    slug: "alpha-gpc",
    name: "Alpha-GPC (L-Alpha Glycerylphosphorylcholine)",
    category: "Nootropics",
    casNumber: "28319-77-9",
    purity: "99.0%",
    grade: "Pharma & Dietary Grade",
    dmfStatus: "USDMF Available",
    manufacturer: "Chemi Nutra / Lipoid GmbH",
    tagline: "Highly bioavailable acetylcholine precursor for cognitive clarity, memory, and athletic power.",
    description: "Physiological phospholipid precursor directly supplying choline to central cholinergic neurons for enhanced acetylcholine synthesis, growth hormone secretion, and neuromuscular precision."
  },
  {
    id: "noo4",
    slug: "l-theanine",
    name: "L-Theanine",
    category: "Nootropics",
    casNumber: "3081-61-6",
    purity: "99.8%",
    grade: "USP, FCC Grade",
    dmfStatus: "Tech Pack Ready",
    manufacturer: "Taiyo Kagaku Co., Ltd.",
    tagline: "Natural amino acid inducing calm alpha-wave focus without drowsiness.",
    description: "Non-proteinogenic amino acid analogue of glutamine that crosses the blood-brain barrier to modulate GABA, serotonin, and dopamine, generating a relaxed yet alert mental state."
  },
  {
    id: "noo5",
    slug: "phosphatidylserine",
    name: "Phosphatidylserine (PS 50% / 70%)",
    category: "Nootropics",
    casNumber: "51446-62-9",
    purity: "99.0%",
    grade: "Pharma & Nutraceutical Grade",
    dmfStatus: "USDMF Available",
    manufacturer: "Enzymotec Ltd. / Lipogen",
    tagline: "Essential neuronal membrane phospholipid critical for memory, attention, and cognitive longevity.",
    description: "Major acidic phospholipid class in brain cortex cell membranes maintaining membrane fluidity, neurotransmitter release, nerve growth factor reception, and age-related memory preservation."
  },
  {
    id: "noo6",
    slug: "huperzine-a",
    name: "Huperzine A",
    category: "Nootropics",
    casNumber: "102518-79-6",
    purity: "99.2%",
    grade: "High-Purity Natural Extract",
    dmfStatus: "Tech Pack Ready",
    manufacturer: "Chengdu Wagott Bio-Tech Co., Ltd.",
    tagline: "Potent selective acetylcholinesterase inhibitor for memory consolidation and neuroprotection.",
    description: "Naturally derived sesquiterpene alkaloid exerting reversible inhibition of acetylcholinesterase to increase synaptic acetylcholine levels, prolonging memory retention and cognitive performance."
  }
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

/** Categories with live product counts, in catalog order. Single source of truth for all filters. */
export const PRODUCT_CATEGORIES: { name: string; count: number }[] = Array.from(
  ALL_PRODUCTS.reduce(
    (map, p) => map.set(p.category, (map.get(p.category) ?? 0) + 1),
    new Map<string, number>()
  )
).map(([name, count]) => ({ name, count }));

export function searchProducts(query: string, limit?: number): ApiProduct[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits = ALL_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.casNumber.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.manufacturer.toLowerCase().includes(q)
  ).sort((a, b) => {
    // names that start with the query rank first
    const as = a.name.toLowerCase().startsWith(q) ? 0 : 1;
    const bs = b.name.toLowerCase().startsWith(q) ? 0 : 1;
    return as - bs || a.name.localeCompare(b.name);
  });
  return limit ? hits.slice(0, limit) : hits;
}
