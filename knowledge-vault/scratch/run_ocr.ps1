Add-Type -AssemblyName System.Drawing
[Windows.Media.Ocr.OcrEngine, Windows.Foundation.UniversalApiContract, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation.UniversalApiContract, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Foundation.UniversalApiContract, ContentType = WindowsRuntime] | Out-Null

$imgDir = "i:\Drive của tôi\apps\Apps_ykhoa\knowledge-vault\PDF\_extracted_images"
$outDir = "i:\Drive của tôi\apps\Apps_ykhoa\knowledge-vault\PDF\_extracted_ocr"
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage([Windows.Globalization.Language]::new("en-US"))
$images = Get-ChildItem -Path $imgDir -Include *.png,*.jpeg,*.jpg -Recurse

foreach ($img in $images) {
    try {
        $file = [Windows.Storage.StorageFile]::GetFileFromPathAsync($img.FullName).GetAwaiter().GetResult()
        $stream = $file.OpenAsync([Windows.Storage.FileAccessMode]::Read).GetAwaiter().GetResult()
        $decoder = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream).GetAwaiter().GetResult()
        $bitmap = $decoder.GetSoftwareBitmapAsync().GetAwaiter().GetResult()
        $result = $engine.RecognizeAsync($bitmap).GetAwaiter().GetResult()
        
        $outName = [System.IO.Path]::ChangeExtension($img.Name, ".txt")
        $outPath = Join-Path $outDir $outName
        [System.IO.File]::WriteAllText($outPath, $result.Text, [System.Text.Encoding]::UTF8)
        Write-Host "Done: $($img.Name) -> $($result.Text.Length) chars"
    } catch {
        Write-Host "Error $($img.Name): $_"
    }
}
