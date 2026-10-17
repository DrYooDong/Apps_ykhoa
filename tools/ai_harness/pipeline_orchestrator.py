"""
CliniPortal DocSpace — Antigravity Pipeline Orchestrator
Điều phối chu trình tự động hóa bóc tách y văn, sinh ma trận CDSS và kiểm định chất lượng EBM.
Tích hợp Google Antigravity SDK & CLI workflows.
"""

import os
import sys
import json
import subprocess
from pathlib import Path
from typing import Dict, Any, Optional

# Cấu hình UTF-8 cho môi trường Windows Console
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

# Thêm đường dẫn schemas nội bộ
CURRENT_DIR = Path(__file__).resolve().parent
ROOT_DIR = CURRENT_DIR.parent.parent
sys.path.insert(0, str(CURRENT_DIR))

try:
    from schemas import Prompt05EnrichedSchema, Prompt06WeightsSchema, Prompt07SoapCaseSchema
except ImportError:
    from .schemas import Prompt05EnrichedSchema, Prompt06WeightsSchema, Prompt07SoapCaseSchema


class ClinicalPipelineOrchestrator:
    def __init__(self, workspace_root: Optional[Path] = None):
        self.workspace_root = workspace_root or ROOT_DIR
        self.enriched_dir = self.workspace_root / "src" / "content" / "docspace" / "data" / "enriched"
        self.ba_dir = self.workspace_root / "src" / "content" / "docspace" / "data" / "ba"
        self.tools_dir = self.workspace_root / "tools" / "scripts"

    def run_linter(self) -> Dict[str, Any]:
        """Chạy medical-linter.mjs để kiểm tra tính toàn vẹn y khoa & định dạng."""
        script_path = self.tools_dir / "medical-linter.mjs"
        if not script_path.exists():
            return {"status": "skipped", "message": "medical-linter.mjs không tồn tại"}

        try:
            res = subprocess.run(
                ["node", str(script_path)],
                cwd=str(self.workspace_root),
                capture_output=True,
                encoding='utf-8',
                errors='replace',
                timeout=30
            )
            return {
                "status": "success" if res.returncode == 0 else "error",
                "returncode": res.returncode,
                "stdout": res.stdout,
                "stderr": res.stderr
            }
        except Exception as e:
            return {"status": "error", "error": str(e)}

    def run_build_enriched_index(self) -> Dict[str, Any]:
        """Đồng bộ hóa index.ts cho toàn bộ CSDL Enriched CDSS."""
        script_path = self.tools_dir / "build-enriched-cdss.mjs"
        if not script_path.exists():
            return {"status": "skipped", "message": "build-enriched-cdss.mjs không tồn tại"}

        try:
            res = subprocess.run(
                ["node", str(script_path)],
                cwd=str(self.workspace_root),
                capture_output=True,
                encoding='utf-8',
                errors='replace',
                timeout=30
            )
            return {
                "status": "success" if res.returncode == 0 else "error",
                "output": res.stdout or res.stderr
            }
        except Exception as e:
            return {"status": "error", "error": str(e)}

    def save_and_verify_enriched_case(self, case_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Validate qua Pydantic schema, lưu file và tự động kích hoạt pipeline đồng bộ.
        """
        print(f"🔬 Đang thẩm định dữ liệu bằng Antigravity Pydantic Contract...")
        try:
            validated = Prompt05EnrichedSchema(**case_data)
        except Exception as e:
            print(f"❌ Vi phạm Schema Y khoa: {e}")
            return {"success": False, "error": f"Schema Validation Failed: {e}"}

        out_path = self.enriched_dir / f"{validated.slug}.json"
        out_path.parent.mkdir(parents=True, exist_ok=True)

        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(validated.model_dump(), f, ensure_ascii=False, indent=2)

        print(f"💾 Đã lưu: {out_path}")

        # Đồng bộ index
        sync_res = self.run_build_enriched_index()
        print(f"🔄 Đồng bộ Index CDSS: {sync_res.get('status')}")

        return {
            "success": True,
            "path": str(out_path),
            "slug": validated.slug,
            "sync": sync_res
        }


def extract_dengue_warning_signs_sample() -> Dict[str, Any]:
    """
    Trích xuất dữ liệu thực tế từ Hướng dẫn SXHD BYT 2023 (Dòng 380-410).
    Chuẩn hóa cấu trúc 6 Đầu mục Lâm sàng & Bảng 4 Cột.
    """
    return {
        "slug": "sot-xuat-huyet-dengue-co-dau-hieu-canh-bao",
        "icdCode": "A97.1",
        "diseaseName": "Sốt xuất huyết Dengue có dấu hiệu cảnh báo (Người lớn)",
        "specialty": "Truyền nhiễm & Hồi sức cấp cứu",
        "goldStandard": "Khẳng định bằng NS1Ag (+) trong 1-5 ngày đầu, hoặc Mac-ELISA IgM Dengue (+) từ ngày 5, hoặc RT-PCR Dengue RNA dương tính.",
        "severityGrading": [
            {
                "grade_id": "grade_warning_adult",
                "grade_name": "SXHD có dấu hiệu cảnh báo ở người lớn (≥ 16 tuổi)",
                "criteria": [
                    "Vật vã, lừ đừ, li bì",
                    "Đau bụng nhiều và liên tục hoặc tăng cảm giác đau vùng gan",
                    "Nôn ói nhiều (≥ 3 lần/1 giờ hoặc ≥ 4 lần/6 giờ)",
                    "Xuất huyết niêm mạc: chảy máu chân răng, mũi, nôn ra máu, đi ngoài phân đen",
                    "Gan to > 2 cm dưới bờ sườn",
                    "Tiểu ít (< 0.5 ml/kg/giờ)",
                    "Hct tăng cao kèm tiểu cầu giảm nhanh (< 100.000/mm³)"
                ],
                "triage_action": "Bắt buộc nhập viện theo dõi tại khoa Lâm sàng / Cấp cứu, không điều trị ngoại trú."
            }
        ],
        "timelinePhases": [
            {
                "day_range": "D4-D5 (Giai đoạn Nguy hiểm - Giờ 1-2)",
                "clinical_focus": "Theo dõi sát thoát huyết tương, Hct tăng cao và dọa sốc. Bù dịch truyền ban đầu.",
                "nursing_orders": [
                    "Theo dõi Mạch, HA, Nhịp thở, SpO2, lượng nước tiểu mỗi 1 - 2 giờ.",
                    "Lập đường truyền tĩnh mạch kim luồn lớn (G18-G20).",
                    "Đo lượng dịch xuất nhập chính xác."
                ],
                "medication_orders": [
                    "Ringer lactate hoặc Ringer acetate hoặc NaCl 0.9%: Truyền tĩnh mạch 6 ml/kg/giờ trong 1 - 2 giờ đầu."
                ],
                "diagnostic_tests": [
                    "Kiểm tra lại dung tích hồng cầu (Hct) sau 1 - 2 giờ truyền dịch.",
                    "Tổng phân tích tế bào máu, AST/ALT, Điện giải đồ, Chức năng thận."
                ]
            },
            {
                "day_range": "D4-D5 (Giai đoạn Nguy hiểm - Giờ 3-6)",
                "clinical_focus": "Đánh giá đáp ứng bù dịch lâm sàng và xu hướng Hct.",
                "nursing_orders": [
                    "Theo dõi sinh hiệu và lượng nước tiểu mỗi 2 - 4 giờ.",
                    "Kiểm tra dấu hiệu quá tải dịch: ran ẩm phổi, thở nhanh, tĩnh mạch cổ nổi."
                ],
                "medication_orders": [
                    "Nếu lâm sàng cải thiện và Hct giảm: Giảm tốc độ truyền xuống 3 ml/kg/giờ trong 2 - 4 giờ tiếp theo.",
                    "Nếu mạch nhanh, HA kẹt/tụt, Hct tiếp tục tăng: Chuyển ngay phác đồ sốc SXHD (Cao phân tử 10-15 ml/kg/giờ)."
                ],
                "diagnostic_tests": [
                    "Hct mỗi 2 - 4 giờ theo dõi sát đáp ứng dịch truyền."
                ]
            },
            {
                "day_range": "D5-D6 (Giai đoạn Duy trì & Giảm dịch)",
                "clinical_focus": "Giảm dần lưu lượng dịch, chuẩn bị ngưng dịch khi bước sang giai đoạn tái hấp thu.",
                "nursing_orders": [
                    "Theo dõi nước tiểu (duy trì ≥ 0.5 - 1 ml/kg/giờ).",
                    "Khám tim phổi định kỳ phát hiện sớm phù phổi cấp do quá tải tuần hoàn."
                ],
                "medication_orders": [
                    "Giảm tốc độ truyền xuống 1.5 ml/kg/giờ trong 6 - 18 giờ.",
                    "Ngưng hẳn dịch truyền sau 12 - 24 giờ khi mạch, HA ổn định và Hct về mức bình thường."
                ],
                "diagnostic_tests": [
                    "Hct kiểm tra trước khi quyết định ngưng dịch."
                ]
            }
        ],
        "protocol": {
            "nhapVienVaGiuong": "Nhập viện khoa Truyền nhiễm / Hồi sức. Nằm nghỉ ngơi tuyệt đối tại giường, tránh vận động mạnh.",
            "hoHapVaOxy": "Thở oxy qua cannula 2-4 L/phút nếu SpO2 < 95% hoặc có dấu hiệu thở gắng sức / sốc.",
            "dichTruyenVaHoiSuc": "Phác đồ bậc thang 6ml/kg/h (1-2h) -> 3ml/kg/h (2-4h) -> 1.5ml/kg/h (6-18h). Ngưng dịch sau 12-24h khi ổn định. Dịch dùng: Ringer lactate, Ringer acetate hoặc NaCl 0.9%. Không dùng Glucose bù dịch.",
            "thuocDacTri": [],
            "thuocTrieuChung": [
                "Hạ sốt: Paracetamol 10-15 mg/kg/lần (tối đa 1g/lần, cách 4-6h nếu sốt ≥ 38.5°C, tổng liều không quá 60mg/kg/24h hoặc 3g/24h ở người lớn).",
                "Chống nôn: Ondansetron 4-8mg tiêm tĩnh mạch chậm nếu nôn ói liên tục không uống được."
            ],
            "dieuTriDongMac": [
                "Chống chỉ định tuyệt đối Aspirin, Ibuprofen, NSAID và Corticoid do nguy cơ gây loét xuất huyết tiêu hóa và suy tạng.",
                "Kiểm soát đường huyết ở bệnh nhân đái tháo đường, theo dõi sát nếu có bệnh gan mạn tính."
            ],
            "dinhDuongVaChamSoc": "Ăn mềm, lỏng, dễ tiêu (cháo, súp). Uống nhiều nước oresol, nước trái cây (cam, dừa), nước sôi nguội. Tránh thực phẩm có màu đen, đỏ hoặc nâu sẫm để không nhầm với xuất huyết tiêu hóa.",
            "theoDoiVaTieuChiChuyenTuyen": "Chuyển khoa Hồi sức cấp cứu (ICU) ngay khi: Huyết áp kẹt (chênh lệch ≤ 20 mmHg) hoặc tụt (HA tâm thu < 90 mmHg), Hct tăng > 20% so với ban đầu không cải thiện sau bù dịch, xuất huyết nặng hoặc suy gan cấp.",
            "tieuChuanXuatVien": "Hết sốt ít nhất 48 giờ không dùng thuốc hạ sốt, tỉnh táo, ăn uống tốt, mạch và huyết áp ổn định, tiểu tiện bình thường, Hct ổn định và số lượng tiểu cầu có xu hướng tăng (> 50.000/mm³)."
        },
        "warnings": [
            "NGUY HIỂM: Thoát huyết tương ồ ạt dẫn đến SỐC thường xuất hiện từ ngày 3 đến ngày 7 của bệnh, trùng thời điểm bệnh nhân HẾT SỐT.",
            "QUÁ TẢI DỊCH: Thận trọng bù dịch quá mức khi bệnh nhân bước vào giai đoạn tái hấp thu (từ ngày 6-7), có thể dẫn đến phù phổi cấp và suy hô hấp tử vong.",
            "CHỐNG CHỈ ĐỊNH: Tuyệt đối không tiêm bắp để tránh khối máu tụ sâu."
        ]
    }


if __name__ == "__main__":
    print("🚀 Khởi chạy Antigravity Clinical Orchestrator...")
    orchestrator = ClinicalPipelineOrchestrator()

    # Thử nghiệm thẩm định và lưu trữ ca Dengue cảnh báo
    sample_data = extract_dengue_warning_signs_sample()
    result = orchestrator.save_and_verify_enriched_case(sample_data)

    print("\n📊 KẾT QUẢ VẬN HÀNH:")
    print(json.dumps(result, ensure_ascii=False, indent=2))
