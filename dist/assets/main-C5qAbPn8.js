var U=Object.defineProperty;var V=(s,e,t)=>e in s?U(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var f=(s,e,t)=>V(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();class j{get engine(){return typeof window<"u"&&window.CliniStorage?window.CliniStorage:null}async saveCalculation(e){const t=this.engine;return t?await t.saveCalculation(e):Date.now()}async getCalculationHistory(e={}){const t=this.engine;return t?await t.getCalculationHistory(e):[]}async toggleBookmark(e){const t=this.engine;return t?await t.toggleBookmark(e):!1}async isBookmarked(e){const t=this.engine;return t?await t.isBookmarked(e):!1}async saveNote(e,t,a=""){const n=this.engine;return n?await n.saveNote(e,t,a):Date.now()}async getNotes(e){const t=this.engine;return t?await t.getNotes(e):[]}}const _=new j;class X{get windowParser(){return typeof window<"u"&&window.CliniMarkdown?window.CliniMarkdown:null}parse(e){if(!e)return{html:"",toc:[]};const t=e.trim();return t.startsWith("<!DOCTYPE")||t.startsWith("<div")||t.startsWith("<section")||t.startsWith("<article")||t.startsWith("<main")||t.startsWith("<html")?{html:e,toc:[]}:this.windowParser&&typeof this.windowParser.parse=="function"?{html:this.windowParser.parse(e),toc:[]}:this.fallbackParse(e)}fallbackParse(e){const t=[];let a=[];const n=e.split(/\r?\n/);let i=!1,r="";for(let c=0;c<n.length;c++){let o=n[c];if(o.trim().startsWith("```")){i?(i=!1,a.push("</code></pre>")):(i=!0,r=o.trim().slice(3).trim(),a.push(`<pre><code class="language-${r}">`));continue}if(i){a.push(this.escapeHtml(o));continue}if(o.trim().startsWith(">")){let h="note-box",d="GHI CHÚ",u=o.trim().replace(/^>\s?/,"");u.startsWith("[!NOTE]")?(h="note-box alert-note",d="THÔNG TIN GHI CHÚ",u=u.replace("[!NOTE]","").trim()):u.startsWith("[!TIP]")?(h="note-box alert-tip",d="MẸO LÂM SÀNG",u=u.replace("[!TIP]","").trim()):u.startsWith("[!WARNING]")?(h="note-box alert-warning",d="CẢNH BÁO LÂM SÀNG",u=u.replace("[!WARNING]","").trim()):u.startsWith("[!IMPORTANT]")&&(h="note-box alert-important",d="LƯU Ý QUAN TRỌNG",u=u.replace("[!IMPORTANT]","").trim()),a.push(`
          <div class="${h}">
            <div class="note-title"><i class="fa-solid fa-circle-info"></i> ${d}</div>
            <p>${this.formatInline(u)}</p>
          </div>
        `);continue}const p=o.match(/^(#{1,6})\s+(.*)$/);if(p){const h=p[1].length,d=p[2].trim(),u=this.slugify(d);h<=3&&t.push({id:u,text:this.cleanHeadingText(d),level:h}),a.push(`<h${h} id="${u}">${this.formatInline(d)}</h${h}>`);continue}if(/^(---|\*\*\*|___)$/.test(o.trim())){a.push("<hr>");continue}if(/^\s*[-*+]\s+(.*)$/.test(o)){const h=o.replace(/^\s*[-*+]\s+/,"");a.push(`<ul><li>${this.formatInline(h)}</li></ul>`);continue}if(/^\s*\d+\.\s+(.*)$/.test(o)){const h=o.replace(/^\s*\d+\.\s+/,"");a.push(`<ol><li>${this.formatInline(h)}</li></ol>`);continue}if(o.trim()===""){a.push("");continue}a.push(`<p>${this.formatInline(o)}</p>`)}return{html:a.join(`
`),toc:t}}formatInline(e){return e.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>')}escapeHtml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}slugify(e){return e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\w\s-]/g,"").replace(/\s+/g,"-")}cleanHeadingText(e){return e.replace(/[*_`]/g,"")}}const G=new X;class Q{get engine(){return typeof window<"u"&&window.ClinicalCalculatorEngine?window.ClinicalCalculatorEngine:null}async execute(e,t,a={}){const n=this.engine;return n?await n.execute(e,t,a):{success:!1,errors:["ClinicalCalculatorEngine not initialized"]}}}const J=new Q,Z={calculators:{id:"calculators",slug:"calculators",name:"Công Cụ Lâm Sàng",shortName:"Công cụ",icon:"🧮",color:"#0284c7",description:"Bộ máy tính y khoa, ABG, eGFR, GCS, CHADS2-VASc và quy đổi chỉ số."},pharmacology:{id:"pharmacology",slug:"pharmacology",name:"Dược Lý Lâm Sàng",shortName:"Dược lý",icon:"💊",color:"#10b981",description:"Tra cứu thuốc, liều chuẩn, tương tác và phác đồ kháng sinh kinh nghiệm."},pathophysiology:{id:"pathophysiology",slug:"pathophysiology",name:"Sinh Lý & Sinh Lý Bệnh",shortName:"Sinh lý",icon:"🧬",color:"#f43f5e",description:"Bài đọc sinh lý học trực quan, cơ chế bệnh sinh và hình ảnh minh họa."},skills:{id:"skills",slug:"skills",name:"Kỹ Năng Lâm Sàng",shortName:"Kỹ năng",icon:"🩺",color:"#f59e0b",description:"Quy trình thực hành khám lâm sàng OSCE, Bedside skills, đọc ECG & CXR."},approaches:{id:"approaches",slug:"approaches",name:"Phác Đồ Tiếp Cận",shortName:"Tiếp cận",icon:"📋",color:"#8b5cf6",description:"Thuật toán chẩn đoán và phác đồ xử trí cấp cứu khẩn cấp tương tác."},ebm:{id:"ebm",slug:"ebm",name:"Y Học Chứng Cứ (EBM)",shortName:"Chứng cứ",icon:"📄",color:"#0ea5e9",description:"Tóm tắt Guidelines quốc tế, Bộ Y tế, PICO & Forest plot Meta-analysis."},tcm:{id:"tcm",slug:"tcm",name:"Y Học Cổ Truyền",shortName:"Đông y",icon:"☯️",color:"#14b8a6",description:"Lý luận YHCT, ngũ hành, kinh lạc, châm cứu, xoa bóp bấm huyệt."}};class ee{get mapper(){return typeof window<"u"&&window.CliniCategoryMapper?window.CliniCategoryMapper:null}getCategory(e){const t=(e||"").toLowerCase().trim(),a=this.mapper;if(a){const n=a.getCategory(t);if(n&&n.name!==t)return n}return Z[t]||{id:t,slug:t,name:t.toUpperCase(),icon:"📁"}}getDisplayName(e,t=!1){const a=(e||"").toLowerCase().trim(),n=this.getCategory(a);return n?t&&n.shortName?n.shortName:n.name:e}toDisplayName(e,t=!1){return this.getDisplayName(e,t)}renderBadge(e,t=""){const a=this.getCategory(e);return`<span class="category-badge ${t}" style="background: ${a.color||"#0284c7"}15; color: ${a.color||"#0284c7"}; font-weight: 600; padding: 0.2rem 0.5rem; border-radius: 0.25rem;">${a.icon||""} ${a.name}</span>`}}const D=new ee;class te{constructor(){f(this,"routes",[]);f(this,"fallbackHandler",null);f(this,"currentHash","");typeof window<"u"&&(window.addEventListener("hashchange",()=>this.handleHashChange()),window.addEventListener("DOMContentLoaded",()=>this.handleHashChange()))}register(e,t,a){this.routes.push({path:e,title:t,handler:a})}setFallback(e){this.fallbackHandler=e}navigate(e){let t=e;t.startsWith("#")||(t=`#${e.startsWith("/")?e:"/"+e}`),window.location.hash=t}getHashPath(){return(window.location.hash||"#/").replace(/^#/,"")||"/"}async handleHashChange(){const e=this.getHashPath();this.currentHash=e,this.updateActiveNavLinks(e);for(const t of this.routes){const a=this.matchRoute(t.path,e);if(a!==null){document.title=`${t.title} – CliniPortal`;try{await t.handler(a)}catch(n){console.error(`[CliniRouter] Error executing handler for ${e}:`,n)}return}}this.fallbackHandler?await this.fallbackHandler(e):console.warn(`[CliniRouter] No matching route found for hash: ${e}`)}matchRoute(e,t){const a=e.split("/").filter(Boolean),n=t.split("/").filter(Boolean);if(a.length!==n.length)return null;const i={};for(let r=0;r<a.length;r++)if(a[r].startsWith(":")){const c=a[r].slice(1);i[c]=decodeURIComponent(n[r])}else if(a[r]!==n[r])return null;return i}updateActiveNavLinks(e){if(typeof document>"u")return;document.querySelectorAll('a[href^="#"]').forEach(a=>{var i;const n=((i=a.getAttribute("href"))==null?void 0:i.replace(/^#/,""))||"/";n===e||n!=="/"&&e.startsWith(n)?a.classList.add("active"):a.classList.remove("active")})}getCurrentPath(){return this.getHashPath()}init(){this.handleHashChange()}}const L=new te;class ae{constructor(){f(this,"cache",new Map);f(this,"indexCache",new Map)}async loadCategoryIndex(e){if(!e)return[];if(this.indexCache.has(e))return this.indexCache.get(e);const t=[`./src/content/${e}/index.json`,`./content/${e}/index.json`,`./knowledge-vault/${e}/index.json`];for(const a of t)try{const n=await fetch(a);if(n.ok){const i=n.headers.get("content-type")||"",c=(await n.text()).trim();if(c.startsWith("[")||c.startsWith("{")){const o=JSON.parse(c);if(Array.isArray(o))return this.indexCache.set(e,o),o}}}catch(n){console.warn(`[ContentLoader] Could not load category index from ${a}:`,n)}return[]}getCandidatePaths(e,t){const a=[];return e&&t?(a.push(`./src/content/${e}/${t}.md`),a.push(`./src/content/${e}/${t}.html`),a.push(`./content/${e}/${t}.md`),a.push(`./content/${e}/${t}.html`),a.push(`./knowledge-vault/${e}/${t}.md`),a.push(`./src/content/${e}/${t}.json`)):e&&!t&&(a.push(`./src/content/${e}/index.md`),a.push(`./content/${e}/index.md`)),a}async fetchRawContent(e){if(this.cache.has(e))return this.cache.get(e);try{const t=await fetch(e);if(t.ok){const a=t.headers.get("content-type")||"",n=await t.text(),i=n.trim();return(e.endsWith(".md")||e.endsWith(".json")||e.endsWith(".html"))&&a.includes("text/html")&&(i.includes("CliniPortal – Hệ sinh thái")||i.includes('<script type="module" src="./src/index.ts">'))?null:(this.cache.set(e,n),n)}}catch(t){console.warn(`[ContentLoader] Failed to fetch content from ${e}:`,t)}return null}async loadItem(e,t){const a=await this.loadCategoryIndex(e);if(a.length>0&&t){const i=decodeURIComponent(t).toLowerCase().trim(),r=a.find(c=>{const o=(c.id||"").toLowerCase(),p=(c.name||"").toLowerCase().replace(/\.(html|md)$/,""),h=(c.path||"").toLowerCase();return o===i||p===i||o.endsWith("-"+i)||o.endsWith(i)||h.endsWith("/"+i+".html")||h.endsWith("/"+i+".md")});if(r){if(r.path.endsWith(".html")||r.type==="calculator"||r.type==="page"||r.type==="tool")return{isHtml:!0,raw:"",metadata:{title:r.name.replace(/\.(html|md)$/i,"").replace(/_/g," "),description:r.description||""},body:"",category:e,slug:t,path:r.path,item:r};{const o=await this.fetchRawContent(r.path);if(o!==null){const{metadata:p,body:h}=this.parseFrontmatter(o);return{isHtml:!1,raw:o,metadata:{title:r.name.replace(/\.md$/i,"").replace(/_/g," "),...p},body:h,category:e,slug:t,path:r.path,item:r}}}}}const n=this.getCandidatePaths(e,t);for(const i of n){const r=await this.fetchRawContent(i);if(r!==null){const c=i.endsWith(".html"),{metadata:o,body:p}=c?{metadata:{title:t},body:""}:this.parseFrontmatter(r);return{isHtml:c,raw:r,metadata:o,body:p,category:e,slug:t,path:i}}}return null}async loadArticle(e,t){return this.loadItem(e,t)}parseFrontmatter(e){const t={};let a=e;const n=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/,i=e.match(n);if(i){const r=i[1];a=e.slice(i[0].length);const c=r.split(`
`);for(const o of c){const p=o.indexOf(":");if(p!==-1){const h=o.slice(0,p).trim();let d=o.slice(p+1).trim();(d.startsWith('"')&&d.endsWith('"')||d.startsWith("'")&&d.endsWith("'"))&&(d=d.slice(1,-1)),t[h]=d}}}return{metadata:t,body:a}}}const E=new ae;class ne{constructor(){f(this,"index",new Map);f(this,"isReady",!1)}addDocument(e){this.index.set(e.id,e),this.isReady=!0}async initAllIndexes(e=["calculators","pharmacology","pathophysiology","skills","approaches","ebm","tcm"]){for(const t of e)try{(await E.loadCategoryIndex(t)).forEach(n=>{const i=n.name.replace(/\.(html|md)$/i,"").replace(/_/g," ");this.addDocument({id:`${n.category}/${n.id}`,title:i,category:n.category,keywords:[n.id,n.subcategory||"",n.category,...n.tags||[]],contentSnippet:[n.category,n.subcategory||"",n.description||"",i].filter(Boolean).join(" - "),url:`#/${n.category}/${n.id}`})})}catch(a){console.warn(`[CliniSearchEngine] Failed to index category ${t}:`,a)}console.log(`[CliniSearchEngine] Indexed ${this.index.size} clinical tools & articles across ${e.length} modules.`),this.isReady=!0}async loadIndex(e="/search-index.json"){try{const t=await fetch(e);t.ok&&((await t.json()).forEach(n=>this.addDocument(n)),this.isReady=!0)}catch(t){console.warn("[CliniSearchEngine] Không thể tải index từ web server, chuyển sang chế độ in-memory:",t)}}search(e,t=10){if(!e||e.trim().length===0)return[];const a=e.toLowerCase().trim(),n=[];return this.index.forEach(i=>{let r=0;i.title.toLowerCase().includes(a)&&(r+=10),i.category.toLowerCase().includes(a)&&(r+=5),i.keywords.some(c=>c.toLowerCase().includes(a))&&(r+=7),i.contentSnippet.toLowerCase().includes(a)&&(r+=3),r>0&&n.push({doc:i,score:r})}),n.sort((i,r)=>r.score-i.score).slice(0,t)}getAllDocuments(){return Array.from(this.index.values())}}const $=new ne;class ie{constructor(e={}){f(this,"element",null);f(this,"config");this.config={title:"CliniPortal",showSearch:!0,...e}}mount(e="#header"){const t=document.querySelector(e);if(!t){console.warn(`[CliniHeader] Container ${e} not found.`);return}t.innerHTML=`
      <div class="clini-header-container">
        <div class="clini-header-logo">
          <a href="./index.html">🏥 ${this.config.title}</a>
        </div>
        ${this.config.showSearch?`
          <div class="clini-header-search">
            <input type="text" id="clini-quick-search-input" placeholder="Tìm kiếm công cụ, bài viết, triệu chứng... (< 5ms)" />
          </div>
        `:""}
        <div class="clini-header-actions">
          <button id="clini-theme-toggle" class="btn-theme" title="Chuyển đổi giao diện Sáng/Tối">🌓</button>
        </div>
      </div>
    `,this.bindEvents(t)}bindEvents(e){const t=e.querySelector("#clini-theme-toggle");t&&t.addEventListener("click",()=>{const n=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",n),this.config.onToggleTheme&&this.config.onToggleTheme(n)});const a=e.querySelector("#clini-quick-search-input");a&&this.config.onSearch&&a.addEventListener("input",n=>{const i=n.target.value;this.config.onSearch(i)})}}class se{constructor(e=[]){f(this,"items",[]);this.items=e}setItems(e){this.items=e}mount(e="#sidebar"){const t=document.querySelector(e);t&&(t.innerHTML=`
      <nav class="clini-sidebar-nav">
        <ul class="clini-sidebar-list">
          ${this.items.map(a=>this.renderItem(a)).join("")}
        </ul>
      </nav>
    `)}renderItem(e){const t=e.icon?`<span class="sidebar-icon">${e.icon}</span>`:"",a=e.href?`<a href="${e.href}" class="sidebar-link">${t}<span>${e.title}</span></a>`:`<div class="sidebar-group-title">${t}<span>${e.title}</span></div>`;let n="";return e.children&&e.children.length>0&&(n=`
        <ul class="clini-sidebar-sublist">
          ${e.children.map(i=>this.renderItem(i)).join("")}
        </ul>
      `),`<li class="sidebar-item" data-id="${e.id}">${a}${n}</li>`}}class R{constructor(){f(this,"modalEl",null)}open(e){this.close();const t=document.createElement("div");t.className=`clini-modal-overlay modal-size-${e.size||"md"}`,t.innerHTML=`
      <div class="clini-modal-dialog">
        <div class="clini-modal-header">
          <h3 class="clini-modal-title">${e.title}</h3>
          <button class="clini-modal-close-btn" aria-label="Close">×</button>
        </div>
        <div class="clini-modal-body">
          ${e.content}
        </div>
      </div>
    `;const a=t.querySelector(".clini-modal-close-btn");a&&a.addEventListener("click",()=>{this.close(),e.onClose&&e.onClose()}),t.addEventListener("click",n=>{n.target===t&&(this.close(),e.onClose&&e.onClose())}),document.body.appendChild(t),this.modalEl=t}close(){this.modalEl&&this.modalEl.parentNode&&(this.modalEl.parentNode.removeChild(this.modalEl),this.modalEl=null)}}const re=new R;class oe{constructor(){f(this,"container",null);f(this,"nodes",new Map)}mount(e="#flow-container"){const t=document.querySelector(e);t&&(this.container=t)}loadNodes(e){this.nodes.clear(),e.forEach(t=>this.nodes.set(t.id,t)),this.render()}render(){if(!this.container)return;const e=Array.from(this.nodes.values()).map(t=>`
      <div class="clini-flow-node flow-type-${t.type||"action"}" data-id="${t.id}">
        <div class="node-label">${t.label}</div>
      </div>
    `).join("");this.container.innerHTML=`
      <div class="clini-flow-viewer-canvas">
        ${e}
      </div>
    `}}function M(){return`
    <div class="homepage-wrapper" id="mainContent" style="display: flex; gap: 1.5rem; flex-wrap: wrap; width: 100%;">
      
      <!-- CỘT BÊN TRÁI: NỘI DUNG CHÍNH (PRIMARY WORKSPACE) -->
      <div class="homepage-left" style="flex: 1 1 680px; min-width: 0;">

        <!-- 1. HERO MEDICAL COMMAND BAR -->
        <section class="hero-dashboard" id="hero-section" aria-labelledby="hero-title">
          <div class="hero-intro">
            <div class="hero-meta-row">
              <p class="hero-greeting" id="heroGreeting">
                <span>🌅</span> Chào buổi sáng, Bác sĩ!
              </p>
              <div class="hero-clock">
                <i class="fa-regular fa-clock" style="color:rgba(255,255,255,0.7);font-size:0.8rem;"></i>
                <span class="hero-clock-time" id="heroClockTime">--:--:--</span>
                <span class="hero-clock-date" id="heroClockDate">Thứ hai, 1 tháng 1</span>
              </div>
            </div>

            <h1 id="hero-title">HỆ SINH THÁI CÁC ỨNG DỤNG LÂM SÀNG</h1>
            <p>Hỗ trợ quyết định lâm sàng nhanh chóng, chính xác ngay tại giường bệnh.</p>
            <div class="hero-stats">
              <div class="hero-stat">
                <span class="hero-stat-number" data-count="120" data-suffix="+">120+</span>
                <span class="hero-stat-label">Công cụ & Thang điểm</span>
              </div>
              <div class="hero-stat">
                <span class="hero-stat-number" data-count="50" data-suffix="+">50+</span>
                <span class="hero-stat-label">Phác đồ xử trí</span>
              </div>
              <div class="hero-stat">
                <span class="hero-stat-number" data-count="30" data-suffix="+">30+</span>
                <span class="hero-stat-label">Kỹ năng lâm sàng</span>
              </div>
            </div>
          </div>
          <!-- Floating orbs -->
          <div class="hero-orb hero-orb-1" aria-hidden="true"></div>
          <div class="hero-orb hero-orb-2" aria-hidden="true"></div>
          <div class="hero-orb hero-orb-3" aria-hidden="true"></div>
          <div class="hero-pattern" aria-hidden="true"></div>
        </section>

        <!-- 2. EMERGENCY PROTOCOLS BAR (PHÁC ĐỒ CẤP CỨU KHẨN CẤP) -->
        <section class="emergency-section" id="emergency-section" aria-labelledby="emergency-title">
          <div class="emergency-header">
            <h2 class="emergency-title" id="emergency-title">
              <i class="fa-solid fa-truck-medical"></i> Phác đồ Cấp cứu Khẩn cấp
            </h2>
            <span class="emergency-badge-pulse">1-Click Fast Action</span>
          </div>
          <div class="emergency-grid">
            <a href="#/approaches/tc-sxhd" class="emergency-chip">
              <div class="emergency-chip-icon"><i class="fa-solid fa-mosquito"></i></div>
              <span>Cấp cứu SXHD nặng</span>
            </a>
            <a href="#/skills/doc-ecg-co-ban" class="emergency-chip">
              <div class="emergency-chip-icon"><i class="fa-solid fa-heart-pulse"></i></div>
              <span>Cấp cứu Đau ngực & ACS</span>
            </a>
            <a href="#/calculators/abg" class="emergency-chip">
              <div class="emergency-chip-icon"><i class="fa-solid fa-mask-ventilator"></i></div>
              <span>Toan kiềm & Suy hô hấp</span>
            </a>
            <a href="#/skills/luachon-khangsinh" class="emergency-chip">
              <div class="emergency-chip-icon"><i class="fa-solid fa-capsules"></i></div>
              <span>Sốc nhiễm khuẩn & KS</span>
            </a>
          </div>
        </section>

        <!-- 3. 7 PHÂN NHÓM CHỨC NĂNG CỐT LÕI (CORE MODULE GRID) -->
        <div class="main-content-grid" id="category-grid-section">
          <div class="category-filter-wrapper">
            <h2 class="section-heading">Phân nhóm chức năng chính</h2>
            <div class="category-filter-top">
              <div class="category-filter-pills">
                <button class="filter-pill active" data-filter="all">Tất cả (7)</button>
                <button class="filter-pill" data-filter="clinical">Lâm sàng</button>
                <button class="filter-pill" data-filter="tools">Công cụ</button>
                <button class="filter-pill" data-filter="pharma">Dược lý</button>
                <button class="filter-pill" data-filter="physio">Sinh lý</button>
                <button class="filter-pill" data-filter="ebm">Chứng cứ</button>
                <button class="filter-pill" data-filter="tcm">Đông y</button>
              </div>
              <div class="category-search-box">
                <i class="fa-solid fa-filter"></i>
                <input type="text" id="categorySearchInput" placeholder="Lọc nhóm ứng dụng..." aria-label="Lọc nhóm ứng dụng">
              </div>
            </div>
          </div>

          <div class="category-grid">
            <!-- Card 1: Kỹ năng lâm sàng -->
            <div class="tool-card card-rose" data-category="clinical">
              <button class="pin-btn" data-url="#/skills" data-title="Kỹ năng Lâm sàng" data-category="Lâm sàng" data-icon="🩺" title="Ghim ứng dụng">☆</button>
              <div class="card-top">
                <div class="tool-icon">🩺</div>
                <span class="tool-status active">Hoạt động</span>
              </div>
              <div class="tool-content">
                <h3>Kỹ năng Lâm sàng</h3>
                <p>Quy trình thăm khám 11 hệ cơ quan chuẩn y khoa, bảng kiểm bedside dựa trên Macleod.</p>
                <div class="tool-footer">
                  <span class="tool-category">Clinical Skills</span>
                  <a href="#/skills">Truy cập ứng dụng</a>
                </div>
              </div>
            </div>

            <!-- Card 2: Tiếp cận vấn đề -->
            <div class="tool-card card-green" data-category="clinical">
              <button class="pin-btn" data-url="#/approaches" data-title="Tiếp cận Lâm sàng" data-category="Lâm sàng" data-icon="📋" title="Ghim ứng dụng">☆</button>
              <div class="card-top">
                <div class="tool-icon">📋</div>
                <span class="tool-status active">Hoạt động</span>
              </div>
              <div class="tool-content">
                <h3>Tiếp cận Lâm sàng</h3>
                <p>Phác đồ từng bước xử trí các hội chứng, triệu chứng cấp cứu và thường gặp.</p>
                <div class="tool-footer">
                  <span class="tool-category">Algorithms</span>
                  <a href="#/approaches">Truy cập ứng dụng</a>
                </div>
              </div>
            </div>

            <!-- Card 3: Công cụ lâm sàng -->
            <div class="tool-card card-blue" data-category="tools">
              <button class="pin-btn" data-url="#/calculators" data-title="Công cụ Lâm sàng" data-category="Công cụ" data-icon="🧮" title="Ghim ứng dụng">☆</button>
              <div class="card-top">
                <div class="tool-icon">🧮</div>
                <span class="tool-status active">Hoạt động</span>
              </div>
              <div class="tool-content">
                <h3>Công cụ Lâm sàng</h3>
                <p>Tính toán các thang điểm nặng, tiên lượng và hỗ trợ chẩn đoán chính xác tại giường.</p>
                <div class="tool-footer">
                  <span class="tool-category">Calculators</span>
                  <a href="#/calculators">Truy cập ứng dụng</a>
                </div>
              </div>
            </div>

            <!-- Card 4: Dược lý lâm sàng -->
            <div class="tool-card card-purple" data-category="pharma">
              <button class="pin-btn" data-url="#/pharmacology" data-title="Dược lý lâm sàng" data-category="Dược lý" data-icon="💊" title="Ghim ứng dụng">☆</button>
              <div class="card-top">
                <div class="tool-icon">💊</div>
                <span class="tool-status active">Hoạt động</span>
              </div>
              <div class="tool-content">
                <h3>Dược lý lâm sàng</h3>
                <p>Tra cứu liều thuốc, chỉnh liều theo chức năng thận tối ưu PK/PD kháng sinh.</p>
                <div class="tool-footer">
                  <span class="tool-category">Pharmacology</span>
                  <a href="#/pharmacology">Truy cập ứng dụng</a>
                </div>
              </div>
            </div>

            <!-- Card 5: Sinh lý & Sinh lý bệnh -->
            <div class="tool-card card-green" data-category="physio">
              <button class="pin-btn" data-url="#/pathophysiology" data-title="Sinh lý & Sinh lý bệnh" data-category="Sinh lý" data-icon="🧬" title="Ghim ứng dụng">☆</button>
              <div class="card-top">
                <div class="tool-icon">🧬</div>
                <span class="tool-status active">Hoạt động</span>
              </div>
              <div class="tool-content">
                <h3>Sinh lý / sinh lý bệnh & cơ chế bệnh sinh</h3>
                <p>Trang tài liệu Sinh lý / sinh lý bệnh & cơ chế bệnh sinh.</p>
                <div class="tool-footer">
                  <span class="tool-category">Physiology</span>
                  <a href="#/pathophysiology">Truy cập ứng dụng</a>
                </div>
              </div>
            </div>

            <!-- Card 6: Y học chứng cứ -->
            <div class="tool-card card-amber" data-category="ebm">
              <button class="pin-btn" data-url="#/ebm" data-title="Y học chứng cứ" data-category="Chứng cứ" data-icon="📄" title="Ghim ứng dụng">☆</button>
              <div class="card-top">
                <div class="tool-icon">📄</div>
                <span class="tool-status active">Hoạt động</span>
              </div>
              <div class="tool-content">
                <h3>Y học chứng cứ</h3>
                <p>Tra cứu các bằng chứng y học hỗ trợ quyết định điều trị.</p>
                <div class="tool-footer">
                  <span class="tool-category">Evidence</span>
                  <a href="#/ebm">Truy cập ứng dụng</a>
                </div>
              </div>
            </div>

            <!-- Card 7: Y học cổ truyền -->
            <div class="tool-card card-teal" data-category="tcm">
              <button class="pin-btn" data-url="#/tcm" data-title="Y học cổ truyền" data-category="Đông y" data-icon="☯️" title="Ghim ứng dụng">☆</button>
              <div class="card-top">
                <div class="tool-icon">☯️</div>
                <span class="tool-status active">Hoạt động</span>
              </div>
              <div class="tool-content">
                <h3>Y học cổ truyền</h3>
                <p>Kho lưu trữ kiến thức Y học cổ truyền: Xoa bóp, bấm huyệt, châm cứu và dược liệu.</p>
                <div class="tool-footer">
                  <span class="tool-category">Traditional Med</span>
                  <a href="#/tcm">Truy cập ứng dụng</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. PINNED FAVORITES / MỤC YÊU THÍCH -->
        <section class="favorites-section" id="favoritesSection" aria-labelledby="favorites-title">
          <h2 class="section-heading" id="favorites-title">⭐ Ứng dụng đã ghim (Yêu thích)</h2>
          <div class="favorites-grid" id="favoritesGrid"></div>
        </section>

        <!-- 5. QUICK ACCESS / APP THƯỜNG DÙNG -->
        <section class="quick-access-section" id="quick-access-section" aria-labelledby="quick-access-title">
          <h2 class="section-heading" id="quick-access-title">Ứng dụng thường dùng</h2>
          <div class="quick-access-grid">
            <!-- 1. Tra cứu mã ICD-10 -->
            <a href="#/calculators/tracuu-icd10" class="quick-access-card"
              style="--card-accent: var(--color-primary); --card-accent-hl: var(--color-primary-hl); --card-accent-rgb: var(--color-primary-rgb)">
              <button class="pin-btn" data-url="#/calculators/tracuu-icd10" data-title="Tra cứu mã ICD-10" data-category="Công cụ" data-icon="🔍" title="Ghim ứng dụng">☆</button>
              <div class="quick-access-icon">🔍</div>
              <div class="quick-access-info">
                <h3>Tra cứu mã ICD-10</h3>
                <p>Tra cứu nhanh mã bệnh quốc tế nhanh chóng</p>
              </div>
            </a>

            <!-- 2. Đọc Điện tâm đồ ECG -->
            <a href="#/skills/doc-ecg-co-ban" class="quick-access-card"
              style="--card-accent: var(--color-rose); --card-accent-hl: var(--color-rose-hl); --card-accent-rgb: var(--color-rose-rgb)">
              <button class="pin-btn" data-url="#/skills/doc-ecg-co-ban" data-title="Đọc Điện tâm đồ ECG" data-category="Kỹ năng" data-icon="📈" title="Ghim ứng dụng">☆</button>
              <div class="quick-access-icon">📈</div>
              <div class="quick-access-info">
                <h3>Đọc Điện tâm đồ ECG</h3>
                <p>Hướng dẫn phân tích sóng và chẩn đoán ECG</p>
              </div>
            </a>

            <!-- 3. Đọc phân tích tế bào máu CBC -->
            <a href="#/skills/doc-tpttb-mau" class="quick-access-card"
              style="--card-accent: var(--color-rose); --card-accent-hl: var(--color-rose-hl); --card-accent-rgb: var(--color-rose-rgb)">
              <button class="pin-btn" data-url="#/skills/doc-tpttb-mau" data-title="Phân tích tế bào máu" data-category="Kỹ năng" data-icon="🩸" title="Ghim ứng dụng">☆</button>
              <div class="quick-access-icon">🩸</div>
              <div class="quick-access-info">
                <h3>Phân tích tế bào máu</h3>
                <p>Diễn giải kết quả tổng phân tích tế bào máu</p>
              </div>
            </a>

            <!-- 4. Đọc sinh hóa chức năng Thận -->
            <a href="#/skills/doc-sh-than" class="quick-access-card"
              style="--card-accent: var(--color-teal); --card-accent-hl: var(--color-teal-hl); --card-accent-rgb: var(--color-teal-rgb)">
              <button class="pin-btn" data-url="#/skills/doc-sh-than" data-title="Sinh hóa chức năng Thận" data-category="Kỹ năng" data-icon="🧪" title="Ghim ứng dụng">☆</button>
              <div class="quick-access-icon">🧪</div>
              <div class="quick-access-info">
                <h3>Sinh hóa chức năng Thận</h3>
                <p>Đánh giá Ure, Creatinin và độ lọc cầu thận eGFR</p>
              </div>
            </a>

            <!-- 5. Xử trí Sốt xuất huyết Dengue -->
            <a href="#/approaches/tc-sxhd"
              class="quick-access-card"
              style="--card-accent: var(--color-warning); --card-accent-hl: var(--color-warning-hl); --card-accent-rgb: var(--color-warning-rgb)">
              <button class="pin-btn" data-url="#/approaches/tc-sxhd" data-title="Xử trí SXH Dengue" data-category="Tiếp cận" data-icon="🦟" title="Ghim ứng dụng">☆</button>
              <div class="quick-access-icon">🦟</div>
              <div class="quick-access-info">
                <h3>Xử trí SXH Dengue</h3>
                <p>Phác đồ tiếp cận, phân độ và điều trị SXHD</p>
              </div>
            </a>

            <!-- 6. Lựa chọn kháng sinh kinh nghiệm -->
            <a href="#/skills/luachon-khangsinh" class="quick-access-card"
              style="--card-accent: var(--color-purple); --card-accent-hl: var(--color-purple-hl); --card-accent-rgb: var(--color-purple-rgb)">
              <button class="pin-btn" data-url="#/skills/luachon-khangsinh" data-title="Kháng sinh kinh nghiệm" data-category="Dược lý" data-icon="💊" title="Ghim ứng dụng">☆</button>
              <div class="quick-access-icon">💊</div>
              <div class="quick-access-info">
                <h3>Kháng sinh kinh nghiệm</h3>
                <p>Hướng dẫn lựa chọn kháng sinh ban đầu theo đích</p>
              </div>
            </a>
          </div>
        </section>

        <!-- 6. CLINIPORTAL PULSE — COMMAND CENTER DASHBOARD -->
        <section class="pulse-dashboard" id="pulse-dashboard-section">
          <h2 class="pulse-section-title"><i class="fa-solid fa-bolt" style="color: var(--pulse-amber, #f59e0b);"></i> CliniPortal Pulse — Trung Tâm Điều Hành Lâm Sàng</h2>
          
          <!-- 1. DAILY EBM PEARL CARD -->
          <div class="pearl-card">
            <div class="pearl-header">
              <span class="pearl-badge"><i class="fa-solid fa-gem"></i> Ngọc Y Học Chứng Cứ Hôm Nay</span>
              <span class="pearl-date" id="pearl-date">--/--/----</span>
            </div>
            <div style="font-size: 0.78rem; font-weight: 700; color: #7dd3fc; margin-bottom: 0.25rem;" id="pearl-spec">Hồi Sức / Truyền Nhiễm</div>
            <div class="pearl-title" id="pearl-title">Sốc Nhiễm Khuẩn: Dược Động Học Kháng Sinh ICU</div>
            <div class="pearl-body" id="pearl-body">
              Sốc nhiễm khuẩn gây biến đổi thể tích phân bố Vd và tăng thanh thải thận ARC. Luôn dùng LIỀU NẠP (Loading dose) đầy đủ và ưu tiên TRUYỀN KÉO DÀI Beta-lactam để đạt fT > MIC tối đa.
            </div>
            <div class="pearl-actions">
              <span style="font-size: 0.75rem; opacity: 0.75;"><i class="fa-solid fa-bookmark"></i> Nguồn: <span id="pearl-source">Critical Care Clinics 2026</span></span>
              <button class="btn-pearl-done" id="btn-pearl-done"><i class="fa-regular fa-circle-check"></i> Đã Ghi Nhớ Hôm Nay</button>
            </div>
          </div>

          <!-- 2. STREAK & PROGRESS RINGS GRID -->
          <div class="pulse-stats-grid">
            <div class="pulse-stat-card">
              <div style="font-size: 0.85rem; font-weight: 800; color: var(--color-text);"><i class="fa-solid fa-chart-pie" style="color: var(--pulse-primary, #0284c7);"></i> Tiến Độ Học Tập & Thực Hành:</div>
              <div class="rings-wrapper">
                <div class="ring-item">
                  <svg class="ring-svg"><circle class="ring-bg" cx="34" cy="34" r="30" /><circle class="ring-progress" id="ring-ebm" cx="34" cy="34" r="30" style="stroke: #0284c7;" /></svg>
                  <div class="ring-text">Y Học Chứng Cứ<br><span id="ebm-pct-text">80%</span></div>
                </div>
                <div class="ring-item">
                  <svg class="ring-svg"><circle class="ring-bg" cx="34" cy="34" r="30" /><circle class="ring-progress" id="ring-tools" cx="34" cy="34" r="30" style="stroke: #7c3aed;" /></svg>
                  <div class="ring-text">Công Cụ Lâm Sàng<br><span id="tools-pct-text">85%</span></div>
                </div>
                <div class="ring-item">
                  <svg class="ring-svg"><circle class="ring-bg" cx="34" cy="34" r="30" /><circle class="ring-progress" id="ring-skills" cx="34" cy="34" r="30" style="stroke: #10b981;" /></svg>
                  <div class="ring-text">Kỹ Năng Lâm Sàng<br><span id="skills-pct-text">70%</span></div>
                </div>
              </div>
            </div>

            <!-- STREAK BOX -->
            <div class="streak-box">
              <div class="streak-flame">🔥</div>
              <div>
                <div class="streak-num" id="streak-count-num">7</div>
                <div class="streak-lbl">Ngày liên tục học tập</div>
              </div>
            </div>
          </div>

          <!-- 3. QUICK ACTIONS GRID -->
          <h3 class="pulse-section-title"><i class="fa-solid fa-fire-flame-curved" style="color: var(--pulse-rose, #f43f5e);"></i> Thao Tác Nhanh Đột Phá</h3>
          <div class="pulse-actions-grid">
            <a href="#/ebm" class="pulse-action-card">
              <div class="pulse-action-icon" style="color: #0284c7;">🧪</div>
              <div class="pulse-action-title">PICO & NNT Lab</div>
              <div class="pulse-action-sub">Thực hành EBM tương tác</div>
            </a>
            <a href="#/ebm" class="pulse-action-card">
              <div class="pulse-action-icon" style="color: #7c3aed;">📊</div>
              <div class="pulse-action-title">Forest Plot Builder</div>
              <div class="pulse-action-sub">Vẽ SVG Meta-analysis</div>
            </a>
            <a href="#/ebm" class="pulse-action-card">
              <div class="pulse-action-icon" style="color: #10b981;">📡</div>
              <div class="pulse-action-title">Guideline Diff Viewer</div>
              <div class="pulse-action-sub">So sánh Trước & Sau</div>
            </a>
            <a href="#/ebm" class="pulse-action-card">
              <div class="pulse-action-icon" style="color: #f59e0b;">🧠</div>
              <div class="pulse-action-title">Quiz Engine (SM-2)</div>
              <div class="pulse-action-sub">Ôn tập Spaced Repetition</div>
            </a>
            <a href="#/ebm" class="pulse-action-card">
              <div class="pulse-action-icon" style="color: #ec4899;">🔍</div>
              <div class="pulse-action-title">Kho Guidelines</div>
              <div class="pulse-action-sub">Tra cứu Bộ Y tế & Quốc tế</div>
            </a>
            <a href="#/calculators" class="pulse-action-card">
              <div class="pulse-action-icon" style="color: #06b6d4;">⚙️</div>
              <div class="pulse-action-title">Máy Tính Lâm Sàng</div>
              <div class="pulse-action-sub">120+ công cụ hỗ trợ</div>
            </a>
          </div>
        </section>

      </div>

      <!-- CỘT BÊN PHẢI: TIỆN ÍCH LÂM SÀNG (SECONDARY UTILITY PANEL) -->
      <aside class="homepage-right" id="widgets-section" style="flex: 0 0 320px; width: 320px; display: flex; flex-direction: column; gap: 1.25rem;">

        <!-- Widget 1: Clinical Pearl of the Day -->
        <section class="widget-card pearl-widget" aria-label="Hạt ngọc lâm sàng">
          <div class="widget-header">
            <h3 class="widget-title">
              <i class="fa-solid fa-lightbulb"></i> Hạt ngọc lâm sàng
            </h3>
          </div>
          <div class="widget-body">
            <div class="pearl-container">
              <div class="pearl-content-box">
                <p class="pearl-text" id="pearlText">Đang tải hạt ngọc lâm sàng...</p>
              </div>
              <div class="pearl-footer">
                <button class="btn-pearl-refresh" id="pearlRefreshBtn" title="Xem hạt ngọc khác">
                  <i class="fa-solid fa-rotate"></i> Đổi ngẫu nhiên
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Widget 2: Recently Visited -->
        <section class="widget-card" aria-label="Đã xem gần đây">
          <div class="widget-header">
            <h3 class="widget-title">
              <i class="fa-regular fa-clock" style="background:var(--color-teal-hl);color:var(--color-teal)"></i>
              Đã xem gần đây
            </h3>
          </div>
          <div class="widget-body">
            <div id="recentlyVisitedList" class="recent-list">
              <div style="font-size: 0.85rem; color: var(--color-text-muted); padding: 0.5rem 0;">Chưa có lịch sử xem bài viết.</div>
            </div>
          </div>
        </section>

        <!-- Widget 3: Medical Converter -->
        <section class="widget-card converter-widget" aria-label="Chuyển đổi chỉ số y khoa">
          <div class="widget-header">
            <h3 class="widget-title">
              <i class="fa-solid fa-calculator"></i> Quy đổi chỉ số nhanh
            </h3>
          </div>
          <div class="widget-body">
            <div class="converter-tabs" style="display: flex; gap: 0.4rem; margin-bottom: 0.75rem;">
              <button class="converter-tab active" data-target="panelGlucose" style="flex:1; padding: 0.35rem; font-size:0.75rem; border-radius: 0.35rem; border:1px solid var(--color-border); background:var(--color-surface-offset); cursor:pointer;">Glucose</button>
              <button class="converter-tab" data-target="panelCreatinine" style="flex:1; padding: 0.35rem; font-size:0.75rem; border-radius: 0.35rem; border:1px solid var(--color-border); background:var(--color-surface-offset); cursor:pointer;">Creatinine</button>
              <button class="converter-tab" data-target="panelTemp" style="flex:1; padding: 0.35rem; font-size:0.75rem; border-radius: 0.35rem; border:1px solid var(--color-border); background:var(--color-surface-offset); cursor:pointer;">Nhiệt độ</button>
            </div>

            <!-- Panel Glucose -->
            <div class="converter-panel active" id="panelGlucose">
              <div class="converter-row" style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.4rem;">
                <input type="number" id="glcMg" placeholder="mg/dL" step="any" style="flex:1; padding:0.4rem; border:1px solid var(--color-border); border-radius:0.35rem;">
                <span class="converter-unit" style="font-size:0.75rem;">mg/dL</span>
              </div>
              <div class="converter-arrow-icon" style="text-align:center; margin:0.25rem 0; color:var(--color-text-muted);">
                <i class="fa-solid fa-arrows-up-down"></i>
              </div>
              <div class="converter-row" style="display:flex; align-items:center; gap:0.5rem;">
                <input type="number" id="glcMmol" placeholder="mmol/L" step="any" style="flex:1; padding:0.4rem; border:1px solid var(--color-border); border-radius:0.35rem;">
                <span class="converter-unit" style="font-size:0.75rem;">mmol/L</span>
              </div>
            </div>

            <!-- Panel Creatinine -->
            <div class="converter-panel" id="panelCreatinine" style="display:none;">
              <div class="converter-row" style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.4rem;">
                <input type="number" id="crUmol" placeholder="µmol/L" step="any" style="flex:1; padding:0.4rem; border:1px solid var(--color-border); border-radius:0.35rem;">
                <span class="converter-unit" style="font-size:0.75rem;">µmol/L</span>
              </div>
              <div class="converter-arrow-icon" style="text-align:center; margin:0.25rem 0; color:var(--color-text-muted);">
                <i class="fa-solid fa-arrows-up-down"></i>
              </div>
              <div class="converter-row" style="display:flex; align-items:center; gap:0.5rem;">
                <input type="number" id="crMg" placeholder="mg/dL" step="any" style="flex:1; padding:0.4rem; border:1px solid var(--color-border); border-radius:0.35rem;">
                <span class="converter-unit" style="font-size:0.75rem;">mg/dL</span>
              </div>
            </div>

            <!-- Panel Nhiệt độ -->
            <div class="converter-panel" id="panelTemp" style="display:none;">
              <div class="converter-row" style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.4rem;">
                <input type="number" id="tempC" placeholder="°C" step="any" style="flex:1; padding:0.4rem; border:1px solid var(--color-border); border-radius:0.35rem;">
                <span class="converter-unit" style="font-size:0.75rem;">°C</span>
              </div>
              <div class="converter-arrow-icon" style="text-align:center; margin:0.25rem 0; color:var(--color-text-muted);">
                <i class="fa-solid fa-arrows-up-down"></i>
              </div>
              <div class="converter-row" style="display:flex; align-items:center; gap:0.5rem;">
                <input type="number" id="tempF" placeholder="°F" step="any" style="flex:1; padding:0.4rem; border:1px solid var(--color-border); border-radius:0.35rem;">
                <span class="converter-unit" style="font-size:0.75rem;">°F</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Widget 4: Clinical Scratchpad -->
        <section class="widget-card scratchpad-widget" aria-label="Ghi chú lâm sàng">
          <div class="widget-header">
            <h3 class="widget-title">
              <i class="fa-solid fa-note-sticky"></i> Ghi chú lâm sàng
            </h3>
          </div>
          <div class="widget-body">
            <div class="scratchpad-container" style="display:flex; flex-direction:column; gap:0.5rem;">
              <textarea id="scratchpadText" class="scratchpad-textarea"
                placeholder="Ghi nhanh chẩn đoán, kết quả xét nghiệm, công thức..." style="width:100%; height:110px; padding:0.5rem; font-size:0.85rem; border:1px solid var(--color-border); border-radius:0.375rem; background:var(--color-surface); color:var(--color-text); resize:vertical; outline:none;"></textarea>
              <div class="scratchpad-actions" style="display:flex; justify-content:space-between; align-items:center;">
                <div class="scratchpad-left-actions" style="display:flex; gap:0.3rem;">
                  <button class="btn-widget" id="scratchpadCopyBtn" title="Sao chép toàn bộ" style="padding:0.3rem 0.6rem; font-size:0.75rem; border-radius:0.25rem; border:1px solid var(--color-border); background:var(--color-surface); cursor:pointer;">
                    <i class="fa-regular fa-copy"></i> Chép
                  </button>
                  <button class="btn-widget" id="scratchpadExportBtn" title="Tải về file .txt" style="padding:0.3rem 0.6rem; font-size:0.75rem; border-radius:0.25rem; border:1px solid var(--color-border); background:var(--color-surface); cursor:pointer;">
                    <i class="fa-solid fa-download"></i> Xuất
                  </button>
                  <button class="btn-widget btn-danger" id="scratchpadClearBtn" title="Xóa ghi chú" style="padding:0.3rem 0.6rem; font-size:0.75rem; border-radius:0.25rem; border:1px solid var(--color-border); background:var(--color-surface); color:var(--color-danger, #ef4444); cursor:pointer;">
                    <i class="fa-regular fa-trash-can"></i> Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </aside>

    </div>
  `}function q(){var I,P,B;const s=document.getElementById("heroClockTime"),e=document.getElementById("heroClockDate"),t=document.getElementById("heroGreeting");function a(){const l=new Date;if(s&&(s.textContent=l.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit",second:"2-digit"})),e&&(e.textContent=l.toLocaleDateString("vi-VN",{weekday:"long",day:"numeric",month:"long"})),t){const g=l.getHours();let v="🌅 Chào buổi sáng, Bác sĩ!";g>=12&&g<18?v="☀️ Chào buổi chiều, Bác sĩ!":(g>=18||g<5)&&(v="🌙 Chào buổi tối, Bác sĩ!"),t.innerHTML=`<span>${v.slice(0,2)}</span> ${v.slice(3)}`}}a(),setInterval(a,1e3);const n=["Hãy luôn kiểm tra và bù Kali máu trước khi bắt đầu truyền insulin trong cấp cứu DKA nếu Kali < 3.3 mEq/L.","Ở bệnh nhân COPD đợt cấp, đích SpO2 khuyến cáo duy trì ở mức 88-92% để tránh ức chế phản xạ thông khí.","Khi chẩn đoán đau ngực cấp nghi do hội chứng mạch vành cấp (ACS), phải đo và đọc ECG 12 chuyển đạo trong 10 phút đầu.","Thang điểm CURB-65 giúp phân tầng nguy cơ nhanh cho viêm phổi cộng đồng: C (Ý thức), U (Ure > 7), R (Thở >= 30), B (HA < 90/60), 65 (Tuổi >= 65).","Bù Natri quá nhanh ở bệnh nhân hạ Natri máu mạn tính có thể dẫn đến Hội chứng hủy myelin cầu não do thẩm thấu (ODS)."],i=document.getElementById("pearlText"),r=document.getElementById("pearlRefreshBtn");let c=0;function o(){i&&(i.textContent=n[c%n.length])}o(),r==null||r.addEventListener("click",()=>{c++,o()});const p=document.querySelectorAll(".filter-pill"),h=document.querySelectorAll(".category-grid .tool-card"),d=document.getElementById("categorySearchInput");function u(){const l=document.querySelector(".filter-pill.active"),g=(l==null?void 0:l.getAttribute("data-filter"))||"all",v=((d==null?void 0:d.value)||"").toLowerCase().trim();h.forEach(S=>{var A;const K=S.getAttribute("data-category")||"",W=((A=S.textContent)==null?void 0:A.toLowerCase())||"",F=g==="all"||K===g,Y=!v||W.includes(v);S.style.display=F&&Y?"block":"none"})}p.forEach(l=>{l.addEventListener("click",()=>{p.forEach(g=>g.classList.remove("active")),l.classList.add("active"),u()})}),d==null||d.addEventListener("input",u);const N=document.querySelectorAll(".converter-tab");N.forEach(l=>{l.addEventListener("click",()=>{N.forEach(v=>{v.classList.remove("active"),v.style.background="var(--color-surface-offset)"}),l.classList.add("active"),l.style.background="var(--color-primary, #0284c7)",l.style.color="#fff";const g=l.getAttribute("data-target");document.querySelectorAll(".converter-panel").forEach(v=>{v.style.display=v.id===g?"block":"none"})})});const y=document.getElementById("glcMg"),b=document.getElementById("glcMmol");y==null||y.addEventListener("input",()=>{const l=parseFloat(y.value);isNaN(l)?b.value="":b.value=(l/18.0182).toFixed(2)}),b==null||b.addEventListener("input",()=>{const l=parseFloat(b.value);isNaN(l)?y.value="":y.value=(l*18.0182).toFixed(1)});const C=document.getElementById("crUmol"),w=document.getElementById("crMg");C==null||C.addEventListener("input",()=>{const l=parseFloat(C.value);isNaN(l)?w.value="":w.value=(l/88.4).toFixed(2)}),w==null||w.addEventListener("input",()=>{const l=parseFloat(w.value);isNaN(l)?C.value="":C.value=(l*88.4).toFixed(1)});const x=document.getElementById("tempC"),k=document.getElementById("tempF");x==null||x.addEventListener("input",()=>{const l=parseFloat(x.value);isNaN(l)?k.value="":k.value=(l*1.8+32).toFixed(1)}),k==null||k.addEventListener("input",()=>{const l=parseFloat(k.value);isNaN(l)?x.value="":x.value=((l-32)/1.8).toFixed(1)});const m=document.getElementById("scratchpadText");m&&(m.value=localStorage.getItem("clini_scratchpad")||"",m.addEventListener("input",()=>{localStorage.setItem("clini_scratchpad",m.value)})),(I=document.getElementById("scratchpadCopyBtn"))==null||I.addEventListener("click",()=>{m!=null&&m.value&&(navigator.clipboard.writeText(m.value),alert("Đã sao chép nội dung ghi chú!"))}),(P=document.getElementById("scratchpadClearBtn"))==null||P.addEventListener("click",()=>{m&&confirm("Bạn có chắc muốn xóa toàn bộ ghi chú?")&&(m.value="",localStorage.removeItem("clini_scratchpad"))}),(B=document.getElementById("scratchpadExportBtn"))==null||B.addEventListener("click",()=>{if(m!=null&&m.value){const l=new Blob([m.value],{type:"text/plain;charset=utf-8"}),g=document.createElement("a");g.href=URL.createObjectURL(l),g.download=`Ghi_chu_lam_sang_${new Date().toISOString().slice(0,10)}.txt`,g.click()}})}function z(s){const{html:e,toc:t}=G.parse(s.body),a=s.metadata.title||s.slug.replace(/-/g," ").toUpperCase(),n=s.category.toUpperCase(),i=s.metadata.author||"Hội đồng Y khoa CliniPortal",r=s.metadata.date||"Cập nhật gần đây",c=t.length>0?t.map(o=>`<li class="toc-item level-${o.level}"><a href="#${o.id}">${o.text}</a></li>`).join(""):"<li><em>Không có mục lục</em></li>";return`
    <div class="article-reader-container" style="display: flex; gap: 2rem; width: 100%;">
      <!-- ARTICLE MAIN BODY -->
      <article class="article-body-wrapper" style="flex: 1; min-width: 0;">
        <header class="article-header" style="margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--color-border, #e2e8f0);">
          <div class="article-breadcrumb" style="font-size: 0.875rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.5rem;">
            <a href="#/" style="color: inherit;">Trang chủ</a> &nbsp;/&nbsp; 
            <a href="#/${s.category}" style="color: inherit;">${n}</a> &nbsp;/&nbsp; 
            <span style="color: var(--color-primary, #0284c7);">${a}</span>
          </div>
          <h1 class="article-title" style="font-size: 2rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.75rem;">${a}</h1>
          <div class="article-meta" style="display: flex; gap: 1rem; font-size: 0.875rem; color: var(--color-text-muted, #64748b);">
            <span><i class="fa-solid fa-user-doctor"></i> ${i}</span>
            <span><i class="fa-regular fa-clock"></i> ${r}</span>
            <span><i class="fa-solid fa-folder"></i> ${n}</span>
          </div>
        </header>

        <div class="article-content markdown-body">
          ${e}
        </div>
      </article>

      <!-- SIDEBAR TOC (MỤC LỤC BÀI VIẾT) -->
      <aside class="article-toc-sidebar" style="width: 260px; flex-shrink: 0;">
        <div class="toc-card" style="position: sticky; top: 1rem; padding: 1.25rem; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem;">
          <h4 style="font-size: 0.875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted, #64748b); margin-bottom: 0.75rem;">
            <i class="fa-solid fa-list-ul"></i> Mục Lục Bài Viết
          </h4>
          <ul class="toc-list" style="list-style: none; padding: 0; margin: 0; font-size: 0.875rem; display: flex; flex-direction: column; gap: 0.5rem;">
            ${c}
          </ul>
        </div>
      </aside>
    </div>
  `}function H(s){const e=s.metadata.title||s.slug.replace(/-/g," ").toUpperCase(),[t,a]=s.path.split("#"),n=t.includes("?")?"&":"?";return`
    <div class="full-tool-view-container" style="width: 100%; height: calc(100vh - var(--header-height, 60px)); position: relative; margin: 0; padding: 0; overflow: hidden; background: var(--color-bg, #f8fafc);">
      <iframe 
        src="${`${t}${n}embedded=1${a?"#"+a:""}`}" 
        class="tool-iframe" 
        title="${e}" 
        sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
        style="width: 100%; height: 100%; border: none; display: block; background: #fff;"
      ></iframe>
    </div>
  `}const ce={calculators:{path:"./src/content/calculators/general/calculators-hub.html",title:"Bộ Công Cụ & Máy Tính Lâm Sàng",description:"120+ công cụ tính toán y khoa, ABG, eGFR, GCS, CHADS2-VASc, phỏng đoán liều & chỉ số y học."},pharmacology:{path:"./src/content/pharmacology/duoc-ly.html",title:"Phân Hệ Dược Lý Lâm Sàng & Phác Đồ Thuốc",description:"Tra cứu thông tin thuốc, liều dùng chuẩn, tương tác, chỉnh liều thận & phác đồ kháng sinh."},pathophysiology:{path:"./src/content/pathophysiology/sinhly-sinhlybenh.html",title:"Phân Hệ Sinh Lý & Sinh Lý Bệnh Học",description:"Bài học sinh lý học trực quan, cơ chế bệnh sinh, hình ảnh minh họa & sơ đồ sinh lý bệnh."},skills:{path:"./src/content/skills/ky-nang.html",title:"Phân Hệ Kỹ Năng Lâm Sàng & Bedside Skills",description:"Quy trình thực hành khám 11 cơ quan chuẩn y khoa, bảng kiểm OSCE, Bedside Skills, đọc ECG & CXR."},approaches:{path:"./src/content/approaches/tiep-can.html",title:"Phân Hệ Phác Đồ & Lưu Đồ Tiếp Cận Lâm Sàng",description:"Thuật toán chẩn đoán và phác đồ xử trí cấp cứu khẩn cấp tương tác Vector SVG."},ebm:{path:"./src/content/ebm/yhcc.html",title:"Phân Hệ Y Học Chứng Cứ & Guidelines Y Khoa",description:"Tóm tắt Guidelines y khoa quốc tế, Bộ Y tế, PICO & Forest Plot Builder Meta-analysis."},tcm:{path:"./src/content/tcm/y-hoc-co-truyen.html",title:"Phân Hệ Y Học Cổ Truyền (YHCT)",description:"Kho lưu trữ lý luận YHCT, ngũ hành, châm cứu, xoa bóp bấm huyệt và vị thuốc đông y."}};function le(s=""){const e={emergency:"Cấp cứu & Hồi sức",cardiology:"Tim mạch",respiratory:"Hô hấp",renal:"Thận - Tiết niệu - Điện giải",endocrinology:"Nội tiết & Chuyển hoá",neurology:"Thần kinh",gastroenterology:"Tiêu hoá & Gan mật",hematology:"Huyết học",infectious:"Truyền nhiễm & Kháng sinh",general:"Tổng quát & Lâm sàng",specialties:"Chuyên khoa lâm sàng",symptoms:"Tiếp cận Triệu chứng",pathology:"Tiếp cận Bệnh lý",paraclinical:"Cận lâm sàng & Thăm dò","interactive-tools":"Lưu đồ & Phác đồ tương tác","ebm-lab":"EBM Lab & Biểu đồ y khoa",guidelines:"Khuyến cáo & Guidelines quốc tế",diagnostics:"Chẩn đoán học YHCT",monographs:"Chuyên đề & Phương thang"},t=s.toLowerCase().trim();return e[t]?e[t]:s?s.charAt(0).toUpperCase()+s.slice(1):"Tổng Quát & Lâm Sàng"}function de(s="",e=""){return s==="calculator"||e.endsWith(".html")?"Công Cụ Tương Tác":s==="document"||e.endsWith(".md")?"Bài Đọc / Guideline":"Công Cụ Y Khoa"}function he(s=""){return s==="calculator"?"var(--color-info-hl, #e0f2fe)":"var(--color-surface-offset, #f1f5f9)"}function ue(s=""){return s==="calculator"?"var(--color-primary, #0284c7)":"var(--color-text-muted, #64748b)"}async function O(s){const e=(s||"").toLowerCase().trim(),t=D.getDisplayName(e)||e.toUpperCase(),a=ce[e];if(a)return H({metadata:{title:a.title,description:a.description},slug:"hub",path:a.path});const n=await E.loadCategoryIndex(e);let i="";if(n.length===0)i=`
      <div style="text-align: center; padding: 4rem 1rem; background: var(--color-surface, #ffffff); border: 1px dashed var(--color-border, #e2e8f0); border-radius: 0.75rem;">
        <i class="fa-solid fa-folder-open" style="font-size: 3rem; color: var(--color-text-muted, #94a3b8); margin-bottom: 1rem;"></i>
        <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--color-text, #0f172a);">Đang chuẩn bị dữ liệu cho chuyên khoa ${t}</h3>
        <p style="color: var(--color-text-muted, #64748b); font-size: 0.9rem; margin-top: 0.5rem;">Vui lòng quay lại sau hoặc thử tra cứu từ khóa trên thanh tìm kiếm nhanh.</p>
      </div>
    `;else{const r=new Map;n.forEach(c=>{const o=c.subcategory||"general";r.has(o)||r.set(o,[]),r.get(o).push(c)}),i=Array.from(r.entries()).map(([c,o])=>{const p=le(c),h=o.map(d=>{const u=d.name.replace(/\.(html|md)$/i,"").replace(/_/g," ");return`
          <a href="#/${e}/${d.id}" class="content-item-card category-card-item" 
             data-title="${u.toLowerCase()}" 
             data-desc="${(d.description||"").toLowerCase()}" 
             data-sub="${c.toLowerCase()}"
             style="display: flex; flex-direction: column; justify-content: space-between; padding: 1.25rem; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem; text-decoration: none; color: inherit; transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
                <span style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.2rem 0.55rem; border-radius: 0.35rem; background: ${he(d.type)}; color: ${ue(d.type)};">
                  ${de(d.type,d.path)}
                </span>
                <i class="fa-solid fa-arrow-right" style="font-size: 0.825rem; color: var(--color-text-muted, #94a3b8);"></i>
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.5rem; line-height: 1.4;">${u}</h3>
              ${d.description?`<p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); line-height: 1.5; margin: 0;">${d.description}</p>`:""}
            </div>
          </a>
        `}).join("");return`
        <section class="category-subgroup-section" data-sub="${c}" style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary, #0284c7); margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--color-border, #e2e8f0); display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-folder-open"></i> ${p}
            <span style="font-size: 0.75rem; font-weight: 600; background: var(--color-surface-offset, #f1f5f9); color: var(--color-text-muted, #64748b); padding: 0.2rem 0.6rem; border-radius: 1rem;">${o.length}</span>
          </h2>
          <div class="category-cards-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 1.25rem;">
            ${h}
          </div>
        </section>
      `}).join("")}return`
    <div class="category-hub-container" style="max-width: 1320px; margin: 0 auto; padding: 1.5rem 1rem;">
      <header class="category-header" style="margin-bottom: 2rem;">
        <div class="breadcrumb" style="font-size: 0.875rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.5rem;">
          <a href="#/" style="color: inherit; text-decoration: none;">Trang chủ</a> &nbsp;/&nbsp; <span style="color: var(--color-primary, #0284c7); font-weight: 600;">${t}</span>
        </div>
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;">
          <div>
            <h1 style="font-size: 2rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.5rem;"><i class="fa-solid fa-folder-open"></i> Phân Hệ: ${t}</h1>
            <p style="color: var(--color-text-muted, #64748b); margin: 0;">Danh sách toàn bộ các bài học, phác đồ và công cụ lâm sàng thuộc chuyên khoa ${t} (${n.length} công cụ).</p>
          </div>
          <a href="#/" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.55rem 1.1rem; font-size: 0.875rem; border-radius: 0.5rem; text-decoration: none; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #0f172a); background: var(--color-surface, #fff);">
            <i class="fa-solid fa-house"></i> Về Trang chủ
          </a>
        </div>
      </header>

      ${n.length>0?`
        <div class="category-filter-bar" style="margin-bottom: 2rem;">
          <div style="position: relative; max-width: 520px;">
            <i class="fa-solid fa-filter" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--color-text-muted, #64748b);"></i>
            <input type="search" id="category-filter-input" placeholder="Lọc nhanh trong ${t} (ví dụ: An thần, eGFR, ECG)..." 
              style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.75rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.5rem; font-size: 0.925rem; background: var(--color-surface, #ffffff); color: var(--color-text, #0f172a); outline: none; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" />
          </div>
        </div>
      `:""}

      <div class="category-content-groups">
        ${i}
      </div>
    </div>
  `}const pe=Object.freeze(Object.defineProperty({__proto__:null,CliniFlowViewer:oe,CliniHeader:ie,CliniModal:R,CliniSidebar:se,initHomeViewEvents:q,modal:re,renderArticleView:z,renderCategoryView:O,renderHomeView:M,renderHtmlToolView:H},Symbol.toStringTag,{value:"Module"}));function T(s){const e=document.getElementById("app");e?(e.innerHTML=s,window.scrollTo({top:0,behavior:"smooth"})):console.error('[CliniPortal] Container element <main id="app"> not found in DOM.')}function ge(){const s=document.getElementById("category-filter-input");s&&s.addEventListener("input",()=>{const e=s.value.toLowerCase().trim(),t=document.querySelectorAll(".category-card-item"),a=document.querySelectorAll(".category-subgroup-section");t.forEach(n=>{const i=n.getAttribute("data-title")||"",r=n.getAttribute("data-desc")||"",c=n.getAttribute("data-sub")||"",o=!e||i.includes(e)||r.includes(e)||c.includes(e);n.style.display=o?"flex":"none"}),a.forEach(n=>{const i=n.querySelectorAll('.category-card-item[style*="display: flex"], .category-card-item:not([style*="display: none"])');n.style.display=i.length>0?"block":"none"})})}function me(){L.register("/","Trang Chủ",()=>{T(M()),q()}),L.register("/:category","Phân Hệ Y Khoa",async s=>{const e=s.category||"",t=await O(e);T(t),ge()}),L.register("/:category/:slug","Bài Viết Y Khoa",async s=>{const e=s.category||"",t=s.slug||"",a=await E.loadItem(e,t);a?(document.title=`${a.metadata.title||t} – CliniPortal`,a.isHtml?T(H(a)):T(z(a))):T(`
        <div class="error-404-container" style="text-align: center; padding: 4rem 1rem;">
          <div style="font-size: 4rem; color: var(--color-primary, #0284c7); margin-bottom: 1rem;"><i class="fa-solid fa-file-circle-xmark"></i></div>
          <h2 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem;">Nội dung chưa tồn tại</h2>
          <p style="color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">Không tìm thấy bài viết hoặc công cụ tại đường dẫn <code>#/${e}/${t}</code>.</p>
          <a href="#/" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1.2rem; background: var(--color-primary, #0284c7); color: #fff; border-radius: 0.5rem; text-decoration: none;">
            <i class="fa-solid fa-house"></i> Về Trang Chủ
          </a>
        </div>
      `)}),L.setFallback(s=>{T(`
      <div class="error-404-container" style="text-align: center; padding: 4rem 1rem;">
        <div style="font-size: 4rem; color: var(--color-warning, #f59e0b); margin-bottom: 1rem;"><i class="fa-solid fa-compass"></i></div>
        <h2 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem;">Đường dẫn không hợp lệ</h2>
        <p style="color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">Hash path <code>#${s}</code> không tồn tại trên hệ thống.</p>
        <a href="#/" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1.2rem; background: var(--color-primary, #0284c7); color: #fff; border-radius: 0.5rem; text-decoration: none;">
          <i class="fa-solid fa-house"></i> Về Trang Chủ
        </a>
      </div>
    `)})}function fe(){const s=document.querySelector(".search-bar-container .input"),e=document.getElementById("searchResultsDropdown");if(!s||!e)return;s.addEventListener("input",()=>{const a=s.value.trim();if(a.length===0){e.style.display="none",e.innerHTML="";return}const n=$.search(a,12);if(n.length===0){e.style.display="block",e.innerHTML=`
        <div style="padding: 1rem; text-align: center; color: var(--color-text-muted, #64748b); font-size: 0.875rem;">
          Không tìm thấy công cụ hay phác đồ nào khớp với <strong>"${a}"</strong>.
        </div>
      `;return}e.style.display="block",e.innerHTML=n.map(i=>`
        <a href="${i.doc.url}" class="search-result-item" style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; text-decoration: none; color: inherit; border-bottom: 1px solid var(--color-border, #e2e8f0); transition: background 0.15s;">
          <div>
            <div style="font-weight: 600; font-size: 0.925rem; color: var(--color-text, #0f172a); margin-bottom: 0.2rem;">${i.doc.title}</div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">${i.doc.contentSnippet||i.doc.category}</div>
          </div>
          <span style="font-size: 0.7rem; font-weight: 600; text-transform: uppercase; padding: 0.2rem 0.5rem; border-radius: 0.25rem; background: var(--color-surface-offset, #f1f5f9); color: var(--color-primary, #0284c7);">
            ${i.doc.category}
          </span>
        </a>
      `).join(""),e.querySelectorAll("a.search-result-item").forEach(i=>{i.addEventListener("click",()=>{e.style.display="none",s.value=""})})}),document.addEventListener("click",a=>{!s.contains(a.target)&&!e.contains(a.target)&&(e.style.display="none")}),document.addEventListener("keydown",a=>{var n;a.key==="/"&&document.activeElement!==s&&!["INPUT","TEXTAREA"].includes(((n=document.activeElement)==null?void 0:n.tagName)||"")&&(a.preventDefault(),s.focus()),a.key==="Escape"&&e.style.display==="block"&&(e.style.display="none",s.blur())});const t=document.getElementById("cmdPaletteTrigger");t&&t.addEventListener("click",()=>{s.focus()})}window.CliniPortalCore={version:"2.0.0",isOffline:!0,storage:_,markdown:G,clinical:J,categories:D,router:L,searchEngine:$,contentLoader:E,components:pe};me();L.init();fe();$.initAllIndexes().then(()=>{console.log("✅ CliniPortal 2.0 SPA Content Index Ready.")});console.log("🚀 CliniPortal 2.0 SPA Engine & Dynamic Router Initialized Successfully.");
