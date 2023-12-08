// Helper Functions
function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }
  
  // CORE FUNCTIONS: DATA
  // genre titles
  const getGenreNames = async () => {
    try {
      const url = "https://steam-api-mass.onrender.com/genres?limit=6";
      const res = await fetch(url);
      const data = await res.json();
      const genres = data.data.map(({ name }) => name);
      return genres;
    } catch (error) {
      console.log("Error:", error);
    }
  };
  
  // data of all games
  const getAllGamesData = async () => {
    try {
      const url = "https://steam-api-mass.onrender.com/games?limit=12";
      const res = await fetch(url);
      const data = await res.json();
      return data.data;
    } catch (error) {
      console.log("Error:", error);
    }
  };
  
  // data of specific genre
  const getGenreData = async (genre) => {
    try {
      const url = `https://steam-api-mass.onrender.com/games?genres=${genre}&limit=12`;
      const res = await fetch(url);
      const data = await res.json();
      return data.data;
    } catch (error) {
      console.log("Error:", error);
    }
  };
  
  // get the games detail
  const getGameDetail = async (appid) => {
    try {
      const url = `https://steam-api-mass.onrender.com/single-game/${appid}`;
      const res = await fetch(url);
      const data = await res.json();
      return data.data;
    } catch (error) {
      console.log("Error:", error);
    }
  };
  
  //DISPLAY
  const displayGame = async (gameData) => {
    //Container
    const gameDiv = document.createElement("div");
    gameDiv.className = "game";
    gameDiv.id = `${gameData.appid}`;
    //Image
    const imgElement = document.createElement("img");
    imgElement.src = gameData.header_image;
    imgElement.alt = gameData.name;
    gameDiv.appendChild(imgElement);
    //Name
    const titleElement = document.createElement("h3");
    titleElement.className = "title";
    titleElement.textContent = gameData.name;
    gameDiv.appendChild(titleElement);
    //Price
    const priceElement = document.createElement("span");
    priceElement.className = "price";
    if (gameData.price === 0) {
      priceElement.textContent = "Free";
    } else {
      priceElement.textContent = "$" + gameData.price;
    }
    gameDiv.appendChild(priceElement);
    //Genre
    const genreGroup = document.createElement("div");
    gameData.genres.forEach((genre, index) => {
      const genreElement = document.createElement("span");
      genreElement.className = "genre";
      if (index + 1 !== gameData.genres.length) {
        genreElement.textContent = toTitleCase(genre) + ", ";
      } else {
        genreElement.textContent = toTitleCase(genre);
      }
      genreGroup.append(genreElement);
    });
    gameDiv.appendChild(genreGroup);
    return gameDiv;
  };
  
  const displayGameDetail = async (gameData) => {
    const appid = gameData.appid;
  
    // Create game detail container
    const detailDiv = document.createElement("div");
    detailDiv.className = "gameDetails";
    detailDiv.dataset.appid = appid;
  
    // Fetch game detail using getGameDetail
    const gameDetail = await getGameDetail(appid);
  
    // Access the properties of gameDetail and add them to detailDiv
    const titleElement = document.createElement("h3");
    titleElement.textContent = gameDetail.name;
    titleElement.id = "genre-name";
    detailDiv.appendChild(titleElement);
  
    const imgElement = document.createElement("img");
    imgElement.src = gameDetail.header_image;
    imgElement.alt = gameDetail.name;
    detailDiv.appendChild(imgElement);
  
    const priceElement = document.createElement("span");
    priceElement.className = "price";
    if (gameDetail.price === 0) {
      priceElement.textContent = "Free to play";
    } else {
      priceElement.textContent = "$" + gameDetail.price;
    }
    detailDiv.appendChild(priceElement);
  
    const genreElement = document.createElement("span");
    genreElement.className = "genre";
  
    let genresText = gameDetail.genres.map(toTitleCase);
    genresText = genresText.join(", ");
    genreElement.textContent = genresText;
    detailDiv.appendChild(genreElement);
  
    const gameDesciption = document.createElement("span");
    gameDesciption.textContent = gameDetail.description;
    gameDesciption.className = "description";
    detailDiv.appendChild(gameDesciption);
  
    return detailDiv;
  };
  
  const displayNavBar = (genre) => {
    const genresButton = document.createElement("li");
    genresButton.className = "genre";
    genresButton.id = `${genre}`;
    genresButton.textContent = genre.charAt(0).toUpperCase() + genre.slice(1);
    return genresButton;
  };
  
  //INTEGRATION
  const renderGames = async () => {
    //Change page title
    const title = document.getElementById("genre-name");
    title.textContent = "GAMES";
    //Get data
    const data = await getAllGamesData();
  
    //Display All Game
    const ulGameGallery = document.getElementById("game-gallery");
    ulGameGallery.innerHTML = "";
    data.forEach(async (gameData) => {
      // Display
      const gameDiv = await displayGame(gameData);
      ulGameGallery.append(gameDiv);
  
      // Event Handler
      gameDiv.addEventListener("click", async () => {
        const gameSection = document.getElementById("game-gallery");
        gameSection.innerHTML = "";
        //Erase Genre Name
        const genreName = document.getElementById("genre-name");
        genreName.innerHTML = "";
        const detailData = await getGameDetail(gameData.appid);
        const detailDiv = await displayGameDetail(detailData);
        gameSection.appendChild(detailDiv);
      });
    });
  };
  
  const renderNavBar = async () => {
    //Get data
    const genreNames = await getGenreNames();
  
    //Display Navbar
    const genreGroup = document.getElementById("genreGroup"); //Navbar container
    genreNames.forEach(async (genre) => {
      const genresButton = displayNavBar(genre);
      //Click Event
      genresButton.addEventListener("click", async () => {
        //Change title
        const title = document.getElementById("genre-name");
        title.textContent = genre.toUpperCase();
  
        const genreData = await getGenreData(genre);
        // Clear the current game gallery
        const ulGameGallery = document.getElementById("game-gallery");
        ulGameGallery.innerHTML = "";
  
        // Display games from the selected genre
        genreData.forEach(async (gameData) => {
          const gameDiv = await displayGame(gameData);
          ulGameGallery.append(gameDiv);
  
          //Add detail click event to each display
          gameDiv.addEventListener("click", async () => {
            const gameSection = document.getElementById("game-gallery");
            gameSection.innerHTML = "";
            const genreName = document.getElementById("genre-name");
            genreName.innerHTML = "";
            const detailData = await getGameDetail(gameData.appid);
            const detailDiv = await displayGameDetail(detailData);
            gameSection.appendChild(detailDiv);
          });
        });
      });
      genreGroup.appendChild(genresButton);
    });
  };
  
  renderGames();
  renderNavBar();
  
  // SEARCH
  
  const search = document.getElementById("searchForm");
  search.addEventListener("input", (e) => {
    // Add event listener to search input field
    const searchTerm = e.target.value.toLowerCase();
    // Get all game elements currently displayed on screen
    const games = Array.from(document.querySelectorAll("#game-gallery .game"));
    // Hide all games that don't match the search term
    games.forEach((game) => {
      const title = game.querySelector(".title").textContent.toLowerCase();
      if (title.includes(searchTerm)) {
        game.style.display = "flex";
      } else {
        game.style.display = "none";
      }
    });
  });
  