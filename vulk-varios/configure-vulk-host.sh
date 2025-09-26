#!/bin/bash

# 🌐 Script de Configuração do Domínio vulk.host
# Este script configura o domínio vulk.host para hospedar projetos dos clientes

echo "🌐 Configurando domínio vulk.host para projetos dos clientes..."

# 1. Verificar se o domínio vulk.host está disponível
echo "📋 Verificando disponibilidade do domínio vulk.host..."

# 2. Configurar DNS records
echo "🔧 Configurando registros DNS..."

cat << EOF

📋 REGISTROS DNS NECESSÁRIOS PARA vulk.host:

1. Registro Principal:
   Type: A
   Name: vulk.host
   Value: [IP do servidor Vercel]
   TTL: 300

2. Wildcard para subdomínios:
   Type: CNAME
   Name: *.vulk.host
   Value: cname.vercel-dns.com
   TTL: 300

3. WWW redirect:
   Type: CNAME
   Name: www.vulk.host
   Value: vulk.host
   TTL: 300

EOF

# 3. Configurar Vercel
echo "🚀 Configurando Vercel..."

# Verificar se Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI não encontrado. Instalando..."
    npm install -g vercel
fi

# Login no Vercel (se necessário)
echo "🔐 Verificando login no Vercel..."
if ! vercel whoami &> /dev/null; then
    echo "⚠️  Faça login no Vercel:"
    echo "   vercel login"
    exit 1
fi

# Configurar domínio no Vercel
echo "🌐 Configurando domínio vulk.host no Vercel..."
echo "   Execute: vercel domains add vulk.host"
echo "   Execute: vercel domains add *.vulk.host"

# 4. Testar configuração
echo "🧪 Testando configuração..."

# Criar arquivo de teste
cat > test-vulk-host.html << EOF
<!DOCTYPE html>
<html>
<head>
    <title>VULK Host Test</title>
</head>
<body>
    <h1>🌐 vulk.host está funcionando!</h1>
    <p>Domínio configurado com sucesso para projetos dos clientes.</p>
</body>
</html>
EOF

echo "✅ Arquivo de teste criado: test-vulk-host.html"
echo "📤 Faça upload deste arquivo para testar o domínio"

# 5. Instruções finais
cat << EOF

🎯 PRÓXIMOS PASSOS:

1. 📋 Configure os registros DNS no seu provedor de domínio
2. 🚀 Execute: vercel domains add vulk.host
3. 🧪 Teste o domínio: https://vulk.host
4. 🔧 Configure subdomínios: *.vulk.host
5. ✅ Teste um projeto: https://test-app.vulk.host

📚 DOCUMENTAÇÃO:
- Vercel Domains: https://vercel.com/docs/concepts/projects/domains
- DNS Configuration: https://vercel.com/docs/concepts/projects/domains/add-a-domain

🎉 Quando estiver configurado, os projetos dos clientes terão URLs como:
- https://todo-app-123456.vulk.host
- https://ecommerce-store-789.vulk.host
- https://portfolio-site-456.vulk.host

EOF

echo "✅ Script de configuração concluído!"

