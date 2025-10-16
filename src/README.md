# 🌾 Rural Entrepreneur Hub

A multilingual web application for rural entrepreneurs in Maharashtra providing access to government schemes and digital tools.

## 🌟 Features

- **3 Languages**: Hindi, Marathi, English
- **20+ Government Schemes**: Complete information with eligibility criteria
- **User Authentication**: Secure registration and login
- **Personalized Recommendations**: Based on user profile
- **Voice Assistant**: Hands-free navigation
- **Search Functionality**: Find schemes quickly
- **PDF Translator**: Translate documents
- **Mobile Responsive**: Works on all devices

## 🚀 Deployment

### 📱 **FROM ANDROID PHONE (Termux)**

```bash
bash cleanup.sh
npm install && npm run build
npm install -g vercel
vercel
```

**Full guide:** Open `TERMUX-DEPLOY.md` or `TERMUX-QUICKSTART.txt`

### ⚡ **FROM WINDOWS PC (Vercel)**

```powershell
.\DEPLOY-VERCEL-NOW.ps1
vercel
```

**Full guide:** Open `VERCEL-DEPLOY.md` or `DEPLOY-NOW.txt`

### 🔵 **FROM WINDOWS PC (Azure)**

```powershell
.\CLEANUP-NOW.ps1
npm install && npm run build
swa deploy .\dist --deployment-token=YOUR_TOKEN
```

**Full guide:** Open `WINDOWS-DEPLOY.md`

## 🔧 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **Backend**: Supabase (PostgreSQL)
- **Hosting**: Azure Static Web Apps
- **Build Tool**: Vite

## 💰 Cost

**$0/month** - Free tier for everything!

## 📚 Documentation

- `WINDOWS-DEPLOY.md` - Complete deployment guide
- `supabase-setup.sql` - Database schema
- `Attributions.md` - Credits and licenses

## 🆘 Support

For deployment issues, see the troubleshooting section in `WINDOWS-DEPLOY.md`

## 📄 License

MIT

---

**Built to bridge the information gap for rural entrepreneurs in Maharashtra** 🌾
