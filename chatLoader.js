const fs = require('fs').promises;
async function loadChatFile(filePath) {
  const fileContent = await fs.readFile(filePath, 'utf8');
  const lines = fileContent.split('\n').filter(line => line.trim() !== '');
  const chatExamples = lines.map(line => JSON.parse(line));
  return chatExamples;
}
module.exports = { loadChatFile };
