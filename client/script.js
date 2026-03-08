// Configuration - update this if your backend runs on a different port
const API_URL = 'http://localhost:3000/api/chat';

const chatContainer = document.getElementById('chatContainer');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const clearChat = document.getElementById('clearChat');

// Conversation history matching backend's expected format
let conversationHistory = [];

const scrollToBottom = () => {
  chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
};

const appendMessage = (role, text) => {
  const wrapper = document.createElement('div');
  wrapper.className = `flex gap-4 max-w-3xl message-animate ${role === 'user' ? 'ml-auto flex-row-reverse' : ''}`;

  const avatar = document.createElement('div');
  avatar.className = `w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${role === 'user' ? 'bg-slate-800 text-white' : 'bg-emerald-100 text-emerald-600'
    }`;

  avatar.innerHTML = role === 'user'
    ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;

  const bubble = document.createElement('div');
  bubble.className = `p-4 rounded-2xl shadow-sm border ${role === 'user'
    ? 'bg-emerald-600 text-white border-emerald-500 rounded-tr-none'
    : 'bg-white border-slate-200 text-slate-700 rounded-tl-none'
    }`;
  bubble.innerText = text;

  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);
  chatContainer.appendChild(wrapper);
  scrollToBottom();

  // Add to conversation history
  conversationHistory.push({ role, text });
};

const showTypingIndicator = () => {
  const wrapper = document.createElement('div');
  wrapper.id = 'typingIndicator';
  wrapper.className = 'flex gap-4 max-w-3xl message-animate';
  wrapper.innerHTML = `
    <div class="w-9 h-9 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center text-emerald-600">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    </div>
    <div class="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm typing-dots">
      <span></span><span></span><span></span>
    </div>
  `;
  chatContainer.appendChild(wrapper);
  scrollToBottom();
};

const removeTypingIndicator = () => {
  const indicator = document.getElementById('typingIndicator');
  if (indicator) indicator.remove();
};

async function fetchAIResponse(conversation, retries = 3, delay = 1000) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversation })
    });

    // Handle rate limiting with retry
    if (response.status === 429 && retries > 0) {
      await new Promise(res => setTimeout(res, delay));
      return fetchAIResponse(conversation, retries - 1, delay * 2);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'API request failed');
    }

    const data = await response.json();

    // Match backend response structure: { result: "..." }
    return data.result || "I'm sorry, I'm having trouble responding right now.";

  } catch (error) {
    // Retry on network errors
    if (retries > 0 && error.message !== 'API request failed') {
      await new Promise(res => setTimeout(res, delay));
      return fetchAIResponse(conversation, retries - 1, delay * 2);
    }
    throw error;
  }
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;

  userInput.value = '';
  appendMessage('user', text);
  userInput.disabled = true;
  sendBtn.disabled = true;

  showTypingIndicator();

  try {
    const aiText = await fetchAIResponse(conversationHistory);
    removeTypingIndicator();
    appendMessage('model', aiText);
  } catch (error) {
    console.error('Chat error:', error);
    removeTypingIndicator();
    appendMessage('model', "Sorry, my flight was delayed! 🛫 (Connection error). Please try again.");
  } finally {
    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.focus();
  }
});

clearChat.addEventListener('click', () => {
  chatContainer.innerHTML = '';
  conversationHistory = [];
  appendMessage('model', 'Boarding pass cleared! ✈️ Where shall we head next?');
});
