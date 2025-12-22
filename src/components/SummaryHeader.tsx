import { useBudget } from "@/contexts/budgetProvider";

function SummaryHeader() {
  const { netBudget } = useBudget();
  return (
    <header id="summary-header" className=" p-4 flex justify-between items-center bg-primary text-white">
      <p>Live Net Budget: ${netBudget}</p>
    </header>
  )
}

export default SummaryHeader