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