
<#
PowerShell helper to run tests inside the project's virtual environment.
Usage:
  .\scripts\run-tests.ps1 -VenvPath .venv
#>
param(
    [string]$VenvPath = ".venv",
    [string]$PytestArgs = "-q"
)

if (-Not (Test-Path "$VenvPath\Scripts\Activate.ps1")) {
    Write-Error "Virtualenv not found at $VenvPath. Run .\scripts\setup-env.ps1 first."
    exit 1
}

Write-Host "Activating virtual environment at $VenvPath"
& "$VenvPath\Scripts\Activate.ps1"

Write-Host "Running pytest $PytestArgs"
python -m pytest $PytestArgs
