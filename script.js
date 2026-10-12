// Game Data
const games = {
    retro: [
        {
            id: 'snake',
            name: 'Snake',
            emoji: '🐍',
            description: 'Klasik game snake tahun 80an',
            year: '1976'
        },
        {
            id: 'pong',
            name: 'Pong',
            emoji: '🏓',
            description: 'Permainan ping-pong dua pemain',
            year: '1972'
        },
        {
            id: 'spaceinvaders',
            name: 'Space Invaders',
            emoji: '👾',
            description: 'Tembak musuh dari luar angkasa',
            year: '1978'
        },
        {
            id: 'mario',
            name: 'Mario Bros',
            emoji: '🍄',
            description: 'Lompati platform dan musuh',
            year: '1983'
        },
        {
            id: 'pacman',
            name: 'Pac-Man',
            emoji: '👹',
            description: 'Kumpulkan titik, hindari hantu',
            year: '1980'
        },
        {
            id: 'tetris',
            name: 'Tetris',
            emoji: '🧩',
            description: 'Tumpuk balok berputar',
            year: '1984'
        }
    ],
    modern: [
        {
            id: 'whackmole',
            name: 'Whack-a-Mole',
            emoji: '🔨',
            description: 'Pukul tikus yang muncul',
            year: '2024'
        },
        {
            id: 'reactiontest',
            name: 'Reaction Test',
            emoji: '⚡',
            description: 'Tes kecepatan refleksmu',
            year: '2024'
        },
        {
            id: 'balloonpop',
            name: 'Balloon Pop',
            emoji: '🎈',
            description: 'Pecahkan balon sebelum jatuh',
            year: '2024'
        },
        {
            id: 'flappybird',
            name: 'Flappy Bird',
            emoji: '🐦',
            description: 'Terbang hindari pipa',
            year: '2013'
        },
        {
            id: 'rockpaperscissors',
            name: 'Rock Paper Scissors',
            emoji: '✋',
            description: 'Bermain melawan komputer',
            year: '2024'
        },
        {
            id: 'memorycard',
            name: 'Memory Card',
            emoji: '🧠',
            description: 'Temukan pasangan kartu',
            year: '2024'
        }
    ]
};

// Initialize games on load
document.addEventListener('DOMContentLoaded', () => {
    renderGames();
    setupModal();
    setupHamburger();
});

// Render games grid
function renderGames() {
    renderGameCategory('retroGames', games.retro);
    renderGameCategory('modernGames', games.modern);
}

function renderGameCategory(elementId, gameList) {
    const container = document.getElementById(elementId);
    container.innerHTML = gameList.map(game => `
        <div class="game-card" onclick="openGame('${game.id}')">
            <div class="game-thumb">${game.emoji}</div>
            <div class="game-info">
                <div class="game-title">${game.name}</div>
                <div class="game-desc">${game.description}</div>
                <div style="font-size: 0.8rem; color: #999; margin-top: 0.3rem;">${game.year}</div>
            </div>
        </div>
    `).join('');
}

// Modal handling
function setupModal() {
    const modal = document.getElementById('gameModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', closeGame);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeGame();
    });
}

function openGame(gameId) {
    const modal = document.getElementById('gameModal');
    const gameContainer = document.getElementById('gameContainer');
    
    gameContainer.innerHTML = getGameHTML(gameId);
    modal.classList.add('show');
    
    // Initialize game after rendering
    setTimeout(() => {
        initializeGame(gameId);
    }, 100);
}

function closeGame() {
    const modal = document.getElementById('gameModal');
    modal.classList.remove('show');
    document.getElementById('gameContainer').innerHTML = '';
}

function scrollToGames() {
    document.getElementById('games').scrollIntoView({ behavior: 'smooth' });
}

// Hamburger menu
function setupHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Game HTML & Logic
function getGameHTML(gameId) {
    const games_map = {
        snake: `
            <h2>🐍 Snake Game</h2>
            <canvas id="snakeCanvas" width="400" height="400" style="border: 2px solid #f9d000; background: #000; display: block; margin: 1rem auto;"></canvas>
            <div style="text-align: center; color: #ccc;">
                <p>Score: <span id="snakeScore">0</span></p>
                <p style="font-size: 0.9rem;">Gunakan Arrow Keys atau WASD untuk bergerak</p>
            </div>
        `,
        pong: `
            <h2>🏓 Pong Game</h2>
            <canvas id="pongCanvas" width="600" height="400" style="border: 2px solid #f9d000; background: #000; display: block; margin: 1rem auto;"></canvas>
            <div style="text-align: center; color: #ccc;">
                <p>P1: W/S | P2: Arrow Up/Down</p>
                <p id="pongScore" style="font-size: 1.2rem; color: #f9d000;">0 - 0</p>
            </div>
        `,
        spaceinvaders: `
            <h2>👾 Space Invaders</h2>
            <canvas id="spaceCanvas" width="600" height="500" style="border: 2px solid #f9d000; background: #000; display: block; margin: 1rem auto;"></canvas>
            <div style="text-align: center; color: #ccc;">
                <p>Score: <span id="spaceScore">0</span></p>
                <p style="font-size: 0.9rem;">Arrow Keys untuk gerak, Space untuk tembak</p>
            </div>
        `,
        mario: `
            <h2>🍄 Mario Bros</h2>
            <canvas id="marioCanvas" width="800" height="400" style="border: 2px solid #f9d000; background: linear-gradient(180deg, #87CEEB 0%, #E0F6FF 100%); display: block; margin: 1rem auto;"></canvas>
            <div style="text-align: center; color: #000;">
                <p>Score: <span id="marioScore">0</span> | Lives: <span id="marioLives">3</span></p>
                <p style="font-size: 0.9rem;">Arrow Keys untuk gerak, Space untuk lompat</p>
            </div>
        `,
        pacman: `
            <h2>👹 Pac-Man</h2>
            <canvas id="pacmanCanvas" width="420" height="420" style="border: 2px solid #f9d000; background: #000; display: block; margin: 1rem auto;"></canvas>
            <div style="text-align: center; color: #ccc;">
                <p>Score: <span id="pacmanScore">0</span></p>
                <p style="font-size: 0.9rem;">Arrow Keys untuk bergerak</p>
            </div>
        `,
        tetris: `
            <h2>🧩 Tetris</h2>
            <div style="display: flex; gap: 2rem; justify-content: center; align-items: flex-start;">
                <div>
                    <canvas id="tetrisCanvas" width="200" height="400" style="border: 2px solid #f9d000; background: #000; display: block;"></canvas>
                </div>
                <div style="color: #ccc;">
                    <p><strong>Score:</strong> <span id="tetrisScore">0</span></p>
                    <p><strong>Level:</strong> <span id="tetrisLevel">1</span></p>
                    <p style="margin-top: 1rem; font-size: 0.9rem;">
                        A/D: Gerak<br>W: Rotasi<br>S: Jatuh
                    </p>
                </div>
            </div>
        `,
        whackmole: `
            <h2>🔨 Whack-a-Mole</h2>
            <div style="text-align: center; margin: 1rem 0;">
                <p style="font-size: 1.2rem; color: #f9d000; margin-bottom: 1rem;">Score: <span id="moleScore">0</span></p>
                <p style="color: #ccc; margin-bottom: 1rem;">Time: <span id="moleTimer">30</span>s</p>
                <div id="moleGrid" style="display: grid; grid-template-columns: repeat(3, 100px); gap: 10px; justify-content: center; margin: 1rem 0;"></div>
            </div>
        `,
        reactiontest: `
            <h2>⚡ Reaction Test</h2>
            <div style="text-align: center; padding: 2rem;">
                <div id="reactionBox" style="width: 300px; height: 300px; margin: 0 auto; background: #222; border: 3px solid #f9d000; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                    <p id="reactionText" style="color: #ccc; font-size: 1.1rem;">Tekan tombol mulai</p>
                </div>
                <button id="reactionStart" class="cta-button" style="margin-top: 1.5rem;">Mulai Test</button>
                <p id="reactionResult" style="color: #f9d000; font-size: 1.3rem; margin-top: 1rem; min-height: 30px;"></p>
            </div>
        `,
        balloonpop: `
            <h2>🎈 Balloon Pop</h2>
            <div style="text-align: center; margin: 1rem 0;">
                <p style="font-size: 1.2rem; color: #f9d000;">Score: <span id="balloonScore">0</span></p>
                <p style="color: #ccc; margin-bottom: 1rem;">Balon tersisa: <span id="balloonCount">10</span></p>
                <div id="balloonContainer" style="width: 100%; height: 400px; position: relative; background: linear-gradient(180deg, #87CEEB 0%, #E0F6FF 100%); border: 2px solid #f9d000; border-radius: 10px; overflow: hidden;"></div>
            </div>
        `,
        flappybird: `
            <h2>🐦 Flappy Bird</h2>
            <canvas id="flappyCanvas" width="400" height="500" style="border: 2px solid #f9d000; background: linear-gradient(180deg, #87CEEB 0%, #E0F6FF 100%); display: block; margin: 1rem auto;"></canvas>
            <div style="text-align: center; color: #000;">
                <p>Score: <span id="flappyScore">0</span></p>
                <p style="font-size: 0.9rem;">Klik atau tekan SPACE untuk terbang</p>
            </div>
        `,
        rockpaperscissors: `
            <h2>✋ Rock Paper Scissors</h2>
            <div style="text-align: center; padding: 2rem;">
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; max-width: 400px; margin: 0 auto 2rem;">
                    <button class="choice-btn" onclick="playRPS('rock')" style="padding: 1rem; font-size: 2rem; background: #222; border: 2px solid #f9d000; cursor: pointer; border-radius: 8px;">🪨</button>
                    <button class="choice-btn" onclick="playRPS('paper')" style="padding: 1rem; font-size: 2rem; background: #222; border: 2px solid #f9d000; cursor: pointer; border-radius: 8px;">📄</button>
                    <button class="choice-btn" onclick="playRPS('scissors')" style="padding: 1rem; font-size: 2rem; background: #222; border: 2px solid #f9d000; cursor: pointer; border-radius: 8px;">✂️</button>
                </div>
                <p id="rpsResult" style="color: #f9d000; font-size: 1.2rem; min-height: 60px;"></p>
                <p style="color: #ccc;">Your: <span id="rpsYour">0</span> | Computer: <span id="rpsComp">0</span></p>
            </div>
        `,
        memorycard: `
            <h2>🧠 Memory Card</h2>
            <div style="text-align: center; padding: 1rem;">
                <p style="color: #ccc; margin-bottom: 1rem;">Moves: <span id="memoryMoves">0</span> | Pairs: <span id="memoryPairs">0</span>/8</p>
                <div id="memoryGrid" style="display: grid; grid-template-columns: repeat(4, 80px); gap: 8px; justify-content: center;"></div>
                <button class="cta-button" style="margin-top: 1.5rem;" onclick="resetMemoryGame()">Reset Game</button>
            </div>
        `
    };
    
    return games_map[gameId] || '<p>Game tidak ditemukan</p>';
}

function initializeGame(gameId) {
    const initializers = {
        snake: initSnake,
        pong: initPong,
        spaceinvaders: initSpaceInvaders,
        mario: initMario,
        pacman: initPacman,
        tetris: initTetris,
        whackmole: initWhackMole,
        reactiontest: initReactionTest,
        balloonpop: initBalloonPop,
        flappybird: initFlappyBird,
        rockpaperscissors: () => {
            window.rpsScore = { player: 0, computer: 0 };
        },
        memorycard: initMemoryGame
    };
    
    if (initializers[gameId]) {
        initializers[gameId]();
    }
}

// ============ GAME IMPLEMENTATIONS ============

// SNAKE GAME
function initSnake() {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    let snake = [{x: 10, y: 10}];
    let food = {x: 15, y: 15};
    let direction = {x: 1, y: 0};
    let nextDirection = {x: 1, y: 0};
    let score = 0;
    let gameRunning = true;

    document.addEventListener('keydown', (e) => {
        if (e.key.startsWith('Arrow')) {
            e.preventDefault();
            if (e.key === 'ArrowLeft' && direction.x === 0) nextDirection = {x: -1, y: 0};
            if (e.key === 'ArrowRight' && direction.x === 0) nextDirection = {x: 1, y: 0};
            if (e.key === 'ArrowUp' && direction.y === 0) nextDirection = {x: 0, y: -1};
            if (e.key === 'ArrowDown' && direction.y === 0) nextDirection = {x: 0, y: 1};
        }
    });

    function gameLoop() {
        direction = nextDirection;
        const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || snake.some(s => s.x === head.x && s.y === head.y)) {
            gameRunning = false;
            alert(`Game Over! Score: ${score}`);
            return;
        }

        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            food = {x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20)};
            document.getElementById('snakeScore').textContent = score;
        } else {
            snake.pop();
        }

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#f9d000';
        snake.forEach(s => ctx.fillRect(s.x * gridSize, s.y * gridSize, gridSize - 2, gridSize - 2));

        ctx.fillStyle = '#ff6b6b';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

        if (gameRunning) setTimeout(gameLoop, 100);
    }

    gameLoop();
}

// PONG GAME
function initPong() {
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');
    
    const paddleHeight = 80;
    const paddleWidth = 10;
    const ballSize = 8;
    
    let p1 = {y: canvas.height / 2 - paddleHeight / 2, score: 0};
    let p2 = {y: canvas.height / 2 - paddleHeight / 2, score: 0};
    let ball = {x: canvas.width / 2, y: canvas.height / 2, vx: 5, vy: 5};
    
    const keys = {};
    
    document.addEventListener('keydown', (e) => keys[e.key] = true);
    document.addEventListener('keyup', (e) => keys[e.key] = false);
    
    function draw() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw paddles
        ctx.fillStyle = '#f9d000';
        ctx.fillRect(0, p1.y, paddleWidth, paddleHeight);
        ctx.fillRect(canvas.width - paddleWidth, p2.y, paddleWidth, paddleHeight);
        
        // Draw ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw center line
        ctx.strokeStyle = 'rgba(249, 208, 0, 0.3)';
        for (let i = 0; i < canvas.height; i += 20) {
            ctx.strokeRect(canvas.width / 2 - 1, i, 2, 10);
        }
    }
    
    function update() {
        if (keys['w'] && p1.y > 0) p1.y -= 6;
        if (keys['s'] && p1.y < canvas.height - paddleHeight) p1.y += 6;
        if (keys['ArrowUp'] && p2.y > 0) p2.y -= 6;
        if (keys['ArrowDown'] && p2.y < canvas.height - paddleHeight) p2.y += 6;
        
        ball.x += ball.vx;
        ball.y += ball.vy;
        
        if (ball.y - ballSize < 0 || ball.y + ballSize > canvas.height) ball.vy *= -1;
        
        if (ball.x - ballSize < paddleWidth && ball.y > p1.y && ball.y < p1.y + paddleHeight) {
            ball.vx *= -1;
            ball.x = paddleWidth + ballSize;
        }
        
        if (ball.x + ballSize > canvas.width - paddleWidth && ball.y > p2.y && ball.y < p2.y + paddleHeight) {
            ball.vx *= -1;
            ball.x = canvas.width - paddleWidth - ballSize;
        }
        
        if (ball.x < 0) {
            p2.score++;
            ball = {x: canvas.width / 2, y: canvas.height / 2, vx: 5, vy: 5};
        }
        
        if (ball.x > canvas.width) {
            p1.score++;
            ball = {x: canvas.width / 2, y: canvas.height / 2, vx: -5, vy: 5};
        }
        
        document.getElementById('pongScore').textContent = `${p1.score} - ${p2.score}`;
    }
    
    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
    
    gameLoop();
}

// SPACE INVADERS GAME
function initSpaceInvaders() {
    const canvas = document.getElementById('spaceCanvas');
    const ctx = canvas.getContext('2d');
    
    let player = {x: canvas.width / 2 - 20, y: canvas.height - 50, width: 40, height: 40, score: 0};
    let bullets = [];
    let enemies = [];
    let gameActive = true;
    
    for (let i = 0; i < 8; i++) {
        enemies.push({x: i * 70 + 10, y: 20, width: 40, height: 40, vx: 2});
    }
    
    const keys = {};
    document.addEventListener('keydown', (e) => {
        keys[e.key] = true;
        if (e.key === ' ') {
            e.preventDefault();
            bullets.push({x: player.x + player.width / 2 - 2, y: player.y, width: 4, height: 15, vy: -7});
        }
    });
    document.addEventListener('keyup', (e) => keys[e.key] = false);
    
    function draw() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#f9d000';
        ctx.fillRect(player.x, player.y, player.width, player.height);
        
        enemies.forEach(e => {
            ctx.fillStyle = '#ff6b6b';
            ctx.font = '30px Arial';
            ctx.fillText('👾', e.x, e.y + 30);
        });
        
        ctx.fillStyle = '#00ff00';
        bullets.forEach(b => ctx.fillRect(b.x, b.y, b.width, b.height));
    }
    
    function update() {
        if (keys['ArrowLeft'] && player.x > 0) player.x -= 5;
        if (keys['ArrowRight'] && player.x < canvas.width - player.width) player.x += 5;
        
        bullets = bullets.filter(b => b.y > 0);
        bullets.forEach(b => b.y += b.vy);
        
        let direction = 1;
        enemies.forEach(e => {
            e.x += e.vx;
            if (e.x < 0 || e.x > canvas.width - 40) direction = -1;
        });
        
        if (direction === -1) {
            enemies.forEach(e => {
                e.vx *= -1;
                e.y += 20;
            });
        }
        
        for (let i = bullets.length - 1; i >= 0; i--) {
            for (let j = enemies.length - 1; j >= 0; j--) {
                if (bullets[i] && enemies[j] && 
                    bullets[i].x < enemies[j].x + 40 &&
                    bullets[i].x + bullets[i].width > enemies[j].x &&
                    bullets[i].y < enemies[j].y + 40 &&
                    bullets[i].y + bullets[i].height > enemies[j].y) {
                    
                    bullets.splice(i, 1);
                    enemies.splice(j, 1);
                    player.score += 10;
                    document.getElementById('spaceScore').textContent = player.score;
                    break;
                }
            }
        }
        
        if (enemies.length === 0) {
            gameActive = false;
            alert(`Level Complete! Score: ${player.score}`);
        }
        
        if (enemies.some(e => e.y > canvas.height)) {
            gameActive = false;
            alert(`Game Over! Score: ${player.score}`);
        }
    }
    
    function gameLoop() {
        update();
        draw();
        if (gameActive) requestAnimationFrame(gameLoop);
    }
    
    gameLoop();
}

// MARIO GAME
function initMario() {
    const canvas = document.getElementById('marioCanvas');
    const ctx = canvas.getContext('2d');
    
    let mario = {x: 50, y: 300, width: 30, height: 40, vy: 0, jumping: false};
    let platforms = [
        {x: 0, y: 360, width: 800, height: 40},
        {x: 150, y: 300, width: 200, height: 20},
        {x: 500, y: 280, width: 200, height: 20}
    ];
    let enemies = [
        {x: 200, y: 340, width: 30, height: 30, vx: 2}
    ];
    let score = 0;
    let lives = 3;
    let gameActive = true;
    
    const keys = {};
    document.addEventListener('keydown', (e) => {
        keys[e.key] = true;
        if (e.key === ' ') {
            e.preventDefault();
            if (!mario.jumping) {
                mario.vy = -12;
                mario.jumping = true;
            }
        }
    });
    document.addEventListener('keyup', (e) => keys[e.key] = false);
    
    function draw() {
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#228B22';
        platforms.forEach(p => ctx.fillRect(p.x, p.y, p.width, p.height));
        
        ctx.font = '35px Arial';
        ctx.fillText('🔴', mario.x, mario.y + 30);
        
        enemies.forEach(e => {
            ctx.fillText('👹', e.x, e.y + 30);
        });
    }
    
    function update() {
        if (keys['ArrowLeft'] && mario.x > 0) mario.x -= 4;
        if (keys['ArrowRight'] && mario.x < canvas.width - mario.width) mario.x += 4;
        
        mario.vy += 0.6;
        mario.y += mario.vy;
        
        let onPlatform = false;
        platforms.forEach(p => {
            if (mario.y + mario.height >= p.y &&
                mario.y + mario.height <= p.y + 20 &&
                mario.x + mario.width > p.x &&
                mario.x < p.x + p.width &&
                mario.vy >= 0) {
                mario.vy = 0;
                mario.y = p.y - mario.height;
                mario.jumping = false;
                onPlatform = true;
                score += 5;
            }
        });
        
        enemies.forEach(e => {
            e.x += e.vx;
            if (e.x < 150 || e.x > 350) e.vx *= -1;
            
            if (mario.x < e.x + 30 && mario.x + mario.width > e.x &&
                mario.y < e.y + 30 && mario.y + mario.height > e.y) {
                lives--;
                if (lives <= 0) gameActive = false;
                mario = {x: 50, y: 300, width: 30, height: 40, vy: 0, jumping: false};
            }
        });
        
        if (mario.y > canvas.height) {
            lives--;
            if (lives <= 0) gameActive = false;
            mario = {x: 50, y: 300, width: 30, height: 40, vy: 0, jumping: false};
        }
        
        document.getElementById('marioScore').textContent = score;
        document.getElementById('marioLives').textContent = lives;
    }
    
    function gameLoop() {
        update();
        draw();
        if (gameActive && lives > 0) {
            requestAnimationFrame(gameLoop);
        } else if (!gameActive || lives <= 0) {
            alert(`Game Over! Score: ${score}`);
        }
    }
    
    gameLoop();
}

// PAC-MAN GAME
function initPacman() {
    const canvas = document.getElementById('pacmanCanvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    
    let pacman = {x: 10, y: 10, direction: 0};
    let nextDir = 0;
    let pellets = [];
    let score = 0;
    let gameActive = true;
    
    for (let x = 0; x < 21; x++) {
        for (let y = 0; y < 21; y++) {
            if (!(x === 10 && y === 10)) pellets.push({x, y});
        }
    }
    
    const keys = {};
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') nextDir = 3;
        if (e.key === 'ArrowRight') nextDir = 1;
        if (e.key === 'ArrowUp') nextDir = 0;
        if (e.key === 'ArrowDown') nextDir = 2;
    });
    
    function draw() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        const mouth = pacman.direction * Math.PI / 2;
        ctx.arc(pacman.x * gridSize + gridSize / 2, pacman.y * gridSize + gridSize / 2, gridSize / 2 - 2, mouth, mouth + Math.PI * 1.5);
        ctx.lineTo(pacman.x * gridSize + gridSize / 2, pacman.y * gridSize + gridSize / 2);
        ctx.fill();
        
        ctx.fillStyle = '#ffaa00';
        pellets.forEach(p => ctx.fillRect(p.x * gridSize + 8, p.y * gridSize + 8, 4, 4));
    }
    
    function update() {
        const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
        const newX = pacman.x + dirs[nextDir][0];
        const newY = pacman.y + dirs[nextDir][1];
        
        if (newX >= 0 && newX < 21 && newY >= 0 && newY < 21) {
            pacman.x = newX;
            pacman.y = newY;
            pacman.direction = nextDir;
        }
        
        pellets = pellets.filter(p => {
            if (p.x === pacman.x && p.y === pacman.y) {
                score += 10;
                document.getElementById('pacmanScore').textContent = score;
                return false;
            }
            return true;
        });
        
        if (pellets.length === 0) {
            gameActive = false;
            alert(`You Won! Score: ${score}`);
        }
    }
    
    function gameLoop() {
        update();
        draw();
        if (gameActive) setTimeout(gameLoop, 150);
    }
    
    gameLoop();
}

// TETRIS GAME
function initTetris() {
    const canvas = document.getElementById('tetrisCanvas');
    const ctx = canvas.getContext('2d');
    const blockSize = 20;
    const rows = 20;
    const cols = 10;
    
    let grid = Array(rows).fill(null).map(() => Array(cols).fill(0));
    let score = 0;
    let level = 1;
    let gameActive = true;
    
    const pieces = [
        [[1, 1, 1, 1]], // I
        [[1, 1], [1, 1]], // O
        [[0, 1, 0], [1, 1, 1]], // T
        [[1, 0, 0], [1, 1, 1]], // L
        [[0, 0, 1], [1, 1, 1]] // J
    ];
    
    let currentPiece = {
        shape: pieces[Math.floor(Math.random() * pieces.length)],
        x: 3,
        y: 0
    };
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'a' || e.key === 'A') currentPiece.x--;
        if (e.key === 'd' || e.key === 'D') currentPiece.x++;
        if (e.key === 'w' || e.key === 'W') {
            const newShape = currentPiece.shape[0].map((_, i) => 
                currentPiece.shape.map(row => row[i]).reverse()
            );
            currentPiece.shape = newShape;
        }
        if (e.key === 's' || e.key === 'S') {
            update();
        }
    });
    
    function canPlace(piece, x, y) {
        for (let i = 0; i < piece.shape.length; i++) {
            for (let j = 0; j < piece.shape[i].length; j++) {
                if (piece.shape[i][j]) {
                    const nx = x + j;
                    const ny = y + i;
                    if (nx < 0 || nx >= cols || ny >= rows || grid[ny]?.[nx]) return false;
                }
            }
        }
        return true;
    }
    
    function placePiece(piece, x, y) {
        for (let i = 0; i < piece.shape.length; i++) {
            for (let j = 0; j < piece.shape[i].length; j++) {
                if (piece.shape[i][j]) {
                    grid[y + i][x + j] = 1;
                }
            }
        }
    }
    
    function draw() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        for (let i = 0; i <= rows; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * blockSize);
            ctx.lineTo(cols * blockSize, i * blockSize);
            ctx.stroke();
        }
        
        ctx.fillStyle = '#f9d000';
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (grid[i][j]) {
                    ctx.fillRect(j * blockSize, i * blockSize, blockSize - 1, blockSize - 1);
                }
            }
        }
        
        ctx.fillStyle = '#ffaa00';
        for (let i = 0; i < currentPiece.shape.length; i++) {
            for (let j = 0; j < currentPiece.shape[i].length; j++) {
                if (currentPiece.shape[i][j]) {
                    ctx.fillRect((currentPiece.x + j) * blockSize, (currentPiece.y + i) * blockSize, blockSize - 1, blockSize - 1);
                }
            }
        }
    }
    
    function update() {
        if (canPlace(currentPiece, currentPiece.x, currentPiece.y + 1)) {
            currentPiece.y++;
        } else {
            placePiece(currentPiece, currentPiece.x, currentPiece.y);
            
            for (let i = rows - 1; i >= 0; i--) {
                if (grid[i].every(cell => cell)) {
                    grid.splice(i, 1);
                    grid.unshift(Array(cols).fill(0));
                    score += 100;
                }
            }
            
            currentPiece = {
                shape: pieces[Math.floor(Math.random() * pieces.length)],
                x: 3,
                y: 0
            };
            
            if (!canPlace(currentPiece, currentPiece.x, currentPiece.y)) {
                gameActive = false;
                alert(`Game Over! Score: ${score}`);
            }
        }
        
        document.getElementById('tetrisScore').textContent = score;
    }
    
    function gameLoop() {
        update();
        draw();
        if (gameActive) setTimeout(gameLoop, 500);
    }
    
    gameLoop();
}

// WHACK-A-MOLE GAME
function initWhackMole() {
    const grid = document.getElementById('moleGrid');
    const scoreSpan = document.getElementById('moleScore');
    const timerSpan = document.getElementById('moleTimer');
    
    let score = 0;
    let timeLeft = 30;
    let gameActive = true;
    
    for (let i = 0; i < 9; i++) {
        const hole = document.createElement('div');
        hole.style.width = '100px';
        hole.style.height = '100px';
        hole.style.background = '#8B4513';
        hole.style.border = '3px solid #654321';
        hole.style.borderRadius = '50%';
        hole.style.cursor = 'pointer';
        hole.style.position = 'relative';
        hole.style.overflow = 'hidden';
        
        const mole = document.createElement('div');
        mole.innerHTML = '🦡';
        mole.style.fontSize = '50px';
        mole.style.position = 'absolute';
        mole.style.display = 'none';
        mole.style.width = '100%';
        mole.style.height = '100%';
        mole.style.display = 'flex';
        mole.style.alignItems = 'center';
        mole.style.justifyContent = 'center';
        mole.style.display = 'none';
        
        hole.appendChild(mole);
        grid.appendChild(hole);
        
        hole.addEventListener('click', () => {
            if (mole.style.display === 'flex' && gameActive) {
                score++;
                scoreSpan.textContent = score;
                mole.style.display = 'none';
            }
        });
        
        hole.mole = mole;
    }
    
    function showMole() {
        if (!gameActive) return;
        const holes = Array.from(grid.children);
        const randomHole = holes[Math.floor(Math.random() * holes.length)];
        randomHole.mole.style.display = 'flex';
        
        setTimeout(() => {
            randomHole.mole.style.display = 'none';
        }, 800);
    }
    
    const moleInterval = setInterval(showMole, 600);
    
    const timerInterval = setInterval(() => {
        timeLeft--;
        timerSpan.textContent = timeLeft;
        if (timeLeft <= 0) {
            gameActive = false;
            clearInterval(moleInterval);
            clearInterval(timerInterval);
            alert(`Game Over! Final Score: ${score}`);
        }
    }, 1000);
}

// REACTION TEST GAME
function initReactionTest() {
    const box = document.getElementById('reactionBox');
    const btn = document.getElementById('reactionStart');
    const resultText = document.getElementById('reactionResult');
    
    let gameActive = false;
    let startTime = 0;
    
    btn.addEventListener('click', () => {
        gameActive = true;
        resultText.textContent = 'Tunggu warna berubah...';
        box.style.background = '#222';
        box.innerHTML = '<p id="reactionText" style="color: #ccc; font-size: 1.1rem;">Tunggu...</p>';
        
        const delay = Math.random() * 3000 + 1000;
        setTimeout(() => {
            if (gameActive) {
                box.style.background = '#22ff22';
                box.innerHTML = '<p id="reactionText" style="color: #000; font-size: 1.1rem; font-weight: bold;">KLIK!</p>';
                startTime = Date.now();
            }
        }, delay);
    });
    
    box.addEventListener('click', () => {
        if (gameActive) {
            const reactionTime = Date.now() - startTime;
            resultText.textContent = `Reaksi: ${reactionTime}ms`;
            gameActive = false;
            box.style.background = '#222';
            box.innerHTML = '<p id="reactionText" style="color: #ccc; font-size: 1.1rem;">Tekan tombol mulai</p>';
        }
    });
}

// BALLOON POP GAME
function initBalloonPop() {
    const container = document.getElementById('balloonContainer');
    const scoreSpan = document.getElementById('balloonScore');
    const countSpan = document.getElementById('balloonCount');
    
    let score = 0;
    let balloonsLeft = 10;
    
    function createBalloon() {
        if (balloonsLeft <= 0) {
            alert(`Game Complete! Score: ${score}`);
            return;
        }
        
        const balloon = document.createElement('div');
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9d000'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        balloon.style.width = '60px';
        balloon.style.height = '80px';
        balloon.style.background = color;
        balloon.style.borderRadius = '50% 50% 50% 0';
        balloon.style.position = 'absolute';
        balloon.style.bottom = '-100px';
        balloon.style.left = Math.random() * (container.offsetWidth - 60) + 'px';
        balloon.style.cursor = 'pointer';
        balloon.style.transition = 'transform 0.1s';
        balloon.style.transform = 'rotate(45deg)';
        
        balloon.addEventListener('click', (e) => {
            e.stopPropagation();
            balloon.remove();
            score += 10;
            scoreSpan.textContent = score;
            balloonsLeft--;
            countSpan.textContent = balloonsLeft;
            createBalloon();
        });
        
        container.appendChild(balloon);
        
        let bottom = -100;
        const floatInterval = setInterval(() => {
            bottom += 2;
            balloon.style.bottom = bottom + 'px';
            
            if (bottom > container.offsetHeight) {
                clearInterval(floatInterval);
                if (balloon.parentElement) balloon.remove();
                balloonsLeft--;
                countSpan.textContent = balloonsLeft;
                if (balloonsLeft > 0) createBalloon();
            }
        }, 20);
    }
    
    createBalloon();
}

// FLAPPY BIRD GAME
function initFlappyBird() {
    const canvas = document.getElementById('flappyCanvas');
    const ctx = canvas.getContext('2d');
    
    let bird = {x: 50, y: canvas.height / 2, vy: 0, width: 30, height: 24};
    let pipes = [];
    let score = 0;
    let gameActive = true;
    let pipeSpawn = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            e.preventDefault();
            bird.vy = -6;
        }
    });
    
    canvas.addEventListener('click', () => {
        bird.vy = -6;
    });
    
    function draw() {
        ctx.fillStyle = 'linear-gradient(180deg, #87CEEB 0%, #E0F6FF 100%)';
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
        
        ctx.fillStyle = '#228B22';
        pipes.forEach(pipe => {
            ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
            ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
        });
        
        ctx.fillStyle = '#000';
        ctx.font = '24px Arial';
        ctx.fillText('Score: ' + score, 10, 30);
    }
    
    function update() {
        bird.vy += 0.5;
        bird.y += bird.vy;
        
        if (bird.y + bird.height > canvas.height || bird.y < 0) {
            gameActive = false;
        }
        
        pipeSpawn++;
        if (pipeSpawn > 90) {
            const gapSize = 120;
            const topHeight = Math.random() * (canvas.height - gapSize - 100) + 50;
            pipes.push({
                x: canvas.width,
                width: 60,
                top: topHeight,
                bottom: canvas.height - topHeight - gapSize,
                passed: false
            });
            pipeSpawn = 0;
        }
        
        pipes.forEach((pipe, i) => {
            pipe.x -= 5;
            
            if (!pipe.passed && pipe.x + pipe.width < bird.x) {
                score++;
                pipe.passed = true;
                document.getElementById('flappyScore').textContent = score;
            }
            
            if (bird.x < pipe.x + pipe.width && bird.x + bird.width > pipe.x) {
                if (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom) {
                    gameActive = false;
                }
            }
            
            if (pipe.x + pipe.width < 0) {
                pipes.splice(i, 1);
            }
        });
    }
    
    function gameLoop() {
        update();
        draw();
        if (gameActive) {
            requestAnimationFrame(gameLoop);
        } else {
            alert(`Game Over! Score: ${score}`);
        }
    }
    
    gameLoop();
}

// ROCK PAPER SCISSORS GAME
function playRPS(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    
    let result = '';
    const choiceEmojis = {rock: '🪨', paper: '📄', scissors: '✂️'};
    
    if (playerChoice === computerChoice) {
        result = 'SERI!';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'MENANG!';
        window.rpsScore.player++;
    } else {
        result = 'KALAH!';
        window.rpsScore.computer++;
    }
    
    document.getElementById('rpsResult').innerHTML = `
        ${choiceEmojis[playerChoice]} vs ${choiceEmojis[computerChoice]}<br>
        <strong style="font-size: 1.5rem; color: #f9d000;">${result}</strong>
    `;
    
    document.getElementById('rpsYour').textContent = window.rpsScore.player;
    document.getElementById('rpsComp').textContent = window.rpsScore.computer;
}

// MEMORY CARD GAME
function initMemoryGame() {
    const grid = document.getElementById('memoryGrid');
    const movesSpan = document.getElementById('memoryMoves');
    const pairsSpan = document.getElementById('memoryPairs');
    
    const emojis = ['🍎', '🍌', '🍇', '🍓', '🍊', '🍋', '🍑', '🍒'];
    const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    
    let flipped = [];
    let matched = 0;
    let moves = 0;
    
    cards.forEach((emoji, i) => {
        const card = document.createElement('div');
        card.style.width = '80px';
        card.style.height = '80px';
        card.style.background = '#1d1d1d';
        card.style.border = '2px solid #f9d000';
        card.style.borderRadius = '8px';
        card.style.cursor = 'pointer';
        card.style.display = 'flex';
        card.style.alignItems = 'center';
        card.style.justifyContent = 'center';
        card.style.fontSize = '40px';
        card.style.transition = 'transform 0.3s';
        card.dataset.emoji = emoji;
        card.dataset.index = i;
        card.textContent = '';
        
        card.addEventListener('click', () => {
            if (flipped.length < 2 && !card.classList.contains('matched') && !flipped.some(c => c === card)) {
                card.textContent = emoji;
                card.style.background = '#111';
                flipped.push(card);
                
                if (flipped.length === 2) {
                    moves++;
                    movesSpan.textContent = moves;
                    
                    if (flipped[0].dataset.emoji === flipped[1].dataset.emoji) {
                        matched++;
                        pairsSpan.textContent = matched;
                        flipped[0].classList.add('matched');
                        flipped[1].classList.add('matched');
                        flipped = [];
                        
                        if (matched === 8) {
                            alert(`Game Won! Moves: ${moves}`);
                        }
                    } else {
                        setTimeout(() => {
                            flipped.forEach(c => {
                                c.textContent = '';
                                c.style.background = '#1d1d1d';
                            });
                            flipped = [];
                        }, 600);
                    }
                }
            }
        });
        
        grid.appendChild(card);
    });
}

function resetMemoryGame() {
    document.getElementById('memoryGrid').innerHTML = '';
    document.getElementById('memoryMoves').textContent = '0';
    document.getElementById('memoryPairs').textContent = '0';
    initMemoryGame();
}
