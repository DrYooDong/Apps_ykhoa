"""
CliniPortal DocSpace — Antigravity Typed Data Contracts
Quy chuẩn Schema Pydantic cho Dữ liệu Y khoa EBM 2026.
Đảm bảo 100% Zero-Orphan Symptoms, đúng cấu trúc 6 đầu mục lâm sàng và Bảng 4 Cột.
"""

from typing import List, Dict, Optional, Any, Union
from pydantic import BaseModel, Field, model_validator


class ClinicalSymptomWeight(BaseModel):
    symptom_key: str = Field(..., description="Mã định danh triệu chứng chuẩn hóa (không dấu, snake_case)")
    symptom_name: str = Field(..., description="Tên triệu chứng hiển thị tiếng Việt")
    weight_type: str = Field(..., description="Loại trọng số: dt (đặc trưng), gy (gợi ý), ht (hỗ trợ), loaitru (loại trừ)")
    weight_score: float = Field(..., ge=-10.0, le=10.0, description="Điểm trọng số từ -10.0 đến +10.0")


class DailyTreatmentItem(BaseModel):
    day_range: str = Field(..., description="Khoảng thời gian: D1-D3, D4-D5, D6-D7 hoặc H1-H2, H3-H6")
    clinical_focus: str = Field(..., description="Trọng tâm theo dõi & đánh giá lâm sàng")
    nursing_orders: List[str] = Field(default_factory=list, description="Y lệnh chăm sóc & theo dõi sinh hiệu")
    medication_orders: List[str] = Field(default_factory=list, description="Y lệnh thuốc, dịch truyền, liều lượng chi tiết")
    diagnostic_tests: List[str] = Field(default_factory=list, description="Chỉ định xét nghiệm cận lâm sàng & Hct")


class SeverityGrade(BaseModel):
    grade_id: str = Field(..., description="Mã phân độ (ví dụ: grade_1_warning_signs)")
    grade_name: str = Field(..., description="Tên phân độ (ví dụ: SXHD có dấu hiệu cảnh báo)")
    criteria: List[str] = Field(..., description="Tiêu chuẩn lâm sàng & cận lâm sàng thỏa mãn")
    triage_action: str = Field(..., description="Xử trí phân luồng: Ngoại trú, Nhập khoa phòng, ICU")


class TreatmentProtocolNineCategories(BaseModel):
    nhapVienVaGiuong: str = Field(..., description="1. Nhập viện & chế độ giường bệnh")
    hoHapVaOxy: str = Field(..., description="2. Hô hấp & liệu pháp oxy")
    dichTruyenVaHoiSuc: str = Field(..., description="3. Phác đồ bù dịch, loại dịch truyền & tốc độ")
    thuocDacTri: List[str] = Field(default_factory=list, description="4. Thuốc đặc trị / Kháng sinh / Kháng virus")
    thuocTrieuChung: List[str] = Field(default_factory=list, description="5. Thuốc điều trị triệu chứng (hạ sốt, giảm đau...)")
    dieuTriDongMac: List[str] = Field(default_factory=list, description="6. Quản lý bệnh nền & tương tác DDI")
    dinhDuongVaChamSoc: str = Field(..., description="7. Dinh dưỡng & chăm sóc điều dưỡng")
    theoDoiVaTieuChiChuyenTuyen: str = Field(..., description="8. Theo dõi sát & tiêu chuẩn chuyển khoa/tuyến")
    tieuChuanXuatVien: str = Field(..., description="9. Tiêu chuẩn xuất viện & hẹn tái khám")


class Prompt05EnrichedSchema(BaseModel):
    slug: str = Field(..., description="Slug định danh bệnh lý (ví dụ: sot-xuat-huyet-dengue)")
    icdCode: str = Field(..., description="Mã ICD-10 (ví dụ: A97.1)")
    diseaseName: str = Field(..., description="Tên bệnh tiếng Việt chuẩn Bộ Y tế")
    specialty: str = Field(..., description="Chuyên khoa chính")
    goldStandard: str = Field(..., description="Tiêu chuẩn vàng xác định bệnh")
    severityGrading: List[SeverityGrade] = Field(..., description="Danh sách các phân tầng mức độ nặng")
    timelinePhases: List[DailyTreatmentItem] = Field(..., description="Bảng lộ trình điều trị theo thời gian (Bảng 4 Cột)")
    protocol: TreatmentProtocolNineCategories = Field(..., description="Phác đồ điều trị 9 phân mục chuẩn")
    warnings: List[str] = Field(default_factory=list, description="Cảnh báo an toàn, tương tác thuốc và ranh giới tử vong")

    @model_validator(mode="after")
    def validate_clinical_integrity(self):
        # Đảm bảo không có chuỗi placeholder rỗng
        if "placeholder" in self.goldStandard.lower():
            raise ValueError("goldStandard không được chứa placeholder.")
        if len(self.timelinePhases) == 0:
            raise ValueError("Phải có ít nhất 1 giai đoạn trong timelinePhases.")
        return self


class Prompt06WeightsSchema(BaseModel):
    disease_slug: str
    sample_cases: List[Dict[str, Any]] = Field(default_factory=list, description="Danh sách các ca lâm sàng mẫu")
    weight_matrix: List[ClinicalSymptomWeight] = Field(default_factory=list, description="Ma trận trọng số suy luận CDSS")
    new_symptoms_dictionary: List[Dict[str, str]] = Field(default_factory=list, description="Từ điển triệu chứng mới đăng ký")


class Prompt07SoapCaseSchema(BaseModel):
    case_id: str
    title: str
    patient_demographics: Dict[str, Any]
    subjective: Dict[str, Any] = Field(..., description="S - Bệnh sử, triệu chứng cơ năng, tiền căn")
    objective: Dict[str, Any] = Field(..., description="O - Khám thực thể, sinh hiệu, cận lâm sàng")
    assessment: Dict[str, Any] = Field(..., description="A - Chẩn đoán xác định, phân độ, biện luận")
    plan: Dict[str, Any] = Field(..., description="P - Y lệnh điều trị, theo dõi, tiên lượng")
    clinical_pearls: List[str] = Field(default_factory=list, description="Hạt ngọc lâm sàng đúc kết")
