/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./env/layouts/**/*.html", "./env/content/**/*.md"],
  theme: {
    extend: {
      fontFamily: {
        typewriter: "monospace",
        whisper: "'Caveat', cursive",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
