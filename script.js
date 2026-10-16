const nave = document.getElementById('nave');
const contenedor = document.getElementById('game-container');

// Propiedades físicas de la nave
let posX = 365;
let posY = 215;
let velX = 0;
let velY = 0;

const aceleracion = 0.5;   // Qué tan rápido acelera la nave
const friccion = 0.92;     // Fricción del espacio (entre 0 y 1, más cerca de 1 frena más lento)
const velocidadMax = 7;    // Velocidad máxima permitida

// Registro de teclas presionadas
const teclas = {};

window.addEventListener('keydown', (e) => {
    teclas[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (e) => {
    teclas[e.key.toLowerCase()] = false;
});

function actualizar() {
    // Control de movimiento por teclado (WASD o Flechas)
    if (teclas['w'] || teclas['arrowup']) velY -= aceleracion;
    if (teclas['s'] || teclas['arrowdown']) velY += aceleracion;
    if (teclas['a'] || teclas['arrowleft']) velX -= aceleracion;
    if (teclas['d'] || teclas['arrowright']) velX += aceleracion;

    // Aplicar límites de velocidad máxima
    velX = Math.max(-velocidadMax, Math.min(velocidadMax, velX));
    velY = Math.max(-velocidadMax, Math.min(velocidadMax, velY));

    // Aplicar fricción (reduce la velocidad gradualmente si no se presiona nada)
    velX *= friccion;
    velY *= friccion;

    // Actualizar posición en pantalla
    posX += velX;
    posY += velY;

    // Límites de la pantalla (Chocar contra las paredes del contenedor)
    const anchoContenedor = contenedor.clientWidth;
    const altoContenedor = contenedor.clientHeight;
    const anchoNave = nave.clientWidth;
    const altoNave = nave.clientHeight;

    if (posX < 0) {
        posX = 0;
        velX = -velX * 0.5; // Rebote suave opcional
    }
    if (posX > anchoContenedor - anchoNave) {
        posX = anchoContenedor - anchoNave;
        velX = -velX * 0.5;
    }
    if (posY < 0) {
        posY = 0;
        velY = -velY * 0.5;
    }
    if (posY > altoContenedor - altoNave) {
        posY = altoContenedor - altoNave;
        velY = -velY * 0.5;
    }

    // Aplicar las coordenadas calculadas al estilo visual de la nave
    nave.style.left = posX + 'px';
    nave.style.top = posY + 'px';

    // Bucle de animación
    requestAnimationFrame(actualizar);
}

// Iniciar bucle
requestAnimationFrame(actualizar);
