/**
 * CliniPortal — Provenance & Clinical Auditability Engine
 * Features:
 * - Evidence Badge Tooltips & Details (Class I, IIa, IIb, III, Expert Consensus)
 * - Provenance Audit Bar integration
 * - Clinical Changelog & Revision History Drawer
 */

(function () {
  'use strict';

  const EBM_EXPLANATIONS = {
    'class-1': {
      title: 'Khuyến cáo Mức I (Class I)',
      badge: 'Chỉ định Mạnh · Mức IA/IB',
      desc: 'Bằng chứng và/hoặc đồng thuận chung khẳng định phương pháp điều trị/thủ thuật này mang lại lợi ích vượt trội so với rủi ro và <strong>BẮT BUỘC / NÊN THỰC HIỆN</strong> trong thực hành lâm sàng tiêu chuẩn.'
    },
    'class-2a': {
      title: 'Khuyến cáo Mức IIa (Class IIa)',
      badge: 'Nên xem xét · Lợi ích > Rủi ro',
      desc: 'Trọng lượng bằng chứng và ý kiến chuyên gia nghiêng về tính hữu ích và hiệu quả. Bác sĩ <strong>NÊN XEM XÉT ÁP DỤNG</strong> cho đa số bệnh nhân phù hợp.'
    },
    'class-2b': {
      title: 'Khuyến cáo Mức IIb (Class IIb)',
      badge: 'Có thể cân nhắc · Lợi ích ≥ Rủi ro',
      desc: 'Tính hữu ích và hiệu quả chưa được xác lập chắc chắn bằng chứng cứ rõ ràng. <strong>CÓ THỂ CÂN NHẮC</strong> dựa trên cá thể hóa lâm sàng.'
    },
    'class-3': {
      title: 'Khuyến cáo Mức III (Class III)',
      badge: 'Chống chỉ định / Nguy hại · Harm',
      desc: 'Bằng chứng hoặc đồng thuận chung cho thấy phương pháp điều trị/thủ thuật này không hữu ích/không hiệu quả hoặc <strong>CÓ THỂ GÂY NGUY HẠI CHO BỆNH NHÂN</strong>. <strong>KHÔNG ĐƯỢC CHỈ ĐỊNH</strong>.'
    },
    'expert-opinion': {
      title: 'Đồng thuận Chuyên gia (Expert Consensus)',
      badge: 'Ý kiến Chuyên môn · Level C-EO',
      desc: 'Khuyến cáo dựa trên sự đồng thuận của hội đồng chuyên gia, nghiên cứu ca bệnh hoặc thực hành chuẩn khi chưa có các thử nghiệm lâm sàng ngẫu nhiên có đối chứng (RCT) quy mô lớn.'
    }
  };

  const ClinicalProvenance = {
    init() {
      this.initEvidenceBadgeTriggers();
      this.initChangelogTriggers();
    },

    initEvidenceBadgeTriggers() {
      document.addEventListener('click', (e) => {
        const badge = e.target.closest('.eb-badge');
        if (!badge) return;

        // Determine class type
        let type = 'class-1';
        if (badge.classList.contains('class-2a') || badge.classList.contains('class-iia')) type = 'class-2a';
        else if (badge.classList.contains('class-2b') || badge.classList.contains('class-iib')) type = 'class-2b';
        else if (badge.classList.contains('class-3') || badge.classList.contains('class-iii') || badge.classList.contains('contraindicated')) type = 'class-3';
        else if (badge.classList.contains('expert-opinion') || badge.classList.contains('expert-consensus')) type = 'expert-opinion';

        const info = EBM_EXPLANATIONS[type] || EBM_EXPLANATIONS['class-1'];
        const customTitle = badge.getAttribute('data-evidence-title') || info.title;
        const customContent = badge.getAttribute('data-evidence-desc') || info.desc;
        const guidelineRef = badge.getAttribute('data-guideline-ref') || '';

        let fullContent = `<p>${customContent}</p>`;
        if (guidelineRef) {
          fullContent += `<div style="margin-top:1rem; padding:0.75rem; background:var(--color-surface-2); border-radius:6px; border:1px solid var(--color-border); font-size:0.85rem;">
            <strong>Tài liệu Dẫn chiếu:</strong> ${guidelineRef}
          </div>`;
        }

        if (window.ClinicalNonIntrusive && typeof window.ClinicalNonIntrusive.openDrawer === 'function') {
          e.preventDefault();
          window.ClinicalNonIntrusive.openDrawer({
            title: customTitle,
            badge: info.badge,
            content: fullContent
          });
        }
      });
    },

    initChangelogTriggers() {
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-view-changelog, [data-action="view-changelog"]');
        if (!btn) return;
        e.preventDefault();

        const targetId = btn.getAttribute('data-changelog-target');
        let changelogHtml = '';

        if (targetId) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) changelogHtml = targetEl.innerHTML;
        } else {
          // Check inline template in page
          const tpl = document.querySelector('#clinicalChangelogTemplate');
          if (tpl) {
            changelogHtml = tpl.innerHTML;
          } else {
            changelogHtml = `
              <div class="clinical-changelog-timeline">
                <div class="changelog-item">
                  <div class="changelog-header">
                    <span class="changelog-version">Phiên bản Cập nhật 2024–2025</span>
                    <span class="changelog-date">Tháng 08/2025</span>
                  </div>
                  <div class="changelog-desc">Cập nhật theo đồng thuận mới nhất của Hội Tim Mạch / Y học Chứng cứ quốc tế.</div>
                  <div class="changelog-diff">
                    <div class="diff-row new">
                      <span class="diff-badge">Mới</span>
                      <span>Bổ sung nhóm thuốc SGLT2i vào điều trị nền tảng (Class I, Level A).</span>
                    </div>
                    <div class="diff-row old">
                      <span class="diff-badge">Cũ</span>
                      <span>Phác đồ trước 2021 chỉ ưu tiên 3 trụ cột (ACEi/ARNI, Beta-blocker, MRA).</span>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }
        }

        if (window.ClinicalNonIntrusive && typeof window.ClinicalNonIntrusive.openDrawer === 'function') {
          window.ClinicalNonIntrusive.openDrawer({
            title: 'Lịch sử Thay đổi Phác đồ',
            badge: 'Audit Trail',
            content: changelogHtml
          });
        }
      });
    }
  };

  window.ClinicalProvenance = ClinicalProvenance;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ClinicalProvenance.init());
  } else {
    ClinicalProvenance.init();
  }
})();
