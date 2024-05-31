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

// Assign toggleLanguage to the global window object
window.toggleLanguage = toggleLanguage;
// Maybe this can fix it
const japaneseCharacters = ["仕事", "壮大", "木", "切磋琢磨", "侘寂", "和"]; // Example characters

function changeJapaneseText() {
  const randomIndex = Math.floor(Math.random() * japaneseCharacters.length);
  document.getElementById("japanese-char").textContent =
    japaneseCharacters[randomIndex];
}

setInterval(changeJapaneseText, 100); // Adjust speed of changing Japanese characters
