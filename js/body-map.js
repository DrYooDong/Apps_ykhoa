/**
 * CliniPortal - Body Map Interactive Logic
 * Handles anatomy region selection, symptom filtering, and navigation.
 */
document.addEventListener('DOMContentLoaded', () => {
    const regionPaths = document.querySelectorAll('.body-region');
    const panelCard = document.getElementById('symptomsPanelCard');

    if (!regionPaths || !panelCard) return;

    const regionData = {
        'head-neck': {
            title: "Vùng Đầu - Mặt - Cổ",
            icon: "fa-head-side-virus",
            symptoms: [
                { id: "daudau", name: "Đau đầu", url: "2. Triệu chứng/Than phiền Thần kinh - Cơ xương khớp/TC_Daudau.html" },
                { id: "chongmat", name: "Chóng mặt", url: "2. Triệu chứng/Than phiền Thần kinh - Cơ xương khớp/TC_Chongmat.html" },
                { id: "cogiat", name: "Co giật / Động kinh", url: "2. Triệu chứng/Than phiền Thần kinh - Cơ xương khớp/TC_Cogiat.html" },
                { id: "khoioco", name: "Khối u / Khối ở cổ", url: "2. Triệu chứng/Than phiền Toàn thân/TC_Khoioco.html" }
            ]
        },
        'chest': {
            title: "Lồng Ngực & Tim Phổi",
            icon: "fa-heart-pulse",
            symptoms: [
                { id: "daunguc", name: "Đau ngực", url: "2. Triệu chứng/Than phiền Hô hấp - Tim mạch/TC_Daunguc.html" },
                { id: "khotho", name: "Khó thở", url: "2. Triệu chứng/Than phiền Hô hấp - Tim mạch/TC_Khotho.html" },
                { id: "horamau", name: "Ho ra máu", url: "2. Triệu chứng/Than phiền Hô hấp - Tim mạch/TC_Horamau.html" },
                { id: "hoihop", name: "Hồi hộp / Đánh trống ngực", url: "2. Triệu chứng/Than phiền Hô hấp - Tim mạch/TC_Hoihop.html" },
                { id: "ho", name: "Ho", url: "2. Triệu chứng/Than phiền Hô hấp - Tim mạch/TC_Ho.html" },
                { id: "khokhe", name: "Khò khè", url: "2. Triệu chứng/Than phiền Hô hấp - Tim mạch/TC_Khokhe.html" }
            ]
        },
        'abdomen': {
            title: "Vùng Bụng & Tiêu Hóa - Gan Mật",
            icon: "fa-stomach",
            symptoms: [
                { id: "daubung", name: "Đau bụng", url: "2. Triệu chứng/Than phiền Tiêu hóa - Bụng/Đau bụng/TC_Daubung.html" },
                { id: "buonnon", name: "Nôn ói", url: "2. Triệu chứng/Than phiền Tiêu hóa - Bụng/TC_Nonoi.html" },
                { id: "tieuchay", name: "Tiêu chảy", url: "2. Triệu chứng/Than phiền Tiêu hóa - Bụng/TC_Tieuchay.html" },
                { id: "xuathuyettieuhoa", name: "Nôn máu / Phân đen", url: "2. Triệu chứng/Than phiền Tiêu hóa - Bụng/TC_Xuathuyettieuhoa.html" },
                { id: "vangda", name: "Vàng da", url: "2. Triệu chứng/Than phiền Toàn thân/TC_Vangda.html" },
                { id: "bangbung", name: "Báng bụng (Cổ trướng)", url: "2. Triệu chứng/Than phiền Tiêu hóa - Bụng/TC_Bangbung.html" },
                { id: "nuotkho", name: "Nuốt khó / Nghẹn", url: "2. Triệu chứng/Than phiền Tiêu hóa - Bụng/TC_Nuotkho.html" },
                { id: "taobon", name: "Táo bón", url: "2. Triệu chứng/Than phiền Tiêu hóa - Bụng/TC_Taobon.html" }
            ]
        },
        'pelvis-urinary': {
            title: "Hạ Vị & Thận Niệu - Sinh Dục",
            icon: "fa-toilet",
            symptoms: [
                { id: "tieumau", name: "Tiểu máu", url: "2. Triệu chứng/Than phiền Thận niệu - Sinh dục/TC_Tieumau.html" },
                { id: "tieubuot", name: "Tiểu buốt / Tiểu rắt", url: "2. Triệu chứng/Than phiền Thận niệu - Sinh dục/TC_Tieubuot.html" }
            ]
        },
        'extremities': {
            title: "Tứ Chi & Mạch Máu - Da Liễu",
            icon: "fa-hand",
            symptoms: [
                { id: "phu", name: "Phù chi / Phù mặt", url: "2. Triệu chứng/Than phiền Toàn thân/TC_Phu.html" },
                { id: "nguada", name: "Ngứa da / Mề đay", url: "2. Triệu chứng/Than phiền Toàn thân/TC_Nguada.html" },
                { id: "haduonghuyet", name: "Tay run / Vã mồ hôi", url: "2. Triệu chứng/Than phiền Toàn thân/TC_Haduonghuyet.html" },
                { id: "thieumau", name: "Da niêm nhợt (Thiếu máu)", url: "3. Cận lâm sàng/TC_Thieumau.html" }
            ]
        }
    };

    function renderRegionDetail(key) {
        const data = regionData[key] || regionData['head-neck'];

        let html = `
            <div class="region-detail-header">
                <i class="fa-solid ${data.icon}"></i> ${data.title}
            </div>
            <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 20px;">
                Tìm thấy <strong>${data.symptoms.length} triệu chứng lâm sàng chính</strong> thuộc khu vực giải phẫu này:
            </p>
            <div class="symptom-items-list">
                ${data.symptoms.map(s => {
                    const symInfo = (typeof symptomData !== 'undefined' && symptomData[s.id]) ? symptomData[s.id] : { icon: 'fa-stethoscope' };
                    return `
                    <div class="symptom-item-card">
                        <div class="symptom-item-info">
                            <div class="symptom-item-icon"><i class="fa-solid ${symInfo.icon || 'fa-stethoscope'}"></i></div>
                            <div class="symptom-item-name">${s.name}</div>
                        </div>
                        <div class="symptom-item-actions">
                            <a href="ma-tran-trieu-chung.html?s=${s.id}" class="action-chip-btn btn-matrix" title="Lọc trong Ma Trận Triệu Chứng">
                                <i class="fa-solid fa-network-wired"></i> Ma trận
                            </a>
                            <a href="${s.url}" class="action-chip-btn btn-approach" title="Mở lưu đồ tiếp cận chi tiết">
                                <i class="fa-solid fa-book-open"></i> Lưu đồ
                            </a>
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
        `;

        panelCard.innerHTML = html;
    }

    regionPaths.forEach(path => {
        path.addEventListener('click', () => {
            regionPaths.forEach(p => p.classList.remove('active'));
            path.classList.add('active');
            const regionKey = path.getAttribute('data-region');
            renderRegionDetail(regionKey);
        });
    });

    // Default render
    renderRegionDetail('head-neck');
});
