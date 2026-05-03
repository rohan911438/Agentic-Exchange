@echo off
setlocal enabledelayedexpansion

set VENV_PATH=.venv
set PYTEST_ARGS=-q
if not "%~1"=="" set PYTEST_ARGS=%*

if not exist "%VENV_PATH%\Scripts\python.exe" (
    echo [run-tests] Virtual environment not found at %VENV_PATH%.
    echo [run-tests] Run scripts\setup-env.bat first.
    exit /b 1
)

echo [run-tests] Running pytest %PYTEST_ARGS%
"%VENV_PATH%\Scripts\python.exe" -m pytest %PYTEST_ARGS%
if errorlevel 1 exit /b 1

