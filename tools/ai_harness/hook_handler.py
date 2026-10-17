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

    # Nếu vừa sửa file JSON hoặc dữ liệu enriched, chạy đồng bộ build-enriched-cdss
    if tool_name in ["write_to_file", "replace_file_content", "multi_replace_file_content"]:
        target_file = tool_call.get("args", {}).get("TargetFile", "")
        if "enriched" in target_file and target_file.endswith(".json"):
            script_path = ROOT_DIR / "tools" / "scripts" / "build-enriched-cdss.mjs"
            if script_path.exists():
                subprocess.run(["node", str(script_path)], cwd=str(ROOT_DIR), capture_output=True)

    # PostToolUse chuẩn trả về JSON object rỗng
    sys.stdout.write(json.dumps({}))
    sys.stdout.flush()


if __name__ == "__main__":
    handle_hook()
