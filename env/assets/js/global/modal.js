/**
 * Cookie Consent Module
 * This module handles the cookie consent functionality for the website.
 */

(function () {
  "use strict";

  // Configuration
  const COOKIE_NAME = "cookie_consent";
  const COOKIE_DURATION = 365; // days
  const GTM_KEY = "NXXB8JJH";

  /**
   * Sets a cookie with the given name, value, and expiration days.
   * @param {string} name - The name of the cookie.
   * @param {string} value - The value of the cookie.
   * @param {number} days - The number of days until the cookie expires.
   */
  function setCookie(name, value, days) {
    try {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  }

  /**
   * Gets the value of a cookie by its name.
   * @param {string} name - The name of the cookie.
   * @returns {string|null} The value of the cookie or null if not found.
   */
  function getCookie(name) {
    try {
      const nameEQ = `${name}=`;
      const ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
          return c.substring(nameEQ.length, c.length);
      }
      return null;
    } catch (error) {
      console.error("Error getting cookie:", error);
      return null;
    }
  }

  /**
   * Shows the cookie consent modal.
   */
  function showModal() {
    const modal = document.getElementById("cookie-consent-modal");
    if (modal) {
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden"; // Prevent scrolling
    }
  }

  /**
   * Hides the cookie consent modal.
   */
  function hideModal() {
    const modal = document.getElementById("cookie-consent-modal");
    if (modal) {
      modal.classList.add("hidden");
      document.body.style.overflow = ""; // Re-enable scrolling
    }
  }

  /**
   * Handles the acceptance of cookies.
   */
  function acceptCookies() {
    setCookie(COOKIE_NAME, "accepted", COOKIE_DURATION);
    hideModal();
    loadGTM();
  }

  /**
   * Handles the rejection of non-essential cookies.
   */
  function rejectCookies() {
    setCookie(COOKIE_NAME, "rejected", COOKIE_DURATION);
    hideModal();
    // Implement logic here to disable non-essential cookies/tracking
  }

  /**
   * Loads the Google Tag Manager script.
   */
  function loadGTM() {
    try {
      const script = document.createElement("script");
      script.textContent = `
                (function(w,d,s,l,i){
                    var key = '${GTM_KEY}';
                    var prefix = atob('R1RNLg==');
                    w[l]=w[l]||[];
                    w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                    var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),
                        dl=l!='dataLayer'?'&l='+l:'';
                    j.async=true;
                    j.src='/js/global/takaralytics.js?id=' + prefix + key;
                    f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_KEY}');
            `;
      document.head.appendChild(script);
    } catch (error) {
      console.error("Error loading GTM:", error);
    }
  }

  /**
   * Initializes the cookie consent functionality.
   */
  function init() {
    const consent = getCookie(COOKIE_NAME);
    if (consent === "accepted") {
      loadGTM();
    } else if (consent === null) {
      showModal();
    }

    const acceptButton = document.getElementById("accept-cookies");
    const rejectButton = document.getElementById("reject-cookies");

    if (acceptButton) {
      acceptButton.addEventListener("click", acceptCookies);
    }
    if (rejectButton) {
      rejectButton.addEventListener("click", rejectCookies);
    }
  }

  // Initialize the module when the DOM is fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
