/**
 * Test script to verify OpenRouter API is working
 */

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

async function testOpenRouterAPI() {
  console.log('🧪 Testing OpenRouter API...');
  console.log('API Key exists:', !!OPENROUTER_API_KEY);
  console.log('API Key preview:', OPENROUTER_API_KEY ? OPENROUTER_API_KEY.substring(0, 10) + '...' : 'NOT SET');

  if (!OPENROUTER_API_KEY) {
    console.error('❌ OPENROUTER_API_KEY not found in environment variables');
    return;
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'VULK',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a React developer. Generate a simple React component.'
          },
          {
            role: 'user',
            content: 'Create a simple button component'
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', response.status, errorText);
      return;
    }

    const data = await response.json();
    console.log('✅ API Response successful');
    console.log('Response data:', JSON.stringify(data, null, 2));

    if (data.choices && data.choices[0]) {
      console.log('✅ Generated content:', data.choices[0].message.content);
    } else {
      console.error('❌ No choices in response');
    }

  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
}

testOpenRouterAPI();
