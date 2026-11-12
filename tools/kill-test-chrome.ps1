# Sadece test profilleriyle (scratchpad altında) açılmış Chrome süreçlerini kapatır
$procs = Get-CimInstance Win32_Process -Filter "Name = 'chrome.exe'" | Where-Object { $_.CommandLine -like "*b8bd72d7-7adf-4ed3-a103-c4d6bfd96676*" }
$n = 0; foreach ($p in $procs) { try { Stop-Process -Id $p.ProcessId -Force -ErrorAction Stop; $n++ } catch {} }
"killed $n test chrome processes"
