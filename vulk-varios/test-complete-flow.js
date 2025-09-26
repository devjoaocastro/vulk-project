#!/usr/bin/env node

/**
 * Test script to verify the complete VULK flow
 * Tests: instant-response, generate-ui/stream, chat messages, orchestration
 */

const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function testInstantResponse() {
  console.log('🧪 Testing instant-response API...');
  
  try {
    const response = await fetch(`${BASE_URL}/api/instant-response`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'build me a simple todo app' })
    });
    
    const data = await response.json();
    
    if (data.success && data.message && data.message.length > 100) {
      console.log('✅ Instant response working - got detailed AI response');
      console.log(`📝 Response length: ${data.message.length} characters`);
      return true;
    } else {
      console.log('❌ Instant response failed - got fallback or short response');
      console.log('📝 Response:', data.message?.substring(0, 100) + '...');
      return false;
    }
  } catch (error) {
    console.log('❌ Instant response error:', error.message);
    return false;
  }
}

async function testGenerateUIStream() {
  console.log('🧪 Testing generate-ui/stream API...');
  
  try {
    const response = await fetch(`${BASE_URL}/api/generate-ui/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        prompt: 'build me a simple todo app',
        model: 'x-ai/grok-4-fast:free'
      })
    });
    
    if (!response.ok) {
      console.log('❌ Generate UI stream failed with status:', response.status);
      return false;
    }
    
    // For Node.js environment, read the response as text
    const text = await response.text();
    const lines = text.split('\n').filter(line => line.trim());
    
    let eventCount = 0;
    let hasAIMessage = false;
    let hasFileWrite = false;
    let hasProgress = false;
    
    console.log('📡 Reading stream events...');
    
    for (const line of lines) {
      try {
        const event = JSON.parse(line);
        eventCount++;
        
        if (event.type === 'ai_message') {
          hasAIMessage = true;
          console.log('✅ Got AI message event');
        } else if (event.type === 'file_write') {
          hasFileWrite = true;
          console.log('✅ Got file write event:', event.payload?.path);
        } else if (event.type === 'generation_start') {
          hasProgress = true;
          console.log('✅ Got generation start event');
        }
      } catch (e) {
        // Skip invalid JSON
      }
    }
    
    console.log(`📊 Total events received: ${eventCount}`);
    console.log(`🤖 AI messages: ${hasAIMessage ? '✅' : '❌'}`);
    console.log(`📁 File writes: ${hasFileWrite ? '✅' : '❌'}`);
    console.log(`⚡ Progress events: ${hasProgress ? '✅' : '❌'}`);
    
    return hasAIMessage && hasFileWrite && hasProgress;
    
  } catch (error) {
    console.log('❌ Generate UI stream error:', error.message);
    return false;
  }
}

async function testHomepage() {
  console.log('🧪 Testing homepage accessibility...');
  
  try {
    const response = await fetch(`${BASE_URL}/`);
    
    if (response.ok) {
      console.log('✅ Homepage accessible');
      return true;
    } else {
      console.log('❌ Homepage failed with status:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Homepage error:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting VULK Complete Flow Tests\n');
  
  const results = {
    homepage: await testHomepage(),
    instantResponse: await testInstantResponse(),
    generateUIStream: await testGenerateUIStream()
  };
  
  console.log('\n📊 Test Results:');
  console.log('================');
  console.log(`🏠 Homepage: ${results.homepage ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`⚡ Instant Response: ${results.instantResponse ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`🛠️ Generate UI Stream: ${results.generateUIStream ? '✅ PASS' : '❌ FAIL'}`);
  
  const allPassed = Object.values(results).every(result => result);
  
  if (allPassed) {
    console.log('\n🎉 All tests passed! VULK is working correctly.');
  } else {
    console.log('\n⚠️ Some tests failed. Check the issues above.');
  }
  
  return allPassed;
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = { runTests, testInstantResponse, testGenerateUIStream, testHomepage };
