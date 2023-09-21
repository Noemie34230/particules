import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#particules-canvas")!;

const ctx = canvas.getContext("2d")!;

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, width, height);

//On signale le début du chemin avec beginPath(), pour éviter les débordements du traits

// cercle en bas à gauche
ctx.fillStyle = "#ff0000";
ctx.beginPath();
ctx.arc(30, height - 30, 20, 0, 2 * Math.PI); //on utilise arc(corrdonnées X, Y et rayon, angle de départ, angle d'arrivée)
ctx.fill(); // Remplissez le cercle

// Cercle en bas à droite
ctx.fillStyle = "#ff0000"; 
ctx.beginPath();
ctx.arc(width - 30, height - 30, 20, 0, 2 * Math.PI); 
ctx.fill(); // Remplissez le cercle

// Cercle en haut à gauche
ctx.fillStyle = "#ff0000";
ctx.beginPath();
ctx.arc(30, 30, 20, 0, 2 * Math.PI); 
ctx.fill(); // Remplissez le cercle

// Cercle en haut à droite
ctx.fillStyle = "#ff0000"; 
ctx.beginPath();
ctx.arc(width - 30, 30, 20, 0, 2 * Math.PI); 
ctx.fill(); 




