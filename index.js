const apiKey = "your-api-key"; // Replace with your actual OMDB API key
const baseURL = "http://www.omdbapi.com/";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const movieDisplay = document.getElementById("movie-display");

searchButton.addEventListener("click", async () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm === "") {
    alert("Please enter a movie title.");
    return;
  }

  try {
    const response = await fetch(`${baseURL}?apikey=${apiKey}&t=${searchTerm}`);
    if (!response.ok) {
      throw new Error("Movie not found!");
    }

    const data = await response.json();
    displayMovie(data);
  } catch (error) {
    console.error("Error fetching movie:", error.message);
    alert("Movie not found. Please try again.");
  }
});

function displayMovie(movieData) {
  movieDisplay.innerHTML = ""; // Clear previous content

  const { Title, Year, Plot, Poster } = movieData;

  const movieInfo = document.createElement("div");
  movieInfo.classList.add("movie-info");

  const titleElement = document.createElement("h2");
  titleElement.textContent = Title;

  const yearElement = document.createElement("p");
  yearElement.textContent = `Released: ${Year}`;

  const plotElement = document.createElement("p");
  plotElement.textContent = `Plot: ${Plot}`;

  const posterElement = document.createElement("img");
  posterElement.src = Poster;
  posterElement.alt = Title;
  posterElement.classList.add("poster");

  movieInfo.appendChild(titleElement);
  movieInfo.appendChild(yearElement);
  movieInfo.appendChild(plotElement);
  movieInfo.appendChild(posterElement);

  movieDisplay.appendChild(movieInfo);
}
