import Navbar from "./components/Navbar"
import {Routes, Route, Navigate} from "react-router-dom"
import Homepage from "./pages/Homepage"
import LoginPage from "./pages/LoginPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import SignUpPage from "./pages/SignUpPage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import {LoaderCircle} from "lucide-react"

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log({authUser})

  if(isCheckingAuth && authUser) return (

    <div className="flex items-center justify-center h-screen gap-2">
      <LoaderCircle className="animate-spin size-10" />
      <span>Loading...</span>
    </div>


  )

  return (
    <div>

      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={authUser ? <Homepage />: <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage />: <Navigate to="/login" />} />

      </Routes>

    </div>
  )
}

export default App