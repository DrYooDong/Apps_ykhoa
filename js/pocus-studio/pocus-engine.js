/**
 * eFAST POCUS & Emergency Procedures Engine
 * Core Clinical Logic for Emergency Bedside Ultrasound & Invasive Procedures
 * CliniPortal Design System
 */

(function (global) {
  'use strict';

  const PocusEngine = {
    /**
     * Analyze eFAST 7-Window Findings
     */
    analyzeEfast(windows) {
      const ruq = !!windows.ruq;
      const luq = !!windows.luq;
      const pelvis = !!windows.pelvis;
      const pericardial = !!windows.pericardial;
      const r_pleura = !!windows.r_pleura;
      const l_pleura = !!windows.l_pleura;
      const ivc_collapsible = !!windows.ivc_collapsible;

      const posCount = (ruq ? 1 : 0) + (luq ? 1 : 0) + (pelvis ? 1 : 0) + 
                       (pericardial ? 1 : 0) + (r_pleura ? 1 : 0) + (l_pleura ? 1 : 0);

      const isPositive = posCount > 0;
      let summary = '✅ eFAST Âm tính (Chưa phát hiện dịch tự do ổ bụng / màng tim / màng phổi).';
      let priority = 'Low';
      let actionRecommendation = 'Tiếp tục theo dõi lâm sàng & Làm lại eFAST nếu sinh hiệu thay đổi.';

      if (isPositive) {
        priority = 'High';
        summary = `🚨 eFAST DƯƠNG TÍNH (${posCount}/6 Cửa Sổ Tìm Thấy Dịch Tự Do / Bất Thường).`;

        const details = [];
        if (ruq) details.push('Khoang Morrison (Hạ sườn R)');
        if (luq) details.push('Khoang Lách-Thận (Hạ sườn L)');
        if (pelvis) details.push('Túi cùng Hạ vị / Bàng quang');
        if (pericardial) details.push('Tràn dịch Màng tim');
        if (r_pleura) details.push('Tràn dịch/khí Màng phổi Phải');
        if (l_pleura) details.push('Tràn dịch/khí Màng phổi Trái');

        actionRecommendation = `🔴 Phát hiện dịch tự do tại: ${details.join(', ')}. Cần Hội chẩn Ngoại khoa Cấp cứu / Can thiệp Mạch ngay!`;
      }

      // IVC Assessment
      let ivcStatus = ivc_collapsible 
        ? 'IVC Xẹp > 50% theo hô hấp (Tăng đáp ứng bù dịch / CVP Thấp < 5 mmHg)' 
        : 'IVC Giãn > 2.1 cm, Xẹp < 50% (CVP Cao > 10-15 mmHg / Nguy cơ Chèn ép tim / Suy thất phải)';

      return {
        ruq, luq, pelvis, pericardial, r_pleura, l_pleura, ivc_collapsible,
        posCount, isPositive, summary, priority, actionRecommendation, ivcStatus
      };
    },

    /**
     * Analyze RUSH Protocol (Rapid Ultrasound in Shock)
     */
    analyzeRush(data) {
      const pump = data.pump || 'normal'; // normal, impaired_ef, pericardial_tamponade, rv_dilation
      const tank = data.tank || 'normal'; // normal, hypovolemic_empty, hypervolemic_full, tension_pneumo
      const pipes = data.pipes || 'normal'; // normal, aaa, dvt

      let shockType = 'Không xác định / Sốc hỗn hợp';
      let rushRecommendation = 'Thực hiện khảo sát toàn diện 3 thành phần Bơm (Pump) - Bình (Tank) - Đường ống (Pipes).';

      if (pump === 'pericardial_tamponade' || tank === 'tension_pneumo') {
        shockType = '🚨 SỐC TẮC NGHẼN (Obstructive Shock)';
        rushRecommendation = pump === 'pericardial_tamponade' 
          ? '🔴 Chỉ định Chọc dò màng tim cấp cứu khẩn (Pericardiocentesis)!'
          : '🔴 Chỉ định Giải áp kim khẩn / Đặt Dẫn lưu màng phổi (Chest Tube)!';
      } else if (pump === 'impaired_ef' || pump === 'rv_dilation') {
        shockType = '🫀 SỐC TIM (Cardiogenic Shock)';
        rushRecommendation = 'Khởi động Thuốc tăng co bóp cơ tim (Dobutamine / Epinephrine) & Cân nhắc Hỗ trợ tuần hoàn cơ học (IABP/VA-ECMO).';
      } else if (tank === 'hypovolemic_empty' || pipes === 'aaa') {
        shockType = '🩸 SỐC GIẢM THỂ TÍCH / XUẤT HUYẾT (Hypovolemic / Hemorrhagic Shock)';
        rushRecommendation = 'Kích hoạt Phác đồ Truyền máu Khối lượng lớn (MTP 1:1:1) & Kiểm soát nguồn chảy máu.';
      } else if (tank === 'hypervolemic_full' && pump === 'normal') {
        shockType = '🦠 SỐC PHÂN BỐ / SỐC NHIỄM KHUẨN (Distributive / Septic Shock)';
        rushRecommendation = 'Khởi động Norepinephrine duy trì MAP >= 65 mmHg & Dùng Kháng sinh phổ rộng IV (Hour-1 Bundle).';
      }

      return {
        pump, tank, pipes, shockType, rushRecommendation
      };
    },

    /**
     * Bedside Procedure Guidance & Safety Checklists
     */
    getProcedureGuidance(procedureType) {
      const guides = {
        chest_tube: {
          title: '📌 Đặt Dẫn Lưu Màng Phổi (Chest Tube Insertion)',
          indication: 'Tràn máu / Tràn khí màng phổi áp lực / Tràn mủ màng phổi.',
          landmark: 'Khoang liên sườn 4 - 5 trên đường nách giữa hoặc nách trước (Safe Triangle).',
          sizeGuide: 'Khí màng phổi: 16 - 24 Fr. Máu / Dịch đặc: 28 - 36 Fr.',
          steps: [
            '1. Sát trùng rộng, gây tê từng lớp bờ trên xương sườn dưới (tránh bó mạch thần kinh gian sườn).',
            '2. Rạch da 2-3 cm, dùng panh kẹp tích tách mô cơ ngực đến lá thành màng phổi.',
            '3. Dùng đầu ngón tay kiểm tra khoang màng phổi (Finger thoracostomy) để dính/tổn thương.',
            '4. Đưa ống dẫn lưu hướng lên trên ra sau (cho khí) hoặc xuống dưới ra sau (cho máu).',
            '5. Cố định ống bằng mũi khâu con rết (Purse-string / Mattress) & Nối hệ thống hút âm continuous.'
          ]
        },
        pericardiocentesis: {
          title: '📌 Chọc Dò Màng Tim Cấp Cứu (Pericardiocentesis)',
          indication: 'Tràn dịch màng tim gây Chèn ép tim cấp (Cardiac Tamponade / Tụt HA / Tam chứng Beck).',
          landmark: 'Dưới mũi ức (Subxiphoid) nghiêng 45 độ so với mặt da, hướng về vai trái.',
          sizeGuide: 'Kim chọc dò 18G dài 8-12 cm + Catheter dẫn lưu pigtail.',
          steps: [
            '1. Chuẩn bị đầu dò siêu âm tim hướng dẫn trực tiếp (hoặc gắn chuyển đạo V1 ECG vào thân kim).',
            '2. Đâm kim vừa đâm vừa hút nhẹ đến khi ra máu màng tim/dịch sẫm màu.',
            '3. Luồn Guidewire qua kim, rút kim và nong đường hầm.',
            '4. Luồn catheter pigtail xả 100-200 mL dịch giải áp cấp cứu (HA sẽ tăng lại ngay).',
            '5. Cố định catheter và gửi dịch làm xét nghiệm tế bào / vi sinh.'
          ]
        },
        cvc_ultrasound: {
          title: '📌 Đặt Tĩnh Mạch Trung Tâm Dưới Siêu Âm (US-guided CVC)',
          indication: 'Cần truyền thuốc vận mạch, bù dịch tốc độ cao, đo CVP hoặc nuôi dưỡng tĩnh mạch.',
          landmark: 'Tĩnh mạch cảnh trong (IJV) hoặc Tĩnh mạch đùi (Femoral) dưới đầu dò siêu âm phẳng (Linear).',
          sizeGuide: 'Catheter 7 Fr 3 nòng (Triple lumen) dài 16-20 cm.',
          steps: [
            '1. Bọc đầu dò siêu âm vô trùng hoàn toàn. Định vị TM cảnh trong nằm nông hơn và đè xẹp được so với ĐM cảnh.',
            '2. Gây tê tại chỗ. Chọc kim under real-time ultrasound guidance (Out-of-plane hoặc In-plane).',
            '3. Thấy máu tĩnh mạch trào ngược, luồn Guidewire nhẹ nhàng (Không được cưỡng ép).',
            '4. Xạ siêu âm xác định Guidewire nằm đúng trong lòng tĩnh mạch.',
            '5. Nong da, đặt Catheter CVC, rút Guidewire, bơm rửa 3 nòng & Cố định.'
          ]
        }
      };

      return guides[procedureType] || guides.chest_tube;
    }
  };

  global.PocusEngine = PocusEngine;
})(typeof window !== 'undefined' ? window : this);
