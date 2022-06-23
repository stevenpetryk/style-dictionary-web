import StyleDictionary from "style-dictionary"

export const baseStyleDictionary = StyleDictionary.extend({
  tokens: {
    color: {
      primary: { value: "#0070f3" },
    },
  },
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "build/css/",
      files: [{ destination: "variables.css", format: "css/variables" }],
    },
  },
})
