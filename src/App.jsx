import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landingpage  from './pages/Landingpage';
import AdminDashboard from './pages/AdminDashboard';
import LoanRegisterpage from './pages/LoanRegisterpage';
import Loginpage from './pages/Loginpage';

export default function App() {

    const router = createBrowserRouter([
        { path: "/", element: <Landingpage/>},
        { path: "/admin", element: <AdminDashboard/>},
        { path: "/LoanRegisterpage", element: <LoanRegisterpage/>},
        { path: "/Login", element: <Loginpage/>},

      ]);
      
 return  <RouterProvider router={router} />
}