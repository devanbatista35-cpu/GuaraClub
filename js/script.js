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

// Enviar Mensagem no Chat
const sendBtn = document.getElementById('sendBtn');
const inputMsg = document.getElementById('mi');

if (sendBtn && inputMsg) {
  function send() {
    const text = inputMsg.value.trim();
    if (!text) return;

    const mineArea = document.getElementById('mine');
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
    inputMsg.value = '';
  }

  sendBtn.addEventListener('click', send);
  inputMsg.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') send();
  });
}