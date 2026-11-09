import Notes from './components/notes.jsx'
import Info from './components/Info.jsx'

function App() {
  return (
    <div className="bg-[#f5f5f5] font-light text-[#111]">
      <Notes />
      <Info name="YOUR NAME" />
    </div>
  )
}
 
export default App