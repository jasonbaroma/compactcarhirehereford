"use client"

import * as React from "react"

type ThemeMode = "light" | "dark"

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function getPreferredTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light"
  }

  const storedTheme = window.localStorage.getItem("theme")
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.classList.toggle("dark", theme === "dark")
  window.localStorage.setItem("theme", theme)
}

function ThemeHotkey() {
  const [theme, setTheme] = React.useState<ThemeMode>("light")

  React.useEffect(() => {
    const nextTheme = getPreferredTheme()
    setTheme(nextTheme)
    applyTheme(nextTheme)
  }, [])

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      setTheme((currentTheme) => {
        const nextTheme = currentTheme === "dark" ? "light" : "dark"
        applyTheme(nextTheme)
        return nextTheme
      })
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  return null
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeHotkey />
      {children}
    </>
  )
}

export { ThemeProvider }
