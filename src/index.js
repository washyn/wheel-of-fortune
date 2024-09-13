const elementos = [
  { color: '#f82', label: 'dss' },
  { color: '#0bf', label: '10' },
  { color: '#fb0', label: '200' },
  { color: '#0fb', label: '50' },
  { color: '#b0f', label: '100' },
  { color: '#f0b', label: '5' },
  { color: '#bf0', label: '500' },
];

const rand = (min, max) => Math.random() * (max - min) + min;
const totalElementos = elementos.length;
const spinElement = document.querySelector('#spin');
const context = document.querySelector('#wheel').getContext('2d');
const dia = context.canvas.width;
const rad = dia / 2;
const PI = Math.PI;
const TAU = 2 * PI;
const arc = TAU / elementos.length;

const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
let velocidadAngular = 0; // Angular velocity
let ang = 0; // Angle in radians

const getIndex = () => Math.floor(totalElementos - (ang / TAU) * totalElementos) % totalElementos;

function drawSector(elementItem, index) {
  const ang = arc * index;
  context.save();
  // COLOR
  context.beginPath();
  context.fillStyle = elementItem.color;
  context.moveTo(rad, rad);
  context.arc(rad, rad, rad, ang, ang + arc);
  context.lineTo(rad, rad);
  context.fill();
  // TEXT
  context.translate(rad, rad);
  context.rotate(ang + arc / 2);
  context.textAlign = 'right';
  context.fillStyle = '#fff';
  context.font = 'bold 30px sans-serif';
  context.fillText(elementItem.label, rad - 10, 10);
  //
  context.restore();
}

function rotate() {
  const elementoSelecionado = elementos[getIndex()];
  context.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
  spinElement.textContent = !velocidadAngular ? 'GIRAR' : elementoSelecionado.label;
  spinElement.style.background = elementoSelecionado.color;
}

function frame() {
  if (!velocidadAngular) return;
  velocidadAngular *= friction; // Decrement velocity by friction
  if (velocidadAngular < 0.002) velocidadAngular = 0; // Bring to stop
  ang += velocidadAngular; // Update angle
  ang %= TAU; // Normalize angle
  rotate();
}

function engine() {
  frame();
  requestAnimationFrame(engine);
}

function init() {
  elementos.forEach(drawSector);
  rotate(); // Initial rotation
  engine(); // Start engine
  spinElement.addEventListener('click', () => {
    if (!velocidadAngular) velocidadAngular = rand(0.25, 0.45);
  });
}

init();
