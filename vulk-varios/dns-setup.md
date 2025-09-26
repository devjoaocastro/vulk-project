# DNS Configuration for vulk.host

## Configuração DNS necessária para o domínio vulk.host

### 1. Configuração no provedor DNS (onde comprou o domínio vulk.host)

#### Opção A: A Record (Recomendado)
```
Type: A
Name: *
Value: [IP do Fly.io - será fornecido após deploy]
TTL: 300
```

#### Opção B: CNAME Record
```
Type: CNAME  
Name: *
Value: [hostname do Fly.io - será fornecido após deploy]
TTL: 300
```

### 2. Configuração no Fly.io

Após o primeiro deploy, execute:

```bash
# Obter IP do Fly.io
flyctl ips list --app [nome-do-app]

# Configurar certificado SSL
flyctl certs create *.vulk.host --app [nome-do-app]
```

### 3. Verificação

Após configurar o DNS, teste:

```bash
# Testar resolução DNS
nslookup *.vulk.host

# Testar conectividade
curl -I https://teste.vulk.host
```

### 4. Configuração Automática

O sistema VULK irá:
1. ✅ Deploy automático para Fly.io
2. ✅ Configurar certificado SSL
3. ✅ Fornecer instruções DNS
4. ✅ Gerar URL personalizada: `https://[projeto].vulk.host`

## Exemplo de URLs geradas:

- `https://netflix-clone-1758506024483.vulk.host`
- `https://ecommerce-store-1758506024483.vulk.host`
- `https://dashboard-app-1758506024483.vulk.host`

## Troubleshooting

Se o domínio não funcionar:
1. Verifique se o DNS foi propagado (pode levar até 24h)
2. Verifique se o certificado SSL foi criado
3. Verifique se o IP está correto no DNS
