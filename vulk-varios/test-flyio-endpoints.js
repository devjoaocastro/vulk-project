import { getFlyClient } from './src/lib/flyio/flyio-client';

async function testFlyIOAPI() {
  try {
    const fly = getFlyClient();

    // Test createApp
    const appName = `test-app-${Date.now()}`;
    console.log('Creating app:', appName);

    // Note: This will fail without proper authentication, but we can see if the endpoint is correct
    await fly.createApp(appName, 'vulk');

  } catch (error) {
    console.log('Error (expected without auth):', error.message);

    // Check if the error is about authentication or wrong endpoint
    if (error.message.includes('404')) {
      console.log('❌ Still getting 404 - endpoint might be wrong');
    } else if (error.message.includes('401') || error.message.includes('403')) {
      console.log('✅ Endpoint is correct - getting authentication error as expected');
    }
  }
}

testFlyIOAPI();
