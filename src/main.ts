import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#particules-canvas")!;

const ctx = canvas.getContext("2d")!;
ctx.fillStyle = "#000000";
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

canvas.style.background = "#000000";
ctx.fillRect(0, 0, width, height);

// variable pour le premier cercle
let circle1X = width - 30;
let circle1Y = 30;

// variable pour le deuxième cercle
let circle2X = 30 ;
let circle2Y = height -30 ;


// variable pour le troisième cercle
let circle3X = 30 ;
let circle3Y =  30;

// variable pour le quatrième cercle
let circle4X = width - 30 ;
let circle4Y = height -30 ;

//On signale le début du chemin avec beginPath(), pour éviter les débordements du traits





function animationY(){

// Le cercle 1 descend le long de Y
    circle1Y ++;
 // Le cercle 2 remonte le long de Y   
    circle2Y --;


 ctx.clearRect(0,0, width,height);



ctx.fillStyle = "#ff0000";

// Cercle 1 en haut à droite (width, 30)
ctx.beginPath();
ctx.arc(circle1X, circle1Y, 20, 0, 2 * Math.PI); //on utilise arc(corrdonnées X, Y et rayon, angle de départ, angle d'arrivée)
ctx.fill(); // Remplissez le cercle
ctx.closePath();

// Cercle 2 en bas à gauche (30, heigth)
ctx.fillStyle = "#ff0000";
ctx.beginPath();
ctx.arc(circle2X, circle2Y , 20, 0, 2 * Math.PI); 
ctx.fill(); // Remplissez le cercle
ctx.closePath();

    // On définit les limites de sortie des cercles pour ne pas sortir du canvas

if (circle1Y > height -30|| circle1Y < 0) {
    circle1Y = 30;
}

if (circle2Y > height -30 || circle2Y < 0) {
    circle2Y =  height-30;
}


}
addEventListener('mousemove',(e) =>{
    circle1X = e.clientX;
    circle1Y = e.clientY;
    circle2X = e.clientX;
    circle2Y = e.clientY;
    e.preventDefault

    setInterval(animationY, 30);
});




function animationX(){


    // Le cercle 3 part vers la droite le long de X     
        circle3X ++;
    // Le cercle 3 part vers la gauche le long de X  
        circle4X --;
    
    // ctx.clearRect(0,0, width,height);
    
    
    

    
    // Cercle 3 en haut à gauche (30,30)
    
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(circle3X, circle3Y, 20, 0, 2 * Math.PI); 
    ctx.fill(); // Remplissez le cercle
    ctx.closePath();
    
    // Cercle 4 en bas à droite (width,height)
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(circle4X, circle4Y, 20, 0, 2 * Math.PI); 
    ctx.fill(); 
    ctx.closePath();

    // On définit les limites de sortie des cercles pour ne pas sortir du canvas

    if (circle3X > width - 30 || circle3X < 0) {
        circle3X = 30;
    }
    
    if (circle4X > width - 30|| circle4X < 0) {
        circle4X = width - 30;
    }
    
    }

    addEventListener('mousemove',(e) =>{
        circle3X = e.clientX;
        circle3Y = e.clientY;
        circle4X = e.clientX;
        circle4Y = e.clientY;
        e.preventDefault
        setInterval(animationX, 30);
    })
    

