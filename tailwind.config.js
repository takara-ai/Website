/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./env/layouts/**/*.html",
    "./env/content/**/*.md",
    "./env/assets/**/*.js",
    "./env/hugo.toml",
    "./env/assets/**/*.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        typewriter: "monospace",
        whisper: "'Caveat', cursive",
        japaneseBold: "Hiragino Kaku Gothic Std",
        japanese: "Hiragino Kaku Gothic ProN",
      },
      fontSize: {
        "10xl": ["12rem", { lineHeight: "1" }],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'code.language-markdown[data-lang="markdown"]': {
              whiteSpace: "pre-wrap !important",
              wordWrap: "break-word !important",
              wordBreak: "break-word !important",
              overflowWrap: "break-word !important",
              display: "block",
              maxWidth: "100%",
              overflowX: "visible",
            },
            'code.language-markdown[data-lang="markdown"] span': {
              whiteSpace: "pre-wrap !important",
              wordWrap: "break-word !important",
              wordBreak: "break-word !important",
              overflowWrap: "break-word !important",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
