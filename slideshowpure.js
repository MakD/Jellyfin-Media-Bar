/*
 * Jellyfin Slideshow by M0RPH3US - Core Module
 */

// Configuration
const CONFIG = {
  IMAGE_URLS: {
    imdbLogo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg',
    tomatoLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Rotten_Tomatoes_positive_audience.svg/1920px-Rotten_Tomatoes_positive_audience.svg.png',
    freshTomato: 'https://i.imgur.com/iMfwDk7.png',
    rottenTomato: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Rotten_Tomatoes_rotten.svg/1024px-Rotten_Tomatoes_rotten.svg.png'
  },
  shuffleInterval: 8000,
  retryInterval: 500,
  minSwipeDistance: 50,
  loadingCheckInterval: 100,
  maxPlotLength: 360,
  maxMovies: 15,
  maxTvShows: 15,
  maxItems: 500,
  preloadCount: 2,
  fadeTransitionDuration: 500
};

// State management
const STATE = {
  jellyfinData: {
    userId: null,
    appName: null,
    appVersion: null,
    deviceName: null,
    deviceId: null,
    accessToken: null,
    serverAddress: null
  },
  slideshow: {
    hasInitialized: false,
    isTransitioning: false,
    currentSlideIndex: 0,
    focusedSlide: null,
    containerFocused: false,
    slideInterval: null,
    itemIds: [],
    loadedItems: {},
    createdSlides: {},
    totalItems: 0,
    isLoading: false
  }
};

// Request throttling system
const requestQueue = [];
let isProcessingQueue = false;

/**
 * Process the next request in the queue with throttling
 */
const processNextRequest = () => {
  if (requestQueue.length === 0) {
    isProcessingQueue = false;
    return;
  }

  isProcessingQueue = true;
  const { url, callback } = requestQueue.shift();

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response;
      }
      throw new Error(`Failed to fetch: ${response.status}`);
    })
    .then(callback)
    .catch(error => {
      console.error("Error in throttled request:", error);
    })
    .finally(() => {
      setTimeout(processNextRequest, 100);
    });
};

/**
 * Add a request to the throttled queue
 * @param {string} url - URL to fetch
 * @param {Function} callback - Callback to run on successful fetch
 */
const addThrottledRequest = (url, callback) => {
  requestQueue.push({ url, callback });
  if (!isProcessingQueue) {
    processNextRequest();
  }
};

/**
 * Checks if the user is currently logged in
 * @returns {boolean} True if logged in, false otherwise
 */

const isUserLoggedIn = () => {
  try {
    return (
      window.ApiClient &&
      window.ApiClient._currentUser &&
      window.ApiClient._currentUser.Id &&
      window.ApiClient._serverInfo &&
      window.ApiClient._serverInfo.AccessToken
    );
  } catch (error) {
    console.error("Error checking login status:", error);
    return false;
  }
};

/**
 * Initializes Jellyfin data from ApiClient
 * @param {Function} callback - Function to call once data is initialized
 */
const initJellyfinData = (callback) => {
  if (!window.ApiClient) {
    console.warn("⏳ window.ApiClient is not available yet. Retrying...");
    setTimeout(() => initJellyfinData(callback), CONFIG.retryInterval);
    return;
  }

  try {
    const apiClient = window.ApiClient;
    STATE.jellyfinData = {
      userId: apiClient.getCurrentUserId ||
        "Not Found",
      appName: apiClient._appName || "Not Found",
      appVersion: apiClient._appVersion || "Not Found",
      deviceName: apiClient._deviceName || "Not Found",
      deviceId: apiClient._deviceId || "Not Found",
      accessToken: apiClient._serverInfo.AccessToken || "Not Found",
      serverAddress: apiClient._serverAddress || "Not Found"
    };
    if (callback && typeof callback === 'function') {
      callback();
    }
  } catch (error) {
    console.error("Error initializing Jellyfin data:", error);
    setTimeout(() => initJellyfinData(callback), CONFIG.retryInterval);
  }
};

/**
 * Creates and displays loading screen
 */
const initLoadingScreen = () => {
  const currentPath = window.location.href.toLowerCase();
  const isHomePage =
    currentPath.includes("/web/#/home.html") ||
    currentPath.includes("/web/index.html#/home.html") ||
    currentPath.endsWith("/web/");

  if (!isHomePage) return;

  const loadingDiv = document.createElement('div');
  loadingDiv.className = "bar-loading";
  loadingDiv.id = "page-loader";
  loadingDiv.innerHTML = `
    <h1>
      <img src="https://raw.githubusercontent.com/jellyfin/jellyfin-ux/refs/heads/master/branding/android/logo_clean.svg" 
          alt="Server Logo" 
          style="width: 300px; height: auto;">
    </h1>
    <div class="docspinner-loader">
      <div class="loader-spinner-layer"></div>
    </div>
  `;
  document.body.appendChild(loadingDiv);

  const checkInterval = setInterval(() => {
    const loginFormLoaded = document.querySelector(".manualLoginForm");
    const homePageLoaded =
      document.querySelector(".homeSectionsContainer") &&
      document.querySelector(".slide");

    if (loginFormLoaded || homePageLoaded) {
      const loader = document.querySelector('.bar-loading');
      if (loader && typeof $ !== 'undefined') {
        $(loader).fadeOut(700, () => {
          loader.remove();
        });
      } else if (loader) {
        loader.style.opacity = 0;
        loader.style.transition = 'opacity 700ms';
        setTimeout(() => loader.remove(), 700);
      }
      clearInterval(checkInterval);
    }
  }, CONFIG.loadingCheckInterval);
};

/**
 * Resets the slideshow state completely
 */
const resetSlideshowState = () => {
  console.log("🔄 Resetting slideshow state...");

  if (STATE.slideshow.slideInterval) {
    STATE.slideshow.slideInterval.stop();
  }

  const container = document.getElementById("slides-container");
  if (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  STATE.slideshow.hasInitialized = false;
  STATE.slideshow.isTransitioning = false;
  STATE.slideshow.currentSlideIndex = 0;
  STATE.slideshow.focusedSlide = null;
  STATE.slideshow.containerFocused = false;
  STATE.slideshow.slideInterval = null;
  STATE.slideshow.itemIds = [];
  STATE.slideshow.loadedItems = {};
  STATE.slideshow.createdSlides = {};
  STATE.slideshow.totalItems = 0;
  STATE.slideshow.isLoading = false;
};

/**
 * Watches for login status changes
 */
const startLoginStatusWatcher = () => {
  let wasLoggedIn = false;

  setInterval(() => {
    const isLoggedIn = isUserLoggedIn();

    if (isLoggedIn !== wasLoggedIn) {
      if (isLoggedIn) {
        console.log("👤 User logged in. Initializing slideshow...");
        if (!STATE.slideshow.hasInitialized) {
          waitForApiClientAndInitialize();
        } else {
          console.log("🔄 Slideshow already initialized, skipping");
        }
      } else {
        console.log("👋 User logged out. Stopping slideshow...");
        resetSlideshowState();
      }
      wasLoggedIn = isLoggedIn;
    }
  }, 2000);
};

/**
 * Wait for ApiClient to initialize before starting the slideshow
 */
const waitForApiClientAndInitialize = () => {
  if (window.slideshowCheckInterval) {
    clearInterval(window.slideshowCheckInterval);
  }

  window.slideshowCheckInterval = setInterval(() => {
    if (!window.ApiClient) {
      console.log("⏳ ApiClient not available yet. Waiting...");
      return;
    }

    if (
      window.ApiClient._currentUser &&
      window.ApiClient._currentUser.Id &&
      window.ApiClient._serverInfo &&
      window.ApiClient._serverInfo.AccessToken
    ) {
      console.log("🔓 User is fully logged in. Starting slideshow initialization...");
      clearInterval(window.slideshowCheckInterval);

      if (!STATE.slideshow.hasInitialized) {
        initJellyfinData(() => {
          console.log("✅ Jellyfin API client initialized successfully");
          slidesInit();
        });
      } else {
        console.log("🔄 Slideshow already initialized, skipping");
      }
    } else {
      console.log("🔒 Authentication incomplete. Waiting for complete login...");
    }
  }, CONFIG.retryInterval);
};

waitForApiClientAndInitialize();

/**
 * Utility functions for slide creation and management
 */
const SlideUtils = {
  /**
   * Shuffles array elements randomly
   * @param {Array} array - Array to shuffle
   * @returns {Array} Shuffled array
   */
  shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },

  /**
   * Truncates text to specified length and adds ellipsis
   * @param {HTMLElement} element - Element containing text to truncate
   * @param {number} maxLength - Maximum length before truncation
   */
  truncateText(element, maxLength) {
    if (!element) return;

    const text = element.innerText || element.textContent;
    if (text && text.length > maxLength) {
      element.innerText = text.substring(0, maxLength) + "...";
    }
  },

  /**
   * Creates a separator icon element
   * @returns {HTMLElement} Separator element
   */
  createSeparator() {
    const separator = document.createElement('i');
    separator.className = "material-icons radio_button_off separator-icon";
    return separator;
  },

  /**
   * Creates a DOM element with attributes and properties
   * @param {string} tag - Element tag name
   * @param {Object} attributes - Element attributes
   * @param {string|HTMLElement} [content] - Element content
   * @returns {HTMLElement} Created element
   */
  createElement(tag, attributes = {}, content = null) {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'style' && typeof value === 'object') {
        Object.entries(value).forEach(([prop, val]) => {
          element.style[prop] = val;
        });
      } else if (key === 'className') {
        element.className = value;
      } else if (key === 'innerHTML') {
        element.innerHTML = value;
      } else if (key === 'onclick' && typeof value === 'function') {
        element.addEventListener('click', value);
      } else {
        element.setAttribute(key, value);
      }
    });

    if (content) {
      if (typeof content === 'string') {
        element.textContent = content;
      } else {
        element.appendChild(content);
      }
    }

    return element;
  },

  /**
   * Find or create the slides container
   * @returns {HTMLElement} Slides container element
   */
  getOrCreateSlidesContainer() {
    let container = document.getElementById("slides-container");
    if (!container) {
      container = this.createElement('div', { id: 'slides-container' });
      document.body.appendChild(container);
    }
    return container;
  },

  /**
   * Formats genres into a readable string
   * @param {Array} genresArray - Array of genre strings
   * @returns {string} Formatted genres string
   */
  parseGenres(genresArray) {
    if (Array.isArray(genresArray) && genresArray.length > 0) {
      return genresArray.slice(0, 3).join(" 🔹 ");
    }
    return "No Genre Available";
  },

  /**
   * Creates a loading indicator
   * @returns {HTMLElement} Loading indicator element
   */
  createLoadingIndicator() {
    const loadingIndicator = this.createElement('div', {
      className: 'slide-loading-indicator',
      innerHTML: `
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      `
    });
    return loadingIndicator;
  }
};

/**
 * API utilities for fetching data from Jellyfin server
 */
const ApiUtils = {
  /**
   * Fetches details for a specific item by ID
   * @param {string} itemId - Item ID
   * @returns {Promise<Object>} Item details
   */
  async fetchItemDetails(itemId) {
    try {
      if (STATE.slideshow.loadedItems[itemId]) {
        return STATE.slideshow.loadedItems[itemId];
      }

      const response = await fetch(
        `${STATE.jellyfinData.serverAddress}/Items/${itemId}`,
        {
          headers: this.getAuthHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch item details: ${response.statusText}`);
      }

      const itemData = await response.json();

      STATE.slideshow.loadedItems[itemId] = itemData;

      return itemData;
    } catch (error) {
      console.error(`Error fetching details for item ${itemId}:`, error);
      return null;
    }
  },

  /**
   * Fetch item IDs from the list file
   * @returns {Promise<Array>} Array of item IDs
   */
  async fetchItemIdsFromList() {
    try {
      const listFileName = `${STATE.jellyfinData.serverAddress}/web/avatars/list.txt?userId=${STATE.jellyfinData.userId}`;
      const response = await fetch(listFileName);

      if (!response.ok) {
        console.warn("list.txt not found or inaccessible. Using random items.");
        return [];
      }

      const text = await response.text();
      return text
        .split("\n")
        .map(id => id.trim())
        .filter(id => id)
        .slice(1);
    } catch (error) {
      console.error("Error fetching list.txt:", error);
      return [];
    }
  },

  /**
   * Fetches random items from the server
   * @returns {Promise<Array>} Array of item objects
   */
  async fetchItemIdsFromServer() {
    try {
      if (!STATE.jellyfinData.accessToken || STATE.jellyfinData.accessToken === "Not Found") {
        console.warn("Access token not available. Delaying API request...");
        return [];
      }

      if (!STATE.jellyfinData.serverAddress || STATE.jellyfinData.serverAddress === "Not Found") {
        console.warn("Server address not available. Delaying API request...");
        return [];
      }

      console.log("Fetching random items from server...");

      const response = await fetch(
        `${STATE.jellyfinData.serverAddress}/Items?userId=${STATE.jellyfinData.userId}&IncludeItemTypes=Movie,Series&Recursive=true&hasOverview=true&imageTypes=Logo,Backdrop&sortBy=Random&isPlayed=False&Limit=${CONFIG.maxItems}&Fields=Id`,
        {
          headers: this.getAuthHeaders()
        }
      );

      if (!response.ok) {
        console.error(`Failed to fetch items: ${response.status} ${response.statusText}`);
        return [];
      }

      const data = await response.json();
      const items = data.Items || [];

      console.log(`Successfully fetched ${items.length} random items from server`);

      return items.map(item => item.Id);
    } catch (error) {
      console.error("Error fetching item IDs:", error);
      return [];
    }
  },


  /**
   * Get authentication headers for API requests
   * @returns {Object} Headers object
   */
  getAuthHeaders() {
    return {
      'Authorization': `MediaBrowser Client="${STATE.jellyfinData.appName}", Device="${STATE.jellyfinData.deviceName}", DeviceId="${STATE.jellyfinData.deviceId}", Version="${STATE.jellyfinData.appVersion}", Token="${STATE.jellyfinData.accessToken}"`
    };
  },

  /**
   * Send a command to play an item
   * @param {string} itemId - Item ID to play
   * @returns {Promise<boolean>} Success status
   */
  async playItem(itemId) {
    try {
      const sessionId = await this.getSessionId();
      if (!sessionId) {
        console.error("Session ID not found.");
        return false;
      }

      const playUrl = `${STATE.jellyfinData.serverAddress}/Sessions/${sessionId}/Playing?playCommand=PlayNow&itemIds=${itemId}`;
      const playResponse = await fetch(playUrl, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      if (!playResponse.ok) {
        throw new Error(`Failed to send play command: ${playResponse.statusText}`);
      }

      console.log("Play command sent successfully to session:", sessionId);
      return true;
    } catch (error) {
      console.error("Error sending play command:", error);
      return false;
    }
  },

  /**
   * Gets current session ID
   * @returns {Promise<string|null>} Session ID or null
   */
  async getSessionId() {
    try {
      const response = await fetch(
        `${STATE.jellyfinData.serverAddress}/Sessions?deviceId=${encodeURIComponent(STATE.jellyfinData.deviceId)}`,
        {
          headers: this.getAuthHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch session data: ${response.statusText}`);
      }

      const sessions = await response.json();

      if (!sessions || sessions.length === 0) {
        console.warn("No sessions found for deviceId:", STATE.jellyfinData.deviceId);
        return null;
      }

      return sessions[0].Id;
    } catch (error) {
      console.error("Error fetching session data:", error);
      return null;
    }
  }
};

/**
 * Class for managing slide timing
 */
class SlideTimer {
  /**
   * Creates a new slide timer
   * @param {Function} callback - Function to call on interval
   * @param {number} interval - Interval in milliseconds
   */
  constructor(callback, interval) {
    this.callback = callback;
    this.interval = interval;
    this.timerId = null;
    this.start();
  }

  /**
   * Stops the timer
   * @returns {SlideTimer} This instance for chaining
   */
  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    return this;
  }

  /**
     * Starts the timer
     * @returns {SlideTimer} This instance for chaining
     */
  start() {
    if (!this.timerId) {
      this.timerId = setInterval(this.callback, this.interval);
    }
    return this;
  }

  /**
   * Restarts the timer
   * @returns {SlideTimer} This instance for chaining
   */
  restart() {
    return this.stop().start();
  }
}

/**
* Observer for handling slideshow visibility based on current page
*/
const VisibilityObserver = {

  updateVisibility() {
    const activeTab = document.querySelector(".emby-tab-button-active");
    const container = document.getElementById("slides-container");

    if (!container) return;

    const isVisible =
      window.location.hash.includes("#/home.html") &&
      activeTab.getAttribute("data-index") === "0";

    container.style.display = isVisible ? "block" : "none";

    if (isVisible) {
      if (STATE.slideshow.slideInterval) {
        STATE.slideshow.slideInterval.start();
      }
    } else {
      if (STATE.slideshow.slideInterval) {
        STATE.slideshow.slideInterval.stop();
      }
    }
  },

  /**
   * Initializes visibility observer
   */
  init() {
    const observer = new MutationObserver(this.updateVisibility);
    observer.observe(document.body, { childList: true, subtree: true });

    document.body.addEventListener("click", this.updateVisibility);
    window.addEventListener("hashchange", this.updateVisibility);

    this.updateVisibility();
  }
};

/**
* Slideshow UI creation and management
*/
const SlideCreator = {
  /**
   * Creates a slide element for an item
   * @param {Object} item - Item data
   * @param {string} title - Title type (Movie/TV Show)
   * @returns {HTMLElement} Slide element
   */
  createSlideElement(item, title) {
    if (!item || !item.Id) {
      console.error("Invalid item data:", item);
      return null;
    }

    const itemId = item.Id;
    const serverAddress = STATE.jellyfinData.serverAddress;

    const slide = SlideUtils.createElement('a', {
      className: 'slide',
      target: '_top',
      rel: 'noreferrer',
      tabIndex: 0,
      style: {
        display: 'none',
        opacity: '0',
        transition: `opacity ${CONFIG.fadeTransitionDuration}ms ease-in-out`
      },
      'data-item-id': itemId
    });

    const backdrop = SlideUtils.createElement('img', {
      className: 'backdrop low-quality',
      src: `${serverAddress}/Items/${itemId}/Images/Backdrop/0?quality=60&fillWidth=480`,
      alt: 'Backdrop',
      loading: 'eager',
      'data-high-quality': `${serverAddress}/Items/${itemId}/Images/Backdrop/0?quality=90`
    });

    backdrop.onload = function () {
    };

    const backdropOverlay = SlideUtils.createElement('div', {
      className: 'backdrop-overlay'
    });

    const backdropContainer = SlideUtils.createElement('div', {
      className: 'backdrop-container'
    });
    backdropContainer.append(backdrop, backdropOverlay);

    const logo = SlideUtils.createElement('img', {
      className: 'logo low-quality',
      src: `${serverAddress}/Items/${itemId}/Images/Logo?quality=30`,
      alt: 'Logo',
      loading: 'eager',
      'data-high-quality': `${serverAddress}/Items/${itemId}/Images/Logo?quality=90`
    });

    logo.onload = function () {
    };

    const logoContainer = SlideUtils.createElement('div', {
      className: 'logo-container'
    });
    logoContainer.appendChild(logo);

    const featuredContent = SlideUtils.createElement('div', {
      className: 'featured-content'
    }, title);

    const plot = item.Overview || "No overview available";
    const plotElement = SlideUtils.createElement('div', {
      className: 'plot'
    }, plot);
    SlideUtils.truncateText(plotElement, CONFIG.maxPlotLength);

    const plotContainer = SlideUtils.createElement('div', {
      className: 'plot-container'
    });
    plotContainer.appendChild(plotElement);

    const gradientOverlay = SlideUtils.createElement('div', {
      className: 'gradient-overlay'
    });

    const infoContainer = SlideUtils.createElement('div', {
      className: 'info-container'
    });

    const ratingInfo = this.createRatingInfo(item);
    infoContainer.appendChild(ratingInfo);

    const genreElement = SlideUtils.createElement('div', {
      className: 'genre'
    });
    genreElement.innerHTML = SlideUtils.parseGenres(item.Genres);

    const buttonContainer = SlideUtils.createElement('div', {
      className: 'button-container'
    });

    const playButton = this.createPlayButton(itemId);
    const detailButton = this.createDetailButton(itemId);

    buttonContainer.append(detailButton, playButton);

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
  },

  /**
   * Creates the rating information element
   * @param {Object} item - Item data
   * @returns {HTMLElement} Rating information element
   */
  createRatingInfo(item) {
    const {
      CommunityRating: rating,
      CriticRating: criticRating,
      OfficialRating: age,
      PremiereDate: date,
      RunTimeTicks: runtime,
      ChildCount: season
    } = item;

    const ratingTest = SlideUtils.createElement('div', {
      className: 'rating-value'
    });

    const imdbLogo = SlideUtils.createElement('img', {
      className: 'imdb-logo',
      src: CONFIG.IMAGE_URLS.imdbLogo,
      alt: 'IMDb Logo',
      style: {
        width: '30px',
        height: '30px'
      }
    });
    ratingTest.appendChild(imdbLogo);

    if (typeof rating === 'number') {
      ratingTest.innerHTML += rating.toFixed(1);
    } else {
      ratingTest.innerHTML += '<span style="color: #fff9;">N/A</span>';
    }

    ratingTest.appendChild(SlideUtils.createSeparator());

    const tomatoRatingDiv = SlideUtils.createElement('div', {
      className: 'tomato-rating'
    });

    const tomatoLogo = SlideUtils.createElement('img', {
      className: 'tomato-logo',
      src: CONFIG.IMAGE_URLS.tomatoLogo,
      alt: 'Tomato Logo',
      style: {
        width: '15px',
        height: '17px'
      }
    });

    let valueElement;
    if (typeof criticRating === 'number') {
      valueElement = document.createTextNode(`${criticRating}% `);
    } else {
      const naSpan = SlideUtils.createElement('span', {
        style: { color: '#fff9' }
      }, 'N/A ');
      valueElement = naSpan;
    }

    const criticLogo = SlideUtils.createElement('img', {
      className: 'critic-logo',
      src: criticRating > 59 ? CONFIG.IMAGE_URLS.freshTomato : CONFIG.IMAGE_URLS.rottenTomato,
      alt: criticRating > 59 ? 'Fresh Tomato' : 'Rotten Tomato',
      style: {
        width: '15px',
        height: '15px'
      }
    });

    tomatoRatingDiv.append(tomatoLogo, valueElement, criticLogo);
    tomatoRatingDiv.appendChild(SlideUtils.createSeparator());

    const ageRatingDiv = SlideUtils.createElement('div', {
      className: 'age-rating'
    });
    ageRatingDiv.innerHTML = age || 'N/A';

    const premiereDate = SlideUtils.createElement('div', {
      className: 'date'
    });

    const year = date ? new Date(date).getFullYear() : NaN;
    if (isNaN(year)) {
      const naSpan = SlideUtils.createElement('span', {
        style: { color: '#fff9' }
      }, 'N/A');
      premiereDate.appendChild(naSpan);
    } else {
      premiereDate.textContent = year;
    }

    const runTimeElement = SlideUtils.createElement('div', {
      className: 'runTime'
    });

    if (season === undefined) {
      const milliseconds = runtime / 10000;
      const currentTime = new Date();
      const endTime = new Date(currentTime.getTime() + milliseconds);
      const options = { hour: '2-digit', minute: '2-digit', hour12: true };
      const formattedEndTime = endTime.toLocaleTimeString([], options);
      runTimeElement.textContent = `Ends at ${formattedEndTime}`;
    } else {
      runTimeElement.textContent = `${season} Season${season > 1 ? 's' : ''}`;
    }

    ratingTest.append(
      tomatoRatingDiv,
      premiereDate,
      SlideUtils.createSeparator(),
      ageRatingDiv,
      SlideUtils.createSeparator(),
      runTimeElement
    );

    return ratingTest;
  },

  /**
   * Creates a play button for an item
   * @param {string} itemId - Item ID
   * @returns {HTMLElement} Play button element
   */
  createPlayButton(itemId) {
    return SlideUtils.createElement('button', {
      className: 'play-button',
      innerHTML: `
      <span class="play-icon"><i class="material-icons">play_circle</i></span>
      <span class="play-text">Play</span>
    `,
      onclick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        ApiUtils.playItem(itemId);
      }
    });
  },

  /**
   * Creates a detail button for an item
   * @param {string} itemId - Item ID
   * @returns {HTMLElement} Detail button element
   */
  createDetailButton(itemId) {
    return SlideUtils.createElement('button', {
      className: 'detail-button',
      innerHTML: `
      <span class="detail-icon"><i class="material-icons info_outline"></i></span>
      <span class="detail-text">Info</span>
    `,
      onclick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.Emby && window.Emby.Page) {
          Emby.Page.show(`/details?id=${itemId}`);
        } else {
          window.location.href = `#/details?id=${itemId}`;
        }
      }
    });
  },

  /**
   * Creates a placeholder slide for loading
   * @param {string} itemId - Item ID to load
   * @returns {HTMLElement} Placeholder slide element
   */
  createLoadingPlaceholder(itemId) {
    const placeholder = SlideUtils.createElement('a', {
      className: 'slide placeholder',
      'data-item-id': itemId,
      style: {
        display: 'none',
        opacity: '0',
        transition: `opacity ${CONFIG.fadeTransitionDuration}ms ease-in-out`
      }
    });

    const loadingIndicator = SlideUtils.createLoadingIndicator();
    placeholder.appendChild(loadingIndicator);

    return placeholder;
  },

  /**
   * Creates a slide for an item and adds it to the container
   * @param {string} itemId - Item ID
   * @returns {Promise<HTMLElement>} Created slide element
   */
  async createSlideForItemId(itemId) {
    try {
      if (STATE.slideshow.createdSlides[itemId]) {
        return document.querySelector(`.slide[data-item-id="${itemId}"]`);
      }

      const container = SlideUtils.getOrCreateSlidesContainer();

      const placeholder = this.createLoadingPlaceholder(itemId);
      container.appendChild(placeholder);

      const item = await ApiUtils.fetchItemDetails(itemId);
      if (!item) {
        placeholder.remove();
        return null;
      }

      const slideElement = this.createSlideElement(item, item.Type === "Movie" ? "Movie" : "TV Show");
      if (!slideElement) {
        placeholder.remove();
        return null;
      }

      container.replaceChild(slideElement, placeholder);

      STATE.slideshow.createdSlides[itemId] = true;

      return slideElement;
    } catch (error) {
      console.error("Error creating slide for item:", error, itemId);
      return null;
    }
  }
};

/**
* Manages slideshow functionality
*/
const SlideshowManager = {

  /**
   * Creates pagination dots for the slideshow
   * Exactly 5 dots that cycle regardless of total slides
   */
  createPaginationDots() {
    const container = SlideUtils.getOrCreateSlidesContainer();
    let dotsContainer = container.querySelector('.dots-container');
    const parentContainer = container.parentElement || document.body;

    if (dotsContainer) {
      dotsContainer.remove();
    }

    dotsContainer = SlideUtils.createElement('div', {
      className: 'dots-container',
      style: {
        opacity: '0',
        transition: `opacity ${CONFIG.fadeTransitionDuration}ms ease-in-out`
      }
    });

    const numDots = 5;

    for (let i = 0; i < numDots; i++) {
      const dot = SlideUtils.createElement('span', {
        className: 'dot',
        'data-index': i,
        onclick: (e) => {
          e.preventDefault();
          e.stopPropagation();

          const totalItems = STATE.slideshow.totalItems;
          let targetIndex;

          if (totalItems <= numDots) {
            targetIndex = i % totalItems;
          } else {
            targetIndex = Math.floor((i / numDots) * totalItems);
          }

          this.updateCurrentSlide(targetIndex);
        }
      });
      dotsContainer.appendChild(dot);
    }
    container.appendChild(dotsContainer);
    this.updateDots();
  },

  /**
   * Updates active dot based on current slide
   * Maps current slide to one of the 5 dots
   */
  updateDots() {
    const container = SlideUtils.getOrCreateSlidesContainer();
    const dots = container.querySelectorAll('.dot');
    const currentIndex = STATE.slideshow.currentSlideIndex;
    const totalItems = STATE.slideshow.totalItems;
    const numDots = dots.length;

    let activeDotIndex;

    if (totalItems <= numDots) {
      activeDotIndex = currentIndex;
    } else {
      activeDotIndex = Math.floor((currentIndex % numDots) * (numDots / numDots));
    }

    dots.forEach((dot, index) => {
      if (index === activeDotIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  },

  /**
   * Updates current slide to the specified index
   * @param {number} index - Slide index to display
   */
  async updateCurrentSlide(index) {
    if (STATE.slideshow.isTransitioning) {
      return;
    }

    STATE.slideshow.isTransitioning = true;

    try {
      const container = SlideUtils.getOrCreateSlidesContainer();
      const totalItems = STATE.slideshow.totalItems;

      index = Math.max(0, Math.min(index, totalItems - 1));

      const currentItemId = STATE.slideshow.itemIds[index];

      let currentSlide = document.querySelector(`.slide[data-item-id="${currentItemId}"]`);
      if (!currentSlide) {
        const placeholder = SlideCreator.createLoadingPlaceholder(currentItemId);
        container.appendChild(placeholder);

        placeholder.style.display = 'block';
        void placeholder.offsetWidth;
        placeholder.style.opacity = '1';

        currentSlide = await SlideCreator.createSlideForItemId(currentItemId);

        this.upgradeSlideImageQuality(currentSlide);

        if (!currentSlide) {
          console.error(`Failed to create slide for item ${currentItemId}`);
          STATE.slideshow.isTransitioning = false;

          setTimeout(() => this.nextSlide(), 500);
          return;
        }
      }

      const previousVisibleSlide = container.querySelector('.slide[style*="opacity: 1"]');

      currentSlide.style.display = 'block';
      currentSlide.style.opacity = '0';
      currentSlide.style.zIndex = '2';

      if (previousVisibleSlide) {
        previousVisibleSlide.style.zIndex = '1';
      }

      STATE.slideshow.currentSlideIndex = index;

      void currentSlide.offsetWidth;

      currentSlide.style.opacity = '1';

      if (index === 0 || !previousVisibleSlide) {
        const dotsContainer = container.querySelector('.dots-container');
        if (dotsContainer) {
          dotsContainer.style.opacity = '1';
        }
      }

      setTimeout(() => {
        const allSlides = container.querySelectorAll('.slide');
        allSlides.forEach(slide => {
          if (slide !== currentSlide) {
            slide.style.display = 'none';
            slide.style.opacity = '0';
            slide.style.zIndex = '0';
          }
        });

        currentSlide.style.zIndex = '1';
      }, CONFIG.fadeTransitionDuration);

      this.preloadAdjacentSlides(index);

      this.updateDots();

      if (STATE.slideshow.slideInterval) {
        STATE.slideshow.slideInterval.restart();
      }

      this.pruneSlideCache();
    } catch (error) {
      console.error("Error updating current slide:", error);
    } finally {
      setTimeout(() => {
        STATE.slideshow.isTransitioning = false;
      }, CONFIG.fadeTransitionDuration);
    }
  },

  /**
   * Upgrades the image quality for all images in a slide
   * @param {HTMLElement} slide - The slide element containing images to upgrade
   */
  upgradeSlideImageQuality(slide) {
    if (!slide) return;

    const images = slide.querySelectorAll('img.low-quality');
    images.forEach(img => {
      const highQualityUrl = img.getAttribute('data-high-quality');
      if (highQualityUrl) {
        addThrottledRequest(highQualityUrl, () => {
          img.src = highQualityUrl;
          img.classList.remove('low-quality');
          img.classList.add('high-quality');
        });
      }
    });
  },

  /**
   * Preloads adjacent slides for smoother transitions
   * @param {number} currentIndex - Current slide index
   */
  async preloadAdjacentSlides(currentIndex) {
    const totalItems = STATE.slideshow.totalItems;
    const preloadCount = CONFIG.preloadCount;

    const nextIndex = (currentIndex + 1) % totalItems;
    const itemId = STATE.slideshow.itemIds[nextIndex];

    await SlideCreator.createSlideForItemId(itemId);

    if (preloadCount > 1) {
      const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
      const prevItemId = STATE.slideshow.itemIds[prevIndex];

      SlideCreator.createSlideForItemId(prevItemId);
    }
  },

  nextSlide() {
    const currentIndex = STATE.slideshow.currentSlideIndex;
    const totalItems = STATE.slideshow.totalItems;

    const nextIndex = (currentIndex + 1) % totalItems;

    this.updateCurrentSlide(nextIndex);
  },

  prevSlide() {
    const currentIndex = STATE.slideshow.currentSlideIndex;
    const totalItems = STATE.slideshow.totalItems;

    const prevIndex = (currentIndex - 1 + totalItems) % totalItems;

    this.updateCurrentSlide(prevIndex);
  },

  /**
 * Prunes the slide cache to prevent memory bloat
 * Removes slides that are outside the viewing range
 */
  pruneSlideCache() {
    const currentIndex = STATE.slideshow.currentSlideIndex;
    const keepRange = 3;

    Object.keys(STATE.slideshow.createdSlides).forEach(itemId => {
      const index = STATE.slideshow.itemIds.indexOf(itemId);
      if (index === -1) return;

      const distance = Math.abs(index - currentIndex);
      if (distance > keepRange) {
        delete STATE.slideshow.loadedItems[itemId];

        const slide = document.querySelector(`.slide[data-item-id="${itemId}"]`);
        if (slide) slide.remove();

        delete STATE.slideshow.createdSlides[itemId];

        console.log(`Pruned slide ${itemId} at distance ${distance} from view`);
      }
    });
  },

  /**
   * Initializes touch events for swiping
   */
  initTouchEvents() {
    const container = SlideUtils.getOrCreateSlidesContainer();
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, { passive: true });
  },

  /**
   * Handles swipe gestures
   * @param {number} startX - Starting X position
   * @param {number} endX - Ending X position
   */
  handleSwipe(startX, endX) {
    const diff = endX - startX;

    if (Math.abs(diff) < CONFIG.minSwipeDistance) {
      return;
    }

    if (diff > 0) {
      this.prevSlide();
    } else {
      this.nextSlide();
    }
  },

  /**
   * Initializes keyboard event listeners
   */
  initKeyboardEvents() {
    document.addEventListener('keydown', (e) => {
      if (!STATE.slideshow.containerFocused) {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          this.prevSlide();
          e.preventDefault();
          break;
        case 'ArrowRight':
          this.nextSlide();
          e.preventDefault();
          break;
      }
    });

    const container = SlideUtils.getOrCreateSlidesContainer();

    container.addEventListener('focus', () => {
      STATE.slideshow.containerFocused = true;
    });

    container.addEventListener('blur', () => {
      STATE.slideshow.containerFocused = false;
    });
  },


  /**
  * Loads slideshow data and initializes the slideshow
  */
  async loadSlideshowData() {
    try {
      STATE.slideshow.isLoading = true;

      let itemIds = await ApiUtils.fetchItemIdsFromList();

      if (itemIds.length === 0) {
        itemIds = await ApiUtils.fetchItemIdsFromServer();
      }

      itemIds = SlideUtils.shuffleArray(itemIds);

      STATE.slideshow.itemIds = itemIds;
      STATE.slideshow.totalItems = itemIds.length;

      this.createPaginationDots();

      await this.updateCurrentSlide(0);

      STATE.slideshow.slideInterval = new SlideTimer(() => {
        this.nextSlide();
      }, CONFIG.shuffleInterval);
    } catch (error) {
      console.error("Error loading slideshow data:", error);
    } finally {
      STATE.slideshow.isLoading = false;
    }
  }
};

/**
 * Initializes arrow navigation elements
 */
const initArrowNavigation = () => {
  const container = SlideUtils.getOrCreateSlidesContainer();

  const leftArrow = SlideUtils.createElement('div', {
    className: 'arrow left-arrow',
    innerHTML: '<i class="material-icons">chevron_left</i>',
    onclick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      SlideshowManager.prevSlide();
    },
    style: {
      opacity: '0',
      transition: 'opacity 0.3s ease',
      display: 'none'
    }
  });

  const rightArrow = SlideUtils.createElement('div', {
    className: 'arrow right-arrow',
    innerHTML: '<i class="material-icons">chevron_right</i>',
    onclick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      SlideshowManager.nextSlide();
    },
    style: {
      opacity: '0',
      transition: 'opacity 0.3s ease',
      display: 'none'
    }
  });

  container.appendChild(leftArrow);
  container.appendChild(rightArrow);

  const showArrows = () => {
    leftArrow.style.display = 'block';
    rightArrow.style.display = 'block';

    void leftArrow.offsetWidth;
    void rightArrow.offsetWidth;

    leftArrow.style.opacity = '1';
    rightArrow.style.opacity = '1';
  };

  const hideArrows = () => {
    leftArrow.style.opacity = '0';
    rightArrow.style.opacity = '0';

    setTimeout(() => {
      if (leftArrow.style.opacity === '0') {
        leftArrow.style.display = 'none';
        rightArrow.style.display = 'none';
      }
    }, 300);
  };

  container.addEventListener('mouseenter', showArrows);

  container.addEventListener('mouseleave', hideArrows);

  let arrowTimeout;
  container.addEventListener('touchstart', () => {
    if (arrowTimeout) {
      clearTimeout(arrowTimeout);
    }

    showArrows();

    arrowTimeout = setTimeout(hideArrows, 2000);
  }, { passive: true });
};

/**
 * Initialize the slideshow
 */
const slidesInit = async () => {
  if (STATE.slideshow.hasInitialized) {
    console.log("⚠️ Slideshow already initialized, skipping");
    return;
  }
  STATE.slideshow.hasInitialized = true;

  /**
 * Initialize IntersectionObserver for lazy loading images
 */
  const initLazyLoading = () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          const highQualityUrl = image.getAttribute('data-high-quality');

          if (highQualityUrl &&
            image.closest('.slide').style.opacity === '1') {

            requestQueue.push({
              url: highQualityUrl,
              callback: () => {
                image.src = highQualityUrl;
                image.classList.remove('low-quality');
                image.classList.add('high-quality');
              }
            });

            if (requestQueue.length === 1) {
              processNextRequest();
            }
          }

          observer.unobserve(image);
        }
      });
    }, {
      rootMargin: '50px',
      threshold: 0.1
    });

    const observeSlideImages = () => {
      const slides = document.querySelectorAll('.slide');
      slides.forEach(slide => {
        const images = slide.querySelectorAll('img.low-quality');
        images.forEach(image => {
          imageObserver.observe(image);
        });
      });
    };

    const slideObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach(node => {
            if (node.classList && node.classList.contains('slide')) {
              const images = node.querySelectorAll('img.low-quality');
              images.forEach(image => {
                imageObserver.observe(image);
              });
            }
          });
        }
      });
    });

    const container = SlideUtils.getOrCreateSlidesContainer();
    slideObserver.observe(container, { childList: true });

    observeSlideImages();

    return imageObserver;
  };

  const lazyLoadObserver = initLazyLoading();

  try {
    console.log("🌟 Initializing Enhanced Jellyfin Slideshow");

    await SlideshowManager.loadSlideshowData();

    SlideshowManager.initTouchEvents();

    SlideshowManager.initKeyboardEvents();

    initArrowNavigation();

    VisibilityObserver.init();

    console.log("✅ Enhanced Jellyfin Slideshow initialized successfully");
  } catch (error) {
    console.error("Error initializing slideshow:", error);
    STATE.slideshow.hasInitialized = false;
  }
};

window.slideshowPure = {
  CONFIG,
  STATE,
  SlideUtils,
  ApiUtils,
  SlideCreator,
  SlideshowManager,
  VisibilityObserver,
  initSlideshowData: () => {
    SlideshowManager.loadSlideshowData();
  },
  nextSlide: () => {
    SlideshowManager.nextSlide();
  },
  prevSlide: () => {
    SlideshowManager.prevSlide();
  }
};

initLoadingScreen();

startLoginStatusWatcher();
