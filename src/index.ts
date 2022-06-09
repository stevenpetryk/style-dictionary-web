import { fs, vol } from "memfs"

import { baseStyleDictionary } from "./styleDictionary"

window.addEventListener("load", () => {
  fs.mkdirSync("tmp")

  document.getElementById("button")?.addEventListener("click", () => {
    baseStyleDictionary.buildPlatform("css")

    console.log("test", vol.toJSON())
  })
})
