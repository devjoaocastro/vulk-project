#!/usr/bin/env node

/**
 * Script para configurar automaticamente DNS na Cloudflare
 * Usando a API oficial da Cloudflare
 */

const https = require('https');

const CLOUDFLARE_API_TOKEN = '-EbvctFYb2jyZSBZh4lTCzGzTZR5K4XgCW5K64Mf';
const DOMAIN = 'vulk.host';
const FLY_IO_IP = '149.248.196.151';

// Configurações da API Cloudflare
const API_BASE = 'https://api.cloudflare.com/client/v4';

async function makeRequest(endpoint, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.cloudflare.com',
            path: endpoint,
            method: method,
            headers: {
                'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
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

async function getZoneId() {
    console.log('🔍 Procurando zona para vulk.host...');

    try {
        const response = await makeRequest('/zones?name=' + DOMAIN);

        if (response.status === 200 && response.data.success) {
            const zones = response.data.result;
            const zone = zones.find(z => z.name === DOMAIN);

            if (zone) {
                console.log(`✅ Zona encontrada: ${zone.name} (ID: ${zone.id})`);
                return zone.id;
            } else {
                console.log('❌ Zona vulk.host não encontrada');
                console.log('Zonas disponíveis:', zones.map(z => z.name));
                return null;
            }
        } else {
            console.error('❌ Erro ao obter zonas:', response.data);
            return null;
        }
    } catch (error) {
        console.error('❌ Erro ao obter zona:', error.message);
        return null;
    }
}

async function getCurrentRecords(zoneId) {
    console.log('📋 Verificando registros DNS atuais...');

    try {
        const response = await makeRequest(`/zones/${zoneId}/dns_records`);

        if (response.status === 200 && response.data.success) {
            const records = response.data.result;
            console.log(`📊 Encontrados ${records.length} registros DNS:`);

            records.forEach(record => {
                console.log(`  - ${record.type} ${record.name} → ${record.content} (TTL: ${record.ttl})`);
            });

            return records;
        } else {
            console.error('❌ Erro ao obter registros:', response.data);
            return [];
        }
    } catch (error) {
        console.error('❌ Erro ao obter registros:', error.message);
        return [];
    }
}

async function createOrUpdateRecord(zoneId, type, name, content, ttl = 1) {
    console.log(`🔧 Configurando ${type} ${name} → ${content}...`);

    try {
        const recordData = {
            type: type,
            name: name,
            content: content,
            ttl: ttl
        };

        const response = await makeRequest(`/zones/${zoneId}/dns_records`, 'POST', recordData);

        if (response.status === 200 && response.data.success) {
            console.log(`✅ ${type} ${name} criado com sucesso!`);
            return true;
        } else {
            console.error(`❌ Erro ao criar ${type} ${name}:`, response.data);
            return false;
        }
    } catch (error) {
        console.error(`❌ Erro ao criar ${type} ${name}:`, error.message);
        return false;
    }
}

async function configureDNS() {
    console.log('🌐 Configurando DNS na Cloudflare para vulk.host...');
    console.log(`🎯 IP do Fly.io: ${FLY_IO_IP}`);

    // Obter ID da zona
    const zoneId = await getZoneId();
    if (!zoneId) {
        console.log('❌ Não foi possível obter ID da zona');
        return;
    }

    // Verificar registros atuais
    const currentRecords = await getCurrentRecords(zoneId);

    // Configurar registros necessários
    const requiredRecords = [
        { type: 'A', name: '@', content: FLY_IO_IP },
        { type: 'A', name: 'www', content: FLY_IO_IP },
        { type: 'A', name: '*', content: FLY_IO_IP }
    ];

    console.log('\n🚀 Configurando registros DNS...');

    for (const record of requiredRecords) {
        // Verificar se já existe
        const existing = currentRecords.find(r =>
            r.type === record.type &&
            r.name === record.name &&
            r.content === record.content
        );

        if (existing) {
            console.log(`✅ ${record.type} ${record.name} já está correto`);
        } else {
            await createOrUpdateRecord(zoneId, record.type, record.name, record.content);
        }
    }

    console.log('\n🎉 Configuração DNS concluída!');
    console.log('⏱️  Aguardar 5-10 minutos para propagação');
    console.log('🧪 Testar com: nslookup vulk.host');
}

// Executar configuração
configureDNS().catch(console.error);
