Windows preview and deploy notes

1. Install dependencies:

```powershell
npm install
```

2. Build for production:

```powershell
npm run build
```

3. Preview the `build` folder locally (uses `serve`):

```powershell
npx serve build -s -l 5000
Start-Sleep -s 1
Invoke-WebRequest -Uri http://localhost:5000 -UseBasicParsing
```

4. Deploy with Netlify or Vercel (CLIs):

Netlify:

```powershell
npm i -g netlify-cli
netlify deploy --prod --dir=build
```

Vercel:

```powershell
npm i -g vercel
vercel --prod
```
# 🪟 WINDOWS DEPLOYMENT GUIDE - Frontend + Backend

## ✅ STEP-BY-STEP FOR WINDOWS

**Total Time:** 20 minutes  
**Cost:** $0/month  
**No GitHub Required!**

---

## 📋 **STEP 1: Clean Up Your Project** (3 minutes)

### A. Open PowerShell in your project folder
1. Open your project folder in File Explorer
2. Hold `Shift` + Right-click in empty space
3. Click "Open PowerShell window here"

### B. Run the cleanup script

**Copy this ENTIRE command and paste into PowerShell:**

```powershell
# Move components to src if not already there
if (Test-Path "components") {
    if (Test-Path "src/components") {
        Remove-Item -Recurse -Force "components"
        Write-Host "✅ Removed duplicate /components" -ForegroundColor Green
    } else {
        Move-Item "components" "src/components"
        Write-Host "✅ Moved components to /src/components" -ForegroundColor Green
    }
}

# Remove duplicate App.tsx in root
if (Test-Path "App.tsx") {
    Remove-Item -Force "App.tsx"
    Write-Host "✅ Removed duplicate /App.tsx" -ForegroundColor Green
}

# Remove duplicate styles in root
if (Test-Path "styles") {
    Remove-Item -Recurse -Force "styles"
    Write-Host "✅ Removed duplicate /styles" -ForegroundColor Green
}

# Remove all unnecessary documentation files
$docsToRemove = @(
    "AZURE-DEPLOY.md", "AZURE-DIRECT-DEPLOY.md", "AZURE-NO-GITHUB.txt", "AZURE-QUICK.md",
    "COMPLETE-GUIDE.md", "COMPLETE-SOLUTION.md", "DEPENDENCIES.md", "DEPLOY-CARD.txt",
    "DEPLOY-NOW-SIMPLE.md", "DEPLOY-NOW.md", "DEPLOY-SIMPLE.md", "DEPLOYMENT-FILES.md",
    "DEPLOYMENT.md", "EXPORT-QUICK-REFERENCE.md", "EXPORT-SUMMARY.md", 
    "FILE-STRUCTURE-CHECKLIST.md", "FINAL-SUMMARY.md", "FIX-AND-DEPLOY.md",
    "FIX-STRUCTURE.md", "GITHUB-COMMANDS.md", "GITHUB-EXPORT-GUIDE.md",
    "IMPORT-PATH-UPDATES.md", "INDEX.md", "QUICK-DEPLOY.md", "QUICK-START-CARD.txt",
    "QUICKSTART.md", "READ-ME-FIRST.md", "README-FINAL.md", "SIMPLE-AZURE-DEPLOY.md",
    "SIMPLE-DEPLOY.txt", "START-HERE-NOW.md", "START-HERE.md", "__-DEPLOY-AZURE-NOW.md",
    "cleanup-and-deploy.ps1", "cleanup-and-deploy.sh", "build-for-azure.ps1",
    "build-for-azure.sh", "deploy-setup.ps1", "deploy-setup.sh", "reorganize.ps1",
    "reorganize.sh", "⚡-DEPLOY-NOW.md", "🎯-READ-THIS-FIRST.md", "🚀-START-HERE.md",
    "netlify.toml", "vercel.json"
)

foreach ($doc in $docsToRemove) {
    if (Test-Path $doc) {
        Remove-Item -Force $doc -ErrorAction SilentlyContinue
        Write-Host "✅ Removed $doc" -ForegroundColor Yellow
    }
}

Write-Host "`n✅ CLEANUP COMPLETE!" -ForegroundColor Green
Write-Host "`nYour project structure is now clean and ready!" -ForegroundColor Cyan
```

**Press Enter to run it!**

---

## 🗂️ **STEP 2: Verify Your Structure** (1 minute)

Run this command to check:

```powershell
Get-ChildItem src
```

**You should see:**
- ✅ `App.tsx`
- ✅ `main.tsx`
- ✅ `components` (folder)
- ✅ `lib` (folder)
- ✅ `styles` (folder)

**If you see these, you're good!** ✅

---

## 🔐 **STEP 3: Setup Supabase Backend** (7 minutes)

### A. Create Supabase Account
1. Open browser: **https://supabase.com**
2. Click **"Start your project"**
3. Sign up with email or Google (FREE - no credit card!)

### B. Create New Project
1. Click **"New Project"**
2. **Name:** `rural-entrepreneur-hub`
3. **Database Password:** Create a strong password
   - **⚠️ SAVE THIS PASSWORD!** Write it down!
4. **Region:** Choose **Mumbai** (or closest to India)
5. Click **"Create new project"**
6. ⏳ **Wait 2-3 minutes** (get coffee ☕)

### C. Setup Database Tables
1. In Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New Query"** button
3. **Open your file:** `supabase-setup.sql` (in your project folder)
4. **Copy EVERYTHING** from that file (Ctrl+A, then Ctrl+C)
5. **Paste** into Supabase SQL Editor
6. Click **"RUN"** button (or press Ctrl+Enter)
7. ✅ You should see: **"Success. No rows returned"**

### D. Get Your API Keys
1. In Supabase, click **"Settings"** icon (⚙️ gear at bottom left)
2. Click **"API"** in the menu
3. You'll see two important things:

**Copy these TWO values:**
- **Project URL** (looks like: `https://abc123xyz.supabase.co`)
- **anon public** key (long string starting with `eyJ...`)

### E. Create .env File

**In PowerShell, run this command:**

```powershell
@"
VITE_SUPABASE_URL=PASTE_YOUR_PROJECT_URL_HERE
VITE_SUPABASE_ANON_KEY=PASTE_YOUR_ANON_KEY_HERE
"@ | Out-File -FilePath ".env" -Encoding utf8
```

**Then open `.env` file and replace the values:**
1. Open `.env` file with Notepad
2. Replace `PASTE_YOUR_PROJECT_URL_HERE` with your actual Supabase URL
3. Replace `PASTE_YOUR_ANON_KEY_HERE` with your actual anon key
4. **Save the file!**

**Example of correct .env file:**
```env
VITE_SUPABASE_URL=https://xyzabc123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiYzEyMyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjk5MDAwMDAwLCJleHAiOjE4NTY4NTYwMDB9.abcdefghijklmnopqrstuvwxyz123456789
```

**✅ Backend is ready!**

---

## 🏗️ **STEP 4: Build Your App** (3 minutes)

**Run these commands in PowerShell:**

```powershell
# Install dependencies
npm install

# Build for production
npm run build
```

⏳ Wait 2-3 minutes...

**✅ You should see a `/dist` folder created!**

---

## ☁️ **STEP 5: Deploy to Azure** (8 minutes)

### A. Create Azure Account
1. Open browser: **https://portal.azure.com**
2. Click **"Start free"** or **"Sign in"**
3. Sign up (FREE - they won't charge you!)

### B. Create Static Web App
1. In Azure Portal, click **"+ Create a resource"** (top left, or search bar at top)
2. In the search box, type: **`static web app`**
3. Click **"Static Web App"** from results
4. Click **"Create"** button

**Fill in the form:**

#### Basics Tab:
- **Subscription:** (Select your subscription)
- **Resource Group:** 
  - Click "Create new"
  - Name: `rural-rg`
  - Click OK
- **Static Web App details:**
  - **Name:** `rural-entrepreneur-hub`
  - **Plan type:** Select **"Free"**
  - **Region for Azure Functions:** **Central India** (or East Asia)
  - **Source:** Select **"Other"** ⬅️ **THIS IS IMPORTANT! (No GitHub!)**

5. Click **"Review + create"** (bottom)
6. Click **"Create"** (bottom)
7. ⏳ Wait 1 minute
8. Click **"Go to resource"** button

### C. Add Environment Variables (CRITICAL!)
1. In your Static Web App page, find **"Configuration"** in left menu
2. Click **"Application settings"** tab (at top)
3. Click **"+ Add"** button

**Add first variable:**
- **Name:** `VITE_SUPABASE_URL`
- **Value:** (Paste your Supabase URL from Step 3)
- Click **"OK"**

**Add second variable:**
4. Click **"+ Add"** again
- **Name:** `VITE_SUPABASE_ANON_KEY`
- **Value:** (Paste your Supabase anon key from Step 3)
- Click **"OK"**

5. Click **"Save"** button at the TOP of the page
6. Click **"Yes"** to confirm restart

**✅ Environment variables configured!**

### D. Get Deployment Token
1. Still in your Static Web App, click **"Overview"** (top of left menu)
2. Look for **"Manage deployment token"** button (right side)
3. Click it
4. Click **"Copy"** button
5. **Paste this token in Notepad** - you'll need it in 1 minute!

### E. Install Azure CLI

**In PowerShell, run:**

```powershell
npm install -g @azure/static-web-apps-cli
```

⏳ Wait 1-2 minutes...

**Verify it installed:**
```powershell
swa --version
```

You should see a version number like `1.x.x`

### F. Deploy Your App! 🚀

**IMPORTANT:** Replace `YOUR_TOKEN_HERE` with the token you copied!

```powershell
swa deploy .\dist --deployment-token=YOUR_TOKEN_HERE
```

**Example (yours will have a different token):**
```powershell
swa deploy .\dist --deployment-token=abc123-def456-ghi789-jkl012
```

⏳ Wait 2-3 minutes... You'll see upload progress!

**✅ DEPLOYMENT COMPLETE!**

---

## 🎉 **STEP 6: Test Your App!**

Your app is now LIVE at:

```
https://rural-entrepreneur-hub.azurestaticapps.net
```

**OR find your URL:**
1. Go to Azure Portal
2. Your Static Web App → Overview
3. Look for **"URL"** - that's your live app!

**Test it:**
1. Open the URL in your browser
2. ✅ Select language (Hindi/Marathi/English)
3. ✅ Register a new user
4. ✅ Login with that user
5. ✅ Complete profile
6. ✅ Browse personalized schemes
7. ✅ Try voice assistant
8. ✅ Search for schemes
9. **Everything should work!** 🎊

---

## 🔄 **STEP 7: Update Your App Later**

When you make changes to your code:

```powershell
# Build
npm run build

# Deploy (use same token)
swa deploy .\dist --deployment-token=YOUR_TOKEN
```

**That's it!**

---

## 🆘 **TROUBLESHOOTING**

### Build fails with errors?
```powershell
# Clean everything and rebuild
Remove-Item -Recurse -Force node_modules, dist, package-lock.json -ErrorAction SilentlyContinue
npm install
npm run build
```

### "Cannot find module" errors?
Make sure you ran Step 1 cleanup script!

### App shows blank page?
1. Press **F12** in browser
2. Click **"Console"** tab
3. Look for red errors
4. Check if environment variables are correct in Azure

### Login doesn't work?
1. Verify you ran the SQL script in Supabase
2. Check Supabase → SQL Editor → Run: `SELECT * FROM user_auth LIMIT 1;`
3. Verify environment variables in Azure match your Supabase keys

### Deployment token expired?
1. Azure Portal → Your app → Overview
2. "Manage deployment token" → Copy new token
3. Deploy again with new token

### Can't find Azure CLI?
Close and reopen PowerShell, then try `swa --version` again

---

## 💰 **COST BREAKDOWN**

### Supabase (Backend):
- 500MB database ✅
- 2GB bandwidth/month ✅
- **FREE FOREVER** ✅

### Azure Static Web Apps (Frontend):
- 100GB bandwidth/month ✅
- Custom domains ✅
- **FREE FOREVER** ✅

**Total Cost: $0/month** 🎉

---

## 📱 **WHAT YOU DEPLOYED**

✅ Complete web application  
✅ React + TypeScript frontend  
✅ Supabase PostgreSQL backend  
✅ User authentication & profiles  
✅ 3 languages (Hindi, Marathi, English)  
✅ 20+ government schemes  
✅ Personalized recommendations  
✅ Voice assistant  
✅ PDF translator  
✅ Search functionality  
✅ Mobile responsive  
✅ Production-ready  
✅ Secure HTTPS  

**Worth:** $10,000+ if built by agency  
**Your cost:** $0  
**Your time:** 20 minutes  

---

## 🎯 **QUICK COMMAND REFERENCE**

```powershell
# Cleanup (Step 1) - Run once
# [Paste the long cleanup script from Step 1]

# Build (Step 4) - Every time you change code
npm install
npm run build

# Deploy (Step 5) - Every time you want to update
swa deploy .\dist --deployment-token=YOUR_TOKEN
```

---

## ✅ **CHECKLIST**

- [ ] Ran cleanup script
- [ ] Created Supabase account
- [ ] Created Supabase project
- [ ] Ran SQL setup script
- [ ] Got API keys
- [ ] Created .env file
- [ ] Ran npm install
- [ ] Ran npm run build
- [ ] Created Azure account
- [ ] Created Static Web App (Source: Other)
- [ ] Added environment variables in Azure
- [ ] Got deployment token
- [ ] Installed Azure CLI
- [ ] Deployed with swa deploy
- [ ] Tested live app

**All checked? You're done! 🎉**

---

**Need help? Check the troubleshooting section above!**

**Your app is live and helping rural entrepreneurs! 🌾**
