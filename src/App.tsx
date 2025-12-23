import Sidebar from './components/Sidebar.tsx'
import InteractiveMap from './components/map/InteractiveMap.tsx'
import SummaryHeader from './components/SummaryHeader.tsx'
import MapOverlay from './components/map/MapOverlay.tsx'

function App() {

  return (
    <div className="app-shell">
      <SummaryHeader />
      <div className="shell-body">
        <Sidebar />
        <div id="map-container">
          <InteractiveMap />
          <MapOverlay />
        </div>
      </div>
    </div>
  )
}

export default App
