document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("pre > code").forEach((codeBlock, index) => {
    const pre = codeBlock.parentNode;
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.className = "highlight-wrapper"; // You can style this class in your CSS if needed

    // Create the copy button
    const button = document.createElement("button");
    button.className =
      "copy-code-button rounded bg-red-700 text-white py-1 px-2 absolute top-0 right-0 -mt-8 text-sm hover:bg-white border hover:border-black border-red-700 border-dashed hover:text-black";
    button.textContent = "Copy Code";
    button.addEventListener("click", () => {
      navigator.clipboard
        .writeText(codeBlock.textContent)
        .then(() => {
          console.log(`Code block ${index + 1} copied.`);
          button.textContent = "Copied!";
          setTimeout(() => {
            button.textContent = "Copy Code";
          }, 2000);
        })
        .catch((err) =>
          console.error(`Failed to copy code block ${index + 1}:`, err)
        );
    });

    if (pre.parentNode) {
      pre.parentNode.insertBefore(wrapper, pre); // Insert the wrapper before the pre element in the DOM
      wrapper.appendChild(pre); // Move the pre element inside the wrapper
      wrapper.appendChild(button); // Add the copy button inside the wrapper
    }
  });
});
