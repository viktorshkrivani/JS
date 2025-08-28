// Wait for the DOM to load before executing scripts
document.addEventListener("DOMContentLoaded", () => {
  // Load data for each league
  loadLeague('json/uefa.cl.json', 'uefa-champions-league');
  loadLeague('json/at.1.json', 'austria-league');
  loadLeague('json/es.2.json', 'segunda-division');
  loadLeague('json/it.1.json', 'italian-serie-a');
  loadLeague('json/en.1.json', 'english-premier-league');
  loadLeague('json/fr.1.json', 'french-ligue-1');
  loadLeague('json/de.1.json', 'german-bundesliga');
});

// Fetch league data and populate the container
function loadLeague(jsonPath, containerId) {
  fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
      const matches = data.matches;
      const container = document.getElementById(containerId);

      // Display the first 5 matches
      matches.slice(0, 5).forEach(match => {
        createGameLine(container, match);
      });

      // Add "more" link to load additional matches
      const moreLink = document.createElement("div");
      moreLink.className = "more-link";
      moreLink.textContent = "more ...";
      moreLink.onclick = () => toggleMore(container, matches);
      container.appendChild(moreLink);
    })
    .catch(err => console.error("Error loading league data:", err));
}

// Create a game line element for a match
function createGameLine(container, match) {
  const div = document.createElement("div");
  div.className = "game-line";
  div.innerHTML = `
    <div class="team-names">${match.team1} vs ${match.team2}</div>
    <div class="match-info">${match.date} | ${match.time}</div>
    <div class="score">${match.score.ft ? match.score.ft[0] + " - " + match.score.ft[1] : "TBD"}</div>
  `;
  container.appendChild(div);
}

// Load additional matches when "more" is clicked
function toggleMore(container, matches) {
  const currentCount = container.querySelectorAll(".game-line").length;
  const moreLink = container.querySelector(".more-link");

  // Load the next 5 matches
  matches.slice(currentCount, currentCount + 5).forEach(match => {
    createGameLine(container, match);
  });

  // Hide the "more" link if all matches are displayed
  if (currentCount + 5 >= matches.length) {
    moreLink.style.display = "none";
  }
}
