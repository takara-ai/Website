// notebookCalc.js
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

function throttle(callback, limit) {
  let waiting = false;
  return function () {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      setTimeout(function () {
        waiting = false;
      }, limit);
    }
  };
}

// Export the initialization function
export function initNotebook() {
  adjustNotebookLines();
  window.addEventListener("resize", throttle(adjustNotebookLines, 250));
}