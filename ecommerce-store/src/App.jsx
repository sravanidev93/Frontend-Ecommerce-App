import Layout from './components/Layout';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { useAuth } from './firebase/Auth';
import { Navigate } from 'react-router-dom';
import { AuthProvider } from './firebase/Auth';
import { Register } from './pages/Register';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
const ProtectedRoutes = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to='/login'></Navigate>
  } else {
    return children;
  }
}
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<ProtectedRoutes><Home /></ProtectedRoutes>}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="register" element={<Register />}></Route>

      <Route path="cart" element={
        <ProtectedRoutes><Cart /></ProtectedRoutes>}></Route>
      <Route path="checkout" element={
        <ProtectedRoutes><Checkout /></ProtectedRoutes>}></Route>
      <Route path='wishlist' element={
        <ProtectedRoutes><Wishlist /></ProtectedRoutes>
      }></Route>
      <Route path="profile" element={
        <ProtectedRoutes>
          <Profile/>
        </ProtectedRoutes>
      }></Route>
    </Route>
  )
)
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </AuthProvider>

  )
}

export default App
