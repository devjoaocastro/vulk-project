# K0D Investor Pitch Deck - Deploy Instructions

## 🚀 Deploy Options

### Option 1: Vercel (Recommended - Free)
1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Custom Domain (Optional):**
   - Go to Vercel dashboard
   - Add custom domain (e.g., pitch.k0d.pro)

### Option 2: Netlify (Free)
1. **Install Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod --dir=dist
   ```

### Option 3: GitHub Pages (Free)
1. **Push to GitHub repository**
2. **Go to repository Settings > Pages**
3. **Select "GitHub Actions" as source**
4. **Create `.github/workflows/deploy.yml`:**

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🔐 Password Protection
- **Password:** `k0d2025`
- **Access:** Enter password to view the full pitch deck

## 📱 Features
- ✅ **Responsive Design** - Works on all devices
- ✅ **Password Protection** - Secure access
- ✅ **Navigation** - Arrow keys, click, TOC
- ✅ **Professional Design** - Dark theme with glassmorphism
- ✅ **16 Slides** - Complete investor presentation

## 🎯 Content Highlights
- **VULK® Company** - Registered trademark, K0D brand
- **Technology** - Voice-to-code, eye-tracking, AI-powered
- **Market** - $50B+ TAM, 27M+ developers
- **Financials** - €540M revenue by 2029, €8.1B valuation
- **Team** - João Castro (CEO/CTO) + Joana Matos (CEO)
- **Competition** - First-mover advantage, patent portfolio

## 📞 Contact
- **Investors:** investors@k0d.pro
- **João Castro:** joao@k0d.pro
- **Joana Matos:** joana@k0d.pro
- **Website:** k0d.pro

---
**Ready to deploy and impress investors! 🚀**
