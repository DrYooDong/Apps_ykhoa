# Script to embed main.js into all HTML files
# Author: Podcast DrDong
# Version: 2.0.0

$basePath = "d:\Ứng dụng\apps\Apps_ykhoa"
$mainJsPath = "../assets/js/main.js"

# Get all HTML files except index.html (already updated)
$htmlFiles = Get-ChildItem -Path $basePath -Recurse -Filter "*.html" | Where-Object { $_.Name -ne "index.html" }

Write-Host "Starting to embed main.js into HTML files..."
Write-Host "Total files to process: $($htmlFiles.Count)"

$processedCount = 0
$skippedCount = 0

foreach ($file in $htmlFiles) {
    $fileName = $file.Name
    Write-Host "Processing: $fileName"
    
    # Read file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Skip if already has main.js
    if ($content -match "main.js") {
        Write-Host "  → Already has main.js, skipping..."
        $skippedCount++
        continue
    }
    
    # Find the position to insert main.js script tag
    # Look for common patterns where scripts are usually placed
    $patterns = @(
        '(?s)(<link href="https://fonts\.googleapis\.com/css2\?family=Inter.*?</link>)',
        '(?s)(<script src="https://cdn\.tailwindcss\.com"></script>)',
        '(?s)(<link rel="stylesheet" href="\.\./assets/css/style\.css">)'
    )
    
    $inserted = $false
    
    foreach ($pattern in $patterns) {
        if ($content -match $pattern) {
            $replacement = "`$1`n    <script src=`"$mainJsPath`"></script>"
            $content = $content -replace $pattern, $replacement
            $inserted = $true
            Write-Host "  → Inserted after: $($pattern.Split('"')[1])"
            break
        }
    }
    
    # If no pattern matched, insert at the end of head section
    if (-not $inserted) {
        if ($content -match '(?s)</head>') {
            $content = $content -replace '</head>', "    <script src=`"$mainJsPath`"></script>`n</head>"
            Write-Host "  → Inserted before </head>"
            $inserted = $true
        }
    }
    
    if ($inserted) {
        # Write updated content back to file
        $content | Out-File -FilePath $file.FullName -Encoding UTF8
        Write-Host "  → Updated successfully!"
        $processedCount++
    } else {
        Write-Host "  → Could not find insertion point, skipping..."
        $skippedCount++
    }
}

Write-Host "`n=== SUMMARY ==="
Write-Host "Files processed: $processedCount"
Write-Host "Files skipped: $skippedCount"
Write-Host "Total files: $($htmlFiles.Count)"

if ($processedCount -gt 0) {
    Write-Host "`n✅ Embed main.js completed successfully!"
    Write-Host "All files now have:"
    Write-Host "  - Dark Mode persistence across pages"
    Write-Host "  - Auto-focus on first input field"
    Write-Host "  - Enhanced form navigation"
} else {
    Write-Host "`n⚠️  No files were updated."
}
