#!/usr/bin/env python3
"""
CliniPortal Media Optimization Pipeline (tools/scripts/optimize-media.py)
1. Xóa an toàn ảnh raster mồ côi (.png/.jpg/.jpeg/.gif) trong src/content/ (giữ nguyên mọi .svg & template).
2. Chuyển đổi ảnh raster đang sử dụng > 200 KB trong src/content/ sang WebP (quality=85, method=6)
   và tự động cập nhật toàn bộ đường dẫn tham chiếu trong mã nguồn.
"""

import os
import re
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
SRC_CONTENT = os.path.join(ROOT, 'src', 'content')
RASTER_EXTS = {'.png', '.jpg', '.jpeg', '.gif'}
CODE_EXTS = {'.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.html', '.css', '.md', '.mdx', '.json'}
IGNORE_DIRS = {'node_modules', '.git', 'dist', 'archive', '.agents', '.gemini', 'tools'}
MIN_CONVERT_BYTES = 200 * 1024  # 200 KB


def collect_all_references():
    refs = set()
    pat = re.compile(r'[a-zA-Z0-9_.-]+\.(?:png|jpg|jpeg|svg|webp|gif|ico)', re.I)
    for base in ['src', 'public', 'platforms', 'knowledge-vault']:
        p = os.path.join(ROOT, base)
        if not os.path.exists(p):
            continue
        for r, dirs, files in os.walk(p):
            dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
            for f in files:
                if os.path.splitext(f)[1].lower() in CODE_EXTS:
                    fp = os.path.join(r, f)
                    try:
                        txt = open(fp, 'r', encoding='utf-8', errors='ignore').read()
                        for m in pat.findall(txt):
                            refs.add(m.lower())
                    except OSError:
                        pass
    for root_f in ['index.html', 'manifest.json']:
        fp = os.path.join(ROOT, root_f)
        if os.path.exists(fp):
            txt = open(fp, 'r', encoding='utf-8', errors='ignore').read()
            for m in pat.findall(txt):
                refs.add(m.lower())
    return refs


def collect_src_code_files():
    result = []
    for base in ['src']:
        p = os.path.join(ROOT, base)
        for r, dirs, files in os.walk(p):
            dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
            for f in files:
                if os.path.splitext(f)[1].lower() in CODE_EXTS:
                    result.append(os.path.join(r, f))
    for root_f in ['index.html']:
        fp = os.path.join(ROOT, root_f)
        if os.path.exists(fp):
            result.append(fp)
    return result


def main():
    print('======================================================================')
    print('  🖼️  CLINIPORTAL MEDIA OPTIMIZER (ORPHAN GC + PNG/JPG -> WEBP)')
    print('======================================================================')

    refs = collect_all_references()

    orphan_deleted = 0
    orphan_bytes = 0
    converted_count = 0
    saved_webp_bytes = 0
    rename_map = {}  # exact basename -> new webp basename

    # 1. Quét tất cả ảnh raster trong src/content/
    for r, dirs, files in os.walk(SRC_CONTENT):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for f in files:
            ext = os.path.splitext(f)[1].lower()
            if ext not in RASTER_EXTS:
                continue
            fp = os.path.join(r, f)
            sz = os.path.getsize(fp)

            # A. Xóa ảnh raster mồ côi
            if f.lower() not in refs:
                try:
                    os.remove(fp)
                    orphan_deleted += 1
                    orphan_bytes += sz
                except OSError as e:
                    print(f'  [WARN] Cannot delete {fp}: {e}')
                continue

            # B. Chuyển đổi ảnh raster đang dùng > 200 KB sang WebP
            if sz >= MIN_CONVERT_BYTES and ext in {'.png', '.jpg', '.jpeg'}:
                stem = os.path.splitext(f)[0]
                webp_name = f'{stem}.webp'
                webp_path = os.path.join(r, webp_name)
                try:
                    with Image.open(fp) as img:
                        if img.mode not in ('RGB', 'RGBA'):
                            img = img.convert('RGBA' if 'A' in img.getbands() else 'RGB')
                        img.save(webp_path, 'WEBP', quality=85, method=6)
                    new_sz = os.path.getsize(webp_path)
                    if new_sz < sz:
                        os.remove(fp)
                        rename_map[f] = webp_name
                        converted_count += 1
                        saved_webp_bytes += (sz - new_sz)
                    else:
                        os.remove(webp_path)
                except Exception as e:
                    print(f'  [WARN] Failed to convert {fp}: {e}')
                    if os.path.exists(webp_path):
                        os.remove(webp_path)

    # 2. Cập nhật tham chiếu tên file trong mã nguồn & MDX
    updated_files = 0
    if rename_map:
        code_files = collect_src_code_files()
        # Sắp xếp tên dài trước để tránh thay thế một phần
        pairs = sorted(rename_map.items(), key=lambda x: -len(x[0]))
        for cf in code_files:
            try:
                orig = open(cf, 'r', encoding='utf-8').read()
            except Exception:
                continue
            next_txt = orig
            changed = False
            for old_name, new_name in pairs:
                if old_name in next_txt:
                    next_txt = next_txt.replace(old_name, new_name)
                    changed = True
            if changed:
                with open(cf, 'w', encoding='utf-8', newline='') as out:
                    out.write(next_txt)
                updated_files += 1

    # 3. Dọn thư mục trống trong src/content/
    empty_dirs = 0
    for r, dirs, files in os.walk(SRC_CONTENT, topdown=False):
        if any(ign in r.split(os.sep) for ign in IGNORE_DIRS):
            continue
        if not os.listdir(r):
            try:
                os.rmdir(r)
                empty_dirs += 1
            except OSError:
                pass

    total_saved_mb = (orphan_bytes + saved_webp_bytes) / (1024 * 1024)
    print(f'  🗑️  Ảnh raster mồ côi đã xóa : {orphan_deleted} files ({orphan_bytes / 1048576:.2f} MB)')
    print(f'  ✨ Ảnh PNG/JPG -> WebP       : {converted_count} files (tiết kiệm {saved_webp_bytes / 1048576:.2f} MB)')
    print(f'  📝 Tệp mã nguồn đã cập nhật  : {updated_files} files')
    print(f'  📁 Thư mục trống đã dọn      : {empty_dirs} dirs')
    print('----------------------------------------------------------------------')
    print(f'  🎉 TỔNG DUNG LƯỢNG GIẢI PHÓNG: {total_saved_mb:.2f} MB')
    print('======================================================================')


if __name__ == '__main__':
    main()
