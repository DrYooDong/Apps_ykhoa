"""
CliniPortal DocSpace — Antigravity Lifecycle Hook Handler
Nhận context JSON từ stdin của Antigravity Agent, thực thi kiểm định và trả JSON về stdout.
"""

import sys
import json
import subprocess
from pathlib import Path

# Cấu hình UTF-8
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

CURRENT_DIR = Path(__file__).resolve().parent
ROOT_DIR = CURRENT_DIR.parent.parent


def handle_hook():
    raw_input = "{}"
    try:
        if not sys.stdin.isatty():
            raw_input = sys.stdin.read()
    except Exception:
        pass

    try:
        payload = json.loads(raw_input) if raw_input.strip() else {}
    except Exception:
        payload = {}

    tool_call = payload.get("toolCall", {})
    tool_name = tool_call.get("name", "")
    args = tool_call.get("args", {}) or {}
    target_file = args.get("TargetFile") or args.get("Path") or ""

    warnings: list[str] = []

    # Nguyên lý Harness²: "A successful write call does not establish usability"
    # Kiểm chứng cơ học tức thì ngay trong vòng lặp tool sau mỗi thao tác ghi/sửa file.
    if tool_name in ["write_to_file", "write_file", "edit_file", "replace_file_content", "multi_replace_file_content"]:
        target_path = Path(target_file) if target_file else None

        # 1. Xác thực cú pháp JSON ngay lập tức cho mọi file .json trong workspace
        if target_path and target_path.suffix.lower() == ".json" and target_path.is_file():
            try:
                json.loads(target_path.read_text(encoding="utf-8"))
            except Exception as exc:
                warnings.append(f"[Harness2 Hook] Lỗi cú pháp JSON tại {target_path.name}: {exc}")

        # 2. Tự động đồng bộ build-enriched-cdss khi sửa file trong docspace/data/enriched/*.json
        if "enriched" in target_file and target_file.endswith(".json") and not warnings:
            script_path = ROOT_DIR / "tools" / "scripts" / "build-enriched-cdss.mjs"
            if script_path.exists():
                res = subprocess.run(
                    ["node", str(script_path)],
                    cwd=str(ROOT_DIR),
                    capture_output=True,
                    encoding="utf-8",
                    errors="replace",
                    timeout=30,
                )
                if res.returncode != 0:
                    warnings.append(
                        f"[Harness2 Hook] build-enriched-cdss.mjs lỗi (code {res.returncode}): {(res.stderr or res.stdout)[:300]}"
                    )

    # PostToolUse chuẩn trả về JSON object (kèm targeted hint nếu có lỗi cơ học)
    out: dict = {}
    if warnings:
        out["additionalContext"] = "\n".join(warnings)
    sys.stdout.write(json.dumps(out, ensure_ascii=False))
    sys.stdout.flush()


if __name__ == "__main__":
    handle_hook()
