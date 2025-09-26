# VULK.HOST DNS Configuration

## Overview
This document describes how to configure the `vulk.host` domain for VULK project deployments.

## DNS Configuration Required

### 1. Main Domain Setup
- **Domain**: `vulk.host`
- **Provider**: Configure with your DNS provider (Cloudflare, Route53, etc.)
- **Wildcard CNAME**: `*.vulk.host` → `your-fly-app.fly.dev`

### 2. Fly.io Configuration
Each VULK project will be deployed with:
- **App Name**: `vulk-app-{timestamp}`
- **Subdomain**: `{project-name}-{unique-id}.vulk.host`
- **Fly.io URL**: `https://vulk-app-{timestamp}.fly.dev`

### 3. DNS Records Needed

#### A. Wildcard CNAME Record
```
Type: CNAME
Name: *.vulk.host
Value: your-main-fly-app.fly.dev
TTL: 300
```

#### B. Main Domain Apex (Optional)
```
Type: A
Name: vulk.host
Value: [Your main server IP]
TTL: 300
```

### 4. Fly.io App Configuration

#### fly.toml Template
```toml
app = "vulk-app-{timestamp}"
primary_region = "lhr"

[build]

[env]
  NODE_ENV = "production"

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
  processes = ["app"]

  [[http_service.checks]]
    grace_period = "10s"
    interval = "30s"
    method = "GET"
    timeout = "5s"
    path = "/"

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 256
```

### 5. SSL Certificate Configuration

#### Automatic SSL with Let's Encrypt
Fly.io automatically handles SSL certificates for:
- `*.vulk.host` (wildcard certificate)
- Individual subdomains

#### Manual SSL Configuration (if needed)
```bash
# Add custom domain to Fly.io app
fly domains add {subdomain}.vulk.host -a {app-name}

# Verify SSL certificate
fly certs show {subdomain}.vulk.host -a {app-name}
```

### 6. Environment Variables

#### Required Environment Variables
```bash
# Fly.io API Token
FLY_API_TOKEN=your-fly-api-token

# VULK Host Configuration
VULK_HOST_DOMAIN=vulk.host
VULK_HOST_WILDCARD=*.vulk.host
VULK_HOST_SSL=true
```

### 7. Deployment Process

#### Step 1: Create Fly.io App
```bash
fly apps create vulk-app-{timestamp}
```

#### Step 2: Configure DNS
```bash
# Add wildcard domain
fly domains add *.vulk.host -a vulk-app-{timestamp}
```

#### Step 3: Deploy Application
```bash
fly deploy -a vulk-app-{timestamp}
```

#### Step 4: Verify Deployment
```bash
# Check app status
fly status -a vulk-app-{timestamp}

# Check domains
fly domains list -a vulk-app-{timestamp}
```

### 8. Security Configuration

#### Headers Configuration
```javascript
// Security headers in Next.js
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
  }
];
```

### 9. Monitoring and Logs

#### Health Checks
- **Endpoint**: `https://{subdomain}.vulk.host/health`
- **Interval**: 30 seconds
- **Timeout**: 5 seconds

#### Logging
```bash
# View app logs
fly logs -a vulk-app-{timestamp}

# Follow logs in real-time
fly logs -a vulk-app-{timestamp} -f
```

### 10. Cost Optimization

#### Auto-scaling Configuration
```toml
[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 256

[http_service]
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
```

#### Resource Limits
- **CPU**: 1 shared CPU
- **Memory**: 256MB
- **Auto-stop**: Enabled when idle
- **Auto-start**: Enabled on request

### 11. Troubleshooting

#### Common Issues

1. **DNS Propagation**
   - Wait 5-15 minutes for DNS changes
   - Use `dig` to verify DNS records

2. **SSL Certificate Issues**
   - Check certificate status: `fly certs show`
   - Renew if needed: `fly certs renew`

3. **App Not Starting**
   - Check logs: `fly logs -a {app-name}`
   - Verify health checks
   - Check resource limits

#### Debug Commands
```bash
# Check app status
fly status -a {app-name}

# Check domains
fly domains list -a {app-name}

# Check certificates
fly certs list -a {app-name}

# SSH into app
fly ssh console -a {app-name}
```

### 12. Production Checklist

- [ ] DNS wildcard CNAME configured
- [ ] SSL certificates valid
- [ ] Health checks passing
- [ ] Auto-scaling enabled
- [ ] Monitoring configured
- [ ] Logs accessible
- [ ] Security headers set
- [ ] Resource limits appropriate

## Implementation Notes

1. **Subdomain Generation**: Each project gets a unique subdomain like `my-project-abc123.vulk.host`
2. **SSL**: Wildcard SSL certificate covers all subdomains
3. **Scaling**: Apps auto-start/stop based on traffic
4. **Security**: Each app is isolated with proper security headers
5. **Monitoring**: Health checks and logging are configured

## Next Steps

1. Configure DNS with your provider
2. Set up Fly.io API access
3. Test deployment process
4. Monitor performance and costs
5. Set up alerting for failures
