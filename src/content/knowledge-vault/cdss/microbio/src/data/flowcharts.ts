import { DiagnosticFlowchart } from '../types';

export const DIAGNOSTIC_FLOWCHARTS: DiagnosticFlowchart[] = [
  // FLOWCHART 1: GRAM-POSITIVE COCCI
  {
    id: 'gpc_flowchart',
    title: {
      vi: 'Lưu đồ chẩn đoán Cầu khuẩn Gram dương (GPC)',
      en: 'Gram-Positive Cocci (GPC) Diagnostic Flowchart'
    },
    category: 'Gram-Positive',
    description: {
      vi: 'Quy trình tiếp cận chẩn đoán phân biệt cầu khuẩn Gram dương dựa trên phản ứng Catalase, Coagulase, kiểu tan máu (Hemolysis), Optochin, Bacitracin và Bile Esculin.',
      en: 'Systematic flowchart for identifying Gram-positive cocci via Catalase, Coagulase, Hemolysis pattern, Optochin, Bacitracin, and Bile Esculin tests.'
    },
    initialStepId: 'gpc_catalase',
    steps: {
      gpc_catalase: {
        id: 'gpc_catalase',
        title: {
          vi: 'Bước 1: Thử nghiệm Catalase (3% H2O2)',
          en: 'Step 1: Catalase Test (3% H2O2)'
        },
        description: {
          vi: 'Nhỏ một giọt H2O2 3% lên lam kính, lấy khuẩn lạc hòa vào. Quan sát hiện tượng sủi bọt khí (O2 giải phóng).',
          en: 'Place a drop of 3% H2O2 onto glass slide, emulsify bacterial colony. Observe immediate vigorous bubble formation.'
        },
        testMethod: 'Catalase Test (Slide or Tube)',
        options: [
          {
            label: {
              vi: 'Dương tính (+) - Sủi bọt khí mạnh (Họ Staphylococcaceae / Micrococcaceae)',
              en: 'Positive (+) - Vigorous bubbling (Staphylococcaceae / Micrococcaceae)'
            },
            nextStepId: 'gpc_coagulase'
          },
          {
            label: {
              vi: 'Âm tính (-) - Không sủi bọt (Họ Streptococcaceae / Enterococcaceae)',
              en: 'Negative (-) - No bubbling (Streptococcaceae / Enterococcaceae)'
            },
            nextStepId: 'gpc_hemolysis'
          }
        ]
      },
      gpc_coagulase: {
        id: 'gpc_coagulase',
        title: {
          vi: 'Bước 2A: Thử nghiệm Coagulase (Huyết tương thỏ)',
          en: 'Step 2A: Coagulase Test (Rabbit Plasma)'
        },
        description: {
          vi: 'Thử nghiệm đông huyết tương phát hiện enzyme coagulase tự do và liên kết (clumping factor).',
          en: 'Detects bound and free staphylocoagulase enzyme using citrated rabbit plasma.'
        },
        testMethod: 'Slide agglutination / Tube coagulase (4-24h)',
        options: [
          {
            label: {
              vi: 'Dương tính (+) - Đông tụ thành cục (Staphylococcus aureus)',
              en: 'Positive (+) - Clot formation (Staphylococcus aureus)'
            },
            resultPathogens: ['s_aureus'],
            conclusion: {
              vi: 'Xác định: Staphylococcus aureus. Tiếp tục làm đĩa Cefoxitin 30µg để xác định MSSA hay MRSA.',
              en: 'Identified: Staphylococcus aureus. Perform Cefoxitin 30µg disk diffusion to differentiate MSSA vs MRSA.'
            }
          },
          {
            label: {
              vi: 'Âm tính (-) - Không đông tụ (Tụ cầu CoNS - Coagulase Negative Staphylococci)',
              en: 'Negative (-) - No clot (Coagulase Negative Staphylococci - CoNS)'
            },
            nextStepId: 'gpc_novobiocin'
          }
        ]
      },
      gpc_novobiocin: {
        id: 'gpc_novobiocin',
        title: {
          vi: 'Bước 3A: Thử nghiệm Novobiocin (5µg)',
          en: 'Step 3A: Novobiocin Susceptibility (5µg Disk)'
        },
        description: {
          vi: 'Phân biệt S. saprophyticus (gây UTI ở nữ trẻ) với S. epidermidis trên bệnh phẩm nước tiểu.',
          en: 'Differentiates S. saprophyticus (UTI in young females) from S. epidermidis in urine cultures.'
        },
        testMethod: 'Disk diffusion on Blood Agar',
        options: [
          {
            label: {
              vi: 'Nhạy cảm (Vòng vô khuẩn ≥ 16 mm) -> S. epidermidis / S. lugdunensis',
              en: 'Susceptible (Zone ≥ 16 mm) -> S. epidermidis / S. lugdunensis'
            },
            conclusion: {
              vi: 'Xác định: Staphylococcus epidermidis hoặc CoNS khác (thường tạo biofilm trên catheter).',
              en: 'Identified: Staphylococcus epidermidis or other CoNS (biofilm-forming opportunistic pathogen).'
            }
          },
          {
            label: {
              vi: 'Kháng thuốc (Vòng vô khuẩn ≤ 15 mm) -> S. saprophyticus',
              en: 'Resistant (Zone ≤ 15 mm) -> S. saprophyticus'
            },
            conclusion: {
              vi: 'Xác định: Staphylococcus saprophyticus (Tác nhân viêm bàng quang cấp ở phụ nữ trẻ).',
              en: 'Identified: Staphylococcus saprophyticus (Frequent cause of community-acquired cystitis in young females).'
            }
          }
        ]
      },
      gpc_hemolysis: {
        id: 'gpc_hemolysis',
        title: {
          vi: 'Bước 2B: Kiểu tan máu trên thạch máu cừu 5% (SBA)',
          en: 'Step 2B: Hemolytic Pattern on 5% Sheep Blood Agar (SBA)'
        },
        description: {
          vi: 'Đọc đĩa thạch máu dưới ánh sáng truyền qua (transillumination) để đánh giá tiêu huyết.',
          en: 'Examine SBA plate with transmitted light to evaluate red blood cell destruction.'
        },
        testMethod: 'Sheep Blood Agar incubation 35°C in 5% CO2',
        options: [
          {
            label: {
              vi: 'Tan máu Alpha (α) - Vòng xanh cỏ úa, phá hủy hồng cầu không hoàn toàn',
              en: 'Alpha (α) Hemolysis - Greenish discoloration, partial lysis'
            },
            nextStepId: 'gpc_optochin'
          },
          {
            label: {
              vi: 'Tan máu Beta (β) - Vòng trong suốt hoàn toàn quanh khuẩn lạc',
              en: 'Beta (β) Hemolysis - Complete clear lysis zone around colonies'
            },
            nextStepId: 'gpc_beta_diff'
          },
          {
            label: {
              vi: 'Tan máu Gamma (γ) - Không tan máu, môi trường không đổi màu',
              en: 'Gamma (γ) Hemolysis - Non-hemolytic, no color change'
            },
            nextStepId: 'gpc_enterococcus_diff'
          }
        ]
      },
      gpc_optochin: {
        id: 'gpc_optochin',
        title: {
          vi: 'Bước 3B: Thử nghiệm Optochin & Độ tan trong muối mật',
          en: 'Step 3B: Optochin Susceptibility & Bile Solubility'
        },
        description: {
          vi: 'Phân biệt Streptococcus pneumoniae với nhóm Viridans streptococci.',
          en: 'Differentiates Streptococcus pneumoniae from alpha-hemolytic Viridans streptococci.'
        },
        testMethod: 'Optochin (Taxo P, 5µg) & 10% Sodium Deoxycholate',
        options: [
          {
            label: {
              vi: 'Nhạy Optochin (Vòng ≥ 14 mm) & Tan trong mật (+) -> Streptococcus pneumoniae',
              en: 'Optochin Susceptible (Zone ≥ 14 mm) & Bile Soluble (+) -> S. pneumoniae'
            },
            resultPathogens: ['s_pneumoniae'],
            conclusion: {
              vi: 'Xác định: Streptococcus pneumoniae (Phế cầu khuẩn). Kiểm tra tính nhạy Penicillin bằng đĩa Oxacillin 1µg.',
              en: 'Identified: Streptococcus pneumoniae. Test penicillin susceptibility via 1µg oxacillin disk.'
            }
          },
          {
            label: {
              vi: 'Kháng Optochin (< 14 mm) & Không tan trong mật (-) -> Viridans Streptococci',
              en: 'Optochin Resistant (< 14 mm) & Bile Insoluble (-) -> Viridans group'
            },
            conclusion: {
              vi: 'Xác định: Viridans Streptococci (S. mitis, S. mutans, S. sanguinis). Bình thường ở vùng họng miệng, có thể gây viêm nội tâm mạc bán cấp.',
              en: 'Identified: Viridans Streptococci (oral commensals, cause of subacute bacterial endocarditis).'
            }
          }
        ]
      },
      gpc_beta_diff: {
        id: 'gpc_beta_diff',
        title: {
          vi: 'Bước 3C: Phân biệt Liên cầu tan máu Beta (PYR, Bacitracin, CAMP)',
          en: 'Step 3C: Differentiating Beta-Hemolytic Streptococci'
        },
        description: {
          vi: 'Sử dụng thử nghiệm PYR, đĩa Bacitracin 0.04U (Taxo A) và thử nghiệm CAMP / Thủy phân Hippurate.',
          en: 'Using PYR, Bacitracin 0.04U, and CAMP test / Hippurate hydrolysis.'
        },
        testMethod: 'PYR test, Bacitracin, CAMP on SBA',
        options: [
          {
            label: {
              vi: 'Vòng tan máu rộng, PYR (+), Nhạy Bacitracin -> Streptococcus pyogenes (Group A)',
              en: 'Wide beta zone, PYR (+), Bacitracin sensitive -> Streptococcus pyogenes (GAS)'
            },
            resultPathogens: ['s_pyogenes'],
            conclusion: {
              vi: 'Xác định: Streptococcus pyogenes (Liên cầu khuẩn nhóm A). Nhạy cảm 100% với Penicillin.',
              en: 'Identified: Streptococcus pyogenes (GAS). Universally susceptible to Penicillin.'
            }
          },
          {
            label: {
              vi: 'Vòng tan máu hẹp, PYR (-), CAMP (+), Thủy phân Hippurate (+) -> Streptococcus agalactiae (Group B)',
              en: 'Narrow beta zone, PYR (-), CAMP (+), Hippurate (+) -> S. agalactiae (GBS)'
            },
            resultPathogens: ['s_agalactiae'],
            conclusion: {
              vi: 'Xác định: Streptococcus agalactiae (Liên cầu khuẩn nhóm B). Nguy cơ cao gây nhiễm khuẩn huyết và viêm màng não sơ sinh.',
              en: 'Identified: Streptococcus agalactiae (GBS). Crucial pathogen in neonatal sepsis and meningitis.'
            }
          }
        ]
      },
      gpc_enterococcus_diff: {
        id: 'gpc_enterococcus_diff',
        title: {
          vi: 'Bước 3D: Phân biệt Enterococcus (Bile Esculin & NaCl 6.5%)',
          en: 'Step 3D: Enterococcus Identification (Bile Esculin & 6.5% NaCl)'
        },
        description: {
          vi: 'Đánh giá khả năng thủy phân esculin khi có muối mật và khả năng mọc trong môi trường muối NaCl 6.5%.',
          en: 'Evaluate esculin hydrolysis in the presence of 40% bile and growth in 6.5% NaCl broth.'
        },
        testMethod: 'Bile Esculin Agar & 6.5% NaCl Broth / PYR test',
        options: [
          {
            label: {
              vi: 'Bile Esculin (+ mầu đen), Mọc trong NaCl 6.5% (+), PYR (+) -> Enterococcus spp.',
              en: 'Bile Esculin (+ black), 6.5% NaCl (+ growth), PYR (+) -> Enterococcus spp.'
            },
            resultPathogens: ['enterococcus_spp'],
            conclusion: {
              vi: 'Xác định: Enterococcus faecalis / faecium. Cần kiểm tra độ nhạy Vancomycin để phát hiện VRE (gen vanA/vanB).',
              en: 'Identified: Enterococcus faecalis / faecium. Check Vancomycin MIC to screen for VRE.'
            }
          },
          {
            label: {
              vi: 'Bile Esculin (+), KHÔNG mọc trong NaCl 6.5% (-), PYR (-) -> Group D Non-enterococci',
              en: 'Bile Esculin (+), No growth in 6.5% NaCl (-), PYR (-) -> Group D Non-enterococci'
            },
            conclusion: {
              vi: 'Xác định: Streptococcus gallolyticus (nhóm S. bovis). Có mối liên quan lâm sàng mật thiết với polyp và ung thư đại trực tràng.',
              en: 'Identified: Streptococcus gallolyticus (S. bovis group). Strongly associated with colon carcinoma and endocarditis.'
            }
          }
        ]
      }
    }
  },

  // FLOWCHART 2: GRAM-NEGATIVE BACILLI
  {
    id: 'gnb_flowchart',
    title: {
      vi: 'Lưu đồ chẩn đoán Trực khuẩn Gram âm (GNB)',
      en: 'Gram-Negative Bacilli (GNB) Diagnostic Flowchart'
    },
    category: 'Gram-Negative',
    description: {
      vi: 'Quy trình tiếp cận phân loại trực khuẩn Gram âm dựa trên men Oxidase, lên men Lactose trên thạch MacConkey, phản ứng TSI/KIA, Indole, Urease và sinh H2S.',
      en: 'Systematic approach for differentiating Enterobacteriaceae and non-fermenting Gram-negative rods using Oxidase, MacConkey lactose fermentation, TSI/KIA, Indole, Urease, and H2S.'
    },
    initialStepId: 'gnb_oxidase',
    steps: {
      gnb_oxidase: {
        id: 'gnb_oxidase',
        title: {
          vi: 'Bước 1: Thử nghiệm Cytochrome Oxidase',
          en: 'Step 1: Cytochrome Oxidase Test'
        },
        description: {
          vi: 'Lấy khuẩn lạc từ thạch máu (KHÔNG dùng từ đĩa MacConkey có chất nhuộm màu) cọ vào giấy tẩm thuốc thử 1% tetramethyl-p-phenylenediamine. Đọc trong 10-15 giây.',
          en: 'Rub colony from blood or nutrient agar onto reagent paper soaked with 1% tetramethyl-p-phenylenediamine. Read within 10-15 seconds.'
        },
        testMethod: 'Kovac’s Oxidase Test',
        options: [
          {
            label: {
              vi: 'Âm tính (-) - Không đổi màu (Họ Enterobacteriaceae thông thường)',
              en: 'Negative (-) - Colorless (Typical Enterobacteriaceae)'
            },
            nextStepId: 'gnb_macconkey_lactose'
          },
          {
            label: {
              vi: 'Dương tính (+) - Màu tím sẫm trong 10-15 giây (Pseudomonas, Vibrio, Campylobacter...)',
              en: 'Positive (+) - Deep purple in 10-15 seconds (Pseudomonas, Vibrio, Campylobacter...)'
            },
            nextStepId: 'gnb_oxidase_positive'
          }
        ]
      },
      gnb_macconkey_lactose: {
        id: 'gnb_macconkey_lactose',
        title: {
          vi: 'Bước 2A: Lên men Lactose trên thạch MacConkey (MAC)',
          en: 'Step 2A: Lactose Fermentation on MacConkey Agar (MAC)'
        },
        description: {
          vi: 'Đánh giá khả năng phân giải lactose và tạo axit làm hạ pH, đổi màu chỉ thị đỏ trung tính thành hồng/đỏ.',
          en: 'Differentiates lactose fermenters (pink/red colonies) from non-lactose fermenters (colorless colonies).'
        },
        testMethod: 'MacConkey Agar (18-24h, 35°C)',
        options: [
          {
            label: {
              vi: 'Lên men Lactose (LF) - Khuẩn lạc hồng sẫm / đỏ (E. coli, Klebsiella, Enterobacter, Citrobacter)',
              en: 'Lactose Fermenter (LF) - Pink/red colonies (E. coli, Klebsiella, Enterobacter, Citrobacter)'
            },
            nextStepId: 'gnb_lf_differentiation'
          },
          {
            label: {
              vi: 'Không lên men Lactose (NLF) - Khuẩn lạc trong suốt / không màu (Salmonella, Shigella, Proteus, Yersinia)',
              en: 'Non-Lactose Fermenter (NLF) - Colorless / translucent colonies (Salmonella, Shigella, Proteus, Yersinia)'
            },
            nextStepId: 'gnb_nlf_differentiation'
          }
        ]
      },
      gnb_lf_differentiation: {
        id: 'gnb_lf_differentiation',
        title: {
          vi: 'Bước 3A: Phân biệt các trực khuẩn lên men Lactose (Indole & Vỏ nhầy)',
          en: 'Step 3A: Differentiating Lactose Fermenters (Indole & Mucoid Character)'
        },
        description: {
          vi: 'Đặc điểm khuẩn lạc (khô có lắng đọng muối mật vs nhầy dính cao) và thử nghiệm sinh Indole từ tryptophan.',
          en: 'Colony appearance (dry with bile precipitate vs heavily mucoid) and Indole production from tryptophan.'
        },
        testMethod: 'Colony morphology + Spot Indole / TSI',
        options: [
          {
            label: {
              vi: 'Khuẩn lạc khô viền tủa hồng, Indole (+), Di động (+), TSI A/A Gas+ -> Escherichia coli',
              en: 'Dry flat colonies with bile precipitate, Indole (+), Motile (+), TSI A/A Gas+ -> E. coli'
            },
            resultPathogens: ['e_coli'],
            conclusion: {
              vi: 'Xác định: Escherichia coli. Kiểm tra kiểu hình sinh ESBL và kháng sinh đồ.',
              en: 'Identified: Escherichia coli. Screen for ESBL production and determine antibiogram.'
            }
          },
          {
            label: {
              vi: 'Khuẩn lạc nhầy dính to lồi (mucoid), Indole (-), Không di động (-), Urease (+) -> Klebsiella pneumoniae',
              en: 'Heaped mucoid sticky colonies, Indole (-), Nonmotile (-), Urease (+) -> K. pneumoniae'
            },
            resultPathogens: ['k_pneumoniae'],
            conclusion: {
              vi: 'Xác định: Klebsiella pneumoniae (Lưu ý: K. oxytoca cho phản ứng Indole dương tính). Kháng tự nhiên Ampicillin.',
              en: 'Identified: Klebsiella pneumoniae (Note: K. oxytoca is Indole positive). Intrinsically ampicillin-resistant.'
            }
          }
        ]
      },
      gnb_nlf_differentiation: {
        id: 'gnb_nlf_differentiation',
        title: {
          vi: 'Bước 3B: Phân biệt trực khuẩn không lên men Lactose (TSI, H2S, PAD, Di động)',
          en: 'Step 3B: Non-Lactose Fermenters Differentiation (TSI, H2S, PAD, Motility)'
        },
        description: {
          vi: 'Đánh giá khả năng sinh H2S, chuyển hóa glucose trên TSI, men Phenylalanine Deaminase (PAD) và di động.',
          en: 'TSI slant/butt reaction, H2S black precipitate, PAD deaminase and motility.'
        },
        testMethod: 'TSI, LIA, PAD, Urease',
        options: [
          {
            label: {
              vi: 'TSI K/A H2S (+), Lysine decarboxylase LIA K/K (+), Di động (+), Indole (-) -> Salmonella spp.',
              en: 'TSI K/A H2S (+), LIA K/K (+), Motile (+), Indole (-) -> Salmonella spp.'
            },
            resultPathogens: ['salmonella_typhi'],
            conclusion: {
              vi: 'Xác định: Salmonella enterica (nghi ngờ S. Typhi nếu H2S dạng vòng mỏng không sinh hơi; khẳng định bằng ngưng kết kháng huyết thanh O, Vi, H).',
              en: 'Identified: Salmonella enterica (suspect S. Typhi if faint H2S ring and no gas; confirm with serogrouping).'
            }
          },
          {
            label: {
              vi: 'Hiện tượng mọc lan như sóng (Swarming) trên thạch máu, Urease (+) cực nhanh, PAD (+) -> Proteus mirabilis',
              en: 'Swarming waves on blood agar, rapid Urease (+), PAD (+) -> Proteus mirabilis'
            },
            conclusion: {
              vi: 'Xác định: Proteus mirabilis (H2S +, Indole âm tính). P. vulgaris cho kết quả Indole dương tính.',
              en: 'Identified: Proteus mirabilis (H2S+, Indole-). P. vulgaris is Indole positive.'
            }
          },
          {
            label: {
              vi: 'TSI K/A H2S (-), Không sinh hơi (Gas -), KHÔNG di động (-) -> Shigella spp.',
              en: 'TSI K/A H2S (-), No gas, NONMOTILE (-) -> Shigella spp.'
            },
            conclusion: {
              vi: 'Xác định: Shigella spp. (Liều nhiễm trùng cực thấp <100 vi khuẩn gây hội chứng lỵ trực trùng). Cần báo cáo y tế công cộng.',
              en: 'Identified: Shigella spp. (Low infectious dose <100 organisms causing bacillary dysentery). Reportable disease.'
            }
          }
        ]
      },
      gnb_oxidase_positive: {
        id: 'gnb_oxidase_positive',
        title: {
          vi: 'Bước 2B: Trực khuẩn Gram âm Oxidase Dương tính',
          en: 'Step 2B: Oxidase-Positive Gram-Negative Bacilli'
        },
        description: {
          vi: 'Phân biệt Pseudomonas aeruginosa (hiếu khí bắt buộc, sinh sắc tố xanh, không lên men TSI K/K) với các trực khuẩn khác.',
          en: 'Differentiating Pseudomonas aeruginosa from Vibrio, Aeromonas, and Campylobacter.'
        },
        testMethod: 'TSI, Sắc tố Pyocyanin, Mùi đặc trưng, Nhiệt độ 42°C',
        options: [
          {
            label: {
              vi: 'TSI K/K (không lên men), sắc tố xanh kim loại (pyocyanin), mùi nho/tortilla, mọc ở 42°C -> Pseudomonas aeruginosa',
              en: 'TSI K/K (nonfermenter), blue-green metallic pigment, grape/tortilla odor, grows at 42°C -> P. aeruginosa'
            },
            resultPathogens: ['p_aeruginosa'],
            conclusion: {
              vi: 'Xác định: Pseudomonas aeruginosa. Đánh giá cẩn thận kháng sinh đồ do có tính kháng thuốc tự nhiên rất cao.',
              en: 'Identified: Pseudomonas aeruginosa. Evaluate susceptibility carefully due to extensive intrinsic resistances.'
            }
          },
          {
            label: {
              vi: 'Hình dấu phẩy / cánh hải âu (gull-wing), vi hiếu khí 42°C, Hippurate (+) -> Campylobacter jejuni',
              en: 'Curved gull-wing rods, microaerophilic at 42°C, Hippurate (+) -> Campylobacter jejuni'
            },
            conclusion: {
              vi: 'Xác định: Campylobacter jejuni (Nguyên nhân phổ biến gây tiêu chảy nhiễm trùng cấp từ gia cầm).',
              en: 'Identified: Campylobacter jejuni (Major bacterial cause of acute diarrheal disease from poultry).'
            }
          },
          {
            label: {
              vi: 'Lên men Sucrose mọc khuẩn lạc vàng trên thạch TCBS, di động mạnh, test sợi dây dính (String test) (+) -> Vibrio cholerae',
              en: 'Yellow colonies on TCBS (sucrose fermenter), darting motility, string test (+) -> Vibrio cholerae'
            },
            conclusion: {
              vi: 'Xác định: Vibrio cholerae (Phẩy khuẩn tả). Bệnh truyền nhiễm nhóm A1 phải báo cáo khẩn cấp.',
              en: 'Identified: Vibrio cholerae (Cholera). Class A1 reportable infectious disease.'
            }
          }
        ]
      }
    }
  },

  // FLOWCHART 3: GRAM-POSITIVE BACILLI & SPORES
  {
    id: 'gpr_flowchart',
    title: {
      vi: 'Lưu đồ chẩn đoán Trực khuẩn Gram dương (GPR)',
      en: 'Gram-Positive Bacilli (GPR) Diagnostic Flowchart'
    },
    category: 'Gram-Positive Bacilli',
    description: {
      vi: 'Phân loại trực khuẩn Gram dương sinh bào tử (Bacillus, Clostridium), không sinh bào tử (Listeria, Corynebacterium), và vi khuẩn phân nhánh (Nocardia, Actinomyces).',
      en: 'Classification of spore-forming rods (Bacillus, Clostridium), non-spore formers (Listeria, Corynebacterium), and branching filaments (Nocardia, Actinomyces).'
    },
    initialStepId: 'gpr_spore_morphology',
    steps: {
      gpr_spore_morphology: {
        id: 'gpr_spore_morphology',
        title: {
          vi: 'Bước 1: Hình thái tế bào & Sự hiện diện của nội bào tử',
          en: 'Step 1: Cell Morphology & Endospore Presence'
        },
        description: {
          vi: 'Kiểm tra hình dạng trực khuẩn (toa tàu lớn, phân nhánh, đa hình thái chữ V) và bào tử (nhuộm Schaeffer-Fulton hoặc Gram).',
          en: 'Examine bacillary size (large boxcar vs branching vs pleomorphic coryneform) and endospores (Schaeffer-Fulton stain).'
        },
        testMethod: 'Gram stain, Spore stain, Anaerobic culture',
        options: [
          {
            label: {
              vi: 'Trực khuẩn lớn hình toa tàu, sinh bào tử hiếu khí -> Chi Bacillus',
              en: 'Large boxcar rods, aerobic spore-formers -> Genus Bacillus'
            },
            nextStepId: 'gpr_bacillus_diff'
          },
          {
            label: {
              vi: 'Trực khuẩn kỵ khí bắt buộc, sinh bào tử -> Chi Clostridium',
              en: 'Obligate anaerobes with endospores -> Genus Clostridium'
            },
            nextStepId: 'gpr_clostridium_diff'
          },
          {
            label: {
              vi: 'Trực khuẩn nhỏ, không bào tử (Listeria, Corynebacterium, Lactobacillus)',
              en: 'Small rods, non-spore formers (Listeria, Corynebacterium, Lactobacillus)'
            },
            nextStepId: 'gpr_nonspore_diff'
          },
          {
            label: {
              vi: 'Trực khuẩn phân nhánh, dạng sợi (Nocardia, Actinomyces)',
              en: 'Branching, beaded filamentous rods (Nocardia, Actinomyces)'
            },
            nextStepId: 'gpr_branching_diff'
          }
        ]
      },
      gpr_bacillus_diff: {
        id: 'gpr_bacillus_diff',
        title: {
          vi: 'Bước 2A: Phân biệt Bacillus anthracis vs Bacillus cereus',
          en: 'Step 2A: Bacillus anthracis Rule-Out'
        },
        description: {
          vi: 'Quy trình phòng ngừa khủng bố sinh học: đánh giá di động, tan máu trên thạch máu cừu và nhạy cảm Penicillin.',
          en: 'Laboratory Response Network (LRN) rule-out protocol: motility, hemolysis on SBA, penicillin susceptibility.'
        },
        testMethod: 'Motility test, Sheep blood agar hemolysis, Penicillin test',
        options: [
          {
            label: {
              vi: 'KHÔNG DI ĐỘNG (-), KHÔNG TAN MÁU (-), khuẩn lạc đầu Medusa -> Nghi ngờ Bacillus anthracis!',
              en: 'NONMOTILE (-), NON-HEMOLYTIC (-), Medusa head colonies -> Suspect Bacillus anthracis!'
            },
            resultPathogens: ['b_anthracis'],
            conclusion: {
              vi: 'CẢNH BÁO NGUY CƠ CAO: Nghi ngờ B. anthracis (Trực khuẩn than). Dừng thao tác ngay lập tức, cách ly mẫu vật và báo cáo LRN Reference Lab!',
              en: 'HIGH BIOTHREAT WARNING: Suspect Bacillus anthracis. Cease bench work immediately, seal plates, alert reference laboratory (BSL-3).'
            }
          },
          {
            label: {
              vi: 'Di động mạnh (+), Tan máu Beta rộng (+), khuẩn lạc nhám màu xám xanh -> Bacillus cereus',
              en: 'Actively motile (+), Broad beta-hemolysis (+), rough colonies -> Bacillus cereus'
            },
            conclusion: {
              vi: 'Xác định: Bacillus cereus (Nguyên nhân ngộ độc thức ăn do cơm nguội hoặc chấn thương mắt hoại tử).',
              en: 'Identified: Bacillus cereus (Emetic/diarrheal food poisoning, post-traumatic endophthalmitis).'
            }
          }
        ]
      },
      gpr_clostridium_diff: {
        id: 'gpr_clostridium_diff',
        title: {
          vi: 'Bước 2B: Phân biệt các loài Clostridium gây bệnh',
          en: 'Step 2B: Differentiating Pathogenic Clostridia'
        },
        description: {
          vi: 'Đặc điểm bào tử (vị trí bào tử), kiểu tan máu đôi và bệnh cảnh lâm sàng.',
          en: 'Spore morphology and location, double-zone hemolysis, and clinical manifestation.'
        },
        testMethod: 'Egg yolk agar (lecithinase), CCFA agar, Spore morphology',
        options: [
          {
            label: {
              vi: 'Tiêu chảy sau dùng kháng sinh, phát hiện Toxin A & B, mọc trên thạch CCFA mùi phân ngựa -> Clostridioides difficile',
              en: 'Antibiotic-associated diarrhea, Toxin A/B positive, CCFA horse manure odor -> C. difficile'
            },
            resultPathogens: ['c_difficile'],
            conclusion: {
              vi: 'Xác định: Clostridioides difficile. Vệ sinh tay bằng xà phòng và nước; điều trị bằng Vancomycin uống hoặc Fidaxomicin.',
              en: 'Identified: Clostridioides difficile. Wash hands with soap and water; treat with oral vancomycin.'
            }
          },
          {
            label: {
              vi: 'Trực khuẩn toa tàu lớn, hai vòng tan máu beta (double zone), Lecithinase (+) -> Clostridium perfringens',
              en: 'Large boxcar rods, double zone of beta hemolysis, Lecithinase (+) -> Clostridium perfringens'
            },
            conclusion: {
              vi: 'Xác định: Clostridium perfringens (Căn nguyên chính gây hoại thư sinh hơi - Gas Gangrene).',
              en: 'Identified: Clostridium perfringens (Principal agent of gas gangrene and myonecrosis).'
            }
          },
          {
            label: {
              vi: 'Bào tử tròn nằm ở cực tế bào (terminal spore) tạo hình vợt tennis / dùi trống -> Clostridium tetani',
              en: 'Round terminal spore creating tennis racquet / drumstick appearance -> Clostridium tetani'
            },
            conclusion: {
              vi: 'Xác định: Clostridium tetani (Tác nhân bệnh uốn ván - Tetanus; ngoại độc tố Tetanospasmin).',
              en: 'Identified: Clostridium tetani (Agent of tetanus; lethal neurotoxin tetanospasmin).'
            }
          }
        ]
      },
      gpr_nonspore_diff: {
        id: 'gpr_nonspore_diff',
        title: {
          vi: 'Bước 2C: Trực khuẩn Gram dương không sinh bào tử',
          en: 'Step 2C: Non-Spore-Forming Gram-Positive Bacilli'
        },
        description: {
          vi: 'Thử nghiệm Catalase, chuyển động lộn nhào (Tumbling motility) ở 25°C và nhuộm hạt biến sắc.',
          en: 'Catalase, tumbling motility at 25°C, and metachromatic granules.'
        },
        testMethod: 'Motility wet mount / agar at 25°C, Catalase, Loeffler methylene blue',
        options: [
          {
            label: {
              vi: 'Catalase (+), Di động lộn nhào ở 25°C, Tan máu Beta hẹp, CAMP (+) -> Listeria monocytogenes',
              en: 'Catalase (+), Tumbling motility at 25°C, narrow beta hemolysis, CAMP (+) -> Listeria monocytogenes'
            },
            conclusion: {
              vi: 'Xác định: Listeria monocytogenes. Ký sinh nội bào, nguy cơ cao cho phụ nữ mang thai, thai nhi và người suy giảm miễn dịch.',
              en: 'Identified: Listeria monocytogenes. Intracellular pathogen dangerous to pregnant women and neonates.'
            }
          },
          {
            label: {
              vi: 'Xếp hình chữ V / hàng rào, hạt biến sắc (Metachromatic granules) với Xanh Methylene, khuẩn lạc đen trên Tinsdale -> Corynebacterium diphtheriae',
              en: 'Palisading V-shapes, metachromatic granules on methylene blue, black colonies on Tinsdale -> C. diphtheriae'
            },
            conclusion: {
              vi: 'Xác định: Corynebacterium diphtheriae (Trực khuẩn bạch hầu). Cần làm thử nghiệm Elek xác định độc lực sinh ngoại độc tố.',
              en: 'Identified: Corynebacterium diphtheriae. Confirm toxigenicity via Elek immunodiffusion test.'
            }
          },
          {
            label: {
              vi: 'Catalase (-), Trực khuẩn dài xếp chuỗi, tạo môi trường axit âm đạo -> Lactobacillus spp.',
              en: 'Catalase (-), long chaining rods, maintains acidic vaginal flora -> Lactobacillus spp.'
            },
            conclusion: {
              vi: 'Xác định: Lactobacillus spp. (Vi khuẩn chí bình thường bảo vệ âm đạo; thường kháng tự nhiên Vancomycin).',
              en: 'Identified: Lactobacillus spp. (Normal vaginal protective microbiota; intrinsically vancomycin-resistant).'
            }
          }
        ]
      },
      gpr_branching_diff: {
        id: 'gpr_branching_diff',
        title: {
          vi: 'Bước 2D: Trực khuẩn phân nhánh dạng sợi (Nocardia vs Actinomyces)',
          en: 'Step 2D: Branching Filamentous Bacilli'
        },
        description: {
          vi: 'Nhuộm kháng toan cải tiến (Modified Kinyoun) và nhu cầu oxy (Hiếu khí vs Kỵ khí).',
          en: 'Modified acid-fast stain and atmospheric requirements (Aerobic vs Anaerobic).'
        },
        testMethod: 'Modified Kinyoun partial acid-fast stain, Anaerobic culture',
        options: [
          {
            label: {
              vi: 'Hiếu khí bắt buộc, Kháng toan một phần (Partial acid-fast +), khuẩn lạc phấn trắng như vụn bánh mì, mùi đất -> Nocardia spp.',
              en: 'Obligate aerobe, partially acid-fast (+), chalky breadcrumb colonies, earthy odor -> Nocardia spp.'
            },
            conclusion: {
              vi: 'Xác định: Nocardia spp. (N. asteroides, N. brasiliensis). Gây áp-xe phổi, não ở người suy giảm miễn dịch. Điều trị lựa chọn: TMP-SMX.',
              en: 'Identified: Nocardia spp. Lung/brain abscesses in immunocompromised hosts. Drug of choice: TMP-SMX.'
            }
          },
          {
            label: {
              vi: 'Kỵ khí bắt buộc, Kháng toan (-), hạt lưu huỳnh (Sulfur granules), khuẩn lạc răng hàm (Molar tooth) -> Actinomyces spp.',
              en: 'Obligate anaerobe, acid-fast (-), sulfur granules in pus, molar tooth colonies -> Actinomyces spp.'
            },
            conclusion: {
              vi: 'Xác định: Actinomyces israelii (Bệnh nấm mang lumpy jaw, áp-xe vùng hàm mặt tạo xoang rò ra da). Điều trị: Penicillin liều cao kéo dài.',
              en: 'Identified: Actinomyces israelii (Actinomycosis / lumpy jaw with draining sinus tracts). Treat with prolonged high-dose Penicillin.'
            }
          }
        ]
      }
    }
  },

  // FLOWCHART 4: FASTIDIOUS & SPECIAL PATHOGENS
  {
    id: 'fastidious_flowchart',
    title: {
      vi: 'Lưu đồ chẩn đoán Vi khuẩn khó mọc & Mẫu đặc biệt',
      en: 'Fastidious & Specialized Pathogens Flowchart'
    },
    category: 'Fastidious & Special',
    description: {
      vi: 'Tiếp cận các tác nhân khó nuôi cấy: Neisseria, Haemophilus, Bordetella, Legionella, và nấm men Cryptococcus.',
      en: 'Diagnostic pathways for fastidious bacteria and encapsulated fungi: Neisseria, Haemophilus, Bordetella, Legionella, and Cryptococcus.'
    },
    initialStepId: 'fastidious_start',
    steps: {
      fastidious_start: {
        id: 'fastidious_start',
        title: {
          vi: 'Bước 1: Nhu cầu môi trường dinh dưỡng đặc biệt',
          en: 'Step 1: Specialized Culture Media Requirements'
        },
        description: {
          vi: 'Quan sát sự phát triển trên Thạch Chocolate, Thạch máu cừu (SBA) và môi trường chuyên dụng.',
          en: 'Compare growth on Chocolate agar, Sheep blood agar (SBA), and selective nutrient media.'
        },
        testMethod: 'Selective & Enriched Plating Media',
        options: [
          {
            label: {
              vi: 'Mọc trên thạch Chocolate nhưng KHÔNG mọc trên thạch máu cừu SBA -> Haemophilus hoặc Neisseria',
              en: 'Grows on Chocolate agar but NO growth on Sheep Blood Agar -> Haemophilus or Neisseria'
            },
            nextStepId: 'fastidious_choc_growers'
          },
          {
            label: {
              vi: 'Đòi hỏi môi trường than hoạt tính BCYE, khuẩn lạc óng ánh như kính cắt -> Legionella spp.',
              en: 'Requires Buffered Charcoal Yeast Extract (BCYE) agar, cut-glass colonies -> Legionella spp.'
            },
            conclusion: {
              vi: 'Xác định: Legionella pneumophila (Bệnh Legionnaires - Viêm phổi sốt sông Pontiac). Khẳng định bằng xét nghiệm kháng nguyên nước tiểu (UAT).',
              en: 'Identified: Legionella pneumophila. Confirm with urinary antigen test (UAT); treat with Macrolides/Fluoroquinolones.'
            }
          },
          {
            label: {
              vi: 'Mọc trên thạch Regan-Lowe / Bordet-Gengou như giọt thủy ngân, ho gà -> Bordetella pertussis',
              en: 'Mercury droplet colonies on Regan-Lowe / Bordet-Gengou agar -> Bordetella pertussis'
            },
            conclusion: {
              vi: 'Xác định: Bordetella pertussis (Trực khuẩn ho gà). Khẳng định bằng PCR hô hấp; điều trị sớm bằng Azithromycin.',
              en: 'Identified: Bordetella pertussis (Whooping cough). Confirm via respiratory PCR; treat early with Azithromycin.'
            }
          },
          {
            label: {
              vi: 'Nấm men có vỏ nang trên DNT, Urease (+), thử nghiệm kháng nguyên CrAg LFA (+) -> Cryptococcus neoformans',
              en: 'Encapsulated yeast in CSF, Urease (+), positive CrAg LFA -> Cryptococcus neoformans'
            },
            resultPathogens: ['c_neoformans'],
            conclusion: {
              vi: 'Xác định: Cryptococcus neoformans. Viêm màng não nấm ở bệnh nhân suy giảm miễn dịch; điều trị Amphotericin B + Flucytosine.',
              en: 'Identified: Cryptococcus neoformans. Fungal meningitis in immunocompromised; treat with Amphotericin B + Flucytosine.'
            }
          }
        ]
      },
      fastidious_choc_growers: {
        id: 'fastidious_choc_growers',
        title: {
          vi: 'Bước 2: Phân biệt Haemophilus và Neisseria trên thạch Chocolate',
          en: 'Step 2: Differentiating Haemophilus vs Neisseria'
        },
        description: {
          vi: 'Dựa vào hình thái nhuộm Gram (trực cầu khuẩn mảnh đa hình vs song cầu Gram âm hạt cà phê) và nhu cầu yếu tố X/V.',
          en: 'Based on Gram morphology (pleomorphic coccobacilli vs kidney-bean diplococci) and X/V growth factors.'
        },
        testMethod: 'Gram stain & X, V Factor Quad plates',
        options: [
          {
            label: {
              vi: 'Trực cầu khuẩn Gram âm rất nhỏ, đòi hỏi cả 2 yếu tố X (Hemin) và V (NAD) -> Haemophilus influenzae',
              en: 'Tiny Gram-negative coccobacilli, requires BOTH X and V factors -> Haemophilus influenzae'
            },
            resultPathogens: ['h_influenzae'],
            conclusion: {
              vi: 'Xác định: Haemophilus influenzae. Thử nghiệm Cefinase phát hiện beta-lactamase.',
              en: 'Identified: Haemophilus influenzae. Perform Cefinase disk test for beta-lactamase.'
            }
          },
          {
            label: {
              vi: 'Song cầu Gram âm hạt cà phê, mọc trên Thayer-Martin, lên men Glucose duy nhất -> Neisseria gonorrhoeae',
              en: 'Kidney-bean GNDC, grows on Thayer-Martin, ferments glucose only -> Neisseria gonorrhoeae'
            },
            resultPathogens: ['neisseria_gonorrhoeae'],
            conclusion: {
              vi: 'Xác định: Neisseria gonorrhoeae (Lậu cầu). Điều trị liều đơn Ceftriaxone 500mg tiêm bắp.',
              en: 'Identified: Neisseria gonorrhoeae. Treat with Ceftriaxone 500mg IM.'
            }
          }
        ]
      }
    }
  }
];
