# Cloudflare Integration Setup

## Environment Variables

Add the following to your `.env.local` file:

```bash
# Cloudflare API Configuration
CLOUDFLARE_API_TOKEN=r0KpmWH5y33ShTiNHGRcUPDd03_7azoV_js9y-x8
CLOUDFLARE_ZONE_ID=your_vulk_host_zone_id_here

# Health Check Configuration
HEALTH_CHECK_INTERVAL=30000
HEALTH_CHECK_TIMEOUT=10000
```

## Zone ID Setup

To find your Cloudflare Zone ID for `vulk.host`:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your `vulk.host` domain
3. Copy the Zone ID from the right sidebar
4. Add it to your `.env.local` file

**Note:** If you don't provide `CLOUDFLARE_ZONE_ID`, the system will automatically find the zone for `vulk.host` using the API.

## How It Works

1. **Deploy to Fly.io**: When a user clicks "Deploy to vulk.host", the system:
   - Creates a unique app name (e.g., `vulk-app-abc123`)
   - Generates a subdomain (e.g., `vulk-app-abc123-xyz789`)
   - Creates a CNAME record in Cloudflare pointing to `vulk-app-abc123.fly.dev`
   - Returns the final URL: `https://vulk-app-abc123-xyz789.vulk.host`

2. **Automatic DNS Management**: The Cloudflare API automatically:
   - Creates CNAME records for each deployment
   - Enables Cloudflare proxy for better performance
   - Provides SSL certificates automatically
   - Offers global CDN and DDoS protection

3. **Health Monitoring**: Each deployment is monitored with:
   - Automatic health checks every 30 seconds
   - Response time monitoring
   - Error detection and reporting
   - Cleanup of old deployments after 24 hours

## API Endpoints

- `GET /api/deployment/status` - Get deployment status
- `POST /api/deployment/status` - Manage deployments
- `POST /api/flyio/deploy` - Deploy to vulk.host

## Security Features

- ✅ HTTPS enforced
- ✅ Cloudflare proxy enabled
- ✅ DDoS protection
- ✅ Global CDN
- ✅ Automatic SSL certificates
- ✅ Isolated deployments
- ✅ Health monitoring
