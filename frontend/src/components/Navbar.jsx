import { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(true)

  return (
    // Navbar
    <div className="bg-[#965D62] flex justify-between items-center px-4 h-14 md:h-16 md:px-14">
      {/* logo */}
      <div className="font-bold md:text-xl">
        ChaataawP
      </div>

      {/* navbar items */}
      {isAuthenticated ? (
        <>
          {/* Desktop Menu */}
          <div className="hidden md:flex justify-between items-center gap-3">
            <Link to={"/settings"}>
              <button className="bg-[#dedede94] px-4 py-1 rounded-xl font-bold">Settings</button>
            </Link>
            <Link to={"/profile"}>
              <button className="bg-[#dedede94] px-4 py-1 rounded-xl font-bold">Profile</button>
            </Link>
            <Link to={"/login"}>
              <button className="bg-[#dedede94] px-4 py-1 rounded-xl font-bold">Logout</button>
            </Link>
          </div>
          {/* Mobile Hamburger Menu */}
          <div className="md:hidden relative">
            <input type="checkbox" id="menu-toggle" className="hidden peer" />
            <label htmlFor="menu-toggle" className="flex flex-col justify-center items-center w-8 h-8 cursor-pointer">
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </label>
            <div className="absolute right-0 mt-3 bg-[#dedede94] rounded-lg shadow-lg z-10 w-36 flex-col items-start py-2 px-2 space-y-2 hidden peer-checked:flex">
              <Link to={"/settings"} className="w-full">
                <button className="w-full text-left px-2 py-1 rounded font-bold hover:bg-fuchsia-100">Settings</button>
              </Link>
              <Link to={"/profile"} className="w-full">
                <button className="w-full text-left px-2 py-1 rounded font-bold hover:bg-fuchsia-100">Profile</button>
              </Link>
              <Link to={"/login"} className="w-full">
                <button className="w-full text-left px-2 py-1 rounded font-bold hover:bg-fuchsia-100">Logout</button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-[#dedede94] px-4 py-1 rounded-xl ">
          <button className="font-bold">Setting</button>
        </div>
      )}
    </div>
  )
}

export default Navbar