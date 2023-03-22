const loading_page = document.querySelector('.loading');
const loading_message = document.querySelector('.loading-message');

setInterval(() => {
  messages = [
    "We are loading your data.",
    "Animation here... And here...",
    "Omm, were i put your profile picture.",
    "Oh! Is here your profile picture.",
    "Study smarter and have fun.",
  ]

  loading_message.innerHTML = messages[Math.floor(Math.random() * messages.length)];
}, 3000);

document.addEventListener('DOMContentLoaded', () => {
  loading_page.style.display = 'none';
})