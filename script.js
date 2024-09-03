document.querySelectorAll('.menu ul li a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetPlanet = document.querySelector(`.planet${this.getAttribute('href').replace('#', '')}`);
    targetPlanet.style.transform = 'scale(2) translateX(100px)';
  });
});
