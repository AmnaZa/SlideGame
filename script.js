const puzzleContainer = document.querySelector("#puzzle-container")
            let puzzle = []
            let size = 3

            generatePuzzle()
            randomizePuzzle()
            renderPuzzle()
            handleInput()

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

            