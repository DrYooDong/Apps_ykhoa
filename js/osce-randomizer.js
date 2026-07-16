const cases = [
    {
        id: 1,
        category: "Tim mạch",
        title: "Khám bệnh nhân đau ngực",
        patient: "Nguyễn Văn A, 65 tuổi, Nam",
        vitals: "Mạch 110 l/p, HA 160/90 mmHg, Nhịp thở 22 l/p",
        scenario: "Bệnh nhân vào viện vì đau tức ngực trái lan ra tay trái, kéo dài 30 phút không đỡ. Bệnh nhân vã mồ hôi. Bạn có 5 phút để thực hiện khám tim mạch lâm sàng (nhìn, sờ, gõ, nghe) và đề xuất cận lâm sàng ban đầu.",
        duration: 5 * 60,
        checklist: [
            "Chào hỏi, giới thiệu bản thân và giải thích thủ thuật (+1đ)",
            "Bộc lộ vùng ngực đúng cách, giữ kín đáo (+1đ)",
            "Khám tuần hoàn bàng hệ, sẹo mổ cũ, mỏm tim đập (+2đ)",
            "Sờ mỏm tim, rung miêu, dấu Harzer (+2đ)",
            "Nghe tim tại 4 ổ van cơ bản (+3đ)",
            "Đề xuất làm ECG 12 chuyển đạo và Men tim ngay (+1đ)"
        ]
    },
    {
        id: 2,
        category: "Hô hấp",
        title: "Bệnh nhân khó thở cấp",
        patient: "Trần Thị B, 45 tuổi, Nữ",
        vitals: "Mạch 120 l/p, HA 130/80 mmHg, SpO2 88%",
        scenario: "Bệnh nhân có tiền sử hen phế quản, vào viện vì khó thở dữ dội, khò khè nghe rõ từ xa. Bạn có 5 phút để thực hiện khám hô hấp, đánh giá mức độ nặng và xử trí ban đầu.",
        duration: 5 * 60,
        checklist: [
            "Chào hỏi nhanh, gọi hỗ trợ điều dưỡng đo SpO2, cho thở oxy (+2đ)",
            "Quan sát nhịp thở, sự co kéo cơ hô hấp phụ (+2đ)",
            "Gõ phổi đánh giá mức độ ứ khí (+1đ)",
            "Nghe phổi tìm ran rít, ran ngáy, rì rào phế nang (+3đ)",
            "Chỉ định phun khí dung Salbutamol ngay (+2đ)"
        ]
    },
    {
        id: 3,
        category: "Tiêu hóa",
        title: "Bệnh nhân đau bụng cấp",
        patient: "Lê Văn C, 25 tuổi, Nam",
        vitals: "Mạch 90 l/p, HA 120/70 mmHg, Nhiệt độ 38.5°C",
        scenario: "Bệnh nhân đau quanh rốn từ chiều hôm qua, nay khu trú ở hố chậu phải, kèm buồn nôn, sốt nhẹ. Bạn có 5 phút để khám bụng và làm các nghiệm pháp cần thiết.",
        duration: 5 * 60,
        checklist: [
            "Chào hỏi và bộc lộ vùng bụng từ mũi ức đến nếp bẹn (+1đ)",
            "Nhìn bụng di động theo nhịp thở, sẹo mổ cũ (+1đ)",
            "Nghe nhu động ruột trước khi sờ (+1đ)",
            "Sờ bụng từ vùng không đau đến vùng đau (+2đ)",
            "Làm dấu MacBurney, phản ứng dội (Blumberg) (+3đ)",
            "Làm dấu Rovsing, Psoas hoặc Obturator (+2đ)"
        ]
    },
    {
        id: 4,
        category: "Thần kinh",
        title: "Đánh giá bệnh nhân đột quỵ",
        patient: "Phạm Thị D, 70 tuổi, Nữ",
        vitals: "Mạch 85 l/p, HA 180/100 mmHg, GCS 13 điểm",
        scenario: "Bệnh nhân đột ngột yếu nửa người trái và nói ngọng cách đây 1 giờ. Bạn có 8 phút để đánh giá tri giác, khám dây thần kinh sọ và cơ lực.",
        duration: 8 * 60,
        checklist: [
            "Đánh giá chi tiết điểm Glasgow (+2đ)",
            "Khám dấu màng não (Cổ gượng, Kernig) (+1đ)",
            "Khám liệt mặt (Dây VII) - yêu cầu bệnh nhân nhắm mắt, nhe răng (+2đ)",
            "Đánh giá sức cơ 2 bên (Chi trên, chi dưới) theo thang điểm 5 (+2đ)",
            "Khám phản xạ gân xương, dấu Babinski (+2đ)",
            "Nhận định tình trạng cấp cứu và kích hoạt quy trình Đột quỵ (Code Stroke) (+1đ)"
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const btnGenerate = document.getElementById('btn-generate');
    const caseDisplay = document.getElementById('case-display');
    const caseCategory = document.getElementById('case-category');
    const caseTitle = document.getElementById('case-title');
    const casePatient = document.getElementById('case-patient');
    const caseVitals = document.getElementById('case-vitals');
    const caseScenario = document.getElementById('case-scenario');
    const caseChecklist = document.getElementById('case-checklist');
    const timerDisplay = document.getElementById('timer-display');
    const btnStop = document.getElementById('btn-stop');
    const scoreDisplay = document.getElementById('score-display');
    
    let timerInterval;
    let timeLeft = 0;
    let isRunning = false;
    let totalPoints = 0;
    let currentPoints = 0;

    // Âm thanh báo hiệu (dùng beep của Web Audio API)
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playBeep(vol, freq, duration) {
        if(audioCtx.state === 'suspended') audioCtx.resume();
        const oscillator = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        oscillator.connect(gain);
        gain.connect(audioCtx.destination);
        oscillator.frequency.value = freq;
        gain.gain.value = vol;
        oscillator.start();
        setTimeout(() => oscillator.stop(), duration);
    }

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    function updateTimerDisplay() {
        timerDisplay.textContent = formatTime(timeLeft);
        if (timeLeft <= 60 && timeLeft > 0) {
            timerDisplay.classList.add('warning');
        } else {
            timerDisplay.classList.remove('warning');
        }
    }

    function updateScore() {
        scoreDisplay.textContent = `${currentPoints}/${totalPoints} điểm`;
    }

    function generateCase() {
        // Random case
        const randomIndex = Math.floor(Math.random() * cases.length);
        const selectedCase = cases[randomIndex];

        // Fill data
        caseCategory.textContent = selectedCase.category;
        caseTitle.textContent = selectedCase.title;
        casePatient.textContent = selectedCase.patient;
        caseVitals.textContent = selectedCase.vitals;
        caseScenario.textContent = selectedCase.scenario;
        
        // Build checklist
        caseChecklist.innerHTML = '';
        totalPoints = 0;
        currentPoints = 0;
        
        selectedCase.checklist.forEach(item => {
            // Extract points if pattern (+Xđ) exists
            let points = 1; // Default
            const match = item.match(/\(\+(\d+)đ\)/);
            if (match) {
                points = parseInt(match[1]);
                totalPoints += points;
            } else {
                totalPoints += 1;
            }

            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox">
                <span class="checkbox-text">${item}</span>
            `;
            li.dataset.points = points;
            
            li.addEventListener('click', function() {
                const cb = this.querySelector('input');
                cb.checked = !cb.checked;
                this.classList.toggle('checked', cb.checked);
                
                const p = parseInt(this.dataset.points);
                if (cb.checked) {
                    currentPoints += p;
                } else {
                    currentPoints -= p;
                }
                updateScore();
            });
            caseChecklist.appendChild(li);
        });

        updateScore();

        // Setup timer
        clearInterval(timerInterval);
        timeLeft = selectedCase.duration;
        isRunning = true;
        updateTimerDisplay();
        
        // Show Display
        caseDisplay.style.display = 'block';
        
        // Scroll to display smoothly
        caseDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Start timer
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
                // Nhắc nhở 1 phút cuối
                if (timeLeft === 60) {
                    playBeep(1, 400, 500);
                }
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                timerDisplay.textContent = "HẾT GIỜ";
                playBeep(1, 600, 1500); // Tiếng bíp dài
            }
        }, 1000);
    }

    btnGenerate.addEventListener('click', generateCase);

    btnStop.addEventListener('click', () => {
        clearInterval(timerInterval);
        isRunning = false;
        timerDisplay.textContent = formatTime(timeLeft) + " (Dừng)";
        timerDisplay.classList.remove('warning');
    });
});
