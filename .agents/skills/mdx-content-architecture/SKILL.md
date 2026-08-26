---
name: mdx-content-architecture
description: Thiết kế, đánh giá và tái cấu trúc kiến trúc nội dung MDX cho documentation, blog, marketing site, knowledge base hoặc content platform. Dùng khi cần quy hoạch content types, folder structure, routing, frontmatter schema, MDX components, validation, SEO, localization và governance.
version: 1.0.0
updated: 2026-08-26
tags:
  - mdx
  - content-architecture
  - documentation
  - frontmatter
  - content-modeling
  - ia
---

# MDX Content Architecture

Skill này hướng dẫn thiết kế và đánh giá kiến trúc nội dung MDX theo hướng bền vững, dễ mở rộng, dễ bảo trì, hỗ trợ SEO, localization, component hóa và validation ở build time.

## Khi nào nên dùng skill này

Dùng skill này khi người dùng yêu cầu một trong các việc sau:

- Thiết kế cấu trúc thư mục cho project MDX.
- Xây dựng documentation site bằng MDX.
- Tổ chức blog, docs, knowledge base, changelog, tutorial, marketing pages bằng MDX.
- Định nghĩa frontmatter schema cho MDX.
- Quy hoạch content types: `doc`, `blog-post`, `landing-page`, `tutorial`, `api-reference`, `faq`, `snippet`, `partial`.
- Thiết kế routing cho MDX.
- Chuẩn hóa MDX components dùng trong nội dung.
- Audit hoặc refactor hệ thống MDX đang rối, thiếu nhất quán.
- Di chuyển nội dung từ Markdown, CMS, wiki hoặc source khác sang MDX.
- Cần chiến lược localization, versioning, ownership, review workflow cho MDX content.

Không nên dùng skill này nếu câu hỏi chỉ là viết nội dung MDX đơn lẻ hoặc fix lỗi cú pháp MDX nhỏ. Trong các trường hợp đó, ưu tiên trả lời trực tiếp theo yêu cầu cụ thể.

## Mục tiêu đầu ra

Khi được yêu cầu thiết kế kiến trúc MDX, câu trả lời nên bao gồm:

1. Tóm tắt định hướng kiến trúc.
2. Danh sách content types.
3. Sơ đồ thư mục đề xuất.
4. Quy tắc đặt tên file và slug.
5. Frontmatter schema cho từng content type.
6. Chiến lược routing.
7. Danh mục MDX components được phép dùng.
8. Quy tắc validation và QA.
9. Quy trình governance nếu project có nhiều người viết.
10. Kế hoạch migration nếu đang refactor từ hệ thống cũ.

## Nguyên tắc thiết kế

### 1. Nội dung là dữ liệu có cấu trúc

MDX không chỉ là Markdown có JSX. Nội dung MDX nên được xem như dữ liệu có schema, có thể query, validate, render và tái sử dụng.

Ưu tiên:

- Frontmatter có schema rõ ràng.
- Có validation bằng Zod, Valibot, ArkType, TypeBox hoặc công cụ tương đương.
- Content type xác định rõ mục đích, route, fields, lifecycle.
- Nội dung không phụ thuộc ngầm vào runtime app state.

### 2. Tách rõ content, component và application code

Kiến trúc tốt cần tách ba lớp:

```text
content/
  Nội dung MDX, frontmatter, assets đi kèm nội dung.

src/components/mdx/
  Các component trình bày được phép dùng bên trong MDX.

src/app hoặc src/pages hoặc lib/
  Code ứng dụng, layout, routing, data loading, business logic.
```

Không nên đặt logic nghiệp vụ phức tạp trực tiếp trong file MDX.

### 3. Stable URLs

URL nên ổn định, dễ đoán, thân thiện SEO và không gắn với chi tiết triển khai tạm thời.

Ưu tiên:

- `/docs/getting-started/installation`
- `/blog/mdx-content-architecture`
- `/guides/design-system/tokens`

Hạn chế:

- URL chứa ID nội bộ.
- URL chứa timestamp không cần thiết.
- Đổi URL không có redirect.
- Slug sinh tự động không kiểm soát.

### 4. Một content type, một mục đích

Mỗi content type nên trả lời một câu hỏi rõ ràng:

- `doc`: hướng dẫn hoặc tài liệu tham khảo.
- `blog-post`: bài viết theo thời gian.
- `tutorial`: hướng dẫn từng bước có mục tiêu hoàn thành.
- `api-reference`: tài liệu API.
- `landing-page`: trang marketing hoặc trang sản phẩm.
- `changelog-entry`: bản ghi thay đổi theo phiên bản.
- `faq-item`: câu hỏi và câu trả lời ngắn.
- `partial`: đoạn nội dung tái sử dụng, không có route riêng.

Nếu một loại nội dung vừa giống doc vừa giống blog, cần tách rõ mục đích chính thay vì gộp chung.

### 5. Ưu tiên convention hơn configuration

Chỉ thêm cấu hình khi convention không đủ. Ví dụ:

- Mặc định slug từ đường dẫn file.
- Mặc định `title` từ frontmatter.
- Mặc định `order` từ frontmatter hoặc sidebar config.
- Chỉ override khi thật sự cần.

## Quy trình thiết kế MDX content architecture

### Bước 1: Xác định loại website

Trước tiên xác định site thuộc nhóm nào:

- Documentation site.
- Blog cá nhân hoặc blog công ty.
- Marketing site.
- Product knowledge base.
- Developer portal.
- Hybrid docs + blog + marketing.
- Content-driven app.

Mỗi loại sẽ ảnh hưởng đến routing, frontmatter, component contract và governance.

### Bước 2: Kiểm kê nội dung

Liệt kê các nhóm nội dung hiện có hoặc dự kiến:

- Getting started.
- Guides.
- API reference.
- CLI reference.
- Tutorials.
- Blog posts.
- Announcements.
- Changelog.
- FAQ.
- Legal pages.
- Landing pages.
- Examples.
- Snippets/partials.

Nếu người dùng chưa có nội dung cụ thể, đề xuất bộ content types tối thiểu theo loại website.

### Bước 3: Định nghĩa content types

Với mỗi content type, xác định:

- Tên content type.
- Mục đích.
- Đối tượng đọc.
- Route pattern.
- Frontmatter bắt buộc.
- Frontmatter tùy chọn.
- Component MDX được phép dùng.
- Trạng thái lifecycle.
- Owner hoặc team phụ trách.

### Bước 4: Thiết kế cấu trúc thư mục

Ưu tiên cấu trúc theo content type hoặc theo product area. Với project nhỏ và vừa, dùng cấu trúc theo content type. Với project lớn, có thể kết hợp product area bên trong content type.

Ví dụ tổng quát:

```text
content/
  docs/
    getting-started/
      index.mdx
      installation.mdx
      quick-start.mdx
    guides/
      index.mdx
      authentication.mdx
      deployment.mdx
    api/
      index.mdx
      users.mdx
      webhooks.mdx
  blog/
    2026-08-mdx-content-architecture.mdx
    2026-07-release-notes.mdx
  pages/
    about.mdx
    pricing.mdx
    contact.mdx
  partials/
    callouts/
      beta-feature.mdx
    footers/
      newsletter-cta.mdx
  assets/
    images/
    diagrams/
```

Nếu dùng framework có content collections như Astro, Velite, Contentlayer, Next.js với custom loader, cần điều chỉnh theo convention của framework đó.

### Bước 5: Định nghĩa frontmatter schema

Mỗi content type cần có schema riêng. Không dùng frontmatter tự do cho toàn bộ site.

Frontmatter baseline thường có:

```yaml
title: Tiêu đề trang
description: Mô tả ngắn cho SEO và list page
status: draft | review | published | deprecated
updated: 2026-08-26
```

Tùy content type, thêm các trường:

- `tags`
- `category`
- `order`
- `sidebar_label`
- `slug`
- `authors`
- `publishedAt`
- `featured`
- `coverImage`
- `canonical`
- `version`
- `apiMethod`
- `apiPath`
- `productArea`
- `audience`
- `related`

### Bước 6: Thiết kế routing

Quy tắc routing đề xuất:

- Docs: `/docs/[...slug]`
- Blog: `/blog/[slug]`
- Tutorials: `/tutorials/[slug]`
- API: `/docs/api/[resource]` hoặc `/api-reference/[resource]`
- Pages: route trực tiếp, ví dụ `/about`, `/pricing`
- Partials: không có route.

Quy tắc slug:

- Slug nên ngắn, dễ đọc, không chứa ngày nếu không cần.
- Không dùng ký tự đặc biệt.
- Ưu tiên kebab-case.
- Nếu frontmatter có `slug`, nó phải unique trong cùng collection.
- Nếu không có `slug`, sinh slug từ đường dẫn file.
- Khi đổi slug hoặc di chuyển file, phải có redirect.

### Bước 7: Định nghĩa MDX component contract

MDX components nên là components trình bày, không chứa business logic phức tạp.

Nhóm component nên có:

- `Callout`
- `Note`
- `Warning`
- `Tip`
- `Steps`
- `Step`
- `Tabs`
- `Tab`
- `CodeBlock`
- `CodeGroup`
- `Card`
- `CardGrid`
- `LinkCard`
- `Table`
- `Accordion`
- `AccordionItem`
- `YouTubeEmbed`
- `Image`
- `Mermaid`
- `ApiReference`
- `ParamField`
- `ResponseExample`

Quy tắc:

- Component phải serializable hoặc nhận props đơn giản.
- Không gọi database trực tiếp trong component MDX nếu không có pattern được kiểm soát.
- Không phụ thuộc vào auth context nếu content là public.
- Không dùng component để nhúng business logic động khó bảo trì.
- Mọi component dùng trong MDX nên có tài liệu ngắn: props, ví dụ, khi nào dùng.

### Bước 8: Validation và QA

Kiến trúc MDX tốt phải có validation ở build time.

Nên kiểm tra:

- Frontmatter hợp lệ.
- Các trường bắt buộc không thiếu.
- `status` nằm trong enum hợp lệ.
- Ngày tháng parse được.
- Slug unique.
- Ảnh tồn tại và có alt text.
- Liên kết nội bộ không gãy.
- Heading có thứ tự hợp lý.
- Không có component MDX chưa đăng ký.
- Không có JSX không hợp lệ.
- Metadata SEO hợp lệ: `title`, `description`, `og:image` nếu cần.

Công cụ gợi ý:

- Zod, Valibot, ArkType cho schema.
- remark/rehype plugins cho lint và transform.
- ESLint plugin cho MDX nếu có.
- markdownlint hoặc lint tùy chỉnh.
- link checker trong CI.
- typegen nếu dùng Contentlayer, Velite hoặc loader tương tự.

### Bước 9: Governance và workflow

Nếu project có nhiều người viết, nên định nghĩa:

- Trạng thái nội dung: `draft`, `review`, `published`, `deprecated`.
- Ownership theo thư mục hoặc content type.
- Review checklist.
- Quy tắc đặt tên file.
- Quy tắc thêm ảnh.
- Quy tắc thêm component mới.
- Quy tắc thay đổi URL.
- Quy tắc archive nội dung cũ.

Lifecycle gợi ý:

```text
draft -> review -> published -> deprecated -> archived
```

## Mẫu frontmatter schema

### Baseline schema

```yaml
title: string, bắt buộc
description: string, khuyến nghị bắt buộc với trang public
status: draft | review | published | deprecated
updated: date
tags: string[]
```

### Doc schema

```yaml
title: string, bắt buộc
description: string, bắt buộc
status: draft | review | published | deprecated
order: number, tùy chọn
sidebar_label: string, tùy chọn
productArea: string, tùy chọn
version: string, tùy chọn
related: string[], tùy chọn
```

Ví dụ:

```mdx
---
title: Cài đặt
description: Hướng dẫn cài đặt SDK và cấu hình ban đầu.
status: published
order: 2
productArea: sdk
---
```

### Blog post schema

```yaml
title: string, bắt buộc
description: string, bắt buộc
status: draft | review | published
publishedAt: date, bắt buộc khi published
authors: string[], bắt buộc
tags: string[]
featured: boolean, mặc định false
coverImage: string, tùy chọn
canonical: string, tùy chọn
```

Ví dụ:

```mdx
---
title: Thiết kế kiến trúc nội dung MDX
description: Cách tổ chức MDX bền vững cho docs và blog.
status: published
publishedAt: 2026-08-26
authors:
  - content-team
tags:
  - mdx
  - architecture
featured: false
---
```

### Tutorial schema

```yaml
title: string, bắt buộc
description: string, bắt buộc
status: draft | review | published
difficulty: beginner | intermediate | advanced
estimatedMinutes: number
prerequisites: string[]
related: string[]
```

Ví dụ:

```mdx
---
title: Xây dựng docs site bằng MDX
description: Hướng dẫn từng bước để tạo documentation site.
status: published
difficulty: intermediate
estimatedMinutes: 45
prerequisites:
  - Biết React cơ bản
  - Biết Markdown
---
```

### API reference schema

```yaml
title: string, bắt buộc
description: string, bắt buộc
apiMethod: GET | POST | PUT | PATCH | DELETE
apiPath: string
status: draft | review | published | deprecated
version: string, tùy chọn
```

Ví dụ:

```mdx
---
title: List users
description: Lấy danh sách người dùng với phân trang.
apiMethod: GET
apiPath: /v1/users
status: published
---
```

### Landing page schema

```yaml
title: string, bắt buộc
description: string, bắt buộc
status: draft | review | published
slug: string, tùy chọn
ogImage: string, tùy chọn
hideFromNav: boolean, mặc định false
```

Ví dụ:

```mdx
---
title: Pricing
description: Bảng giá và gói sản phẩm.
status: published
hideFromNav: false
---
```

## Mẫu cấu trúc theo loại site

### Documentation site

```text
content/
  docs/
    getting-started/
      index.mdx
      installation.mdx
      quick-start.mdx
    core-concepts/
      index.mdx
      authentication.mdx
      permissions.mdx
    guides/
      index.mdx
      deployment.mdx
      webhooks.mdx
    api/
      index.mdx
      users.mdx
      projects.mdx
    changelog/
      index.mdx
```

Routing:

```text
/docs
/docs/getting-started
/docs/getting-started/installation
/docs/api/users
```

### Blog

```text
content/
  blog/
    2026-08-mdx-content-architecture.mdx
    2026-07-release-notes.mdx
  authors/
    content-team.mdx
  partials/
    newsletter-cta.mdx
```

Routing:

```text
/blog
/blog/mdx-content-architecture
/blog/release-notes
```

Không nên đặt ngày trong URL blog trừ khi có yêu cầu SEO hoặc archive đặc biệt.

### Hybrid docs + blog + marketing

```text
content/
  docs/
  blog/
  pages/
  partials/
  assets/
```

Routing:

```text
/docs/...
/blog/...
/about
/pricing
/contact
```

### Multilingual site

Có hai pattern phổ biến.

Pattern theo locale folder:

```text
content/
  en/
    docs/
    blog/
  vi/
    docs/
    blog/
```

Pattern theo file locale:

```text
content/
  docs/
    installation.en.mdx
    installation.vi.mdx
```

Khuyến nghị:

- Dùng locale folder nếu nội dung lớn và cần tách rõ ownership.
- Dùng file locale nếu cần đồng bộ nội dung theo từng bài.
- Luôn có trường `locale` nếu dùng query chung.
- Không trộn lẫn nhiều ngôn ngữ trong cùng một collection nếu không có schema rõ ràng.

## Quy tắc đặt tên file

Khuyến nghị:

- Dùng kebab-case.
- Dùng `.mdx` cho file có component hoặc cần JSX.
- Dùng `index.mdx` cho trang mục lục của một thư mục.
- Tên file nên phản ánh slug cuối cùng.
- Không dùng khoảng trắng.
- Không dùng ký tự đặc biệt.
- Không dùng prefix ngày cho docs, trừ changelog.

Ví dụ tốt:

```text
getting-started/installation.mdx
guides/authentication.mdx
api/users.mdx
```

Ví dụ nên tránh:

```text
Getting Started Final.mdx
auth_v2_new.mdx
Untitled 3.mdx
```

## Quy tắc tổ chức assets

Assets nên được tổ chức gần nội dung nếu thuộc về một bài, hoặc tập trung nếu dùng chung.

Pattern 1: assets theo từng mục

```text
content/
  docs/
    guides/
      deployment.mdx
      deployment/
        architecture.png
```

Pattern 2: assets tập trung

```text
content/
  assets/
    images/
      docs/
        deployment-architecture.png
```

Quy tắc:

- Ảnh phải có alt text.
- Ưu tiên định dạng tối ưu: WebP, AVIF nếu phù hợp.
- Không commit ảnh dung lượng quá lớn.
- Ảnh dùng chung nên nằm trong `assets`.
- Ảnh chỉ dùng cho một bài có thể đặt cạnh bài đó.

## MDX component contract mẫu

Khi thiết kế component cho MDX, nên trả lời:

1. Component này dùng để làm gì?
2. Khi nào nên dùng?
3. Khi nào không nên dùng?
4. Props là gì?
5. Có yêu cầu accessibility không?
6. Có được phép dùng trong mọi content type không?

Ví dụ component contract:

```mdx
<Callout type="warning" title="Production only">
  Tính năng này chỉ nên dùng trong môi trường production.
</Callout>
```

Quy tắc:

- `Callout` chỉ nhận `type`, `title`, `children`.
- `type` thuộc enum: `info`, `warning`, `tip`, `danger`, `success`.
- Không truyền component phức tạp vào `Callout` nếu không cần.

Ví dụ khác:

```mdx
<Steps>
  <Step title="Cài đặt">
    Chạy lệnh `npm install`.
  </Step>
  <Step title="Cấu hình">
    Tạo file `.env`.
  </Step>
</Steps>
```

## Mẫu output khi thiết kế kiến trúc

Khi người dùng yêu cầu thiết kế, trả lời theo cấu trúc sau:

```mdx
## 1. Tóm tắt

Kiến trúc đề xuất cho project ...

## 2. Content types

| Content type | Mục đích | Route | Frontmatter chính |
|---|---|---|---|
| doc | Tài liệu hướng dẫn | /docs/[...slug] | title, description, status, order |
| blog-post | Bài viết blog | /blog/[slug] | title, description, publishedAt, authors |

## 3. Folder structure

```text
content/
  docs/
  blog/
  pages/
  partials/
```

## 4. Frontmatter schema

### doc

```yaml
title:
description:
status:
order:
```

## 5. Routing

- /docs/[...slug]
- /blog/[slug]

## 6. MDX components

- Callout
- Steps
- CodeBlock
- CardGrid

## 7. Validation

- Zod schema
- Link checker
- Image alt check
- Slug uniqueness

## 8. Governance

- draft -> review -> published
- Owner theo content area
- Review trước khi publish
```

## Decision tree

Nếu người dùng cần docs:

- Ưu tiên structure theo topic hoặc product area.
- Dùng `index.mdx` cho section landing.
- Có `order` hoặc sidebar config.
- Không dùng ngày trong route.
- Có versioning nếu tài liệu theo phiên bản sản phẩm.

Nếu người dùng cần blog:

- Route phẳng `/blog/[slug]`.
- Có `publishedAt`, `authors`, `tags`.
- Hỗ trợ draft.
- Có list page, tag page, author page nếu cần.
- Không tạo quá nhiều thư mục lồng nhau.

Nếu người dùng cần marketing pages:

- Route rõ ràng: `/pricing`, `/about`, `/features`.
- Frontmatter SEO tốt.
- Component CTA tách thành partial nếu tái sử dụng.
- Không trộn marketing pages vào docs collection.

Nếu người dùng cần API docs:

- Có content type riêng cho API endpoint.
- Frontmatter chứa method, path, version.
- Component hỗ trợ: `ParamField`, `ResponseExample`, `CodeBlock`.
- Có thể generate từ OpenAPI nếu phù hợp.

Nếu người dùng cần multilingual:

- Chọn locale folder hoặc file locale.
- Không để thiếu bản dịch mà vẫn publish như hoàn chỉnh.
- Có trường `locale` và `translationOf` nếu cần đồng bộ.

Nếu người dùng cần versioned docs:

- Chọn version trong folder hoặc branch collection.
- Ví dụ: `content/docs/v1`, `content/docs/v2`.
- Có `version` trong frontmatter.
- Route nên chứa version nếu người dùng cần chọn phiên bản.

## Anti-patterns cần tránh

Tránh các pattern sau:

1. Frontmatter không schema.
   - Mỗi file dùng một kiểu field khác nhau.
   - Không validate được.
   - Khó query và render.

2. Để MDX chứa logic ứng dụng phức tạp.
   - Gọi API tùy ý.
   - Phụ thuộc auth state.
   - Khó cache và khó preview.

3. Trộn nhiều content type vào một collection.
   - Docs, blog, landing pages nằm chung một folder không có phân loại.

4. URL không ổn định.
   - Đổi slug liên tục.
   - Không có redirect.

5. Component MDX không có tài liệu.
   - Người viết không biết component nào được phép dùng.
   - Dễ dùng sai props.

6. Ảnh và asset không có quy ước.
   - Ảnh đặt rải rác.
   - Không có alt.
   - Không tối ưu.

7. Không có trạng thái nội dung.
   - Không phân biệt được draft, review, published.

8. Thiếu governance khi nhiều người cùng viết.
   - Không có owner.
   - Không có review checklist.
   - Nội dung bị trùng hoặc mâu thuẫn.

## Checklist chất lượng

Trước khi kết thúc thiết kế, kiểm tra:

- [ ] Đã xác định loại website.
- [ ] Đã liệt kê content types.
- [ ] Mỗi content type có mục đích rõ ràng.
- [ ] Có folder structure đề xuất.
- [ ] Có quy tắc đặt tên file.
- [ ] Có frontmatter schema cho từng content type.
- [ ] Có route pattern rõ ràng.
- [ ] Có chiến lược slug và redirect.
- [ ] Có danh sách MDX components.
- [ ] Có quy tắc validation.
- [ ] Có cân nhắc SEO.
- [ ] Có cân nhắc accessibility.
- [ ] Có cân nhắc localization nếu cần.
- [ ] Có governance nếu project nhiều người viết.
- [ ] Có migration plan nếu refactor.

## Prompt kích hoạt gợi ý

Skill này nên được áp dụng khi gặp các yêu cầu như:

- “Thiết kế cấu trúc MDX cho documentation site.”
- “Tổ chức nội dung MDX cho blog và docs.”
- “Định nghĩa frontmatter schema cho MDX.”
- “Refactor thư mục MDX đang lộn xộn.”
- “Nên đặt blog, docs và pages như thế nào trong MDX?”
- “Tạo content architecture cho MDX trong Next.js/Astro/Docusaurus.”
- “Chuẩn hóa MDX components cho content team.”
- “Audit kiến trúc nội dung MDX hiện tại.”

## Hành vi mặc định

Khi được yêu cầu tạo kiến trúc MDX mà không có thêm thông tin:

1. Hỏi ngắn gọn nếu thiếu loại site hoặc phạm vi.
2. Nếu đủ thông tin, đưa ra kiến trúc mặc định gồm `docs`, `blog`, `pages`, `partials`.
3. Ưu tiên schema tối giản nhưng validate được.
4. Không đề xuất component phức tạp nếu chưa cần.
5. Đưa ra ví dụ frontmatter cụ thể.
6. Kèm checklist validation và governance.
7. Nếu người dùng đang dùng framework cụ thể, điều chỉnh theo framework đó.

## Framework notes

### Next.js

Nếu dùng Next.js:

- Có thể đặt `content/` ở root, ngoài `app/` hoặc `pages/`.
- Dùng `next-mdx-remote`, Velite, Contentlayer hoặc custom loader.
- Với App Router, route docs có thể là `app/docs/[...slug]/page.tsx`.
- Ưu tiên generate static nếu nội dung không quá động.
- Metadata nên được sinh từ frontmatter.

### Astro

Nếu dùng Astro:

- Ưu tiên Content Collections.
- Đặt schema trong `src/content.config.ts` hoặc file config phù hợp.
- Dùng `content/docs`, `content/blog`, `content/pages`.
- Validate bằng Zod schema.
- Route dùng `getCollection`.

### Docusaurus

Nếu dùng Docusaurus:

- Docs thường nằm trong `docs/`.
- Blog nằm trong `blog/`.
- Dùng `_category_.json` hoặc `_category_.yml` để cấu trúc sidebar.
- Frontmatter cần tuân theo convention của Docusaurus.
- Không nên tự thiết kế folder quá khác nếu không có nhu cầu đặc biệt.

### CMS-driven MDX

Nếu nội dung đến từ CMS:

- MDX có thể là template hoặc partial, không nhất thiết là source of truth.
- Cần phân biệt CMS content và local MDX partials.
- Frontmatter có thể được map từ CMS fields.
- Component contract phải đồng bộ giữa CMS và MDX renderer.

## Kết quả mong đợi

Sau khi áp dụng skill này, project MDX nên có:

- Content model rõ ràng.
- Folder structure dễ mở rộng.
- Frontmatter nhất quán và validate được.
- Routing ổn định.
- Component MDX có tài liệu.
- Nội dung dễ viết, dễ review, dễ publish.
- Hạn chế nợ kỹ thuật về nội dung.