// Morphy's Opera Game - Single focused game
const gamePosition = {
    'a8': '♜', 'b8': '♞', 'c8': '♝', 'd8': '♛', 'e8': '♚', 'f8': '♝', 'g8': '♞', 'h8': '♜',
    'a7': '♟', 'b7': '♟', 'c7': '♟', 'd7': '♟', 'e7': '♟', 'f7': '♟', 'g7': '♟', 'h7': '♟',
    'a6': '', 'b6': '', 'c6': '', 'd6': '', 'e6': '', 'f6': '', 'g6': '', 'h6': '',
    'a5': '', 'b5': '', 'c5': '', 'd5': '', 'e5': '', 'f5': '', 'g5': '', 'h5': '',
    'a4': '', 'b4': '', 'c4': '', 'd4': '', 'e4': '', 'f4': '', 'g4': '', 'h4': '',
    'a3': '', 'b3': '', 'c3': '', 'd3': '', 'e3': '', 'f3': '', 'g3': '', 'h3': '',
    'a2': '♙', 'b2': '♙', 'c2': '♙', 'd2': '♙', 'e2': '♙', 'f2': '♙', 'g2': '♙', 'h2': '♙',
    'a1': '♖', 'b1': '♘', 'c1': '♗', 'd1': '♕', 'e1': '♔', 'f1': '♗', 'g1': '♘', 'h1': '♖'
};

const gameMoves = [
    { from: 'e2', to: 'e4', piece: '♙' },
    { from: 'e7', to: 'e5', piece: '♟' },
    { from: 'g1', to: 'f3', piece: '♘' },
    { from: 'b8', to: 'c6', piece: '♞' },
    { from: 'f1', to: 'c4', piece: '♗' },
    { from: 'g8', to: 'f6', piece: '♞' },
    { from: 'd2', to: 'd3', piece: '♙' },
    { from: 'f8', to: 'c5', piece: '♝' },
    { from: 'c2', to: 'c3', piece: '♙' },
    { from: 'd7', to: 'd6', piece: '♟' },
    { from: 'c4', to: 'f7', piece: '♗' },
    { from: 'e8', to: 'f7', piece: '♚' },
    { from: 'd1', to: 'b3', piece: '♕' },
    { from: 'f7', to: 'f8', piece: '♚' },
    { from: 'b3', to: 'f7', piece: '♕' } // checkmate
];

function createChessBoard(position) {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    let board = '';
    
    for (let rank of ranks) {
        for (let file of files) {
            const square = file + rank;
            const isLight = (files.indexOf(file) + ranks.indexOf(rank)) % 2 === 0;
            const squareClass = isLight ? 'light-square' : 'dark-square';
            const piece = position[square] || '';
            
            board += `<div class="chess-square ${squareClass}" data-square="${square}">${piece}</div>`;
        }
    }
    return board;
}

function animateGame(boardElement, initialPosition, moves) {
    let moveIndex = 0;
    const currentPosition = { ...initialPosition };
    
    function makeMove() {
        if (moveIndex >= moves.length) {
            // Reset game after completion
            moveIndex = 0;
            Object.assign(currentPosition, initialPosition);
            boardElement.innerHTML = createChessBoard(currentPosition);
            setTimeout(makeMove, 3000);
            return;
        }
        
        const move = moves[moveIndex];
        const fromSquare = boardElement.querySelector(`[data-square="${move.from}"]`);
        const toSquare = boardElement.querySelector(`[data-square="${move.to}"]`);
        
        // Determine if it's a white or black move based on the piece
        const isWhiteMove = move.piece === '♙' || move.piece === '♖' || move.piece === '♘' || 
                           move.piece === '♗' || move.piece === '♕' || move.piece === '♔';
        const moveClass = isWhiteMove ? 'white-move' : 'black-move';
        
        if (fromSquare && toSquare) {
            // Highlight the "from" square
            fromSquare.classList.add(moveClass);
            
            setTimeout(() => {
                // Highlight the "to" square
                toSquare.classList.add(moveClass);
                
                setTimeout(() => {
                    // Update the board position
                    currentPosition[move.from] = '';
                    currentPosition[move.to] = move.piece;
                    boardElement.innerHTML = createChessBoard(currentPosition);
                    
                    moveIndex++;
                    setTimeout(makeMove, 1500);
                }, 600);
            }, 600);
        } else {
            // If squares not found, continue to next move
            moveIndex++;
            setTimeout(makeMove, 500);
        }
    }
    
    // Start animation after a brief delay
    setTimeout(makeMove, 1000);
}

// Initialize single chess board
document.addEventListener('DOMContentLoaded', () => {
    const chessBoard = document.getElementById('mainChessBoard');
    if (chessBoard) {
        chessBoard.innerHTML = createChessBoard(gamePosition);
        animateGame(chessBoard, gamePosition, gameMoves);
    }
    
    // Get Started button functionality
    const getStartedBtn = document.getElementById('getStartedBtn');
    const toolsSection = document.getElementById('tools');

    if (getStartedBtn && toolsSection) {
        getStartedBtn.addEventListener('click', () => {
            toolsSection.scrollIntoView({ behavior: 'smooth' });
            
            setTimeout(() => {
                const cards = document.querySelectorAll('.app-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('slide-in');
                    }, index * 100);
                });
            }, 500);
        });
    }

    // Handle direct navigation to #tools
    if (window.location.hash === '#tools' && toolsSection) {
        toolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        setTimeout(() => {
            const cards = document.querySelectorAll('.app-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('slide-in');
                }, index * 100);
            });
        }, 500);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // If scrolling to tools, animate cards
                if (href === '#tools') {
                    setTimeout(() => {
                        const cards = document.querySelectorAll('.app-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('slide-in');
                            }, index * 100);
                        });
                    }, 500);
                }
            }
        });
    });

    // Add some interactive effects
    const heroSection = document.getElementById('heroSection');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const chessBoard = document.querySelector('.chess-board');
            if (chessBoard) {
                const x = (e.clientX / window.innerWidth - 0.5) * 10;
                const y = (e.clientY / window.innerHeight - 0.5) * 10;
                chessBoard.style.transform = `rotate3d(${y}, ${x}, 0, 5deg)`;
            }
        });

        heroSection.addEventListener('mouseleave', () => {
            const chessBoard = document.querySelector('.chess-board');
            if (chessBoard) {
                chessBoard.style.transform = 'rotate3d(0, 0, 0, 0deg)';
            }
        });
    }
});

// Add resize handler for better mobile experience
window.addEventListener('resize', () => {
    const chessBoard = document.querySelector('.chess-board');
    if (chessBoard && window.innerWidth < 768) {
        // Ensure board stays properly sized on mobile
        chessBoard.style.width = 'min(90vw, 350px)';
        chessBoard.style.height = 'min(90vw, 350px)';
    }
});

// Optional: Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && window.scrollY < 100) {
        const toolsSection = document.getElementById('tools');
        if (toolsSection) {
            toolsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});