document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("myForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Gather form data
    var formData = {
      fields: [
        {
          name: "firstname",
          value: document.querySelector("[name='firstname']").value,
        },
        {
          name: "lastname",
          value: document.querySelector("[name='lastname']").value,
        },
        {
          name: "email",
          value: document.querySelector("[name='email']").value,
        },
        // Add other form fields here as necessary
      ],
      // Include any additional context required by HubSpot
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    };

    // Submit the data to HubSpot's API
    fetch(
      "https://api.hsforms.com/submissions/v3/integration/submit/143915428/def51f2a-fe53-4a00-a791-1d1a62e907c7",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log("Form submitted successfully", data))
      .catch((error) => console.error("Error submitting form", error));
  });
});
