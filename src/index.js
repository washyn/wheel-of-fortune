const elementos = [
  { color: '#f82', label: 'dss' },
  { color: '#0bf', label: '10' },
  { color: '#fb0', label: '200' },
  { color: '#0fb', label: '50' },
  { color: '#0fb', label: '50' },
  { color: '#b0f', label: '100' },
  { color: '#f0b', label: '5' },
  { color: '#bf0', label: '500' },
];

const spinElement = document.querySelector('#spin');
const context = document.querySelector('#wheel').getContext('2d');
const resultText = document.querySelector('#resultText');

const dia = context.canvas.width;
const rad = dia / 2;
const PI = Math.PI;
const TAU = 2 * PI;

const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
let velocidadAngular = 0; // Angular velocity
let ang = 0; // Angle in radians

const getIndex = len => Math.floor(len - (ang / TAU) * len) % len;
const rand = (min, max) => Math.random() * (max - min) + min;

// puede reciribir los 3 elementos y en base al tercer elemento que sea el elementos length
function drawSector(elementItem, index, array) {
  console.log(arguments[0], arguments[1], arguments[2]);

  let arcoLocal = TAU / elementos.length;
  const ang = arcoLocal * index;
  context.save();
  // COLOR
  context.beginPath();
  context.fillStyle = elementItem.color;
  context.moveTo(rad, rad);
  context.arc(rad, rad, rad, ang, ang + arcoLocal);
  context.lineTo(rad, rad);
  context.fill();
  // TEXT
  context.translate(rad, rad);
  context.rotate(ang + arcoLocal / 2);
  context.textAlign = 'right';
  context.fillStyle = '#fff';
  context.font = 'bold 30px sans-serif';
  context.fillText(elementItem.label.toUpperCase(), rad - 10, 10);
  //
  context.restore();
}

// duplicar esta funcion para tener un duplicado de la funcion inicial...
function rotate() {
  const elementoSelecionado = elementos[getIndex(elementos.length)];
  context.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
  spinElement.textContent = !velocidadAngular ? 'GIRAR' : elementoSelecionado.label.toUpperCase();
  spinElement.style.background = elementoSelecionado.color;
  if (!velocidadAngular) {
    console.log('elemento sorteado -> ' + elementoSelecionado.label.toUpperCase());
    resultText.textContent = elementoSelecionado.label.toUpperCase();
  }
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
  // rotate(); // Initial rotation , llamado para rotacion inicial y selecionar el elemento por default...
  engine(); // Start engine animation
  spinElement.addEventListener('click', () => {
    if (!velocidadAngular) velocidadAngular = rand(0.25, 0.45);
  });
}

function addElement() {
  console.log('add ele');
  elementos.push({
    color: '#0fb',
    label: 'test',
  });
  console.log(elementos.length);
  elementos.forEach(drawSector);
}

init();
