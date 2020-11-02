/** @jsx jsx */
import React from "react"
import ReactDOM from "react-dom"

import { jsx } from "theme-ui"
import "./App.css"
import { ThemeProvider } from "theme-ui"
import theme from "./theme"
import { Flex } from "theme-ui"
import Confetti from "react-confetti"

import image from "./Image.svg"

function App() {
  const [showConfetti] = React.useState(false)
  const [isOpen, setOpen] = React.useState(false)

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        {showConfetti && <Confetti />}

        <main sx={styles.main}>
          {isOpen && (
            <WindowPortal onClose={() => setOpen(false)}>
              <header>content</header>
              <button onClick={() => setOpen(false)}>close</button>
            </WindowPortal>
          )}
          <Flex sx={styles.history} bg="primary">
            <img src={image} alt="ZEIT Logo" />
          </Flex>
          <Flex
            style={{ flexDirection: "column" }}
            p={4}
            sx={styles.game}
            bg="muted"
          >
            <h1>Get In</h1>
            <p>Witaj w nowym najlepszym panelu klienta jaki widział świat.</p>
            <label>
              <input type="text" />
            </label>
            <label>
              <input type="password" />
            </label>

            <button
              onClick={() => {
                setOpen(true)
                // setShowConfetti((prev) => !prev)
              }}
            >
              Zaloguj
            </button>

            <p>
              <small>
                Dokładnie sprawdzaj, czy informacje zawarte w SMSie
                autoryzacyjnym są zgodne z danymi transakcji
              </small>
            </p>
          </Flex>
        </main>
      </div>
    </ThemeProvider>
  )
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  history: {
    p: 4,
    borderRadius: 30,
    justifyContent: "center",
    overflow: "visible",
  },

  game: {
    p: 0,
    justifySelf: "center",
    maxWidth: 320,
  },
  main: {
    overflow: "visible",
    bg: "muted",
    borderRadius: 30,
    display: "grid",
    width: 1024,
    gridTemplateColumns: "324px 700px",
    height: 542,
    boxShadow:
      "0px 1px 3px rgba(0, 0, 0, 0.05), 0px 20px 40px rgba(0, 0, 0, 0.15)",
  },
  h1: { color: "primary" },
  h2: { color: "secondary" },
}

export default App

type Props = {
  onClose: () => void
  children: React.ReactNode
}

export function WindowPortal({ onClose, children }: Props) {
  const externalWindow = React.useRef<Window>(null)
  const containerEl = React.useRef(document.createElement("div"))

  React.useEffect(() => {
    // @ts-ignore
    externalWindow.current = window.open(
      "",
      "",
      "width=600,height=400,left=200,top=200"
    )
    // @ts-ignore
    externalWindow.current.document.body.appendChild(containerEl.current)
    // @ts-ignore

    externalWindow.current.addEventListener("beforeunload", () => {
      onClose()
    })

    return () => {
      onClose()
      // @ts-ignore
      externalWindow.current.close()
    }
  }, [onClose])

  return ReactDOM.createPortal(children, containerEl.current)
}
