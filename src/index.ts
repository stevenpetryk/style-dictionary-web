import { vol } from "memfs"

import { Core } from "style-dictionary"
import { baseStyleDictionary } from "./styleDictionary"

import "../build/css/variables.css"

function updateStyleDictionary(newStyleDictionary: Core) {
  newStyleDictionary.buildAllPlatforms()

  const allFiles = vol.toJSON()
  const contents = Object.values(allFiles).join("\n\n")

  updateStylesheet(contents)
}

window.addEventListener("load", () => {
  updateStyleDictionary(baseStyleDictionary)
})

function updateStylesheet(contents: string) {
  const styleTag = document.getElementById("live-styles")!
  styleTag.innerText = contents
}

/*
 * This isn't technically needed—you can just reload the page. But I wanted
 * to emphasize that this was happening at runtime by hot reloading.
 */
// @ts-expect-error
if (module.hot) {
  // @ts-expect-error
  module.hot.accept(() => {
    console.log("Updating style dictionary")

    const newStyleDictionary = require("./styleDictionary").baseStyleDictionary
    updateStyleDictionary(newStyleDictionary)
  })
}
