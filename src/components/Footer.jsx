import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white py-6 text-center">
    <p>&copy; 2025 Saylani Microfinance App. All rights reserved.</p>
    <div className="flex justify-center space-x-4 mt-2">
      <a href="#" className="hover:underline">Privacy Policy</a>
      <a href="#" className="hover:underline">Terms of Service</a>
    </div>
  </footer>
  )
}

export default Footer