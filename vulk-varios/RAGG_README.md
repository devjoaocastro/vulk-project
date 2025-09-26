# 🚀 VULK® RAGG System

**Retrieval-Augmented Generation with Governance** - Transform any website into beautiful, reusable code templates.

## 🎯 What is RAGG?

RAGG (Retrieval-Augmented Generation with Governance) is VULK®'s advanced system that:

1. **Indexes real websites** (Airbnb, Stripe, Notion, etc.)
2. **Extracts visual styles** (glassmorphism, neon, 3D effects)
3. **Generates code** with those exact styles
4. **Governs quality** through curated templates

## ✨ Features

- 🔍 **Smart Website Indexing** - Automatically extract styles from any website
- 🎨 **Visual Style Detection** - Glassmorphism, neon, 3D, gradients, animations
- 🧩 **Component Extraction** - Buttons, cards, heroes, modals, navigation
- 🚀 **Code Generation** - React, Vue, Svelte with TailwindCSS, Bootstrap, etc.
- 🔄 **Real-time Search** - Find similar styles instantly
- 📊 **Vector Database** - Semantic search for perfect matches

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Add your tokens
HF_TOKEN=your_huggingface_token
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```

## 🚀 Quick Start

### 1. Index Popular Websites

```bash
# Index all popular websites automatically
npm run index-popular

# Or index a specific website
npx vulk-index https://airbnb.com --tags="booking,neon,glassmorphism"
```

### 2. Search Templates

```bash
# Search for similar styles
npx vulk-index search "booking app with neon effects"

# List all indexed sites
npx vulk-index list --tags="glassmorphism"
```

### 3. Generate Code

```bash
# Generate code with visual styles
npx vulk-index generate "Create a booking app like Airbnb" --style="glassmorphism" --framework="React"
```

### 4. Use in Your App

```typescript
// API endpoint
const response = await fetch('/api/ragg/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Create a booking app like Airbnb',
    style: 'glassmorphism',
    framework: 'React',
    uiLibrary: 'TailwindCSS'
  })
});

const result = await response.json();
// result.code contains your generated code
```

## 📁 Project Structure

```
src/lib/ragg/
├── site-indexer.ts          # Website indexing with Puppeteer
├── code-generator.ts        # Code generation with visual styles
└── vector-search.ts         # Semantic search functionality

scripts/
├── index-sites.js           # CLI for indexing websites
├── index-popular-sites.js   # Batch index popular websites
└── generate-code.js         # Generate code from templates

config/
└── popular-sites.json       # List of websites to index

prisma/
└── schema-ragg.prisma       # Database schema for templates
```

## 🎨 Supported Visual Styles

### Glassmorphism
```css
.glassmorphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Neon Effects
```css
.neon {
  background: linear-gradient(45deg, #00f5ff, #0099ff);
  box-shadow: 0 0 20px rgba(0, 245, 255, 0.5);
}
```

### 3D Effects
```css
.transform-3d {
  transform-style: preserve-3d;
  transform: rotateY(12deg) rotateX(5deg);
}
```

### Gradients
```css
.gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 🔧 Configuration

### Popular Websites to Index

Edit `config/popular-sites.json`:

```json
[
  {
    "url": "https://airbnb.com",
    "title": "Airbnb",
    "tags": ["booking", "glassmorphism", "neon"],
    "priority": "high"
  }
]
```

### Vector Database Setup

```sql
-- Enable vector extension in Supabase
CREATE EXTENSION IF NOT EXISTS vector;

-- Create site_templates table
CREATE TABLE site_templates (
  id TEXT PRIMARY KEY,
  url TEXT UNIQUE,
  title TEXT,
  tags TEXT[],
  components JSONB,
  css TEXT,
  js TEXT,
  screenshots TEXT[],
  metadata JSONB,
  embedding vector(384),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🎯 Usage Examples

### Generate a Booking App

```bash
npx vulk-index generate "Create a booking app like Airbnb with glassmorphism effects" \
  --style="glassmorphism" \
  --framework="React" \
  --ui-library="TailwindCSS"
```

### Generate a Payment Form

```bash
npx vulk-index generate "Create a payment form like Stripe with neon effects" \
  --style="neon" \
  --framework="React" \
  --ui-library="TailwindCSS"
```

### Generate a Dashboard

```bash
npx vulk-index generate "Create a dashboard like Notion with minimal design" \
  --style="minimal" \
  --framework="React" \
  --ui-library="TailwindCSS"
```

## 🔍 API Reference

### POST /api/ragg/generate

Generate code with visual styles.

**Request:**
```json
{
  "prompt": "Create a booking app like Airbnb",
  "style": "glassmorphism",
  "framework": "React",
  "uiLibrary": "TailwindCSS",
  "useRAGG": true
}
```

**Response:**
```json
{
  "success": true,
  "code": {
    "main": "// Generated React component",
    "components": [...],
    "styles": [...],
    "animations": [...]
  },
  "templates": [...]
}
```

### GET /api/ragg/generate?q=query

Search for similar templates.

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "id": "airbnb-2025",
      "title": "Airbnb",
      "url": "https://airbnb.com",
      "tags": ["booking", "glassmorphism"],
      "similarity": 0.95
    }
  ]
}
```

## 🚀 Advanced Features

### Custom Style Detection

```typescript
// Detect custom styles
const customStyles = await indexer.detectCustomStyles(url, {
  glassmorphism: true,
  neon: true,
  animations: true
});
```

### Batch Processing

```bash
# Index multiple sites
npx vulk-index batch --file=sites.json --concurrent=5
```

### Real-time Updates

```typescript
// Watch for changes
const watcher = chokidar.watch('./templates');
watcher.on('change', async (path) => {
  await indexer.reindexSite(path);
});
```

## 🎨 Demo Component

Use the `RAGGDemo` component to test the system:

```tsx
import RAGGDemo from '@/components/RAGGDemo';

export default function DemoPage() {
  return <RAGGDemo />;
}
```

## 🔧 Troubleshooting

### Common Issues

1. **Puppeteer fails to launch**
   ```bash
   # Install dependencies
   sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
   ```

2. **Vector search not working**
   ```bash
   # Check Supabase vector extension
   SELECT * FROM pg_extension WHERE extname = 'vector';
   ```

3. **Hugging Face API errors**
   ```bash
   # Check your token
   echo $HF_TOKEN
   ```

## 📊 Performance

- **Indexing Speed**: ~2-3 seconds per website
- **Search Speed**: ~100ms for vector search
- **Generation Speed**: ~5-10 seconds for code generation
- **Memory Usage**: ~200MB for indexing process

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your improvements
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

- 📧 Email: support@vulk.dev
- 💬 Discord: [VULK® Community](https://discord.gg/vulk)
- 📖 Docs: [docs.vulk.dev](https://docs.vulk.dev)

---

**Built with ❤️ by the VULK® Team**

*"VULK® não simula desenvolvimento. Ele realiza."*
