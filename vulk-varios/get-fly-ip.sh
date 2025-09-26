#!/bin/bash

# 🔍 Script para obter o IP correto do Fly.io
# Este script obtém o IP correto para configurar o DNS

echo "🔍 Obtendo IP correto do Fly.io..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar se flyctl está instalado
if ! command -v flyctl &> /dev/null; then
    echo -e "${RED}❌ flyctl não está instalado${NC}"
    exit 1
fi

# Verificar se está autenticado
if ! flyctl auth whoami &> /dev/null; then
    echo -e "${RED}❌ Não está autenticado no Fly.io${NC}"
    echo "Execute: flyctl auth login"
    exit 1
fi

echo -e "${BLUE}📋 Obtendo informações de IP do Fly.io...${NC}"
echo ""

# Obter lista de apps
echo -e "${YELLOW}📱 Apps disponíveis:${NC}"
flyctl apps list --json | jq -r '.[] | "\(.Name) - \(.Status)"' 2>/dev/null || flyctl apps list

echo ""
echo -e "${YELLOW}🔍 Verificando IPs das apps...${NC}"

# Obter IPs de diferentes apps
APPS=("testapp3-1758508954914" "vulk-netflix-clone-1758506024483" "vulk-netflix-clone-1758505484526")

for app in "${APPS[@]}"; do
    echo ""
    echo -e "${BLUE}📱 App: $app${NC}"
    IP_INFO=$(flyctl ips list --app "$app" 2>/dev/null)

    if [ $? -eq 0 ]; then
        echo "$IP_INFO"

        # Extrair IP v4
        IPV4=$(echo "$IP_INFO" | grep "v4" | awk '{print $2}' | head -1)
        if [ ! -z "$IPV4" ]; then
            echo -e "${GREEN}✅ IP v4 encontrado: $IPV4${NC}"
        fi
    else
        echo -e "${RED}❌ Erro ao obter IPs para $app${NC}"
    fi
done

echo ""
echo -e "${YELLOW}🌐 Verificando IPs públicos do Fly.io...${NC}"

# Verificar IPs públicos conhecidos do Fly.io
echo -e "${BLUE}📋 IPs públicos do Fly.io:${NC}"
echo "• 66.241.124.80 (shared)"
echo "• 149.248.196.151 (dedicated)"
echo "• 2a09:8280:1::9c:aa7b:0 (IPv6)"

echo ""
echo -e "${GREEN}📝 Para configurar o DNS na Hostinger:${NC}"
echo ""
echo -e "${BLUE}Opção 1 - IP Dedicado (Recomendado):${NC}"
echo "Tipo: A"
echo "Nome: @"
echo "Valor: 149.248.196.151"
echo "TTL: 3600"
echo ""
echo "Tipo: A"
echo "Nome: *"
echo "Valor: 149.248.196.151"
echo "TTL: 3600"
echo ""
echo -e "${BLUE}Opção 2 - IP Compartilhado:${NC}"
echo "Tipo: A"
echo "Nome: @"
echo "Valor: 66.241.124.80"
echo "TTL: 3600"
echo ""
echo "Tipo: A"
echo "Nome: *"
echo "Valor: 66.241.124.80"
echo "TTL: 3600"
echo ""
echo -e "${YELLOW}💡 Recomendação: Use o IP dedicado (149.248.196.151) para melhor performance${NC}"
echo ""
echo -e "${GREEN}🎯 Após configurar o DNS, teste com:${NC}"
echo "nslookup vulk.host"
echo "nslookup testapp3-1758508954914.vulk.host"
