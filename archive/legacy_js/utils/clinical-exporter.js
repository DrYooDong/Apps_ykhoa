/**
 * Clinical Exporter Engine — CliniPortal Utilities
 * Handles export of clinical results to PDF, ICS (iCalendar), and JSON format.
 */

window.ClinicalExporter = {

    /**
     * 1. Export PDF Lâm Sàng (Print/PDF Download)
     * @param {Object} options - { title, patientName, date, sections: [{ title, items: [{ label, value, status }] }] }
     */
    exportClinicalPDF(options) {
        const { title = "BÁO CÁO TÍNH TOÁN LÂM SÀNG", patientName = "Bệnh nhân Virtual", date = new Date().toLocaleDateString('vi-VN'), sections = [] } = options;

        const printWindow = window.open('', '_blank', 'height=750,width=900');
        if (!printWindow) {
            alert('Vui lòng cho phép popup để xuất báo cáo PDF!');
            return;
        }

        const htmlContent = `
            <!DOCTYPE html>
            <html lang="vi">
            <head>
                <meta charset="UTF-8">
                <title>${title}</title>
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #1e293b; background: #fff; line-height: 1.5; }
                    .header { border-bottom: 3px solid #0284c7; padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
                    .brand { font-size: 20px; font-weight: bold; color: #0284c7; }
                    .doc-title { font-size: 24px; font-weight: bold; color: #0f172a; margin-top: 5px; }
                    .meta { font-size: 13px; color: #64748b; text-align: right; }
                    .section { margin-bottom: 25px; }
                    .section-title { font-size: 16px; font-weight: bold; color: #0369a1; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 12px; }
                    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
                    .item { background: #f8fafc; border-radius: 6px; padding: 10px; border: 1px solid #cbd5e1; }
                    .item-label { font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600; }
                    .item-value { font-size: 16px; font-weight: bold; color: #0f172a; margin-top: 2px; }
                    .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
                    .badge-danger { background: #fee2e2; color: #991b1b; }
                    .badge-warning { background: #fef3c7; color: #92400e; }
                    .badge-success { background: #dcfce7; color: #166534; }
                    .footer { margin-top: 40px; border-top: 1px dashed #cbd5e1; padding-top: 15px; font-size: 11px; color: #94a3b8; text-align: center; }
                    @media print {
                        body { padding: 0; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <div>
                        <div class="brand">🏥 CliniPortal Medical Systems</div>
                        <div class="doc-title">${title}</div>
                    </div>
                    <div class="meta">
                        <div><strong>Bệnh nhân:</strong> ${patientName}</div>
                        <div><strong>Ngày tạo:</strong> ${date}</div>
                    </div>
                </div>

                ${sections.map(sec => `
                    <div class="section">
                        <div class="section-title">${sec.title}</div>
                        <div class="grid">
                            ${sec.items.map(item => `
                                <div class="item">
                                    <div class="item-label">${item.label}</div>
                                    <div class="item-value">
                                        ${item.value}
                                        ${item.status ? `<span class="badge badge-${item.statusType || 'success'}">${item.status}</span>` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}

                <div class="footer">
                    Tài liệu được khởi tạo từ hệ thống CliniPortal. Tham khảo chuyên môn lâm sàng trước khi áp dụng thực tế.
                </div>

                <div class="no-print" style="margin-top: 20px; text-align: center;">
                    <button onclick="window.print()" style="padding: 10px 20px; background: #0284c7; color: white; border: none; border-radius: 6px; font-size: 14px; font-weight: bold; cursor: pointer;">
                        🖨️ In / Lưu Dạng PDF
                    </button>
                </div>
            </body>
            </html>
        `;

        printWindow.document.write(htmlContent);
        printWindow.document.close();
    },

    /**
     * 2. Export File iCalendar (.ics) Nhắc Nhở Lâm Sàng
     * @param {Object} reminder - { title, description, startHoursFromNow, location }
     */
    exportCalendarReminder(reminder) {
        const { title, description = "Nhắc nhở đánh giá lâm sàng từ CliniPortal", startHoursFromNow = 24, location = "Khoa Cấp cứu / ICU" } = reminder;

        const now = new Date();
        const startTime = new Date(now.getTime() + startHoursFromNow * 60 * 60 * 1000);
        const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // 30 phút

        const formatDate = (date) => date.toISOString().replace(/-|:|\.\d+/g, '');

        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//CliniPortal Medical Systems//VN',
            'CALSCALE:GREGORIAN',
            'METHOD:REQUEST',
            'BEGIN:VEVENT',
            `SUMMARY:🏥 [CliniPortal] ${title}`,
            `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
            `LOCATION:${location}`,
            `DTSTART:${formatDate(startTime)}`,
            `DTEND:${formatDate(endTime)}`,
            'STATUS:CONFIRMED',
            'BEGIN:VALARM',
            'TRIGGER:-PT15M',
            'ACTION:DISPLAY',
            'DESCRIPTION:Nhắc nhở tái đánh giá lâm sàng',
            'END:VALARM',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `cliniportal-reminder-${Date.now()}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    /**
     * 3. Export Session JSON
     */
    exportSessionJSON(data, filename = 'clinical-session.json') {
        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
