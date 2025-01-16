import './App.css'
import MainCatalog from './pages/main-catalog/main-catalog'
import QRScanner from './pages/qr-scanner/qr-scanner'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Subcatalog from './pages/subcatalog/subcatalog'
import SubcatalogDetails from './pages/subcatalog-details/subcatalog-details'
import UserProfile from './pages/user-profile/user-profile'
import Cart from './pages/cart/cart'
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie'

export const setToken = (tokenName: string, newToken: string | null) => {
  if (newToken) {
    const decoded = jwtDecode(newToken)
    Cookies.set(tokenName, newToken, {
      expires: decoded.exp,
    })
    return
  }
  Cookies.remove(tokenName)
}

export const getToken = (tokenName: string) => Cookies.get(tokenName)

export const isTokenExpired = (tokenName: string) => {
  const token = getToken(tokenName)
  if (!token) return true
  const decoded = jwtDecode(token)
  const timeLeft = (decoded.exp ?? 0) - Date.now() / 1000
  return timeLeft < 15
}


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainCatalog />    
    },
    {
      path: "/buyer",
      element: <MainCatalog />    
    },
    {
      path: "/qrscan_buyer",
      element: <QRScanner />    
    },
    {
      path: "/subcatalog_buyer/:catalog_id",
      element: <Subcatalog />    
    },
    {
      path: "/subcatalog_buyer/:catalog_id/details/:details",
      element: <SubcatalogDetails />    
    },
    {
      path: "/buyer/user/:user_id",
      element: <UserProfile />    
    },

    {
      path: "/buyer/cart",
      element: <Cart />    
    },



  ])
  return (
    <div className="app">
          <RouterProvider router={router} />
    </div>
  )
}

export default App
