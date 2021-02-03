import { useEffect, useState } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'

function App() {
  const [html, setHTML] = useLocalStorage('html','')
  const [css, setCSS] = useLocalStorage('css','')
  const [js, setJS] = useLocalStorage('js','')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(
            `<html>
              <body>${html}</body>
              <style>${css}</style>
              <script>${js}</script>
            </html>`
      )
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])
  return (
    <>
      <div className = "pane top-pane">
        <Editor
          language = "xml"
          displayTitle = "HTML"
          value = {html}
          onChange = {setHTML}
        />
        <Editor
          language = "css"
          displayTitle = "CSS"
          value = {css}
          onChange = {setCSS}
        />
        <Editor
          language = "javascript"
          displayTitle = "JS"
          value = {js}
          onChange = {setJS}
        />
      </div>
      <div className = "pane">
        <iframe
          srcDoc = {srcDoc}
          title = "output"
          frameBorder = "0"
          width = "100%"
          height = "100%"
          sandbox = "allow-scripts"
        />
      </div>
    </>
  )
}

export default App;
