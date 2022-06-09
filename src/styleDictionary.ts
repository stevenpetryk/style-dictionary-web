import StyleDictionary from "style-dictionary"

export const baseStyleDictionary = StyleDictionary.extend({
  tokens: {
    color: {
      modal: {
        footer: {
          background: {
            value: {
              dark: "red",
              light: "red",
              amoled: "red",
            },
          },
          foreground: {
            value: { dark: "red", light: "red" },
          },
        },
      },
    },
  },
  platforms: {
    css: {
      transformGroup: "css",
      files: [
        {
          format: "css/variables",
          destination: "./tmp/raw_variables.css",
          options: { outputReferences: true },
        },
      ],
    },
    kotlin: {
      transformGroup: "android",
      files: [
        {
          format: "android/resources",
          destination: "./tmp/android.kt",
        },
      ],
    },
  },
})
