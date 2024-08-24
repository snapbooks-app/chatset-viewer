const { ipcRenderer } = require('electron');
const { marked } = require('marked');

let currentChatExamples = [];
let currentExampleIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  const loadButton = document.getElementById('load-button');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');

  loadButton.addEventListener('click', loadChatFile);
  prevButton.addEventListener('click', showPreviousExample);
  nextButton.addEventListener('click', showNextExample);
});

async function loadChatFile() {
  currentChatExamples = await ipcRenderer.invoke('open-file');
  currentExampleIndex = 0;
  displayCurrentExample();
}

function displayCurrentExample() {
  const chatContainer = document.querySelector('.chat-container');
  chatContainer.innerHTML = '';

  const currentExample = currentChatExamples[currentExampleIndex];
  
  currentExample.messages.forEach(message => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat ${message.role === 'user' ? 'chat-end' : 'chat-start'} mb-4`;
    
    let bubbleClass = 'chat-bubble';
    switch(message.role) {
      case 'user':
        bubbleClass += ' chat-bubble-primary';
        break;
      case 'assistant':
        bubbleClass += ' chat-bubble-secondary';
        break;
      case 'system':
        bubbleClass += ' chat-bubble-accent';
        break;
    }

    messageDiv.innerHTML = `
      <div class="chat-header opacity-50 mb-1">${message.role}</div>
      <div class="${bubbleClass}">
        ${marked.parse(message.content)}
      </div>
    `;
    chatContainer.appendChild(messageDiv);
  });
}

function showPreviousExample() {
  if (currentExampleIndex > 0) {
    currentExampleIndex--;
    displayCurrentExample();
  }
}

function showNextExample() {
  if (currentExampleIndex < currentChatExamples.length - 1) {
    currentExampleIndex++;
    displayCurrentExample();
  }
}