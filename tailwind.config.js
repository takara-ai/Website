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
      colors: {
        // branding pack
        fuji: "#156082",
        // takara red
        red: {
          700: "#d91009",
        },
        neutral: {
          600: "#4a4d4e",
        },
      },
      fontFamily: {
        sans: ["Lato", "sans-serif"],
        typewriter: "monospace",
        whisper: "'Caveat', cursive",
        japaneseBold: [
          "Hiragino Kaku Gothic Pro",
          "Hiragino Sans",
          "Meiryo",
          "Yu Gothic",
          "MS PGothic",
          "MS Gothic",
          "Noto Sans CJK JP",
          "sans-serif",
        ],
        japanese: [
          "Hiragino Kaku Gothic Pro",
          "Hiragino Sans",
          "Meiryo",
          "Yu Gothic",
          "MS PGothic",
          "MS Gothic",
          "Noto Sans CJK JP",
          "sans-serif",
        ],
      },
      fontSize: {
        "10xl": ["12rem", { lineHeight: "1" }],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            ".footnotes": {
              overflowWrap: "anywhere",
            },
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
