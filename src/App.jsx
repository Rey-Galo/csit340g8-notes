import { useState } from 'react'
import { SettingsContext } from './SettingsContext.js'
import Notes from './components/notes.jsx'
import Info from './components/Info.jsx'

function App() {
  const [largeText, setLargeText] = useState(false)
  return (
    <SettingsContext.Provider value={{ largeText, setLargeText }}>
      <div className="bg-[#f5f5f5] font-light text-[#111]">
        <Notes />
        <Info name="Rey Galo" />
      </div>
    </SettingsContext.Provider>
  )
}
 
export default App