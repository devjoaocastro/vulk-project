/**
 * Test Docker Template System
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');

const execAsync = promisify(exec);

// Simple test component
const testComponent = `'use client';

import React, { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface User {
  name: string;
  avatar: string;
}

interface Post {
  id: string;
  user: User;
  image: string;
  caption: string;
  likes: number;
  comments: number;
}

const SocialMediaFeed = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: { name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      caption: 'Beautiful sunset today! 🌅',
      likes: 42,
      comments: 8
    },
    {
      id: '2',
      user: { name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face' },
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      caption: 'Amazing mountain view! 🏔️',
      likes: 67,
      comments: 12
    }
  ]);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Social Media Feed
        </h1>
        
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="flex items-center p-4">
                <img 
                  src={post.user.avatar} 
                  alt={post.user.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              
              {/* Image */}
              <img 
                src={post.image} 
                alt={post.caption}
                className="w-full h-64 object-cover"
              />
              
              {/* Actions */}
              <div className="flex items-center p-4 space-x-4">
                <button 
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span>{post.likes}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              
              {/* Caption */}
              <div className="px-4 pb-4">
                <p className="text-gray-800">
                  <span className="font-semibold mr-2">{post.user.name}</span>
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaFeed;`;

async function testDockerTemplate() {
  console.log('🚀 Testing Docker Template System...');
  
  const tempDir = `/tmp/vulk-docker-test-${Date.now()}`;
  const appName = `vulk-test-${Date.now()}`;
  
  try {
    // Create project structure
    console.log('📁 Creating project structure...');
    await fs.mkdir(tempDir, { recursive: true });
    await fs.mkdir(path.join(tempDir, 'src', 'app'), { recursive: true });
    await fs.mkdir(path.join(tempDir, 'src', 'components'), { recursive: true });
    await fs.mkdir(path.join(tempDir, 'src', 'lib'), { recursive: true });
    await fs.mkdir(path.join(tempDir, 'src', 'app', 'api', 'health'), { recursive: true });

    // Create package.json
    const packageJson = {
      name: appName,
      version: "1.0.0",
      private: true,
      scripts: {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "next lint"
      },
      dependencies: {
        "next": "^14.0.0",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "lucide-react": "^0.263.1",
        "clsx": "^2.0.0",
        "tailwind-merge": "^1.14.0"
      },
      devDependencies: {
        "@types/node": "^20.0.0",
        "@types/react": "^18.2.0",
        "@types/react-dom": "^18.2.0",
        "typescript": "^5.0.0",
        "tailwindcss": "^3.3.0",
        "autoprefixer": "^10.4.14",
        "postcss": "^8.4.24",
        "eslint": "^8.0.0",
        "eslint-config-next": "^14.0.0"
      }
    };

    await fs.writeFile(
      path.join(tempDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    // Create Next.js config
    const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost', 'images.unsplash.com'],
  },
}

module.exports = nextConfig`;

    await fs.writeFile(path.join(tempDir, 'next.config.js'), nextConfig);

    // Create Tailwind config
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}`;

    await fs.writeFile(path.join(tempDir, 'tailwind.config.js'), tailwindConfig);

    // Create PostCSS config
    const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

    await fs.writeFile(path.join(tempDir, 'postcss.config.js'), postcssConfig);

    // Create TypeScript config
    const tsConfig = `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`;

    await fs.writeFile(path.join(tempDir, 'tsconfig.json'), tsConfig);

    // Create layout.tsx
    const layoutTsx = `import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VULK Test App',
  description: 'Generated by VULK - AI-Powered UI Generator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`;

    await fs.writeFile(path.join(tempDir, 'src', 'app', 'layout.tsx'), layoutTsx);

    // Create page.tsx
    const pageTsx = `import SocialMediaFeed from '@/components/SocialMediaFeed'

export default function Home() {
  return <SocialMediaFeed />
}`;

    await fs.writeFile(path.join(tempDir, 'src', 'app', 'page.tsx'), pageTsx);

    // Write the main component
    await fs.writeFile(path.join(tempDir, 'src', 'components', 'SocialMediaFeed.tsx'), testComponent);

    // Create globals.css
    const globalsCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}`;

    await fs.writeFile(path.join(tempDir, 'src', 'app', 'globals.css'), globalsCss);

    // Create utils.ts
    const utilsTs = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;

    await fs.writeFile(path.join(tempDir, 'src', 'lib', 'utils.ts'), utilsTs);

    // Create health check API route
    const healthRoute = `export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'VULK Generated App',
    template: 'nextjs-optimized',
    version: '14.0.0'
  })
}`;

    await fs.writeFile(path.join(tempDir, 'src', 'app', 'api', 'health', 'route.ts'), healthRoute);

    // Create Dockerfile
    const dockerfile = `FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js app
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]`;

    await fs.writeFile(path.join(tempDir, 'Dockerfile'), dockerfile);

    // Create fly.toml
    const flyToml = `app = "${appName}"
primary_region = "lhr"

[build]

[env]
  NODE_ENV = "production"
  NEXT_TELEMETRY_DISABLED = "1"

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
    path = "/api/health"

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 512`;

    await fs.writeFile(path.join(tempDir, 'fly.toml'), flyToml);

    console.log('✅ Project structure created successfully!');
    console.log(`📁 Project location: ${tempDir}`);
    console.log(`🚀 App name: ${appName}`);
    
    // Test deployment
    console.log('🚀 Testing deployment...');
    
    // Create app
    try {
      await execAsync(`cd ${tempDir} && flyctl apps create ${appName} --generate-name`, {
        env: { ...process.env, FLY_API_TOKEN: process.env.FLY_API_TOKEN }
      });
      console.log('✅ App created successfully!');
    } catch (error) {
      console.log('⚠️ App might already exist, continuing...');
    }

    // Deploy
    console.log('🚀 Deploying to Fly.io...');
    const { stdout, stderr } = await execAsync(`cd ${tempDir} && flyctl deploy --local-only`, {
      env: { ...process.env, FLY_API_TOKEN: process.env.FLY_API_TOKEN }
    });

    console.log('✅ Deployment completed!');
    console.log('📋 Deployment logs:', stdout);

    // Get app URL
    const { stdout: urlOutput } = await execAsync(`cd ${tempDir} && flyctl info`, {
      env: { ...process.env, FLY_API_TOKEN: process.env.FLY_API_TOKEN }
    });

    const urlMatch = urlOutput.match(/https:\/\/[a-zA-Z0-9-]+\.fly\.dev/);
    const appUrl = urlMatch ? urlMatch[0] : `https://${appName}.fly.dev`;

    console.log(`🌐 App URL: ${appUrl}`);

    // Cleanup
    await fs.rm(tempDir, { recursive: true, force: true });
    console.log('🧹 Cleanup completed!');

    return {
      success: true,
      url: appUrl,
      appName: appName
    };

  } catch (error) {
    console.error('❌ Test failed:', error);
    
    // Cleanup on error
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch (cleanupError) {
      console.warn('Failed to cleanup:', cleanupError);
    }
    
    return {
      success: false,
      error: error.message
    };
  }
}

// Run the test
testDockerTemplate()
  .then(result => {
    console.log('🎯 Test result:', result);
    process.exit(result.success ? 0 : 1);
  })
  .catch(error => {
    console.error('💥 Test crashed:', error);
    process.exit(1);
  });
