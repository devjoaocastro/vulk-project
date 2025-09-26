# K0D Pitch Deck — Vite + React + Tailwind (Com Password)

## 🔐 Password de Acesso
- **Password**: `k0d2025`
- Podes alterar no ficheiro `src/Deck.jsx` (linha com `password === 'k0d2025'`)

## 🚀 Como usar

### Desenvolvimento Local
1. Instala dependências:
   ```bash
   npm install
   ```

2. Corre em modo desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abre o browser em: `http://localhost:5173`

### Build de Produção
```bash
npm run build
npm run preview
```

## 🎯 Funcionalidades
- ✅ **Proteção por password** - só quem tem a password acede
- ✅ **15 slides completos** - todo o conteúdo do pitch
- ✅ **Navegação por teclado** - setas ← → ou tecla T para TOC
- ✅ **Design responsivo** - funciona em mobile e desktop
- ✅ **Glass-morphism** - visual moderno e profissional
- ✅ **Hot reload** - mudanças em tempo real durante desenvolvimento

## 📁 Estrutura
- `src/Deck.jsx` — código dos slides (React) + proteção por password
- `src/main.jsx` — ponto de entrada React
- `src/index.css` — estilos Tailwind
- `index.html` — template base
- `tailwind.config.js` — configuração do Tailwind
- `vite.config.js` — configuração do Vite

## 🚀 Deploy

### Netlify (Recomendado)
1. Faz build: `npm run build`
2. Arrasta a pasta `dist` para [netlify.com](https://netlify.com)
3. Deploy automático em segundos!

### Vercel
1. Conecta o repositório ao Vercel
2. Deploy automático a cada push

### GitHub Pages
1. `npm run build`
2. Upload da pasta `dist` para GitHub Pages

## 📱 Teste
1. **Abre**: `http://localhost:5173`
2. **Deves ver**: Tela de password com design glass-morphism
3. **Introduz**: `k0d2025`
4. **Resultado**: Pitch deck completo com 15 slides

## 🎨 Personalização
- **Altera a password**: `src/Deck.jsx` linha com `password === 'k0d2025'`
- **Modifica cores**: `tailwind.config.js`
- **Adiciona/remove slides**: array `slides` em `src/Deck.jsx`
- **Customiza contactos**: última slide do pitch deck

## 📞 Contacto
- **Investors**: investors@k0d.pro
- **João Castro (CTO)**: joao@k0d.pro
- **Joana Matos (CEO)**: joana@k0d.pro

---

**Tempo de setup**: ~2 minutos
**Custo**: €0 (gratuito)
**Performance**: Hot reload + build otimizado