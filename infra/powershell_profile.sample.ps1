# Dharmagile AI - Sample PowerShell Profile
# Place this file as your PowerShell profile (see $PROFILE) to standardize the dev environment.

# Ensure pnpm, volta, python, and supabase CLI are in PATH
$env:PATH += ";$HOME\.volta\bin;$HOME\AppData\Roaming\pnpm;$HOME\.pyenv\pyenv-win\bin;$HOME\.supabase\bin"

# Activate Python virtualenv for FastAPI backend (if exists)
if (Test-Path -Path ".venv/Scripts/Activate.ps1") {
    . .venv/Scripts/Activate.ps1
}

# Set Node version via Volta (if available)
if (Test-Path -Path "package.json") {
    volta install node@lts
}

# Aliases for common commands
Set-Alias supabase "supabase"
Set-Alias pnpm "pnpm"
Set-Alias python "python"

# Optional: Set default location to project root
# Set-Location "C:\Users\thelo\Desktop\website\teebusinessinsight\dharmagile ai"

# Add any additional customizations below
