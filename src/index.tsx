import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app"

function main() {
  const rootElement: HTMLElement = document.getElementById("root")!
  const root: ReactDOM.Root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}
main()
