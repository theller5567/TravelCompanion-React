import BudgetController from "./controls/BudgetController"
import ActivityFilter from "./controls/ActivityFilter"
import DepartureInput from "./controls/DepartureInput"
import TripDatePicker from "./controls/TripDatePicker"
import DiscoverButton from "./controls/DiscoverButton"

function Sidebar() {
  return (
    <aside id="sidebar" className="overflow-y-auto custom-scrollbar flex flex-col h-full">
        <div className="flex flex-col gap-6">
          <BudgetController />
          <DepartureInput />
          <TripDatePicker />
          <ActivityFilter />
        </div>
        
        <DiscoverButton />
    </aside>
  )
}

export default Sidebar
