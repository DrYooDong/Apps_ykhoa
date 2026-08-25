/**
 * eFAST POCUS & Emergency Procedures Preset Scenarios
 * CliniPortal Design System
 */

(function (global) {
  'use strict';

  const PocusScenarios = [
    {
      id: 'sc1_trauma_efast_pos',
      title: '🚨 Ca 1: Sốc Chấn Thương + eFAST DƯƠNG TÍNH Khoang Morrison & Màng Phổi',
      desc: 'Nam 24 tuổi, Tai nạn giao thông, HA 80/50 mmHg, eFAST phát hiện dịch tự do khoang Morrison & Khí màng phổi R.',
      badgeClass: 'sc-danger',
      data: {
        ruq: true,
        luq: false,
        pelvis: true,
        pericardial: false,
        r_pleura: true,
        l_pleura: false,
        ivc_collapsible: true,
        pump: 'normal',
        tank: 'hypovolemic_empty',
        pipes: 'normal',
        procedureSelect: 'chest_tube'
      }
    },
    {
      id: 'sc2_cardiac_tamponade',
      title: '🚨 Ca 2: Tràn Dịch Màng Tim Cấp Cứu Chèn Ép Tim (Cardiac Tamponade)',
      desc: 'Nữ 62 tuổi, Đau ngực dữ dội, Tụt HA 75/45 mmHg, Tam chứng Beck, POCUS thấy dịch màng tim lượng nhiều & IVC giãn không xẹp.',
      badgeClass: 'sc-danger',
      data: {
        ruq: false,
        luq: false,
        pelvis: false,
        pericardial: true,
        r_pleura: false,
        l_pleura: false,
        ivc_collapsible: false,
        pump: 'pericardial_tamponade',
        tank: 'hypervolemic_full',
        pipes: 'normal',
        procedureSelect: 'pericardiocentesis'
      }
    },
    {
      id: 'sc3_ruptured_aaa',
      title: '🚨 Ca 3: Vỡ Phình Động Mạch Chủ Bụng (Ruptured AAA)',
      desc: 'Nam 72 tuổi, Đau lưng bụng đột ngột, Sốc tụt HA, POCUS phát hiện ĐM chủ bụng giãn 5.8 cm & Dịch tự do ổ bụng.',
      badgeClass: 'sc-purple',
      data: {
        ruq: true,
        luq: false,
        pelvis: true,
        pericardial: false,
        r_pleura: false,
        l_pleura: false,
        ivc_collapsible: true,
        pump: 'normal',
        tank: 'hypovolemic_empty',
        pipes: 'aaa',
        procedureSelect: 'cvc_ultrasound'
      }
    },
    {
      id: 'sc4_massive_pe_rv_strain',
      title: '🚨 Ca 4: Thuyên Tắc Phổi Diện Rộng + D-Sign Thất Phải',
      desc: 'Nữ 48 tuổi, Khó thở đột ngột sau phẫu thuật, Sốc tụt HA, POCUS thấy Thất phải giãn D-sign & Huyết khối DVT đùi.',
      badgeClass: 'sc-amber',
      data: {
        ruq: false,
        luq: false,
        pelvis: false,
        pericardial: false,
        r_pleura: false,
        l_pleura: false,
        ivc_collapsible: false,
        pump: 'rv_dilation',
        tank: 'hypervolemic_full',
        pipes: 'dvt',
        procedureSelect: 'cvc_ultrasound'
      }
    },
    {
      id: 'sc5_septic_shock_ivc',
      title: '🦠 Ca 5: Sốc Nhiễm Khuẩn + IVC Xẹp > 50% (Tăng Đáp Ứng Dịch)',
      desc: 'Nam 65 tuổi, Sốc nhiễm khuẩn phổi, HA 85/50 mmHg, POCUS thấy IVC xẹp hoàn toàn khi hít vào (> 50%). Chỉ định bù dịch cấp.',
      badgeClass: 'sc-teal',
      data: {
        ruq: false,
        luq: false,
        pelvis: false,
        pericardial: false,
        r_pleura: true,
        l_pleura: false,
        ivc_collapsible: true,
        pump: 'normal',
        tank: 'hypervolemic_full',
        pipes: 'normal',
        procedureSelect: 'cvc_ultrasound'
      }
    }
  ];

  global.PocusScenarios = PocusScenarios;
})(typeof window !== 'undefined' ? window : this);
