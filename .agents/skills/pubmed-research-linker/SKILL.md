---
name: pubmed-research-linker
description: Kỹ năng tích hợp tra cứu y văn, trích dẫn tài liệu tham khảo PubMed REST API (E-utilities), DOI, PMID cho bài viết y học chứng cứ trong CliniPortal.
---

# PubMed Research Linker — CliniPortal

Hướng dẫn tích hợp và hiển thị nguồn trích dẫn y khoa chuẩn quốc tế (NCBI PubMed E-utilities REST API, PMID, DOI) trong các trang Y học chứng cứ & phác đồ CliniPortal.

---

## 🔬 1. Định dạng Khối Trích dẫn Y văn (Medical Citation Block)

Mỗi bài phác đồ hoặc khuyến cáo lâm sàng cần có phần tài liệu tham khảo được format chuẩn NLM (National Library of Medicine):

```html
<section class="medical-references">
  <h3 class="ref-heading"><i class="fa-solid fa-book-medical"></i> Tài liệu Tham khảo (References)</h3>
  <ol class="ref-list">
    <li class="ref-item" id="ref-1">
      <span class="ref-authors">Jones SL, Smith AB, et al.</span>
      <span class="ref-title">Clinical Management of Acute Heart Failure: 2025 Guidelines.</span>
      <span class="ref-journal">N Engl J Med. 2025; 392(4): 312-325.</span>
      <a href="https://pubmed.ncbi.nlm.nih.gov/38123456/" target="_blank" rel="noopener" class="ref-link">
        <i class="fa-solid fa-arrow-up-right-from-square"></i> PMID: 38123456
      </a>
    </li>
  </ol>
</section>
```

---

## 🏷️ 1b. Thẻ Trích dẫn Nguồn Hạt nhân Trực tiếp (Traceable Citation Badge - Atlas Style)

Được gắn trực tiếp sau từng khẳng định y học (Atomic Fact) trong bài viết:

```html
<!-- Inline Traceable Citation Tag -->
<span class="medical-citation-badge" title="ESC 2023 Guidelines on Acute Heart Failure">
  <a href="https://pubmed.ncbi.nlm.nih.gov/38123456/" target="_blank" rel="noopener">
    <i class="fa-solid fa-quote-left"></i> [PMID: 38123456]
  </a>
</span>
```

---

## 🌐 2. Tích hợp PubMed E-utilities REST API (Client-side Fetch)

Fetch thông tin bài báo từ PubMed ID (PMID) sử dụng `fetch` thuần:

```javascript
async function fetchPubMedSummary(pmid) {
  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${pmid}&retmode=json`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const result = data.result[pmid];
    return {
      title: result.title,
      authors: result.authors.map(a => a.name).join(', '),
      journal: result.source,
      pubdate: result.pubdate,
      doi: result.articleids.find(id => id.idtype === 'doi')?.value || ''
    };
  } catch (error) {
    console.error('Lỗi fetch PubMed PMID:', pmid, error);
    return null;
  }
}
```
