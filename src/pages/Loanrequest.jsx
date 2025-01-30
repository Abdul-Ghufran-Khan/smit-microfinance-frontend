import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import jsPDF from "jspdf"
import QRCode from "qrcode"

const Loanrequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    cnic: "",
    loanAmount: "",
    loanPeriod: "",
  })
  const [receipt, setReceipt] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Generate receipt
    const receiptData = {
      ...formData,
      requestDate: new Date().toLocaleString(),
      requestId: Math.random().toString(36).substr(2, 9),
    }
    setReceipt(receiptData)
  }

  const downloadReceipt = async () => {
    const pdf = new jsPDF()

    // Add title
    pdf.setFontSize(18)
    pdf.text("Loan Request Receipt", 105, 15, { align: "center" })

    // Add receipt details
    pdf.setFontSize(12)
    const startY = 30
    const lineHeight = 15 // Increased from 10 to 15
    ;[
      `Request ID: ${receipt.requestId}`,
      `Date: ${receipt.requestDate}`,
      `Name: ${receipt.name}`,
      `CNIC: ${receipt.cnic}`,
      `Loan Amount: ${receipt.loanAmount}`,
      `Loan Period: ${receipt.loanPeriod} years`,
    ].forEach((line, index) => {
      pdf.text(line, 20, startY + index * lineHeight)
    })

    // Generate QR code
    const qrCodeData = JSON.stringify(receipt)
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(qrCodeData)
      pdf.addImage(qrCodeDataUrl, "PNG", 150, startY, 40, 40)
    } catch (error) {
      console.error("Error generating QR code:", error)
    }

    pdf.save(`loan_request_${receipt.requestId}.pdf`)
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Loan Request</h1>
        {!receipt ? (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="cnic" className="block text-gray-700 text-sm font-bold mb-2">
                  CNIC
                </label>
                <input
                  id="cnic"
                  name="cnic"
                  type="text"
                  value={formData.cnic}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="loanAmount" className="block text-gray-700 text-sm font-bold mb-2">
                  Loan Amount
                </label>
                <input
                  id="loanAmount"
                  name="loanAmount"
                  type="number"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="loanPeriod" className="block text-gray-700 text-sm font-bold mb-2">
                  Loan Period (in years)
                </label>
                <input
                  id="loanPeriod"
                  name="loanPeriod"
                  type="number"
                  value={formData.loanPeriod}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Request Loan
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-semibold mb-4">Loan Request Receipt</h2>
            <div className="space-y-5">
              <p>
                <strong>Request ID:</strong> {receipt.requestId}
              </p>
              <p>
                <strong>Date:</strong> {receipt.requestDate}
              </p>
              <p>
                <strong>Name:</strong> {receipt.name}
              </p>
              <p>
                <strong>CNIC:</strong> {receipt.cnic}
              </p>
              <p>
                <strong>Loan Amount:</strong> {receipt.loanAmount}
              </p>
              <p>
                <strong>Loan Period:</strong> {receipt.loanPeriod} years
              </p>
            </div>
            <button
              onClick={downloadReceipt}
              className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Download Receipt (PDF)
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Loanrequest

