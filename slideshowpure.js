/*
 * Jellyfin Slideshow by M0RPH3US v3.0.3
 */

//Core Module Configuration
const CONFIG = {
  IMAGE_SVG: {
    jellyfin: '<svg id="banner-dark" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1536 512"><defs><linearGradient id="linear-gradient" x1="110.25" y1="213.3" x2="496.14" y2="436.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#aa5cc3"/><stop offset="1" stop-color="#00a4dc"/></linearGradient></defs><g id="banner-dark"><g id="banner-dark-icon"><path d="M261.42,201.62c-20.44,0-86.24,119.29-76.2,139.43s142.48,19.92,152.4,0S281.86,201.63,261.42,201.62Z" fill="url(#linear-gradient)"/><path d="M261.42,23.3C199.83,23.3,1.57,382.73,31.8,443.43s429.34,60,459.24,0S323,23.3,261.42,23.3ZM411.9,390.76c-19.59,39.33-281.08,39.77-300.9,0S221.1,115.48,261.45,115.48,431.49,351.42,411.9,390.76Z" fill="url(#linear-gradient)"/></g><g id="jellyfin-light-outlines" style="isolation:isolate" transform="translate(43.8)"><path d="M556.64,350.75a67,67,0,0,1-22.87-27.47,8.91,8.91,0,0,1-1.49-4.75,7.42,7.42,0,0,1,2.83-5.94,9.25,9.25,0,0,1,6.09-2.38c3.16,0,5.94,1.69,8.31,5.05a48.09,48.09,0,0,0,16.34,20.34,40.59,40.59,0,0,0,24,7.58q20.51,0,33.27-12.62t12.77-33.12V159a8.44,8.44,0,0,1,2.67-6.39,9.56,9.56,0,0,1,6.83-2.52,9,9,0,0,1,6.68,2.52,8.7,8.7,0,0,1,2.53,6.39v138.4a64.7,64.7,0,0,1-8.32,32.67,59,59,0,0,1-23,22.72Q608.62,361,589.9,361A57.21,57.21,0,0,1,556.64,350.75Z" fill="#fff"/><path d="M831.66,279.47a8.77,8.77,0,0,1-6.24,2.53H713.16q0,17.82,7.27,31.92a54.91,54.91,0,0,0,20.79,22.28q13.51,8.18,31.93,8.17a54,54,0,0,0,25.54-5.94,52.7,52.7,0,0,0,18.12-15.15,10,10,0,0,1,6.24-2.67,8.14,8.14,0,0,1,7.72,7.72,8.81,8.81,0,0,1-3,6.24,74.7,74.7,0,0,1-23.91,19A65.56,65.56,0,0,1,773.45,361q-22.87,0-40.4-9.8a69.51,69.51,0,0,1-27.32-27.48q-9.79-17.66-9.8-40.83,0-24.36,9.65-42.62t25.69-27.92a65.2,65.2,0,0,1,34.16-9.65A70,70,0,0,1,798.84,211a65.78,65.78,0,0,1,25.39,24.36q9.81,16,10.1,38A8.07,8.07,0,0,1,831.66,279.47ZM733.5,231.8Q718.8,243.68,714.64,266H815.92v-2.38A46.91,46.91,0,0,0,807,240.27a48.47,48.47,0,0,0-18.56-15.15,54,54,0,0,0-23-5.2Q748.2,219.92,733.5,231.8Z" fill="#fff"/><path d="M888.24,355.5a8.92,8.92,0,0,1-15.3-6.38v-202a8.91,8.91,0,1,1,17.82,0v202A8.65,8.65,0,0,1,888.24,355.5Z" fill="#fff"/><path d="M956.55,355.5a8.92,8.92,0,0,1-15.3-6.38v-202a8.91,8.91,0,1,1,17.82,0v202A8.65,8.65,0,0,1,956.55,355.5Z" fill="#fff"/><path d="M1122.86,206.11a8.7,8.7,0,0,1,2.53,6.39v131q0,23.44-9.21,40.09a61.58,61.58,0,0,1-25.54,25.25q-16.34,8.61-36.83,8.61a96.73,96.73,0,0,1-23.31-2.68,61.72,61.72,0,0,1-18-7.12q-6.24-3.87-6.24-8.62a17.94,17.94,0,0,1,.6-3,8.06,8.06,0,0,1,3-4.45,7.49,7.49,0,0,1,4.45-1.49,7.91,7.91,0,0,1,3.56.89q19,10.39,36.24,10.4,24.65,0,39.06-15.44t14.4-42.18V333.38a54.37,54.37,0,0,1-21.38,20,62.55,62.55,0,0,1-30.3,7.58q-25.83,0-39.2-15.45t-13.37-41.87V212.5a8.91,8.91,0,1,1,17.82,0V301q0,21.39,9.36,32.38t29.25,11a48,48,0,0,0,23.32-6.09,49.88,49.88,0,0,0,17.82-16,37.44,37.44,0,0,0,6.68-21.24V212.5a9,9,0,0,1,15.29-6.39Z" fill="#fff"/><path d="M1210.18,161.41q-5.21,6.24-5.2,17.23v30.59h33.27a8.19,8.19,0,0,1,5.79,2.38,8.26,8.26,0,0,1,0,11.88,8.22,8.22,0,0,1-5.79,2.37H1205V349.12a8.91,8.91,0,1,1-17.82,0V225.86h-21.68a7.83,7.83,0,0,1-5.94-2.52,8.21,8.21,0,0,1-2.37-5.79,8,8,0,0,1,2.37-6.09,8.33,8.33,0,0,1,5.94-2.23h21.68V178.64q0-18.7,10.84-29t29-10.24a46.1,46.1,0,0,1,15.45,2.52q7.13,2.53,7.12,8.17a8.07,8.07,0,0,1-2.37,5.94,7.37,7.37,0,0,1-5.35,2.37,18.81,18.81,0,0,1-6.53-1.48,42,42,0,0,0-10.4-1.78Q1215.37,155.18,1210.18,161.41ZM1276,180.87c-2.19-1.88-3.27-4.61-3.27-8.17v-3q0-5.34,3.41-8.17t9.36-2.82q11.88,0,11.88,11v3c0,3.56-1,6.29-3.12,8.17s-5.1,2.82-9.06,2.82S1278.14,182.75,1276,180.87Zm15.59,174.63a8.92,8.92,0,0,1-15.3-6.38V212.5a8.91,8.91,0,1,1,17.82,0V349.12A8.65,8.65,0,0,1,1291.56,355.5Z" fill="#fff"/><path d="M1452.53,218.88q12.92,16.2,12.92,42.92v87.32a8.4,8.4,0,0,1-2.67,6.38,8.8,8.8,0,0,1-6.24,2.53,8.64,8.64,0,0,1-8.91-8.91V262.69q0-19.31-9.65-31.33t-29.85-12a53.28,53.28,0,0,0-42.77,21.83,36.24,36.24,0,0,0-7.13,21.53v86.43a8.91,8.91,0,1,1-17.82,0V216.06a8.91,8.91,0,1,1,17.82,0V232.4q8-12.77,23-21.24A61.84,61.84,0,0,1,1412,202.7Q1439.61,202.7,1452.53,218.88Z" fill="#fff"/></g></g></svg>',
    freshTomato:
      '<svg id="svg3390" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 138.75 141.25" width="18" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/"><metadata id="metadata3396"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title/></cc:Work></rdf:RDF></metadata><g id="layer1" fill="#f93208"><path id="path3412" d="m20.154 40.829c-28.149 27.622-13.657 61.011-5.734 71.931 35.254 41.954 92.792 25.339 111.89-5.9071 4.7608-8.2027 22.554-53.467-23.976-78.009z"/><path id="path3471" d="m39.613 39.265 4.7778-8.8607 28.406-5.0384 11.119 9.2082z"/></g><g id="layer2"><path id="path3437" d="m39.436 8.5696 8.9682-5.2826 6.7569 15.479c3.7925-6.3226 13.79-16.316 24.939-4.6684-4.7281 1.2636-7.5161 3.8553-7.7397 8.4768 15.145-4.1697 31.343 3.2127 33.539 9.0911-10.951-4.314-27.695 10.377-41.771 2.334 0.009 15.045-12.617 16.636-19.902 17.076 2.077-4.996 5.591-9.994 1.474-14.987-7.618 8.171-13.874 10.668-33.17 4.668 4.876-1.679 14.843-11.39 24.448-11.425-6.775-2.467-12.29-2.087-17.814-1.475 2.917-3.961 12.149-15.197 28.625-8.476z" fill="#02902e"/></g></svg>',
    rottenTomato:
      '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 145 140" width="20" height="18"><path fill="#0fc755" d="M47.4 35.342c-13.607-7.935-12.32-25.203 2.097-31.88 26.124-6.531 29.117 13.78 22.652 30.412-6.542 24.11 18.095 23.662 19.925 10.067 3.605-18.412 19.394-26.695 31.67-16.359 12.598 12.135 7.074 36.581-17.827 34.187-16.03-1.545-19.552 19.585.839 21.183 32.228 1.915 42.49 22.167 31.04 35.865-15.993 15.15-37.691-4.439-45.512-19.505-6.8-9.307-17.321.11-13.423 6.502 12.983 19.465 2.923 31.229-10.906 30.62-13.37-.85-20.96-9.06-13.214-29.15 3.897-12.481-8.595-15.386-16.57-5.45-11.707 19.61-28.865 13.68-33.976 4.19-3.243-7.621-2.921-25.846 24.119-23.696 16.688 4.137 11.776-12.561-.63-13.633-9.245-.443-30.501-7.304-22.86-24.54 7.34-11.056 24.958-11.768 33.348 6.293 3.037 4.232 8.361 11.042 18.037 5.033 3.51-5.197 1.21-13.9-8.809-20.135z"/></svg>',
  },
  shuffleInterval: 7000,
  retryInterval: 500,
  minSwipeDistance: 50,
  loadingCheckInterval: 100,
  maxPlotLength: 360,
  maxMovies: 15,
  maxTvShows: 15,
  maxItems: 500,
  preloadCount: 3,
  fadeTransitionDuration: 500,
  slideAnimationEnabled: true,
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
    serverAddress: null,
  },
  slideshow: {
    hasInitialized: false,
    isTransitioning: false,
    isPaused: false,
    currentSlideIndex: 0,
    focusedSlide: null,
    containerFocused: false,
    slideInterval: null,
    itemIds: [],
    loadedItems: {},
    createdSlides: {},
    totalItems: 0,
    isLoading: false,
  },
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
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`Failed to fetch: ${response.status}`);
    })
    .then(callback)
    .catch((error) => {
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
      userId: apiClient.getCurrentUserId() || "Not Found",
      appName: apiClient._appName || "Not Found",
      appVersion: apiClient._appVersion || "Not Found",
      deviceName: apiClient._deviceName || "Not Found",
      deviceId: apiClient._deviceId || "Not Found",
      accessToken: apiClient._serverInfo.AccessToken || "Not Found",
      serverId: apiClient._serverInfo.Id || "Not Found",
      serverAddress: apiClient._serverAddress || "Not Found",
    };
    if (callback && typeof callback === "function") {
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
    currentPath.includes("/web/#/home") ||
    currentPath.includes("/web/index.html#/home.html") ||
    currentPath.endsWith("/web/");

  if (!isHomePage) return;

  const loadingDiv = document.createElement("div");
  loadingDiv.className = "bar-loading";
  loadingDiv.id = "page-loader";
  loadingDiv.innerHTML = `
    <div class="loader-content">
      <h1>
        ${CONFIG.IMAGE_SVG.jellyfin}
      </h1>
      <div class="progress-container">
        <div class="progress-bar" id="progress-bar"></div>
        <div class="progress-gap" id="progress-gap"></div>
        <div class="unfilled-bar" id="unfilled-bar"></div>
      </div>
    </div>
  `;
  document.body.appendChild(loadingDiv);

  requestAnimationFrame(() => {
    document.querySelector(".bar-loading h1 img").style.opacity = "1";
  });

  const progressBar = document.getElementById("progress-bar");
  const unfilledBar = document.getElementById("unfilled-bar");

  let progress = 0;
  let lastIncrement = 5;

  const progressInterval = setInterval(() => {
    if (progress < 95) {
      lastIncrement = Math.max(0.5, lastIncrement * 0.98);
      const randomFactor = 0.8 + Math.random() * 0.4;
      const increment = lastIncrement * randomFactor;
      progress += increment;
      progress = Math.min(progress, 95);

      progressBar.style.width = `${progress}%`;
      unfilledBar.style.width = `${100 - progress}%`;
    }
  }, 150);

  const checkInterval = setInterval(() => {
    const loginFormLoaded = document.querySelector(".manualLoginForm");
    const homePageLoaded =
      document.querySelector(".homeSectionsContainer") &&
      document.querySelector("#slides-container");

    if (loginFormLoaded || homePageLoaded) {
      clearInterval(progressInterval);
      clearInterval(checkInterval);

      progressBar.style.transition = "width 300ms ease-in-out";
      progressBar.style.width = "100%";
      unfilledBar.style.width = "0%";

      progressBar.addEventListener('transitionend', () => {
        requestAnimationFrame(() => {
          const loader = document.querySelector(".bar-loading");
          if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
              loader.remove();
            }, 300);
          }
        });
      })
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
  STATE.slideshow.isPaused = false;
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
      console.log(
        "🔓 User is fully logged in. Starting slideshow initialization..."
      );
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
      console.log(
        "🔒 Authentication incomplete. Waiting for complete login..."
      );
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
    const separator = document.createElement("i");
    separator.className = "material-icons fiber_manual_record separator-icon"; //material-icons radio_button_off
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
      if (key === "style" && typeof value === "object") {
        Object.entries(value).forEach(([prop, val]) => {
          element.style[prop] = val;
        });
      } else if (key === "className") {
        element.className = value;
      } else if (key === "innerHTML") {
        element.innerHTML = value;
      } else if (key === "onclick" && typeof value === "function") {
        element.addEventListener("click", value);
      } else {
        element.setAttribute(key, value);
      }
    });

    if (content) {
      if (typeof content === "string") {
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
      container = this.createElement("div", { id: "slides-container" });
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
      return genresArray.slice(0, 3).join(" ▫️ "); //🔹
    }
    return "No Genre Available";
  },

  /**
   * Creates a loading indicator
   * @returns {HTMLElement} Loading indicator element
   */
  createLoadingIndicator() {
    const loadingIndicator = this.createElement("div", {
      className: "slide-loading-indicator",
      innerHTML: `
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      `,
    });
    return loadingIndicator;
  },
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
          headers: this.getAuthHeaders(),
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
        .map((id) => id.trim())
        .filter((id) => id)
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
      if (
        !STATE.jellyfinData.accessToken ||
        STATE.jellyfinData.accessToken === "Not Found"
      ) {
        console.warn("Access token not available. Delaying API request...");
        return [];
      }

      if (
        !STATE.jellyfinData.serverAddress ||
        STATE.jellyfinData.serverAddress === "Not Found"
      ) {
        console.warn("Server address not available. Delaying API request...");
        return [];
      }

      console.log("Fetching random items from server...");

      const response = await fetch(
        `${STATE.jellyfinData.serverAddress}/Items?IncludeItemTypes=Movie,Series&Recursive=true&hasOverview=true&imageTypes=Logo,Backdrop&sortBy=Random&isPlayed=False&enableUserData=true&Limit=${CONFIG.maxItems}&fields=Id`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        console.error(
          `Failed to fetch items: ${response.status} ${response.statusText}`
        );
        return [];
      }

      const data = await response.json();
      const items = data.Items || [];

      console.log(
        `Successfully fetched ${items.length} random items from server`
      );

      return items.map((item) => item.Id);
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
      Authorization: `MediaBrowser Client="${STATE.jellyfinData.appName}", Device="${STATE.jellyfinData.deviceName}", DeviceId="${STATE.jellyfinData.deviceId}", Version="${STATE.jellyfinData.appVersion}", Token="${STATE.jellyfinData.accessToken}"`,
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
        method: "POST",
        headers: this.getAuthHeaders(),
      });

      if (!playResponse.ok) {
        throw new Error(
          `Failed to send play command: ${playResponse.statusText}`
        );
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
        `${STATE.jellyfinData.serverAddress
        }/Sessions?deviceId=${encodeURIComponent(STATE.jellyfinData.deviceId)}`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch session data: ${response.statusText}`);
      }

      const sessions = await response.json();

      if (!sessions || sessions.length === 0) {
        console.warn(
          "No sessions found for deviceId:",
          STATE.jellyfinData.deviceId
        );
        return null;
      }

      return sessions[0].Id;
    } catch (error) {
      console.error("Error fetching session data:", error);
      return null;
    }
  },

  //Favorites

  async toggleFavorite(itemId, button) {
    try {
      const userId = STATE.jellyfinData.userId;
      const isFavorite = button.classList.contains("favorited");

      const url = `${STATE.jellyfinData.serverAddress}/Users/${userId}/FavoriteItems/${itemId}`;
      const method = isFavorite ? "DELETE" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          ...ApiUtils.getAuthHeaders(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to toggle favorite: ${response.statusText}`);
      }
      button.classList.toggle("favorited", !isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
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
        (window.location.hash === "#/home.html" ||
         window.location.hash === "#/home") &&
      activeTab.getAttribute("data-index") === "0";

    container.style.display = isVisible ? "block" : "none";

    if (isVisible) {
      if (STATE.slideshow.slideInterval && !STATE.slideshow.isPaused) {
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
  },
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

    const slide = SlideUtils.createElement("a", {
      className: "slide",
      target: "_top",
      rel: "noreferrer",
      tabIndex: 0,
      "data-item-id": itemId,
    });

    const backdrop = SlideUtils.createElement("img", {
      className: "backdrop high-quality",
      src: `${serverAddress}/Items/${itemId}/Images/Backdrop/0?quality=60`,
      alt: "Backdrop",
      loading: "eager",
    });

    const backdropOverlay = SlideUtils.createElement("div", {
      className: "backdrop-overlay",
    });

    const backdropContainer = SlideUtils.createElement("div", {
      className: "backdrop-container",
    });
    backdropContainer.append(backdrop, backdropOverlay);

    const logo = SlideUtils.createElement("img", {
      className: "logo high-quality",
      src: `${serverAddress}/Items/${itemId}/Images/Logo?quality=40`,
      alt: "logo",
      loading: "eager",
    });

    const logoContainer = SlideUtils.createElement("div", {
      className: "logo-container",
    });
    logoContainer.appendChild(logo);

    const featuredContent = SlideUtils.createElement(
      "div",
      {
        className: "featured-content",
      },
      title
    );

    const plot = item.Overview || "No overview available";
    const plotElement = SlideUtils.createElement(
      "div",
      {
        className: "plot",
      },
      plot
    );
    SlideUtils.truncateText(plotElement, CONFIG.maxPlotLength);

    const plotContainer = SlideUtils.createElement("div", {
      className: "plot-container",
    });
    plotContainer.appendChild(plotElement);

    const gradientOverlay = SlideUtils.createElement("div", {
      className: "gradient-overlay",
    });

    const infoContainer = SlideUtils.createElement("div", {
      className: "info-container",
    });

    const ratingInfo = this.createRatingInfo(item);
    infoContainer.appendChild(ratingInfo);

    const genreElement = SlideUtils.createElement("div", {
      className: "genre",
    });
    genreElement.innerHTML = SlideUtils.parseGenres(item.Genres);

    const buttonContainer = SlideUtils.createElement("div", {
      className: "button-container",
    });

    const playButton = this.createPlayButton(itemId);
    const detailButton = this.createDetailButton(itemId);
    const favoriteButton = this.createFavoriteButton(item);
    buttonContainer.append(detailButton, playButton, favoriteButton);

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
      ChildCount: season,
    } = item;

    const ratingTest = SlideUtils.createElement("div", {
      className: "rating-value",
    });

    const imdbLogo = SlideUtils.createElement("div", {
      className: "imdb-logo",
      innerHTML: CONFIG.IMAGE_SVG.imdbLogo,
      style: {
        width: "30px",
        height: "30px",
      },
    });

    ratingTest.appendChild(imdbLogo);

    if (typeof rating === "number") {
      const ratingSpan = document.createElement("span");
      ratingSpan.textContent = rating.toFixed(1);
      ratingSpan.style.marginRight = "5px";
      ratingSpan.style.marginLeft = "5px";
      ratingTest.appendChild(ratingSpan);
    } else {
      const naSpan = document.createElement("span");
      naSpan.innerHTML = "N/A";
      naSpan.style.color = "#fff9";
      naSpan.style.marginRight = "5px";
      naSpan.style.marginLeft = "5px";
      ratingTest.appendChild(naSpan);
    }

    ratingTest.appendChild(SlideUtils.createSeparator());

    const tomatoRatingDiv = SlideUtils.createElement("div", {
      className: "tomato-rating",
    });

    const tomatoLogo = SlideUtils.createElement("div", {
      className: "tomato-logo",
      innerHTML: CONFIG.IMAGE_SVG.tomatoLogo,
      style: {
        width: "18px",
        height: "20px",
      },
    });

    let valueElement = SlideUtils.createElement("span", {
      style: {
        marginLeft: "5px",
        marginRight: "5px",
      },
    });

    if (typeof criticRating === "number") {
      valueElement.textContent = `${criticRating}% `;
    } else {
      valueElement.style.color = "#fff9";
      valueElement.textContent = "N/A ";
    }

    const criticLogo = SlideUtils.createElement("span", {
      className: "critic-logo",
      style: {
        display: "flex",
        width: "18",
        height: "20",
      },
    });
    criticLogo.innerHTML =
      criticRating > 59
        ? CONFIG.IMAGE_SVG.freshTomato
        : CONFIG.IMAGE_SVG.rottenTomato;

    tomatoRatingDiv.append(tomatoLogo, valueElement, criticLogo);
    tomatoRatingDiv.appendChild(SlideUtils.createSeparator());

    const ageRatingDiv = SlideUtils.createElement("div", {
      className: "age-rating",
    });
    const ageSpan = document.createElement("span");
    ageSpan.textContent = age || "N/A";
    ageRatingDiv.appendChild(ageSpan);

    const premiereDate = SlideUtils.createElement("div", {
      className: "date",
    });

    const year = date ? new Date(date).getFullYear() : NaN;
    if (isNaN(year)) {
      const naSpan = SlideUtils.createElement(
        "span",
        {
          style: { color: "#fff9" },
        },
        "N/A"
      );
      premiereDate.appendChild(naSpan);
    } else {
      premiereDate.textContent = year;
    }

    const runTimeElement = SlideUtils.createElement("div", {
      className: "runTime",
    });

    if (season === undefined) {
      const milliseconds = runtime / 10000;
      const currentTime = new Date();
      const endTime = new Date(currentTime.getTime() + milliseconds);
      const options = { hour: "2-digit", minute: "2-digit", hour12: false };
      const formattedEndTime = endTime.toLocaleTimeString([], options);
      runTimeElement.textContent = `Ends at ${formattedEndTime}`;
    } else {
      runTimeElement.textContent = `${season} Season${season > 1 ? "s" : ""}`;
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
    return SlideUtils.createElement("button", {
      className: "detailButton btnPlay play-button",
      innerHTML: `
      <span class="play-text">Play</span>
    `,
      tabIndex: "0",
      onclick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        ApiUtils.playItem(itemId);
      },
    });
  },

  /**
   * Creates a detail button for an item
   * @param {string} itemId - Item ID
   * @returns {HTMLElement} Detail button element
   */
  createDetailButton(itemId) {
    return SlideUtils.createElement("button", {
      className: "detailButton detail-button",
      tabIndex: "0",
      onclick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.Emby && window.Emby.Page) {
          Emby.Page.show(
            `/details?id=${itemId}&serverId=${STATE.jellyfinData.serverId}`
          );
        } else {
          window.location.href = `#/details?id=${itemId}&serverId=${STATE.jellyfinData.serverId}`;
        }
      },
    });
  },

  /**
   * Creates a favorite button for an item
   * @param {string} itemId - Item ID
   * @returns {HTMLElement} Favorite button element
   */

  createFavoriteButton(item) {
    const isFavorite = item.UserData && item.UserData.IsFavorite === true;

    const button = SlideUtils.createElement("button", {
      className: `favorite-button ${isFavorite ? "favorited" : ""}`,
      tabIndex: "0",
      onclick: async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await ApiUtils.toggleFavorite(item.Id, button);
      },
    });

    return button;
  },


  /**
   * Creates a placeholder slide for loading
   * @param {string} itemId - Item ID to load
   * @returns {HTMLElement} Placeholder slide element
   */
  createLoadingPlaceholder(itemId) {
    const placeholder = SlideUtils.createElement("a", {
      className: "slide placeholder",
      "data-item-id": itemId,
      style: {
        display: "none",
        opacity: "0",
        transition: `opacity ${CONFIG.fadeTransitionDuration}ms ease-in-out`,
      },
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

      const item = await ApiUtils.fetchItemDetails(itemId);

      const slideElement = this.createSlideElement(
        item,
        item.Type === "Movie" ? "Movie" : "TV Show"
      );

      container.appendChild(slideElement);

      STATE.slideshow.createdSlides[itemId] = true;

      return slideElement;
    } catch (error) {
      console.error("Error creating slide for item:", error, itemId);
      return null;
    }
  },
};

/**
 * Manages slideshow functionality
 */
const SlideshowManager = {

  createPaginationDots() {
    let dotsContainer = document.querySelector(".dots-container");
    if (!dotsContainer) {
      dotsContainer = document.createElement("div");
      dotsContainer.className = "dots-container";
      document.getElementById("slides-container").appendChild(dotsContainer);
    }

    for (let i = 0; i < 5; i++) {
      const dot = document.createElement("span");
      dot.className = "dot";
      dot.setAttribute("data-index", i);
      dotsContainer.appendChild(dot);
    }
    this.updateDots();
  },

  /**
   * Updates active dot based on current slide
   * Maps current slide to one of the 5 dots
   */
  updateDots() {
    const container = SlideUtils.getOrCreateSlidesContainer();
    const dots = container.querySelectorAll(".dot");
    const currentIndex = STATE.slideshow.currentSlideIndex;
    const totalItems = STATE.slideshow.totalItems;
    const numDots = dots.length;

    let activeDotIndex;

    if (totalItems <= numDots) {
      activeDotIndex = currentIndex;
    } else {
      activeDotIndex = Math.floor(
        (currentIndex % numDots) * (numDots / numDots)
      );
    }

    dots.forEach((dot, index) => {
      if (index === activeDotIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
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

    let previousVisibleSlide;
    try {
      const container = SlideUtils.getOrCreateSlidesContainer();
      const totalItems = STATE.slideshow.totalItems;

      index = Math.max(0, Math.min(index, totalItems - 1));
      const currentItemId = STATE.slideshow.itemIds[index];

      let currentSlide = document.querySelector(
        `.slide[data-item-id="${currentItemId}"]`
      );
      if (!currentSlide) {
        currentSlide = await SlideCreator.createSlideForItemId(currentItemId);
        this.upgradeSlideImageQuality(currentSlide);

        if (!currentSlide) {
          console.error(`Failed to create slide for item ${currentItemId}`);
          STATE.slideshow.isTransitioning = false;
          setTimeout(() => this.nextSlide(), 500);
          return;
        }
      }

      previousVisibleSlide = container.querySelector(".slide.active");

      if (previousVisibleSlide) {
        previousVisibleSlide.classList.remove("active");
      }

      currentSlide.classList.add("active");

      if (CONFIG.slideAnimationEnabled) {
        currentSlide.querySelector(".backdrop").classList.add("animate");
        currentSlide.querySelector(".logo").classList.add("animate");
      }

      STATE.slideshow.currentSlideIndex = index;

      if (index === 0 || !previousVisibleSlide) {
        const dotsContainer = container.querySelector(".dots-container");
        if (dotsContainer) {
          dotsContainer.style.opacity = "1";
        }
      }

      setTimeout(() => {
        const allSlides = container.querySelectorAll(".slide");
        allSlides.forEach((slide) => {
          if (slide !== currentSlide) {
            slide.classList.remove("active");
          }
        });
      }, CONFIG.fadeTransitionDuration);

      this.preloadAdjacentSlides(index);
      this.updateDots();

      if (STATE.slideshow.slideInterval && !STATE.slideshow.isPaused) {
        STATE.slideshow.slideInterval.restart();
      }

      this.pruneSlideCache();
    } catch (error) {
      console.error("Error updating current slide:", error);
    } finally {
      setTimeout(() => {
        STATE.slideshow.isTransitioning = false;

        if (previousVisibleSlide && CONFIG.slideAnimationEnabled) {
          const prevBackdrop = previousVisibleSlide.querySelector(".backdrop");
          const prevLogo = previousVisibleSlide.querySelector(".logo");
          if (prevBackdrop) prevBackdrop.classList.remove("animate");
          if (prevLogo) prevLogo.classList.remove("animate");
        }
      }, CONFIG.fadeTransitionDuration);
    }
  },

  /**
   * Upgrades the image quality for all images in a slide
   * @param {HTMLElement} slide - The slide element containing images to upgrade
   */

  upgradeSlideImageQuality(slide) {
    if (!slide) return;

    const images = slide.querySelectorAll("img.low-quality");
    images.forEach((img) => {
      const highQualityUrl = img.getAttribute("data-high-quality");

      // Prevent duplicate requests if already using high quality
      if (highQualityUrl && img.src !== highQualityUrl) {
        addThrottledRequest(highQualityUrl, () => {
          img.src = highQualityUrl;
          img.classList.remove("low-quality");
          img.classList.add("high-quality");
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
    const keepRange = 5;

    Object.keys(STATE.slideshow.createdSlides).forEach((itemId) => {
      const index = STATE.slideshow.itemIds.indexOf(itemId);
      if (index === -1) return;

      const distance = Math.abs(index - currentIndex);
      if (distance > keepRange) {
        delete STATE.slideshow.loadedItems[itemId];

        const slide = document.querySelector(
          `.slide[data-item-id="${itemId}"]`
        );
        if (slide) slide.remove();

        delete STATE.slideshow.createdSlides[itemId];

        console.log(`Pruned slide ${itemId} at distance ${distance} from view`);
      }
    });
  },

  togglePause() {
      STATE.slideshow.isPaused = !STATE.slideshow.isPaused;
      const pauseButton = document.querySelector('.pause-button');
      if (STATE.slideshow.isPaused) {
          STATE.slideshow.slideInterval.stop();
          pauseButton.innerHTML = '<i class="material-icons">play_arrow</i>';
      } else {
          STATE.slideshow.slideInterval.start();
          pauseButton.innerHTML = '<i class="material-icons">pause</i>';
      }
  },

  /**
   * Initializes touch events for swiping
   */
  initTouchEvents() {
    const container = SlideUtils.getOrCreateSlidesContainer();
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    container.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe(touchStartX, touchEndX);
      },
      { passive: true }
    );
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
    document.addEventListener("keydown", (e) => {
      if (!STATE.slideshow.containerFocused) {
        return;
      }

      switch (e.key) {
        case "ArrowRight":
          if (focusElement.classList.contains("detail-button")) {
            focusElement.previousElementSibling.focus();
          } else {
            SlideshowManager.nextSlide();
          }
          e.preventDefault();
          break;

        case "ArrowLeft":
          if (focusElement.classList.contains("play-button")) {
            focusElement.nextElementSibling.focus();
          } else {
            SlideshowManager.prevSlide();
          }
          e.preventDefault();
          break;

        case " ": // Space bar
            this.togglePause();
            e.preventDefault();
            break;

        case "Enter":
          focusElement.click();
          e.preventDefault();
          break;
      }
    });

    const container = SlideUtils.getOrCreateSlidesContainer();

    container.addEventListener("focus", () => {
      STATE.slideshow.containerFocused = true;
    });

    container.addEventListener("blur", () => {
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
        if (!STATE.slideshow.isPaused) {
            this.nextSlide();
        }
      }, CONFIG.shuffleInterval);
    } catch (error) {
      console.error("Error loading slideshow data:", error);
    } finally {
      STATE.slideshow.isLoading = false;
    }
  },
};

/**
 * Initializes arrow navigation elements
 */
const initArrowNavigation = () => {
  const container = SlideUtils.getOrCreateSlidesContainer();

  const leftArrow = SlideUtils.createElement("div", {
    className: "arrow left-arrow",
    innerHTML: '<i class="material-icons">chevron_left</i>',
    tabIndex: "0",
    onclick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      SlideshowManager.prevSlide();
    },
    style: {
      opacity: "0",
      transition: "opacity 0.3s ease",
      display: "none",
    },
  });

  const rightArrow = SlideUtils.createElement("div", {
    className: "arrow right-arrow",
    innerHTML: '<i class="material-icons">chevron_right</i>',
    tabIndex: "0",
    onclick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      SlideshowManager.nextSlide();
    },
    style: {
      opacity: "0",
      transition: "opacity 0.3s ease",
      display: "none",
    },
  });

  const pauseButton = SlideUtils.createElement("div", {
      className: "pause-button",
      innerHTML: '<i class="material-icons">pause</i>',
      tabIndex: "0",
      onclick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          SlideshowManager.togglePause();
      }
  });

  container.appendChild(leftArrow);
  container.appendChild(rightArrow);
  container.appendChild(pauseButton);

  const showArrows = () => {
    leftArrow.style.display = "block";
    rightArrow.style.display = "block";

    void leftArrow.offsetWidth;
    void rightArrow.offsetWidth;

    leftArrow.style.opacity = "1";
    rightArrow.style.opacity = "1";
  };

  const hideArrows = () => {
    leftArrow.style.opacity = "0";
    rightArrow.style.opacity = "0";

    setTimeout(() => {
      if (leftArrow.style.opacity === "0") {
        leftArrow.style.display = "none";
        rightArrow.style.display = "none";
      }
    }, 300);
  };

  container.addEventListener("mouseenter", showArrows);

  container.addEventListener("mouseleave", hideArrows);

  let arrowTimeout;
  container.addEventListener(
    "touchstart",
    () => {
      if (arrowTimeout) {
        clearTimeout(arrowTimeout);
      }

      showArrows();

      arrowTimeout = setTimeout(hideArrows, 2000);
    },
    { passive: true }
  );
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
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target;
            const highQualityUrl = image.getAttribute("data-high-quality");

            if (
              highQualityUrl &&
              image.closest(".slide").style.opacity === "1"
            ) {
              requestQueue.push({
                url: highQualityUrl,
                callback: () => {
                  image.src = highQualityUrl;
                  image.classList.remove("low-quality");
                  image.classList.add("high-quality");
                },
              });

              if (requestQueue.length === 1) {
                processNextRequest();
              }
            }

            observer.unobserve(image);
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    const observeSlideImages = () => {
      const slides = document.querySelectorAll(".slide");
      slides.forEach((slide) => {
        const images = slide.querySelectorAll("img.low-quality");
        images.forEach((image) => {
          imageObserver.observe(image);
        });
      });
    };

    const slideObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach((node) => {
            if (node.classList && node.classList.contains("slide")) {
              const images = node.querySelectorAll("img.low-quality");
              images.forEach((image) => {
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
  },
};

initLoadingScreen();

startLoginStatusWatcher();
