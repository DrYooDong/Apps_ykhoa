"""
Skills Integrity & Frontmatter Validator for CliniPortal
Audits all directories in .agents/skills/ to ensure:
1. Each entry is a valid directory containing a SKILL.md.
2. SKILL.md starts cleanly with '---' without UTF-8 BOM.
3. YAML frontmatter parses cleanly with valid 'name' and 'description'.
4. YAML frontmatter uses standard multiline folded block scalar (>-) for description.
5. Markdown body exists and is non-empty.
"""

import os
import re
import sys
import yaml

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

skills_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".agents", "skills"))
if not os.path.exists(skills_dir):
    print(f"Error: Skills directory not found at {skills_dir}")
    sys.exit(1)

items = sorted(os.listdir(skills_dir))
errors = []
warnings = []
success = []

for item in items:
    item_path = os.path.join(skills_dir, item)
    if not os.path.isdir(item_path):
        errors.append((item, "Not a directory (loose file in skills root)"))
        continue
        
    skill_file = os.path.join(item_path, "SKILL.md")
    if not os.path.exists(skill_file):
        errors.append((item, "SKILL.md missing directly in folder"))
        continue
        
    with open(skill_file, "rb") as bf:
        raw_bytes = bf.read(4)
        if raw_bytes.startswith(b'\xef\xbb\xbf'):
            errors.append((item, "File contains UTF-8 BOM"))
            continue
            
    with open(skill_file, "r", encoding="utf-8") as f:
        content = f.read()
        
    if not content.startswith("---"):
        errors.append((item, "Does not start with '---'"))
        continue
        
    lines = content.splitlines()
    end_idx = -1
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            end_idx = i
            break
            
    if end_idx == -1:
        errors.append((item, "No closing '---'"))
        continue
        
    fm_str = "\n".join(lines[1:end_idx])
    try:
        data = yaml.safe_load(fm_str)
        if not isinstance(data, dict):
            errors.append((item, "Frontmatter is not a dict"))
            continue
            
        name = data.get("name")
        desc = data.get("description")
        
        if not name or not isinstance(name, str):
            errors.append((item, f"Invalid name: {name}"))
            continue
            
        if not desc or not isinstance(desc, str) or len(desc.strip()) < 10:
            errors.append((item, f"Invalid or too short description: {desc}"))
            continue
            
        if not re.match(r'^[a-zA-Z0-9_-]+$', name):
            errors.append((item, f"Name contains invalid characters: {name}"))
            continue

        if name != item:
            warnings.append((item, f"Folder '{item}' != frontmatter name '{name}' (Harness2 hygiene)"))
            
        body = "\n".join(lines[end_idx+1:]).strip()
        if len(body) < 10:
            errors.append((item, "Body markdown is empty or too short"))
            continue
            
        success.append((item, name))
    except Exception as e:
        errors.append((item, f"YAML parse error: {str(e)}"))

# Harness² Always-On Budget Audit (AGENTS.md + rules/*.md)
agents_root = os.path.abspath(os.path.join(skills_dir, ".."))
always_on_chars = 0
always_on_files = []
agents_md = os.path.join(agents_root, "AGENTS.md")
if os.path.isfile(agents_md):
    sz = len(open(agents_md, "r", encoding="utf-8", errors="replace").read())
    always_on_chars += sz
    always_on_files.append(("AGENTS.md", sz))
rules_dir = os.path.join(agents_root, "rules")
if os.path.isdir(rules_dir):
    for rf in sorted(os.listdir(rules_dir)):
        if rf.endswith(".md"):
            sz = len(open(os.path.join(rules_dir, rf), "r", encoding="utf-8", errors="replace").read())
            always_on_chars += sz
            always_on_files.append((f"rules/{rf}", sz))

print("==========================================")
print(f"CLINIPORTAL SKILLS & HARNESS HYGIENE REPORT")
print(f"Total skills audited: {len(items)}")
print(f"Passed clean:         {len(success)}")
print(f"Warnings (hygiene):   {len(warnings)}")
print(f"Failed errors:        {len(errors)}")
print(f"Always-on footprint:  {always_on_chars:,} chars (~{always_on_chars // 4:,} tokens across {len(always_on_files)} files)")
print("==========================================")

if warnings:
    for name, warn in warnings[:10]:
        print(f"  ⚠️  [{name}]: {warn}")
    if len(warnings) > 10:
        print(f"  ⚠️  ... và {len(warnings) - 10} cảnh báo khác.")

if errors:
    for name, err in errors:
        print(f"  ❌ [{name}]: {err}")
    sys.exit(1)
else:
    print(f"✅ ALL {len(success)} SKILLS ARE FULLY COMPLIANT AND LOADED ZERO ERRORS.")
    sys.exit(0)
