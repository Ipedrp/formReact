import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './router/Login.jsx';
import Outro from './router/Outro.jsx';
import Dash from './router/Dash.jsx';


const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    //Página de error
    // errorElement: <NotFound/>,
    children: [
      {
        path: '/',
        element: <Login/>
      },
      {
        path:'outro',
        element: <Outro/>
      },
      {
        path:'dash',
        element: <Dash/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
