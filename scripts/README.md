Windows helper scripts

Use these scripts from PowerShell in the project root, or use the `.bat` wrappers from Command Prompt.

- `setup-env.ps1` — creates a virtual environment at `.venv`, installs dependencies, and installs the package in editable mode.
- `run-tests.ps1` — activates the `.venv` env and runs `pytest` (accepts `-PytestArgs` parameter).
- `setup-env.bat` — standalone `cmd` helper that creates `.venv`, installs dependencies, and installs the package.
- `run-tests.bat` — standalone `cmd` helper that runs `pytest` from `.venv`.

Examples:

```powershell
.\scripts\setup-env.ps1
.\scripts\run-tests.ps1 -PytestArgs "-q -vv"

REM Command Prompt equivalents
scripts\setup-env.bat
scripts\run-tests.bat -q -vv
```

If you want the PowerShell versions, call `scripts\setup-env.ps1` and `scripts\run-tests.ps1` directly from PowerShell.
