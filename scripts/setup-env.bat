@echo off
setlocal enabledelayedexpansion

set VENV_PATH=.venv
if not "%~1"=="" set VENV_PATH=%~1

echo [setup-env] Creating virtual environment at %VENV_PATH%
python -m venv %VENV_PATH%
if errorlevel 1 exit /b 1

echo [setup-env] Upgrading pip
"%VENV_PATH%\Scripts\python.exe" -m pip install --upgrade pip
if errorlevel 1 exit /b 1

echo [setup-env] Installing requirements
"%VENV_PATH%\Scripts\python.exe" -m pip install -r requirements.txt
if errorlevel 1 exit /b 1

echo [setup-env] Installing editable package with dev extras
"%VENV_PATH%\Scripts\python.exe" -m pip install -e .[dev]
if errorlevel 1 (
	echo [setup-env] Dev extras install failed; installing editable package without extras
	"%VENV_PATH%\Scripts\python.exe" -m pip install -e .
	if errorlevel 1 exit /b 1
)

echo [setup-env] Done. Activate later with %VENV_PATH%\Scripts\activate.bat or %VENV_PATH%\Scripts\Activate.ps1

