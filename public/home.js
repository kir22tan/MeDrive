window.addEventListener('DOMContentLoaded', () => {
  if (window.successMsg) {
    alert(window.successMsg);
  }
});

const slides = document.querySelectorAll('.slide');
let current = 0;

function showNextSlide() {
  slides[current].classList.toggle('active');
  current = (current + 1) % slides.length;
  slides[current].classList.toggle('active');
}

setInterval(showNextSlide, 3000);
