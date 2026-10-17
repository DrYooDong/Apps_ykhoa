"""
CliniPortal DocSpace — Antigravity CLI Runner (agy-runner)
Công cụ dòng lệnh hiệu năng cao cho bác sĩ và lập trình viên:
- Thẩm định Schema Pydantic
- Đồng bộ CSDL CDSS
- Chạy chuỗi kiểm toán y khoa & linter
"""

import os
import sys
import json
import argparse
from pathlib import Path

# Fix Windows console UTF-8
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

CURRENT_DIR = Path(__file__).resolve().parent
ROOT_DIR = CURRENT_DIR.parent.parent
sys.path.insert(0, str(CURRENT_DIR))

from pipeline_orchestrator import ClinicalPipelineOrchestrator
from schemas import Prompt05EnrichedSchema, Prompt06WeightsSchema, Prompt07SoapCaseSchema


def main():
    parser = argparse.ArgumentParser(description="CliniPortal Antigravity CLI Runner")
    subparsers = parser.add_subparsers(dest="command", help="Lệnh thực thi")

    # Command: audit
    subparsers.add_parser("audit", help="Chạy kiểm định toàn diện (Linter, Tags, Index)")

    # Command: sync
    subparsers.add_parser("sync", help="Đồng bộ hóa CSDL Enriched CDSS Index")

    # Command: validate
    val_parser = subparsers.add_parser("validate", help="Thẩm định file JSON qua Antigravity Schema")
    val_parser.add_argument("file", help="Đường dẫn file JSON cần kiểm tra")
    val_parser.add_argument("--schema", choices=["prompt05", "prompt06", "prompt07"], default="prompt05")

    args = parser.parse_args()
    orchestrator = ClinicalPipelineOrchestrator(ROOT_DIR)

    if args.command == "audit":
        print("🩺 [Antigravity Audit] Bắt đầu quét kiểm định...")
        linter_res = orchestrator.run_linter()
        print(f"1. Medical Content Linter: {linter_res.get('status')}")
        if linter_res.get("stdout"):
            print(linter_res["stdout"].strip()[:500] + "...")

        index_res = orchestrator.run_build_enriched_index()
        print(f"2. Enriched CDSS Database Index: {index_res.get('status')}")
        print("🎉 [Antigravity Audit] Hoàn tất kiểm định hệ thống!")

    elif args.command == "sync":
        print("🔄 [Antigravity Sync] Đang đồng bộ hóa toàn bộ CSDL CDSS...")
        res = orchestrator.run_build_enriched_index()
        print(res.get("output") or "Đã đồng bộ thành công!")

    elif args.command == "validate":
        target_path = Path(args.file)
        if not target_path.exists():
            print(f"❌ File không tồn tại: {target_path}")
            sys.exit(1)

        print(f"🔬 [Antigravity Validate] Đang kiểm định: {target_path.name} với {args.schema}...")
        try:
            with open(target_path, "r", encoding="utf-8") as f:
                raw_data = json.load(f)

            if args.schema == "prompt05":
                validated = Prompt05EnrichedSchema(**raw_data)
                print(f"✅ Hợp lệ 100%! Bệnh: {validated.diseaseName} ({validated.icdCode})")
                print(f"   - Phân tầng nguy cơ: {len(validated.severityGrading)} mức độ")
                print(f"   - Lộ trình từng ngày (Bảng 4 Cột): {len(validated.timelinePhases)} giai đoạn")
                print(f"   - Cảnh báo nguy hiểm: {len(validated.warnings)} mục")
            elif args.schema == "prompt06":
                validated = Prompt06WeightsSchema(**raw_data)
                print(f"✅ Hợp lệ 100%! Bệnh slug: {validated.disease_slug}")
            elif args.schema == "prompt07":
                validated = Prompt07SoapCaseSchema(**raw_data)
                print(f"✅ Hợp lệ 100%! Ca SOAP: {validated.title} ({validated.case_id})")

        except Exception as e:
            print(f"❌ VI PHẠM SCHEMA CONTRACT:\n{e}")
            sys.exit(1)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
