// script.js

// Function to make an API call and retrieve movie recommendations
function getMovieRecommendations() {
    const moodSelect = document.getElementById("mood");
    const genreSelect = document.getElementById("genre");
    const recommendationsContainer = document.getElementById("recommendations-container");

    const selectedMood = moodSelect.value;
    const selectedGenre = genreSelect.value;

    // Make an API call to retrieve movie recommendations
    fetch("/recommendation", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mood: selectedMood,
            genre: selectedGenre
        })
    })
    .then(response => response.json())
    .then(data => {
        // Clear previous recommendations
        recommendationsContainer.innerHTML = "";

        // Display recommended movies
        data.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <h2>${movie.title}</h2>
                <p><strong>Genre:</strong> ${movie.genre}</p>
                <p><strong>Mood:</strong> ${movie.mood}</p>
                <p>${movie.summary}</p>
                <p><strong>Rating:</strong> ${movie.rating}</p>
            `;
            recommendationsContainer.appendChild(movieCard);
        });
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

// Add click event listener to the "What Movie to Watch Next" button
const recommendButton = document.getElementById("recommend-button");
recommendButton.addEventListener("click", getMovieRecommendations);
