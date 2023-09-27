import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#particules-canvas")!;

const ctx = canvas.getContext("2d")!;

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// création du fond noir qui fait toute la taille de l'écran

canvas.style.background = "#000000";
ctx.fillRect(0, 0, width, height);


// création de variables globales

let positionX: number;
let positionY: number;

// création d'un tableau vide pour pouvoir stocker les différents cercles par la suite

const arrayCircle: Circle[] = [];
let audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();


// La création d'une class Circle 
export class Circle {
    positionInitialeX: number;
    positionInitialeY: number;
    nouvellePositionX: number;
    nouvellePositionY: number;
    color: any;
    radius: number;


    //   Le constructeur de la class Circle
    constructor(
        positionInitialeX: number,
        positionInitialeY: number,
        nouvellePositionX: number,
        nouvellePositionY: number,
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
        return Math.floor(Math.random() * 20);
    }

    //   Méthode pour créer du mouvement (la position initiale devient la nouvelle position )
    movement() {

        
        this.positionInitialeX += this.nouvellePositionX;
        this.positionInitialeY += this.nouvellePositionY;

    }

    //   Méthode pour dessiner un cercle - utilisation de l'API canvas
    drawCircle(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = 0.3
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.positionInitialeX, this.positionInitialeY, this.radius * i, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();

        }
    }

}




// Création de l'oscillateur
const oscillator = audioContext.createOscillator();
oscillator.type = "square"; // Valeur possible (sine, square, triangle, sawtooth)
oscillator.frequency.setValueAtTime(300, audioContext.currentTime);

// Connexion de l'oscillateur à la destination audio
oscillator.connect(audioContext.destination);

// Fonction pour démarrer la chute de fréquence
function startChute() {
    const currentTime = audioContext.currentTime;
    oscillator.frequency.setValueAtTime(300, currentTime); // Définir la fréquence de départ

    const dureeChute = 1.0; // Durée de la chute en secondes
    const frequence = 0; // Fréquence à zéro pour ne plus rien entendre


    // Définir la fréquence minimale à la fin de la chute
    oscillator.frequency.linearRampToValueAtTime(frequence, currentTime + dureeChute);
}



// Création d'une fonction pour générer un nouveau cercle
function createNewCircle() {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 10;
    let nouvellePositionX = Math.cos(angle) * distance;
    let nouvellePositionY = Math.sin(angle) * distance;


    const circle = new Circle(
        positionX,
        positionY,
        nouvellePositionX,
        nouvellePositionY,

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


// Boucle pour créer de 10 nouveaux cercles
for (let i = 0; i < 10; i++) {
    createNewCircle();


}

// Fonction pour mettre à jour et dessiner les cercles
function updateAndDrawCircles() {
    ctx.clearRect(0, 0, width, height); // Efface le canvas à chaque mise à jour

    for (const circle of arrayCircle) {
        circle.movement();

        circle.drawCircle(ctx);


        // Vérifiez les limites du canvas
        if (circle.positionInitialeX < 0 || circle.positionInitialeX > width - 50) {
            circle.positionInitialeX = width / 2;
        }
        if (circle.positionInitialeY < 0 || circle.positionInitialeY > height - 50) {
            circle.positionInitialeY = height / 2;
        }

    }
    requestAnimationFrame(updateAndDrawCircles); // fonction spécifique de mise à jour de l'animation, avant le prochain rafraîchissement à l'écran du navigateur

}

updateAndDrawCircles(); // Démarrer l'animation






