---
name: prompt-optimizer
description: Tối ưu hóa hiệu suất Prompt và tiết kiệm chi phí token: Phân tích baseline, cắt bỏ câu từ thừa thãi, chuỗi hóa prompt (Prompt chaining) và cấu trúc rõ ràng.
---

# âš¡ Prompt Optimizer

> Prompt verimliliÄŸini artÄ±rma ve token maliyeti dÃ¼ÅŸÃ¼rme metodolojisi.

---

*Prompt Optimizer v1.1 - Enhanced*

## ðŸ”„ Workflow

> **Kaynak:** [Anthropic - Prompt Engineering Best Practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering)

### AÅŸama 1: Analysis & Benchmarking
- [ ] **Analyze**: Mevcut promptun nerede hata yaptÄ±ÄŸÄ±nÄ± veya neden Ã§ok token harcadÄ±ÄŸÄ±nÄ± belirle.
- [ ] **Baseline**: BaÅŸarÄ± oranÄ±nÄ± ve ortalama token sayÄ±sÄ±nÄ± kaydet.

### AÅŸama 2: Rewriting & Compression
- [ ] **Clarity**: Gereksiz yan cÃ¼mleleri at, net emir kipleri kullan.
- [ ] **Compression**: Anlam kaybÄ± olmadan token sayÄ±sÄ±nÄ± azalt (Stopwords temizliÄŸi vb.).
- [ ] **Prompt Chaining**: Tek bir dev prompt yerine gÃ¶revleri kÃ¼Ã§Ã¼k, zincirleme promptlara bÃ¶l.

### AÅŸama 3: Verification (A/B Test)
- [ ] **Test**: Optimize edilmiÅŸ promptu eskisiyle aynÄ± inputlar Ã¼zerinde kÄ±yasla.
- [ ] **Score**: YanÄ±t doÄŸruluÄŸu, hÄ±zÄ± ve maliyeti Ã¼zerinden puanla.

### Kontrol NoktalarÄ±
| AÅŸama | DoÄŸrulama |
|-------|-----------|
| 1 | Token tasarrufu >%20 saÄŸlandÄ± mÄ±? |
| 2 | BaÅŸarÄ± oranÄ± (Accuracy) dÃ¼ÅŸtÃ¼ mÃ¼? |
| 3 | Modelin Ã§Ä±ktÄ± formatÄ± tutarlÄ± kalmaya devam ediyor mu? |

