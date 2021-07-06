# powershell -NoProfile -ExecutionPolicy Bypass -File "D:\Web\udistrital\siciud-v2\app\front\publish.ps1"
# powershell -NoProfile -ExecutionPolicy Bypass -File "D:\siciud-v2\publish.ps1"
# powershell -NoProfile -ExecutionPolicy Bypass -File ./publish.ps1
Clear-Host

$errorActionPreference = 'Stop'
$date = Get-Date -f "yyyyMMddHHmm"
$working = $PSScriptRoot
$jsonPath = "$working\public\data\config.json"
$targetBase = "\\orion\e$\web\support\udistrital"
$target = "$targetBase\siciud-v2"
Write-Host "Fecha: $date"
Write-Host "Directorio actual: $working"
Write-Host "Json: $jsonPath"
Write-Host "Directorio final: $target"

if (Test-Path $targetBase) {
	# 202010290745: Modifica el config para prod
	$json = Get-Content $jsonPath -raw | ConvertFrom-Json
	$token = $json.api.oas.token_value
	$debug = $json.debug
	$json.api.oas.token_value = $null
	$json.debug = $false
	$json | ConvertTo-Json | Set-Content $jsonPath
	Write-Host "TOKEN: $token"

	Try {
		# Renombra si existe
		if (Test-Path $target) {
			Rename-Item $target $target-$date
		}

		# Compila y mueve
		Set-Location $working
		npm run build
		Move-Item -Path "$working\dist" -Destination $target

		# 202010290745: Devuelve al original
		$json = Get-Content $jsonPath -raw | ConvertFrom-Json
		$json.api.oas.token_value = "$token"
		$json.debug = $debug
		$json | ConvertTo-Json | Set-Content $jsonPath

		# Lanza
		Start-Process $target
		Start-Process "chrome.exe" "https://support.nemedi.com/udistrital/siciud-v2"
	} Catch {
		$ErrorMessage = $_.Exception.Message
		Write-Host "ERROR: $ErrorMessage"
		Break
	}
}


