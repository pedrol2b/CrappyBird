@echo off
setlocal

if "%PORT%"=="" set PORT=8080
if "%HOST%"=="" set HOST=127.0.0.1

where node >nul 2>&1
if errorlevel 1 (
  echo Node.js was not found in PATH.
  echo Install Node.js from https://nodejs.org/ and try again.
  exit /b 1
)

node scripts\serve.js
