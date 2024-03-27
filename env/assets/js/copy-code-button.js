document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded. Searching for code blocks...");

  document.querySelectorAll("pre > code").forEach((codeBlock, index) => {
    console.log(`Processing code block ${index + 1}`);

    // Create the copy button
    const button = document.createElement("button");
    button.className =
      "copy-code-button text-red-700 font-bold py-1 px-2 rounded absolute top-0 right-0 border-dashed border border-black";
    button.textContent = "Copy";
    button.addEventListener("click", () => {
      navigator.clipboard
        .writeText(codeBlock.textContent)
        .then(() => {
          console.log(`Code block ${index + 1} copied.`);
          button.textContent = "Copied!";
          setTimeout(() => {
            button.textContent = "Copy";
          }, 2000);
        })
        .catch((err) =>
          console.error(`Failed to copy code block ${index + 1}:`, err)
        );
    });

    // Add the button to the pre element (codeBlock's parent)
    const pre = codeBlock.parentNode;
    if (pre && pre.style) {
      pre.style.position = "relative";
      pre.appendChild(button);
      console.log(`Button added to code block ${index + 1}`);
    } else {
      console.log(
        `Failed to add button to code block ${index + 1}: No parent node found.`
      );
    }
  });
});
