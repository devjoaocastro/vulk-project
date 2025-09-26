#!/bin/bash

# 🌐 DNS Setup Script for vulk.host
# Configuração automática do DNS para Fly.io

echo "🌐 Configurando DNS para vulk.host..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# IPs do Fly.io (obtidos dinamicamente)
FLY_IP_DEDICATED="149.248.196.151"  # IP dedicado (recomendado)
FLY_IP_SHARED="66.241.124.80"       # IP compartilhado (alternativa)

echo -e "${BLUE}📋 Configuração DNS na Hostinger:${NC}"
echo ""
echo -e "${YELLOW}1. Aceder ao painel da Hostinger:${NC}"
echo "   https://hpanel.hostinger.com"
echo ""
echo -e "${YELLOW}2. Ir para Domínios → vulk.host → DNS:${NC}"
echo ""
echo -e "${GREEN}3. Configurar os seguintes registos:${NC}"
echo ""
echo -e "${BLUE}   Opção 1 - IP Dedicado (Recomendado):${NC}"
echo "   Registro A (Domínio principal):"
echo "   Tipo: A"
echo "   Nome: @"
echo "   Valor: $FLY_IP_DEDICATED"
echo "   TTL: 3600"
echo ""
echo "   Registro A (Wildcard para subdomínios):"
echo "   Tipo: A"
echo "   Nome: *"
echo "   Valor: $FLY_IP_DEDICATED"
echo "   TTL: 3600"
echo ""
echo -e "${BLUE}   Opção 2 - IP Compartilhado (Alternativa):${NC}"
echo "   Registro A (Domínio principal):"
echo "   Tipo: A"
echo "   Nome: @"
echo "   Valor: $FLY_IP_SHARED"
echo "   TTL: 3600"
echo ""
echo "   Registro A (Wildcard para subdomínios):"
echo "   Tipo: A"
echo "   Nome: *"
echo "   Valor: $FLY_IP_SHARED"
echo "   TTL: 3600"
echo ""
echo -e "${YELLOW}4. Aguardar propagação DNS (1-24 horas)${NC}"
echo ""
echo -e "${GREEN}✅ Após configuração, os subdomínios funcionarão automaticamente:${NC}"
echo "   • https://projeto1-1234567890.vulk.host"
echo "   • https://landing-page-1234567890.vulk.host"
echo "   • https://ecommerce-1234567890.vulk.host"
echo ""
echo -e "${BLUE}🔐 SSL será configurado automaticamente pelo Fly.io${NC}"
echo ""
echo -e "${YELLOW}📝 Nota: O TTL de 3600 segundos (1 hora) é recomendado para propagação rápida${NC}"
echo ""
echo -e "${GREEN}🎯 Resultado: Subdomínios ilimitados funcionando automaticamente!${NC}"
