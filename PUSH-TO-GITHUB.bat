@echo off
setlocal
cd /d "%~dp0"
set "REPO_URL=https://github.com/Vicky4002/riyadvi-full-stack-assignment.git"
set "WORK=%TEMP%\riyadvi-full-stack-assignment-push"
echo.
echo Riyadvi rebuild: preparing GitHub update...
echo This script excludes .env files, node_modules, dist, and .git.
echo.
where git >nul 2>nul
if errorlevel 1 (
  echo ERROR: Git is not installed or not on PATH.
  pause
  exit /b 1
)
if exist "%WORK%" rmdir /s /q "%WORK%"
git clone "%REPO_URL%" "%WORK%"
if errorlevel 1 (
  echo ERROR: Could not clone GitHub repository. Check internet and GitHub authentication.
  pause
  exit /b 1
)
robocopy "%~dp0." "%WORK%" /E /XD node_modules .git dist /XF .env .env.local .env.production /NFL /NDL /NJH /NJS /NC /NS
if errorlevel 8 (
  echo ERROR: Copy failed.
  pause
  exit /b 1
)
cd /d "%WORK%"
git add -A
git diff --cached --quiet
if not errorlevel 1 (
  echo No changes to commit; GitHub already matches these files.
  pause
  exit /b 0
)
git commit -m "Apply Riyadvi premium dark UI rebuild"
if errorlevel 1 (
  echo ERROR: Commit failed.
  pause
  exit /b 1
)
git push origin main
if errorlevel 1 (
  echo ERROR: Push failed. Resolve any GitHub authentication or branch-protection prompt and rerun this script.
  pause
  exit /b 1
)
echo.
echo SUCCESS: Rebuild pushed to GitHub main.
echo GitHub: https://github.com/Vicky4002/riyadvi-full-stack-assignment
pause
