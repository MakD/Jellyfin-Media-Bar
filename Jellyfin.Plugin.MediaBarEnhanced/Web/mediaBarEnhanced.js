/*
 * Jellyfin Slideshow by M0RPH3US v4.0.1
 * Modified by CodeDevMLH
 * 
 * New features:
 * - optional Trailer background video support
 * - option to make video backdrops full width
 * - SponsorBlock support to skip intro/outro segments
 * - option to always show arrows
 * - option to disable/enable keyboard controls
 * - option to show/hide trailer button if trailer as backdrop is disabled (opens in a modal)
 * - option to wait for trailer to end before loading next slide
 * - option to set a maximum for the pagination dots (will turn into a counter style if exceeded)
 * - option to disable loading screen
 * - option to put collection (boxsets) IDs into the slideshow to display their items
 * - option to enable client-side settings (allow users to override settings locally on their device)
 * - option to enable seasonal content (only show items that are relevant to the current season/holiday)
 * - option to prefer local trailers (from the media item) over online sources
 * - options to sort the content by various criteria (PremiereDate, ProductionYear, Random, Original order, etc.)
 */

//Core Module Configuration
const CONFIG = {
  IMAGE_SVG: {
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
  maxPaginationDots: 15,
  showPaginationDots: true,
  maxParentalRating: null,
  maxDaysRecent: null,
  slideAnimationEnabled: true,
  enableVideoBackdrop: true,
  useSponsorBlock: true,
  preferLocalTrailers: false,
  randomizeLocalTrailers: false,
  preferLocalBackdrops: false,
  randomizeThemeVideos: false,
  includeWatchedContent: false,
  waitForTrailerToEnd: true,
  startMuted: true,
  fullWidthVideo: true,
  enableMobileVideo: false,
  showTrailerButton: true,
  preferredVideoQuality: "Auto",
  enableKeyboardControls: true,
  alwaysShowArrows: false,
  hideArrowsOnMobile: true,
  enableCustomOverlay: false,
  customOverlayText: "",
  customOverlayImageUrl: "",
  customOverlayStyle: "Shadowed",
  customOverlayImageStyle: "None",
  customOverlayPriority: "Image",
  customOverlayPositionX: 0,
  customOverlayPositionY: 0,
  customOverlayScale: 100,
  backdropVideoDelay: 0,
  constrainPlotWidth: false,
  enableCustomMediaIds: true,
  enableSeasonalContent: false,
  customMediaIds: "",
  enableLoadingScreen: true,
  enableClientSideSettings: false,
  sortBy: "Random",
  sortOrder: "Ascending",
  applyLimitsToCustomIds: false,
  seasonalSections: "[]",
  excludeSeasonalContent: true,
  isEnabled: true,
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
    videoPlayers: {},
    sponsorBlockInterval: null,
    isMuted: CONFIG.startMuted,
    customTrailerUrls: {},
    ytPromise: null,
    autoplayTimeouts: [],
    playSignals: {},
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
      console.error("🎬 Media Bar:", "Error in throttled request:", error);
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
    console.error("🎬 Media Bar:", "Error checking login status:", error);
    return false;
  }
};

/**
 * Detects if the current device is a low-power device (Smart TVs, etc.)
 * @returns {boolean} True if running on a low-power device
 */
const isLowPowerDevice = () => {
  return /webOS|LG Browser|SMART-TV|SmartTV|Tizen|Viera|NetCast|Roku|VIDAA/i.test(navigator.userAgent);
};

/**
 * Initializes Jellyfin data from ApiClient
 * @param {Function} callback - Function to call once data is initialized
 */
const initJellyfinData = (callback) => {
  if (!window.ApiClient) {
    console.warn("🎬 Media Bar:", "⏳ window.ApiClient is not available yet. Retrying...");
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
    console.error("🎬 Media Bar:", "Error initializing Jellyfin data:", error);
    setTimeout(() => initJellyfinData(callback), CONFIG.retryInterval);
  }
};

/**
 * Initializes localization by loading translation chunks
 */
const initLocalization = async () => {
  try {
    const locale = await LocalizationUtils.getCurrentLocale();
    await LocalizationUtils.loadTranslations(locale);
    console.log("🎬 Media Bar:", "✅ Localization initialized");
  } catch (error) {
    console.error("🎬 Media Bar:", "Error initializing localization:", error);
  }
};

/**
 * Creates and displays loading screen
 */

const initLoadingScreen = () => {
  const currentPath = window.location.href.toLowerCase().replace(window.location.origin, "");
  const isHomePage =
    currentPath.includes("/web/#/home.html") ||
    currentPath.includes("/web/#/home") ||
    currentPath.includes("/web/index.html#/home.html") ||
    currentPath === "/web/index.html#/home" ||
    currentPath.endsWith("/web/");

  if (!isHomePage) return;

  // Check LocalStorage for cached preference to avoid flash
  const cachedSetting = localStorage.getItem('mediaBarEnhanced-enableLoadingScreen');
  if (cachedSetting === 'false') {
    return;
  }

  const loadingDiv = document.createElement("div");
  loadingDiv.className = "bar-loading";
  loadingDiv.id = "page-loader";
  loadingDiv.innerHTML = `
    <div class="loader-content">
      <h1>
        <div class="splashLogo"></div>
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
    document.querySelector(".bar-loading h1 div").style.opacity = "1";
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
    const activeTab = document.querySelector(".pageTabContent.is-active");

    if (loginFormLoaded) {
      finishLoading();
      return;
    }

    if (activeTab) {
      const tabIndex = activeTab.getAttribute("data-index");

      if (tabIndex === "0") {
        const homeSections = document.querySelector(".homeSectionsContainer");
        const slidesContainer = document.querySelector("#slides-container");

        if (homeSections && slidesContainer) {
          finishLoading();
        }
      } else {
        if (
          activeTab.children.length > 0 ||
          activeTab.innerText.trim().length > 0
        ) {
          finishLoading();
        }
      }
    }
  }, CONFIG.loadingCheckInterval);

  const finishLoading = () => {
    clearInterval(progressInterval);
    clearInterval(checkInterval);
    progressBar.style.transition = "width 300ms ease-in-out";
    progressBar.style.width = "100%";
    unfilledBar.style.width = "0%";

    progressBar.addEventListener("transitionend", () => {
      requestAnimationFrame(() => {
        const loader = document.querySelector(".bar-loading");
        if (loader) {
          loader.style.opacity = "0";
          setTimeout(() => {
            loader.remove();
          }, 300);
        }
      });
    });
  };

  // Global Failsafe, force remove loading screen after 15 seconds to prevent infinite lockouts
  setTimeout(() => {
    const loader = document.querySelector(".bar-loading");
    if (loader) {
      console.warn("🎬 Media Bar:", "Loading screen timed out! Forcing removal as a failsafe.");
      finishLoading();
    }
  }, 15000);
};

/**
 * Resets the slideshow state completely
 */
const resetSlideshowState = () => {
  console.log("🎬 Media Bar:", "🔄 Resetting slideshow state...");

  if (STATE.slideshow.slideInterval) {
    STATE.slideshow.slideInterval.stop();
  }

  // Destroy all video players
  if (STATE.slideshow.videoPlayers) {
    Object.values(STATE.slideshow.videoPlayers).forEach(player => {
      if (player && typeof player.destroy === 'function') {
        player.destroy();
      }
    });
    STATE.slideshow.videoPlayers = {};
  }

  if (STATE.slideshow.sponsorBlockInterval) {
    clearInterval(STATE.slideshow.sponsorBlockInterval);
    STATE.slideshow.sponsorBlockInterval = null;
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
  STATE.slideshow.customTrailerUrls = {};
  STATE.slideshow.totalItems = 0;
  STATE.slideshow.isLoading = false;
  STATE.slideshow.playSignals = {};
  STATE.slideshow.hasTrailer = {};
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
        console.log("🎬 Media Bar:", "👤 User logged in. Initializing slideshow...");
        if (!STATE.slideshow.hasInitialized) {
          waitForApiClientAndInitialize();
        } else {
          console.log("🎬 Media Bar:", "🔄 Slideshow already initialized, skipping");
        }
      } else {
        console.log("🎬 Media Bar:", "👋 User logged out. Stopping slideshow...");
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
      console.log("🎬 Media Bar:", "⏳ ApiClient not available yet. Waiting...");
      return;
    }

    if (
      window.ApiClient._currentUser &&
      window.ApiClient._currentUser.Id &&
      window.ApiClient._serverInfo &&
      window.ApiClient._serverInfo.AccessToken
    ) {
      console.log("🎬 Media Bar:", 
        "🔓 User is fully logged in. Starting slideshow initialization..."
      );
      clearInterval(window.slideshowCheckInterval);

      if (!STATE.slideshow.hasInitialized) {
        initJellyfinData(async () => {
          console.log("🎬 Media Bar:", "✅ Jellyfin API client initialized successfully");
          await initLocalization();
          await fetchPluginConfig();
          slidesInit();
        });
      } else {
        console.log("🎬 Media Bar:", "🔄 Slideshow already initialized, skipping");
      }
    } else {
      console.log("🎬 Media Bar:", 
        "🔒 Authentication incomplete. Waiting for complete login..."
      );
    }
  }, CONFIG.retryInterval);
};

const fetchPluginConfig = async () => {
  try {
    const response = await fetch('../MediaBarEnhanced/Config');
    if (response.ok) {
      const pluginConfig = await response.json();
      if (pluginConfig) {
        for (const key in pluginConfig) {
          const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
          if (CONFIG.hasOwnProperty(camelKey)) {
            CONFIG[camelKey] = pluginConfig[key];
          }
        }
        STATE.slideshow.isMuted = CONFIG.startMuted;

        if (!CONFIG.enableLoadingScreen) {
          const loader = document.querySelector(".bar-loading");
          if (loader) {
            loader.remove();
          }
        }

        // Sync to LocalStorage for next load
        localStorage.setItem('mediaBarEnhanced-enableLoadingScreen', CONFIG.enableLoadingScreen);

        console.log("🎬 Media Bar:", "✅ MediaBarEnhanced config loaded", CONFIG);
      }
    }
  } catch (e) {
    console.error("🎬 Media Bar:", "Failed to load MediaBarEnhanced config", e);
  }
};

waitForApiClientAndInitialize();

/**
 * Utility functions for slide creation and management
 */
const SlideUtils = {
  /**
   * Sorts items based on configuration
   * @param {Array<Object>} items - Array of item objects
   * @param {string} sortBy - Sort criteria
   * @param {string} sortOrder - Sort order 'Ascending' or 'Descending'
   * @returns {Array<Object>} Sorted array of items
   */
  sortItems(items, sortBy, sortOrder) {
    if (sortBy === 'Random' || sortBy === 'Original') {
      return items;
    }

    const simpleCompare = (a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    };

    const sorted = [...items].sort((a, b) => {
      let valA, valB;

      switch (sortBy) {
        case 'PremiereDate':
          valA = new Date(a.PremiereDate).getTime();
          valB = new Date(b.PremiereDate).getTime();
          break;
        case 'ProductionYear':
           valA = a.ProductionYear || 0;
           valB = b.ProductionYear || 0;
           break;
        case 'CriticRating':
           valA = a.CriticRating || 0;
           valB = b.CriticRating || 0;
           break;
        case 'CommunityRating':
          valA = a.CommunityRating || 0;
          valB = b.CommunityRating || 0;
          break;
        case 'Runtime':
          valA = a.RunTimeTicks || 0;
          valB = b.RunTimeTicks || 0;
          break;
        case 'Name':
          valA = (a.Name || '').toLowerCase();
          valB = (b.Name || '').toLowerCase();
          break;
        default:
          return 0;
      }

      return simpleCompare(valA, valB);
    });

    if (sortOrder === 'Descending') {
      sorted.reverse();
    }

    return sorted;
  },

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
      container = this.createElement("div", { 
        id: "slides-container",
        className: "noautofocus",
        tabIndex: "-1"
      });
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
      return genresArray.slice(0, 3).join(this.createSeparator().outerHTML);
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

  /**
   * Loads the YouTube IFrame API if not already loaded
   * @returns {Promise<void>}
   */
  loadYouTubeIframeAPI() {
    if (STATE.slideshow.ytPromise) return STATE.slideshow.ytPromise;

    STATE.slideshow.ytPromise = new Promise((resolve) => {
      if (window.YT && window.YT.Player) {
        resolve(window.YT);
        return;
      }

      window.onYouTubeIframeAPIReady = () => resolve(window.YT);
      
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    });
    
    return STATE.slideshow.ytPromise;
  },

  /**
   * Opens a modal video player
   * @param {string} url - Video URL
   */
  openVideoModal(url) {
    const existingModal = document.getElementById('video-modal-overlay');
    if (existingModal) existingModal.remove();

    if (STATE.slideshow.slideInterval) {
      STATE.slideshow.slideInterval.stop();
    }
    STATE.slideshow.isPaused = true;

    const overlay = this.createElement('div', {
      id: 'video-modal-overlay'
    });

    const closeModal = () => {
      overlay.remove();
      STATE.slideshow.isPaused = false;
      if (STATE.slideshow.slideInterval) {
        STATE.slideshow.slideInterval.start();
      }
    };

    const closeButton = this.createElement('button', {
      className: 'modal-close-button',
      innerHTML: '<i class="material-icons">close</i>',
      onclick: closeModal
    });

    const contentContainer = this.createElement('div', {
      className: 'video-modal-content'
    });

    let videoId = null;
    let isYoutube = false;

    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
        isYoutube = true;
        videoId = urlObj.searchParams.get('v');
        if (!videoId && urlObj.hostname.includes('youtu.be')) {
          videoId = urlObj.pathname.substring(1);
        }
      }
    } catch (e) {
      console.warn("🎬 Media Bar:", "Invalid URL for modal:", url);
    }

    if (isYoutube && videoId) {
      const ytIframe = this.createElement('iframe', {
        id: 'modal-yt-player',
        src: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=1&iv_load_policy=3&rel=0&playsinline=1`,
        allow: 'autoplay; encrypted-media',
        style: 'width: 100%; height: 100%; border: none;',
        referrerpolicy: 'strict-origin-when-cross-origin',
        allowfullscreen: 'true'
      });

      contentContainer.appendChild(ytIframe);
      overlay.append(closeButton, contentContainer);
      document.body.appendChild(overlay);
    } else {
      const video = this.createElement('video', {
        src: url,
        controls: true,
        autoplay: true,
        className: 'video-modal-player'
      });
      video.setAttribute('playsinline', '');
      contentContainer.appendChild(video);
      overlay.append(closeButton, contentContainer);
      document.body.appendChild(overlay);
    }

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });
  },
};

/**
 * Localization utilities for fetching and using Jellyfin translations
 */
const LocalizationUtils = {
  translations: {},
  locale: null,
  isLoading: {},
  cachedLocale: null,
  chunkUrlCache: {},

  /**
   * Gets the current locale from user preference, server config, or HTML tag
   * @returns {Promise<string>} Locale code (e.g., "de", "en-us")
   */
  async getCurrentLocale() {
    if (this.cachedLocale) {
      return this.cachedLocale;
    }

    let locale = null;

    try {
      if (window.ApiClient && typeof window.ApiClient.deviceId === 'function') {
        const deviceId = window.ApiClient.deviceId();
        if (deviceId) {
          const deviceKey = `${deviceId}-language`;
          const val = localStorage.getItem(deviceKey);
          if (val) locale = val.toLowerCase();
        }
      }
      if (!locale) {
        const val = localStorage.getItem("language");
        if (val) locale = val.toLowerCase();
      }
    } catch (e) {
      console.warn("🎬 Media Bar:", "Could not access localStorage for language:", e);
    }

    if (!locale) {
      const langAttr = document.documentElement.getAttribute("lang");
      if (langAttr) {
        locale = langAttr.toLowerCase();
      }
    }

    if (window.ApiClient && STATE.jellyfinData && STATE.jellyfinData.accessToken) {
      try {
        const userId = window.ApiClient.getCurrentUserId();
        if (userId) {
          const userUrl = window.ApiClient.getUrl(`Users/${userId}`);
          const userResponse = await fetch(userUrl, {
            headers: ApiUtils.getAuthHeaders(),
          });
          if (userResponse.ok) {
            const userData = await userResponse.json();
            if (userData.Configuration && userData.Configuration.AudioLanguagePreference) {
              locale = userData.Configuration.AudioLanguagePreference.toLowerCase();
            }
          }
        }
      } catch (error) {
        console.warn("🎬 Media Bar:", "Could not fetch user audio language preference:", error);
      }
    }

    if (!locale && window.ApiClient && (STATE.jellyfinData && STATE.jellyfinData.accessToken)) {
      try {
        const configUrl = window.ApiClient.getUrl('System/Configuration');
        const configResponse = await fetch(configUrl, {
          headers: ApiUtils.getAuthHeaders(),
        });
        if (configResponse.ok) {
          const configData = await configResponse.json();
          if (configData.PreferredMetadataLanguage) {
            locale = configData.PreferredMetadataLanguage.toLowerCase();
            if (configData.MetadataCountryCode) {
              locale = `${locale}-${configData.MetadataCountryCode.toLowerCase()}`;
            }
          }
        }
      } catch (error) {
        console.warn("🎬 Media Bar:", "Could not fetch server metadata language preference:", error);
      }
    }

    if (!locale) {
      const navLang = navigator.language || navigator.userLanguage;
      locale = navLang ? navLang.toLowerCase() : "en-us";
    }

    // Convert 3-letter country codes to 2-letter if necessary
    if (locale.length === 3) {
      const countriesData = await window.ApiClient.getCountries();
      const countryData = Object.values(countriesData).find(countryData => countryData.ThreeLetterISORegionName === locale.toUpperCase());
      if (countryData) {
        locale = countryData.TwoLetterISORegionName.toLowerCase();
      }
    }

    this.cachedLocale = locale;
    return locale;
  },

  /**
   * Finds the translation chunk URL from performance entries
   * @param {string} locale - Locale code
   * @returns {string|null} URL to translation chunk or null
   */
  findTranslationChunkUrl(locale) {
    const localePrefix = locale.split('-')[0];

    if (this.chunkUrlCache[localePrefix]) {
      return this.chunkUrlCache[localePrefix];
    }

    if (window.performance && window.performance.getEntriesByType) {
      try {
        const resources = window.performance.getEntriesByType('resource');
        for (const resource of resources) {
          const url = resource.name || resource.url;
          if (url && url.includes(`${localePrefix}-json`) && url.includes('.chunk.js')) {
            this.chunkUrlCache[localePrefix] = url;
            return url;
          }
        }
      } catch (e) {
        console.warn("🎬 Media Bar:", "Error checking performance entries:", e);
      }
    }

    this.chunkUrlCache[localePrefix] = null;
    return null;
  },

  /**
   * Fetches and loads translations from the chunk JSON
   * @param {string} locale - Locale code
   * @returns {Promise<void>}
   */
  async loadTranslations(locale) {
    if (this.translations[locale]) return;
    if (this.isLoading[locale]) {
      await this.isLoading[locale];
      return;
    }

    const loadPromise = (async () => {
      try {
        const chunkUrl = this.findTranslationChunkUrl(locale);
        if (!chunkUrl) {
          return;
        }

        const response = await fetch(chunkUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch translations: ${response.statusText}`);
        }

        /**
         * @example
         * Standard version
         * ```js
         * "use strict";
         * (self.webpackChunk = self.webpackChunk || []).push([[62634], {
         *   30985: function(e) {
         *     e.exports = JSON.parse('{"Absolute":"..."}')
         *   }
         * }]);
         * ```
         *
         * Minified version
         * ```js
         * "use strict";(self.webpackChunk=self.webpackChunk||[]).push([[24072],{60715:function(e){e.exports=JSON.parse('{"Absolute":"..."}')}}]);
         * ```
         */
        const chunkText = await response.text();

        const replaceEscaped = (text) =>
          text.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\\\/g, '\\').replace(/\\'/g, "'");

        // 1. Try to remove start and end wrappers first
        try {
          // Matches from start of file to the beginning of JSON.parse('
          const START = /^(.*)JSON\.parse\(['"]/gms;
          // Matches from the end of the JSON string to the end of the file
          const END = /['"]?\)?\s*}?(\r\n|\r|\n)?}?]?\)?;(\r\n|\r|\n)?$/gms;

          const jsonString = replaceEscaped(chunkText.replace(START, '').replace(END, ''));
          this.translations[locale] = JSON.parse(jsonString);
          return;
        } catch (e) {
          console.error("🎬 Media Bar:", 'Failed to parse JSON from standard extraction.');
          // Try alternative extraction below
        }

        // 2. Try to extract only the JSON string directly
        let jsonMatch = chunkText.match(/JSON\.parse\(['"](.*?)['"]\)/);
        if (jsonMatch) {
          try {
            const jsonString = replaceEscaped(jsonMatch[1]);
            this.translations[locale] = JSON.parse(jsonString);
            return;
          } catch (e) {
            console.error("🎬 Media Bar:", 'Failed to parse JSON from direct extraction.');
            // Try direct extraction
          }
        }

        // 3. Fallback: extract everything between the first { and the last }
        const jsonStart = chunkText.indexOf('{');
        const jsonEnd = chunkText.lastIndexOf('}') + 1;
        if (jsonStart !== -1 && jsonEnd > jsonStart) {
          const jsonString = chunkText.substring(jsonStart, jsonEnd);
          try {
            this.translations[locale] = JSON.parse(jsonString);
            return;
          } catch (e) {
            console.error("🎬 Media Bar:", "Failed to parse JSON from chunk:", e);
          }
        }
      } catch (error) {
        console.error("🎬 Media Bar:", "Error loading translations:", error);
      } finally {
        delete this.isLoading[locale];
      }
    })();

    this.isLoading[locale] = loadPromise;
    await loadPromise;
  },

  /**
   * Gets a localized string (synchronous - translations must be loaded first)
   * @param {string} key - Localization key (e.g., "EndsAtValue", "Play")
   * @param {string} fallback - Fallback English string
   * @param {...any} args - Optional arguments for placeholders (e.g., {0}, {1})
   * @returns {string} Localized string or fallback
   */
  getLocalizedString(key, fallback, ...args) {
    const locale = this.cachedLocale || 'en-us';
    let translated = (this.translations[locale] && this.translations[locale][key]) || fallback;

    if (args.length > 0) {
      for (let i = 0; i < args.length; i++) {
        translated = translated.replace(new RegExp(`\\{${i}\\}`, 'g'), args[i]);
      }
    }

    return translated;
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
        // `${STATE.jellyfinData.serverAddress}/Items/${itemId}`,
        `${STATE.jellyfinData.serverAddress}/Items/${itemId}?Fields=Overview,RemoteTrailers,Genres,CommunityRating,CriticRating,OfficialRating,PremiereDate,ProductionYear,MediaSources,RunTimeTicks,LocalTrailerCount`,
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
      console.error("🎬 Media Bar:", `Error fetching details for item ${itemId}:`, error);
      return null;
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
        console.warn("🎬 Media Bar:", "Access token not available. Delaying API request...");
        return [];
      }

      if (
        !STATE.jellyfinData.serverAddress ||
        STATE.jellyfinData.serverAddress === "Not Found"
      ) {
        console.warn("🎬 Media Bar:", "Server address not available. Delaying API request...");
        return [];
      }

      console.log("🎬 Media Bar:", "Fetching random items from server...");

      let sortParams = `sortBy=${CONFIG.sortBy}`;

      if (CONFIG.sortBy === 'Random' || CONFIG.sortBy === 'Original') {
          sortParams = 'sortBy=Random';
      } else {
        sortParams += `&sortOrder=${CONFIG.sortOrder}`;
      }

      // Filter by isPlayed=False unless IncludeWatchedContent is enabled
      const playedFilter = CONFIG.includeWatchedContent ? '' : '&isPlayed=False';
      
      let parentalFilter = '';
      if (CONFIG.maxParentalRating) {
        parentalFilter = `&MaxOfficialRating=${CONFIG.maxParentalRating}`;
      }

      let dateFilter = '';
      if (CONFIG.maxDaysRecent) {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - CONFIG.maxDaysRecent);
        dateFilter = `&minDateLastSaved=${pastDate.toISOString()}`;
      }
      
      // Exclude seasonal content from random lists
      let excludeFilter = '';
      if (CONFIG.excludeSeasonalContent && CONFIG.seasonalSections) {
        try {
            const sections = JSON.parse(CONFIG.seasonalSections || "[]");
            let allExcludedIds = [];
            
            for (const section of sections) {
                if (section.MediaIds) {
                    const idsInThisSection = section.MediaIds.split(/[\n,]/)
                        .map((line) => {
                            const urlMatch = line.match(/\[(.*?)\]/);
                            let id = line;
                            if (urlMatch) {
                                id = line.replace(/\[.*?\]/, '').trim();
                                const guidMatch = id.match(/([0-9a-f]{32})/i);
                                if (guidMatch) { id = guidMatch[1]; } else { id = id.split('|')[0].trim(); }
                            }
                            return id.trim();
                        })
                        .filter((id) => id);
                    
                    allExcludedIds.push(...idsInThisSection);
                }
            }
            
            if (allExcludedIds.length > 0) {
                 excludeFilter = `&ExcludeItemIds=${allExcludedIds.join(',')}`;
            }
        } catch(e) {
             console.error("🎬 Media Bar:", "Error extracting seasonal IDs for exclusion:", e);
        }
      }

      const fetchItems = async (currentDateFilter) => {
        const url = `${STATE.jellyfinData.serverAddress}/Items?IncludeItemTypes=Movie,Series&Recursive=true&hasOverview=true&imageTypes=Logo,Backdrop&${sortParams}${playedFilter}${parentalFilter}${currentDateFilter}${excludeFilter}&enableUserData=true&Limit=${CONFIG.maxItems}&fields=Id,DateCreated`;
        const resp = await fetch(url, { headers: this.getAuthHeaders() });
        return resp;
      };

      let response = await fetchItems(dateFilter);

      if (!response.ok) {
        console.error("🎬 Media Bar:", 
          `Failed to fetch items: ${response.status} ${response.statusText}`
        );
        return [];
      }

      let data = await response.json();
      let items = data.Items || [];

      // Local exact DateCreated filter: minDateLastSaved pulls items that were merely modified recently (e.g. metadata updates)
      // explicitly discard them if their actual DateCreated is older than X days
      if (CONFIG.maxDaysRecent && dateFilter !== '') {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - CONFIG.maxDaysRecent);
        items = items.filter(item => {
            if (!item.DateCreated) return true;
            return new Date(item.DateCreated) >= pastDate;
        });
      }

      // Fallback: If we have a date filter but no items are returned, try again without it
      if (items.length === 0 && dateFilter !== '') {
        console.warn("🎬 Media Bar:", `No items found within the last ${CONFIG.maxDaysRecent} days. Falling back to random fetching.`);
        response = await fetchItems('');
        
        if (response.ok) {
            data = await response.json();
            items = data.Items || [];
        }
      }

      console.log("🎬 Media Bar:", `Successfully fetched ${items.length} random items from server`);

      return items.map((item) => item.Id);
    } catch (error) {
      console.error("🎬 Media Bar:", "Error fetching item IDs:", error);
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
        console.error("🎬 Media Bar:", "Session ID not found.");
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

      console.log("🎬 Media Bar:", "Play command sent successfully to session:", sessionId);
      return true;
    } catch (error) {
      console.error("🎬 Media Bar:", "Error sending play command:", error);
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
        console.warn("🎬 Media Bar:", 
          "No sessions found for deviceId:",
          STATE.jellyfinData.deviceId
        );
        return null;
      }

      return sessions[0].Id;
    } catch (error) {
      console.error("🎬 Media Bar:", "Error fetching session data:", error);
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
      console.error("🎬 Media Bar:", "Error toggling favorite:", error);
    }
  },

  /**
   * Fetches SponsorBlock segments for a YouTube video
   * @param {string} videoId - YouTube Video ID
   * @returns {Promise<Object>} Object containing intro and outro segments
   */
  async fetchSponsorBlockData(videoId) {
    if (!CONFIG.useSponsorBlock) return { intro: null, outro: null };

    // Return cached result if available
    if (!this._sponsorBlockCache) this._sponsorBlockCache = {};
    if (this._sponsorBlockCache[videoId]) {
      return this._sponsorBlockCache[videoId];
    }

    try {
      const response = await fetch(`https://sponsor.ajay.app/api/skipSegments?videoID=${videoId}&categories=["intro","outro"]`);
      if (!response.ok) {
        const result = { intro: null, outro: null };
        this._sponsorBlockCache[videoId] = result;
        return result;
      }

      const segments = await response.json();
      let intro = null;
      let outro = null;

      segments.forEach(segment => {
        if (segment.category === "intro" && Array.isArray(segment.segment)) {
          intro = segment.segment;
        } else if (segment.category === "outro" && Array.isArray(segment.segment)) {
          outro = segment.segment;
        }
      });

      const result = { intro, outro };
      this._sponsorBlockCache[videoId] = result;
      return result;
    } catch (error) {
      console.warn("🎬 Media Bar:", 'Error fetching SponsorBlock data:', error);
      return { intro: null, outro: null };
    }
  },

  /**
   * Searches for a Collection or Playlist by name
   * @param {string} name - Name to search for
   * @returns {Promise<string|null>} ID of the first match or null
   */
  async findCollectionOrPlaylistByName(name) {
    try {
      const response = await fetch(
        `${STATE.jellyfinData.serverAddress}/Items?IncludeItemTypes=BoxSet,Playlist&Recursive=true&searchTerm=${encodeURIComponent(name)}&Limit=1&fields=Id&userId=${STATE.jellyfinData.userId}`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        console.warn("🎬 Media Bar:", `Failed to search for '${name}'`);
        return null;
      }

      const data = await response.json();
      if (data.Items && data.Items.length > 0) {
        return data.Items[0].Id;
      }
      return null;
    } catch (error) {
      console.error("🎬 Media Bar:", `Error searching for '${name}':`, error);
      return null;
    }
  },

  /**
   * Fetches items belonging to a collection (BoxSet)
   * @param {string} collectionId - ID of the collection
   * @returns {Promise<Array>} Array of item IDs
   */
  async fetchCollectionItems(collectionId) {
    try {
      const response = await fetch(
        `${STATE.jellyfinData.serverAddress}/Items?ParentId=${collectionId}&Recursive=true&IncludeItemTypes=Movie,Series&fields=Id,Type&userId=${STATE.jellyfinData.userId}`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        console.warn("🎬 Media Bar:", `Failed to fetch collection items for ${collectionId}`);
        return [];
      }

      const data = await response.json();
      const items = data.Items || [];
      console.log("🎬 Media Bar:", `Resolved collection ${collectionId} to ${items.length} items`);
      return items.map(i => ({ Id: i.Id, Type: i.Type }));
    } catch (error) {
      console.error("🎬 Media Bar:", `Error fetching collection items for ${collectionId}:`, error);
      return [];
    }
  },

  /**
   * Fetches the first local trailer for an item
   * @param {string} itemId - Item ID
   * @returns {Promise<Object|null>} Trailer data object {id, url} or null
   */
  async fetchLocalTrailer(itemId) {
    try {
      const response = await fetch(
        `${STATE.jellyfinData.serverAddress}/Users/${STATE.jellyfinData.userId}/Items/${itemId}/LocalTrailers`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        return null;
      }

        const trailers = await response.json();
        if (trailers && trailers.length > 0) {
            
            let trailer;
            if (CONFIG.randomizeLocalTrailers && trailers.length > 1) {
                const randomIndex = Math.floor(Math.random() * trailers.length);
                trailer = trailers[randomIndex];
                 console.log("🎬 Media Bar:", `Using random local trailer (${randomIndex + 1}/${trailers.length}) for ${itemId}: ${trailer.Name}`);
            } else {
                trailer = trailers[0];
            }

            const mediaSourceId = trailer.MediaSources && trailer.MediaSources[0] ? trailer.MediaSources[0].Id : trailer.Id;

            return {
                id: trailer.Id,
                url: `${STATE.jellyfinData.serverAddress}/Videos/${trailer.Id}/stream.mp4?mediaSourceId=${mediaSourceId}&api_key=${STATE.jellyfinData.accessToken}&static=true`
            };
        }
        return null;
    } catch (error) {
      console.error("🎬 Media Bar:", `Error fetching local trailer for ${itemId}:`, error);
      return null;
    }
  },

  /**
   * Fetches theme videos for an item
   * @param {string} itemId - Item ID
   * @returns {Promise<Object|null>} Theme video data object {id, url} or null
   */
  async fetchThemeVideos(itemId) {
    try {
      const response = await fetch(
          `${STATE.jellyfinData.serverAddress}/Items/${itemId}/ThemeVideos?userId=${STATE.jellyfinData.userId}`, 
          { headers: this.getAuthHeaders() }
      );
      
      if (response.ok) {
           const data = await response.json();
           const items = Array.isArray(data) ? data : (data.Items || []);
           
           if (items.length > 0) {
               let video;
               if (CONFIG.randomizeThemeVideos && items.length > 1) {
                   const randomIndex = Math.floor(Math.random() * items.length);
                   video = items[randomIndex];
                   console.log("🎬 Media Bar:", `Found Theme Video (Random ${randomIndex + 1}/${items.length}) via ThemeVideos endpoint: ${video.Name} (${video.Id})`);
               } else {
                   video = items[0];
                   console.log("🎬 Media Bar:", `Found Theme Video (First) via ThemeVideos endpoint: ${video.Name} (${video.Id})`);
               }

               return {
                   id: video.Id,
                   url: `${STATE.jellyfinData.serverAddress}/Videos/${video.Id}/stream.mp4?api_key=${STATE.jellyfinData.accessToken}&static=true`
               };
           }
      }
      return null;
    } catch (error) {
      console.error("🎬 Media Bar:", `Error fetching theme videos for ${itemId}:`, error);
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
    const videoPlayer = document.querySelector('.videoPlayerContainer');
    const trailerPlayer = document.querySelector('.youtubePlayerContainer');
    
    // If a full screen video player is active, hide slideshow and stop playback
    if ((videoPlayer && !videoPlayer.classList.contains('hide')) || (trailerPlayer && !trailerPlayer.classList.contains('hide'))) {
        const container = document.getElementById("slides-container");
        if (container) {
            container.style.display = "none";
            container.style.visibility = "hidden";
            container.style.pointerEvents = "none";
        }
        if (STATE.slideshow.slideInterval) {
            STATE.slideshow.slideInterval.stop();
        }
        SlideshowManager.stopAllPlayback();
        return;
    }

    const activeTab = document.querySelector(".emby-tab-button-active");
    const container = document.getElementById("slides-container");

    if (!container) return;

    const isVisible =
      (window.location.hash === "#/home.html" ||
        window.location.hash === "#/home") &&
      activeTab &&
      activeTab.getAttribute("data-index") === "0";

    container.style.display = isVisible ? "block" : "none";
    container.style.visibility = isVisible ? "visible" : "hidden";
    container.style.pointerEvents = isVisible ? "auto" : "none";

    if (isVisible) {
      if (STATE.slideshow.slideInterval && !STATE.slideshow.isPaused) {
        STATE.slideshow.slideInterval.start();
        SlideshowManager.resumeActivePlayback();
      }
    } else {
      if (STATE.slideshow.slideInterval) {
        STATE.slideshow.slideInterval.stop();
      }
      SlideshowManager.stopAllPlayback();
    }
  },

  /**
   * Initializes visibility observer
   */
  init() {
    const observer = new MutationObserver(() => this.updateVisibility());
    observer.observe(document.body, { childList: true, subtree: true });

    document.body.addEventListener("click", () => this.updateVisibility());
    window.addEventListener("hashchange", () => this.updateVisibility());

    this.updateVisibility();
  },
};

/**
 * Slideshow UI creation and management
 */
const SlideCreator = {
  /**
   * Builds a tag-based image URL for cache-friendly image requests
   * @param {Object} item - Item data containing ImageTags
   * @param {string} imageType - Image type (Backdrop, Logo, Primary, etc.)
   * @param {number} [index] - Image index (for Backdrop, Primary, etc.)
   * @param {string} serverAddress - Server address
   * @param {number} [quality] - Image quality (0-100). If tag is available, both tag and quality are used.
   * @returns {string} Image URL with tag parameter (and quality if tag available), or quality-only fallback
   */
  buildImageUrl(item, imageType, index, serverAddress, quality) {
    const itemId = item.Id;
    let tag = null;

    // Handle Backdrop images
    if (imageType === "Backdrop") {
      // Check BackdropImageTags array first
      if (item.BackdropImageTags && Array.isArray(item.BackdropImageTags) && item.BackdropImageTags.length > 0) {
        const backdropIndex = index !== undefined ? index : 0;
        if (backdropIndex < item.BackdropImageTags.length) {
          tag = item.BackdropImageTags[backdropIndex];
        }
      }
      // Fallback to ImageTags.Backdrop if BackdropImageTags not available
      if (!tag && item.ImageTags && item.ImageTags.Backdrop) {
        tag = item.ImageTags.Backdrop;
      }
    } else {
      // For other image types (Logo, Primary, etc.), use ImageTags
      if (item.ImageTags && item.ImageTags[imageType]) {
        tag = item.ImageTags[imageType];
      }
    }

    // Build base URL path
    let baseUrl;
    if (index !== undefined) {
      baseUrl = `${serverAddress}/Items/${itemId}/Images/${imageType}/${index}`;
    } else {
      baseUrl = `${serverAddress}/Items/${itemId}/Images/${imageType}`;
    }

    // Build URL with tag and quality if tag is available, otherwise quality-only fallback
    if (tag) {
      // Use both tag and quality for cacheable, quality-controlled images
      const qualityParam = quality !== undefined ? `&quality=${quality}` : '';
      return `${baseUrl}?tag=${tag}${qualityParam}`;
    } else {
      // Fallback to quality-only URL if no tag is available
      const qualityParam = quality !== undefined ? quality : 90;
      return `${baseUrl}?quality=${qualityParam}`;
    }
  },

  /**
   * Creates a slide element for an item
   * @param {Object} item - Item data
   * @param {string} title - Title type (Movie/TV Show)
   * @returns {HTMLElement} Slide element
   */
  createSlideElement(item, title) {
    if (!item || !item.Id) {
      console.error("🎬 Media Bar:", "Invalid item data:", item);
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

    let videoBackdrop;
    let backdrop;
    let isVideo = false;
    let trailerUrl = null;

    // 1. Check for Remote/Local Trailers
    // Priority: Custom Config URL > (PreferLocal -> Local) > Metadata RemoteTrailer

    // 1a. Custom URL override
    if (STATE.slideshow.customTrailerUrls && STATE.slideshow.customTrailerUrls[itemId]) {
      const customValue = STATE.slideshow.customTrailerUrls[itemId];
      
      // Check if the custom value is a Jellyfin Item ID (GUID)
      const guidMatch = customValue.match(/^([0-9a-f]{32})$/i);
      
      if (guidMatch) {
          const videoId = guidMatch[1];
          console.log("🎬 Media Bar:", `Using custom local video ID for ${itemId}: ${videoId}`);
          
          trailerUrl = {
              id: videoId,
              url: `${STATE.jellyfinData.serverAddress}/Videos/${videoId}/stream.mp4?api_key=${STATE.jellyfinData.accessToken}&static=true`
          };
      } else {
          // Assume it's a standard URL (YouTube, etc.)
          trailerUrl = customValue;
          console.log("🎬 Media Bar:", `Using custom trailer URL for ${itemId}: ${trailerUrl}`);
      }
    }
    // 1b. Check Theme Video if preferred (Local Backdrop)
    else if (CONFIG.preferLocalBackdrops && item.themeVideoUrl) {
        trailerUrl = item.themeVideoUrl;
        console.log("🎬 Media Bar:", `Using theme video (local backdrop) for ${itemId}: ${trailerUrl.url || trailerUrl}`);
    } 
    // 1c. Check Local Trailer if preferred
    else if (CONFIG.preferLocalTrailers && item.LocalTrailerCount > 0 && item.localTrailerUrl) {
         trailerUrl = item.localTrailerUrl;
         console.log("🎬 Media Bar:", `Using local trailer for ${itemId}: ${trailerUrl}`);
    }
    // 1d. Fallback to Remote Trailer
    else if (item.RemoteTrailers && item.RemoteTrailers.length > 0) {
      trailerUrl = item.RemoteTrailers[0].Url;
    }
    // 1e. Final Fallback to Local Trailer (even if not preferred)
    else if (item.LocalTrailerCount > 0 && item.localTrailerUrl) {
         trailerUrl = item.localTrailerUrl;
         console.log("🎬 Media Bar:", `Using local trailer fallback for ${itemId}: ${trailerUrl}`);
    }

    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Client Setting Overrides
    const enableVideo = MediaBarEnhancedSettingsManager.getSetting('videoBackdrops', CONFIG.enableVideoBackdrop);
    const enableMobileVideo = MediaBarEnhancedSettingsManager.getSetting('mobileVideo', CONFIG.enableMobileVideo);
    
    const shouldPlayVideo = enableVideo && (!isMobile || enableMobileVideo);

    if (trailerUrl && shouldPlayVideo) {
      STATE.slideshow.hasTrailer = STATE.slideshow.hasTrailer || {};
      STATE.slideshow.hasTrailer[itemId] = true;
      let isYoutube = false;
      let videoId = null;

      try {
        let urlToCheck = trailerUrl;
        if (typeof trailerUrl === 'object' && trailerUrl.url) {
            urlToCheck = trailerUrl.url;
        }

        const urlObjChecked = new URL(urlToCheck);
        if (urlObjChecked.hostname.includes('youtube.com') || urlObjChecked.hostname.includes('youtu.be')) {
          isYoutube = true;
          videoId = urlObjChecked.searchParams.get('v');
          if (!videoId && urlObjChecked.hostname.includes('youtu.be')) {
            videoId = urlObjChecked.pathname.substring(1);
          }
        }
      } catch (e) {
        console.warn("🎬 Media Bar:", "Invalid trailer URL:", trailerUrl);
      }

      const isLowPower = isLowPowerDevice();
      const isIOSApp = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      const limitVideos = isLowPower || isIOSApp;
      const itemIndex = STATE.slideshow.itemIds ? STATE.slideshow.itemIds.indexOf(itemId) : -1;
      const isActiveSlide = itemIndex !== -1 && itemIndex === STATE.slideshow.currentSlideIndex;
      // Limit YouTube iframe bulk creation on low power devices OR iOS (which kills the WebProcess on OOM)
      const shouldCreateVideo = !limitVideos || isActiveSlide;

      if (isYoutube && videoId && shouldCreateVideo) {
        isVideo = true;
        // Create container for YouTube API
        const videoClass = CONFIG.fullWidthVideo ? "video-backdrop-full" : "video-backdrop-default";

        // Create a wrapper for opacity transition
        videoBackdrop = SlideUtils.createElement("div", {
            className: `backdrop video-backdrop ${videoClass}`,
            style: "opacity: 0; transition: opacity 1.2s ease-in-out;" // Start interrupted/transparent
        });

        // Create an iframe upfront
        const ytPlayerIframe = SlideUtils.createElement("iframe", {
          id: `youtube-player-${itemId}`,
          src: `https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&playsinline=1&origin=${encodeURIComponent(window.location.origin)}`,
          style: "width: 100%; height: 100%; border: none; pointer-events: none;",
          allow: "autoplay; encrypted-media",
          referrerpolicy: "strict-origin-when-cross-origin",
          allowfullscreen: "true"
        });
        
        videoBackdrop.appendChild(ytPlayerIframe);

        // Initialize YouTube Player
        SlideUtils.loadYouTubeIframeAPI().then(() => {
          // Fetch SponsorBlock data
          ApiUtils.fetchSponsorBlockData(videoId).then(segments => {
            const playerVars = {
              autoplay: 0,
              mute: STATE.slideshow.isMuted ? 1 : 0,
              controls: 0,
              disablekb: 1,
              fs: 0,
              iv_load_policy: 3,
              rel: 0,
              loop: 0,
              playsinline: 1,
              origin: window.location.origin,
              enablejsapi: 1
            };

            // Determine video quality
            let quality = 'hd1080';
            if (CONFIG.preferredVideoQuality === 'Maximum') {
              quality = 'highres';
            } else if (CONFIG.preferredVideoQuality === '720p') {
              quality = 'hd720';
            } else if (CONFIG.preferredVideoQuality === '1080p') {
              quality = 'hd1080';
            } else { // Auto or fallback
              // If screen is wider than 1920, prefer highres, otherwise 1080p
              quality = window.screen.width > 1920 ? 'highres' : 'hd1080';
            }

            playerVars.suggestedQuality = quality;

            // Apply SponsorBlock start/end times
            if (segments.intro) {
              playerVars.start = Math.ceil(segments.intro[1]);
              console.info("🎬 Media Bar:", `SponsorBlock intro detected for video ${videoId}: skipping to ${playerVars.start}s`);
            }
            if (segments.outro) {
              playerVars.end = Math.floor(segments.outro[0]);
              console.info("🎬 Media Bar:", `SponsorBlock outro detected for video ${videoId}: ending at ${playerVars.end}s`);
            }

            STATE.slideshow.videoPlayers[itemId] = new YT.Player(ytPlayerIframe, {
              playerVars: playerVars,
              events: {
                'onReady': (event) => {
                  // Store start/end time and videoId for later use
                  event.target._startTime = playerVars.start || 0;
                  event.target._endTime = playerVars.end || undefined;
                  event.target._videoId = videoId;
                  
                  // Store reference to wrapper for fading
                  event.target._wrapperDiv = videoBackdrop;

                  if (STATE.slideshow.isMuted) {
                    event.target.mute();
                  } else {
                    event.target.unMute();
                    event.target.setVolume(40);
                  }

                  if (typeof event.target.setPlaybackQuality === 'function') {
                    event.target.setPlaybackQuality(quality);
                  }

                  // Only play if this is the active slide and the play signal has been issued (delay finished)
                  const slide = document.querySelector(`.slide[data-item-id="${itemId}"]`);
                  const isVideoPlayerOpen = document.querySelector('.videoPlayerContainer') || document.querySelector('.youtubePlayerContainer');

                  if (slide && slide.classList.contains('active') && STATE.slideshow.playSignals[itemId] === true && !document.hidden && (!isVideoPlayerOpen || isVideoPlayerOpen.classList.contains('hide'))) {
                    event.target.playVideo();
                    
                    // Check if it actually started playing after a short delay (handling autoplay blocks)
                    const timeoutId = setTimeout(() => {
                      // Re-check conditions before processing fallback
                      const isVideoPlayerOpenNow = document.querySelector('.videoPlayerContainer') || document.querySelector('.youtubePlayerContainer');
                      if (document.hidden || (isVideoPlayerOpenNow && !isVideoPlayerOpenNow.classList.contains('hide')) || !slide.classList.contains('active')) {
                          console.log("🎬 Media Bar:", `Navigation detected during autoplay check for ${itemId}, stopping video.`);
                          try {
                            event.target.stopVideo();
                          } catch (e) { console.warn("🎬 Media Bar:", "Error stopping video in timeout:", e); }
                          return;
                      }

                      if (event.target.getPlayerState() !== YT.PlayerState.PLAYING &&
                        event.target.getPlayerState() !== YT.PlayerState.BUFFERING) {
                        console.warn("🎬 Media Bar:", `Autoplay blocked for ${itemId}, attempting muted fallback`);
                        event.target.mute();
                        event.target.playVideo();
                      }
                    }, 1000);

                    if (!STATE.slideshow.autoplayTimeouts) STATE.slideshow.autoplayTimeouts = [];
                    STATE.slideshow.autoplayTimeouts.push(timeoutId);

                    // Pause slideshow timer when video starts if configured
                    if (CONFIG.waitForTrailerToEnd && STATE.slideshow.slideInterval) {
                      STATE.slideshow.slideInterval.stop();
                    }
                  }
                },
                'onStateChange': (event) => {
                  if (event.data === YT.PlayerState.PLAYING) {
                      const slide = document.querySelector(`.slide[data-item-id="${itemId}"]`);
                      if (slide && STATE.slideshow.playSignals[itemId] === false) {
                          event.target.pauseVideo();
                          return;
                      }
                      
                      // Fade in when legitimately playing
                      if (event.target._wrapperDiv) {
                          event.target._wrapperDiv.style.opacity = "1";
                      }
                  }
                  
                  if (event.data === YT.PlayerState.ENDED) {
                    const slide = document.querySelector(`.slide[data-item-id="${itemId}"]`);
                    if (slide && slide.classList.contains('active')) {
                      SlideshowManager.nextSlide();
                    }
                  }
                },
                'onError': (event) => {
                  console.warn("🎬 Media Bar:", `YouTube player error ${event.data} for video ${videoId}`);
                  // Fallback to next slide on error
                  if (CONFIG.waitForTrailerToEnd) {
                    SlideshowManager.nextSlide();
                  }
                }
              }
            });
          });
        });

        // 2. Check for local video trailers in MediaSources if yt is not available
      } else if (!isYoutube && shouldCreateVideo) {
        isVideo = true;

        const videoSrc = (typeof trailerUrl === 'object' ? trailerUrl.url : trailerUrl);
        const videoAttributes = {
          className: "backdrop video-backdrop",
          preload: "none",
          disablePictureInPicture: true,
          "data-src": videoSrc,
          style: "object-fit: cover; object-position: center center; width: 100%; height: 100%; position: absolute; top: 0; left: 0; pointer-events: none; opacity: 0; transition: opacity 1.2s ease-in-out;"
        };

        videoAttributes.muted = "";
        videoAttributes.playsinline = "";

        videoBackdrop = SlideUtils.createElement("video", videoAttributes);
        videoBackdrop.volume = 0.4;

        STATE.slideshow.videoPlayers[itemId] = videoBackdrop;

        videoBackdrop.addEventListener('play', (event) => {
          const slide = document.querySelector(`.slide[data-item-id="${itemId}"]`);
          if (!slide || !slide.classList.contains('active')) {
            console.log("🎬 Media Bar:", `Local video ${itemId} started playing but slide is not active, pausing.`);
            event.target.pause();
            event.target.currentTime = 0;
            return;
          }
          
          if (STATE.slideshow.playSignals[itemId] === false) {
            event.target.pause();
            return;
          }
          
          // Fade in
          event.target.style.opacity = "1";
          
          if (CONFIG.waitForTrailerToEnd && STATE.slideshow.slideInterval) {
            STATE.slideshow.slideInterval.stop();
          }
        });

        videoBackdrop.addEventListener('ended', (event) => {
            const slide = event.target.closest('.slide');
            if (slide && slide.classList.contains('active')) {
              SlideshowManager.nextSlide();
            }
        });

        videoBackdrop.addEventListener('error', (event) => {
          console.warn("🎬 Media Bar:", `Local video error for item ${itemId}`);
          const slide = event.target.closest('.slide');
          if (slide && slide.classList.contains('active')) {
            SlideshowManager.nextSlide();
          }
        });
      }
    }

    // Always create a static backdrop image (to show while video loads or if no video)
    backdrop = SlideUtils.createElement("img", {
      className: "backdrop high-quality",
      src: this.buildImageUrl(item, "Backdrop", 0, serverAddress, 60),
      alt: LocalizationUtils.getLocalizedString('Backdrop', 'Backdrop'),
      loading: "eager",
    });

    // If video, static backdrop should be strictly a background (no animation)
    if (isVideo) {
        backdrop.style.animation = "none";
        backdrop.style.transition = "none";
    }

    const backdropOverlay = SlideUtils.createElement("div", {
      className: "backdrop-overlay",
    });

    const backdropContainer = SlideUtils.createElement("div", {
      className: "backdrop-container" + (isVideo && CONFIG.fullWidthVideo ? " full-width-video" : ""),
    });
    
    backdropContainer.append(backdrop, backdropOverlay);

    // If video exists, append on top of static backdrop
    if (isVideo && videoBackdrop) {
        backdropContainer.appendChild(videoBackdrop);
    }

    const logo = SlideUtils.createElement("img", {
      className: "logo high-quality",
      src: this.buildImageUrl(item, "Logo", undefined, serverAddress, 40),
      alt: item.Name,
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
      className: "plot-container" + (CONFIG.constrainPlotWidth ? " constrained-plot" : ""),
    });
    plotContainer.appendChild(plotElement);

    const gradientOverlay = SlideUtils.createElement("div", {
      className: "gradient-overlay" + (isVideo && CONFIG.fullWidthVideo ? " full-width-video" : ""),
    });

    const infoContainer = SlideUtils.createElement("div", {
      className: "info-container",
    });

    const ratingInfo = this.createRatingInfo(item);
    infoContainer.appendChild(ratingInfo);

    const genreElement = SlideUtils.createElement("div", {
      className: "genre",
      innerHTML: SlideUtils.parseGenres(item.Genres)
    });

    const buttonContainer = SlideUtils.createElement("div", {
      className: "button-container",
    });

    const playButton = this.createPlayButton(itemId);
    const detailButton = this.createDetailButton(itemId);
    const favoriteButton = this.createFavoriteButton(item);

    if (trailerUrl && !isVideo && CONFIG.showTrailerButton) {
      const trailerButton = this.createTrailerButton(trailerUrl);
      buttonContainer.append(detailButton, playButton, trailerButton, favoriteButton);
    } else {
      buttonContainer.append(detailButton, playButton, favoriteButton);
    }

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
      CommunityRating: communityRating,
      CriticRating: criticRating,
      OfficialRating: ageRating,
      PremiereDate: premiereDate,
      RunTimeTicks: runtime,
      ChildCount: seasonCount,
    } = item;

    const miscInfo = SlideUtils.createElement("div", {
      className: "misc-info",
    });

    // Community Rating Section (IMDb)
    if (typeof communityRating === "number") {
      const container = SlideUtils.createElement("div", {
        className: "star-rating-container",
        innerHTML: `<span class="material-icons community-rating-star star" aria-hidden="true"></span>${communityRating.toFixed(1)}`,
      });
      miscInfo.appendChild(container);
      miscInfo.appendChild(SlideUtils.createSeparator());
    }

    // Critic Rating Section (Rotten Tomatoes)
    if (typeof criticRating === "number") {
      const svgIcon = criticRating < 60 ? CONFIG.IMAGE_SVG.rottenTomato : CONFIG.IMAGE_SVG.freshTomato;
      const container = SlideUtils.createElement("div", {
        className: "critic-rating",
        innerHTML: `${svgIcon}${criticRating.toFixed(0)}%`,
      })
      miscInfo.appendChild(container);
      miscInfo.appendChild(SlideUtils.createSeparator());
    };

    // Year Section
    if (typeof premiereDate === "string" && !isNaN(new Date(premiereDate))) {
      const container = SlideUtils.createElement("div", {
        className: "date",
        innerHTML: new Date(premiereDate).getFullYear(),
      });
      miscInfo.appendChild(container);
      miscInfo.appendChild(SlideUtils.createSeparator());
    };

    // Age Rating Section
    if (typeof ageRating === "string") {
      const container = SlideUtils.createElement("div", {
        className: "age-rating mediaInfoOfficialRating",
        rating: ageRating,
        ariaLabel: `Content rated ${ageRating}`,
        title: `Rating: ${ageRating}`,
        innerHTML: ageRating,
      });
      miscInfo.appendChild(container);
      miscInfo.appendChild(SlideUtils.createSeparator());
    };

    // Runtime / Seasons Section
    if (seasonCount !== undefined || runtime !== undefined) {
      const container = SlideUtils.createElement("div", {
        className: "runTime",
      });
      if (seasonCount) {
        const seasonText = seasonCount <= 1 ? LocalizationUtils.getLocalizedString('Season', 'Season') : LocalizationUtils.getLocalizedString('TypeOptionPluralSeason', 'Seasons');
        container.innerHTML = `${seasonCount} ${seasonText}`;
      } else {
        const milliseconds = runtime / 10000;
        const currentTime = new Date();
        const endTime = new Date(currentTime.getTime() + milliseconds);
        const options = { hour: "2-digit", minute: "2-digit", hour12: false };
        const formattedEndTime = endTime.toLocaleTimeString([], options);
        const endsAtText = LocalizationUtils.getLocalizedString('EndsAtValue', 'Ends at {0}', formattedEndTime);
        container.innerText = endsAtText;
      }
      miscInfo.appendChild(container);
    }

    return miscInfo;
  },

  /**
   * Creates a play button for an item
   * @param {string} itemId - Item ID
   * @returns {HTMLElement} Play button element
   */
  createPlayButton(itemId) {
    const playText = LocalizationUtils.getLocalizedString('Play', 'Play');
    return SlideUtils.createElement("button", {
      className: "detailButton btnPlay play-button",
      innerHTML: `
      <span class="play-text">${playText}</span>
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
   * Creates a trailer button
   * @param {string|Object} trailerInfo - Trailer URL string or object {id, url}
   * @returns {HTMLElement} Trailer button element
   */
  createTrailerButton(trailerInfo) {
    const trailerText = LocalizationUtils.getLocalizedString('Trailer', 'Trailer');
    
    let url = trailerInfo;
    let localTrailerId = null;

    if (typeof trailerInfo === 'object' && trailerInfo !== null) {
        url = trailerInfo.url;
        localTrailerId = trailerInfo.id;
    }

    return SlideUtils.createElement("button", {
      className: "detailButton trailer-button",
      innerHTML: `<span class="material-icons">movie</span> <span class="trailer-text">${trailerText}</span>`,
      tabIndex: "0",
      onclick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (localTrailerId) {
            // Play local trailer using native player
            ApiUtils.playItem(localTrailerId);
        } else {
            SlideUtils.openVideoModal(url);
        }
      },
    });
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
   * @param {boolean} forceRecreate - Force recreation of the slide
   * @returns {Promise<HTMLElement>} Created slide element
   */
  async createSlideForItemId(itemId, forceRecreate = false) {
    try {
      if (!forceRecreate && STATE.slideshow.createdSlides[itemId]) {
        return document.querySelector(`.slide[data-item-id="${itemId}"]`);
      }

      const container = SlideUtils.getOrCreateSlidesContainer();

      const item = await ApiUtils.fetchItemDetails(itemId);

      // Pre-fetch local trailer URL if needed
      if (CONFIG.preferLocalTrailers && item.LocalTrailerCount > 0) {
          item.localTrailerUrl = await ApiUtils.fetchLocalTrailer(itemId);
      }

      // Pre-fetch theme video URL if needed
      if (CONFIG.preferLocalBackdrops) {
          item.themeVideoUrl = await ApiUtils.fetchThemeVideos(itemId);
      }

      const slideElement = this.createSlideElement(
        item,
        item.Type === "Movie" ? "Movie" : "TV Show"
      );

      container.appendChild(slideElement);

      STATE.slideshow.createdSlides[itemId] = true;

      return slideElement;
    } catch (error) {
      console.error("🎬 Media Bar:", "Error creating slide for item:", error, itemId);
      return null;
    }
  },
};

/**
 * Manages slideshow functionality
 */
const SlideshowManager = {

  createPaginationDots() {
    if (!CONFIG.showPaginationDots) return;

    let dotsContainer = document.querySelector(".dots-container");
    if (!dotsContainer) {
      dotsContainer = document.createElement("div");
      dotsContainer.className = "dots-container";
      document.getElementById("slides-container").appendChild(dotsContainer);
    }

    const totalItems = STATE.slideshow.totalItems || 0;

    // dynamically lower the max dots threshold on small screens 
    let effectiveMaxDots = CONFIG.maxPaginationDots;
    if (window.matchMedia("(max-width: 767px) and (orientation: portrait)").matches) {
      const availableWidth = window.innerWidth * 0.9;
      const dotWidth = 18; // approximate width per dot
      const fittingDots = Math.floor(availableWidth / dotWidth) - 1;
      effectiveMaxDots = Math.min(effectiveMaxDots, fittingDots);
    }

    // Switch to counter style if too many items
    if (totalItems > effectiveMaxDots) {
      const counter = document.createElement("span");
      counter.className = "slide-counter";
      counter.id = "slide-counter";
      dotsContainer.appendChild(counter);
    } else {
      // Create dots for all items
      for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement("span");
        dot.className = "dot";
        dot.setAttribute("data-index", i);
        dotsContainer.appendChild(dot);
      }
    }

    this.updateDots();
  },

  /**
   * Updates active dot based on current slide
   * Maps current slide to one of the 5 dots
   */
  updateDots() {
    const currentIndex = STATE.slideshow.currentSlideIndex;
    const totalItems = STATE.slideshow.totalItems || 0;

    // Handle Large List Counter
    const counter = document.getElementById("slide-counter");
    if (counter) {
      counter.textContent = `${currentIndex + 1} / ${totalItems}`;
      return;
    }

    // Handle Dots
    const container = SlideUtils.getOrCreateSlidesContainer();
    const dots = container.querySelectorAll(".dot");

    // Fallback if dots exist but totalItems matched counter mode
    if (dots.length === 0) return;

    dots.forEach((dot, index) => {
      if (index === currentIndex) {
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

    if (STATE.slideshow.backdropVideoTimeout) {
      clearTimeout(STATE.slideshow.backdropVideoTimeout);
      STATE.slideshow.backdropVideoTimeout = null;
    }

    let previousVisibleSlide;
    try {
      const container = SlideUtils.getOrCreateSlidesContainer();
      const totalItems = STATE.slideshow.totalItems;

      index = Math.max(0, Math.min(index, totalItems - 1));
      const currentItemId = STATE.slideshow.itemIds[index];
      
      STATE.slideshow.currentSlideIndex = index;

      let currentSlide = document.querySelector(
        `.slide[data-item-id="${currentItemId}"]`
      );

      const isLowPower = isLowPowerDevice();
      const isIOSApp = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      const limitVideos = isLowPower || isIOSApp;
      
      // JIT recreating video to bypass OOM limitations on low-end devices
      if (limitVideos && currentSlide && STATE.slideshow.hasTrailer && STATE.slideshow.hasTrailer[currentItemId] === true) {
        const hasVideo = currentSlide.querySelector('.video-backdrop');
        if (!hasVideo) {
          console.log("🎬 Media Bar:", "JIT recreating slide to embed video on constrained device");
          const newSlide = await SlideCreator.createSlideForItemId(currentItemId, true);
          currentSlide.replaceWith(newSlide);
          currentSlide = newSlide;
          this.upgradeSlideImageQuality(currentSlide);
        }
      }
      
      if (!currentSlide) {
        currentSlide = await SlideCreator.createSlideForItemId(currentItemId);
        this.upgradeSlideImageQuality(currentSlide);

        if (!currentSlide) {
          console.error("🎬 Media Bar:", `Failed to create slide for item ${currentItemId}`);
          STATE.slideshow.isTransitioning = false;
          setTimeout(() => this.nextSlide(), 500);
          return;
        }
      }

      previousVisibleSlide = container.querySelector(".slide.active");

      if (previousVisibleSlide) {
        previousVisibleSlide.classList.remove("active");

        // Prune old video to save memory on low-end devices
        if (limitVideos) {
           const prevItemId = previousVisibleSlide.dataset.itemId;
           if (prevItemId && STATE.slideshow.hasTrailer && STATE.slideshow.hasTrailer[prevItemId] === true) {
               const oldVideo = previousVisibleSlide.querySelector('.video-backdrop');
               if (oldVideo) {
                   oldVideo.remove();
                   console.log("🎬 Media Bar:", "Pruned hidden slide video to save RAM");
                   if (STATE.slideshow.videoPlayers && STATE.slideshow.videoPlayers[prevItemId]) {
                       delete STATE.slideshow.videoPlayers[prevItemId];
                   }
               }
           }
        }
      }

      void currentSlide.offsetWidth;
      currentSlide.classList.add("active");
      STATE.slideshow.playSignals[currentItemId] = false;

      // Manage Video Playback: Stop others, Play current
      // 1. Stop all other YouTube players and local video elements, release connections
      setTimeout(() => {
        if (STATE.slideshow.videoPlayers) {
          Object.keys(STATE.slideshow.videoPlayers).forEach(id => {
            if (id !== currentItemId) {
              const p = STATE.slideshow.videoPlayers[id];
              if (!p) return;
              // YouTube player
              if (typeof p.pauseVideo === 'function') {
                p.pauseVideo();
              }
              // HTML5 <video> element (local trailers), release HTTP connection
              if (p instanceof HTMLVideoElement) {
                p.pause();
                p.muted = true;
                p.currentTime = 0;
                // Save src to data-src and release the HTTP streaming connection
                if (p.src && !p.getAttribute('data-src')) {
                  p.setAttribute('data-src', p.src);
                }
                p.removeAttribute('src');
                p.load();
              }
            }
          });
        }
      }, CONFIG.fadeTransitionDuration);

      // 2. Pause all other HTML5 videos e.g. local trailers
      document.querySelectorAll('video').forEach(video => {
        if (!video.closest(`.slide[data-item-id="${currentItemId}"]`)) {
          video.pause();
        }
      });

      // 3. Play and Reset current video
      const videoBackdrop = currentSlide.querySelector('.video-backdrop');
      
      // Hide video to prevent flash of paused iframe when revisiting slides
      if (videoBackdrop) {
          videoBackdrop.style.transition = "none";
          videoBackdrop.style.opacity = "0";
          // Force layout reflow to apply the instant opacity jump
          void videoBackdrop.offsetWidth;
          videoBackdrop.style.transition = "opacity 1.2s ease-in-out";
      }

      // Auto-unpause when a video slide becomes active
      if (videoBackdrop && STATE.slideshow.isPaused) {
          STATE.slideshow.isPaused = false;
          const pauseButton = document.querySelector('.pause-button');
          if (pauseButton) {
              pauseButton.innerHTML = '<i class="material-icons">pause</i>';
              const pauseLabel = LocalizationUtils.getLocalizedString('ButtonPause', 'Pause');
              pauseButton.setAttribute("aria-label", pauseLabel);
              pauseButton.setAttribute("title", pauseLabel);
          }
      }

      // Update mute button visibility
      const muteButton = document.querySelector('.mute-button');
      if (muteButton) {
        const hasVideo = !!videoBackdrop;
        muteButton.style.display = hasVideo ? 'block' : 'none';
      }

      if (videoBackdrop) {
        // preload logic
        if (videoBackdrop.tagName === 'VIDEO') {
          // Restore src from data-src if it was deactivated to release connections
          const lazySrc = videoBackdrop.getAttribute('data-src');
          if (lazySrc && !videoBackdrop.src) {
            videoBackdrop.src = lazySrc;
            videoBackdrop.load(); // Force pre-buffering
          }

          videoBackdrop.currentTime = 0;

          videoBackdrop.muted = STATE.slideshow.isMuted;
          if (!STATE.slideshow.isMuted) {
            videoBackdrop.volume = 0.4;
          }
        } else if (STATE.slideshow.videoPlayers && STATE.slideshow.videoPlayers[currentItemId]) {
          const player = STATE.slideshow.videoPlayers[currentItemId];
          if (player && typeof player.cueVideoById === 'function' && player._videoId) {
            // Use cueVideoById to buffer video without auto-playing it
            player.cueVideoById({
              videoId: player._videoId,
              startSeconds: player._startTime || 0,
              endSeconds: player._endTime
            });

            if (STATE.slideshow.isMuted) {
              player.mute();
            } else {
              player.unMute();
              player.setVolume(40);
            }
          } else if (player && typeof player.seekTo === 'function') {
            const startTime = player._startTime || 0;
            player.seekTo(startTime);
          }
        }

        // play logic
        const playVideoLogic = () => {
          if (!currentSlide.classList.contains('active')) return;
          
          STATE.slideshow.playSignals[currentItemId] = true;

          if (document.hidden) {
            console.log("🎬 Media Bar:", "Tab is hidden, deferring video playback until visible.");
            return;
          }

          if (videoBackdrop.tagName === 'VIDEO') {
            videoBackdrop.play().catch(e => {
              if (!STATE.slideshow.isMuted) {
                // Check if it actually started playing after a short delay (handling autoplay blocks)
                setTimeout(() => {
                  if (videoBackdrop.paused && currentSlide.classList.contains('active')) {
                    console.warn("🎬 Media Bar:", `Autoplay blocked for ${currentItemId}, attempting muted fallback`);
                    videoBackdrop.muted = true;
                    videoBackdrop.play().catch(err => console.error("🎬 Media Bar:", "Muted fallback failed", err));
                  }
                }, 1000);
              } else {
                console.error("🎬 Media Bar:", "Playback failed despite being muted", e);
              }
            });
          } else if (STATE.slideshow.videoPlayers && STATE.slideshow.videoPlayers[currentItemId]) {
            const player = STATE.slideshow.videoPlayers[currentItemId];
            if (player && typeof player.playVideo === 'function') {
              player.playVideo();

              if (!STATE.slideshow.isMuted) {
                // Check if playback successfully started, otherwise fallback to muted
                setTimeout(() => {
                  if (!currentSlide.classList.contains('active')) return;
                  if (player.getPlayerState &&
                    player.getPlayerState() !== YT.PlayerState.PLAYING &&
                    player.getPlayerState() !== YT.PlayerState.BUFFERING) {
                    console.log("🎬 Media Bar:", "YouTube didn't start playback, retrying muted...");
                    player.mute();
                    player.playVideo();
                  }
                }, 1000);
              }
            }
          }
        };

        if (CONFIG.backdropVideoDelay > 0) {
          STATE.slideshow.currentPlayVideoLogic = playVideoLogic;
          STATE.slideshow.backdropVideoTimeout = setTimeout(playVideoLogic, CONFIG.backdropVideoDelay);
        } else {
          playVideoLogic();
        }
      }

      const enableAnimations = MediaBarEnhancedSettingsManager.getSetting('slideAnimations', CONFIG.slideAnimationEnabled);

      if (enableAnimations) {
        const backdrop = currentSlide.querySelector(".backdrop");
        if (backdrop && !backdrop.classList.contains("video-backdrop")) {
          backdrop.classList.add("animate");
        }
        const logo = currentSlide.querySelector(".logo");
        if (logo) logo.classList.add("animate");
      }

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

      // Only restart interval if we are NOT waiting for a video to end
      const hasVideo = currentSlide.querySelector('.video-backdrop') || 
        (STATE.slideshow.videoPlayers && STATE.slideshow.videoPlayers[currentItemId]);
      if (STATE.slideshow.slideInterval && !STATE.slideshow.isPaused) {
        if (CONFIG.waitForTrailerToEnd && hasVideo) {
          STATE.slideshow.slideInterval.stop();
        } else {
          STATE.slideshow.slideInterval.restart();
        }
      }

      this.pruneSlideCache();
    } catch (error) {
      console.error("🎬 Media Bar:", "Error updating current slide:", error);
    } finally {
      setTimeout(() => {
        STATE.slideshow.isTransitioning = false;

        if (previousVisibleSlide) {
          const enableAnimations = MediaBarEnhancedSettingsManager.getSetting('slideAnimations', CONFIG.slideAnimationEnabled) && !isLowPowerDevice();
          if (enableAnimations) {
            const prevBackdrop = previousVisibleSlide.querySelector(".backdrop");
            const prevLogo = previousVisibleSlide.querySelector(".logo");
            if (prevBackdrop) prevBackdrop.classList.remove("animate");
            if (prevLogo) prevLogo.classList.remove("animate");
          }
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
    let preloadCount = Math.min(Math.max(CONFIG.preloadCount || 1, 1), 5);
    if (isLowPowerDevice()) preloadCount = 1; // Strict limit for TVs
    
    const preloadedIds = new Set();

    // Preload next slides
    for (let i = 1; i <= preloadCount; i++) {
        const nextIndex = (currentIndex + i) % totalItems;
        if (nextIndex === currentIndex) break;

        const itemId = STATE.slideshow.itemIds[nextIndex];
        if (!preloadedIds.has(itemId)) {
             preloadedIds.add(itemId);
             SlideCreator.createSlideForItemId(itemId);
        }
    }

    // Preload previous slides
    for (let i = 1; i <= preloadCount; i++) {
        const prevIndex = (currentIndex - i + totalItems) % totalItems;
        if (prevIndex === currentIndex) break;

        const prevItemId = STATE.slideshow.itemIds[prevIndex];
        if (!preloadedIds.has(prevItemId)) {
             preloadedIds.add(prevItemId);
             SlideCreator.createSlideForItemId(prevItemId);
        }
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
    const keepRange = CONFIG.preloadCount + 1;
    let prunedAny = false;

    Object.keys(STATE.slideshow.createdSlides).forEach((itemId) => {
      const index = STATE.slideshow.itemIds.indexOf(itemId);
      if (index === -1) return;

      const totalItems = STATE.slideshow.itemIds.length;
      let distance = Math.abs(index - currentIndex);
      
      // Always calculate circular distance for slideshow
      distance = Math.min(distance, totalItems - distance);

      if (distance > keepRange) {
        // Destroy video player if exists
        if (STATE.slideshow.videoPlayers[itemId]) {
          const player = STATE.slideshow.videoPlayers[itemId];
          if (typeof player.destroy === 'function') {
            // YouTube player
            player.destroy();
          } else if (player instanceof HTMLVideoElement) {
            // HTML5 video, release HTTP streaming connection
            player.pause();
            // Save src to data-src and release the HTTP streaming connection
            if (player.src && !player.getAttribute('data-src')) {
              player.setAttribute('data-src', player.src);
            }
            player.removeAttribute('src');
            player.load();
          }
          delete STATE.slideshow.videoPlayers[itemId];
        }

        delete STATE.slideshow.loadedItems[itemId];

        const slide = document.querySelector(
          `.slide[data-item-id="${itemId}"]`
        );
        if (slide) slide.remove();

        delete STATE.slideshow.createdSlides[itemId];
        prunedAny = true;

        console.log("🎬 Media Bar:", `Pruned slide ${itemId} at distance ${distance} from view`);
      }
    });

    if (prunedAny) {
      const isTvMode = (window.layoutManager && window.layoutManager.tv) ||
        document.documentElement.classList.contains('layout-tv') ||
        document.body.classList.contains('layout-tv');
      if (isTvMode) {
        setTimeout(() => {
          const container = document.getElementById("slides-container");
          if (container && container.style.display !== 'none') {
            container.focus({ preventScroll: true });
          }
        }, 0);
      }
    }
  },

  toggleMute() {
    STATE.slideshow.isMuted = !STATE.slideshow.isMuted;
    const isUnmuting = !STATE.slideshow.isMuted;
    const muteButton = document.querySelector('.mute-button');

    const updateIcon = () => {
      if (!muteButton) return;
      const isMuted = STATE.slideshow.isMuted;
      muteButton.innerHTML = `<i class="material-icons">${isMuted ? 'volume_off' : 'volume_up'}</i>`;
      const label = isMuted ? 'Unmute' : 'Mute';
      muteButton.setAttribute("aria-label", LocalizationUtils.getLocalizedString(label, label));
      muteButton.setAttribute("title", LocalizationUtils.getLocalizedString(label, label));
    };

    const currentItemId = STATE.slideshow.itemIds[STATE.slideshow.currentSlideIndex];
    const player = STATE.slideshow.videoPlayers ? STATE.slideshow.videoPlayers[currentItemId] : null;

    if (currentItemId) {
      const currentSlide = document.querySelector(`.slide[data-item-id="${currentItemId}"]`);
      const video = currentSlide ? currentSlide.querySelector('video') : null;

      if (video) {
        video.muted = STATE.slideshow.isMuted;
        if (!STATE.slideshow.isMuted) {
          video.volume = 0.4;
        }

        video.play().catch(error => {
          console.warn("🎬 Media Bar:", "Unmuted play blocked, reverting to muted...");
          STATE.slideshow.isMuted = true;
          video.muted = true;
          video.play();
          updateIcon();
        });
      }

      if (player && typeof player.playVideo === 'function') {
        if (STATE.slideshow.isMuted) {
          player.mute();
        } else {
          player.unMute();
          player.setVolume(40);
        }

        player.playVideo();
        if (isUnmuting) {
          setTimeout(() => {
            const state = player.getPlayerState();
            if (state === 2) {
              console.log("🎬 Media Bar:", "Video was paused after unmute...");
              STATE.slideshow.isMuted = true;
              player.mute();
              player.playVideo();
              updateIcon();
            }
          }, 300);
        }
      }
    }

    updateIcon();
  },

  togglePause() {
    STATE.slideshow.isPaused = !STATE.slideshow.isPaused;
    const pauseButton = document.querySelector('.pause-button');

    // Handle current video playback
    const currentItemId = STATE.slideshow.itemIds[STATE.slideshow.currentSlideIndex];
    const currentSlide = document.querySelector(`.slide[data-item-id="${currentItemId}"]`);

    if (currentSlide) {
      // Try YouTube player
      const ytPlayer = STATE.slideshow.videoPlayers[currentItemId];
      if (ytPlayer && typeof ytPlayer.getPlayerState === 'function') {
        if (STATE.slideshow.isPaused) {
          ytPlayer.pauseVideo();
        } else {
          ytPlayer.playVideo();
        }
      }

      // Try HTML5 video
      const html5Video = currentSlide.querySelector('video');
      if (html5Video) {
        if (STATE.slideshow.isPaused) {
          html5Video.pause();
        } else {
          html5Video.play();
        }
      }
    }

    if (STATE.slideshow.isPaused) {
      STATE.slideshow.slideInterval.stop();
      pauseButton.innerHTML = '<i class="material-icons">play_arrow</i>';
      const playLabel = LocalizationUtils.getLocalizedString('Play', 'Play');
      pauseButton.setAttribute("aria-label", playLabel);
      pauseButton.setAttribute("title", playLabel);
    } else {
      // Only restart interval if we are NOT waiting for a video to end
      const currentItemId = STATE.slideshow.itemIds[STATE.slideshow.currentSlideIndex];
      const currentSlide = document.querySelector(`.slide[data-item-id="${currentItemId}"]`);
      const hasVideo = currentSlide && currentSlide.querySelector('.video-backdrop');

      if (!CONFIG.waitForTrailerToEnd || !hasVideo) {
        STATE.slideshow.slideInterval.start();
      }

      pauseButton.innerHTML = '<i class="material-icons">pause</i>';
      const pauseLabel = LocalizationUtils.getLocalizedString('ButtonPause', 'Pause');
      pauseButton.setAttribute("aria-label", pauseLabel);
      pauseButton.setAttribute("title", pauseLabel);
    }
  },

  /**
   * Stops all video playback (YouTube and HTML5)
   * Used when navigating away from the home screen
   */
  stopAllPlayback() {
    // Clear any pending autoplay timeouts
    if (STATE.slideshow.autoplayTimeouts) {
        STATE.slideshow.autoplayTimeouts.forEach(id => clearTimeout(id));
        STATE.slideshow.autoplayTimeouts = [];
    }

    // 1. Stop all YouTube players
    if (STATE.slideshow.videoPlayers) {
      Object.values(STATE.slideshow.videoPlayers).forEach(player => {
        try {
          if (player && typeof player.stopVideo === 'function') {
            player.stopVideo();
            if (typeof player.clearVideo === 'function') {
                player.clearVideo();
            }
          } else if (player && typeof player.pauseVideo === 'function') {
            player.pauseVideo();
          }
        } catch (e) {
          console.warn("🎬 Media Bar:", "Error pausing/stopping YouTube player:", e);
        }
      });
    }

    // 2. Stop and mute all HTML5 videos, release connections
    const container = document.getElementById("slides-container");
    if (container) {
      container.querySelectorAll('video').forEach(video => {
        try {
          video.pause();
          video.muted = true;
          video.currentTime = 0;
          // Save src and release HTTP streaming connection
          if (video.src && !video.getAttribute('data-src')) {
            video.setAttribute('data-src', video.src);
          }
          video.removeAttribute('src');
          video.load();
        } catch (e) {
          console.warn("🎬 Media Bar:", "Error stopping HTML5 video:", e);
        }
      });
    }
  },

  /**
   * Resumes playback for the active slide if not globally paused
   */
  resumeActivePlayback() {
    if (STATE.slideshow.isPaused) return;

    const currentItemId = STATE.slideshow.itemIds[STATE.slideshow.currentSlideIndex];
    if (!currentItemId) return;

    const currentSlide = document.querySelector(`.slide[data-item-id="${currentItemId}"]`);
    if (!currentSlide) return;

    // YouTube player: just resume, don't reload
    const ytPlayer = (STATE.slideshow.videoPlayers && STATE.slideshow.videoPlayers[currentItemId]) ? STATE.slideshow.videoPlayers[currentItemId] : undefined;
    if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
      if (STATE.slideshow.isMuted) {
        if (typeof ytPlayer.mute === 'function') ytPlayer.mute();
      } else {
        if (typeof ytPlayer.unMute === 'function') ytPlayer.unMute();
        if (typeof ytPlayer.setVolume === 'function') ytPlayer.setVolume(40);
      }
      ytPlayer.playVideo();
      return;
    }

    // HTML5 video: restore src if needed, then resume
    const html5Video = currentSlide.querySelector('video.video-backdrop');
    if (html5Video) {
      // Restore src from data-src if it was cleared to release connections
      const lazySrc = html5Video.getAttribute('data-src');
      if (lazySrc && !html5Video.src) {
        html5Video.src = lazySrc;
      }
      html5Video.muted = STATE.slideshow.isMuted;
      if (!STATE.slideshow.isMuted) html5Video.volume = 0.4;
      html5Video.play().catch(e => console.warn("🎬 Media Bar:", "Error resuming HTML5 video:", e));
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
    if (!CONFIG.enableKeyboardControls) return;

    document.addEventListener("keydown", (e) => {
      const container = document.getElementById("slides-container");
      if (!container || container.style.display === "none") {
        return;
      }

      const activeElement = document.activeElement;
      const isTvDevice = window.browser && window.browser.tv;
      const isTvLayout = window.layoutManager && window.layoutManager.tv;
      const hasTvClass = document.documentElement.classList.contains('layout-tv') || document.body.classList.contains('layout-tv');
      const isTvMode = isTvDevice || isTvLayout || hasTvClass;

      // Check Focus State
      const isBodyFocused = activeElement === document.body;
      const hasDirectFocus = container.contains(activeElement) || activeElement === container;
      
      // Determine if we should handle navigation keys (Arrows, Space, M)
      // TV Mode: Strict focus required (must be on slideshow)
      // Desktop Mode: Loose focus allowed (slideshow OR body/nothing focused)
      const canControlSlideshow = isTvMode ? hasDirectFocus : (hasDirectFocus || isBodyFocused);

      // Check for Input Fields (always ignore typing)
      const isInputElement = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.isContentEditable);
      if (isInputElement) return;

      // Check active video players (ignore if video is playing/overlay is open)
      const videoPlayer = document.querySelector('.videoPlayerContainer');
      const trailerPlayer = document.querySelector('.youtubePlayerContainer');
      const isVideoOpen = (videoPlayer && !videoPlayer.classList.contains('hide')) || (trailerPlayer && !trailerPlayer.classList.contains('hide'));
      if (isVideoOpen) return;

      switch (e.key) {
        case "ArrowRight":
          if (canControlSlideshow) {
            SlideshowManager.nextSlide();
            e.preventDefault();
          }
          break;

        case "ArrowLeft":
          if (canControlSlideshow) {
            SlideshowManager.prevSlide();
            e.preventDefault();
          }
          break;

        case " ": // Space bar
          if (canControlSlideshow) {
            this.togglePause();
            e.preventDefault();
          }
          break;

        case "m": // Mute toggle
        case "M":
          if (canControlSlideshow) {
            this.toggleMute();
            e.preventDefault();
          }
          break;

        case "Enter":
          // Enter always requires direct focus on the slideshow to avoid conflicts
          if (hasDirectFocus) {
            const currentItemId = STATE.slideshow.itemIds[STATE.slideshow.currentSlideIndex];
            if (currentItemId) {
               if (window.Emby && window.Emby.Page) {
                 Emby.Page.show(
                   `/details?id=${currentItemId}&serverId=${STATE.jellyfinData.serverId}`
                 );
               } else {
                 window.location.href = `#/details?id=${currentItemId}&serverId=${STATE.jellyfinData.serverId}`;
               }
            }
            e.preventDefault();
          }
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
   * Parses custom media IDs, handling seasonal content if enabled.
   * If Seasonal Content is enabled:
   *  - Check if any defined season matches the current date.
   *  - If match: Return IDs from that season.
   *  - If NO match: Fall back to Default Custom IDs.
   * If Custom Media IDs are enabled (and no seasonal match):
   *  - Return Default Custom IDs.
   * If no Custom Media IDs are enabled:
   *  - Return empty array (triggering random fallback).
   * @returns {string[]} Array of media IDs
   */
  parseCustomIds() {
    let idsString = CONFIG.customMediaIds;
    let usingSeasonal = false;

    if (CONFIG.enableSeasonalContent) {
      try {
        const sections = JSON.parse(CONFIG.seasonalSections || "[]");
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // 1-12
        const currentDay = currentDate.getDate(); // 1-31

        for (const section of sections) {
           const startDay = parseInt(section.StartDay);
           const startMonth = parseInt(section.StartMonth);
           const endDay = parseInt(section.EndDay);
           const endMonth = parseInt(section.EndMonth);
           
           let isInRange = false;

           if (startMonth === endMonth) {
             if (currentMonth === startMonth && currentDay >= startDay && currentDay <= endDay) {
               isInRange = true;
             }
           } else if (startMonth < endMonth) {
             // Normal range
             if (
               (currentMonth > startMonth && currentMonth < endMonth) ||
               (currentMonth === startMonth && currentDay >= startDay) ||
               (currentMonth === endMonth && currentDay <= endDay)
             ) {
               isInRange = true;
             }
           } else {
             // Wrap around year
             if (
               (currentMonth > startMonth || currentMonth < endMonth) ||
               (currentMonth === startMonth && currentDay >= startDay) ||
               (currentMonth === endMonth && currentDay <= endDay)
             ) {
               isInRange = true;
             }
           }

           if (isInRange) {
             console.log("🎬 Media Bar:", `Seasonal match found: ${section.Name}`);
             idsString = section.MediaIds;
             usingSeasonal = true;
             break; // Use first matching season
           }
        }
      } catch (e) {
        console.error("🎬 Media Bar:", "Error parsing seasonal sections in JS:", e);
      }
    }

    // If NOT using seasonal content (disabled or no match), 
    // Custom IDs are disabled, return empty to skip to random
    if (!usingSeasonal && !CONFIG.enableCustomMediaIds) {
        return [];
    }
    
    // Parse the resulting string (either seasonal or default)
    if (!idsString) return [];

    return idsString
      .split(/[\n,]/)
      .map((line) => {
        const urlMatch = line.match(/\[(.*?)\]/);
        let id = line;
        if (urlMatch) {
            const url = urlMatch[1];
            // Remove the [url] part from the ID string for parsing
            id = line.replace(/\[.*?\]/, '').trim();
            // Attempt to extract GUID if present
            const guidMatch = id.match(/([0-9a-f]{32})/i);
            if (guidMatch) {
                id = guidMatch[1];
            } else {
                // Fallback: split by pipe if used
                id = id.split('|')[0].trim();
            }
            STATE.slideshow.customTrailerUrls[id] = url;
        }
        return id.trim();
      }) 
      .map((id) => id.trim())
      .filter((id) => id);
  },

  /**
   * Resolves a list of IDs, expanding collections (BoxSets) into their children
   * @param {string[]} rawIds - List of input IDs
   * @returns {Promise<string[]>} Flattened list of item IDs
   */
  async resolveCollectionsAndItems(rawIds) {
    const finalIds = [];
    const guidRegex = /^([0-9a-f]{32})$/i;

    for (const rawId of rawIds) {
      try {
        let id = rawId;

        // If not a valid GUID, check if it starts with one (comments) or treat as a name
        if (!guidRegex.test(rawId)) {
          const guidMatch = rawId.match(/^([0-9a-f]{32})(?:[^0-9a-f]|$)/i);

          if (guidMatch) {
            id = guidMatch[1];
          } else {
            console.log("🎬 Media Bar:", `Input '${rawId}' is not a GUID, searching for Collection/Playlist by name...`);
            const resolvedId = await ApiUtils.findCollectionOrPlaylistByName(rawId);

            if (resolvedId) {
              console.log("🎬 Media Bar:", `Resolved name '${rawId}' to ID: ${resolvedId}`);
              id = resolvedId;
            } else {
              console.warn("🎬 Media Bar:", `Could not find Collection or Playlist with name: '${rawId}'`);
              continue; // Skip if resolution failed
            }
          }
        }

        const item = await ApiUtils.fetchItemDetails(id);
        if (item && (item.Type === 'BoxSet' || item.Type === 'Playlist')) {
          console.log("🎬 Media Bar:", `Found Collection/Playlist: ${id} (${item.Type}), fetching children...`);
          const children = await ApiUtils.fetchCollectionItems(id);
          finalIds.push(...children);
        } else if (item) {
          finalIds.push({ Id: item.Id, Type: item.Type });
        }
      } catch (e) {
        console.warn("🎬 Media Bar:", `Error resolving item ${rawId}:`, e);
      }
    }
    return finalIds;
  },

  /**
   * Loads slideshow data and initializes the slideshow
   */
  async loadSlideshowData() {
    try {
      STATE.slideshow.isLoading = true;
      let itemIds = [];

      // 1. Try Custom Media/Collection IDs from Config & seasonal content
      if (CONFIG.enableCustomMediaIds || CONFIG.enableSeasonalContent) {
        console.log("🎬 Media Bar:", "Using Custom Media IDs from configuration");
        const rawIds = this.parseCustomIds();
        const resolvedItems = await this.resolveCollectionsAndItems(rawIds);

        // Apply max items limit to custom IDs if enabled
        if (CONFIG.applyLimitsToCustomIds) {
            let movieCount = 0;
            let showCount = 0;
            let keptItems = [];
            
            for (const item of resolvedItems) {
                 if (keptItems.length >= CONFIG.maxItems) break;
                 
                 if (item.Type === 'Movie') {
                     if (movieCount < CONFIG.maxMovies) {
                         movieCount++;
                         keptItems.push(item);
                     }
                 } else if (item.Type === 'Series' || item.Type === 'Season' || item.Type === 'Episode') { 
                     // Count Seasons/Episodes as TV Shows
                     if (showCount < CONFIG.maxTvShows) {
                         showCount++;
                         keptItems.push(item);
                     }
                 } else {
                     // Other types: count towards total only
                     keptItems.push(item);
                 }
            }
            itemIds = keptItems.map(i => i.Id);
            console.log("🎬 Media Bar:", `Applied limits to custom IDs: ${itemIds.length} items (Movies: ${movieCount}, Shows: ${showCount})`);
        } else {
            itemIds = resolvedItems.map(i => i.Id);
        }
      }

      // 2. Fallback to server query (Random)
      if (itemIds.length === 0) {
        console.log("🎬 Media Bar:", "No custom list found, fetching random items from server...");
        itemIds = await ApiUtils.fetchItemIdsFromServer();
        
        if (CONFIG.sortBy === 'Random') {
            itemIds = SlideUtils.shuffleArray(itemIds);
        }
      } else {
        // Custom IDs
        if (CONFIG.sortBy === 'Random') {
             itemIds = SlideUtils.shuffleArray(itemIds);
        } else if (CONFIG.sortBy !== 'Original') {
            // Client-side sort required...
             console.log("🎬 Media Bar:", `Sorting ${itemIds.length} custom items by ${CONFIG.sortBy} ${CONFIG.sortOrder}`);
             const itemsWithDetails = [];
             for (const id of itemIds) {
                 const item = await ApiUtils.fetchItemDetails(id);
                 if (item) itemsWithDetails.push(item);
             }
             
             const sortedItems = SlideUtils.sortItems(itemsWithDetails, CONFIG.sortBy, CONFIG.sortOrder);
             itemIds = sortedItems.map(i => i.Id);
        }
      }

      STATE.slideshow.itemIds = itemIds;
      STATE.slideshow.totalItems = itemIds.length;

      this.createPaginationDots();

      await this.updateCurrentSlide(0);

      STATE.slideshow.slideInterval = new SlideTimer(() => {
        if (STATE.slideshow.isPaused) return;

        if (CONFIG.waitForTrailerToEnd) {
          const activeSlide = document.querySelector('.slide.active');
          const hasActiveVideo = !!(activeSlide && activeSlide.querySelector('.video-backdrop'));
          if (hasActiveVideo) return;
        }

        this.nextSlide();
      }, CONFIG.shuffleInterval);

      // Check if we should wait for trailer
      const waitForTrailer = MediaBarEnhancedSettingsManager.getSetting('waitForTrailer', CONFIG.waitForTrailerToEnd);

      if (waitForTrailer && STATE.slideshow.slideInterval) {
        const activeSlide = document.querySelector('.slide.active');
        const hasActiveVideo = !!(activeSlide && activeSlide.querySelector('.video-backdrop'));
        if (hasActiveVideo) {
          STATE.slideshow.slideInterval.stop();
        }
      }
    } catch (error) {
      console.error("🎬 Media Bar:", "Error loading slideshow data:", error);
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
    "aria-label": LocalizationUtils.getLocalizedString('ButtonPause', 'Pause'),
    title: LocalizationUtils.getLocalizedString('ButtonPause', 'Pause'),
    onclick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      SlideshowManager.togglePause();
    }
  });

  // Prevent touch events from bubbling to container
  pauseButton.addEventListener("touchstart", (e) => e.stopPropagation(), { passive: true });
  pauseButton.addEventListener("touchend", (e) => e.stopPropagation(), { passive: true });
  pauseButton.addEventListener("mousedown", (e) => e.stopPropagation());

  const muteButton = SlideUtils.createElement("div", {
    className: "mute-button",
    innerHTML: STATE.slideshow.isMuted ? '<i class="material-icons">volume_off</i>' : '<i class="material-icons">volume_up</i>',
    tabIndex: "0",
    "aria-label": STATE.slideshow.isMuted ? LocalizationUtils.getLocalizedString('Unmute', 'Unmute') : LocalizationUtils.getLocalizedString('Mute', 'Mute'),
    title: STATE.slideshow.isMuted ? LocalizationUtils.getLocalizedString('Unmute', 'Unmute') : LocalizationUtils.getLocalizedString('Mute', 'Mute'),
    style: { display: "none" },
    onclick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      SlideshowManager.toggleMute();
    }
  });

  // Prevent touch events from bubbling to container
  muteButton.addEventListener("touchstart", (e) => e.stopPropagation(), { passive: true });
  muteButton.addEventListener("touchend", (e) => e.stopPropagation(), { passive: true });
  muteButton.addEventListener("mousedown", (e) => e.stopPropagation());

  container.appendChild(leftArrow);
  container.appendChild(rightArrow);
  container.appendChild(pauseButton);
  container.appendChild(muteButton);

  const showArrows = () => {
    if (CONFIG.hideArrowsOnMobile && window.matchMedia("only screen and (max-width: 768px)").matches) {
        return; // disable arrow display on mobile
    }

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

  if (CONFIG.alwaysShowArrows) {
    showArrows();
    // Remove listeners to keep them shown
    container.removeEventListener("mouseenter", showArrows);
    container.removeEventListener("mouseleave", hideArrows);
  }

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

const MediaBarEnhancedSettingsManager = {
  initialized: false,
  
  init() {
    if (this.initialized) return;
    if (!CONFIG.enableClientSideSettings) return;

    this.initialized = true;
    this.injectSettingsIcon();
    console.log("🎬 Media Bar:", "Client-Side Settings Manager initialized.");
  },

  getSetting(key, defaultValue) {
    if (!CONFIG.enableClientSideSettings) return defaultValue;
    const value = localStorage.getItem(`mediaBarEnhanced-${key}`);
    return value !== null ? value === 'true' : defaultValue;
  },

  setSetting(key, value) {
    localStorage.setItem(`mediaBarEnhanced-${key}`, value);
  },

  createIcon() {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'paper-icon-button-light headerButton media-bar-settings-button';
    button.title = 'Media Bar Settings';
    // button.innerHTML = '<span class="material-icons">tune</span>';

    // button.innerHTML = '<img src="/MediaBarEnhanced/Resources/assets/logo_SW.svg" style="width: 24px; height: 24px; vertical-align: middle;">';
    // currently not optimal, as it's egg-shaped due to the svg format... but if it's square, it's very small...
    // button.innerHTML = '<img src="/MediaBarEnhanced/Resources/assets/logo_SW.svg" draggable="false" style="width: 52px; height: 24px; vertical-align: middle; pointer-events: none;">';
    // button.innerHTML = '<img src="/MediaBarEnhanced/Resources/assets/logo_SW_SHORT.svg" draggable="false" style="width: 41px; height: 24px; vertical-align: middle; pointer-events: none;">';
    button.innerHTML = '<img src="/MediaBarEnhanced/Resources/assets/logo_SW_MINIMAL.svg" draggable="false" style="width: 24px; height: 24px; vertical-align: middle; pointer-events: none;">';
    
    button.style.verticalAlign = 'middle';

    button.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleSettingsPopup(button);
    });

    return button;
  },

  injectSettingsIcon() {
      const observer = new MutationObserver((mutations, obs) => {
          const headerRight = document.querySelector('.headerRight');
          if (headerRight && !document.querySelector('.media-bar-settings-button')) {
              const icon = this.createIcon();
              headerRight.prepend(icon);
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
  },

  createPopup(anchorElement) {
    const existing = document.querySelector('.media-bar-settings-popup');
    if (existing) existing.remove();

    const popup = document.createElement('div');
    popup.className = 'media-bar-settings-popup dialog';

    Object.assign(popup.style, {
        position: 'fixed',
        zIndex: '10000',
        backgroundColor: '#202020',
        padding: '1em',
        borderRadius: '0.3em',
        boxShadow: '0 0 20px rgba(0,0,0,0.5)',
        minWidth: '250px',
        color: '#fff',
    });

    const rect = anchorElement.getBoundingClientRect();
    
    let rightPos = window.innerWidth - rect.right;
    if (window.innerWidth < 450 || (window.innerWidth - rightPos) < 260) {
        popup.style.right = '1rem';
        popup.style.left = 'auto';
    } else {
        popup.style.right = `${rightPos}px`;
        popup.style.left = 'auto';
    }

    popup.style.top = `${rect.bottom + 10}px`;

    const settings = [
        { key: 'enabled', label: 'Enable Media Bar Enhanced', description: 'Toggle the entire media bar visibility.', default: true },
        { key: 'videoBackdrops', label: 'Enable Trailer Backdrops', description: 'Play trailers as background videos.', default: CONFIG.enableVideoBackdrop },
        { key: 'trailerButton', label: 'Show Trailer Button', description: 'Show button to play trailer in popup (only backdrops without trailer)', default: CONFIG.showTrailerButton },
        { key: 'mobileVideo', label: 'Enable Trailer On Mobile', description: 'Allow trailer backdrops on mobile devices.', default: CONFIG.enableMobileVideo },
        { key: 'waitForTrailer', label: 'Wait For Trailer To End', description: 'Wait for the trailer to finish before changing slides.', default: CONFIG.waitForTrailerToEnd },
        { key: 'slideAnimations', label: 'Enable Animations', description: 'Enable zooming-in effect (only on background images)', default: CONFIG.slideAnimationEnabled },
    ];

    let html = '<h3 style="margin-top:0; margin-bottom:1em; border-bottom:1px solid #444; padding-bottom:0.5em;">Media Bar Settings</h3>';

    settings.forEach(setting => {
        const isChecked = this.getSetting(setting.key, setting.default);
        html += `
        <div class="checkboxContainer checkboxContainer-withDescription" style="margin-bottom: 0.5em;">
            <label class="emby-checkbox-label">
                <input id="mb-setting-${setting.key}" type="checkbox" is="emby-checkbox" class="emby-checkbox" ${isChecked ? 'checked' : ''} />
                <span class="checkboxLabel">${setting.label}</span>
            </label>
            <div class="fieldDescription">${setting.description}</div>
        </div>
        `;
    });

    // Buttons Container
    html += `
    <div style="margin-top:1em; display:flex; justify-content:flex-end; align-items:center; gap:1.5em;">
        <button is="emby-button" type="button" class="raised button-cancel emby-button" id="mb-settings-reset" title="Reset to Server Defaults">
            <span>Load Server Defaults</span>
        </button>
        <button is="emby-button" type="button" class="raised button-submit emby-button" id="mb-settings-save">
            <span>Save & Reload</span>
        </button>
    </div>
    `;

    popup.innerHTML = html;

    // Add Listeners
    settings.forEach(setting => {
        const checkbox = popup.querySelector(`#mb-setting-${setting.key}`);
        checkbox.addEventListener('change', (e) => {
            this.setSetting(setting.key, e.target.checked);
        });
    });

    // Reload Handler
    popup.querySelector('#mb-settings-save').addEventListener('click', () => {
        location.reload();
    });

    // Reset Handler
    popup.querySelector('#mb-settings-reset').addEventListener('click', () => {
        if (confirm("Reset all local Media Bar settings to server defaults?")) {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('mediaBarEnhanced-')) {
                    localStorage.removeItem(key);
                }
            });
            location.reload();
        }
    });

    const closeHandler = (e) => {
        if (!popup.contains(e.target) && e.target !== anchorElement && !anchorElement.contains(e.target)) {
            popup.remove();
            document.removeEventListener('click', closeHandler);
        }
    };
    setTimeout(() => document.addEventListener('click', closeHandler), 0);

    document.body.appendChild(popup);
  },

  toggleSettingsPopup(anchorElement) {
    const existing = document.querySelector('.media-bar-settings-popup');
    if (existing) {
        existing.remove();
    } else {
        this.createPopup(anchorElement);
    }
  }
};

/**
 * Initialize page visibility handling to pause when tab is inactive
 */
const initPageVisibilityHandler = () => {
  let wasVideoPlayingBeforeHide = false;

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      console.log("🎬 Media Bar:", "Tab inactive - pausing slideshow and videos");
      wasVideoPlayingBeforeHide = STATE.slideshow.isVideoPlaying;
      
      if (STATE.slideshow.slideInterval) {
        STATE.slideshow.slideInterval.stop();
      }
      
      // Pause active video if playing
      const currentItemId = STATE.slideshow.itemIds[STATE.slideshow.currentSlideIndex];
      if (currentItemId) {
        // YouTube
        if (STATE.slideshow.videoPlayers && STATE.slideshow.videoPlayers[currentItemId]) {
          const player = STATE.slideshow.videoPlayers[currentItemId];
          if (typeof player.pauseVideo === "function") {
            try {
              player.pauseVideo();
              STATE.slideshow.isVideoPlaying = false;
            } catch (e) {
              console.warn("🎬 Media Bar:", "Error pausing video on tab hide:", e);
            }
          } else if (player.tagName === 'VIDEO') { // HTML5 Video
             player.pause();
             STATE.slideshow.isVideoPlaying = false;
          }
        }
      }
    } else {
      console.log("🎬 Media Bar:", "Tab active - resuming slideshow");
      
      const currentItemId = STATE.slideshow.itemIds[STATE.slideshow.currentSlideIndex];
      
      // Resume video if the play signal was given (either before hiding, or timer expired while hidden)
      if (currentItemId && STATE.slideshow.currentPlayVideoLogic) {
          if (STATE.slideshow.playSignals && STATE.slideshow.playSignals[currentItemId] === true) {
             STATE.slideshow.currentPlayVideoLogic();
          }
      }

      if (!STATE.slideshow.isPaused) {
        if (wasVideoPlayingBeforeHide && currentItemId && STATE.slideshow.videoPlayers && STATE.slideshow.videoPlayers[currentItemId]) {
          const player = STATE.slideshow.videoPlayers[currentItemId];
          
          // YouTube
          if (typeof player.playVideo === "function") {
            try {
              player.playVideo();
              STATE.slideshow.isVideoPlaying = true;
            } catch (e) {
              console.warn("🎬 Media Bar:", "Error resuming video on tab show:", e);
              if (STATE.slideshow.slideInterval) {
                STATE.slideshow.slideInterval.start();
              }
            }
          } else if (player.tagName === 'VIDEO') { // HTML5 Video
             try {
                player.play().catch(e => console.warn("🎬 Media Bar:", "Error resuming HTML5 video:", e));
                STATE.slideshow.isVideoPlaying = true;
             } catch(e) { console.warn("🎬 Media Bar:", e); }
          }
        } else {
          // No video was playing, just restart interval
          const activeSlide = document.querySelector('.slide.active');
          const hasVideo = activeSlide && activeSlide.querySelector('.video-backdrop');
          
          if (CONFIG.waitForTrailerToEnd && hasVideo) {
             // Don't restart interval if waiting for trailer
          } else {
             if (STATE.slideshow.slideInterval) {
               STATE.slideshow.slideInterval.start();
             }
          }
        }
        wasVideoPlayingBeforeHide = false;
      }
    }
  });
};

/**
 * Initialize the slideshow
 */
const slidesInit = async () => {
  if (STATE.slideshow.hasInitialized) {
    console.log("🎬 Media Bar:", "⚠️ Slideshow already initialized, skipping");
    return;
  }
  
  const renderCustomOverlay = () => {
    let activeOverlayText = CONFIG.customOverlayText;
    let activeOverlayImage = CONFIG.customOverlayImageUrl;
    let isSeasonOverride = false;

    if (CONFIG.enableSeasonalContent && CONFIG.seasonalSections) {
      try {
        const sections = JSON.parse(CONFIG.seasonalSections || "[]");
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentDay = now.getDate();

        for (const section of sections) {
          const startMonth = parseInt(section.StartMonth);
          const startDay = parseInt(section.StartDay);
          const endMonth = parseInt(section.EndMonth);
          const endDay = parseInt(section.EndDay);

          let isActive = false;
          if (startMonth === endMonth) {
            if (currentMonth === startMonth && currentDay >= startDay && currentDay <= endDay) {
              isActive = true;
            }
          } else if (startMonth < endMonth) {
            if (currentMonth > startMonth && currentMonth < endMonth) {
              isActive = true;
            } else if (currentMonth === startMonth && currentDay >= startDay) {
              isActive = true;
            } else if (currentMonth === endMonth && currentDay <= endDay) {
              isActive = true;
            }
          } else { // Wraps around year
            if (currentMonth > startMonth || currentMonth < endMonth) {
              isActive = true;
            } else if (currentMonth === startMonth && currentDay >= startDay) {
              isActive = true;
            } else if (currentMonth === endMonth && currentDay <= endDay) {
              isActive = true;
            }
          }

          if (isActive) {
            if (section.OverlayText || section.OverlayImageUrl) {
                isSeasonOverride = true;
                // Season fully overrides global overlay, even if empty
                activeOverlayImage = section.OverlayImageUrl || null;
                activeOverlayText = section.OverlayText || null;
            }
            break;
          }
        }
      } catch (e) {
        console.error("🎬 Media Bar:", "Error parsing seasonal sections for overlay:", e);
      }
    }

    if (!CONFIG.enableCustomOverlay && !isSeasonOverride) {
      return; 
    }

    if (!activeOverlayText && !activeOverlayImage) return;

    const overlayContainer = document.createElement("div");
    overlayContainer.className = "custom-overlay-container";

    const overlayPriority = CONFIG.customOverlayPriority || "Image";
    const showImage = activeOverlayImage && (overlayPriority === "Image" || !activeOverlayText);
    const showText = activeOverlayText && (!showImage);

    if (showImage) {
      const img = document.createElement("img");
      const imgStyle = CONFIG.customOverlayImageStyle || "None";
      img.className = `custom-overlay-image custom-overlay-img-${imgStyle}`;
      img.src = activeOverlayImage;
      overlayContainer.appendChild(img);
    } else if (showText) {
      const p = document.createElement("p");
      p.className = `custom-overlay-text custom-overlay-style-${CONFIG.customOverlayStyle || 'Shadowed'}`;
      p.textContent = activeOverlayText;
      overlayContainer.appendChild(p);
    }

    const slidesContainer = document.getElementById("slides-container");
    if (slidesContainer) {
      const posX = CONFIG.customOverlayPositionX || 0;
      const posY = CONFIG.customOverlayPositionY || 0;
      const scaleValue = (CONFIG.customOverlayScale !== undefined ? CONFIG.customOverlayScale : 100) / 100;
      
      overlayContainer.style.setProperty('--overlay-x', `${posX}vw`);
      overlayContainer.style.setProperty('--overlay-y', `${posY}vh`);
      overlayContainer.style.setProperty('--overlay-scale', scaleValue);

      slidesContainer.appendChild(overlayContainer);
    }
  };
  
  if (CONFIG.enableClientSideSettings) {
      MediaBarEnhancedSettingsManager.init();
      const isClientSideEnabled = MediaBarEnhancedSettingsManager.getSetting('enabled', true);
      if (!isClientSideEnabled) {
          console.log("🎬 Media Bar:", "Disabled by client-side setting.");
          const homeSections = document.querySelector('.homeSectionsContainer');
          if (homeSections) {
            homeSections.style.top = '0';
            homeSections.style.marginTop = '0';
          }
          let container = document.getElementById('slides-container');
          if (container) {
            container.style.display = 'none';
          } else {
            // Create dummy container so loading screen's interval can trigger its own cleanup
            container = document.createElement('div');
            container.id = 'slides-container';
            container.style.display = 'none';
            document.body.appendChild(container);
          }
          
          return;
      }
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
    console.log("🎬 Media Bar:", "🌟 Initializing Enhanced Jellyfin Slideshow");

    initArrowNavigation();

    renderCustomOverlay();

    await SlideshowManager.loadSlideshowData();

    SlideshowManager.initTouchEvents();

    SlideshowManager.initKeyboardEvents();

    initPageVisibilityHandler();

    VisibilityObserver.init();

    console.log("🎬 Media Bar:", "✅ Enhanced Jellyfin Slideshow initialized successfully");
  } catch (error) {
    console.error("🎬 Media Bar:", "Error initializing slideshow:", error);
    STATE.slideshow.hasInitialized = false;
  }
};

window.mediaBarEnhanced = {
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

fetchPluginConfig().then(() => {
  startLoginStatusWatcher();
});
