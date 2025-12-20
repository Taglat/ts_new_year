import './css/style.css'

const app = document.querySelector('#app');

window.addEventListener('load', () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'auto' // без анимации
  });
});
