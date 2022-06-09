import { vol } from "memfs"

import { baseStyleDictionary } from "./styleDictionary"

import "./tokens/light_variables.css"
import "./tokens/dark_variables.css"
import "./tokens/amoled_variables.css"

window.addEventListener("load", () => {
  baseStyleDictionary.buildAllPlatforms()

  const allFiles = vol.toJSON()

  const contents = Object.values(allFiles).join("\n\n")

  updateStylesheet(contents)
})

function updateStylesheet(contents: string) {
  const styleTag = document.getElementById("live-styles")!
  styleTag.innerText = contents
}
