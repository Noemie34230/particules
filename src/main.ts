import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#particules-canvas")!;

const ctx = canvas.getContext("2d")!;
ctx.fillStyle = "#000000";
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);



canvas.style.background = "#000000";
ctx.fillRect(0, 0, width, height);

// création de variables globales

let positionX: number;
let positionY: number;

// création d'un tableau vide pour pouvoir stocker les différents cercles par la suite

const arrayCircle: Circle[] = [];


let audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();


// Création de l'oscillateur
const oscillator = audioContext.createOscillator();
oscillator.type = "square"; // Valeur possible (sine, square, triangle, sawtooth)
oscillator.frequency.setValueAtTime(340, audioContext.currentTime);

// Connexion de l'oscillateur à la destination audio
oscillator.connect(audioContext.destination);

// Fonction pour démarrer la chute de fréquence
function startChute() {
    const currentTime = audioContext.currentTime;
    oscillator.frequency.setValueAtTime(340, currentTime); // Définir la fréquence de départ

    const dureeChute = 3.0; // Durée de la chute en secondes
    const frequence = 0; // Fréquence à zéro pour ne plus rien entendre


    // Définir la fréquence minimale à la fin de la chute
    oscillator.frequency.linearRampToValueAtTime(frequence, currentTime + dureeChute);
}


// La création d'une class Circle permet d'avoir un "moule " pour que tous les cercles soient pareils
export class Circle {
    positionInitialeX: number;
    positionInitialeY: number;
    nouvellePositionX: number;
    nouvellePositionY: number;
    color: any;
    radius: number;

    //   Le constructeur est comme la "recette" qu'on doit suivre 
    constructor(
        positionInitialeX: number,
        positionInitialeY: number,
        nouvellePositionX: number,
        nouvellePositionY: number
    ) {
        this.positionInitialeX = positionInitialeX;
        this.positionInitialeY = positionInitialeY;
        this.nouvellePositionX = nouvellePositionX;
        this.nouvellePositionY = nouvellePositionY;
        this.color = this.generateColor();
        this.radius = this.generateRadius();
    }

    //   Méthode pour permettre de créer une couleur aléatoire des cercles
    generateColor() {
        return "#" + Math.random().toString(16).slice(2, 8);
    }

    //   Méthode pour permettre de créer un rayon aléatoire des cercles
    generateRadius() {
        return Math.floor(Math.random() * 100);
    }

    //   Méthode pour créer du mouvement (la position initiale devient la nouvelle position )
    movement() {
        this.positionInitialeX += this.nouvellePositionX;
        this.positionInitialeY += this.nouvellePositionY;
    }

    //   Méthode pour créer un cercle - utilisation de l'API canvas
    drawCircle(ctx: CanvasRenderingContext2D) {
        
        // for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        
        ctx.arc(this.positionInitialeX, this.positionInitialeY, this.radius , 0, 2 * Math.PI);

        ctx.fill();
        ctx.closePath();
        // }
    }
}

// Création d'une fonction pour générer un nouveau cercle
function createNewCircle() {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 10;

    // ctx.globalAlpha = Math.random();
    let nouvellePositionX = Math.cos(angle) * distance;
    let nouvellePositionY = Math.sin(angle) * distance;

    const circle = new Circle(
        positionX,
        positionY,
        nouvellePositionX,
        nouvellePositionY
    );
    //  Cela permet de stocker les cercles dans le tableau de cercles
    arrayCircle.push(circle);


    //  Cela permet d'écouter le clique de la souris et de récupérer la position de la souris
    let soundActivated = false;

    canvas.addEventListener("click", (e) => {
        
        e.preventDefault;
        
        positionX = e.clientX;
        positionY = e.clientY;
        createNewCircle();
        // Si le son n'a pas encore été activé, activez-le
        if (!soundActivated) {
            startChute();
            soundActivated = true;
        }

        oscillator.start(audioContext.currentTime);
        startChute();


    });

}

// Boucle pour créer de nouveaux cercles
for (let i = 0; i < 20; i++) {
    createNewCircle();
}

// Fonction pour mettre à jour et dessiner les cercles
function updateAndDrawCircles() {
    ctx.clearRect(0, 0, width, height); // Efface le canvas à chaque mise à jour

    for (const circle of arrayCircle) {
        circle.movement();
        circle.drawCircle(ctx);
    }



    requestAnimationFrame(updateAndDrawCircles); // Appel récursif pour l'animation
}

updateAndDrawCircles(); // Démarrer l'animation





