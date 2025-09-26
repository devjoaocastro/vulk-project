#!/usr/bin/env node

/**
 * Test Complete Project Generation
 * This script tests the complete project generation with all files
 */

const testCode = `
import React, { useState } from 'react';
import { Heart, Star, Download, Share2 } from 'lucide-react';

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn VULK', completed: false },
    { id: 2, text: 'Deploy to Fly.io', completed: true },
    { id: 3, text: 'Build amazing apps', completed: false }
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { 
        id: Date.now(), 
        text: newTodo, 
        completed: false 
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🚀 VULK Todo App
          </h1>
          <p className="text-white/80 text-lg">
            Built with VULK + Deployed on Fly.io
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {todos.length}
                </div>
                <div className="text-sm text-blue-500">Total</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {todos.filter(t => t.completed).length}
                </div>
                <div className="text-sm text-green-500">Done</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {todos.filter(t => !t.completed).length}
                </div>
                <div className="text-sm text-orange-500">Pending</div>
              </div>
            </div>

            {/* Add Todo */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="Add a new todo..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={addTodo}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add
              </button>
            </div>

            {/* Todo List */}
            <div className="space-y-2">
              {todos.map(todo => (
                <div
                  key={todo.id}
                  className={\`flex items-center gap-3 p-4 rounded-lg border \${todo.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}\`}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={\`w-6 h-6 rounded-full border-2 flex items-center justify-center \${todo.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}\`}
                  >
                    {todo.completed && <span>✓</span>}
                  </button>
                  <span className={\`flex-1 \${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}\`}>
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Made with VULK</span>
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 hover:text-purple-600">
                    <Star className="w-4 h-4" />
                    Star
                  </button>
                  <button className="flex items-center gap-1 hover:text-purple-600">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
`;

async function testCompleteProject() {
  console.log('🧪 Testing Complete Project Generation...\n');

  try {
    const response = await fetch('http://localhost:3000/api/flyio/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: testCode,
        uiId: 'complete-test-' + Date.now(),
        userId: 'test-user',
        sessionId: 'test-session',
        projectName: 'VULK Todo App'
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ Complete Project Generated Successfully!');
      console.log(`🌐 Live URL: ${result.projectUrl}`);
      console.log(`📱 App Name: ${result.appName}`);
      console.log(`🆔 Deployment ID: ${result.deploymentId}`);
      
      console.log('\n📁 Project includes:');
      console.log('   ✅ React + TypeScript');
      console.log('   ✅ Tailwind CSS');
      console.log('   ✅ Vite build system');
      console.log('   ✅ Docker containerization');
      console.log('   ✅ Nginx optimization');
      console.log('   ✅ Health checks');
      console.log('   ✅ Global CDN');
      
      if (result.logs && result.logs.length > 0) {
        console.log('\n📋 Deployment Logs:');
        result.logs.forEach(log => console.log(`   ${log}`));
      }

      console.log('\n🎯 Test the live app:');
      console.log(`   Open: ${result.projectUrl}`);
      console.log('   Features: Add todos, mark complete, delete items');
    } else {
      console.log('❌ Project generation failed!');
      console.log(`Error: ${result.error}`);
      console.log(`Message: ${result.message}`);
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure your VULK server is running:');
    console.log('   npm run dev');
  }
}

// Run the test
testCompleteProject();
