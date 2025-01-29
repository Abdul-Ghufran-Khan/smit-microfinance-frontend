import React, { useState } from "react"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"

const Landingpage = () => {
  const navigate = useNavigate()
  const [showCalculator, setShowCalculator] = useState(false)
  const [selectedLoan, setSelectedLoan] = useState(null)
  const [loanAmount, setLoanAmount] = useState("")
  const [loanPeriod, setLoanPeriod] = useState("")
  const [calculationResult, setCalculationResult] = useState(null)

  const loanCategories = [
    { name: "Wedding", maxLimit: 500000, maxPeriod: 3 },
    { name: "Home Construction Loan", maxLimit: 1000000, maxPeriod: 5 },
    { name: "Business Startup Loan", maxLimit: 1000000, maxPeriod: 5 },
    { name: "Education", maxLimit: 100000, maxPeriod: 5 },
  ]

  const handleCardClick = (loan) => {
    setSelectedLoan(loan)
    setShowCalculator(true)
    setLoanAmount("")
    setLoanPeriod("")
    setCalculationResult(null)
  }

  const handleCalculation = () => {
    if (!selectedLoan || !loanAmount || !loanPeriod) return

    const amount = Number.parseFloat(loanAmount)
    const period = Number.parseFloat(loanPeriod)

    if (amount > selectedLoan.maxLimit) {
      setCalculationResult(`Loan amount exceeds the maximum limit of ${selectedLoan.maxLimit}`)
      return
    }

    if (period > selectedLoan.maxPeriod) {
      setCalculationResult(`Loan period exceeds the maximum period of ${selectedLoan.maxPeriod} years`)
      return
    }

    // Simple interest calculation (you may want to adjust this based on your specific requirements)
    const interestRate = 0.1 // 10% per year
    const totalInterest = amount * interestRate * period
    const totalAmount = amount + totalInterest
    const monthlyPayment = totalAmount / (period * 12)

    setCalculationResult(`
      Loan Amount: ${amount.toFixed(2)}
      Loan Period: ${period} years
      Total Interest: ${totalInterest.toFixed(2)}
      Total Amount to be Paid: ${totalAmount.toFixed(2)}
      Monthly Payment: ${monthlyPayment.toFixed(2)}
    `)
  }

  const handlelocalstorage = ()=>{
    localStorage.setItem("adminemail" , "admin1234@gmail.com")
    window.location.href = "/Login"
  }

  return (
    <div className="bg-gray-50 min-h-screen">
    <header className="bg-green-400 text-white py-4">
     <div className="container mx-auto flex justify-between items-center">
       <h1 className="text-2xl font-bold">Saylani Microfinance App</h1>
       <nav>
         <ul className="flex space-x-5">
           <li><a href="/" className="hover:underline">Home</a></li>
           <li><a href="/LoanRegisterpage" className="hover:underline">Loan Registeration</a></li>
           <li><a href="#" className="hover:underline">Loan Categories</a></li>
           <li><a href="#" className="hover:underline"><button onClick={handlelocalstorage} className="px-4 py-1 bg-green-700 rounded-2xl">Login</button></a></li>
         </ul>
       </nav>
     </div>
   </header>

      {/* Hero Section */}
      <section className="text-center py-20 bg-blue-100">
        <h2 className="text-4xl font-bold mb-4">Empowering You with Easy Microfinance Solutions!</h2>
        <p className="text-lg mb-6">Loans for weddings, homes, businesses, and education—all under one roof.</p>
        <button onClick={()=> navigate('/LoanRequest')} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">Loan Request</button>
      </section>

      {/* Loan Categories */}
      <section className="container mx-auto py-16">
        <h3 className="text-3xl font-bold text-center mb-8">Loan Categories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loanCategories.map((loan, index) => (
            <div
              key={index}
              className="bg-white p-6 shadow rounded-lg text-center hover:shadow-lg transition cursor-pointer"
              onClick={() => handleCardClick(loan)}
            >
              <h4 className="text-xl font-bold mb-2">{loan.name}</h4>
              <p className="text-gray-600">Explore different subcategories to suit your needs.</p>
              <p className="text-gray-600">Max Limit: PKR {loan.maxLimit.toLocaleString()}</p>
              <p className="text-gray-600">Time Period: {loan.maxPeriod} years</p>
            </div>
          ))}
        </div>
      </section>

      {/* Loan Calculator */}
      {showCalculator && (
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8">Loan Calculator - {selectedLoan.name}</h3>
            <div className="max-w-md mx-auto bg-white p-6 shadow rounded-lg">
              <form onSubmit={(e) => e.preventDefault()}>
                <label className="block mb-4">
                  <span className="text-gray-700">Loan Amount (PKR)</span>
                  <input
                    type="number"
                    className="w-full mt-2 p-2 border rounded-lg"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    max={selectedLoan.maxLimit}
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-gray-700">Loan Period (Years)</span>
                  <input
                    type="number"
                    className="w-full mt-2 p-2 border rounded-lg"
                    value={loanPeriod}
                    onChange={(e) => setLoanPeriod(e.target.value)}
                    max={selectedLoan.maxPeriod}
                  />
                </label>
                <button
                  onClick={handleCalculation}
                  type="button"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                >
                  Calculate
                </button>
              </form>
              {calculationResult && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <pre className="whitespace-pre-wrap">{calculationResult}</pre>
                  <a href="/LoanRegisterpage">
                  <button className="bg-green-400 ml-10 px-8 py-2 rounded-2xl">Proceed</button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

export default Landingpage

