# Kho Lottie Animations - CliniPortal

## Tổng quan
Bộ sưu tập **65 hoạt ảnh Lottie** chuyên biệt cho ứng dụng y khoa CliniPortal, được phân loại theo 6 module chính và hỗ trợ đầy đủ chế độ Dark Mode.

## Cấu trúc thư mục
```
assets/lottie/
├── lottie-library.json    # File catalog toàn bộ animations
├── light/                 # Phiên bản Light Mode
│   ├── heartbeat-monitor.json
│   ├── breathing-lungs.json
│   └── ...
└── dark/                  # Phiên bản Dark Mode
    ├── heartbeat-monitor-dark.json
    ├── breathing-lungs-dark.json
    └── ...
```

## Hướng dẫn sử dụng

### 1. Cài đặt thư viện
```bash
npm install lottie-web
# hoặc
npm install react-lottie-player
```

### 2. Import trong React
```jsx
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '@/assets/lottie/light/heartbeat-monitor.json';

function HeartbeatAnimation() {
  const isDarkMode = useDarkMode(); // Hook kiểm tra dark mode
  
  return (
    <Player
      autoplay
      loop
      src={isDarkMode 
        ? '@/assets/lottie/dark/heartbeat-monitor-dark.json'
        : '@/assets/lottie/light/heartbeat-monitor.json'
      }
      style={{ height: '200px', width: '200px' }}
    />
  );
}
```

### 3. Sử dụng với Vanilla JS
```javascript
import lottie from 'lottie-web';

const container = document.getElementById('lottie-container');
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

lottie.loadAnimation({
  container: container,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: isDarkMode 
    ? '/assets/lottie/dark/heartbeat-monitor-dark.json'
    : '/assets/lottie/light/heartbeat-monitor.json'
});
```

## Danh sách Animations theo Module

### 🛠️ Module: Tools (Công cụ)
| ID | Tên | Category | File |
|----|-----|----------|------|
| anim-heartbeat-01 | Heartbeat Monitor | cardiovascular | heartbeat-monitor.json |
| anim-blood-cell-01 | Blood Cells Flow | hematology | blood-cells-flow.json |
| anim-xray-scan-01 | X-Ray Scanning | imaging | xray-scanning.json |
| anim-ct-slice-01 | CT Scan Slices | imaging | ct-scan-slices.json |
| anim-mri-spin-01 | MRI Magnetic Spin | imaging | mri-magnetic-spin.json |
| anim-ecg-waveform-01 | ECG Waveform Drawing | cardiovascular | ecg-waveform-drawing.json |
| anim-blood-pressure-01 | Blood Pressure Cuff | cardiovascular | blood-pressure-cuff.json |
| anim-oxygen-saturation-01 | SpO2 Sensor | respiratory | spo2-sensor.json |
| anim-fever-thermometer-01 | Rising Thermometer | vital-signs | rising-thermometer.json |
| anim-iv-drip-01 | IV Fluid Drip | procedure | iv-fluid-drip.json |
| anim-dialysis-machine-01 | Hemodialysis Machine | nephrology | hemodialysis-machine.json |
| anim-insulin-pump-01 | Insulin Pump Delivery | endocrinology | insulin-pump-delivery.json |
| anim-glucose-monitor-01 | Glucose Monitoring | endocrinology | glucose-monitoring.json |
| anim-child-growth-01 | Child Growth Chart | pediatrics | child-growth-chart.json |
| anim-vaccination-schedule-01 | Vaccination Schedule | pediatrics | vaccination-schedule.json |
| anim-ai-diagnosis-01 | AI Diagnostic Assistant | technology | ai-diagnostic-assistant.json |
| anim-telemedicine-call-01 | Telemedicine Consultation | technology | telemedicine-consultation.json |
| anim-electronic-record-01 | Electronic Health Record | technology | electronic-health-record.json |

### 🩺 Module: Approach (Tiếp cận lâm sàng)
| ID | Tên | Category | File |
|----|-----|----------|------|
| anim-lungs-breath-01 | Breathing Lungs | respiratory | breathing-lungs.json |
| anim-stomach-digest-01 | Digestive Process | gastrointestinal | digestive-process.json |
| anim-allergic-reaction-01 | Allergic Reaction Cascade | immunology | allergic-reaction-cascade.json |
| anim-burn-treatment-01 | Burn Treatment | emergency | burn-treatment.json |
| anim-pregnancy-fetus-01 | Fetal Development | obstetrics | fetal-development.json |
| anim-contraction-labor-01 | Uterine Contractions | obstetrics | uterine-contractions.json |
| anim-elderly-care-01 | Elderly Care Support | geriatrics | elderly-care-support.json |
| anim-palliative-care-01 | Palliative Care | palliative | palliative-care.json |
| anim-mental-health-01 | Mental Health Balance | psychiatry | mental-health-balance.json |
| anim-meditation-breath-01 | Mindful Breathing | psychiatry | mindful-breathing.json |

### 🔬 Module: Physiology (Sinh lý - Sinh lý bệnh)
| ID | Tên | Category | File |
|----|-----|----------|------|
| anim-brain-neuron-01 | Neural Network | neurology | neural-network.json |
| anim-kidney-filter-01 | Kidney Filtration | nephrology | kidney-filtration.json |
| anim-liver-metabolism-01 | Liver Metabolism | hepatology | liver-metabolism.json |
| anim-heart-valve-01 | Heart Valve Motion | cardiovascular | heart-valve-motion.json |
| anim-thyroid-gland-01 | Thyroid Hormone Release | endocrinology | thyroid-hormone-release.json |
| anim-adrenal-stress-01 | Adrenal Stress Response | endocrinology | adrenal-stress-response.json |
| anim-immune-response-01 | Immune Cell Activation | immunology | immune-cell-activation.json |
| anim-clotting-cascade-01 | Coagulation Cascade | hematology | coagulation-cascade.json |

### 💊 Module: Pharmacology (Dược lý)
| ID | Tên | Category | File |
|----|-----|----------|------|
| anim-bacteria-virus-01 | Pathogen Attack | infectious | pathogen-attack.json |
| anim-antibiotic-action-01 | Antibiotic Mechanism | pharmacology | antibiotic-mechanism.json |
| anim-pill-swallow-01 | Pill Swallowing | pharmacology | pill-swallowing.json |
| anim-vaccine-injection-01 | Vaccine Administration | immunology | vaccine-administration.json |

### 🎓 Module: Skills (Kỹ năng lâm sàng)
| ID | Tên | Category | File |
|----|-----|----------|------|
| anim-syringe-inject-01 | Injection Process | procedure | injection-process.json |
| anim-surgery-scrub-01 | Surgical Scrubbing | procedure | surgical-scrubbing.json |
| anim-respirator-vent-01 | Ventilator Breathing | critical-care | ventilator-breathing.json |
| anim-cpr-compression-01 | CPR Chest Compression | emergency | cpr-chest-compression.json |
| anim-defibrillator-01 | Defibrillator Shock | emergency | defibrillator-shock.json |
| anim-intubation-01 | Endotracheal Intubation | airway | endotracheal-intubation.json |
| anim-central-line-01 | Central Line Insertion | procedure | central-line-insertion.json |
| anim-lumbar-puncture-01 | Lumbar Puncture | procedure | lumbar-puncture.json |
| anim-ultrasound-probe-01 | Ultrasound Probe Movement | imaging | ultrasound-probe-movement.json |
| anim-endoscopy-01 | Endoscopy Camera | gastrointestinal | endoscopy-camera.json |
| anim-bronchoscopy-01 | Bronchoscopy Navigation | respiratory | bronchoscopy-navigation.json |
| anim-bleeding-control-01 | Bleeding Control | emergency | bleeding-control.json |
| anim-wound-suture-01 | Wound Suturing | procedure | wound-suturing.json |
| anim-fracture-immobilization-01 | Fracture Immobilization | orthopedics | fracture-immobilization.json |
| anim-joint-reduction-01 | Joint Reduction | orthopedics | joint-reduction.json |
| anim-newborn-care-01 | Newborn Care | pediatrics | newborn-care.json |

### 📚 Module: EBM (Y học chứng cứ)
| ID | Tên | Category | File |
|----|-----|----------|------|
| anim-research-data-01 | Research Data Analysis | research | research-data-analysis.json |
| anim-clinical-trial-01 | Clinical Trial Process | research | clinical-trial-process.json |
| anim-meta-analysis-01 | Meta-Analysis Forest Plot | research | meta-analysis-forest-plot.json |
| anim-guideline-update-01 | Guideline Update Sync | evidence | guideline-update-sync.json |

## Hỗ trợ Dark Mode

Mỗi animation có 2 phiên bản:
- **Light Mode**: Màu sắc tươi sáng, phù hợp nền trắng
- **Dark Mode**: Màu tối ưu hóa, phù hợp nền đen/xám đậm

### Cách đặt tên file:
- Light: `ten-animation.json`
- Dark: `ten-animation-dark.json`

### Tự động chuyển đổi:
```javascript
// Hook custom để tự động switch
function useLottieAnimation(baseName) {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
    
    const handler = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return isDark 
    ? `/assets/lottie/dark/${baseName}-dark.json`
    : `/assets/lottie/light/${baseName}.json`;
}
```

## Categories Statistics

| Category | Số lượng | Module chính |
|----------|----------|--------------|
| cardiovascular | 4 | tools, physiology |
| respiratory | 3 | approach, skills |
| neurology | 1 | physiology |
| gastrointestinal | 2 | approach, skills |
| nephrology | 2 | physiology, tools |
| hematology | 2 | tools, physiology |
| infectious | 1 | pharmacology |
| pharmacology | 2 | pharmacology |
| procedure | 7 | skills |
| imaging | 4 | tools, skills |
| vital-signs | 1 | tools |
| hepatology | 1 | physiology |
| critical-care | 1 | skills |
| emergency | 4 | skills, approach |
| airway | 1 | skills |
| endocrinology | 4 | tools, physiology |
| immunology | 3 | physiology, pharmacology, approach |
| orthopedics | 2 | skills |
| obstetrics | 2 | approach |
| pediatrics | 3 | skills, tools |
| geriatrics | 1 | approach |
| palliative | 1 | approach |
| psychiatry | 2 | approach |
| research | 3 | ebm |
| evidence | 1 | ebm |
| technology | 3 | tools |

## Tối ưu hiệu suất

1. **Lazy Loading**: Chỉ load animation khi cần hiển thị
2. **Renderer SVG**: Sử dụng SVG renderer để giảm kích thước
3. **Cache**: Cache các animation đã load
4. **Compression**: Nén file JSON bằng lottie-compressor

## Nguồn tải animations

Các file Lottie có thể được tạo từ:
- Adobe After Effects + Bodymovin plugin
- LottieFiles.com (có sẵn thư viện miễn phí)
- Figma + Lottie plugin
- Haiku Animator

## License

Tất cả animations trong kho này thuộc bản quyền của CliniPortal Project.
