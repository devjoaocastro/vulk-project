#!/usr/bin/env node

/**
 * Script para configurar automaticamente DNS na Hostinger
 * Usando a API oficial da Hostinger
 */

const https = require('https');

const HOSTINGER_API_TOKEN = 'h1YPpJ95vRVEQr3wKiBbFrfaXwZ4BRntRdSDyKj052372a64';
const DOMAIN = 'vulk.host';
const FLY_IO_IP = '149.248.196.151';

// Configurações da API Hostinger
const API_BASE = 'https://developers.hostinger.com/api';

async function makeRequest(endpoint, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'developers.hostinger.com',
            path: endpoint,
            method: method,
            headers: {
                'Authorization': `Bearer ${HOSTINGER_API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(body);
                    resolve({ status: res.statusCode, data: json });
                } catch (e) {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}

async function getDomainInfo() {
    console.log('🔍 Verificando domínio...');

    try {
        // Tentar diferentes endpoints da API
        const endpoints = [
            `/api/v1/domains/${DOMAIN}`,
            `/api/domains/${DOMAIN}`,
            `/api/v1/dns/domains/${DOMAIN}`,
            `/api/dns/domains/${DOMAIN}`
        ];

        for (const endpoint of endpoints) {
            console.log(`Tentando: ${endpoint}`);
            const response = await makeRequest(endpoint);
            console.log(`Status: ${response.status}`);
            console.log(`Response:`, JSON.stringify(response.data, null, 2));

            if (response.status === 200) {
                return response.data;
            }
        }

        throw new Error('Nenhum endpoint funcionou');
    } catch (error) {
        console.error('❌ Erro ao verificar domínio:', error.message);
        return null;
    }
}

async function configureDNS() {
    console.log('🌐 Configurando DNS para vulk.host...');
    console.log(`🎯 IP do Fly.io: ${FLY_IO_IP}`);

    // Verificar domínio
    const domainInfo = await getDomainInfo();

    if (!domainInfo) {
        console.log('⚠️  Não foi possível aceder à API da Hostinger');
        console.log('📋 Configuração manual necessária:');
        console.log('');
        console.log('1. Ir para: https://hpanel.hostinger.com/domain/vulk.host/dns');
        console.log('2. Eliminar registros ALIAS e CNAME incorretos');
        console.log('3. Adicionar registros A:');
        console.log('   - Tipo: A, Nome: @, Alvo: 149.248.196.151, TTL: 14400');
        console.log('   - Tipo: A, Nome: www, Alvo: 149.248.196.151, TTL: 14400');
        console.log('   - Tipo: A, Nome: *, Alvo: 149.248.196.151, TTL: 14400');
        return;
    }

    console.log('✅ Domínio verificado com sucesso!');
    console.log('📋 Configuração DNS necessária:');
    console.log('');
    console.log('Registros A necessários:');
    console.log('1. @ → 149.248.196.151');
    console.log('2. www → 149.248.196.151');
    console.log('3. * → 149.248.196.151');
}

// Executar configuração
configureDNS().catch(console.error);

