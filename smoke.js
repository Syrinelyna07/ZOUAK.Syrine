const canvas = document.getElementById('smoke-canvas');
const ctx = canvas.getContext('2d');

canvas.style.cssText = `
  position: fixed; top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none; z-index: 9999;
`;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let particles = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 18 + 6;
    this.speedX = (Math.random() - 0.5) * 1.5;
    this.speedY = -Math.random() * 1.8 - 0.5;
    this.life = 1;
    this.decay = Math.random() * 0.018 + 0.008;
    // couleurs dans les tons violet/bleu de ton site
    const colors = ['#ab69fc', '#72a1de', '#6600c5', '#966dff'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size *= 0.97;
    this.life -= this.decay;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.life * 0.45;
    const grad = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size
    );
    grad.addColorStop(0, this.color);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

document.addEventListener('mousemove', (e) => {
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(e.clientX, e.clientY));
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();
