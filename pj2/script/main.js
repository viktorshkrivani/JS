// Function to redirect to the next page
function startGame() {
    window.location.href = "game.html"; // Redirects to game.html
}

// Add an event listener to the entire body
document.body.addEventListener("click", startGame);