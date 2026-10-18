import { DrugInteraction } from '../types';

export const DRUG_INTERACTIONS: DrugInteraction[] = [
  // 1. Carbapenems + Valproic Acid
  {
    id: 'carbapenem-valproate',
    antibioticIds: ['meropenem', 'imipenem', 'ertapenem', 'doripenem'],
    interactingDrugVi: 'Acid Valproic / Natri Valproat (Depakine)',
    interactingDrugEn: 'Valproic acid / Sodium valproate (Depakine)',
    interactingGroupVi: 'Thuốc chống động kinh',
    interactingGroupEn: 'Antiepileptic drugs',
    severity: 'major',
    clinicalEffectVi: 'Giảm 60-100% nồng độ valproat trong máu trong vòng 24 giờ, gây tái phát cơn co giật kháng trị hoặc trạng thái động kinh đe dọa tính mạng.',
    clinicalEffectEn: 'Drastic 60-100% reduction in serum valproate concentration within 24h, triggering breakthrough refractory seizures or status epilepticus.',
    mechanismVi: 'Carbapenem ức chế enzym acylpeptide hydrolase và ức chế thủy phân valproate glucuronide, đồng thời tăng đào thải glucuronid hóa.',
    mechanismEn: 'Carbapenems inhibit acylpeptide hydrolase and prevent glucuronide hydrolysis back to free valproate, drastically increasing clearance.',
    managementVi: 'CHỐNG CHỈ ĐỊNH PHỐI HỢP. Tránh phối hợp đồng thời. Nếu bắt buộc dùng carbapenem, phải chủ động chuyển sang thuốc chống động kinh khác (levetiracetam, lacosamide). Tăng liều valproate không có hiệu quả bù trừ.',
    managementEn: 'CONTRAINDICATED / AVOID COMBINATION. If carbapenem is mandatory, switch to alternative anticonvulsants (levetiracetam, lacosamide). Increasing valproate dose is ineffective.',
    referenceSource: 'UpToDate / FDA Safety Alert / Stanford SHC Guide'
  },

  // 2. Vancomycin + Piperacillin/Tazobactam
  {
    id: 'vanco-piptazo-aki',
    antibioticIds: ['vancomycin', 'piperacillin_tazo'],
    interactingDrugVi: 'Vancomycin + Piperacillin/Tazobactam (Phối hợp)',
    interactingDrugEn: 'Vancomycin + Piperacillin/Tazobactam co-administration',
    interactingGroupVi: 'Kháng sinh phổ rộng phối hợp',
    interactingGroupEn: 'Broad-spectrum antimicrobial combination',
    severity: 'major',
    clinicalEffectVi: 'Tăng nguy cơ tổn thương thận cấp (AKI) lên gấp 2-4 lần (tỷ lệ AKI lên tới 25-35% so với Vancomycin đơn thuần hoặc phối hợp Cefepime/Meropenem).',
    clinicalEffectEn: 'Synergistic nephrotoxicity increasing acute kidney injury (AKI) incidence 2 to 4-fold (25-35% vs Vancomycin + Cefepime/Meropenem).',
    mechanismVi: 'Tác động độc tế bào ống thận hiệp đồng và tăng viêm mô kẽ thận.',
    mechanismEn: 'Synergistic tubular cytotoxicity, oxidative stress, and acute interstitial nephritis.',
    managementVi: 'Theo dõi sát creatinine huyết thanh hàng ngày. Cân nhắc thay thế Piperacillin/Tazobactam bằng Cefepime hoặc Meropenem nếu bệnh nhân có nguy cơ suy thận cao hoặc cần dùng Vancomycin kéo dài > 48-72 giờ.',
    managementEn: 'Monitor serum creatinine and urine output daily. Consider alternative antipseudomonal agents (Cefepime or Meropenem) if prolonged vancomycin is required or patient has high baseline renal risk.',
    referenceSource: 'IDSA 2020 Guidelines / Clin Infect Dis 2018'
  },

  // 3. Aminoglycosides + Vancomycin / Loop Diuretics
  {
    id: 'aminoglycoside-nephrotox',
    antibioticIds: ['amikacin', 'gentamicin', 'tobramycin'],
    interactingDrugVi: 'Vancomycin / Furosemide (Lợi tiểu quai) / Thuốc cản quang',
    interactingDrugEn: 'Vancomycin / Furosemide (Loop diuretics) / Radiocontrast',
    interactingGroupVi: 'Thuốc gây độc thận & tai',
    interactingGroupEn: 'Nephrotoxic & ototoxic agents',
    severity: 'major',
    clinicalEffectVi: 'Độc tính hiệp đồng nặng nề trên tế bào ống thận và tế bào lông ốc tai, nguy cơ hoại tử ống thận cấp và điếc không hồi phục.',
    clinicalEffectEn: 'Synergistic tubular necrosis and cochlear/vestibular hair cell toxicity; risk of permanent sensorineural hearing loss and acute renal failure.',
    mechanismVi: 'Tích tụ aminoglycoside trong tế bào biểu mô ống lượn gần và nội dịch tai trong bị khuếch đại khi có mặt furosemide hoặc vancomycin.',
    mechanismEn: 'Enhanced aminoglycoside accumulation and cellular uptake in renal proximal tubules and inner ear hair cells.',
    managementVi: 'Hạn chế phối hợp. Nếu bắt buộc phối hợp, cần theo dõi TDM nồng độ đáy (trough level), bù đủ dịch, theo dõi thính lực và creatinine 24-48 giờ/lần.',
    managementEn: 'Avoid concurrent use if possible. If required, maintain optimal hydration, perform TDM (trough level monitoring), and check renal/audiological function closely.',
    referenceSource: 'Sanford Guide 2024 / UCSF IDMP'
  },

  // 4. Colistin + Other Nephrotoxic drugs
  {
    id: 'colistin-nephrotoxic',
    antibioticIds: ['colistin'],
    interactingDrugVi: 'Aminoglycoside / Amphotericin B / NSAIDs / Thuốc cản quang / ACEi',
    interactingDrugEn: 'Aminoglycosides / Amphotericin B / NSAIDs / Iodinated Contrast / ACEi',
    interactingGroupVi: 'Thuốc độc thận cao',
    interactingGroupEn: 'High-risk nephrotoxic drugs',
    severity: 'major',
    clinicalEffectVi: 'Tăng vọt tỷ lệ suy thận cấp hoại tử ống thận (tới 40-50%). Colistin là thuốc có chỉ số điều trị rất hẹp.',
    clinicalEffectEn: 'Substantial surge in acute tubular necrosis rates (up to 40-50%). Colistin has a narrow therapeutic index.',
    mechanismVi: 'Tổn thương màng tế bào ống thận do cấu trúc cation peptide hoạt động bề mặt.',
    mechanismEn: 'Cationic detergent-like membrane lysis in renal tubular cells.',
    managementVi: 'Ngừng ngay các thuốc độc thận không thiết yếu (đặc biệt NSAID, thuốc cản quang). Đảm bảo đủ thể tích tuần hoàn trước và trong suốt đợt dùng Colistin. Đánh giá chức năng thận hàng ngày để chỉnh liều kịp thời.',
    managementEn: 'Discontinue unnecessary nephrotoxins (especially NSAIDs). Ensure euvolemia. Monitor daily CrCl and adjust colistin maintenance doses immediately.',
    referenceSource: 'Consensus Guidelines on Polymyxins 2019'
  },

  // 5. Fluoroquinolones + QTc prolonging drugs
  {
    id: 'quinolone-qtc',
    antibioticIds: ['ciprofloxacin', 'levofloxacin', 'moxifloxacin'],
    interactingDrugVi: 'Amiodarone / Sotalol / Haloperidol / Ondansetron / Macrolides',
    interactingDrugEn: 'Amiodarone / Sotalol / Haloperidol / Ondansetron / Macrolides',
    interactingGroupVi: 'Thuốc kéo dài khoảng QT',
    interactingGroupEn: 'QTc prolonging medications',
    severity: 'major',
    clinicalEffectVi: 'Kéo dài khoảng QT hiệp đồng, tăng nguy cơ loạn nhịp thất xoắn đỉnh (Torsades de pointes) đe dọa tính mạng và ngừng tim.',
    clinicalEffectEn: 'Additive QTc prolongation resulting in elevated risk of fatal Torsades de pointes and ventricular fibrillation.',
    mechanismVi: 'Chẹn kênh kali IKr (hERG channel) làm chậm quá trình tái cực cơ tim.',
    mechanismEn: 'Blockade of the delayed rectifier cardiac potassium channel (IKr/hERG).',
    managementVi: 'Tránh phối hợp ở bệnh nhân có tiền sử QT dài (QTc > 470ms ở nam, > 480ms ở nữ), hạ kali/magie máu, hoặc đang dùng thuốc chống loạn nhịp nhóm IA/III. Moxifloxacin có nguy cơ cao nhất trong nhóm FQ.',
    managementEn: 'Avoid concurrent use in patients with prolonged baseline QTc (>470ms in men, >480ms in women), hypokalemia/hypomagnesemia. Moxifloxacin carries the highest risk among FQs.',
    referenceSource: 'CredibleMeds / AHA Safety Advisory'
  },

  // 6. Fluoroquinolones + Multivalent Cations (Antacids, Iron, Calcium)
  {
    id: 'quinolone-cations',
    antibioticIds: ['ciprofloxacin', 'levofloxacin', 'moxifloxacin'],
    interactingDrugVi: 'Antacid (Al3+, Mg2+) / Thuốc bổ sung Sắt, Canxi, Kẽm / Sucralfate',
    interactingDrugEn: 'Antacids (Al, Mg) / Oral Iron, Calcium, Zinc supplements / Sucralfate',
    interactingGroupVi: 'Cation đa hóa trị đường uống',
    interactingGroupEn: 'Multivalent cations / Chelation agents',
    severity: 'moderate',
    clinicalEffectVi: 'Giảm 50% đến 90% sinh khả dụng đường uống của Quinolone, dẫn đến thất bại điều trị và nguy cơ phát sinh vi khuẩn kháng thuốc.',
    clinicalEffectEn: '50-90% reduction in oral fluoroquinolone bioavailability due to chelation, causing clinical failure and emergence of resistance.',
    mechanismVi: 'Tạo phức chelat không tan và không thể hấp thu qua niêm mạc ruột.',
    mechanismEn: 'Formation of insoluble, non-absorbable chelate complexes in the gastrointestinal tract.',
    managementVi: 'Dùng Quinolone ít nhất 2 giờ trước hoặc 4 đến 6 giờ sau khi uống thuốc chứa cation đa hóa trị. Hoặc chuyển sang đường truyền tĩnh mạch.',
    managementEn: 'Administer oral quinolone at least 2 hours before or 4-6 hours after antacids/cation supplements, or switch to IV formulation.',
    referenceSource: 'Lexicomp / DailyMed Package Inserts'
  },

  // 7. Ciprofloxacin + Theophylline
  {
    id: 'cipro-theophylline',
    antibioticIds: ['ciprofloxacin'],
    interactingDrugVi: 'Theophylline / Aminophylline',
    interactingDrugEn: 'Theophylline / Aminophylline',
    interactingGroupVi: 'Thuốc giãn phế quản Methylxanthine',
    interactingGroupEn: 'Methylxanthine bronchodilators',
    severity: 'major',
    clinicalEffectVi: 'Tăng 100-200% nồng độ theophylline trong máu, gây độc tính cấp: loạn nhịp tim ác tính, co giật, nôn mửa nặng.',
    clinicalEffectEn: '100-200% surge in theophylline concentrations leading to toxicity: malignant arrhythmias, intractable seizures, severe nausea.',
    mechanismVi: 'Ciprofloxacin ức chế mạnh isoenzym CYP1A2, enzym chịu trách nhiệm chính chuyển hóa theophylline.',
    mechanismEn: 'Potent inhibition of hepatic CYP1A2-mediated theophylline clearance by ciprofloxacin.',
    managementVi: 'Tránh phối hợp nếu có thể. Nếu bắt buộc phối hợp, giảm 50% liều theophylline và theo dõi nồng độ theophylline huyết thanh. Hoặc dùng Levofloxacin thay thế (ít ức chế CYP1A2 hơn).',
    managementEn: 'Avoid combination. If unavoidable, reduce theophylline dose by 50% and monitor serum levels closely. Levofloxacin is a safer alternative with minimal CYP1A2 inhibition.',
    referenceSource: 'Chest Guidelines / FDA Label'
  },

  // 8. Linezolid + SSRIs / SNRIs / MAOIs
  {
    id: 'linezolid-serotonin',
    antibioticIds: ['linezolid'],
    interactingDrugVi: 'SSRI (Sertraline, Fluoxetine, Escitalopram) / SNRI / Tramadol / Fentanyl',
    interactingDrugEn: 'SSRIs (Sertraline, Fluoxetine, Escitalopram) / SNRIs / Tramadol / Fentanyl',
    interactingGroupVi: 'Thuốc tăng Serotonin',
    interactingGroupEn: 'Serotonergic agents',
    severity: 'major',
    clinicalEffectVi: 'Hội chứng Serotonin cấp đe dọa tính mạng: sốt cao ác tính, co giật, run cơ, kích động, mất ổn định thần kinh tự chủ.',
    clinicalEffectEn: 'Life-threatening Serotonin Syndrome: hyperthermia, myoclonus, tremors, autonomic instability, delirium, seizures.',
    mechanismVi: 'Linezolid là chất ức chế enzym Monoamine Oxidase A không chọn lọc, có hồi phục (MAOI), ngăn chặn dị hóa serotonin.',
    mechanismEn: 'Linezolid is a reversible, non-selective Monoamine Oxidase (MAO-A) inhibitor, blocking serotonin degradation.',
    managementVi: 'CHỐNG CHỈ ĐỊNH tương đối. Nếu bắt buộc dùng Linezolid, phải ngừng thuốc hướng thần kinh serotonin trước ít nhất 2 tuần (5 tuần với Fluoxetine) hoặc chọn thuốc kháng MRSA thay thế (Vancomycin, Daptomycin, Teicoplanin).',
    managementEn: 'Relative CONTRAINDICATION. If linezolid is required, taper/stop serotonergic antidepressants or choose alternative MRSA therapy (Vancomycin, Daptomycin, Teicoplanin).',
    referenceSource: 'FDA Drug Safety Communication / NEJM 2007'
  },

  // 9. Daptomycin + Statins
  {
    id: 'dapto-statins',
    antibioticIds: ['daptomycin'],
    interactingDrugVi: 'Statin (Atorvastatin, Rosuvastatin, Simvastatin)',
    interactingDrugEn: 'Statins (HMG-CoA reductase inhibitors)',
    interactingGroupVi: 'Thuốc hạ lipid máu',
    interactingGroupEn: 'Lipid-lowering agents',
    severity: 'moderate',
    clinicalEffectVi: 'Hiệp đồng tăng nguy cơ tiêu cơ vân cấp (Rhabdomyolysis), đau cơ dữ dội và tổn thương thận do myoglobin niệu.',
    clinicalEffectEn: 'Additive risk of severe myopathy, rhabdomyolysis, and myoglobinuric acute renal failure.',
    mechanismVi: 'Cả hai thuốc đều có độc tính trực tiếp lên cơ xương và màng tế bào sợi cơ.',
    mechanismEn: 'Both agents cause skeletal muscle toxicity and myocyte membrane instability.',
    managementVi: 'Tạm ngừng thuốc nhóm Statin trong suốt thời gian điều trị bằng Daptomycin. Theo dõi nồng độ Creatine Kinase (CPK) ít nhất 1 lần/tuần (hoặc 2-3 ngày/lần nếu có suy thận).',
    managementEn: 'Temporarily discontinue statin therapy during daptomycin treatment. Monitor serum CPK at baseline and weekly (or more frequently in renal impairment).',
    referenceSource: 'Cubicin Package Insert / IDSA Guidelines'
  },

  // 10. TMP-SMX + ACEi / ARB / Spironolactone
  {
    id: 'cotrim-hyperkalemia',
    antibioticIds: ['tmp_smx'],
    interactingDrugVi: 'Thuốc ức chế men chuyển (Enalapril, Lisinopril) / Chẹn thụ thể (Losartan) / Spironolactone',
    interactingDrugEn: 'ACE inhibitors / ARBs / Spironolactone (Potassium-sparing diuretics)',
    interactingGroupVi: 'Thuốc tim mạch giữ Kali',
    interactingGroupEn: 'Potassium-sparing cardiovascular agents',
    severity: 'major',
    clinicalEffectVi: 'Tăng kali máu nặng, đột ngột, có thể gây ngừng tim đột ngột, đặc biệt ở người cao tuổi hoặc người có suy giảm chức năng thận.',
    clinicalEffectEn: 'Severe and sudden hyperkalemia leading to life-threatening cardiac arrhythmias and cardiac arrest, especially in elderly or CKD patients.',
    mechanismVi: 'Trimethoprim có cấu trúc và tác dụng tương tự amiloride, chẹn kênh natri biểu mô (ENaC) ở ống góp, ức chế bài tiết kali.',
    mechanismEn: 'Trimethoprim acts like amiloride, blocking epithelial sodium channels (ENaC) in the distal nephron and reducing potassium excretion.',
    managementVi: 'Theo dõi điện giải đồ (Kali máu) trước và sau 48-72 giờ dùng TMP-SMX. Tránh dùng liều cao hoặc cân nhắc kháng sinh thay thế nếu bệnh nhân đã có nền kali > 4.8 mmol/L.',
    managementEn: 'Check serum potassium baseline and at 48-72h after initiating TMP-SMX. Consider alternative antibiotic if baseline K+ is >4.8 mmol/L.',
    referenceSource: 'BMJ 2014 / Clin J Am Soc Nephrol 2010'
  },

  // 11. TMP-SMX / Metronidazole + Warfarin
  {
    id: 'cotrim-metro-warfarin',
    antibioticIds: ['tmp_smx', 'metronidazol'],
    interactingDrugVi: 'Warfarin / Thuốc chống đông kháng vitamin K',
    interactingDrugEn: 'Warfarin (Vitamin K antagonists)',
    interactingGroupVi: 'Thuốc chống đông đường uống',
    interactingGroupEn: 'Oral anticoagulants',
    severity: 'major',
    clinicalEffectVi: 'Tăng vọt chỉ số INR (thường > 5.0 - 10.0), tăng nguy cơ xuất huyết nội tạng nặng, xuất huyết tiêu hóa và xuất huyết não.',
    clinicalEffectEn: 'Significant elevation of INR (>5.0-10.0) resulting in high risk of major, life-threatening gastrointestinal or intracranial bleeding.',
    mechanismVi: 'Ức chế mạnh enzym CYP2C9 ở gan làm giảm chuyển hóa đồng phân S-warfarin (dạng có hoạt tính chống đông mạnh nhất).',
    mechanismEn: 'Potent inhibition of hepatic CYP2C9, significantly impairing the clearance of active S-warfarin.',
    managementVi: 'Chủ động giảm 30-50% liều Warfarin ngay khi bắt đầu dùng TMP-SMX hoặc Metronidazol. Xét nghiệm kiểm tra INR sau 2-3 ngày.',
    managementEn: 'Empirically reduce warfarin dose by 30-50% upon initiating TMP-SMX or metronidazole. Recheck INR within 48-72 hours.',
    referenceSource: 'Chest Antithrombotic Guidelines / Sanford Guide'
  },

  // 12. Ceftriaxone + Calcium IV
  {
    id: 'ceftriaxone-calcium',
    antibioticIds: ['ceftriaxon'],
    interactingDrugVi: 'Dung dịch chứa Canxi truyền tĩnh mạch (Ringer Lactat, Calcium Gluconate, Dung dịch TPN)',
    interactingDrugEn: 'IV Calcium-containing solutions (Ringer\'s Lactate, Calcium gluconate, TPN)',
    interactingGroupVi: 'Chế phẩm tiêm truyền chứa Canxi',
    interactingGroupEn: 'Parenteral calcium solutions',
    severity: 'major',
    clinicalEffectVi: 'Tạo kết tủa không tan Ceftriaxone-Calci gây tắc mạch vi tuần hoàn, tổn thương phổi và thận. ĐÃ CÓ BÁO CÁO TỬ VONG Ở TRẺ SƠ SINH.',
    clinicalEffectEn: 'Formation of insoluble ceftriaxone-calcium precipitates causing microvascular occlusion in lungs and kidneys. Fatal in neonates.',
    mechanismVi: 'Tương kỵ hóa lý tạo muối canxi ceftriaxonat không tan ngay cả khi truyền qua 2 đường truyền riêng biệt ở trẻ sơ sinh.',
    mechanismEn: 'Chemical precipitation of ceftriaxone-calcium salt in bloodstream and tissues.',
    managementVi: 'CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI ở trẻ sơ sinh (≤ 28 ngày tuổi). Ở người lớn, không được trộn chung hoặc truyền đồng thời qua cùng một dây truyền; phải tráng rửa đường truyền kỹ giữa hai lần dùng.',
    managementEn: 'ABSOLUTE CONTRAINDICATION in neonates (≤28 days). In adults, never co-administer via the same infusion line; flush thoroughly between infusions.',
    referenceSource: 'FDA Alert 2009 / Rocephin Package Insert'
  },

  // 13. Metronidazole + Alcohol / Disulfiram
  {
    id: 'metro-alcohol',
    antibioticIds: ['metronidazol', 'tinidazol'],
    interactingDrugVi: 'Rượu, Bia, Dung dịch cồn y tế / Disulfiram',
    interactingDrugEn: 'Alcohol, Ethanol-containing elixirs / Disulfiram',
    interactingGroupVi: 'Đồ uống có cồn & Thuốc cai rượu',
    interactingGroupEn: 'Alcohol & Disulfiram',
    severity: 'major',
    clinicalEffectVi: 'Phản ứng dạng disulfiram (say rượu cấp ác tính): đỏ bừng mặt, nhức đầu dữ dội, nôn mửa, hạ huyết áp, đánh trống ngực, khó thở.',
    clinicalEffectEn: 'Disulfiram-like reaction: severe facial flushing, pounding headache, intractable vomiting, hypotension, palpitations, diaphoresis.',
    mechanismVi: 'Ức chế enzym aldehyde dehydrogenase (ALDH) làm tích tụ nồng độ độc chất acetaldehyde trong máu.',
    mechanismEn: 'Inhibition of hepatic aldehyde dehydrogenase leading to toxic blood acetaldehyde accumulation.',
    managementVi: 'Tuyệt đối kiêng rượu, bia và các chế phẩm chứa ethanol trong suốt thời gian dùng thuốc và ít nhất 48-72 giờ sau liều cuối cùng.',
    managementEn: 'Strictly avoid all alcohol and ethanol-containing medicinal syrups during therapy and for at least 48-72 hours after completion.',
    referenceSource: 'CDC STD Guidelines / Lexicomp'
  },

  // 14. Azoles + Calcineurin Inhibitors (Tacrolimus / Cyclosporine)
  {
    id: 'azoles-calcineurin',
    antibioticIds: ['fluconazole', 'voriconazole'],
    interactingDrugVi: 'Tacrolimus / Cyclosporine (Thuốc chống thải ghép)',
    interactingDrugEn: 'Tacrolimus / Cyclosporine (Immunosuppressants)',
    interactingGroupVi: 'Thuốc ức chế miễn dịch',
    interactingGroupEn: 'Calcineurin inhibitors',
    severity: 'major',
    clinicalEffectVi: 'Tăng 2 đến 4 lần nồng độ Tacrolimus/Cyclosporine trong máu, gây độc thận nặng, tăng huyết áp ác tính và nhiễm trùng cơ hội.',
    clinicalEffectEn: '2-4 fold increase in tacrolimus/cyclosporine trough levels causing severe nephrotoxicity, neurotoxicity, and hypertension.',
    mechanismVi: 'Fluconazole và Voriconazole ức chế mạnh isoenzym CYP3A4 và P-glycoprotein ở ruột và gan.',
    mechanismEn: 'Potent inhibition of CYP3A4 and P-glycoprotein efflux transport by azole antifungals.',
    managementVi: 'Chủ động giảm 50% liều Tacrolimus (hoặc giảm 66% nếu dùng Voriconazole). Theo dõi nồng độ đáy Tacrolimus 2-3 ngày/lần để chỉnh liều.',
    managementEn: 'Preemptively reduce tacrolimus dose by 50% (or by ~66% with voriconazole). Closely monitor trough levels every 2-3 days.',
    referenceSource: 'AST ID Community Guidelines / Transplantation 2018'
  },

  // 15. Voriconazole + CYP Inducers (Rifampin, Carbamazepine, Phenytoin)
  {
    id: 'voriconazole-inducers',
    antibioticIds: ['voriconazole'],
    interactingDrugVi: 'Rifampin (Rifampicin) / Carbamazepine / Phenytoin',
    interactingDrugEn: 'Rifampin / Carbamazepine / Phenytoin',
    interactingGroupVi: 'Chất cảm ứng CYP mạnh',
    interactingGroupEn: 'Potent CYP450 inducers',
    severity: 'major',
    clinicalEffectVi: 'Giảm 80-95% nồng độ Voriconazole trong huyết tương, dẫn đến mất hoàn toàn hiệu lực điều trị nấm xâm lấn và tử vong.',
    clinicalEffectEn: '80-95% collapse in voriconazole plasma concentrations, leading to therapeutic failure and fungal progression.',
    mechanismVi: 'Cảm ứng mạnh mẽ CYP2C19, CYP2C9 và CYP3A4 đẩy nhanh tốc độ chuyển hóa voriconazole.',
    mechanismEn: 'Intense induction of CYP2C19, CYP2C9, and CYP3A4 enzymes responsible for voriconazole elimination.',
    managementVi: 'CHỐNG CHỈ ĐỊNH PHỐI HỢP với Rifampin, Carbamazepine, Phenytoin. Chọn thuốc chống nấm khác (nhóm Echinocandin: Caspofungin/Micafungin hoặc Amphotericin B Liposomal) nếu bắt buộc dùng thuốc cảm ứng.',
    managementEn: 'CONTRAINDICATED. If CYP inducers cannot be stopped, replace voriconazole with Liposomal Amphotericin B or Echinocandin (Caspofungin/Micafungin).',
    referenceSource: 'VFEND Prescribing Information / IDSA Aspergillosis Guidelines'
  }
];
