# Vercel Deployment Guide for VULK

## Why Vercel Instead of Fly.io?

Vercel is the **recommended platform** for Next.js applications because:

✅ **Perfect Next.js Integration**: Built by the Next.js team  
✅ **Zero Configuration**: Automatic builds and deployments  
✅ **Excellent Performance**: Global CDN and edge functions  
✅ **Free Tier**: Generous limits for development and small projects  
✅ **Easy Setup**: Connect GitHub and deploy in minutes  
✅ **Preview Deployments**: Every PR gets its own URL  
✅ **Reliable**: 99.99% uptime, used by major companies  

## Quick Setup (5 minutes)

### 1. Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub (recommended)
- Verify your email

### 2. Connect Your Repository
- Click "New Project" in Vercel dashboard
- Import your VULK repository from GitHub
- Vercel will auto-detect it's a Next.js project

### 3. Configure Environment Variables
In your Vercel project settings, add these environment variables:

```bash
# OpenRouter API
OPENROUTER_API_KEY=sk-or-v1-your-key-here

# NextAuth.js
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=your-secret-here

# OAuth (optional)
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-secret
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-secret

# Database (if using)
DATABASE_URL=your-database-url
```

### 4. Deploy
- Click "Deploy" 
- Wait 2-3 minutes for build
- Get your live URL: `https://your-project.vercel.app`

## Advanced Configuration

### Custom Domain
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate is automatic

### Environment Variables by Environment
- **Production**: Set in Vercel dashboard
- **Preview**: Same as production (or override)
- **Development**: Use `.env.local`

### Build Settings
Vercel auto-detects Next.js, but you can customize:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

## Monitoring Your Deployments

### View All Projects
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. See all your deployed projects
3. Click any project for details

### Project URLs
- **Production**: `https://your-project.vercel.app`
- **Preview**: `https://your-project-git-branch.vercel.app`
- **Latest**: `https://your-project-git-main.vercel.app`

### Analytics
- View page views, performance metrics
- Real-time visitor data
- Core Web Vitals scores

## Troubleshooting

### Build Failures
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify environment variables are set

### Environment Variables Not Working
1. Go to Project Settings → Environment Variables
2. Make sure they're set for the right environment
3. Redeploy after adding new variables

### Custom Domain Issues
1. Check DNS propagation (can take 24-48 hours)
2. Verify CNAME/A records are correct
3. Wait for SSL certificate (automatic)

## Cost Comparison

| Feature | Vercel Free | Fly.io Free |
|---------|-------------|-------------|
| Bandwidth | 100GB/month | 160GB/month |
| Build Time | 6,000 minutes | 2,340 hours |
| Functions | 100GB-hours | 160GB-hours |
| Domains | Unlimited | 3 apps |
| **Reliability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## Migration from Fly.io

If you have existing Fly.io apps:

1. **Export your code** from Fly.io
2. **Create new Vercel project**
3. **Import your code** to Vercel
4. **Update DNS** to point to Vercel
5. **Test thoroughly** before switching

## Best Practices

### Performance
- Use Vercel's Image Optimization
- Enable Edge Functions for global performance
- Use ISR (Incremental Static Regeneration)

### Security
- Set up proper CORS headers
- Use Vercel's built-in DDoS protection
- Enable Vercel Analytics for monitoring

### Development
- Use Preview Deployments for testing
- Set up branch protection rules
- Use Vercel CLI for local development

## CLI Usage

Install Vercel CLI:
```bash
npm i -g vercel
```

Deploy from command line:
```bash
vercel --prod
```

Link existing project:
```bash
vercel link
```

## Support

- **Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Support**: Available in Vercel dashboard

---

**Vercel is the gold standard for Next.js deployments. It's what the Next.js team uses for their own projects!**
