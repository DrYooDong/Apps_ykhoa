<!--CÁCH TẠO NÚT XỔ THÔNG TIN TỪ CARD BẤT KỲ---->  
<!-- Ví dụ một Node trong Flowchart -->
<div class="flow-node interactive-node">
    <!-- Phần Header: Luôn hiển thị, đóng vai trò là nút bấm -->
    <div class="node-header" onclick="toggleNodeDetails(this)">
        <div class="node-icon">🫁</div>
        <div class="node-title">Khó thở cấp</div>
        <div class="toggle-indicator">▼</div>
    </div>

<!-- Phần Details: Ẩn mặc định, sẽ xổ ra khi click -->
<div class="node-details">
        <div class="details-content">
                <h4>Thông tin lâm sàng:</h4>
                <ul>
                    <li><strong>Tần số thở:</strong> > 30 lần/phút</li>
                    <li><strong>Spo2:</strong> < 90% khí phòng</li>
                    <li><strong>Dấu hiệu:</strong> Co kéo cơ hô hấp, tím tái</li>
                </ul>
                <div class="action-buttons">
                    <button class="btn-action" onclick="alert('Chuyển đến module X-quang')">Xem X-quang</button>
                    <button class="btn-action" onclick="alert('Chuyển đến module Khí máu')">Xét nghiệm KMAB</button>
                </div>
            </div>
        </div>
        
<!-- Đường nối xuống dưới (nếu có) -->
<div class="connector-line"></div>
    </div>

<style>
    /* Cấu trúc cơ bản của Node */
    .flow-node {
        position: relative;
        width: 280px;
        margin: 0 auto 40px auto; /* Khoảng cách giữa các node */
        z-index: 2;
    }

    /* Phần Header - Giao diện như một cái Card */
    .node-header {
        background: #fff;
        border: 2px solid #007bff;
        border-radius: 8px;
        padding: 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        user-select: none;
    }

    .node-header:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        background-color: #f0f8ff;
    }

    .node-header.active {
        background-color: #e6f2ff;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom: none; /* Tạo cảm giác liền mạch với nội dung bên dưới */
    }

    .node-title {
        font-weight: bold;
        color: #333;
        flex-grow: 1;
    }

    .toggle-indicator {
        font-size: 12px;
        transition: transform 0.3s ease;
    }

    .node-header.active .toggle-indicator {
        transform: rotate(180deg);
    }

    /* Phần Details - Ẩn mặc định */
    .node-details {
        max-height: 0;
        overflow: hidden;
        background: #fff;
        border: 2px solid #007bff;
        border-top: none;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
    }

    .node-details.open {
        opacity: 1;
        /* Max-height sẽ được set bằng JS để khớp nội dung */
    }

    .details-content {
        padding: 15px;
        font-size: 14px;
        color: #555;
        line-height: 1.5;
    }

    .details-content h4 {
        margin-top: 0;
        color: #007bff;
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
    }

    .details-content ul {
        padding-left: 20px;
        margin-bottom: 15px;
    }

    .action-buttons {
        display: flex;
        gap: 10px;
        margin-top: 10px;
    }

    .btn-action {
        flex: 1;
        padding: 8px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        transition: background 0.2s;
    }

    .btn-action:hover {
        background: #0056b3;
    }

    /* Đảm bảo đường nối (connector) nằm dưới cùng của node */
    .connector-line {
        position: absolute;
        left: 50%;
        bottom: -40px; /* Chiều dài khoảng cách đến node sau */
        width: 2px;
        height: 40px;
        background: #ccc;
        transform: translateX(-50%);
        z-index: 1;
    }
    
    /* Nếu node đang mở, đường nối vẫn phải xuất phát từ đáy của phần details */
    .flow-node:last-child .connector-line {
        display: none;
    }
</style>

<script>
    function toggleNodeDetails(headerElement) {
        const node = headerElement.parentElement;
        const details = node.querySelector('.node-details');
        const isActive = headerElement.classList.contains('active');

        // 1. Đóng tất cả các node khác (Chế độ Accordion - Chỉ mở 1 tại 1 thời điểm)
        // Bỏ qua vòng lặp này nếu bạn muốn cho phép mở nhiều node cùng lúc
        document.querySelectorAll('.node-header.active').forEach(activeHeader => {
            if (activeHeader !== headerElement) {
                closeNode(activeHeader.parentElement);
            }
        });

        // 2. Toggle node hiện tại
        if (isActive) {
            closeNode(node);
        } else {
            openNode(node, details);
        }
    }

    function openNode(node, details) {
        node.querySelector('.node-header').classList.add('active');
        details.classList.add('open');
        // Set chiều cao chính xác bằng chiều cao nội dung thực tế
        details.style.maxHeight = details.scrollHeight + "px";
    }

    function closeNode(node) {
        const header = node.querySelector('.node-header');
        const details = node.querySelector('.node-details');
        
        header.classList.remove('active');
        details.classList.remove('open');
        // Reset chiều cao về 0 để ẩn đi
        details.style.maxHeight = null;
    }
</script>