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
        
        // Function to update the timer every second
function updateTimer() {
    timeRemaining--; // Decrease the remaining time
  
    // Check if the time limit has been reached
    if (timeRemaining <= 0) {
      stopTimer(); // Stop the timer
      gameOver(); // Trigger the game over function
    } else if (timeRemaining === 10) {
      showModal("Warning", "Only 10 seconds left!"); // Display a warning message when 10 seconds are remaining
    }
  
    const timerElement = document.getElementById("timer");
    timerElement.textContent = formatTime(timeRemaining); // Update the timer element with the formatted time
  }
  
  // Function to format the time in MM:SS format
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${padZero(minutes)}:${padZero(seconds)}`; // Return the formatted time
  }
  
  // Function to add leading zeros to a number
  function padZero(num) {
    return num.toString().padStart(2, "0"); // Return the padded number
  }
  
  // Function to stop the timer
  function stopTimer() {
    clearInterval(timerInterval); // Clear the interval to stop the timer
    const timerElement = document.getElementById("timer");
    timerElement.style.display = "none"; // Hide the timer element
  }
  
  // Function to handle the game over scenario
  function gameOver() {
    stopTimer(); // Stop the timer
    const modalContent = document.querySelector(".modal-content");
    modalContent.innerHTML = `
      <h3>Game Over</h3>
      <p>Your time is up! You have completed the game.</p>
      <button onclick="resetGame()">OK</button>
    `;
    const customModal = document.querySelector("#custom-modal");
    customModal.style.display = "flex"; // Show the game over modal
  
    // Disable game input by removing the event listener
    document.removeEventListener("keydown", handleKeyDown);
  }
  
  // Function to reset the game by reloading the page
  function resetGame() {
    location.reload(); // Reload the page to reset the game
  }
  
  // Function to calculate the row of a given position
  function getRow(pos) {
    return Math.ceil(pos / size); // Divide the position by the size and round up to get the row
  }
  
  // Function to calculate the column of a given position
  function getCol(pos) {
    const col = pos % size; // Calculate the remainder when dividing the position by the size
    if (col === 0) {
      return size; // If the remainder is 0, return the size (last column)
    }
    return col; // Otherwise, return the calculated column
  }
  
  // Function to generate the initial puzzle state
  function generatePuzzle() {
    for (let i = 1; i <= size * size; i++) {
      puzzle.push({
        value: i, // Set the value of the tile
        position: i, // Set the initial position of the tile
        x: (getCol(i) - 1) * 200, // Calculate the x-coordinate for rendering the tile
        y: (getRow(i) - 1) * 200, // Calculate the y-coordinate for rendering the tile
        disabled: false, // Set the initial state of the tile as enabled
      });
    }
  }
  
  // Function to render the puzzle on the screen
  function renderPuzzle() {
    puzzleContainer.innerHTML = ""; // Clear the puzzle container
    for (let puzzleItem of puzzle) {
      if (puzzleItem.disabled) continue; // Skip disabled tiles (empty space)
      puzzleContainer.innerHTML += `
        <div class="puzzle-item" style="left: ${puzzleItem.x}px; top: ${puzzleItem.y}px;">
          ${puzzleItem.value}
        </div>
      `; // Create HTML element for each tile and set its position
    }
  }
  
  // Function to randomize the puzzle by shuffling the values
  function randomizePuzzle() {
    const randomValues = getRandomValues(); // Get random values for the tiles
    let i = 0;
    for (let puzzleItem of puzzle) {
      puzzleItem.value = randomValues[i]; // Assign a random value to each tile
      i++;
    }
  
    const puzzleWithValueOf9 = puzzle.find((item) => item.value === size * size);
    puzzleWithValueOf9.disabled = true; // Disable the tile with the highest value (empty space)
  }
  
  // Function to get an array of random values for the puzzle
  function getRandomValues() {
    const values = [];
    for (let i = 1; i <= size * size; i++) {
      values.push(i); // Add numbers from 1 to size*size to the array
    }
  
    const randomValues = values.sort(() => Math.random() - 0.5); // Shuffle the array using a random sort function
    return randomValues; // Return the shuffled array
  }
  
  // Function to handle user input (keydown events)
  function handleInput() {
    document.addEventListener("keydown", handleKeyDown); // Add event listener for keydown events
  }
  
  // Function to handle keydown events and move the tiles accordingly
  function handleKeyDown(e) {
    e.preventDefault(); // Prevent the default scrolling behavior
  
    if (e.key === "ArrowUp") {
      moveUp(); // Move the empty tile up
    } else if (e.key === "ArrowDown") {
      moveDown(); // Move the empty tile down
    } else if (e.key === "ArrowLeft") {
      moveLeft(); // Move the empty tile to the left
    } else if (e.key === "ArrowRight") {
      moveRight(); // Move the empty tile to the right
    }
  
    renderPuzzle(); // Render the updated puzzle on the screen
  }
  
  // Function to move the empty tile to the left
  function moveLeft() {
    const emptyPuzzle = getEmptyPuzzle(); // Get the empty tile
    const rightPuzzle = getRightPuzzle(); // Get the tile on the right of the empty tile
    if (rightPuzzle) {
      swapPositions(emptyPuzzle, rightPuzzle, true); // Swap the positions of the tiles (horizontal movement)
    }
  }
  
  // Function to move the empty tile to the right
  function moveRight() {
    const emptyPuzzle = getEmptyPuzzle(); // Get the empty tile
    const leftPuzzle = getLeftPuzzle(); // Get the tile on the left of the empty tile
    if (leftPuzzle) {
      swapPositions(emptyPuzzle, leftPuzzle, true); // Swap the positions of the tiles (horizontal movement)
    }
  }
  
  // Function to move the empty tile up
  function moveUp() {
    const emptyPuzzle = getEmptyPuzzle(); // Get the empty tile
    const belowPuzzle = getBelowPuzzle(); // Get the tile below the empty tile
    if (belowPuzzle) {
      swapPositions(emptyPuzzle, belowPuzzle, false); // Swap the positions of the tiles (vertical movement)
    }
  }
  
  // Function to move the empty tile down
  function moveDown() {
    const emptyPuzzle = getEmptyPuzzle(); // Get the empty tile
    const abovePuzzle =getAbovePuzzle(); // Get the tile above the empty tile
    if (abovePuzzle) {
      swapPositions(emptyPuzzle, abovePuzzle, false); // Swap the positions of the tiles (vertical movement)
    }
  }
  
  // Function to swap the positions of two tiles
  function swapPositions(firstPuzzle, secondPuzzle, isX = false) {
    let temp = firstPuzzle.position;
    firstPuzzle.position = secondPuzzle.position; // Swap the positions of the tiles
  
    if (isX) {
      temp = firstPuzzle.x;
      firstPuzzle.x = secondPuzzle.x; // Swap the x-coordinates of the tiles
      secondPuzzle.x = temp;
    } else {
      temp = firstPuzzle.y;
      firstPuzzle.y = secondPuzzle.y; // Swap the y-coordinates of the tiles
      secondPuzzle.y = temp;
    }
  }
  
  // Function to get the tile on the right of the empty tile
  function getRightPuzzle() {
    const emptyPuzzle = getEmptyPuzzle(); // Get the empty tile
    const isRightEdge = getCol(emptyPuzzle.position) === size; // Check if the empty tile is on the right edge
    if (isRightEdge) {
      return null; // If it is on the right edge, return null
    }
    const puzzle = getPuzzleByPos(emptyPuzzle.position + 1); // Get the tile on the right by incrementing the position
    return puzzle; // Return the right tile
  }
  
  // Function to get the tile on the left of the empty tile
  function getLeftPuzzle() {
    const emptyPuzzle = getEmptyPuzzle(); // Get the empty tile
    const isLeftEdge = getCol(emptyPuzzle.position) === 1; // Check if the empty tile is on the left edge
    if (isLeftEdge) {
      return null; // If it is on the left edge, return null
    }
    const puzzle = getPuzzleByPos(emptyPuzzle.position - 1); // Get the tile on the left by decrementing the position
    return puzzle; // Return the left tile
  }
  
  // Function to get the tile above the empty tile
  function getAbovePuzzle() {
    const emptyPuzzle = getEmptyPuzzle(); // Get the empty tile
    const isTopEdge = getRow(emptyPuzzle.position) === 1; // Check if the empty tile is on the top edge
    if (isTopEdge) {
      return null; // If it is on the top edge, return null
    }
    const puzzle = getPuzzleByPos(emptyPuzzle.position - size); // Get the tile above by subtracting the size from the position
    return puzzle; // Return the above tile
  }
  
  // Function to get the tile below the empty tile
  function getBelowPuzzle() {
    const emptyPuzzle = getEmptyPuzzle(); // Get the empty tile
    const isBottomEdge = getRow(emptyPuzzle.position) === size; // Check if the empty tile is on the bottom edge
    if (isBottomEdge) {
      return null; // If it is on the bottom edge, return null
    }
    const puzzle = getPuzzleByPos(emptyPuzzle.position + size); // Get the tile below by adding the size to the position
    return puzzle; // Return the below tile
  }
  
  // Function to get the empty tile
  function getEmptyPuzzle() {
    return puzzle.find((item) => item.disabled); // Find and return the tile with the disabled property (empty tile)
  }
  
  // Function to get the tile with a specific position
  function getPuzzleByPos(pos) {
    return puzzle.find((item) => item.position === pos); // Find and return the tile with the given position
  }
  