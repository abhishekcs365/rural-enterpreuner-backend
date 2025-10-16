#!/bin/bash

# ============================================================================
# TERMUX CLEANUP SCRIPT - Rural Entrepreneur Hub
# ============================================================================
# This script fixes your file structure for deployment
# Run this in Termux from your project root folder
# ============================================================================

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║           🧹 CLEANUP & FIX - Rural Entrepreneur Hub          ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# ============================================================================
# STEP 1: Move components to /src if needed
# ============================================================================

echo "📂 STEP 1: Fixing component structure..."
echo ""

if [ -d "components" ]; then
    if [ ! -d "src/components" ]; then
        echo "  📦 Moving /components to /src/components"
        mv components src/components
        echo "  ✅ Moved!"
    else
        echo "  ❌ Removing duplicate /components folder"
        rm -rf components
        echo "  ✅ Removed!"
    fi
else
    if [ -d "src/components" ]; then
        echo "  ✅ Components already in correct location (/src/components)"
    else
        echo "  ⚠️  WARNING: No components folder found!"
    fi
fi

echo ""

# ============================================================================
# STEP 2: Move lib to /src if needed
# ============================================================================

echo "📚 STEP 2: Fixing lib structure..."
echo ""

if [ -d "lib" ]; then
    if [ ! -d "src/lib" ]; then
        echo "  📦 Moving /lib to /src/lib"
        mv lib src/lib
        echo "  ✅ Moved!"
    else
        echo "  ❌ Removing duplicate /lib folder"
        rm -rf lib
        echo "  ✅ Removed!"
    fi
fi

echo ""

# ============================================================================
# STEP 3: Move utils to /src if needed
# ============================================================================

echo "🛠️  STEP 3: Fixing utils structure..."
echo ""

if [ -d "utils" ]; then
    if [ ! -d "src/utils" ]; then
        echo "  📦 Moving /utils to /src/utils"
        mv utils src/utils
        echo "  ✅ Moved!"
    else
        echo "  ❌ Removing duplicate /utils folder"
        rm -rf utils
        echo "  ✅ Removed!"
    fi
fi

echo ""

# ============================================================================
# STEP 4: Remove duplicate App.tsx in root
# ============================================================================

echo "📄 STEP 4: Removing duplicate App.tsx..."
echo ""

if [ -f "App.tsx" ]; then
    echo "  ❌ Removing duplicate /App.tsx (keeping /src/App.tsx)"
    rm -f App.tsx
    echo "  ✅ Removed!"
else
    echo "  ✅ No duplicate App.tsx found"
fi

echo ""

# ============================================================================
# STEP 5: Remove duplicate styles folder
# ============================================================================

echo "🎨 STEP 5: Removing duplicate styles..."
echo ""

if [ -d "styles" ]; then
    echo "  ❌ Removing duplicate /styles folder (keeping /src/styles)"
    rm -rf styles
    echo "  ✅ Removed!"
else
    echo "  ✅ No duplicate styles folder found"
fi

echo ""

# ============================================================================
# STEP 6: Verify structure
# ============================================================================

echo "✅ STEP 6: Verifying project structure..."
echo ""

all_good=true

# Check src folder
if [ -d "src" ]; then
    echo "  ✅ /src folder exists"
else
    echo "  ❌ ERROR: /src folder NOT found!"
    all_good=false
fi

# Check src/App.tsx
if [ -f "src/App.tsx" ]; then
    echo "  ✅ /src/App.tsx exists"
else
    echo "  ❌ ERROR: /src/App.tsx NOT found!"
    all_good=false
fi

# Check src/main.tsx
if [ -f "src/main.tsx" ]; then
    echo "  ✅ /src/main.tsx exists"
else
    echo "  ❌ ERROR: /src/main.tsx NOT found!"
    all_good=false
fi

# Check src/components
if [ -d "src/components" ]; then
    echo "  ✅ /src/components folder exists"
else
    echo "  ❌ ERROR: /src/components NOT found!"
    all_good=false
fi

# Check src/lib (Supabase)
if [ -d "src/lib" ]; then
    echo "  ✅ /src/lib folder exists (Supabase integration)"
else
    echo "  ⚠️  WARNING: /src/lib NOT found (OK if not using backend yet)"
fi

# Check src/styles
if [ -d "src/styles" ]; then
    echo "  ✅ /src/styles folder exists"
else
    echo "  ❌ ERROR: /src/styles NOT found!"
    all_good=false
fi

# Check package.json
if [ -f "package.json" ]; then
    echo "  ✅ package.json exists"
else
    echo "  ❌ ERROR: package.json NOT found!"
    all_good=false
fi

# Check vite.config.ts
if [ -f "vite.config.ts" ]; then
    echo "  ✅ vite.config.ts exists"
else
    echo "  ⚠️  WARNING: vite.config.ts NOT found"
fi

echo ""

# ============================================================================
# STEP 7: Check .env file
# ============================================================================

echo "🔐 STEP 7: Checking environment variables..."
echo ""

if [ -f ".env" ]; then
    echo "  ✅ .env file exists"
    
    if grep -q "VITE_SUPABASE_URL" .env && grep -q "VITE_SUPABASE_ANON_KEY" .env; then
        echo "  ✅ Supabase keys are configured"
    else
        echo "  ⚠️  WARNING: Supabase keys may not be configured"
        echo ""
        echo "  Your .env file should contain:"
        echo "  VITE_SUPABASE_URL=your_url_here"
        echo "  VITE_SUPABASE_ANON_KEY=your_key_here"
    fi
else
    echo "  ⚠️  .env file NOT found"
    echo ""
    echo "  You need to create a .env file with:"
    echo "  VITE_SUPABASE_URL=your_url_here"
    echo "  VITE_SUPABASE_ANON_KEY=your_key_here"
    echo ""
    echo "  Get these values from: https://supabase.com"
fi

echo ""

# ============================================================================
# FINAL SUMMARY
# ============================================================================

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║                    ✅ CLEANUP COMPLETE!                      ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

if [ "$all_good" = true ]; then
    echo "✅ Your project structure is PERFECT!"
    echo ""
    echo "📋 NEXT STEPS:"
    echo ""
    echo "  1. If you haven't setup Supabase yet:"
    echo "     → Follow Step 4 in TERMUX-DEPLOY.md"
    echo ""
    echo "  2. Build your app:"
    echo "     npm install"
    echo "     npm run build"
    echo ""
    echo "  3. Deploy to Vercel:"
    echo "     npm install -g vercel"
    echo "     vercel login"
    echo "     vercel"
    echo ""
    echo "📖 Full guide: Open TERMUX-DEPLOY.md"
else
    echo "⚠️  Some issues were found!"
    echo "     Check the errors above and fix them."
    echo ""
    echo "     Then run this script again:"
    echo "     bash cleanup.sh"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
