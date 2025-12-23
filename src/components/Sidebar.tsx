import BudgetController from "./controls/BudgetController"
import TravelNuancePanel from "./controls/TravelNuancePanel"
import ActivityFilter from "./controls/ActivityFilter"

function Sidebar() {
  return (
    <aside id="sidebar" className="overflow-y-auto custom-scrollbar">
        <BudgetController />
        <TravelNuancePanel />
        <ActivityFilter />
    </aside>
  )
}

export default Sidebar
