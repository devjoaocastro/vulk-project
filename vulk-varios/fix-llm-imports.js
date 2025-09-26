const fs = require('fs');
const path = require('path');

const files = [
  'src/app/api/generate-code/route.ts',
  'src/app/api/fix-code/route.ts', 
  'src/app/api/modifier/route.ts',
  'src/app/api/page_description/route.ts',
  'src/app/api/generate-code-from-screenshot/route.ts'
];

files.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace imports
    content = content.replace(
      /import { generateText, type LanguageModelV1 } from "ai";/g,
      'import { generateTextWithLLM } from "@/lib/llm-helper";'
    );
    
    content = content.replace(
      /import { llm } from "@\/lib\/llm";/g,
      ''
    );
    
    // Replace generateText calls
    content = content.replace(
      /const (\w+) = await generateText\(\{\s*model: llm\(([^)]+)\) as LanguageModelV1,\s*messages: (\[[\s\S]*?\]),\s*temperature: ([^,}]+),?\s*\}\);/g,
      'const $1 = await generateTextWithLLM($2, $3, { temperature: $4 });'
    );
    
    fs.writeFileSync(fullPath, content);
    console.log(`Fixed ${filePath}`);
  }
});

console.log('All files fixed!');
