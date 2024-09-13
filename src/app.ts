export interface Persona {
  // id: number;
  nombre: string;
  color: string;
}

const personas: Persona[] = [
  { color: '#f82', nombre: 'dss' },
  { color: '#0bf', nombre: '10' },
  { color: '#fb0', nombre: '200' },
  { color: '#0fb', nombre: '50' },
  { color: '#0fb', nombre: '50' },
  { color: '#b0f', nombre: '100' },
  { color: '#f0b', nombre: '5' },
  { color: '#bf0', nombre: '500' },
];

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const spinElement = document.querySelector('#spin') as HTMLDivElement;
// const canvas = document.querySelector('#wheel') as HTMLCanvasElement;
// const context = canvas.getContext('2d') as CanvasRenderingContext2D;
const resultText = document.querySelector('#resultText') as HTMLDivElement;
