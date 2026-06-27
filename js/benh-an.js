/**
 * CliniPortal - Kịch bản xử lý Bệnh án Nội khoa (Layout 2 cột)
 * Hỗ trợ Auto-save (localStorage), Quick Select Checkboxes, và Export Bệnh án
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const form = document.getElementById('benhAnForm');
    const previewDocument = document.getElementById('previewDocument');
    
    // Panel Buttons
    const btnPreviewModal = document.getElementById('btnPreviewModal');
    const btnCopyFast = document.getElementById('btnCopyFast');
    const btnClearData = document.getElementById('btnClearData');
    const autoSaveStatus = document.getElementById('autoSaveStatus');
    
    // Modal Elements
    const previewModal = document.getElementById('previewModal');
    const btnCloseModal = document.getElementById('btnCloseModal');
    const btnCopyModal = document.getElementById('btnCopyModal');
    const btnPrintModal = document.getElementById('btnPrintModal');

    // ==========================================
    // 1. AUTO-SAVE LOCALSTORAGE
    // ==========================================
    const STORAGE_KEY = 'cliniportal_benhan_v2_draft';
    let saveTimeout;

    function saveDraft() {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        
        // Hiển thị trạng thái đã lưu
        autoSaveStatus.innerHTML = '<i class="fa-solid fa-check-circle"></i> Đã tự động lưu nháp';
        autoSaveStatus.style.backgroundColor = 'var(--color-success-hl)';
        autoSaveStatus.style.color = 'var(--color-success)';
    }

    function loadDraft() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                Object.keys(data).forEach(key => {
                    const input = form.elements[key];
                    if (input) {
                        input.value = data[key];
                    }
                });
            } catch (e) {
                console.error("Lỗi khôi phục bản nháp:", e);
            }
        }
    }

    // Trigger save on input (debounce)
    form.addEventListener('input', () => {
        autoSaveStatus.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang lưu...';
        autoSaveStatus.style.backgroundColor = 'var(--color-warning-hl)';
        autoSaveStatus.style.color = 'var(--color-warning)';
        
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(saveDraft, 1000);
    });

    btnClearData.addEventListener('click', () => {
        if(confirm("Bạn có chắc chắn muốn xóa toàn bộ dữ liệu đang nhập? Không thể hoàn tác!")) {
            form.reset();
            localStorage.removeItem(STORAGE_KEY);
            // Bỏ chọn tất cả checkbox
            document.querySelectorAll('.q-checkbox input').forEach(chk => chk.checked = false);
            autoSaveStatus.innerHTML = '<i class="fa-solid fa-trash"></i> Đã xóa dữ liệu';
        }
    });

    // ==========================================
    // 2. QUICK SELECT CHECKBOXES
    // ==========================================
    const quickCheckboxes = document.querySelectorAll('.q-checkbox input[type="checkbox"]');
    
    quickCheckboxes.forEach(chk => {
        chk.addEventListener('change', (e) => {
            const targetId = e.target.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            const valueToAdd = e.target.value;
            
            if (targetEl) {
                let currentVal = targetEl.value;
                
                if (e.target.checked) {
                    // Thêm vào textarea
                    if (currentVal.trim() === '') {
                        targetEl.value = valueToAdd;
                    } else {
                        // Nếu chưa có thì mới thêm
                        if (!currentVal.includes(valueToAdd)) {
                            targetEl.value = currentVal + (currentVal.endsWith('\n') ? '' : '\n') + "- " + valueToAdd;
                        }
                    }
                } else {
                    // Xóa khỏi textarea (tìm và xóa dòng chứa giá trị này)
                    const regex = new RegExp(`(^|\\n)-?\\s*${valueToAdd}\\s*($|\\n)`, 'g');
                    let newVal = currentVal.replace(regex, '\n').trim();
                    // Clean up multiple newlines
                    newVal = newVal.replace(/\n{2,}/g, '\n');
                    targetEl.value = newVal;
                }
                
                // Trigger save
                saveDraft();
            }
        });
    });

    // ==========================================
    // 3. COMPILE TO HTML PREVIEW
    // ==========================================
    function getVal(name, fallback = '...') {
        const val = form.elements[name]?.value.trim();
        if (!val) return `<span class="empty-field">${fallback}</span>`;
        // Thay thế newline bằng thẻ <br>
        return val.replace(/\n/g, '<br>');
    }

    function generateMedicalRecord() {
        const html = `
            <h1>BỆNH ÁN NỘI KHOA</h1>
            
            <h2>I. HÀNH CHÍNH</h2>
            <ul>
                <li><strong>Họ và tên:</strong> ${getVal('hoTen')}</li>
                <li><strong>Tuổi (năm sinh):</strong> ${getVal('namSinh')}</li>
                <li><strong>Giới tính:</strong> ${getVal('gioiTinh')}</li>
                <li><strong>Nghề nghiệp:</strong> ${getVal('ngheNghiep', 'Chưa ghi nhận')}</li>
                <li><strong>Địa chỉ:</strong> ${getVal('diaChi')}</li>
                <li><strong>Ngày giờ vào viện:</strong> ${getVal('ngayVaoVien').replace('T', ' ')}</li>
                <li><strong>Khoa điều trị:</strong> ${getVal('khoaDieuTri')}</li>
            </ul>

            <h2>II. LÝ DO VÀO VIỆN</h2>
            <p>${getVal('lyDoVaoVien')}</p>

            <h2>III. BỆNH SỬ</h2>
            <p><strong>1. Diễn tiến bệnh lý:</strong><br/>${getVal('dienTienBenh')}</p>
            <p><strong>2. Tình trạng lúc nhập viện:</strong><br/>${getVal('tinhTrangNhapVien')}</p>
            <p><strong>3. Diễn tiến sau nhập viện:</strong><br/>${getVal('dienTienSauNhapVien')}</p>

            <h2>IV. TIỀN CĂN</h2>
            <h3>1. Bản thân</h3>
            <p><strong>Nội khoa:</strong><br/>${getVal('tienCanNoiKhoa', 'Chưa ghi nhận bệnh lý nội khoa')}</p>
            <p><strong>Ngoại khoa / Sản khoa:</strong><br/>${getVal('tienCanNgoaiKhoa', 'Chưa ghi nhận tiền căn phẫu thuật/ngoại khoa')}</p>
            <p><strong>Thói quen & Dị ứng:</strong><br/>${getVal('thoiQuen', 'Không hút thuốc lá, không uống rượu bia. Chưa ghi nhận tiền căn dị ứng thuốc, thức ăn')}</p>
            <h3>2. Gia đình</h3>
            <p>${getVal('tienCanGiaDinh', 'Chưa ghi nhận bệnh lý liên quan hoặc bệnh lý di truyền')}</p>

            <h2>V. LƯỢT QUA CÁC CƠ QUAN</h2>
            <p>${getVal('luotCoQuan')}</p>

            <h2>VI. KHÁM LÂM SÀNG</h2>
            <h3>1. Tổng quát & Sinh hiệu</h3>
            <p><strong>Tri giác:</strong> ${getVal('khamTriGiac')}</p>
            <p><strong>Sinh hiệu:</strong> 
                Mạch: ${getVal('shMach', '...')} l/p | 
                Huyết áp: ${getVal('shHuyetAp', '...')} mmHg | 
                Nhiệt độ: ${getVal('shNhietDo', '...')} °C | 
                Nhịp thở: ${getVal('shNhipTho', '...')} l/p | 
                SpO2: ${getVal('shSpO2', '...')}
            </p>
            <p><strong>Thể trạng:</strong> Chiều cao: ${getVal('chieuCao', '...')} cm, Cân nặng: ${getVal('canNang', '...')} kg</p>
            <p><strong>Dấu hiệu khác:</strong><br/>${getVal('khamDauHieuKhac')}</p>

            <h3>2. Khám từng vùng</h3>
            <p><strong>Đầu mặt cổ:</strong><br/>${getVal('khamDauMatCo')}</p>
            <p><strong>Lồng ngực - Tim:</strong><br/>${getVal('khamTim')}</p>
            <p><strong>Lồng ngực - Phổi:</strong><br/>${getVal('khamPhoi')}</p>
            <p><strong>Bụng:</strong><br/>${getVal('khamBung')}</p>
            <p><strong>Cơ xương khớp & Thần kinh:</strong><br/>${getVal('khamKhac')}</p>

            <h2>VII. TÓM TẮT & ĐẶT VẤN ĐỀ</h2>
            <p><strong>1. Tóm tắt bệnh án:</strong><br/>${getVal('tomTatBenhAn')}</p>
            <p><strong>2. Đặt vấn đề:</strong><br/>${getVal('datVanDe')}</p>

            <h2>VIII. CHẨN ĐOÁN SƠ BỘ & BIỆN LUẬN</h2>
            <p><strong>1. Chẩn đoán sơ bộ:</strong><br/>${getVal('cdSoBo')}</p>
            <p><strong>2. Chẩn đoán phân biệt:</strong><br/>${getVal('cdPhanBiet', 'Không có')}</p>
            <p><strong>3. Biện luận lâm sàng:</strong><br/>${getVal('bienLuan')}</p>

            <h2>IX. CẬN LÂM SÀNG & ĐIỀU TRỊ</h2>
            <p><strong>1. Đề nghị Cận lâm sàng:</strong><br/>${getVal('deNghiCLS')}</p>
            <p><strong>2. Kết quả CLS đã có:</strong><br/>${getVal('ketQuaCLS', 'Chưa có kết quả')}</p>
            <p><strong>3. Chẩn đoán xác định:</strong><br/>${getVal('cdXacDinh', '...')}</p>
            <p><strong>4. Y lệnh điều trị cụ thể:</strong><br/>${getVal('yLenhDieuTri')}</p>
            <p><strong>5. Tiên lượng:</strong><br/>${getVal('tienLuong', 'Dè dặt')}</p>
        `;

        previewDocument.innerHTML = html;
    }

    // ==========================================
    // 4. MODAL & EXPORT ACTIONS
    // ==========================================
    
    function copyContent() {
        const range = document.createRange();
        range.selectNode(previewDocument);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        try {
            document.execCommand('copy');
            return true;
        } catch (err) {
            console.error('Không thể copy nội dung', err);
            return false;
        } finally {
            window.getSelection().removeAllRanges();
        }
    }

    btnPreviewModal.addEventListener('click', () => {
        saveDraft(); // Chắc chắn đã lưu
        generateMedicalRecord();
        previewModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Chống cuộn body
    });

    btnCloseModal.addEventListener('click', () => {
        previewModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Đóng modal khi bấm ra ngoài
    previewModal.addEventListener('click', (e) => {
        if(e.target === previewModal) {
            previewModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    btnCopyFast.addEventListener('click', () => {
        saveDraft();
        generateMedicalRecord();
        if (copyContent()) {
            const originalText = btnCopyFast.innerHTML;
            btnCopyFast.innerHTML = '<i class="fa-solid fa-check"></i> ĐÃ COPY THÀNH CÔNG';
            btnCopyFast.classList.add('btn-success');
            btnCopyFast.classList.remove('btn-outline');
            setTimeout(() => { 
                btnCopyFast.innerHTML = originalText;
                btnCopyFast.classList.remove('btn-success');
                btnCopyFast.classList.add('btn-outline');
            }, 2000);
        } else {
            alert('Lỗi: Trình duyệt không hỗ trợ copy tự động.');
        }
    });

    btnCopyModal.addEventListener('click', () => {
        if (copyContent()) {
            const originalText = btnCopyModal.innerHTML;
            btnCopyModal.innerHTML = '<i class="fa-solid fa-check"></i> Đã Copy';
            setTimeout(() => { btnCopyModal.innerHTML = originalText; }, 2000);
        }
    });

    btnPrintModal.addEventListener('click', () => {
        window.print();
    });

    // ==========================================
    // 5. KHỞI ĐỘNG
    // ==========================================
    loadDraft();
});
