// Import our navigation script
import { initializeNavigation } from "./global/navigation";

// Import other global scripts as needed
// import { initializeOtherFeature } from './otherFeature';

// Import the Takara Crane ASCII art display function
import { displayTakaraCrane } from "./global/takaraCrane";

// Initialize all global features
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  // initializeOtherFeature();

  // Display the Takara Crane ASCII art and hiring message
  displayTakaraCrane();
});
