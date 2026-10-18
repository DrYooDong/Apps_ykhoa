import { AntibioticItem, AmrRecord } from "../types";

export const ANTIBIOTICS: AntibioticItem[] = [
  {
    "id": "meropenem",
    "name": "Meropenem",
    "group": "Carbapenem",
    "route": "IV",
    "aliases": [
      "mero",
      "meronem",
      "meropenem"
    ],
    "indications": [
      "Nhiễm khuẩn huyết (Sepsis)",
      "Viêm phổi bệnh viện (HAP/VAP)",
      "Viêm màng não",
      "Nhiễm khuẩn ổ bụng phức tạp",
      "Nhiễm trùng vi khuẩn đa kháng (ESBL/AmpC)"
    ],
    "indicationsEn": [
      "Sepsis/Septic shock",
      "Hospital-acquired pneumonia (HAP/VAP)",
      "Bacterial meningitis",
      "Complicated intra-abdominal infection",
      "MDR Gram-negative (ESBL/AmpC)"
    ],
    "needsHeight": false,
    "groupEn": "Carbapenem"
  },
  {
    "id": "imipenem",
    "name": "Imipenem/Cilastatin",
    "group": "Carbapenem",
    "route": "IV",
    "aliases": [
      "imipenem",
      "tienam",
      "imipenem cilastatin",
      "primaxin"
    ],
    "indications": [
      "Nhiễm khuẩn huyết",
      "Viêm phổi bệnh viện",
      "Nhiễm khuẩn ổ bụng",
      "Nhiễm khuẩn tiết niệu phức tạp"
    ],
    "indicationsEn": [
      "Sepsis",
      "HAP/VAP",
      "Complicated intra-abdominal infection",
      "Complicated UTI"
    ],
    "needsHeight": false,
    "groupEn": "Carbapenem"
  },
  {
    "id": "ertapenem",
    "name": "Ertapenem",
    "group": "Carbapenem",
    "route": "IV",
    "aliases": [
      "ertapenem",
      "invanz"
    ],
    "indications": [
      "Nhiễm khuẩn ổ bụng",
      "Viêm phổi mắc phải cộng đồng nặng",
      "Nhiễm khuẩn da và mô mềm",
      "Nhiễm khuẩn bàn chân đái tháo đường"
    ],
    "indicationsEn": [
      "Intra-abdominal infections",
      "Severe CAP",
      "Complicated SSTI",
      "Diabetic foot infections"
    ],
    "needsHeight": false,
    "groupEn": "Carbapenem"
  },
  {
    "id": "doripenem",
    "name": "Doripenem",
    "group": "Carbapenem",
    "route": "IV",
    "aliases": [
      "doripenem",
      "doribax"
    ],
    "indications": [
      "Viêm phổi bệnh viện",
      "Nhiễm khuẩn ổ bụng phức tạp",
      "Nhiễm khuẩn tiết niệu có biến chứng"
    ],
    "indicationsEn": [
      "HAP/VAP",
      "Complicated intra-abdominal infection",
      "Complicated UTI"
    ],
    "needsHeight": false,
    "groupEn": "Carbapenem"
  },
  {
    "id": "piperacillin_tazo",
    "name": "Piperacillin/Tazobactam",
    "group": "Beta-lactam/Ức chế BLase",
    "route": "IV",
    "aliases": [
      "pip tazo",
      "pipetazo",
      "piptazo",
      "piperacillin tazobactam",
      "tazocin"
    ],
    "indications": [
      "Nhiễm khuẩn huyết",
      "Viêm phổi bệnh viện (HAP/VAP)",
      "Nhiễm khuẩn ổ bụng",
      "Nhiễm khuẩn da mô mềm nặng",
      "Sốt giảm bạch cầu hạt"
    ],
    "indicationsEn": [
      "Sepsis",
      "HAP/VAP",
      "Intra-abdominal infections",
      "Complicated SSTI",
      "Neutropenic fever"
    ],
    "needsHeight": false,
    "groupEn": "Beta-lactam / BLI"
  },
  {
    "id": "ampicillin_sulbactam",
    "name": "Ampicillin/Sulbactam",
    "group": "Beta-lactam/Ức chế BLase",
    "route": "IV",
    "aliases": [
      "amp sulbactam",
      "ampicillin sulbactam",
      "sulbactam",
      "unasyn"
    ],
    "indications": [
      "Nhiễm khuẩn bệnh viện",
      "Nhiễm khuẩn huyết",
      "Nhiễm trùng nặng"
    ],
    "indicationsEn": [
      "Hospital-acquired infections",
      "Sepsis",
      "Severe infections"
    ],
    "needsHeight": false,
    "groupEn": "Beta-lactam / BLI"
  },
  {
    "id": "cefo_sulbactam_11",
    "name": "Cefoperazon/Sulbactam 1:1",
    "group": "Beta-lactam/Ức chế BLase",
    "route": "IV",
    "aliases": [
      "cefo sulbactam 1:1",
      "cefoperazon sulbactam 1:1",
      "sulperazon",
      "cefo sulbactam",
      "cefoperazon sulbactam",
      "sulperazone"
    ],
    "indications": [
      "Nhiễm khuẩn do Acinetobacter baumannii",
      "Nhiễm khuẩn ổ bụng",
      "Viêm đường mật",
      "Viêm phổi bệnh viện"
    ],
    "indicationsEn": [
      "Acinetobacter baumannii infections",
      "Intra-abdominal infections",
      "Biliary tract infections",
      "HAP/VAP"
    ],
    "needsHeight": false,
    "groupEn": "Beta-lactam / BLI"
  },
  {
    "id": "cefo_sulbactam_21",
    "name": "Cefoperazon/Sulbactam 2:1",
    "group": "Beta-lactam/Ức chế BLase",
    "route": "IV",
    "aliases": [
      "cefo sulbactam 2:1",
      "cefoperazon sulbactam 2:1",
      "cefoperazon sulbactam",
      "cefo sulbactam",
      "bacsulfo",
      "sulcef"
    ],
    "indications": [
      "Nhiễm khuẩn do Acinetobacter baumannii",
      "Nhiễm khuẩn ổ bụng",
      "Nhiễm khuẩn huyết"
    ],
    "indicationsEn": [
      "Acinetobacter baumannii infections",
      "Intra-abdominal infections",
      "Sepsis"
    ],
    "needsHeight": false,
    "groupEn": "Beta-lactam / BLI"
  },
  {
    "id": "ceftriaxon",
    "name": "Ceftriaxon",
    "group": "Cephalosporin thế hệ 3",
    "route": "IV",
    "aliases": [
      "ceftriaxon",
      "rocephin",
      "cefo 3",
      "ceftriaxone"
    ],
    "indications": [
      "Viêm màng não mủ",
      "Viêm phổi mắc phải cộng đồng nặng",
      "Nhiễm khuẩn huyết",
      "Lậu cầu",
      "Nhiễm khuẩn ổ bụng"
    ],
    "indicationsEn": [
      "Bacterial meningitis",
      "Severe CAP",
      "Sepsis",
      "Gonorrhea",
      "Intra-abdominal infections"
    ],
    "needsHeight": false,
    "groupEn": "3rd Gen Cephalosporin"
  },
  {
    "id": "cefotaxim",
    "name": "Cefotaxim",
    "group": "Cephalosporin thế hệ 3",
    "route": "IV",
    "aliases": [
      "cefotaxim",
      "claforan",
      "cefotaxime"
    ],
    "indications": [
      "Viêm màng não",
      "Nhiễm khuẩn huyết",
      "Viêm phổi cộng đồng",
      "Viêm phúc mạc tự phát"
    ],
    "indicationsEn": [
      "Meningitis",
      "Sepsis",
      "Community-acquired pneumonia",
      "Spontaneous bacterial peritonitis"
    ],
    "needsHeight": false,
    "groupEn": "3rd Gen Cephalosporin"
  },
  {
    "id": "ceftazidim",
    "name": "Ceftazidim",
    "group": "Cephalosporin thế hệ 3 (chống Pseudomonas)",
    "route": "IV",
    "aliases": [
      "ceftazidim",
      "fortum",
      "tazidime",
      "ceftazidime"
    ],
    "indications": [
      "Viêm phổi bệnh viện nghi do Pseudomonas",
      "Nhiễm khuẩn huyết",
      "Sốt giảm bạch cầu hạt",
      "Nhiễm khuẩn tiết niệu có biến chứng"
    ],
    "indicationsEn": [
      "Pseudomonal HAP/VAP",
      "Sepsis",
      "Neutropenic fever",
      "Complicated UTI"
    ],
    "needsHeight": false,
    "groupEn": "3rd Gen Cephalosporin (Antipseudomonal)"
  },
  {
    "id": "cefepim",
    "name": "Cefepim",
    "group": "Cephalosporin thế hệ 4",
    "route": "IV",
    "aliases": [
      "cefepim",
      "maxipime",
      "cefepime"
    ],
    "indications": [
      "Sốt hạ bạch cầu hạt",
      "Viêm phổi bệnh viện nặng",
      "Nhiễm khuẩn huyết",
      "Nhiễm khuẩn ổ bụng phối hợp metronidazol"
    ],
    "indicationsEn": [
      "Neutropenic fever",
      "Severe HAP/VAP",
      "Sepsis",
      "Intra-abdominal infections with metronidazole"
    ],
    "needsHeight": false,
    "groupEn": "4th Gen Cephalosporin"
  },
  {
    "id": "ceftazidim_avibactam",
    "name": "Ceftazidim/Avibactam",
    "group": "Cephalosporin + Ức chế BLase mới",
    "route": "IV",
    "aliases": [
      "caz avi",
      "ceftazidim avibactam",
      "avycaz",
      "ctaz avi"
    ],
    "indications": [
      "Nhiễm khuẩn do vi khuẩn Gram âm sinh KPC / OXA-48",
      "Nhiễm khuẩn ổ bụng phức tạp",
      "Viêm phổi thở máy VAP",
      "Nhiễm khuẩn tiết niệu phức tạp"
    ],
    "indicationsEn": [
      "KPC / OXA-48 producing Enterobacterales",
      "Complicated intra-abdominal infections",
      "HAP/VAP",
      "Complicated UTI"
    ],
    "needsHeight": false,
    "groupEn": "Novel Cephalosporin + BLI"
  },
  {
    "id": "ceftolozan_tazo",
    "name": "Ceftolozan/Tazobactam",
    "group": "Cephalosporin + Ức chế BLase mới",
    "route": "IV",
    "aliases": [
      "ceftolozan tazobactam",
      "ceftolozane",
      "zerbaxa"
    ],
    "indications": [
      "Nhiễm khuẩn do Pseudomonas aeruginosa kháng thuốc (MDR P. aeruginosa)",
      "Viêm phổi bệnh viện / thở máy",
      "Nhiễm khuẩn tiết niệu phức tạp"
    ],
    "indicationsEn": [
      "MDR Pseudomonas aeruginosa infections",
      "HAP/VAP",
      "Complicated UTI"
    ],
    "needsHeight": false,
    "groupEn": "Novel Cephalosporin + BLI"
  },
  {
    "id": "cefazolin",
    "name": "Cefazolin",
    "group": "Cephalosporin thế hệ 1",
    "route": "IV",
    "aliases": [
      "cefazolin",
      "kefzol",
      "ancef"
    ],
    "indications": [
      "Dự phòng phẫu thuật",
      "Nhiễm khuẩn da và mô mềm do MSSA",
      "Nhiễm khuẩn huyết do MSSA"
    ],
    "indicationsEn": [
      "Surgical prophylaxis",
      "MSSA skin and soft tissue infections",
      "MSSA bacteremia"
    ],
    "needsHeight": false,
    "groupEn": "1st Gen Cephalosporin"
  },
  {
    "id": "cefuroxim",
    "name": "Cefuroxim",
    "group": "Cephalosporin thế hệ 2",
    "route": "IV",
    "aliases": [
      "cefuroxim",
      "zinacef",
      "cefuroxime",
      "zinnat"
    ],
    "indications": [
      "Nhiễm khuẩn hô hấp trên và dưới",
      "Nhiễm khuẩn tiết niệu",
      "Dự phòng phẫu thuật"
    ],
    "indicationsEn": [
      "Respiratory tract infections",
      "Urinary tract infections",
      "Surgical antimicrobial prophylaxis"
    ],
    "needsHeight": false,
    "groupEn": "2nd Gen Cephalosporin"
  },
  {
    "id": "cefoxitin",
    "name": "Cefoxitin",
    "group": "Cephalosporin thế hệ 2 (Cephamycin)",
    "route": "IV/IM",
    "aliases": [
      "cefoxitin",
      "mefoxin",
      "cefoxitine"
    ],
    "indications": [
      "Nhiễm khuẩn bệnh viện",
      "Nhiễm khuẩn huyết",
      "Nhiễm trùng nặng"
    ],
    "indicationsEn": [
      "Hospital-acquired infections",
      "Sepsis",
      "Severe infections"
    ],
    "needsHeight": false,
    "groupEn": "2nd Gen Cephalosporin (Cephamycin)"
  },
  {
    "id": "ciprofloxacin",
    "name": "Ciprofloxacin",
    "group": "Fluoroquinolone",
    "route": "IV/PO",
    "aliases": [
      "cipro",
      "ciprofloxacin",
      "ciprofloxacine",
      "ciprobay"
    ],
    "indications": [
      "Nhiễm khuẩn tiết niệu và viêm đài bể thận",
      "Nhiễm khuẩn đường tiêu hóa / Thương hàn",
      "Nhiễm khuẩn ổ bụng",
      "Nhiễm trùng do Pseudomonas aeruginosa"
    ],
    "indicationsEn": [
      "Complicated UTI / Pyelonephritis",
      "Enteric infections / Typhoid fever",
      "Intra-abdominal infections",
      "Pseudomonas aeruginosa infections"
    ],
    "needsHeight": false,
    "groupEn": "Fluoroquinolone"
  },
  {
    "id": "levofloxacin",
    "name": "Levofloxacin",
    "group": "Fluoroquinolone",
    "route": "IV/PO",
    "aliases": [
      "levofloxacin",
      "tavanic",
      "levo",
      "levaquin"
    ],
    "indications": [
      "Viêm phổi mắc phải cộng đồng",
      "Viêm phổi bệnh viện",
      "Nhiễm khuẩn đường tiết niệu có biến chứng",
      "Viêm tuyến tiền liệt"
    ],
    "indicationsEn": [
      "Community-acquired pneumonia",
      "HAP/VAP",
      "Complicated UTI",
      "Prostatitis"
    ],
    "needsHeight": false,
    "groupEn": "Fluoroquinolone"
  },
  {
    "id": "moxifloxacin",
    "name": "Moxifloxacin",
    "group": "Fluoroquinolone",
    "route": "IV/PO",
    "aliases": [
      "moxifloxacin",
      "avelox",
      "moxi"
    ],
    "indications": [
      "Viêm phổi mắc phải cộng đồng",
      "Đợt cấp COPD",
      "Nhiễm khuẩn xoang cấp",
      "Nhiễm khuẩn da mô mềm (không dùng cho nhiễm khuẩn tiết niệu)"
    ],
    "indicationsEn": [
      "Community-acquired pneumonia",
      "Acute COPD exacerbation",
      "Acute bacterial sinusitis",
      "Complicated SSTI (not for UTI)"
    ],
    "needsHeight": false,
    "groupEn": "Fluoroquinolone"
  },
  {
    "id": "vancomycin",
    "name": "Vancomycin",
    "group": "Glycopeptide",
    "route": "IV",
    "aliases": [
      "vanco",
      "vancomycin",
      "vancocin"
    ],
    "indications": [
      "Nhiễm khuẩn do tụ cầu kháng methicillin (MRSA)",
      "Nhiễm khuẩn huyết",
      "Viêm nội tâm mạc nhiễm khuẩn",
      "Viêm phổi bệnh viện MRSA",
      "Nhiễm trùng xương khớp"
    ],
    "indicationsEn": [
      "MRSA infections",
      "Sepsis",
      "Infective endocarditis",
      "MRSA HAP/VAP",
      "Osteomyelitis/Septic arthritis"
    ],
    "needsHeight": true,
    "groupEn": "Glycopeptide"
  },
  {
    "id": "teicoplanin",
    "name": "Teicoplanin",
    "group": "Glycopeptide",
    "route": "IM/IV",
    "aliases": [
      "teicoplanin",
      "targocid",
      "teico"
    ],
    "indications": [
      "Nhiễm khuẩn do MRSA, Enterococcus",
      "Nhiễm trùng xương khớp",
      "Viêm nội tâm mạc",
      "Nhiễm khuẩn huyết"
    ],
    "indicationsEn": [
      "MRSA and Enterococcal infections",
      "Bone and joint infections",
      "Infective endocarditis",
      "Bacteremia"
    ],
    "needsHeight": false,
    "groupEn": "Glycopeptide"
  },
  {
    "id": "linezolid",
    "name": "Linezolid",
    "group": "Oxazolidinone",
    "route": "IV/PO",
    "aliases": [
      "linezolid",
      "zyvox",
      "zyvoxid"
    ],
    "indications": [
      "Viêm phổi bệnh viện do MRSA/VRE",
      "Nhiễm khuẩn da và mô mềm có biến chứng",
      "Nhiễm khuẩn do Enterococcus kháng vancomycin (VRE)"
    ],
    "indicationsEn": [
      "HAP/VAP due to MRSA/VRE",
      "Complicated SSTI",
      "VRE infections"
    ],
    "needsHeight": false,
    "groupEn": "Oxazolidinone"
  },
  {
    "id": "daptomycin",
    "name": "Daptomycin",
    "group": "Lipopeptide",
    "route": "IV",
    "aliases": [
      "daptomycin",
      "cubicin"
    ],
    "indications": [
      "Nhiễm khuẩn huyết do MRSA",
      "Viêm nội tâm mạc tim phải do S. aureus",
      "Nhiễm khuẩn da và mô mềm nặng (không dùng cho viêm phổi do bị surfactant bất hoạt)"
    ],
    "indicationsEn": [
      "MRSA bacteremia",
      "Right-sided infective endocarditis",
      "Complicated SSTI (contraindicated in pneumonia due to surfactant inactivation)"
    ],
    "needsHeight": false,
    "groupEn": "Lipopeptide"
  },
  {
    "id": "colistin",
    "name": "Colistin",
    "group": "Polymyxin",
    "route": "IV",
    "aliases": [
      "colistin",
      "colistimethate",
      "polymyxin e",
      "colistimethate sodium"
    ],
    "indications": [
      "Nhiễm khuẩn vi khuẩn Gram âm đa kháng MDR/XDR (A. baumannii, P. aeruginosa, CRE)",
      "Viêm phổi thở máy VAP do trực khuẩn đa kháng",
      "Nhiễm khuẩn huyết nặng"
    ],
    "indicationsEn": [
      "MDR/XDR Gram-negative infections (CRAB, CRPA, CRE)",
      "Ventilator-associated pneumonia (VAP)",
      "Severe sepsis"
    ],
    "needsHeight": true,
    "groupEn": "Polymyxin"
  },
  {
    "id": "tigecyclin",
    "name": "Tigecyclin",
    "group": "Glycylcycline",
    "route": "IV",
    "aliases": [
      "tigecyclin",
      "tygacil",
      "tigecycline"
    ],
    "indications": [
      "Nhiễm khuẩn ổ bụng phức tạp do vi khuẩn đa kháng",
      "Nhiễm khuẩn da và mô mềm phức tạp",
      "Acinetobacter baumannii kháng carbapenem (phối hợp liều cao)"
    ],
    "indicationsEn": [
      "Complicated intra-abdominal infections",
      "Complicated SSTI",
      "MDR Acinetobacter baumannii (high-dose combination)"
    ],
    "needsHeight": false,
    "groupEn": "Glycylcycline"
  },
  {
    "id": "metronidazol",
    "name": "Metronidazol",
    "group": "Imidazole",
    "route": "IV/PO",
    "aliases": [
      "metro",
      "metronidazol",
      "flagyl",
      "metronidazole"
    ],
    "indications": [
      "Nhiễm khuẩn do vi khuẩn kỵ khí (B. fragilis)",
      "Nhiễm khuẩn ổ bụng",
      "Áp xe gan amip",
      "Viêm đại tràng do C. difficile"
    ],
    "indicationsEn": [
      "Anaerobic infections (Bacteroides fragilis)",
      "Intra-abdominal abscess",
      "Amebic liver abscess",
      "Clostridioides difficile colitis"
    ],
    "needsHeight": false,
    "groupEn": "Imidazole"
  },
  {
    "id": "clindamycin",
    "name": "Clindamycin",
    "group": "Lincosamide",
    "route": "IV/PO",
    "aliases": [
      "clindamycin",
      "dalacin",
      "dalacin c"
    ],
    "indications": [
      "Nhiễm khuẩn da mô mềm do liên cầu/tụ cầu",
      "Hội chứng sốc nhiễm độc (ức chế độc tố vi khuẩn)",
      "Viêm tủy xương",
      "Nhiễm trùng răng hàm mặt"
    ],
    "indicationsEn": [
      "Skin and soft tissue infections",
      "Toxic shock syndrome (toxin suppression)",
      "Osteomyelitis",
      "Dental infections"
    ],
    "needsHeight": false,
    "groupEn": "Lincosamide"
  },
  {
    "id": "amikacin",
    "name": "Amikacin",
    "group": "Aminoglycoside",
    "route": "IV",
    "aliases": [
      "amikacin",
      "amikin",
      "amikacine"
    ],
    "indications": [
      "Nhiễm khuẩn huyết nặng do trực khuẩn Gram âm",
      "Phối hợp theo kinh nghiệm trong sốc nhiễm khuẩn",
      "Lao đa kháng thuốc (MDR-TB)"
    ],
    "indicationsEn": [
      "Severe Gram-negative sepsis",
      "Empirical synergy in septic shock",
      "MDR-TB"
    ],
    "needsHeight": true,
    "groupEn": "Aminoglycoside"
  },
  {
    "id": "gentamicin",
    "name": "Gentamicin",
    "group": "Aminoglycoside",
    "route": "IV",
    "aliases": [
      "gentamicin",
      "garamycin",
      "gentamycin"
    ],
    "indications": [
      "Nhiễm khuẩn huyết Gram âm",
      "Phối hợp hiệp đồng trong viêm nội tâm mạc Enterococcal / Streptococcal",
      "Nhiễm khuẩn tiết niệu nặng"
    ],
    "indicationsEn": [
      "Gram-negative bacteremia",
      "Synergy in Enterococcal/Streptococcal endocarditis",
      "Severe UTI"
    ],
    "needsHeight": true,
    "groupEn": "Aminoglycoside"
  },
  {
    "id": "aztreonam",
    "name": "Aztreonam",
    "group": "Monobactam",
    "route": "IV",
    "aliases": [
      "aztreonam",
      "azactam"
    ],
    "indications": [
      "Nhiễm khuẩn Gram âm hiếu khí ở bệnh nhân dị ứng nặng với Penicillin/Cephalosporin",
      "Viêm phổi thở máy",
      "Nhiễm khuẩn huyết"
    ],
    "indicationsEn": [
      "Gram-negative aerobic infections in severe beta-lactam/penicillin allergy",
      "HAP/VAP",
      "Sepsis"
    ],
    "needsHeight": false,
    "groupEn": "Monobactam"
  },
  {
    "id": "tmp_smx",
    "name": "TMP/Sulfamethoxazole (Cotrim)",
    "group": "Sulfonamide",
    "route": "IV/PO",
    "aliases": [
      "cotrim",
      "tmp smx",
      "trimethoprim",
      "bactrim",
      "tmp-smx",
      "sulfamethoxazole"
    ],
    "indications": [
      "Viêm phổi do Pneumocystis jirovecii (PCP)",
      "Nhiễm Stenotrophomonas maltophilia",
      "Nhiễm Nocardia",
      "Nhiễm khuẩn tiết niệu",
      "Nhiễm khuẩn do MRSA cộng đồng"
    ],
    "indicationsEn": [
      "Pneumocystis jirovecii pneumonia (PJP/PCP)",
      "Stenotrophomonas maltophilia infections",
      "Nocardiosis",
      "Complicated UTI",
      "Community-acquired MRSA"
    ],
    "needsHeight": true,
    "groupEn": "Sulfonamide (TMP/SMX)"
  },
  {
    "id": "fluconazole",
    "name": "Fluconazole",
    "group": "Azole (Antifungal)",
    "route": "IV/PO",
    "aliases": [
      "fluconazole",
      "diflucan",
      "fluconazol"
    ],
    "indications": [
      "Nhiễm Candida xâm lấn (nhạy cảm)",
      "Viêm màng não do Cryptococcus (giai đoạn củng cố)",
      "Nhiễm nấm Candida niêm mạc",
      "Dự phòng nấm ở bệnh nhân nguy cơ"
    ],
    "indicationsEn": [
      "Invasive candidiasis (susceptible strains)",
      "Cryptococcal meningitis (consolidation)",
      "Mucocutaneous candidiasis",
      "Antifungal prophylaxis"
    ],
    "needsHeight": false,
    "groupEn": "Azole Antifungal"
  },
  {
    "id": "voriconazole",
    "name": "Voriconazole",
    "group": "Azole (Antifungal)",
    "route": "IV/PO",
    "aliases": [
      "voriconazole",
      "vfend",
      "voriconazol"
    ],
    "indications": [
      "Nhiễm Aspergillus xâm lấn (lựa chọn hàng đầu)",
      "Nhiễm Candida kháng fluconazole",
      "Nhiễm nấm Fusarium, Scedosporium"
    ],
    "indicationsEn": [
      "Invasive aspergillosis (first-line)",
      "Fluconazole-resistant candidiasis",
      "Fusarium and Scedosporium infections"
    ],
    "needsHeight": true,
    "groupEn": "Azole Antifungal"
  },
  {
    "id": "caspofungin",
    "name": "Caspofungin",
    "group": "Echinocandin (Antifungal)",
    "route": "IV",
    "aliases": [
      "caspofungin",
      "cancidas"
    ],
    "indications": [
      "Nhiễm Candida huyết và Candida xâm lấn",
      "Điều trị theo kinh nghiệm sốt giảm bạch cầu hạt nghi nhiễm nấm",
      "Aspergillus kháng trị"
    ],
    "indicationsEn": [
      "Candidemia and invasive candidiasis",
      "Empirical antifungal in neutropenic fever",
      "Refractory aspergillosis"
    ],
    "needsHeight": false,
    "groupEn": "Echinocandin Antifungal"
  },
  {
    "id": "micafungin",
    "name": "Micafungin",
    "group": "Echinocandin (Antifungal)",
    "route": "IV",
    "aliases": [
      "micafungin",
      "mycamine"
    ],
    "indications": [
      "Nhiễm Candida huyết và viêm phúc mạc do Candida",
      "Nhiễm nấm Candida thực quản",
      "Dự phòng nhiễm nấm ghép tế bào gốc"
    ],
    "indicationsEn": [
      "Candidemia and Candida peritonitis",
      "Esophageal candidiasis",
      "Prophylaxis in HSCT"
    ],
    "needsHeight": false,
    "groupEn": "Echinocandin Antifungal"
  },
  {
    "id": "anidulafungin",
    "name": "Anidulafungin",
    "group": "Echinocandin (Antifungal)",
    "route": "IV",
    "aliases": [
      "anidulafungin",
      "eraxis"
    ],
    "indications": [
      "Nhiễm nấm Candida xâm lấn / Nhiễm Candida huyết (không cần chỉnh liều theo chức năng thận)"
    ],
    "indicationsEn": [
      "Invasive candidiasis / Candidemia (no renal dose adjustment needed)"
    ],
    "needsHeight": false,
    "groupEn": "Echinocandin Antifungal"
  },
  {
    "id": "fosfomycin",
    "name": "Fosfomycin",
    "group": "Phosphonic acid",
    "route": "IV/PO",
    "aliases": [
      "fosfomycin",
      "fosfocin"
    ],
    "indications": [
      "Viêm bàng quang cấp không biến chứng",
      "Nhiễm khuẩn do vi khuẩn Gram âm đa kháng (CRE, ESBL, MRSA) phối hợp truyền tĩnh mạch"
    ],
    "indicationsEn": [
      "Uncomplicated cystitis",
      "MDR Gram-negative/CRE/MRSA infections (IV combination)"
    ],
    "needsHeight": false,
    "groupEn": "Phosphonic Acid"
  },
  {
    "id": "azithromycin",
    "name": "Azithromycin",
    "group": "Macrolide",
    "route": "IV/PO",
    "aliases": [
      "azithromycin",
      "zithromax",
      "az",
      "zmax"
    ],
    "indications": [
      "Viêm phổi mắc phải cộng đồng không điển hình (Mycoplasma, Chlamydia, Legionella)",
      "Nhiễm Mycobacterium avium complex (MAC)"
    ],
    "indicationsEn": [
      "Atypical community-acquired pneumonia (Legionella, Mycoplasma)",
      "Mycobacterium avium complex (MAC)"
    ],
    "needsHeight": false,
    "groupEn": "Macrolide"
  },
  {
    "id": "tobramycin",
    "name": "Tobramycin",
    "group": "Aminoglycoside",
    "route": "IV",
    "aliases": [
      "tobramycin",
      "tobra",
      "nebcin"
    ],
    "indications": [
      "Nhiễm khuẩn do Pseudomonas aeruginosa nặng",
      "Viêm phổi ở bệnh nhân xơ nang",
      "Nhiễm khuẩn huyết"
    ],
    "indicationsEn": [
      "Severe Pseudomonas aeruginosa infections",
      "Cystic fibrosis pulmonary exacerbations",
      "Sepsis"
    ],
    "needsHeight": true,
    "groupEn": "Aminoglycoside"
  },
  {
    "id": "cefotiam",
    "name": "Cefotiam",
    "group": "Cephalosporin thế hệ 2",
    "route": "IV/IM",
    "aliases": [
      "cefotiam",
      "pansporin",
      "spizef",
      "cefotiam hcl"
    ],
    "indications": [
      "Nhiễm khuẩn bệnh viện",
      "Nhiễm khuẩn huyết",
      "Nhiễm trùng nặng"
    ],
    "indicationsEn": [
      "Hospital-acquired infections",
      "Sepsis",
      "Severe infections"
    ],
    "needsHeight": false,
    "groupEn": "2nd Gen Cephalosporin"
  },
  {
    "id": "amox_clav",
    "name": "Amoxicillin/Clavulanic acid",
    "group": "Beta-lactam/Ức chế BLase",
    "route": "IV/PO",
    "aliases": [
      "amoxicillin clavulanic",
      "augmentin",
      "amox clav",
      "amoxiclav",
      "co-amoxiclav",
      "amoxicilin acid clavulanic",
      "amoxicilin/acid clavulanic"
    ],
    "indications": [
      "Nhiễm khuẩn đường hô hấp trên và dưới",
      "Viêm xoang cấp",
      "Nhiễm khuẩn đường tiết niệu",
      "Nhiễm khuẩn vết cắn động vật / người"
    ],
    "indicationsEn": [
      "Respiratory tract infections",
      "Acute bacterial sinusitis",
      "Urinary tract infections",
      "Animal and human bite wounds"
    ],
    "needsHeight": false,
    "groupEn": "Beta-lactam / BLI"
  },
  {
    "id": "tinidazol",
    "name": "Tinidazol",
    "group": "Nitroimidazol",
    "route": "IV/PO",
    "aliases": [
      "tinidazol",
      "tinidazole",
      "tindazole",
      "fasigyn"
    ],
    "indications": [
      "Nhiễm khuẩn bệnh viện",
      "Nhiễm khuẩn huyết",
      "Nhiễm trùng nặng"
    ],
    "indicationsEn": [
      "Hospital-acquired infections",
      "Sepsis",
      "Severe infections"
    ],
    "needsHeight": false,
    "groupEn": "Nitroimidazole"
  }
];

export const AMR_ORG: string[] = [
  "Acinetobacter baumannii",
  "Escherichia coli",
  "Klebsiella pneumoniae",
  "Pseudomonas aeruginosa",
  "Salmonella spp.",
  "Streptococcus pneumoniae",
  "Enterococcus faecalis",
  "Enterococcus faecium",
  "Enterococcus spp.",
  "Staphylococcus aureus",
  "Staphylococcus aureus (MRSA)",
  "Staphylococcus aureus (MSSA)"
];

export const AMR_SPEC: [string, string][] = [
  [
    "all",
    "Tất cả bệnh phẩm"
  ],
  [
    "blood",
    "Máu"
  ],
  [
    "lower_respiratory",
    "Dịch tiết hô hấp dưới"
  ],
  [
    "urine",
    "Nước tiểu"
  ],
  [
    "intra_abdominal",
    "Dịch ổ bụng"
  ],
  [
    "wound_pus",
    "Mủ vết thương"
  ],
  [
    "stool",
    "Phân"
  ]
];

export const AMR_VAR: string[] = [
  "",
  "viêm màng não · E-test",
  "viêm màng não · Vitek2",
  "không viêm màng não · E-test",
  "không viêm màng não · Vitek2",
  "chỉ chủng từ nước tiểu",
  "gentamicin nồng độ cao"
];

export const AMR_DATA: Record<string, number[][]> = {
  "amikacin": [
    [
      1,
      0,
      94.3,
      12777
    ],
    [
      2,
      0,
      77,
      9271
    ],
    [
      0,
      0,
      24.5,
      7959
    ],
    [
      3,
      0,
      66.7,
      6564
    ],
    [
      1,
      1,
      94.6,
      2012
    ],
    [
      2,
      1,
      80.6,
      1185
    ],
    [
      3,
      1,
      74.7,
      398
    ],
    [
      0,
      1,
      46.1,
      391
    ],
    [
      0,
      2,
      21.8,
      5991
    ],
    [
      2,
      2,
      77.4,
      4012
    ],
    [
      3,
      2,
      67.4,
      3087
    ],
    [
      1,
      2,
      92.3,
      873
    ],
    [
      1,
      3,
      93.8,
      4247
    ],
    [
      2,
      3,
      66,
      1108
    ],
    [
      3,
      3,
      40.4,
      826
    ],
    [
      0,
      3,
      47.9,
      260
    ],
    [
      1,
      4,
      96.4,
      1942
    ],
    [
      2,
      4,
      84.4,
      589
    ],
    [
      3,
      4,
      89.9,
      341
    ],
    [
      0,
      4,
      28.6,
      61
    ],
    [
      1,
      5,
      93.9,
      823
    ],
    [
      2,
      5,
      72.7,
      605
    ],
    [
      3,
      5,
      70.3,
      558
    ],
    [
      0,
      5,
      35.3,
      427
    ]
  ],
  "ampicillin_sulbactam": [
    [
      0,
      0,
      15.8,
      7959
    ],
    [
      0,
      1,
      40.5,
      391
    ],
    [
      0,
      2,
      12.2,
      5991
    ],
    [
      0,
      3,
      41.7,
      260
    ],
    [
      0,
      4,
      8.7,
      61
    ],
    [
      0,
      5,
      23.9,
      427
    ]
  ],
  "aztreonam": [
    [
      3,
      0,
      46.4,
      6564
    ],
    [
      3,
      1,
      55.7,
      398
    ],
    [
      3,
      2,
      47.9,
      3087
    ],
    [
      3,
      3,
      27.1,
      826
    ],
    [
      3,
      4,
      55.2,
      341
    ],
    [
      3,
      5,
      46.4,
      558
    ]
  ],
  "cefepim": [
    [
      1,
      0,
      52.8,
      12777
    ],
    [
      2,
      0,
      46.2,
      9271
    ],
    [
      0,
      0,
      10.6,
      7959
    ],
    [
      3,
      0,
      64.8,
      6564
    ],
    [
      1,
      1,
      55.6,
      2012
    ],
    [
      2,
      1,
      54.6,
      1185
    ],
    [
      3,
      1,
      78.1,
      398
    ],
    [
      0,
      1,
      30.8,
      391
    ],
    [
      0,
      2,
      8.1,
      5991
    ],
    [
      2,
      2,
      38.8,
      4012
    ],
    [
      3,
      2,
      66.2,
      3087
    ],
    [
      1,
      2,
      41.4,
      873
    ],
    [
      1,
      3,
      52.5,
      4247
    ],
    [
      2,
      3,
      37.1,
      1108
    ],
    [
      3,
      3,
      39.3,
      826
    ],
    [
      0,
      3,
      28.4,
      260
    ],
    [
      1,
      4,
      62.4,
      1942
    ],
    [
      2,
      4,
      67.9,
      589
    ],
    [
      3,
      4,
      84.4,
      341
    ],
    [
      0,
      4,
      26.8,
      61
    ],
    [
      1,
      5,
      49.5,
      823
    ],
    [
      2,
      5,
      54.6,
      605
    ],
    [
      3,
      5,
      64.5,
      558
    ],
    [
      0,
      5,
      11,
      427
    ]
  ],
  "cefotaxim": [
    [
      4,
      1,
      93.5,
      129
    ],
    [
      4,
      6,
      60,
      125
    ]
  ],
  "ceftazidim": [
    [
      1,
      0,
      52.5,
      12777
    ],
    [
      2,
      0,
      41.2,
      9271
    ],
    [
      0,
      0,
      10.3,
      7959
    ],
    [
      3,
      0,
      60.5,
      6564
    ],
    [
      1,
      1,
      56.5,
      2012
    ],
    [
      2,
      1,
      48.9,
      1185
    ],
    [
      3,
      1,
      70.4,
      398
    ],
    [
      0,
      1,
      28.9,
      391
    ],
    [
      0,
      2,
      8.4,
      5991
    ],
    [
      2,
      2,
      35.8,
      4012
    ],
    [
      3,
      2,
      62.5,
      3087
    ],
    [
      1,
      2,
      39.8,
      873
    ],
    [
      1,
      3,
      49.3,
      4247
    ],
    [
      2,
      3,
      29.9,
      1108
    ],
    [
      3,
      3,
      34,
      826
    ],
    [
      0,
      3,
      27.6,
      260
    ],
    [
      1,
      4,
      63.5,
      1942
    ],
    [
      2,
      4,
      59.9,
      589
    ],
    [
      3,
      4,
      72.6,
      341
    ],
    [
      0,
      4,
      19.7,
      61
    ],
    [
      1,
      5,
      47.9,
      823
    ],
    [
      2,
      5,
      33.7,
      605
    ],
    [
      3,
      5,
      63.3,
      558
    ],
    [
      0,
      5,
      9.5,
      427
    ]
  ],
  "ceftriaxon": [
    [
      1,
      0,
      32.1,
      12777
    ],
    [
      2,
      0,
      36.1,
      9271
    ],
    [
      5,
      0,
      58.4,
      2331,
      1
    ],
    [
      5,
      0,
      18,
      2331,
      2
    ],
    [
      5,
      0,
      92.1,
      2331,
      3
    ],
    [
      5,
      0,
      44.7,
      2331,
      4
    ],
    [
      1,
      1,
      31.1,
      2012
    ],
    [
      2,
      1,
      43.9,
      1185
    ],
    [
      4,
      1,
      96.5,
      129
    ],
    [
      2,
      2,
      29.8,
      4012
    ],
    [
      1,
      2,
      20.2,
      873
    ],
    [
      1,
      3,
      30.5,
      4247
    ],
    [
      2,
      3,
      25.5,
      1108
    ],
    [
      1,
      4,
      41.5,
      1942
    ],
    [
      2,
      4,
      53.9,
      589
    ],
    [
      1,
      5,
      25.9,
      823
    ],
    [
      2,
      5,
      28.3,
      605
    ],
    [
      4,
      6,
      87.1,
      125
    ]
  ],
  "ciprofloxacin": [
    [
      1,
      0,
      24.5,
      12777
    ],
    [
      2,
      0,
      28.3,
      9271
    ],
    [
      0,
      0,
      10.8,
      7959
    ],
    [
      3,
      0,
      48.2,
      6564
    ],
    [
      1,
      1,
      26.3,
      2012
    ],
    [
      2,
      1,
      37.4,
      1185
    ],
    [
      3,
      1,
      69.1,
      398
    ],
    [
      0,
      1,
      34.6,
      391
    ],
    [
      4,
      1,
      48.4,
      129
    ],
    [
      0,
      2,
      8.5,
      5991
    ],
    [
      2,
      2,
      23.7,
      4012
    ],
    [
      3,
      2,
      46.8,
      3087
    ],
    [
      1,
      2,
      17.7,
      873
    ],
    [
      1,
      3,
      21.5,
      4247
    ],
    [
      8,
      3,
      32.3,
      2951,
      5
    ],
    [
      6,
      3,
      53.9,
      1469,
      5
    ],
    [
      7,
      3,
      4.5,
      1157,
      5
    ],
    [
      2,
      3,
      17.3,
      1108
    ],
    [
      3,
      3,
      24.1,
      826
    ],
    [
      0,
      3,
      28.3,
      260
    ],
    [
      1,
      4,
      32.2,
      1942
    ],
    [
      2,
      4,
      44.3,
      589
    ],
    [
      3,
      4,
      66.9,
      341
    ],
    [
      0,
      4,
      25,
      61
    ],
    [
      1,
      5,
      20.5,
      823
    ],
    [
      2,
      5,
      18.6,
      605
    ],
    [
      3,
      5,
      53.6,
      558
    ],
    [
      0,
      5,
      9.1,
      427
    ],
    [
      4,
      6,
      56.1,
      125
    ]
  ],
  "clindamycin": [
    [
      9,
      0,
      20.9,
      9784
    ],
    [
      10,
      0,
      11.1,
      7272
    ],
    [
      5,
      0,
      6,
      2331
    ],
    [
      11,
      0,
      56.4,
      2052
    ]
  ],
  "ertapenem": [
    [
      1,
      0,
      91.3,
      12777
    ],
    [
      2,
      0,
      52.2,
      9271
    ],
    [
      1,
      1,
      92.7,
      2012
    ],
    [
      2,
      1,
      58.4,
      1185
    ],
    [
      2,
      2,
      45.2,
      4012
    ],
    [
      1,
      2,
      81.5,
      873
    ],
    [
      1,
      3,
      92,
      4247
    ],
    [
      2,
      3,
      46.8,
      1108
    ],
    [
      1,
      4,
      94.5,
      1942
    ],
    [
      2,
      4,
      72.4,
      589
    ],
    [
      1,
      5,
      86.2,
      823
    ],
    [
      2,
      5,
      48.2,
      605
    ]
  ],
  "fosfomycin": [
    [
      1,
      0,
      94.8,
      12777
    ],
    [
      2,
      0,
      78.7,
      9271
    ],
    [
      1,
      1,
      96.4,
      2012
    ],
    [
      2,
      1,
      84.8,
      1185
    ],
    [
      2,
      2,
      76.8,
      4012
    ],
    [
      1,
      2,
      93.4,
      873
    ],
    [
      1,
      3,
      94.8,
      4247
    ],
    [
      8,
      3,
      69.3,
      2951,
      5
    ],
    [
      6,
      3,
      84.2,
      1469,
      5
    ],
    [
      7,
      3,
      48,
      1157,
      5
    ],
    [
      2,
      3,
      75.5,
      1108
    ],
    [
      1,
      4,
      96.9,
      1942
    ],
    [
      2,
      4,
      79.1,
      589
    ],
    [
      1,
      5,
      88.9,
      823
    ],
    [
      2,
      5,
      83.3,
      605
    ]
  ],
  "gentamicin": [
    [
      1,
      0,
      60.1,
      12777
    ],
    [
      9,
      0,
      58.5,
      9784
    ],
    [
      2,
      0,
      58,
      9271
    ],
    [
      0,
      0,
      17.5,
      7959
    ],
    [
      10,
      0,
      57.9,
      7272
    ],
    [
      3,
      0,
      56.1,
      6564
    ],
    [
      8,
      0,
      76.3,
      2951,
      6
    ],
    [
      11,
      0,
      61.1,
      2052
    ],
    [
      6,
      0,
      79.2,
      1469,
      6
    ],
    [
      7,
      0,
      70.8,
      1157,
      6
    ],
    [
      1,
      1,
      60.4,
      2012
    ],
    [
      2,
      1,
      62.8,
      1185
    ],
    [
      3,
      1,
      57.7,
      398
    ],
    [
      0,
      1,
      36.5,
      391
    ],
    [
      0,
      2,
      15.3,
      5991
    ],
    [
      2,
      2,
      55.6,
      4012
    ],
    [
      3,
      2,
      55.7,
      3087
    ],
    [
      1,
      2,
      51.1,
      873
    ],
    [
      1,
      3,
      59.5,
      4247
    ],
    [
      2,
      3,
      45.4,
      1108
    ],
    [
      3,
      3,
      31.1,
      826
    ],
    [
      0,
      3,
      35.7,
      260
    ],
    [
      1,
      4,
      68.3,
      1942
    ],
    [
      2,
      4,
      75.1,
      589
    ],
    [
      3,
      4,
      82.9,
      341
    ],
    [
      0,
      4,
      25,
      61
    ],
    [
      1,
      5,
      55.3,
      823
    ],
    [
      2,
      5,
      50.6,
      605
    ],
    [
      3,
      5,
      61,
      558
    ],
    [
      0,
      5,
      19.4,
      427
    ]
  ],
  "imipenem": [
    [
      1,
      0,
      93.1,
      12777
    ],
    [
      2,
      0,
      53.9,
      9271
    ],
    [
      0,
      0,
      12.7,
      7959
    ],
    [
      3,
      0,
      55.9,
      6564
    ],
    [
      1,
      1,
      93.9,
      2012
    ],
    [
      2,
      1,
      57.8,
      1185
    ],
    [
      3,
      1,
      57.9,
      398
    ],
    [
      0,
      1,
      38.5,
      391
    ],
    [
      4,
      1,
      97.8,
      129
    ],
    [
      0,
      2,
      9.6,
      5991
    ],
    [
      2,
      2,
      47.3,
      4012
    ],
    [
      3,
      2,
      53.4,
      3087
    ],
    [
      1,
      2,
      84.7,
      873
    ],
    [
      1,
      3,
      93.5,
      4247
    ],
    [
      2,
      3,
      48.4,
      1108
    ],
    [
      3,
      3,
      35,
      826
    ],
    [
      0,
      3,
      36,
      260
    ],
    [
      1,
      4,
      96.5,
      1942
    ],
    [
      2,
      4,
      74.6,
      589
    ],
    [
      3,
      4,
      76.5,
      341
    ],
    [
      0,
      4,
      19.6,
      61
    ],
    [
      1,
      5,
      88.4,
      823
    ],
    [
      2,
      5,
      51.4,
      605
    ],
    [
      3,
      5,
      60.3,
      558
    ],
    [
      0,
      5,
      15.6,
      427
    ]
  ],
  "levofloxacin": [
    [
      1,
      0,
      25.6,
      12777
    ],
    [
      2,
      0,
      32.8,
      9271
    ],
    [
      0,
      0,
      12.4,
      7959
    ],
    [
      3,
      0,
      48.3,
      6564
    ],
    [
      5,
      0,
      97.7,
      2331
    ],
    [
      1,
      1,
      27.2,
      2012
    ],
    [
      2,
      1,
      40.2,
      1185
    ],
    [
      3,
      1,
      77.3,
      398
    ],
    [
      0,
      1,
      40.5,
      391
    ],
    [
      0,
      2,
      9.8,
      5991
    ],
    [
      2,
      2,
      28.6,
      4012
    ],
    [
      3,
      2,
      45.4,
      3087
    ],
    [
      1,
      2,
      18.8,
      873
    ],
    [
      1,
      3,
      21.5,
      4247
    ],
    [
      8,
      3,
      45.5,
      2951,
      5
    ],
    [
      6,
      3,
      61,
      1469,
      5
    ],
    [
      7,
      3,
      10.3,
      1157,
      5
    ],
    [
      2,
      3,
      19.3,
      1108
    ],
    [
      3,
      3,
      22.8,
      826
    ],
    [
      0,
      3,
      30.2,
      260
    ],
    [
      1,
      4,
      32.1,
      1942
    ],
    [
      2,
      4,
      44.7,
      589
    ],
    [
      3,
      4,
      77.1,
      341
    ],
    [
      0,
      4,
      27.7,
      61
    ],
    [
      1,
      5,
      24.5,
      823
    ],
    [
      2,
      5,
      25.8,
      605
    ],
    [
      3,
      5,
      52.1,
      558
    ],
    [
      0,
      5,
      11.1,
      427
    ]
  ],
  "linezolid": [
    [
      9,
      0,
      100,
      9784
    ],
    [
      10,
      0,
      100,
      7272
    ],
    [
      8,
      0,
      89.7,
      2951
    ],
    [
      11,
      0,
      100,
      2052
    ],
    [
      6,
      0,
      85.7,
      1469
    ],
    [
      7,
      0,
      94.7,
      1157
    ]
  ],
  "meropenem": [
    [
      1,
      0,
      93.7,
      12777
    ],
    [
      2,
      0,
      54,
      9271
    ],
    [
      0,
      0,
      12.2,
      7959
    ],
    [
      3,
      0,
      56.1,
      6564
    ],
    [
      1,
      1,
      94.2,
      2012
    ],
    [
      2,
      1,
      57.8,
      1185
    ],
    [
      3,
      1,
      73.3,
      398
    ],
    [
      0,
      1,
      35.3,
      391
    ],
    [
      4,
      1,
      97.6,
      129
    ],
    [
      0,
      2,
      9.2,
      5991
    ],
    [
      2,
      2,
      46.7,
      4012
    ],
    [
      3,
      2,
      53.3,
      3087
    ],
    [
      1,
      2,
      86.1,
      873
    ],
    [
      1,
      3,
      94.3,
      4247
    ],
    [
      2,
      3,
      48.8,
      1108
    ],
    [
      3,
      3,
      33.3,
      826
    ],
    [
      0,
      3,
      34.4,
      260
    ],
    [
      1,
      4,
      96.5,
      1942
    ],
    [
      2,
      4,
      73.3,
      589
    ],
    [
      3,
      4,
      76.2,
      341
    ],
    [
      0,
      4,
      23.2,
      61
    ],
    [
      1,
      5,
      88.7,
      823
    ],
    [
      2,
      5,
      51.2,
      605
    ],
    [
      3,
      5,
      59.5,
      558
    ],
    [
      0,
      5,
      15.5,
      427
    ]
  ],
  "piperacillin_tazo": [
    [
      1,
      0,
      81.7,
      12777
    ],
    [
      2,
      0,
      46.2,
      9271
    ],
    [
      0,
      0,
      11,
      7959
    ],
    [
      3,
      0,
      60.6,
      6564
    ],
    [
      1,
      1,
      85.5,
      2012
    ],
    [
      2,
      1,
      56.5,
      1185
    ],
    [
      3,
      1,
      73.3,
      398
    ],
    [
      0,
      1,
      33.9,
      391
    ],
    [
      0,
      2,
      8.3,
      5991
    ],
    [
      2,
      2,
      39.1,
      4012
    ],
    [
      3,
      2,
      62.2,
      3087
    ],
    [
      1,
      2,
      71.3,
      873
    ],
    [
      1,
      3,
      80.3,
      4247
    ],
    [
      2,
      3,
      36.6,
      1108
    ],
    [
      3,
      3,
      34.6,
      826
    ],
    [
      0,
      3,
      33.3,
      260
    ],
    [
      1,
      4,
      85.3,
      1942
    ],
    [
      2,
      4,
      64.4,
      589
    ],
    [
      3,
      4,
      78.6,
      341
    ],
    [
      0,
      4,
      21.8,
      61
    ],
    [
      1,
      5,
      77.3,
      823
    ],
    [
      2,
      5,
      41.2,
      605
    ],
    [
      3,
      5,
      61.1,
      558
    ],
    [
      0,
      5,
      11,
      427
    ]
  ],
  "tmp_smx": [
    [
      1,
      0,
      28.8,
      12777
    ],
    [
      9,
      0,
      77.4,
      9784
    ],
    [
      2,
      0,
      46.9,
      9271
    ],
    [
      0,
      0,
      36,
      7959
    ],
    [
      10,
      0,
      75.4,
      7272
    ],
    [
      5,
      0,
      17.9,
      2331
    ],
    [
      11,
      0,
      82,
      2052
    ],
    [
      1,
      1,
      32.5,
      2012
    ],
    [
      2,
      1,
      50.9,
      1185
    ],
    [
      0,
      1,
      41.9,
      391
    ],
    [
      4,
      1,
      79.7,
      129
    ],
    [
      0,
      2,
      35,
      5991
    ],
    [
      2,
      2,
      44.3,
      4012
    ],
    [
      1,
      2,
      28.9,
      873
    ],
    [
      1,
      3,
      27.7,
      4247
    ],
    [
      2,
      3,
      34.7,
      1108
    ],
    [
      0,
      3,
      44.3,
      260
    ],
    [
      1,
      4,
      28.9,
      1942
    ],
    [
      2,
      4,
      61,
      589
    ],
    [
      0,
      4,
      49.1,
      61
    ],
    [
      1,
      5,
      26.2,
      823
    ],
    [
      2,
      5,
      40.8,
      605
    ],
    [
      0,
      5,
      39.3,
      427
    ],
    [
      4,
      6,
      71.1,
      125
    ]
  ],
  "vancomycin": [
    [
      9,
      0,
      100,
      9784
    ],
    [
      10,
      0,
      100,
      7272
    ],
    [
      8,
      0,
      84.2,
      2951
    ],
    [
      5,
      0,
      100,
      2331
    ],
    [
      11,
      0,
      100,
      2052
    ],
    [
      6,
      0,
      96.3,
      1469
    ],
    [
      7,
      0,
      73.8,
      1157
    ]
  ]
};

export const COMMON_INDICATIONS = [
  { id: "all", vi: "Tất cả chỉ định", en: "All Indications" },
  { id: "sepsis", vi: "Nhiễm khuẩn huyết / Sepsis", en: "Sepsis / Septic Shock" },
  { id: "hap_vap", vi: "Viêm phổi bệnh viện (HAP/VAP)", en: "Hospital-Acquired Pneumonia (HAP/VAP)" },
  { id: "cap", vi: "Viêm phổi cộng đồng (CAP)", en: "Community-Acquired Pneumonia (CAP)" },
  { id: "meningitis", vi: "Viêm màng não mủ", en: "Bacterial Meningitis" },
  { id: "iai", vi: "Nhiễm khuẩn ổ bụng (cIAI)", en: "Intra-abdominal Infections" },
  { id: "uti", vi: "Nhiễm khuẩn tiết niệu / Thận", en: "Urinary Tract Infections (UTI)" },
  { id: "mrsa", vi: "Nhiễm tụ cầu vàng kháng (MRSA)", en: "MRSA Infections" },
  { id: "mdr_gn", vi: "Trực khuẩn Gram âm đa kháng (MDR/XDR)", en: "MDR Gram-Negative (CRAB/CRPA/CRE)" },
  { id: "fungal", vi: "Nhiễm nấm xâm lấn (Candida/Aspergillus)", en: "Invasive Fungal Infections" }
];

export const ANTIBIOTIC_GROUPS = [
  { id: "all", vi: "Tất cả nhóm thuốc", en: "All Classes" },
  { id: "carbapenem", vi: "Carbapenem", en: "Carbapenems" },
  { id: "cephalosporin", vi: "Cephalosporin (Gen 1-4 & mới)", en: "Cephalosporins" },
  { id: "penicillin_bli", vi: "Beta-lactam + Ức chế Beta-lactamase", en: "Penicillins + BLI" },
  { id: "quinolone", vi: "Fluoroquinolone", en: "Fluoroquinolones" },
  { id: "glycopeptide", vi: "Glycopeptide (Vancomycin, Teico)", en: "Glycopeptides" },
  { id: "polymyxin", vi: "Polymyxin (Colistin)", en: "Polymyxins" },
  { id: "aminoglycoside", vi: "Aminoglycoside (Amikacin, Genta)", en: "Aminoglycosides" },
  { id: "oxazolidinone", vi: "Oxazolidinone (Linezolid)", en: "Oxazolidinones" },
  { id: "antifungal", vi: "Kháng nấm (Azole, Echinocandin)", en: "Antifungals" }
];
