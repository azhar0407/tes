const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Karakter pemain
const player = {
    x: 50,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    color: '#00FF00',
    speed: 5
};

// Musuh
const enemy = {
    x: canvas.width - 100,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    color: '#FF0000',
    speed: 3
};

// Skor
let score = 0;

// Fungsi untuk menggambar karakter
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawEnemy() {
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

// Fungsi untuk menggambar skor
function drawScore() {
    ctx.fillStyle = '#FFF';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

// Fungsi untuk mengupdate posisi karakter
function updatePlayer() {
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
}

function updateEnemy() {
    enemy.x -= enemy.speed;
    if (enemy.x < 0) {
        enemy.x = canvas.width;
        score += 1; // Tambah skor setiap kali musuh melewati batas
    }
}

// Deteksi tabrakan
function checkCollision() {
    if (player.x < enemy.x + enemy.width &&
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y) {
        alert('Game Over! Skor kamu: ' + score);
        document.location.reload();
    }
}

// Input keyboard
const keys = {};
document.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});
document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updatePlayer();
    updateEnemy();
    drawPlayer();
    drawEnemy();
    drawScore();
    checkCollision();
    requestAnimationFrame(gameLoop);
}

gameLoop();