import StyleDictionary, { Platform } from "style-dictionary"

export const themes = [
  { name: "light" },
  { name: "dark" },
  { name: "amoled", extends: "dark" },
] as const

export type Theme = typeof themes[number]["name"]

export const baseStyleDictionary = StyleDictionary.extend({
  tokens: {
    color: {
      modal: {
        footer: {
          background: {
            value: {
              light: "#f5f5f5",
              dark: "#1a1a1a",
              amoled: "#0f0f0f",
            },
          },
        },
      },
      button: {
        background: {
          danger: {
            value: {
              light: "#ff0000",
              dark: "#ff0000",
              amoled: "#cc0000",
            },
          },
        },
        foreground: {
          value: {
            light: "#000000",
            dark: "#ffffff",
            amoled: "#ffffff",
          },
        },
      },
    },
  },
  transform: {
    theme: {
      type: "value",
      transitive: true,
      transformer: (token, options) =>
        getThemedToken(token, options?.options?.theme),
    },
  },
  platforms: {
    ...generateThemedPlatforms(cssPlatform),
  },
})

function generateThemedPlatforms(
  generator: (theme: Theme) => Record<string, Platform>
) {
  return themes.reduce(
    (platforms, theme) => ({ ...platforms, ...generator(theme.name) }),
    {}
  )
}

function cssPlatform(theme: Theme) {
  return {
    [`${theme}CSS`]: {
      transforms: [...StyleDictionary.transformGroup.css, "theme"],
      buildPath: `src/tokens/`,
      files: [
        {
          destination: `${theme}_variables.css`,
          format: "css/variables",
          options: { selector: `.theme-${theme}` },
        },
      ],
      options: { theme },
    },
  }
}

export function getThemedToken(
  token: any,
  themeName: any,
  usedThemes: any[] = []
): string | undefined {
  if (usedThemes.includes(themeName)) {
    throw new Error(
      `Circular theme reference on ${token.path.join(".")} (${[
        ...usedThemes,
        themeName,
      ].join(" -> ")})`
    )
  }

  const value = token.original.value[themeName]
  if (value) return value

  const theme = themes.find((t) => t.name === themeName)
  if (theme == null || !("extends" in theme)) {
    throw new Error(
      `Could not find value for ${themeName} theme on ${token.path.join(".")}`
    )
  }

  return getThemedToken(token, theme.extends, [...usedThemes, themeName])
}
