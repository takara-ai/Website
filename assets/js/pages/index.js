// assets/js/pages/index.js
export function initPages() {
  // Toggle language function
  function toggleLanguage() {
    var japaneseText = document.getElementById("japanese-text");
    var englishText = document.getElementById("english-text");
    var isChecked = document.getElementById("language-toggle").checked;

    if (isChecked) {
      japaneseText.style.display = "none";
      englishText.style.display = "block";
    } else {
      japaneseText.style.display = "block";
      englishText.style.display = "none";
    }
  }

  // Japanese character animation
  const japaneseCharacters = ["仕事", "壮大", "木", "切磋琢磨", "侘寂", "和"];

  function changeJapaneseText() {
    const randomIndex = Math.floor(Math.random() * japaneseCharacters.length);
    const element = document.getElementById("japanese-char");
    if (element) {
      element.textContent = japaneseCharacters[randomIndex];
    }
  }

  // Make toggleLanguage available globally
  window.toggleLanguage = toggleLanguage;
  
  // Start the animation
  setInterval(changeJapaneseText, 100);

  // Initialize the toggle event listener
  const toggle = document.getElementById("language-toggle");
  if (toggle) {
    toggle.addEventListener("change", toggleLanguage);
    // Set initial state
    toggleLanguage();
  }
}

// Auto-initialize when the DOM is ready
document.addEventListener("DOMContentLoaded", initPages);