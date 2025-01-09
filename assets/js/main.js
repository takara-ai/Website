// Import our navigation script
import { initializeNavigation } from "./global/navigation.js";

// Import other global scripts as needed
// import { initializeOtherFeature } from './otherFeature';

// Import the Takara Crane ASCII art display function
import { displayTakaraCrane } from "./global/takaraCrane.js";

// Initialize all global features
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  // initializeOtherFeature();

  // Display the Takara Crane ASCII art and hiring message
  displayTakaraCrane();
});

console.log('Main script loaded')