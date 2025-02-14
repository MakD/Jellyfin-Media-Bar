/**
 * Credentials for a given server
 * @typedef {Object} ServerCredentials
 * @property {string} Id
 * @property {string} AccessToken
 */

/**
 * Credentials
 * @typedef {Object} Credentials
 * @property {ServerCredentials[]} Servers
 */

/**
 * Fetches the credentials inside of localstorage
 * @returns {{token: string, userId: string}} Credential resource
 */
const getJellyfinCredentials = () => {
  const jellyfinCreds = localStorage.getItem("jellyfin_credentials");

  try {
    /**
     * @type {Credentials}
     */
    const serverCredentials = JSON.parse(jellyfinCreds);

    const firstServer = serverCredentials.Servers[0];

    if (!firstServer) {
      console.error("Could not find credentials for the client");
      return;
    }

    return { token: firstServer.AccessToken, userId: firstServer.UserId };
  } catch (e) {
    console.error("Could not parse jellyfin credentials", e);
  }
};

const slidesInit = () => {
  if (window.hasInitializedSlideshow) {
    console.log("Slideshow already initialized. Skipping re-init.");
    return;
  }
  window.hasInitializedSlideshow = true;
  const shuffleInterval = 8000;
  let isTransitioning = false;
  const listFileName = `${window.location.origin}/web/avatars/list.txt`;

  const { token, userId } = getJellyfinCredentials();

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  const truncateText = (element, maxLength) => {
    let text = element.innerText;
    if (text.length > maxLength)
      element.innerText = text.substring(0, maxLength) + "...";
  };

  const createSlideElement = (item, title) => {
    const itemId = item.Id;
    const plot = item.Overview || "No overview available";
    const rating = item.CommunityRating;
    const criticRating = item.CriticRating;
    const runtime = item.RunTimeTicks;
    const genresArray = item.Genres;
    const youtube = item.RemoteTrailers;
    const age = item.OfficialRating;
    const date = item.PremiereDate;
    const season = item.ChildCount;

    function createSeparator() {
      const separatorHtml =
        '<i class="material-icons radio_button_off separator-icon"></i>';
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = separatorHtml;
      return tempDiv.firstChild;
    }
    const slide = document.createElement("a");
    slide.className = "slide";
    slide.target = "_top";
    slide.rel = "noreferrer";
    slide.tabIndex = 0;
    slide.style.display = "none";
    const backdrop = document.createElement("img");
    backdrop.className = "backdrop";
    backdrop.src = `${window.location.origin}/Items/${itemId}/Images/Backdrop/0`;
    backdrop.alt = "Backdrop";

    const backdropOverlay = document.createElement("div");
    backdropOverlay.className = "backdrop-overlay";

    const backdropContainer = document.createElement("div");
    backdropContainer.className = "backdrop-container";
    backdropContainer.appendChild(backdrop);
    backdropContainer.appendChild(backdropOverlay);

    const logo = document.createElement("img");
    logo.className = "logo";
    logo.src = `${window.location.origin}/Items/${itemId}/Images/Logo`;
    logo.alt = "Logo";

    const logoContainer = document.createElement("div");
    logoContainer.className = "logo-container";
    logoContainer.appendChild(logo);

    const featuredContent = document.createElement("div");
    featuredContent.className = "featured-content";
    featuredContent.textContent = title;

    const plotElement = document.createElement("div");
    plotElement.className = "plot";
    plotElement.textContent = plot;
    truncateText(plotElement, 360);

    const plotContainer = document.createElement("div");
    plotContainer.className = "plot-container";
    plotContainer.appendChild(plotElement);

    const gradientOverlay = document.createElement("div");
    gradientOverlay.className = "gradient-overlay";

    const runTimeElement = document.createElement("div");
    runTimeElement.className = "runTime";

    if (season === undefined) {
      const milliseconds = runtime / 10000;
      const currentTime = new Date();
      const endTime = new Date(currentTime.getTime() + milliseconds);
      const options = { hour: "2-digit", minute: "2-digit", hour12: !0 };
      const formattedEndTime = endTime.toLocaleTimeString([], options);
      runTimeElement.textContent = `Ends at ${formattedEndTime}`;
    } else {
      runTimeElement.textContent = `${season} Season${season > 1 ? "s" : ""}`;
    }

    const ratingTest = document.createElement("div");
    ratingTest.className = "rating-value";

    const imdbLogo = document.createElement("img");
    imdbLogo.className = "imdb-logo";
    imdbLogo.src =
      "https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg";
    imdbLogo.alt = "IMDb Logo";
    imdbLogo.style.width = "30px";
    imdbLogo.style.height = "30px";
    ratingTest.appendChild(imdbLogo);

    if (typeof rating === "number") {
      const formattedRating = rating.toFixed(1);
      ratingTest.innerHTML += `${formattedRating} ⭐`;
    } else {
      console.error("Rating is undefined or not a number:", rating);
      ratingTest.innerHTML += `N/A ⭐`;
    }
    ratingTest.appendChild(createSeparator());

    const tomatoRatingDiv = document.createElement("div");
    tomatoRatingDiv.className = "tomato-rating";

    const tomatoLogo = document.createElement("img");
    tomatoLogo.className = "tomato-logo";
    tomatoLogo.src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Rotten_Tomatoes_positive_audience.svg/1920px-Rotten_Tomatoes_positive_audience.svg.png";

    const criticLogo = document.createElement("img");
    criticLogo.className = "critic-logo";

    let valueElement;
    if (typeof criticRating === "number") {
      valueElement = document.createTextNode(`${criticRating}% `);
    } else {
      valueElement = document.createTextNode(`N/A `);
    }

    if (criticRating === undefined || criticRating <= 59) {
      criticLogo.src =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Rotten_Tomatoes_rotten.svg/1024px-Rotten_Tomatoes_rotten.svg.png";
      criticLogo.alt = "Rotten Tomato";
    } else {
      criticLogo.src = "https://i.imgur.com/iMfwDk7.png";
      criticLogo.alt = "Fresh Tomato";
    }
    tomatoLogo.style.width = "15px";
    tomatoLogo.style.height = "17px";
    criticLogo.style.width = "15px";
    criticLogo.style.height = "15px";

    tomatoRatingDiv.appendChild(tomatoLogo);
    tomatoRatingDiv.appendChild(valueElement);
    tomatoRatingDiv.appendChild(criticLogo);
    tomatoRatingDiv.appendChild(createSeparator());

    const ageRatingDiv = document.createElement("div");
    ageRatingDiv.className = "age-rating";

    if (item.OfficialRating) {
      ageRatingDiv.innerHTML = `${item.OfficialRating}`;
    } else {
      ageRatingDiv.innerHTML = `N/A`;
    }

    const calender = "📅";
    const premiereDate = document.createElement("div");
    premiereDate.className = "date";

    const year = date ? new Date(date).getFullYear() : "N/A";
    premiereDate.textContent = isNaN(year) ? "N/A" : year;

    ratingTest.appendChild(tomatoRatingDiv);
    ratingTest.appendChild(document.createTextNode(calender));
    ratingTest.appendChild(premiereDate);
    ratingTest.appendChild(createSeparator());
    ratingTest.appendChild(ageRatingDiv);
    ratingTest.appendChild(createSeparator());
    ratingTest.appendChild(runTimeElement);

    function parseGenres(genresArray) {
      if (genresArray && genresArray.length > 0) {
        return genresArray.slice(0, 3).join(" 🔹 ");
      } else {
        return "No Genre Available";
      }
    }

    const genreElement = document.createElement("div");
    genreElement.className = "genre";
    genreElement.innerHTML = parseGenres(genresArray);

    const infoContainer = document.createElement("div");
    infoContainer.className = "info-container";
    infoContainer.appendChild(ratingTest);
    // Create a container for the buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container"; // Add a class for styling

    // Create the Play button
    const playButton = document.createElement("button");
    playButton.className = "play-button";
    playButton.innerHTML = `
  <span class="play-icon"><i class="material-icons play_circle_outline"></i></span>
  <span class="play-text">Play</span>
`;
    playButton.onclick = async () => {
      if (!window.PlaybackManager) {
        console.error("PlaybackManager is not available.");
        return;
      }

      if (!window.ApiClient) {
        console.error("Jellyfin API client is not available.");
        return;
      }

      const apiClient = window.ApiClient;
      const userId = apiClient.getCurrentUserId();

      if (!userId) {
        console.error("User not found.");
        return;
      }

      try {
        // Fetch the media item details
        const item = await apiClient.getItem(userId, itemId);
        if (!item) {
          console.error("Media item not found.");
          return;
        }

        // Initiate playback using PlaybackManager
        window.PlaybackManager.play({
          items: [item],
          startPositionTicks: 0, // Start from beginning
          isMuted: false,
          isPaused: false,
        })
          .then(() => {
            console.log("Playback started successfully.");
          })
          .catch((error) => {
            console.error("Failed to start playback:", error);
          });
      } catch (error) {
        console.error("Error starting playback:", error);
      }
    };

    // Create the Details button
    const detailButton = document.createElement("button");
    detailButton.className = "detail-button";
    detailButton.innerHTML = `
  <span class="detail-icon"><i class="material-icons info_outline"></i></span>
  <span class="detail-text">Info</span>
`;
    detailButton.onclick = () => {
      window.top.location.href = `/#!/details?id=${itemId}`;
    };

    // Append buttons to the button container
    buttonContainer.appendChild(playButton);
    buttonContainer.appendChild(detailButton);

    // Append all elements to the slide
    slide.append(
      logoContainer,
      backdropContainer,
      gradientOverlay,
      featuredContent,
      plotContainer,
      infoContainer,
      genreElement,
      buttonContainer
    );

    return slide;
  };
  const createSlideForItem = async (item, title) => {
    const container = document.getElementById("slides-container");
    const itemId = item.Id;
    const backdropUrl = `${window.location.origin}/Items/${itemId}/Images/Backdrop/0`;
    const logoUrl = `${window.location.origin}/Items/${itemId}/Images/Logo`;
    const [backdropExists, logoExists] = await Promise.all([
      fetch(backdropUrl, { method: "HEAD" }).then((res) => res.ok),
      fetch(logoUrl, { method: "HEAD" }).then((res) => res.ok),
    ]);
    if (backdropExists && logoExists) {
      const slideElement = createSlideElement(item, title);
      container.appendChild(slideElement);
      console.log(`Added slide for item ${itemId}`);
      if (container.children.length === 1) {
        showSlide(0);
      }
    } else {
      console.warn(`Skipping item ${itemId}: Missing backdrop or logo.`);
    }
  };
  const fetchItemDetails = async (itemId) => {
    const response = await fetch(`${window.location.origin}/Items/${itemId}`, {
      headers: {
        Authorization: `MediaBrowser Client="Jellyfin Web", Device="YourDeviceName", DeviceId="YourDeviceId", Version="YourClientVersion", Token="${token}"`,
      },
    });
    const item = await response.json();
    console.log("Item Title:", item.Name);
    return item;
  };
  const fetchItemIdsFromList = async () => {
    try {
      const response = await fetch(listFileName);
      if (!response.ok) {
        throw new Error("Failed to fetch list.txt");
      }
      const text = await response.text();
      return text
        .split("\n")
        .map((id) => id.trim())
        .filter((id) => id)
        .slice(1);
    } catch (error) {
      console.error("Error fetching list.txt:", error);
      return [];
    }
  };
  const fetchItemsFromServer = async () => {
    try {
      const response = await fetch(
        `${window.location.origin}/Items?IncludeItemTypes=Movie,Series&Recursive=true&hasOverview=true&imageTypes=Logo,Backdrop&SortBy=random&isPlayed=False&Limit=500`,
        {
          headers: {
            Authorization: `MediaBrowser Client="Jellyfin Web", Device="YourDeviceName", DeviceId="YourDeviceId", Version="YourClientVersion", Token="${token}"`,
          },
        }
      );
      const data = await response.json();
      const items = data.Items;
      const movies = items.filter((item) => item.Type === "Movie");
      const tvShows = items.filter((item) => item.Type === "Series");
      const shuffledMovies = shuffleArray(movies);
      const shuffledTvShows = shuffleArray(tvShows);
      const selectedMovies = shuffledMovies.slice(0, 15);
      const selectedTvShows = shuffledTvShows.slice(0, 15);
      const allItems = [];
      const maxLength = Math.max(selectedMovies.length, selectedTvShows.length);
      for (let i = 0; i < maxLength; i++) {
        if (i < selectedMovies.length) allItems.push(selectedMovies[i]);
        if (i < selectedTvShows.length) allItems.push(selectedTvShows[i]);
      }
      return allItems;
    } catch (error) {
      console.error("Error fetching items:", error);
      return [];
    }
  };
  const createSlidesForItems = async (items) => {
    await Promise.all(
      items.map((item) =>
        createSlideForItem(item, item.Type === "Movie" ? "Movie" : "TV Show")
      )
    );
  };
  const createPaginationDots = () => {
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "dots-container";
    for (let i = 0; i < 5; i++) {
      const dot = document.createElement("span");
      dot.className = "dot";
      dotsContainer.appendChild(dot);
    }
    const container = document.getElementById("slides-container");
    container.appendChild(dotsContainer);
  };
  const showSlide = (index) => {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    slides.forEach((slide, i) => {
      if (i === index) {
        console.log(`Showing slide ${index}`); // Debugging
        slide.style.removeProperty("display");
        slide.style.display = "block";
        slide.offsetHeight;
        slide.style.opacity = "1";
        slide.classList.add("active");
      } else {
        slide.style.opacity = "0";
        slide.classList.remove("active");
        setTimeout(() => {
          slide.style.display = "none";
        }, 500);
      }
      document.getElementById("slides-container").offsetHeight;
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index % 5);
    });
  };
  const initializeSlideshow = () => {
    const slides = document.querySelectorAll(".slide");
    createPaginationDots();
    const container = document.getElementById("slides-container");
    let currentSlideIndex = 0;
    let focusedSlide = null;
    let containerFocused = !1;
    const updateCurrentSlide = (index) => {
      if (isTransitioning) return;
      isTransitioning = true;
      currentSlideIndex = (index + slides.length) % slides.length;
      showSlide(currentSlideIndex);
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    };
    const openActiveSlide = () => {
      if (focusedSlide) {
        window.location.href = focusedSlide.href;
      }
    };
    if (slides.length > 0) {
      showSlide(currentSlideIndex);
      container.style.display = "block";
      setTimeout(() => {
        setInterval(() => {
          updateCurrentSlide(currentSlideIndex + 1);
        }, shuffleInterval);
      }, 8000);
    }
    slides.forEach((slide) => {
      slide.addEventListener(
        "focus",
        () => {
          focusedSlide = slide;
          container.classList.remove("disable-interaction");
        },
        !0
      );
      slide.addEventListener(
        "blur",
        () => {
          if (focusedSlide === slide) {
            focusedSlide = null;
          }
        },
        !0
      );
    });
    document.addEventListener("keydown", (event) => {
      if (containerFocused) {
        switch (event.keyCode) {
          case 37:
            updateCurrentSlide(currentSlideIndex - 1);
            break;
          case 39:
            updateCurrentSlide(currentSlideIndex + 1);
            break;
          case 13:
          case 32:
            openActiveSlide();
            break;
        }
      }
    });
    const leftArrow = document.createElement("div");
    const rightArrow = document.createElement("div");
    leftArrow.classList.add("arrow", "left-arrow");
    rightArrow.classList.add("arrow", "right-arrow");
    leftArrow.innerHTML = '<i class="material-icons arrow_back_ios_new"></i>';
    rightArrow.innerHTML = '<i class="material-icons arrow_forward_ios"></i>';
    container.appendChild(leftArrow);
    container.appendChild(rightArrow);
    leftArrow.addEventListener("click", () =>
      updateCurrentSlide(currentSlideIndex - 1)
    );
    rightArrow.addEventListener("click", () =>
      updateCurrentSlide(currentSlideIndex + 1)
    );
    container.addEventListener("focus", () => {
      containerFocused = !0;
    });
    container.addEventListener("blur", () => {
      containerFocused = !1;
    });
  };
  const initializeSlides = async () => {
    const itemIds = await fetchItemIdsFromList();
    let items;
    if (itemIds.length > 0) {
      const itemPromises = itemIds.map((id) => fetchItemDetails(id));
      items = await Promise.all(itemPromises);
    } else {
      const allItems = await fetchItemsFromServer();
      const itemPromises = allItems.map((item) => fetchItemDetails(item.Id));
      items = await Promise.all(itemPromises);
    }
    items = shuffleArray(items);
    await createSlidesForItems(items);
    initializeSlideshow();
  };
  initializeSlides();
};
