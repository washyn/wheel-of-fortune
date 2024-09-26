export interface Persona {
  // id: number;
  nombre: string;
  color: string;
}
//

//////////////////////////////////////////////////////////////////////////////////////////////////////////
let nombresTemporales = [
  'Mairead',
  'Jalon',
  'Jude',
  'Gizelle',
  'Zayla',
  'Dov',
  'Garrett',
  'Azriel',
  'Trey',
  'Clyde',
  'Dex',
  'Ayra',
  'Kamaya',
  'Bricen',
  'Kaylei',
  'Loki',
  'Ivette',
  'Malcom',
  'Ezrah',
  'Jenika',
  'Jesiah',
  'Gilberto',
  'Evaline',
  'Kellen',
  'Khristian',
  'Dania',
  'Mateo',
  'Karas',
  'Sirena',
  'Lissette',
  'Tressa',
  'Michelle',
  'Calissa',
  'Ansleigh',
  'Maxine',
  'David',
  'Lovely',
  'Rhyan',
  'Rey',
  'Cannon',
  'Roshan',
  'Omere',
  'Simeon',
  'Taylan',
  'Karl',
  'Tyrese',
  'Mali',
  'Abella',
  'Abriella',
  'Mervin',
  'Talia',
  'Kori',
  'Daisy',
  'Cayleigh',
  'Cameron',
  'Abdallah',
  'Ocean',
  'Laine',
  'Domonic',
  'Ronaldo',
];

const randomNumberInt = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);
//////////////////////////////////////////////////////////////////////////////////////////////////////////

function initializeParticipantes() {
  let tempResult: Persona[] = [];
  let cantidad = randomNumberInt(5, 50);
  for (let index = 0; index < cantidad; index++) {
    let randIndex = randomNumberInt(1, nombresTemporales.length - 1);
    let nombre = nombresTemporales[randIndex];
    tempResult.push({
      nombre: nombre,
      color: tempResult.length % 2 == 0 ? '#030303' : '#EC1206',
    });
  }
  return tempResult;
}

let personas: Persona[] = [
  // { color: '#030303', nombre: 'dss' },
  // { color: '#EC1206', nombre: '10' },
  // { color: '#fb0', nombre: '200' },
  // { color: '#0fb', nombre: '50' },
  // { color: '#0fb', nombre: '50' },
  // { color: '#b0f', nombre: '100' },
  // { color: '#f0b', nombre: '5' },
  // { color: '#bf0', nombre: '500' },
];

const spinElement = document.querySelector('#spin') as HTMLDivElement;
const canvas = document.querySelector('#wheel') as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;
const resultText = document.querySelector('#resultText') as HTMLDivElement;

const dia = context.canvas.width;
const rad = dia / 2;
const PI = Math.PI;
const TAU = 2 * PI;

const friction: number = 0.991;
let velocidadAngular: number = 0;
let ang: number = 0;

const getIndex = (len: number) => Math.floor(len - (ang / TAU) * len) % len;
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Dibuja un sector de la ruleta
function drawElemets(elementItem: Persona, index: number, elements: Persona[]) {
  let arcoLocal = TAU / elements.length;
  const ang = arcoLocal * index;
  context.save();

  // Dibuja el color del sector
  context.beginPath();
  context.fillStyle = elementItem.color;
  context.moveTo(rad, rad);
  context.arc(rad, rad, rad, ang, ang + arcoLocal);
  context.lineTo(rad, rad);
  context.fill();

  // Dibuja el texto
  context.translate(rad, rad);
  context.rotate(ang + arcoLocal / 2);
  context.textAlign = 'right';
  context.fillStyle = '#fff';
  context.font = 'bold 30px sans-serif';
  context.fillText(elementItem.nombre.toUpperCase(), rad - 10, 10);

  context.restore();
}
// Rota la ruleta y actualiza el elemento seleccionado
function rotate() {
  const elementoSelecionado = personas[getIndex(personas.length)];
  context.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
  spinElement.textContent = !velocidadAngular ? 'GIRAR' : elementoSelecionado.nombre.toUpperCase();
  spinElement.style.background = elementoSelecionado.color;
  if (!velocidadAngular) {
    console.log('Elemento sorteado -> ' + elementoSelecionado.nombre.toUpperCase());
    resultText.textContent = elementoSelecionado.nombre.toUpperCase();
  }
}

// Controla la rotación de la ruleta en cada cuadro de animación
function frame() {
  if (!velocidadAngular) return;
  velocidadAngular *= friction; // Decrementa la velocidad por la fricción
  if (velocidadAngular < 0.002) velocidadAngular = 0; // Detiene la rotación
  ang += velocidadAngular; // Actualiza el ángulo
  ang %= TAU; // Normaliza el ángulo
  rotate();
}

// Motor de la animación
function engine(): void {
  frame();
  requestAnimationFrame(engine);
}

// Inicializa la ruleta y configura los eventos
function init(): void {
  personas = initializeParticipantes();
  personas.forEach(drawElemets);
  engine(); // Inicia la animación del motor
  spinElement.addEventListener('click', () => {
    if (!velocidadAngular) velocidadAngular = random(0.25, 0.45);
  });
}
// TODO: se puede crear otro botton para hacer la rotacion de la ruleta
// Inicialización
init();

// Agrega un nuevo elemento a la ruleta
function addElement(): void {
  personas.push({
    color: '#0fb',
    nombre: 'test',
  });
  personas.forEach(drawElemets);
}
