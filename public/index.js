
        // Morphy's Opera Game - Starting position
        const morphyPosition = {
            'a8': '♜', 'b8': '♞', 'c8': '♝', 'd8': '♛', 'e8': '♚', 'f8': '♝', 'g8': '♞', 'h8': '♜',
            'a7': '♟', 'b7': '♟', 'c7': '♟', 'd7': '♟', 'e7': '♟', 'f7': '♟', 'g7': '♟', 'h7': '♟',
            'a6': '', 'b6': '', 'c6': '', 'd6': '', 'e6': '', 'f6': '', 'g6': '', 'h6': '',
            'a5': '', 'b5': '', 'c5': '', 'd5': '', 'e5': '', 'f5': '', 'g5': '', 'h5': '',
            'a4': '', 'b4': '', 'c4': '', 'd4': '', 'e4': '', 'f4': '', 'g4': '', 'h4': '',
            'a3': '', 'b3': '', 'c3': '', 'd3': '', 'e3': '', 'f3': '', 'g3': '', 'h3': '',
            'a2': '♙', 'b2': '♙', 'c2': '♙', 'd2': '♙', 'e2': '♙', 'f2': '♙', 'g2': '♙', 'h2': '♙',
            'a1': '♖', 'b1': '♘', 'c1': '♗', 'd1': '♕', 'e1': '♔', 'f1': '♗', 'g1': '♘', 'h1': '♖'
          };

        // Kasparov's Immortal Game - Middle Position
        const kasparovPosition = {
            'a8': '♜', 'b8': '', 'c8': '♝', 'd8': '♛', 'e8': '♚', 'f8': '♝', 'g8': '', 'h8': '♜',
            'a7': '', 'b7': '♟', 'c7': '', 'd7': '', 'e7': '', 'f7': '♟', 'g7': '♟', 'h7': '♟',
            'a6': '♟', 'b6': '', 'c6': '♞', 'd6': '♟', 'e6': '♟', 'f6': '', 'g6': '', 'h6': '',
            'a5': '', 'b5': '', 'c5': '', 'd5': '', 'e5': '', 'f5': '', 'g5': '♗', 'h5': '',
            'a4': '', 'b4': '', 'c4': '', 'd4': '♘', 'e4': '♙', 'f4': '♙', 'g4': '', 'h4': '',
            'a3': '', 'b3': '', 'c3': '♘', 'd3': '', 'e3': '', 'f3': '', 'g3': '', 'h3': '',
            'a2': '♙', 'b2': '♙', 'c2': '♙', 'd2': '♕', 'e2': '', 'f2': '', 'g2': '♙', 'h2': '♙',
            'a1': '♖', 'b1': '♖', 'c1': '', 'd1': '', 'e1': '♔', 'f1': '', 'g1': '', 'h1': ''
        };

        // Fischer's Game of the Century - Tactical Position
        const fischerPosition = {
            'a8': '♜', 'b8': '', 'c8': '♝', 'd8': '♛', 'e8': '', 'f8': '♜', 'g8': '♚', 'h8': '',
            'a7': '♟', 'b7': '♟', 'c7': '', 'd7': '', 'e7': '', 'f7': '', 'g7': '♝', 'h7': '♟',
            'a6': '', 'b6': '♞', 'c6': '♟', 'd6': '', 'e6': '', 'f6': '', 'g6': '♟', 'h6': '',
            'a5': '', 'b5': '', 'c5': '♕', 'd5': '', 'e5': '', 'f5': '', 'g5': '', 'h5': '',
            'a4': '♞', 'b4': '', 'c4': '♗', 'd4': '♙', 'e4': '♘', 'f4': '♗', 'g4': '♝', 'h4': '',
            'a3': '', 'b3': '', 'c3': '♟', 'd3': '', 'e3': '', 'f3': '', 'g3': '', 'h3': '',
            'a2': '♙', 'b2': '♙', 'c2': '', 'd2': '', 'e2': '', 'f2': '♙', 'g2': '♙', 'h2': '♙',
            'a1': '♖', 'b1': '', 'c1': '', 'd1': '♖', 'e1': '♔', 'f1': '', 'g1': '', 'h1': ''
        };

        // Key moves for each game
        const morphyMoves = [
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

        const kasparovMoves = [
            { from: 'g5', to: 'f6', piece: '♗' },
            { from: 'g7', to: 'f6', piece: '♟' },
            { from: 'd4', to: 'e6', piece: '♘' },
            { from: 'f7', to: 'e6', piece: '♟' },
            { from: 'c3', to: 'e4', piece: '♘' },
            { from: 'd2', to: 'h6', piece: '♕' }
        ];

        const fischerMoves = [
            { from: 'e4', to: 'f6', piece: '♘' },
            { from: 'g7', to: 'f6', piece: '♝' },
            { from: 'f4', to: 'e7', piece: '♗' },
            { from: 'd8', to: 'b6', piece: '♛' },
            { from: 'c4', to: 'c3', piece: '♗' },
            { from: 'a4', to: 'c3', piece: '♞' }
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

        function animateGame(gameElement, initialPosition, moves) {
            let moveIndex = 0;
            const currentPosition = { ...initialPosition };
            
            function makeMove() {
                if (moveIndex >= moves.length) {
                    moveIndex = 0;
                    Object.assign(currentPosition, initialPosition);
                    gameElement.innerHTML = createChessBoard(currentPosition);
                    setTimeout(makeMove, 3000);
                    return;
                }
                
                const move = moves[moveIndex];
                const fromSquare = gameElement.querySelector(`[data-square="${move.from}"]`);
                const toSquare = gameElement.querySelector(`[data-square="${move.to}"]`);
                
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
                            gameElement.innerHTML = createChessBoard(currentPosition);
                            
                            moveIndex++;
                            setTimeout(makeMove, 2000);
                        }, 500);
                    }, 500);
                }
            }
            
            setTimeout(makeMove, 2000);
        }

        // Initialize all three chess games
        document.addEventListener('DOMContentLoaded', () => {
            const game1 = document.querySelector('.chess-game-1');
            const game2 = document.querySelector('.chess-game-2');
            const game3 = document.querySelector('.chess-game-3');
            
            if (game1) {
                game1.innerHTML = createChessBoard(morphyPosition);
                animateGame(game1, morphyPosition, morphyMoves);
            }
            if (game2) {
                game2.innerHTML = createChessBoard(kasparovPosition);
                setTimeout(() => animateGame(game2, kasparovPosition, kasparovMoves), 1000);
            }
            if (game3) {
                game3.innerHTML = createChessBoard(fischerPosition);
                setTimeout(() => animateGame(game3, fischerPosition, fischerMoves), 2000);
            }
        });

        // Get Started button functionality
        const getStartedBtn = document.getElementById('getStartedBtn');
        const toolsSection = document.getElementById('tools');

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

        document.addEventListener("DOMContentLoaded", () => {
            const toolsSection = document.getElementById("tools");
          
            // Check if the URL contains #tools
            if (window.location.hash === "#tools" && toolsSection) {
              // Scroll into view smoothly
              toolsSection.scrollIntoView({ behavior: "smooth", block: "start" });
          
              // Animate the cards just like the Get Started button does
              setTimeout(() => {
                const cards = document.querySelectorAll(".app-card");
                cards.forEach((card, index) => {
                  setTimeout(() => {
                    card.classList.add("slide-in");
                  }, index * 100);
                });
              }, 500);
            }
          });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });