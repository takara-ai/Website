document.addEventListener("DOMContentLoaded", () => {
  adjustNotebookLines();
  // Throttle the resize event
  window.addEventListener("resize", throttle(adjustNotebookLines, 250));
});

function adjustNotebookLines() {
  const notebookLeft = document.querySelector(".notebook-left");
  const notebookRight = document.querySelector(".notebook-right");
  const lineHeight = 24;
  const viewportHeight = window.innerHeight;
  const numberOfLines = Math.floor(viewportHeight / lineHeight);

  // Use DocumentFragment to minimize reflows
  const fragmentLeft = document.createDocumentFragment();
  const fragmentRight = document.createDocumentFragment();

  // Create lines only if they don't exist
  createLines(fragmentLeft, numberOfLines, notebookLeft.children.length);
  createLines(fragmentRight, numberOfLines, notebookRight.children.length);

  notebookLeft.appendChild(fragmentLeft);
  notebookRight.appendChild(fragmentRight);
}

function createLines(fragment, numberOfLines, existingLines) {
  for (let i = existingLines; i < numberOfLines; i++) {
    const line = document.createElement("div");
    line.classList.add("border-b", "border-black", "border-dotted", "h-6");
    fragment.appendChild(line);
  }
}

// Throttle function to limit the number of calls to adjustNotebookLines
function throttle(callback, limit) {
  let waiting = false; // Initially, we're not waiting
  return function () {
    // We return a throttled function
    if (!waiting) {
      // If we're not waiting
      callback.apply(this, arguments); // Execute users function
      waiting = true; // Prevent future invocations
      setTimeout(function () {
        // After a period of time
        waiting = false; // And allow future invocations
      }, limit);
    }
  };
}
