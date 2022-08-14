/**@type {HTMLCanvasElement}*/
const cnv = document.getElementById("cnv");
const ctx = cnv.getContext("2d");

cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

const pArray = [];
// drawing coordinates x & y
let x = undefined;
let y = undefined;

const color = `hsl(${Math.random() * 255}, 50%, 50%)`;
window.addEventListener("resize", function () {
  cnv.width = window.innerWidth;
  cnv.height = window.innerHeight;
});

let grad = 0;
window.addEventListener("mousemove", function (e) {
  x = e.clientX;
  y = e.clientY;
  grad += 5;
  for (let i = 0; i < 2; i++) {
    pArray.push(new Particle());
  }
});
window.addEventListener("click", function (e) {
  x = e.clientX;
  y = e.clientY;

  for (let i = 0; i < 25; i++) {
    pArray.push(new Particle());
  }
});

class Particle {
  constructor() {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${grad}, 70%, 50%)`;
  }
  update() {
    this.x += this.speedX * 2;
    this.y += this.speedY * 2;
    this.grad += 10;
    //this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    if (this.size > 0.2) this.size -= 0.05;
    this.draw();
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handelParticles() {
  for (let i = 0; i < pArray.length; i++) {
    pArray[i].update();

    for (let j = i; j < pArray.length; j++) {
      const dx = pArray[i].x - pArray[j].x;
      const dy = pArray[i].y - pArray[j].y;
      const dh = Math.sqrt(dx * dx + dy * dy);

      if (dh < 100) {
        ctx.beginPath();
        ctx.strokeStyle = pArray[i].color;
        ctx.moveTo(pArray[i].x, pArray[i].y);
        ctx.lineTo(pArray[j].x, pArray[j].y);
        ctx.stroke();
      }
    }
    if (pArray[i].size <= 0.3) {
      pArray.splice(i, 1);
      i--;
    }
  }
}
function animet() {
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  handelParticles();
  requestAnimationFrame(animet);
}
animet();
