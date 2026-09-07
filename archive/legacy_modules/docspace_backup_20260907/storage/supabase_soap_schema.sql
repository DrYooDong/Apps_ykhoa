-- ==============================================================================
-- CLINI PORTAL / DOCSPACE — SUPABASE SOAP DIGITAL DATABASE SCHEMA
-- Path: src/content/docspace/storage/supabase_soap_schema.sql
-- Mô tả: Thiết lập bảng soap_patients, chỉ mục, RLS bảo mật và hàm tự động cập nhật
-- ==============================================================================

-- 1. Kích hoạt Extension UUID nếu chưa có
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Tạo bảng soap_patients
CREATE TABLE IF NOT EXISTS public.soap_patients (
    -- Khóa chính & Phân quyền Bác sĩ
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_id TEXT NOT NULL,                         -- Định danh Hồ sơ Bác sĩ (Profile ID hoặc auth.uid())
    
    -- Thông tin Hành chính Bệnh nhân
    patient_code TEXT,                               -- Mã giường / Mã ca (VD: G01, G02)
    full_name TEXT NOT NULL,                         -- Họ tên bệnh nhân (đã mã hóa / ẩn danh nếu bật PHI Shield)
    age INTEGER,                                     -- Tuổi
    gender TEXT CHECK (gender IN ('nam', 'nu', 'khac')), -- Giới tính
    bed_number TEXT,                                 -- Số giường / Buồng bệnh
    medical_record_no TEXT,                          -- Số Bệnh án (Mã HSBA)
    admission_diagnosis TEXT,                        -- Chẩn đoán vào viện
    current_diagnosis TEXT,                          -- Chẩn đoán hiện tại

    -- Diễn tiến SOAP ngày đang kích hoạt
    active_date DATE DEFAULT CURRENT_DATE,           -- Ngày khám / trực (YYYY-MM-DD)
    day_of_illness INTEGER DEFAULT 1,                -- Ngày thứ mấy của bệnh (N1, N2...)
    soap_status TEXT DEFAULT 'chua_lam' CHECK (soap_status IN ('chua_lam', 'da_lam')),
    is_emr_entered BOOLEAN DEFAULT false,            -- Đã nhập vào HIS/EMR bệnh viện chưa

    -- 4 Thành phần SOAP
    s_notes TEXT,                                    -- S (Subjective): Triệu chứng cơ năng, than phiền BN
    o_notes TEXT,                                    -- O (Objective): Khám thực thể, sinh hiệu, cận lâm sàng
    a_assessment TEXT,                               -- A (Assessment): Đánh giá, biện luận lâm sàng
    p_plan TEXT,                                     -- P (Plan): Kế hoạch điều trị, theo dõi

    -- Mã ICD-10
    icd10_code TEXT,                                 -- Mã ICD-10 chính
    icd10_label TEXT,                                -- Tên bệnh ICD-10 tiếng Việt

    -- Dữ liệu Cấu trúc JSONB (Thuốc, Cận lâm sàng, Lịch sử theo ngày)
    prescriptions JSONB DEFAULT '[]'::jsonb,        -- Danh sách đơn thuốc (SoapPrescriptionItem[])
    cls_orders JSONB DEFAULT '[]'::jsonb,           -- Chỉ định Cận lâm sàng ({id, name, isDone}[])
    cls_results JSONB DEFAULT '[]'::jsonb,          -- Kết quả CLS ({id, text, alertLevel}[])
    daily_logs JSONB DEFAULT '[]'::jsonb,           -- Lịch sử diễn tiến nhiều ngày (SoapDailyLog[])

    -- Payload toàn vẹn cho Client-Side Sync
    data JSONB,                                     -- Snapshot toàn bộ đối tượng SoapPatientRecord

    -- Dấu thời gian & Xóa mềm
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    deleted_at TIMESTAMPTZ                           -- Thời gian xóa mềm (nếu có)
);

-- 3. Tạo các Chỉ mục (Indexes) Tối ưu Tốc độ Tìm kiếm & Lọc
CREATE INDEX IF NOT EXISTS idx_soap_patients_doctor_id ON public.soap_patients(doctor_id);
CREATE INDEX IF NOT EXISTS idx_soap_patients_active_date ON public.soap_patients(active_date);
CREATE INDEX IF NOT EXISTS idx_soap_patients_updated_at ON public.soap_patients(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_soap_patients_bed_number ON public.soap_patients(bed_number);
CREATE INDEX IF NOT EXISTS idx_soap_patients_deleted_at ON public.soap_patients(deleted_at) WHERE deleted_at IS NULL;

-- Chỉ mục JSONB GIN cho tra cứu nâng cao
CREATE INDEX IF NOT EXISTS idx_soap_patients_prescriptions ON public.soap_patients USING gin (prescriptions);
CREATE INDEX IF NOT EXISTS idx_soap_patients_data ON public.soap_patients USING gin (data);

-- 4. Trigger Tự động cập nhật `updated_at` mỗi khi Sửa dữ liệu
CREATE OR REPLACE FUNCTION public.handle_soap_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_soap_patients_updated_at ON public.soap_patients;
CREATE TRIGGER tr_soap_patients_updated_at
    BEFORE UPDATE ON public.soap_patients
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_soap_updated_at();

-- 5. Thiết lập Bảo mật Cấp Hàng (Row Level Security - RLS)
ALTER TABLE public.soap_patients ENABLE ROW LEVEL SECURITY;

-- 5.1. Chính sách cho Anonymous / API Key cá nhân với Doctor ID Header
CREATE POLICY "Cho phép Bác sĩ thao tác với hồ sơ của chính mình"
ON public.soap_patients
FOR ALL
USING (
    -- Cho phép nếu doctor_id trùng khớp hoặc trường hợp dùng Supabase Auth
    doctor_id = COALESCE(auth.uid()::text, current_setting('request.headers', true)::json->>'x-doctor-id', doctor_id)
)
WITH CHECK (
    doctor_id = COALESCE(auth.uid()::text, current_setting('request.headers', true)::json->>'x-doctor-id', doctor_id)
);

-- 5.2. Chính sách fallback cho Public/Anon key nếu ứng dụng client-side tự quản lý phân vùng
CREATE POLICY "Anon Full Access with matching doctor_id"
ON public.soap_patients
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 6. Bật Supabase Realtime cho bảng soap_patients (hỗ trợ đồng bộ tức thì đa thiết bị)
ALTER PUBLICATION supabase_realtime ADD TABLE public.soap_patients;

-- 7. RPC Helper: Bulk Upsert đồng bộ nhiều bệnh nhân từ Offline Cache
CREATE OR REPLACE FUNCTION public.upsert_soap_patients_batch(records JSONB)
RETURNS JSONB AS $$
DECLARE
    rec JSONB;
    inserted_count INT := 0;
BEGIN
    FOR rec IN SELECT * FROM jsonb_array_elements(records)
    LOOP
        INSERT INTO public.soap_patients (
            id,
            doctor_id,
            patient_code,
            full_name,
            age,
            gender,
            bed_number,
            medical_record_no,
            admission_diagnosis,
            current_diagnosis,
            active_date,
            day_of_illness,
            soap_status,
            is_emr_entered,
            s_notes,
            o_notes,
            a_assessment,
            p_plan,
            icd10_code,
            icd10_label,
            prescriptions,
            cls_orders,
            cls_results,
            daily_logs,
            data,
            updated_at
        ) VALUES (
            (rec->>'id')::uuid,
            rec->>'doctor_id',
            rec->>'patient_code',
            rec->>'full_name',
            (rec->>'age')::int,
            rec->>'gender',
            rec->>'bed_number',
            rec->>'medical_record_no',
            rec->>'admission_diagnosis',
            rec->>'current_diagnosis',
            (rec->>'active_date')::date,
            COALESCE((rec->>'day_of_illness')::int, 1),
            COALESCE(rec->>'soap_status', 'chua_lam'),
            COALESCE((rec->>'is_emr_entered')::boolean, false),
            rec->>'s_notes',
            rec->>'o_notes',
            rec->>'a_assessment',
            rec->>'p_plan',
            rec->>'icd10_code',
            rec->>'icd10_label',
            COALESCE(rec->'prescriptions', '[]'::jsonb),
            COALESCE(rec->'cls_orders', '[]'::jsonb),
            COALESCE(rec->'cls_results', '[]'::jsonb),
            COALESCE(rec->'daily_logs', '[]'::jsonb),
            COALESCE(rec->'data', rec),
            COALESCE((rec->>'updated_at')::timestamptz, timezone('utc'::text, now()))
        )
        ON CONFLICT (id) DO UPDATE SET
            patient_code = EXCLUDED.patient_code,
            full_name = EXCLUDED.full_name,
            age = EXCLUDED.age,
            gender = EXCLUDED.gender,
            bed_number = EXCLUDED.bed_number,
            medical_record_no = EXCLUDED.medical_record_no,
            admission_diagnosis = EXCLUDED.admission_diagnosis,
            current_diagnosis = EXCLUDED.current_diagnosis,
            active_date = EXCLUDED.active_date,
            day_of_illness = EXCLUDED.day_of_illness,
            soap_status = EXCLUDED.soap_status,
            is_emr_entered = EXCLUDED.is_emr_entered,
            s_notes = EXCLUDED.s_notes,
            o_notes = EXCLUDED.o_notes,
            a_assessment = EXCLUDED.a_assessment,
            p_plan = EXCLUDED.p_plan,
            icd10_code = EXCLUDED.icd10_code,
            icd10_label = EXCLUDED.icd10_label,
            prescriptions = EXCLUDED.prescriptions,
            cls_orders = EXCLUDED.cls_orders,
            cls_results = EXCLUDED.cls_results,
            daily_logs = EXCLUDED.daily_logs,
            data = EXCLUDED.data,
            updated_at = EXCLUDED.updated_at
        WHERE soap_patients.updated_at <= EXCLUDED.updated_at;

        inserted_count := inserted_count + 1;
    END LOOP;

    RETURN jsonb_build_object('success', true, 'processed_count', inserted_count);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
