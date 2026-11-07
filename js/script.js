// Alternar Tema (Claro / Escuro)
const themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme
      || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = currentTheme === 'dark' ? 'light' : 'dark';
  });
}

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.getElementById('main-nav');

if (menuToggle && navMenu) {
  function setMenuOpen(isOpen) {
    navMenu.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  }

  menuToggle.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  navMenu.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) {
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuOpen(false);
  });
}

// Conversas do Chat
const conversationList = document.getElementById('conversationList');
const messageThread = document.getElementById('messageThread');
const chatArea = document.getElementById('chatArea');
const threadHeader = document.getElementById('threadHeader');
const threadName = document.getElementById('threadName');
const backToConversations = document.getElementById('backToConversations');
const chatTabs = document.querySelectorAll('[data-chat-tab]');
const defaultThreadMarkup = chatArea ? chatArea.innerHTML : '';
const conversations = [
  {
    name: 'Ana Costa',
    avatar: '👩‍🦱',
    unread: 2,
    messages: [
      { from: 'them', text: 'Oi! Você viu o material novo sobre inteligência artificial?' },
      { from: 'me', text: 'Ainda não, sobre o que é?' },
      { from: 'them', text: 'Separei alguns links para compartilhar com o grupo.' },
      { from: 'me', text: 'Legal! Pode me mandar que vou dar uma olhada.' }
    ]
  },
  {
    name: 'Bia Martins',
    avatar: '👩🏻',
    unread: 0,
    messages: [
      { from: 'them', text: 'Conseguiu terminar aquele projeto?' },
      { from: 'me', text: 'Quase! Estou ajustando a página inicial.' },
      { from: 'them', text: 'Se quiser, posso revisar o código com você.' },
      { from: 'me', text: 'Aceito, obrigada! Te mando ainda hoje.' }
    ]
  },
  {
    name: 'Carol Oliveira',
    avatar: '👩‍🦰',
    unread: 3,
    messages: [
      { from: 'them', text: 'Vai participar do encontro de tecnologia neste sábado?' },
      { from: 'me', text: 'Quero sim! Onde vai ser?' },
      { from: 'them', text: 'O pessoal confirmou o horário para as 14h!' },
      { from: 'them', text: 'Me avisa se você for 😊' },
      { from: 'me', text: 'Combinado, vou confirmar minha presença.' }
    ]
  },
  {
    name: 'Diego Santos',
    avatar: '👨🏽‍💻',
    unread: 0,
    messages: [
      { from: 'them', text: 'Encontrei uma solução para aquele erro no banco.' },
      { from: 'me', text: 'Boa! O que estava causando o problema?' },
      { from: 'them', text: 'Depois te mando o exemplo funcionando.' },
      { from: 'me', text: 'Valeu, vai ajudar bastante.' }
    ]
  },
  {
    name: 'Rafael Lima',
    avatar: '🧑🏻‍💻',
    unread: 0,
    messages: [
      { from: 'them', text: 'Obrigado pelas dicas de portfólio!' },
      { from: 'me', text: 'Imagina! Como está ficando?' },
      { from: 'them', text: 'Já comecei a organizar meus projetos.' },
      { from: 'me', text: 'Legal, depois quero ver como ficou.' }
    ]
  }
];
let selectedConversation = null;

function renderConversationList() {
  if (!conversationList) return;
  conversationList.replaceChildren();

  conversations.forEach((conversation) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'conversation-item';

    const avatar = document.createElement('span');
    avatar.className = 'conversation-avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = conversation.avatar;

    const details = document.createElement('span');
    details.className = 'conversation-details';
    const name = document.createElement('b');
    name.className = 'conversation-name';
    name.textContent = conversation.name;
    const preview = document.createElement('span');
    preview.className = 'conversation-preview';
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    preview.textContent = `${lastMessage.from === 'me' ? 'Você: ' : ''}${lastMessage.text}`;
    details.append(name, preview);
    item.append(avatar, details);

    if (conversation.unread > 0) {
      const unread = document.createElement('span');
      unread.className = 'unread-count';
      unread.textContent = String(conversation.unread);
      unread.setAttribute('aria-label', `${conversation.unread} mensagens não lidas`);
      item.appendChild(unread);
    }

    item.addEventListener('click', () => openConversation(conversation));
    conversationList.appendChild(item);
  });
}

function renderConversation(conversation) {
  if (!chatArea) return;
  chatArea.replaceChildren();
  conversation.messages.forEach(({ from, text }) => {
    const message = document.createElement('div');
    message.className = from === 'me' ? 'm me' : 'm';
    const bubble = document.createElement('div');
    bubble.className = 'bub';
    const sender = document.createElement('b');
    sender.textContent = from === 'me' ? 'Você' : conversation.name;
    bubble.append(sender, document.createTextNode(text));
    if (from === 'them') {
      const avatar = document.createElement('div');
      avatar.className = 'av';
      avatar.textContent = conversation.avatar;
      message.appendChild(avatar);
    }
    message.appendChild(bubble);
    chatArea.appendChild(message);
  });

  const mineArea = document.createElement('div');
  mineArea.id = 'mine';
  chatArea.appendChild(mineArea);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function openConversation(conversation) {
  selectedConversation = conversation;
  if (threadName) threadName.textContent = conversation.name;
  if (threadHeader) threadHeader.hidden = false;
  if (conversationList) conversationList.hidden = true;
  if (messageThread) messageThread.hidden = false;
  renderConversation(conversation);
}

if (conversationList && messageThread && chatArea) {
  renderConversationList();

  chatTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      chatTabs.forEach((item) => item.classList.toggle('on', item === tab));
      selectedConversation = null;

      if (tab.dataset.chatTab === 'messages') {
        conversationList.hidden = false;
        messageThread.hidden = true;
        if (threadHeader) threadHeader.hidden = true;
        return;
      }

      conversationList.hidden = true;
      messageThread.hidden = false;
      if (threadHeader) threadHeader.hidden = true;
      chatArea.innerHTML = defaultThreadMarkup;
    });
  });

  if (backToConversations) {
    backToConversations.addEventListener('click', () => {
      conversationList.hidden = false;
      messageThread.hidden = true;
      if (threadHeader) threadHeader.hidden = true;
      renderConversationList();
    });
  }
}

// Enviar Mensagem no Chat
const sendBtn = document.getElementById('sendBtn');
const inputMsg = document.getElementById('mi');

if (sendBtn && inputMsg) {
  function send() {
    const text = inputMsg.value.trim();
    if (!text) return;

    let mineArea = document.getElementById('mine');
    if (!mineArea && selectedConversation && chatArea) {
      mineArea = document.createElement('div');
      mineArea.id = 'mine';
      chatArea.appendChild(mineArea);
    }
    if (!mineArea) {
      console.error('Não foi possível enviar a mensagem: área de mensagens não encontrada.');
      return;
    }

    const msgDiv = document.createElement('div');
    msgDiv.className = 'm me';
    const bubble = document.createElement('div');
    bubble.className = 'bub';
    const sender = document.createElement('b');
    sender.textContent = 'Você';
    bubble.appendChild(sender);
    bubble.appendChild(document.createTextNode(text));
    msgDiv.appendChild(bubble);
    mineArea.appendChild(msgDiv);
    if (selectedConversation) {
      selectedConversation.messages.push({ from: 'me', text });
      renderConversationList();
    }
    inputMsg.value = '';
    if (chatArea) {
      chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });
    }
  }

  sendBtn.addEventListener('click', send);
  inputMsg.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') send();
  });
}