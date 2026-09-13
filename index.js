/**
 * FitHome - Tailwind Config & Chat Utilities
 */

// Tailwind theme customization
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FF5E1E',
          hover: '#E04D13',
          glow: '#FF7A42',
          dark: '#0C0C0E',
          card: '#161619',
          cardBorder: '#28282E',
          surface: '#1E1E23',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'sans-serif'],
      },
    },
  },
};

/**
 * Fill chat input with suggested prompt
 */
function fillPrompt(text) {
  const input = document.getElementById('chat-input');
  if (input) {
    input.value = text;
    input.focus();
  }
}

/**
 * Handle sending chat message and show bot reply
 */
function handleSend() {
  const input = document.getElementById('chat-input');
  const chatBody = document.getElementById('chat-body');
  const text = input?.value.trim();

  if (!text || !chatBody || !input) return;

  // User bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'flex items-start justify-end gap-3 ml-auto max-w-lg';
  userBubble.innerHTML = `
    <div class="bg-brand text-white rounded-2xl rounded-tr-sm p-4 text-xs sm:text-sm shadow-md">
      <p>${escapeHTML(text)}</p>
      <span class="text-[10px] text-white/75 block text-right mt-1">Just now</span>
    </div>
    <div class="w-8 h-8 rounded-full bg-zinc-800 text-brand flex-shrink-0 flex items-center justify-center text-xs font-bold mt-1">JD</div>
  `;
  chatBody.appendChild(userBubble);

  input.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;

  // Bot reply (delayed)
  setTimeout(() => {
    const botBubble = document.createElement('div');
    botBubble.className = 'flex items-start gap-3 max-w-xl';
    botBubble.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-brand/20 text-brand flex-shrink-0 flex items-center justify-center text-xs font-bold mt-1">AI</div>
      <div class="bg-zinc-800/80 border border-zinc-700/60 rounded-2xl rounded-tl-sm p-4 text-xs sm:text-sm text-zinc-200 space-y-1">
        <p>Great focus! For "<em>${escapeHTML(text)}</em>", keep core bracing, drink 500ml electrolytes, and log progress to keep your <strong>14-day streak</strong> active!</p>
        <span class="text-[10px] text-zinc-500 block pt-1">FitAI Coach · Just now</span>
      </div>
    `;
    chatBody.appendChild(botBubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 700);
}

/**
 * Basic HTML escape helper
 */
function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  if (nav) nav.classList.toggle('hidden');
}
function escapeHTML(str) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  };
  return str.replace(/[&<>'"]/g, (tag) => map[tag] || tag);
}
