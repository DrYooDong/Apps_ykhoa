# Script to update HTML files with Podcast DrDong branding and Dark Mode
# Author: Podcast DrDong
# Version: 2.0.0

$basePath = "d:\Ứng dụng\apps\Apps_ykhoa"
$cssPath = "../assets/css/style.css"
$fontPath = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"

# Get all HTML files except index.html
$htmlFiles = Get-ChildItem -Path $basePath -Recurse -Filter "*.html" | Where-Object { $_.Name -ne "index.html" }

# Header template with Podcast DrDong branding
$headerTemplate = @"
    <!-- Header -->
    <header class="header">
        <div class="header-content">
            <div class="header-title">
                <a href="../index.html" class="brand-logo" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%);">
                    <div class="brand-icon" style="width: 24px; height: 24px; font-size: 12px;">PD</div>
                </a>
                <span style="margin-left: 3rem;">{ICON}</span>
                <span>{TITLE}</span>
            </div>
            <div class="header-nav">
                <a href="../index.html" class="back-home-btn">
                    <span>←</span>
                    <span>Về trang chủ</span>
                </a>
                <!-- Dark Mode Toggle -->
                <div class="theme-toggle" onclick="toggleTheme()" title="Chuyển đổi Dark/Light Mode">
                    <div class="theme-toggle-slider">
                        <span id="themeIcon">☀️</span>
                    </div>
                </div>
            </div>
        </div>
    </header>
"@

# Footer template with Podcast DrDong branding
$footerTemplate = @"

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-title">Podcast DrDong - Clinical Assistant Hub</div>
            <div class="footer-text">
                {DESCRIPTION}<br>
                Medical science over a cup of tea<br>
                © 2026 Podcast DrDong - Phiên bản 2.0.0
            </div>
        </div>
    </footer>
"@

# JavaScript template for Dark Mode
$jsTemplate = @"

        // Dark Mode Toggle Function
        function toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            const themeIcon = document.getElementById('themeIcon');
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
        }

        // Initialize theme on load
        function initTheme() {
            const savedTheme = localStorage.getItem('theme') || 
                             (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            const themeIcon = document.getElementById('themeIcon');
            
            document.documentElement.setAttribute('data-theme', savedTheme);
            themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
        }

        // Initialize theme when page loads
        initTheme();
"@

# File information mapping
$fileInfo = @{
    "Quanly_SHH.html" = @{ Icon = "🫁"; Title = "LƯU ĐỒ TIẾP CẬN SUY HÔ HẤP CẤP"; Description = "Công cụ hỗ trợ chẩn đoán và điều trị Suy hô hấp cấp" }
    "ACLS.html" = @{ Icon = "🚑"; Title = "ALS Master 2025 (ERC)"; Description = "Công cụ hỗ trợ Hồi sinh tim phổi theo chuẩn ERC 2025" }
    "TraCuuBHYT.html" = @{ Icon = "🔍"; Title = "Tra cứu BHYT"; Description = "Công cụ tra cứu Bảo hiểm Y tế chuyên nghiệp" }
    "Sepsis_Master_SSC2026.html" = @{ Icon = "🚨"; Title = "Sepsis SSC 2026"; Description = "Quản lý nhiễm khuẩn huyết theo Surviving Sepsis 2026" }
    "Luachon_KS_WellingtonICU.html" = @{ Icon = "💊"; Title = "Kháng sinh Wellington ICU"; Description = "Tra cứu phác đồ kháng sinh chuẩn Wellington ICU" }
    "checklists.html" = @{ Icon = "📋"; Title = "Quản lý Checklist Lâm Sàng"; Description = "Công cụ quản lý checklist lâm sàng theo phác đồ y khoa" }
    "Quanly_phanve.html" = @{ Icon = "📋"; Title = "Quản lý Phản vệ"; Description = "Phác đồ xử trí phản vệ theo hướng dẫn mới nhất" }
    "Quanly_thuoc_timmach.html" = @{ Icon = "💊"; Title = "Thuốc Tim Mạch"; Description = "Quản lý thuốc THA, suy tim, hội chứng vành mạn" }
    "Clinical_Scores.html" = @{ Icon = "🏥"; Title = "Clinical Scores"; Description = "Đánh giá nhanh các thang điểm lâm sàng phổ biến" }
}

# Process each HTML file
foreach ($file in $htmlFiles) {
    $fileName = $file.Name
    Write-Host "Processing: $fileName"
    
    # Read file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Skip if already updated (check for Podcast DrDong branding)
    if ($content -match "Podcast DrDong") {
        Write-Host "  → Already updated, skipping..."
        continue
    }
    
    # Get file info or use defaults
    $info = $fileInfo[$fileName]
    if (-not $info) {
        $info = @{
            Icon = "🏥"
            Title = $fileName -replace '\.html$', ''
            Description = "Công cụ y khoa chuyên nghiệp"
        }
    }
    
    # Update CSS link and font
    $content = $content -replace '<link rel="stylesheet" href="../assets/css/style\.css">', "<link rel=`"stylesheet`" href=`"../assets/css/style.css`">"
    $content = $content -replace '<link href="https://fonts\.googleapis\.com/css2\?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">', "<link href=`"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`" rel=`"stylesheet`">"
    
    # Update header
    $header = $headerTemplate -replace '\{ICON\}', $info.Icon -replace '\{TITLE\}', $info.Title
    $content = $content -replace '(?s)<!-- Header -->.*?</header>', $header
    
    # Update footer
    $footer = $footerTemplate -replace '\{DESCRIPTION\}', $info.Description
    $content = $content -replace '(?s)<!-- Footer -->.*?</footer>', $footer
    
    # Add JavaScript before closing script tag
    if ($content -match '</script>\s*$') {
        $content = $content -replace '</script>\s*$', ($jsTemplate + "`n    </script>")
    } else {
        # Add new script section if none exists
        $content = $content -replace '</body>', ("`n    <script>" + $jsTemplate + "`n    </script>`n</body>")
    }
    
    # Write updated content back to file
    $content | Out-File -FilePath $file.FullName -Encoding UTF8
    Write-Host "  → Updated successfully!"
}

Write-Host "`nUpdate completed! Updated files:"
foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    if ($content -match "Podcast DrDong") {
        Write-Host "  ✓ $($file.Name)"
    }
}
