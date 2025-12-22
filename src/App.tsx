import Sidebar from './components/Sidebar.tsx'
import Map from './components/Map.tsx'
import SummaryHeader from './components/SummaryHeader.tsx'
import MapOverlay from './components/map/MapOverlay.tsx'

function App() {

  return (
    <div className="app-shell">
      <SummaryHeader />
      <div className="shell-body">
        <Sidebar />
        <div id="map-container">
          <Map />
          <MapOverlay />
        </div>
      </div>
    </div>
  )
}

export default App
