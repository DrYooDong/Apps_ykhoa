"""
CliniPortal — Per-Domain Experience Library (Harnessing-Level Recursion)
Thu nạp từ kiến trúc google-research/harness2 (harness2/core/library.py).

Cấu trúc lưu trữ theo chuyên khoa / phân hệ (Retrieval by construction):
    .agents/learnings/library/<domain>/INDEX.md
    .agents/learnings/library/<domain>/entries/<task_slug>/EXPERIENCE.md

Mỗi mục kinh nghiệm bắt buộc có 4 trường chuẩn hóa:
  - cue:        Tình huống kích hoạt (khi nào áp dụng?)
  - lesson:     Bài học / quy trình kiểm chứng được (tái sử dụng, không học vẹt)
  - evidence:   Bằng chứng cụ thể từ sự cố/lần chạy thực tế
  - confidence: high | medium | low
"""

from __future__ import annotations

import argparse
import re
import shutil
import sys
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Sequence

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

ROOT_DIR = Path(__file__).resolve().parent.parent.parent
DEFAULT_LIBRARY_ROOT = ROOT_DIR / ".agents" / "learnings" / "library"

VALID_CONFIDENCE = ("high", "medium", "low")


def slugify(value: str) -> str:
    s = re.sub(r"[^a-zA-Z0-9_-]+", "-", value.strip().lower()).strip("-")
    return s or "entry"


def domain_dir(domain: str) -> str:
    return re.sub(r"\s*[/\\]\s*", "__", domain.strip().lower()) or "general"


def validate_experience(cue: str, lesson: str, evidence: str, confidence: str) -> None:
    for field_name, val in (("cue", cue), ("lesson", lesson), ("evidence", evidence)):
        if not isinstance(val, str) or len(val.strip()) < 8:
            raise ValueError(f"Trường '{field_name}' phải là chuỗi có ý nghĩa (>= 8 ký tự).")
    if confidence not in VALID_CONFIDENCE:
        raise ValueError(f"confidence phải thuộc {VALID_CONFIDENCE}, nhận được: {confidence!r}")


@dataclass
class ExperienceLibrary:
    """Thư viện kinh nghiệm theo từng domain (docspace, guidelines, clinical-handbook, cdss, ui-ux...)."""

    domain: str
    root: Path = DEFAULT_LIBRARY_ROOT

    @property
    def dir(self) -> Path:
        return self.root / domain_dir(self.domain)

    @property
    def index_path(self) -> Path:
        return self.dir / "INDEX.md"

    def entry_dir(self, task_id: str) -> Path:
        return self.dir / "entries" / slugify(task_id)

    def entries(self) -> list[str]:
        d = self.dir / "entries"
        return sorted(p.name for p in d.iterdir() if p.is_dir()) if d.is_dir() else []

    def add(
        self,
        *,
        task_id: str,
        cue: str,
        lesson: str,
        evidence: str,
        confidence: str = "high",
        dimension: str = "INV",
        artifacts: Sequence[str] = (),
    ) -> Path:
        validate_experience(cue, lesson, evidence, confidence)
        dim = dimension.upper()
        if dim not in ("INV", "DOM", "BOTH"):
            raise ValueError(f"dimension phải là INV, DOM hoặc BOTH, nhận được: {dimension!r}")

        d = self.entry_dir(task_id)
        d.mkdir(parents=True, exist_ok=True)
        now = datetime.now().strftime("%Y-%m-%d %H:%M")

        lines = [
            f"# {task_id}",
            "",
            f"- **domain**: `{self.domain}`",
            f"- **dimension**: `{dim}`",
            f"- **updated_at**: `{now}`",
            "",
            "## Transferable Lesson",
            f"- **cue**: {cue.strip()}",
            f"- **lesson**: {lesson.strip()}",
            f"- **evidence**: {evidence.strip()}",
            f"- **confidence**: {confidence}",
            "",
        ]
        if artifacts:
            lines.append("## Related Artifacts")
            lines.extend(f"- `{a}`" for a in artifacts)
            lines.append("")

        exp_file = d / "EXPERIENCE.md"
        exp_file.write_text("\n".join(lines), encoding="utf-8")
        self.rebuild_index()
        return exp_file

    def forget(self, task_id: str) -> bool:
        d = self.entry_dir(task_id)
        if not d.is_dir():
            return False
        shutil.rmtree(d, ignore_errors=True)
        self.rebuild_index()
        return True

    def rebuild_index(self) -> Path:
        rows = [
            f"# Experience Library — `{self.domain}`",
            "",
            "> Tra cứu theo phân hệ (Retrieval by Construction). Chỉ lưu quy trình tái sử dụng được, không lưu dữ kiện riêng lẻ.",
            "",
        ]
        names = self.entries()
        if not names:
            rows.append("_(Trống — chưa có mục kinh nghiệm nào cho phân hệ này)_")
        else:
            for name in names:
                exp = self.dir / "entries" / name / "EXPERIENCE.md"
                cue = _extract_field(exp, "cue")
                dim = _extract_field(exp, "dimension").strip("`")
                conf = _extract_field(exp, "confidence")
                rows.append(f"## `{name}` ({dim or 'INV'} | {conf or 'medium'})")
                if cue:
                    rows.append(f"- **Cue**: {cue}")
                rows.append(f"- **File**: `entries/{name}/EXPERIENCE.md`")
                rows.append("")
        self.dir.mkdir(parents=True, exist_ok=True)
        self.index_path.write_text("\n".join(rows), encoding="utf-8")
        return self.index_path


def _extract_field(path: Path, name: str) -> str:
    if not path.is_file():
        return ""
    prefix = f"- **{name}**:"
    for line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        if line.startswith(prefix):
            return line.split(":", 1)[1].strip()
    return ""


def _cli() -> int:
    parser = argparse.ArgumentParser(description="CliniPortal Per-Domain Experience Library CLI")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_add = sub.add_parser("add", help="Thêm hoặc cập nhật 1 mục kinh nghiệm")
    p_add.add_argument("--domain", required=True, help="Phân hệ (vd: docspace, guidelines, cdss, ui-ux)")
    p_add.add_argument("--task-id", required=True, help="Mã định danh task/sự cố")
    p_add.add_argument("--cue", required=True, help="Tình huống kích hoạt")
    p_add.add_argument("--lesson", required=True, help="Bài học/quy trình tái sử dụng")
    p_add.add_argument("--evidence", required=True, help="Bằng chứng thực tế")
    p_add.add_argument("--confidence", default="high", choices=VALID_CONFIDENCE)
    p_add.add_argument("--dimension", default="INV", choices=("INV", "DOM", "BOTH"))
    p_add.add_argument("--artifacts", nargs="*", default=())

    p_list = sub.add_parser("list", help="Liệt kê các mục kinh nghiệm của 1 domain")
    p_list.add_argument("--domain", required=True)

    args = parser.parse_args()
    lib = ExperienceLibrary(domain=args.domain)

    if args.cmd == "add":
        path = lib.add(
            task_id=args.task_id,
            cue=args.cue,
            lesson=args.lesson,
            evidence=args.evidence,
            confidence=args.confidence,
            dimension=args.dimension,
            artifacts=args.artifacts,
        )
        print(f"✅ Đã lưu kinh nghiệm tại: {path}")
        print(f"📚 Đã cập nhật mục lục: {lib.index_path}")
        return 0

    if args.cmd == "list":
        entries = lib.entries()
        if not entries:
            print(f"ℹ️ Domain '{args.domain}' chưa có mục kinh nghiệm nào.")
        else:
            print(f"📚 Experience Library [{args.domain}] ({len(entries)} entries):")
            for name in entries:
                cue = _extract_field(lib.dir / "entries" / name / "EXPERIENCE.md", "cue")
                print(f"  - {name}: {cue}")
        return 0

    return 1


if __name__ == "__main__":
    sys.exit(_cli())
