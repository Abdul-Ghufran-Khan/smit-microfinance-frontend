import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landingpage  from './pages/Landingpage';
import AdminDashboard from './pages/AdminDashboard';
import LoanRegisterpage from './pages/LoanRegisterpage';
import Loginpage from './pages/Loginpage';
import Loanrequest from './pages/Loanrequest';

export default function App() {

    const router = createBrowserRouter([
        { path: "/", element: <Landingpage/>},
        { path: "/admin", element: <AdminDashboard/>},
        { path: "/LoanRegisterpage", element: <LoanRegisterpage/>},
        { path: "/Login", element: <Loginpage/>},
        { path: "/LoanRequest", element: <Loanrequest/>},

      ]);
      
 return  <RouterProvider router={router} />
}