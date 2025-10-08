// Starting chess position
const initialPosition = {
    'a8': '♖',
    'b8': '♘',
    'c8': '♗',
    'd8': '♕',
    'e8': '♔',
    'f8': '♗',
    'g8': '♘',
    'h8': '♖',
    'a7': '♙',
    'b7': '♙',
    'c7': '♙',
    'd7': '♙',
    'e7': '♙',
    'f7': '♙',
    'g7': '♙',
    'h7': '♙',
    'a6': '',
    'b6': '',
    'c6': '',
    'd6': '',
    'e6': '',
    'f6': '',
    'g6': '',
    'h6': '',
    'a5': '',
    'b5': '',
    'c5': '',
    'd5': '',
    'e5': '',
    'f5': '',
    'g5': '',
    'h5': '',
    'a4': '',
    'b4': '',
    'c4': '',
    'd4': '',
    'e4': '',
    'f4': '',
    'g4': '',
    'h4': '',
    'a3': '',
    'b3': '',
    'c3': '',
    'd3': '',
    'e3': '',
    'f3': '',
    'g3': '',
    'h3': '',
    'a2': '♟',
    'b2': '♟',
    'c2': '♟',
    'd2': '♟',
    'e2': '♟',
    'f2': '♟',
    'g2': '♟',
    'h2': '♟',
    'a1': '♜',
    'b1': '♞',
    'c1': '♝',
    'd1': '♛',
    'e1': '♚',
    'f1': '♝',
    'g1': '♞',
    'h1': '♜'
};

const gameMoves = [
    {
        from: 'e2',
        to: 'e4',
        piece: '♟',
        type: 'great'
    },
    {
        from: 'e7',
        to: 'e5',
        piece: '♙',
        type: 'brilliant'
    },
    {
        from: 'g1',
        to: 'f3',
        piece: '♞'
    },
    {
        from: 'd7',
        to: 'd6',
        piece: '♙'
    }, {
        from: 'd2',
        to: 'd4',
        piece: '♟'
    }, {
        from: 'c8',
        to: 'g4',
        piece: '♗'
    }, {
        from: 'd4',
        to: 'e5',
        piece: '♟'
    }, {
        from: 'g4',
        to: 'f3',
        piece: '♗'
    }, {
        from: 'd1',
        to: 'f3',
        piece: '♛'
    }, {
        from: 'd6',
        to: 'e5',
        piece: '♙'
    }, {
        from: 'f1',
        to: 'c4',
        piece: '♝',
        type: 'great'
    }, {
        from: 'g8',
        to: 'f6',
        piece: '♘'
    }, {
        from: 'f3',
        to: 'b3',
        piece: '♛'
    }, {
        from: 'd8',
        to: 'e7',
        piece: '♕'
    }, {
        from: 'b1',
        to: 'c3',
        piece: '♞'
    }, {
        from: 'c7',
        to: 'c6',
        piece: '♙'
    }, {
        from: 'c1',
        to: 'g5',
        piece: '♝'
    }, {
        from: 'b7',
        to: 'b5',
        piece: '♙'
    }, {
        from: 'c3',
        to: 'b5',
        piece: '♞'
    }, {
        from: 'c6',
        to: 'b5',
        piece: '♙'
    }, {
        from: 'c4',
        to: 'b5',
        piece: '♝',
        state: 'check'
    }, {
        from: 'b8',
        to: 'd7',
        piece: '♘'
    }, {
        from: 'e1',
        to: 'c1',
        piece: '♚'
    }, {
        from: 'a1',
        to: 'd1',
        piece: '♜'
    }, {
        from: 'a8',
        to: 'd8',
        piece: '♖'
    }, {
        from: 'd1',
        to: 'd7',
        piece: '♜'
    }, {
        from: 'd8',
        to: 'd7',
        piece: '♖'
    }, {
        from: 'h1',
        to: 'd1',
        piece: '♜'
    }, {
        from: 'e7',
        to: 'e6',
        piece: '♕'
    }, {
        from: 'b5',
        to: 'd7',
        piece: '♝',
        state: 'check'
    }, {
        from: 'f6',
        to: 'd7',
        piece: '♘'
    }, {
        from: 'b3',
        to: 'b8',
        piece: '♛',
        state: 'check',
        type: 'brilliant'
    }, {
        from: 'd7',
        to: 'b8',
        piece: '♘'
    }, {
        from: 'd1',
        to: 'd8',
        piece: '♜',
        state: 'checkmate'
    }
];

function createChessBoard(position) {
    const files = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h'
    ];
    const ranks = [
        '8',
        '7',
        '6',
        '5',
        '4',
        '3',
        '2',
        '1'
    ];
    return ranks.map(rank => files.map(file => {
        const square = file + rank;
        const isLight = (files.indexOf(file) + ranks.indexOf(rank)) % 2 === 0;
        const squareClass = isLight ? 'light-square' : 'dark-square';
        return `<div class="chess-square ${squareClass}" data-square="${square}">${
            position[square] || ''
        }</div>`;
    }).join('')).join('');
}

function isWhitePiece(piece) {
    return [
        '♟',
        '♜',
        '♞',
        '♝',
        '♛',
        '♚'
    ].includes(piece);
}

function createMoveTrail(from, to, piece) {
    const fromEl = document.querySelector(`[data-square="${from}"]`);
    const toEl = document.querySelector(`[data-square="${to}"]`);
    if (! fromEl || ! toEl) 
        return;
    


    const board = fromEl.closest('.chess-board');
    const boardRect = board.getBoundingClientRect();
    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();

    const trail = document.createElement('div');
    trail.className = 'move-trail';
    trail.textContent = piece;
    Object.assign(trail.style, {
        position: 'absolute',
        fontSize: 'inherit',
        zIndex: 5,
        pointerEvents: 'none',
        transition: 'all 0.6s ease-in-out',
        left: `${
            fromRect.left - boardRect.left
        }px`,
        top: `${
            fromRect.top - boardRect.top
        }px`
    });

    board.appendChild(trail);

    setTimeout(() => {
        trail.style.left = `${
            toRect.left - boardRect.left
        }px`;
        trail.style.top = `${
            toRect.top - boardRect.top
        }px`;
        trail.style.opacity = '0.7';
    }, 50);

    setTimeout(() => trail.remove(), 600);
}

function showCaptureEffect(square, capturedPiece) {
    const el = document.querySelector(`[data-square="${square}"]`);
    if (! el) 
        return;
    

    const fx = document.createElement('div');
    fx.className = 'capture-effect';
    fx.textContent = capturedPiece;
    fx.style.cssText = `
      position: absolute;
      font-size: 24px;
      color: #ff2600;
      z-index: 6;
      animation: capture-pulse 0.8s ease-out;
      pointer-events: none;
    `;
    el.appendChild(fx);
    setTimeout(() => fx.remove(), 800);
}
function showSpecialMoveEffect(square, type) {
    const el = document.querySelector(`[data-square="${square}"]`);
    if (! el) 
        return;
    


    const fx = document.createElement('div');
    fx.className = `${type}-move-effect`;
    fx.textContent = type === 'brilliant' ? '⭐' : '👍';

    fx.style.cssText = `
      position: absolute;
      font-size: 22px;
      z-index: 7;
      pointer-events: none;
      animation: ${
        type === 'brilliant' ? 'brilliant-spin' : 'great-pop'
    } 2s ease-in-out;
    `;

    el.appendChild(fx);
    setTimeout(() => fx.remove(), 2000);
}


function triggerConfetti() {
    const container = document.querySelector('.chess-container');
    const colors = [
        '#ff2600',
        '#ff6b00',
        '#00ff88',
        '#0066ff',
        '#ff00ff',
        '#ffff00'
    ];
    for (let i = 0; i < 200; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        Object.assign(c.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            background: colors[Math.floor(Math.random() * colors.length)],
            left: `${left}%`,
            top: '-20px',
            opacity: 0.8,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            transform: `rotate(${
                Math.random() * 360
            }deg)`,
            animation: `confetti-fall ${duration}s linear forwards`,
            zIndex: 1000
        });
        container.appendChild(c);
        setTimeout(() => c.remove(), duration * 1000);
    }
}

function highlightCheck(kingSquare, isCheckmate = false) {
    document.querySelectorAll('.check, .checkmate').forEach(el => el.classList.remove('check', 'checkmate'));

    const el = document.querySelector(`[data-square="${kingSquare}"]`);
    if (! el) 
        return;
    


    el.classList.add(isCheckmate ? 'checkmate' : 'check');

    const indicator = document.createElement('div');
    indicator.className = isCheckmate ? 'checkmate-indicator' : 'check-indicator';
    indicator.textContent = isCheckmate ? 'Checkmate!' : 'Check!';

    const rect = el.getBoundingClientRect();
    const boardRect = el.closest('.chess-board').getBoundingClientRect();

    Object.assign(indicator.style, {
        position: 'absolute',
        top: `${
            rect.top - boardRect.top - 40
        }px`,
        left: `${
            rect.left - boardRect.left + rect.width / 2
        }px`,
        transform: 'translateX(-50%)'
    });

    el.closest('.chess-board').appendChild(indicator);
    if (isCheckmate) 
        triggerConfetti();
    


    setTimeout(() => indicator.remove(), isCheckmate ? 4000 : 2000);
}

function showGameResult(state, lastPiece) {
    const el = document.getElementById('gameResult');
    if (! el) 
        return;
    


    const white = isWhitePiece(lastPiece);
    el.textContent = state === 'checkmate' ? white ? 'Checkmate! White Wins!' : 'Checkmate! Black Wins!' : '';

    el.style.display = 'block';
    setTimeout(() => (el.style.display = 'none'), 5000);
}

function celebrateGameReset() {
    triggerConfetti();
    const el = document.getElementById('gameResult');
    if (! el) 
        return;
    

    el.textContent = 'Game Complete! Restarting...';
    el.style.display = 'block';
    setTimeout(() => (el.style.display = 'none'), 3000);
}

function animateGame(boardEl, startPos, moves) {
    const pos = {
        ... startPos
    };
    let index = 0;
    let ended = false;

    function next() {
        if (ended) 
            return;
        


        if (index >= moves.length) {
            celebrateGameReset();
            index = 0;
            Object.assign(pos, startPos);
            boardEl.innerHTML = createChessBoard(pos);
            return setTimeout(next, 4000);
        }

        const move = moves[index];
        const captured = pos[move.to];
        if (captured) 
            showCaptureEffect(move.to, captured);
        

        createMoveTrail(move.from, move.to, move.piece);

        const isWhite = isWhitePiece(move.piece);
        const fromEl = boardEl.querySelector(`[data-square="${
            move.from
        }"]`);
        const toEl = boardEl.querySelector(`[data-square="${
            move.to
        }"]`);

        if (fromEl && toEl) {
            fromEl.classList.add(isWhite ? 'white-move' : 'black-move');

            setTimeout(() => {
                toEl.classList.add(isWhite ? 'white-move' : 'black-move');

                setTimeout(() => {
                    pos[move.from] = '';
                    pos[move.to] = move.piece;
                    boardEl.innerHTML = createChessBoard(pos);

                    if (move.type === 'brilliant' || move.type === 'great') {
                        showSpecialMoveEffect(move.to, move.type);
                    }

                    if (move.state) {
                        const kingSquare = isWhite ? 'e8' : 'e1';
                        highlightCheck(kingSquare, move.state === 'checkmate');

                        if (move.state === 'checkmate') {
                            ended = true;
                            showGameResult(move.state, move.piece);
                            setTimeout(() => {
                                ended = false;
                                index = 0;
                                Object.assign(pos, startPos);
                                boardEl.innerHTML = createChessBoard(pos);
                                setTimeout(next, 2000);
                            }, 6000);
                        }
                    }

                    index++;
                    setTimeout(next, 1800);
                }, 600);
            }, 600);
        } else {
            index++;
            setTimeout(next, 500);
        }
    }

    setTimeout(next, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.chess-container');
    if (container) {
        const resultEl = document.createElement('div');
        resultEl.id = 'gameResult';
        resultEl.className = 'game-result';
        container.appendChild(resultEl);
    }

    const board = document.getElementById('mainChessBoard');
    if (board) {
        board.innerHTML = createChessBoard(initialPosition);
        animateGame(board, initialPosition, gameMoves);
    }
});

window.addEventListener('resize', () => {
    const board = document.querySelector('.chess-board');
    if (board && window.innerWidth < 768) {
        board.style.width = 'min(90vw, 350px)';
        board.style.height = 'min(90vw, 350px)';
    }
});

