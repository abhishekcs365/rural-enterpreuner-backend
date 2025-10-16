# ============================================================================
# WINDOWS CLEANUP SCRIPT - Rural Entrepreneur Hub
# ============================================================================
# This script fixes your file structure for Azure deployment
# Run this in PowerShell from your project root folder
# ============================================================================

Write-Host "`n" -NoNewline
Write-Host "╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                               ║" -ForegroundColor Cyan
Write-Host "║           🧹 CLEANUP & FIX - Rural Entrepreneur Hub          ║" -ForegroundColor Cyan
Write-Host "║                                                               ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "`n"

# ============================================================================
# STEP 1: Move components to /src if needed
# ============================================================================

Write-Host "📂 STEP 1: Fixing component structure..." -ForegroundColor Yellow
Write-Host ""

if (Test-Path "components") {
    if (Test-Path "src/components") {
        Write-Host "  ❌ Removing duplicate /components folder" -ForegroundColor Red
        Remove-Item -Recurse -Force "components"
        Write-Host "  ✅ Removed!" -ForegroundColor Green
    } else {
        Write-Host "  📦 Moving /components to /src/components" -ForegroundColor Cyan
        Move-Item "components" "src/components"
        Write-Host "  ✅ Moved!" -ForegroundColor Green
    }
} else {
    if (Test-Path "src/components") {
        Write-Host "  ✅ Components already in correct location (/src/components)" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  WARNING: No components folder found!" -ForegroundColor Yellow
    }
}

Write-Host ""

# ============================================================================
# STEP 2: Remove duplicate App.tsx in root
# ============================================================================

Write-Host "📄 STEP 2: Removing duplicate App.tsx..." -ForegroundColor Yellow
Write-Host ""

if (Test-Path "App.tsx") {
    Write-Host "  ❌ Removing duplicate /App.tsx (keeping /src/App.tsx)" -ForegroundColor Red
    Remove-Item -Force "App.tsx"
    Write-Host "  ✅ Removed!" -ForegroundColor Green
} else {
    Write-Host "  ✅ No duplicate App.tsx found" -ForegroundColor Green
}

Write-Host ""

# ============================================================================
# STEP 3: Remove duplicate styles folder
# ============================================================================

Write-Host "🎨 STEP 3: Removing duplicate styles..." -ForegroundColor Yellow
Write-Host ""

if (Test-Path "styles") {
    if (Test-Path "src/styles") {
        Write-Host "  ❌ Removing duplicate /styles folder (keeping /src/styles)" -ForegroundColor Red
        Remove-Item -Recurse -Force "styles"
        Write-Host "  ✅ Removed!" -ForegroundColor Green
    } else {
        Write-Host "  📦 Moving /styles to /src/styles" -ForegroundColor Cyan
        Move-Item "styles" "src/styles"
        Write-Host "  ✅ Moved!" -ForegroundColor Green
    }
} else {
    if (Test-Path "src/styles") {
        Write-Host "  ✅ Styles already in correct location (/src/styles)" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  WARNING: No styles folder found!" -ForegroundColor Yellow
    }
}

Write-Host ""

# ============================================================================
# STEP 4: Remove ALL unnecessary documentation files
# ============================================================================

Write-Host "📚 STEP 4: Removing unnecessary documentation files..." -ForegroundColor Yellow
Write-Host ""

$docsToRemove = @(
    "AZURE-DEPLOY.md",
    "AZURE-DIRECT-DEPLOY.md",
    "AZURE-NO-GITHUB.txt",
    "AZURE-QUICK.md",
    "COMPLETE-GUIDE.md",
    "COMPLETE-SOLUTION.md",
    "DEPENDENCIES.md",
    "DEPLOY-CARD.txt",
    "DEPLOY-NOW-SIMPLE.md",
    "DEPLOY-NOW.md",
    "DEPLOY-SIMPLE.md",
    "DEPLOYMENT-FILES.md",
    "DEPLOYMENT.md",
    "EXPORT-QUICK-REFERENCE.md",
    "EXPORT-SUMMARY.md",
    "FILE-STRUCTURE-CHECKLIST.md",
    "FINAL-SUMMARY.md",
    "FIX-AND-DEPLOY.md",
    "FIX-STRUCTURE.md",
    "GITHUB-COMMANDS.md",
    "GITHUB-EXPORT-GUIDE.md",
    "IMPORT-PATH-UPDATES.md",
    "INDEX.md",
    "QUICK-DEPLOY.md",
    "QUICK-START-CARD.txt",
    "QUICKSTART.md",
    "READ-ME-FIRST.md",
    "README-FINAL.md",
    "SIMPLE-AZURE-DEPLOY.md",
    "SIMPLE-DEPLOY.txt",
    "START-HERE-NOW.md",
    "START-HERE.md",
    "__-DEPLOY-AZURE-NOW.md",
    "cleanup-and-deploy.ps1",
    "cleanup-and-deploy.sh",
    "build-for-azure.ps1",
    "build-for-azure.sh",
    "deploy-setup.ps1",
    "deploy-setup.sh",
    "reorganize.ps1",
    "reorganize.sh",
    "⚡-DEPLOY-NOW.md",
    "🎯-READ-THIS-FIRST.md",
    "🚀-START-HERE.md"
)

$removedCount = 0

foreach ($doc in $docsToRemove) {
    if (Test-Path $doc) {
        Remove-Item -Force $doc -ErrorAction SilentlyContinue
        Write-Host "  ❌ Removed: $doc" -ForegroundColor DarkGray
        $removedCount++
    }
}

if ($removedCount -eq 0) {
    Write-Host "  ✅ No unnecessary docs found" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "  ✅ Removed $removedCount unnecessary documentation files" -ForegroundColor Green
}

Write-Host ""

# ============================================================================
# STEP 5: Remove deployment configs for other platforms
# ============================================================================

Write-Host "🗑️  STEP 5: Removing configs for other platforms..." -ForegroundColor Yellow
Write-Host ""

$configsToRemove = @(
    "netlify.toml",
    "vercel.json"
)

foreach ($config in $configsToRemove) {
    if (Test-Path $config) {
        Remove-Item -Force $config -ErrorAction SilentlyContinue
        Write-Host "  ❌ Removed: $config" -ForegroundColor DarkGray
    }
}

Write-Host "  ✅ Cleaned up platform-specific configs" -ForegroundColor Green
Write-Host ""

# ============================================================================
# STEP 6: Verify structure
# ============================================================================

Write-Host "✅ STEP 6: Verifying project structure..." -ForegroundColor Yellow
Write-Host ""

$allGood = $true

# Check src folder
if (Test-Path "src") {
    Write-Host "  ✅ /src folder exists" -ForegroundColor Green
} else {
    Write-Host "  ❌ ERROR: /src folder NOT found!" -ForegroundColor Red
    $allGood = $false
}

# Check src/App.tsx
if (Test-Path "src/App.tsx") {
    Write-Host "  ✅ /src/App.tsx exists" -ForegroundColor Green
} else {
    Write-Host "  ❌ ERROR: /src/App.tsx NOT found!" -ForegroundColor Red
    $allGood = $false
}

# Check src/main.tsx
if (Test-Path "src/main.tsx") {
    Write-Host "  ✅ /src/main.tsx exists" -ForegroundColor Green
} else {
    Write-Host "  ❌ ERROR: /src/main.tsx NOT found!" -ForegroundColor Red
    $allGood = $false
}

# Check src/components
if (Test-Path "src/components") {
    Write-Host "  ✅ /src/components folder exists" -ForegroundColor Green
} else {
    Write-Host "  ❌ ERROR: /src/components NOT found!" -ForegroundColor Red
    $allGood = $false
}

# Check src/lib (Supabase)
if (Test-Path "src/lib") {
    Write-Host "  ✅ /src/lib folder exists (Supabase integration)" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  WARNING: /src/lib NOT found (OK if not using backend yet)" -ForegroundColor Yellow
}

# Check src/styles
if (Test-Path "src/styles") {
    Write-Host "  ✅ /src/styles folder exists" -ForegroundColor Green
} else {
    Write-Host "  ❌ ERROR: /src/styles NOT found!" -ForegroundColor Red
    $allGood = $false
}

# Check important config files
if (Test-Path "package.json") {
    Write-Host "  ✅ package.json exists" -ForegroundColor Green
} else {
    Write-Host "  ❌ ERROR: package.json NOT found!" -ForegroundColor Red
    $allGood = $false
}

if (Test-Path "vite.config.ts") {
    Write-Host "  ✅ vite.config.ts exists" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  WARNING: vite.config.ts NOT found" -ForegroundColor Yellow
}

if (Test-Path "tsconfig.json") {
    Write-Host "  ✅ tsconfig.json exists" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  WARNING: tsconfig.json NOT found" -ForegroundColor Yellow
}

# Check Supabase backend
if (Test-Path "supabase/functions/server") {
    Write-Host "  ✅ Supabase backend exists" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  No Supabase backend (OK if not using)" -ForegroundColor Yellow
}

Write-Host ""

# ============================================================================
# STEP 7: Check .env file
# ============================================================================

Write-Host "🔐 STEP 7: Checking environment variables..." -ForegroundColor Yellow
Write-Host ""

if (Test-Path ".env") {
    Write-Host "  ✅ .env file exists" -ForegroundColor Green
    
    $envContent = Get-Content ".env" -Raw -ErrorAction SilentlyContinue
    
    if ($envContent -match "VITE_SUPABASE_URL" -and $envContent -match "VITE_SUPABASE_ANON_KEY") {
        Write-Host "  ✅ Supabase keys are configured" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  WARNING: Supabase keys may not be configured" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "  Your .env file should contain:" -ForegroundColor White
        Write-Host "  VITE_SUPABASE_URL=your_url_here" -ForegroundColor White
        Write-Host "  VITE_SUPABASE_ANON_KEY=your_key_here" -ForegroundColor White
    }
} else {
    Write-Host "  ⚠️  .env file NOT found" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  You need to create a .env file with:" -ForegroundColor White
    Write-Host "  VITE_SUPABASE_URL=your_url_here" -ForegroundColor White
    Write-Host "  VITE_SUPABASE_ANON_KEY=your_key_here" -ForegroundColor White
    Write-Host ""
    Write-Host "  Get these values from: https://supabase.com" -ForegroundColor Cyan
}

Write-Host ""

# ============================================================================
# FINAL SUMMARY
# ============================================================================

Write-Host "╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                                               ║" -ForegroundColor Green
Write-Host "║                    ✅ CLEANUP COMPLETE!                      ║" -ForegroundColor Green
Write-Host "║                                                               ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

if ($allGood) {
    Write-Host "✅ Your project structure is PERFECT!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 NEXT STEPS:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  1. If you haven't setup Supabase yet:" -ForegroundColor White
    Write-Host "     → Follow Step 3 in WINDOWS-DEPLOY.md" -ForegroundColor White
    Write-Host ""
    Write-Host "  2. Build your app:" -ForegroundColor White
    Write-Host "     npm install" -ForegroundColor Yellow
    Write-Host "     npm run build" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  3. Deploy to Azure:" -ForegroundColor White
    Write-Host "     → Follow Step 5 in WINDOWS-DEPLOY.md" -ForegroundColor White
    Write-Host ""
    Write-Host "📖 Full guide: Open WINDOWS-DEPLOY.md" -ForegroundColor Cyan
} else {
    Write-Host "⚠️  Some issues were found!" -ForegroundColor Yellow
    Write-Host "     Check the errors above and fix them." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "     Then run this script again." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
