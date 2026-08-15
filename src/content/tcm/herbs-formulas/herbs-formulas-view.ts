/**
 * CliniPortal — TCM Herbs & Formulas SPA View (TypeScript)
 * Path: src/content/tcm/herbs-formulas/herbs-formulas-view.ts
 */

import { HERBS_DATA } from '../data';
import { openHerbModal } from '../renderer';

export function renderHerbsFormulasView(): string {
  const herbsList = Object.entries(HERBS_DATA).map(([id, data]) => ({ id, ...data }));

  const classicalFormulas = [
    {
      name: 'Lục Vị Địa Hoàng Hoàn',
      pinyin: 'Liuwei Dihuang Wan (六味地黄丸)',
      origin: 'Tiểu Nhi Dược Chứng Trực Quyết (Tiền Ất)',
      structure: 'Thục địa (Quân), Sơn thù + Sơn dược (Thần), Trạch tả + Đan bì + Phục linh (Tá/Sứ)',
      actions: 'Tư bổ can thận âm (Tam bổ tam tả)',
      indications: 'Can thận âm hư, lưng đau gối mỏi, triều nhiệt đạo hãn, di tinh, chóng mặt ù tai.'
    },
    {
      name: 'Bát Vị Quế Phụ (Thận Khí Hoàn)',
      pinyin: 'Shenqi Wan (肾气丸)',
      origin: 'Kim Quỹ Yếu Lược (Trương Trọng Cảnh)',
      structure: 'Lục Vị + Quế chi/Nhục quế (1 phần) + Phụ tử chế (1 phần)',
      actions: 'Ôn bổ thận dương, hóa khí hành thủy',
      indications: 'Thận dương bất túc, sợ lạnh tay chân lạnh, đau lưng mỏi gối, tiểu đêm nhiều lần hoặc phù thũng.'
    },
    {
      name: 'Bổ Trung Ích Khí Thang',
      pinyin: 'Buzhong Yiqi Tang (补中益气汤)',
      origin: 'Tỳ Vị Luận (Lý Đông Viên)',
      structure: 'Hoàng kỳ (Quân) + Nhân sâm, Bạch truật, Cam thảo (Thần) + Đương quy, Trần bì (Tá) + Thăng ma, Sài hồ (Sứ)',
      actions: 'Bổ trung ích khí, thăng dương cử hãm',
      indications: 'Tỳ vị khí hư, trung khí hạ hãm (sa dạ dày, sa tử cung, sa trực tràng), sốt do khí hư.'
    },
    {
      name: 'Tứ Vật Thang',
      pinyin: 'Siwu Tang (四物汤)',
      origin: 'Thái Bình Huệ Dân Hòa Tễ Cục Phương',
      structure: 'Thục địa (Quân), Đương quy (Thần), Bạch thược (Tá), Xuyên khung (Sứ)',
      actions: 'Bổ huyết điều huyết (Bài thuốc cơ bản trị mọi chứng huyết hư)',
      indications: 'Huyết hư, sắc mặt xanh xao, hoa mắt chóng mặt, kinh nguyệt không đều, thống kinh.'
    }
  ];

  return `
    <div class="herbs-formulas-container animate-fade-in" style="max-width: 1440px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/tcm" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Y Học Cổ Truyền</a> / Dược Liệu & Phương Tễ
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; color: #16a34a; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-leaf"></i> Thư Viện Dược Vị & Studio Phối Ngũ Phương Tễ
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Tính vị quy kinh (Tứ khí - Ngũ vị), nguyên tắc phối ngũ Quân - Thần - Tá - Sứ và kho bài thuốc cổ phương kinh điển.
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/tcm/huyet-vi" class="btn btn-outline" style="padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-person-dots-from-line" style="color: #0d9488;"></i> Bản Đồ Huyệt Vị
          </a>
        </div>
      </div>

      <!-- Part 1: Featured Herbs Grid -->
      <div style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.3rem; font-weight: 700; color: #16a34a; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          🌿 1. Dược Vị Thường Dùng & Tính Vị Quy Kinh
        </h2>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.25rem;">
          ${herbsList.map(herb => `
            <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                  <span style="font-size: 1.5rem;">${herb.icon}</span>
                  <span style="background: #dcfce7; color: #16a34a; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 4px;">
                    ${herb.pinyin}
                  </span>
                </div>

                <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0 0 0.25rem 0;">
                  ${herb.name}
                </h3>
                <div style="font-size: 0.8rem; font-style: italic; color: #64748b; margin-bottom: 0.5rem;">
                  ${herb.latin}
                </div>

                <div style="background: #f8fafc; border-radius: 6px; padding: 0.6rem; font-size: 0.825rem; color: #334155; margin-bottom: 0.5rem;">
                  <strong>Tính vị:</strong> ${herb.taste}<br>
                  <strong>Quy kinh:</strong> ${herb.meridians}
                </div>

                <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); line-height: 1.4; margin: 0 0 0.5rem 0;">
                  ${herb.actions}
                </p>
              </div>

              <div style="border-top: 1px dashed #e2e8f0; padding-top: 0.75rem; margin-top: 0.5rem;">
                <span style="font-size: 0.75rem; color: #dc2626; font-weight: 600;">⚠️ Kiêng kỵ: ${herb.contra}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Part 2: Classical Formulas (Phương Tễ Cổ Phương) -->
      <div>
        <h2 style="font-size: 1.3rem; font-weight: 700; color: #0284c7; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          📜 2. Các Bài Thuốc Cổ Phương Kinh Điển (Quân - Thần - Tá - Sứ)
        </h2>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1.25rem;">
          ${classicalFormulas.map(f => `
            <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
              <div>
                <span style="font-size: 0.75rem; font-weight: 700; color: #0284c7; background: #e0f2fe; padding: 0.2rem 0.5rem; border-radius: 4px; text-transform: uppercase;">
                  ${f.origin}
                </span>

                <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0.5rem 0 0.25rem 0;">
                  ${f.name}
                </h3>
                <div style="font-size: 0.8rem; color: #64748b; margin-bottom: 0.75rem;">${f.pinyin}</div>

                <div style="background: #f8fafc; border-left: 3px solid #0284c7; padding: 0.6rem 0.75rem; border-radius: 0 6px 6px 0; font-size: 0.825rem; color: #334155; margin-bottom: 0.75rem;">
                  <strong>Phối ngũ:</strong> ${f.structure}
                </div>

                <div style="font-size: 0.85rem; color: #334155; line-height: 1.5;">
                  <strong>Công năng:</strong> ${f.actions}<br>
                  <strong>Chủ trị:</strong> ${f.indications}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
