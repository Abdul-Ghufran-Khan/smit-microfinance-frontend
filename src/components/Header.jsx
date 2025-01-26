import React from 'react'

const Header = () => {
  return (
     <header className="bg-green-400 text-white py-4">
     <div className="container mx-auto flex justify-between items-center">
       <h1 className="text-2xl font-bold">Saylani Microfinance App</h1>
       <nav>
         <ul className="flex space-x-5">
           <li><a href="/" className="hover:underline">Home</a></li>
           <li><a href="/LoanRegisterpage" className="hover:underline">Loan Registeration</a></li>
           <li><a href="#" className="hover:underline">Loan Categories</a></li>
         </ul>
       </nav>
     </div>
   </header>

  )
}

export default Header