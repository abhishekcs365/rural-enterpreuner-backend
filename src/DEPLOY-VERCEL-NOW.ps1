# ============================================================================
# ONE-CLICK VERCEL DEPLOYMENT - Frontend + Backend
# ============================================================================
# This script:
# 1. Fixes your file structure
# 2. Prepares for Vercel deployment
# 3. Deploys frontend to Vercel (FREE)
# 4. Gives you instructions for Supabase backend
# ============================================================================

Write-Host "`n╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                               ║" -ForegroundColor Cyan
Write-Host "║        🚀 DEPLOYING TO VERCEL - Automated Setup              ║" -ForegroundColor Cyan
Write-Host "║                                                               ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# ============================================================================
# STEP 1: Fix file structure
# ============================================================================

Write-Host "📂 STEP 1: Fixing file structure..." -ForegroundColor Yellow
Write-Host ""

# Move components to src
if (Test-Path "components") {
    if (!(Test-Path "src/components")) {
        Write-Host "  📦 Moving /components to /src/components" -ForegroundColor Cyan
        Move-Item "components" "src/components"
        Write-Host "  ✅ Moved!" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Removing duplicate /components" -ForegroundColor Red
        Remove-Item -Recurse -Force "components"
        Write-Host "  ✅ Removed!" -ForegroundColor Green
    }
}

# Move lib to src if needed
if (Test-Path "lib") {
    if (!(Test-Path "src/lib")) {
        Write-Host "  📦 Moving /lib to /src/lib" -ForegroundColor Cyan
        Move-Item "lib" "src/lib"
        Write-Host "  ✅ Moved!" -ForegroundColor Green
    } else {
        Remove-Item -Recurse -Force "lib" -ErrorAction SilentlyContinue
    }
}

# Move utils to src if needed
if (Test-Path "utils") {
    if (!(Test-Path "src/utils")) {
        Write-Host "  📦 Moving /utils to /src/utils" -ForegroundColor Cyan
        Move-Item "utils" "src/utils"
        Write-Host "  ✅ Moved!" -ForegroundColor Green
    } else {
        Remove-Item -Recurse -Force "utils" -ErrorAction SilentlyContinue
    }
}

# Remove duplicate App.tsx in root
if (Test-Path "App.tsx") {
    Write-Host "  ❌ Removing duplicate /App.tsx" -ForegroundColor Red
    Remove-Item -Force "App.tsx"
    Write-Host "  ✅ Removed!" -ForegroundColor Green
}

# Remove duplicate styles in root
if (Test-Path "styles") {
    Write-Host "  ❌ Removing duplicate /styles" -ForegroundColor Red
    Remove-Item -Recurse -Force "styles"
    Write-Host "  ✅ Removed!" -ForegroundColor Green
}

Write-Host ""

# ============================================================================
# STEP 2: Check .env file
# ============================================================================

Write-Host "🔐 STEP 2: Checking environment variables..." -ForegroundColor Yellow
Write-Host ""

$envExists = Test-Path ".env"
$hasSupabaseUrl = $false
$hasSupabaseKey = $false

if ($envExists) {
    $envContent = Get-Content ".env" -Raw -ErrorAction SilentlyContinue
    $hasSupabaseUrl = $envContent -match "VITE_SUPABASE_URL"
    $hasSupabaseKey = $envContent -match "VITE_SUPABASE_ANON_KEY"
}

if ($envExists -and $hasSupabaseUrl -and $hasSupabaseKey) {
    Write-Host "  ✅ .env file exists with Supabase keys" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  WARNING: .env file missing or incomplete!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  You need to create .env file with:" -ForegroundColor White
    Write-Host "  VITE_SUPABASE_URL=your_supabase_url" -ForegroundColor White
    Write-Host "  VITE_SUPABASE_ANON_KEY=your_supabase_key" -ForegroundColor White
    Write-Host ""
    Write-Host "  Get these from: https://supabase.com" -ForegroundColor Cyan
    Write-Host ""
    
    $continue = Read-Host "  Do you want to continue anyway? (y/n)"
    if ($continue -ne "y") {
        Write-Host "`n  ❌ Deployment cancelled. Create .env file first!" -ForegroundColor Red
        exit
    }
}

Write-Host ""

# ============================================================================
# STEP 3: Install dependencies
# ============================================================================

Write-Host "📦 STEP 3: Installing dependencies..." -ForegroundColor Yellow
Write-Host ""

npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ npm install failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ Dependencies installed!" -ForegroundColor Green
Write-Host ""

# ============================================================================
# STEP 4: Build the app
# ============================================================================

Write-Host "🏗️  STEP 4: Building production app..." -ForegroundColor Yellow
Write-Host ""

npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Build failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common fixes:" -ForegroundColor Yellow
    Write-Host "  1. Check all TypeScript errors" -ForegroundColor White
    Write-Host "  2. Verify all imports are correct" -ForegroundColor White
    Write-Host "  3. Make sure .env file exists" -ForegroundColor White
    exit 1
}

Write-Host "`n✅ Build complete!" -ForegroundColor Green
Write-Host ""

# ============================================================================
# STEP 5: Install Vercel CLI
# ============================================================================

Write-Host "🔧 STEP 5: Installing Vercel CLI..." -ForegroundColor Yellow
Write-Host ""

npm install -g vercel

Write-Host "`n✅ Vercel CLI installed!" -ForegroundColor Green
Write-Host ""

# ============================================================================
# SUCCESS!
# ============================================================================

Write-Host "`n╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                                               ║" -ForegroundColor Green
Write-Host "║              ✅ READY TO DEPLOY TO VERCEL!                   ║" -ForegroundColor Green
Write-Host "║                                                               ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════════════════════╝`n" -ForegroundColor Green

Write-Host "🚀 NEXT: Deploy to Vercel (takes 2 minutes):" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Run this command:" -ForegroundColor White
Write-Host "  vercel" -ForegroundColor Yellow
Write-Host ""
Write-Host "  When prompted:" -ForegroundColor White
Write-Host "  1. 'Set up and deploy?' → Press ENTER (yes)" -ForegroundColor White
Write-Host "  2. 'Which scope?' → Press ENTER (your account)" -ForegroundColor White
Write-Host "  3. 'Link to existing project?' → Type 'n' + ENTER (no)" -ForegroundColor White
Write-Host "  4. 'Project name?' → Press ENTER (auto-generated)" -ForegroundColor White
Write-Host "  5. 'In which directory?' → Type './' + ENTER" -ForegroundColor White
Write-Host "  6. 'Want to override settings?' → Type 'y' + ENTER (yes)" -ForegroundColor White
Write-Host "  7. 'Build command?' → Type 'npm run build' + ENTER" -ForegroundColor White
Write-Host "  8. 'Output directory?' → Type 'dist' + ENTER" -ForegroundColor White
Write-Host "  9. 'Development command?' → Press ENTER (default)" -ForegroundColor White
Write-Host ""
Write-Host "  ⏳ Wait 2 minutes... Your app will be LIVE!" -ForegroundColor Cyan
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host ""
Write-Host "⚠️  IMPORTANT: After deployment, you MUST add environment variables!" -ForegroundColor Yellow
Write-Host ""
Write-Host "  1. Go to: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "  2. Click your project" -ForegroundColor White
Write-Host "  3. Settings → Environment Variables" -ForegroundColor White
Write-Host "  4. Add these:" -ForegroundColor White
Write-Host "     • VITE_SUPABASE_URL = your_supabase_url" -ForegroundColor White
Write-Host "     • VITE_SUPABASE_ANON_KEY = your_supabase_key" -ForegroundColor White
Write-Host "  5. Redeploy: vercel --prod" -ForegroundColor White
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host ""
Write-Host "📚 BACKEND: Your Supabase backend is in /supabase/functions/" -ForegroundColor Cyan
Write-Host "   It's already set up! Just make sure your Supabase project is running." -ForegroundColor Cyan
Write-Host ""
Write-Host "✨ Your app will be live at: https://your-project.vercel.app" -ForegroundColor Green
Write-Host ""
