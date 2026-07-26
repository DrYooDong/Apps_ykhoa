/**
 * Physio Smart Glossary Engine (physio-glossary.js)
 * Module Sinh lý - Sinh lý bệnh | CliniPortal
 * Tự động tạo tooltip từ điển y khoa thông minh khi hover vào .term-hl
 */

(function () {
    'use strict';

    const DICTIONARY = {
        'RAAS': {
            title: 'Hệ Renin-Angiotensin-Aldosterone System (RAAS)',
            desc: 'Hệ thống nội tiết-tín hiệu điều hòa huyết áp và cân bằng thể tích dịch ngoại bào. Hoạt hóa khi huyết áp hoặc dòng máu đến thận giảm.'
        },
        'Renin': {
            title: 'Enzyme Renin',
            desc: 'Dịch tiết từ phức hợp cạnh cầu thận (JGA) khi áp suất động mạch đến giảm hoặc nồng độ Na⁺ ở vết đặc giảm, chuyển Angiotensinogen thành Angiotensin I.'
        },
        'OCT': {
            title: 'Chụp cắt lớp quang học nội mạch (Optical Coherence Tomography)',
            desc: 'Kỹ thuật hình ảnh học độ phân giải siêu cao (10-15 μm) trong lòng mạch vành giúp đánh giá chi tiết độ dày vỏ xơ và nứt vỡ mảng xơ vữa.'
        },
        'IVUS': {
            title: 'Siêu âm trong lòng mạch (Intravascular Ultrasound)',
            desc: 'Kỹ thuật dùng đầu dò siêu âm nhỏ trong lòng mạch vành giúp đo đường kính lòng mạch và tải trọng mảng xơ vữa.'
        },
        'Surfactant': {
            title: 'Chất hoạt tan phế nang (Surfactant)',
            desc: 'Phức hợp Dipalmitoylphosphatidylcholine do tế bào phế nang týp II tiết ra, giúp giảm sức căng bề mặt phế nang và ngăn xẹp phổi.'
        },
        'Nicotinic ACh': {
            title: 'Thụ thể Acetylcholine Nicotinic (nAChR)',
            desc: 'Thụ thể kênh ion ligand-gated nằm tại hạch thực vật và dĩa tận cùng thần kinh-cơ. Cho dòng Na⁺ đi vào gây khử cực cực nhanh.'
        },
        'Acetylcholinesterase': {
            title: 'Enzyme Acetylcholinesterase (AChE)',
            desc: 'Enzyme tại khe synapse phân hủy Acetylcholine thành Choline và Acetate trong vài miligiây để chấm dứt tín hiệu thần kinh.'
        }
    };

    function initGlossary() {
        const terms = document.querySelectorAll('.term-hl, .term-hl-secondary');
        if (!terms.length) return;

        let tooltipEl = document.getElementById('physio-glossary-tooltip');
        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'physio-glossary-tooltip';
            tooltipEl.className = 'physio-glossary-tooltip';
            document.body.appendChild(tooltipEl);
        }

        terms.forEach(term => {
            const rawText = term.textContent.trim();
            const info = DICTIONARY[rawText];

            if (info) {
                term.setAttribute('data-has-glossary', 'true');
                term.addEventListener('mouseenter', (e) => showTooltip(e, info, tooltipEl));
                term.addEventListener('mousemove', (e) => positionTooltip(e, tooltipEl));
                term.addEventListener('mouseleave', () => hideTooltip(tooltipEl));
            }
        });
    }

    function showTooltip(e, info, tooltipEl) {
        tooltipEl.innerHTML = `
            <div class="tooltip-header">📖 ${info.title}</div>
            <div class="tooltip-body">${info.desc}</div>
        `;
        tooltipEl.classList.add('visible');
        positionTooltip(e, tooltipEl);
    }

    function positionTooltip(e, tooltipEl) {
        const x = e.clientX;
        const y = e.clientY;
        const width = 280;

        let left = x + 15;
        let top = y + 15;

        if (left + width > window.innerWidth - 20) {
            left = x - width - 15;
        }

        tooltipEl.style.left = `${left}px`;
        tooltipEl.style.top = `${top}px`;
    }

    function hideTooltip(tooltipEl) {
        tooltipEl.classList.remove('visible');
    }

    document.addEventListener('DOMContentLoaded', initGlossary);
})();
