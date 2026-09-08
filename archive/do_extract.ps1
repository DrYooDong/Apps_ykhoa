
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Expand-Archive -LiteralPath "D:\Apps\Apps_ykhoa\archive\ecg-master---phân-tích-điện-tâm-đồ-12-chuyển-đạo-&-ai-chẩn-đoán.zip" -DestinationPath "D:\Apps\Apps_ykhoa\archive\ecg-master-extracted" -Force
Write-Output "Extraction completed"
