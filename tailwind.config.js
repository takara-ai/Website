/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./env/layouts/**/*.html", "./env/content/**/*.md"],
  theme: {
    extend: {
      fontFamily: {
        typewriter: "monospace",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
