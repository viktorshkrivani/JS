// Change the text after 5 seconds
setTimeout(() => {
    // Update the main text and subtext
    document.getElementById("mainText").textContent = "YOU STILL HERE?? OKAY OKAY LET'S PLAY";
    document.getElementById("subText").textContent = "But first, find the right answer, Dr. J...";

    // After another 3 seconds, change the text again and display the question
    setTimeout(() => {
        // Update the main text to "SAVE DR. J"
        document.getElementById("mainText").textContent = "SAVE DR. J";

        // Add the question dynamically
        const main = document.querySelector("main");

        // Create a question container
        const questionContainer = document.createElement("div");
        questionContainer.id = "questionContainer";
        questionContainer.style.textAlign = "center";
        questionContainer.style.marginTop = "20px";

        // Add the question
        const question = document.createElement("h3");
        question.textContent = "4 x 11 equal toooo?";
        question.style.color = "#333"; // Match the text style
        questionContainer.appendChild(question);

        // Add the input field
        const input = document.createElement("input");
        input.type = "number";
        input.id = "answerInput";
        input.placeholder = "Your answer...";
        input.style.marginRight = "10px";
        questionContainer.appendChild(input);

        // Add the submit button
        const button = document.createElement("button");
        button.textContent = "Submit";
        button.style.cursor = "pointer";
        button.addEventListener("click", () => {
            const answer = parseInt(document.getElementById("answerInput").value, 10);
            if (answer === 44) {
                window.location.href = "main.html"; // Redirect to the game page
            } else {
                alert("Wrong answer! Try again.");
            }
        });
        questionContainer.appendChild(button);

        // Append the question container to the main element
        main.appendChild(questionContainer);
    }, 3000); // 3000 milliseconds = 3 seconds
}, 5000); // 5000 milliseconds = 5 seconds