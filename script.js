const puzzleContainer = document.querySelector("#puzzle-container")
    let puzzle = []
    let size = 3

        generatePuzzle()
        randomizePuzzle()
        renderPuzzle()
        handleInput()

        let timerInterval;
        let timeLimit = 60; // Set the time limit in seconds
        let timeRemaining = timeLimit;
        
        // Start the timer
        timerInterval = setInterval(updateTimer, 1000);
        
        function updateTimer() {
          timeRemaining--;
        
          // Check if the time limit has been reached
          if (timeRemaining <= 0) {
            stopTimer();
            gameOver();
          }
        
          const timerElement = document.getElementById("timer");
          timerElement.textContent = formatTime(timeRemaining);
        }
        
        function formatTime(time) {
          const minutes = Math.floor(time / 60);
          const seconds = time % 60;
          return `${padZero(minutes)}:${padZero(seconds)}`;
        }
        
        function padZero(num) {
          return num.toString().padStart(2, "0");
        }
        
        // Stop the timer
        function stopTimer() {
          clearInterval(timerInterval);
        }
        
        // Game over function
        function gameOver() {
          // Perform game over actions (e.g., display a message, disable puzzle input)
          window.alert("Game over!");
          // Additional code for game over actions...
        }

            function getRow(pos) {
                return Math.ceil(pos / size)
            }

            function getCol(pos) {
                const col = pos % size
                if (col === 0) {
                    return size
                }
                return col
            }
            function generatePuzzle() {
                for (let i = 1; i <= size * size; i++) {
                    puzzle.push({
                        value: i,
                        position: i,
                        x: (getCol(i) - 1) * 200,
                        y: (getRow(i) - 1) * 200,
                        disabled: false,
                    })
                }
            }

            function renderPuzzle() {
                puzzleContainer.innerHTML = ""
                for (let puzzleItem of puzzle) {
                    if (puzzleItem.disabled) continue
                    puzzleContainer.innerHTML += `
                        <div class="puzzle-item" style="left: ${puzzleItem.x}px; top: ${puzzleItem.y}px;">
                            ${puzzleItem.value}
                        </div>
                    `
                }
            }
            function randomizePuzzle() {
                const randomValues = getRandomValues()
                // console.log(randomValues)
                let i = 0
                for (let puzzleItem of puzzle) {
                    puzzleItem.value = randomValues[i]
                    i++
                }

                const puzzleWithValueOf9 = puzzle.find((item) => item.value === size * size)
                puzzleWithValueOf9.disabled = true
                // console.log(puzzle)
            }
            function getRandomValues() {
                const values = []
                for (let i = 1; i <= size * size; i++) {
                    values.push(i)
                }

                const randomValues = values.sort(() => Math.random() - 0.5)
                return randomValues
            }

            function handleInput() {
                document.addEventListener("keydown", handleKeyDown)
            }

            function handleKeyDown(e) {
                console.log(e.key)
                switch (e.key) {
                    case "ArrowLeft":
                        moveLeft()
                        break
                    case "ArrowRight":
                        moveRight()
                        break
                    case "ArrowUp":
                        moveUp()
                        break
                    case "ArrowDown":
                        moveDown()
                        break
                }
                renderPuzzle()
            }
            function moveLeft() {
                const emptyPuzzle = getEmptyPuzzle()
                const rightPuzzle = getRightPuzzle()
                if (rightPuzzle) {
                    swapPositions(emptyPuzzle, rightPuzzle, true)
                }
            }
            function moveRight() {
                const emptyPuzzle = getEmptyPuzzle()
                const leftPuzzle = getLeftPuzzle()
                if (leftPuzzle) {
                    swapPositions(emptyPuzzle, leftPuzzle, true)
                }
            }
            function moveUp() {
                const emptyPuzzle = getEmptyPuzzle()
                const belowPuzzle = getBelowPuzzle()
                if (belowPuzzle) {
                    swapPositions(emptyPuzzle, belowPuzzle, false)
                }
            }
            function moveDown() {
                const emptyPuzzle = getEmptyPuzzle()
                const abovePuzzle = getAbovePuzzle()
                if (abovePuzzle) {
                    swapPositions(emptyPuzzle, abovePuzzle, false)
                }
            }
            function swapPositions(firstPuzzle, secondPuzzle, isX = false) {
                // position swapping
                let temp = firstPuzzle.position
                firstPuzzle.position = secondPuzzle.position
                secondPuzzle.position = temp

                // x position swapping

                if (isX) {
                    temp = firstPuzzle.x
                    firstPuzzle.x = secondPuzzle.x
                    secondPuzzle.x = temp
                } else {
                    // must be y
                    temp = firstPuzzle.y
                    firstPuzzle.y = secondPuzzle.y
                    secondPuzzle.y = temp
                }
            }

            function getRightPuzzle() {
                /* get the puzzle just right to the empty puzzle */
                const emptyPuzzle = getEmptyPuzzle()
                const isRightEdge = getCol(emptyPuzzle.position) === size
                if (isRightEdge) {
                    return null
                }
                const puzzle = getPuzzleByPos(emptyPuzzle.position + 1)
                return puzzle
            }
            function getLeftPuzzle() {
                /* get the puzzle just left to the empty puzzle */
                const emptyPuzzle = getEmptyPuzzle()
                const isLeftEdge = getCol(emptyPuzzle.position) === 1
                if (isLeftEdge) {
                    return null
                }
                const puzzle = getPuzzleByPos(emptyPuzzle.position - 1)
                return puzzle
            }
            function getAbovePuzzle() {
                /* get the puzzle just above to the empty puzzle */
                const emptyPuzzle = getEmptyPuzzle()
                const isTopEdge = getRow(emptyPuzzle.position) === 1
                if (isTopEdge) {
                    return null
                }
                const puzzle = getPuzzleByPos(emptyPuzzle.position - size)
                return puzzle
            }
            function getBelowPuzzle() {
                /* get the puzzle just below to the empty puzzle */
                const emptyPuzzle = getEmptyPuzzle()
                const isBottomEdge = getRow(emptyPuzzle.position) === size
                if (isBottomEdge) {
                    return null
                }
                const puzzle = getPuzzleByPos(emptyPuzzle.position + size)
                return puzzle
            }

            function getEmptyPuzzle() {
                return puzzle.find((item) => item.disabled)
            }

            function getPuzzleByPos(pos) {
                return puzzle.find((item) => item.position === pos)
            }
