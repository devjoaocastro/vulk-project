#!/usr/bin/env node

const WebSocket = require('ws');
const http = require('http');
const url = require('url');

// Create HTTP server
const server = http.createServer();

// Create WebSocket server
const wss = new WebSocket.Server({ 
  server,
  path: '/ws'
});

// Store project rooms
const projectRooms = new Map();

wss.on('connection', (ws, request) => {
  const query = url.parse(request.url, true).query;
  const projectId = query.projectId;
  
  if (!projectId) {
    console.log('❌ [WS] Connection rejected - no projectId');
    ws.close(1008, 'Project ID required');
    return;
  }

  console.log(`🔌 [WS] Client connected to project: ${projectId}`);

  // Add to project room
  if (!projectRooms.has(projectId)) {
    projectRooms.set(projectId, new Set());
  }
  projectRooms.get(projectId).add(ws);

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'status_update',
    data: { type: 'connected', projectId, timestamp: new Date().toISOString() },
    timestamp: new Date().toISOString(),
    projectId
  }));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log(`📨 [WS] Received message for project ${projectId}:`, data.type);

      // Broadcast to all clients in the same project room
      const room = projectRooms.get(projectId);
      if (room) {
        room.forEach(client => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              ...data,
              projectId,
              timestamp: new Date().toISOString()
            }));
          }
        });
      }

      // Handle orchestration events
      if (data.type === 'orchestration_event') {
        console.log(`🎭 [WS] Orchestration event for project ${projectId}:`, data.data?.type);
      }

    } catch (error) {
      console.error('❌ [WS] Failed to parse message:', error);
    }
  });

  ws.on('close', () => {
    console.log(`🔌 [WS] Client disconnected from project: ${projectId}`);
    
    // Remove from project room
    const room = projectRooms.get(projectId);
    if (room) {
      room.delete(ws);
      if (room.size === 0) {
        projectRooms.delete(projectId);
      }
    }
  });

  ws.on('error', (error) => {
    console.error(`❌ [WS] Error for project ${projectId}:`, error);
  });
});

// Start server
const PORT = process.env.WS_PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 [WS] WebSocket server running on port ${PORT}`);
  console.log(`🔗 [WS] WebSocket URL: ws://localhost:${PORT}/ws`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 [WS] Shutting down WebSocket server...');
  server.close(() => {
    console.log('✅ [WS] WebSocket server closed');
    process.exit(0);
  });
});
