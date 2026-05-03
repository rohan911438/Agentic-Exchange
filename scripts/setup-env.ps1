
<#
PowerShell helper to create and activate a virtual environment and install dependencies.
Usage: Run from project root in PowerShell:
  .\scripts\setup-env.ps1
#>
param(
    [string]$venvPath = ".venv"
)

Write-Host "Creating virtual environment at $venvPath"
python -m venv $venvPath

Write-Host "Activating virtual environment"
& "$venvPath\Scripts\Activate.ps1"

Write-Host "Upgrading pip and installing dependencies"
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

Write-Host "Installing editable package with dev extras if available"
try {
    python -m pip install -e .[dev]
} catch {
    python -m pip install -e .
}

Write-Host "Environment setup complete. To activate later run: .\$venvPath\Scripts\Activate.ps1"
