import Layout from './Layout';
import Login from './pages/Login';
import AppliedLeaves from './pages/Applied';
import ApplyForLeave from './pages/Apply';
import Dashboard from './pages/Dashboard';
import LoginProvider from './contexts/login.context';
import { Toaster } from './components/ui/sonner';
import NotFound404 from './pages/NotFound404';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Layout> 
          <Outlet /> 
        </Layout>
      ),
      children: [
        {
          path: '/',
          element: <Dashboard />
        },
        {
          path: '/apply',
          element: <ApplyForLeave />
        }, {
          path: '/requests',
          element: <AppliedLeaves />
        },
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '*',
      element: <NotFound404 />
    }
  ]);

  return (
    <>
      <div className="relative">
          <Toaster />

          <LoginProvider>
            <RouterProvider router={router} />
          </LoginProvider>
      </div>
    </>
  )
}

export default App
