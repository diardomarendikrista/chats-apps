import Navbar from "Components/Navbar"

export default function Layout ({ children }) {
  return (
    <div className="pb-3">
      <Navbar />
      {children}
    </div>
  )
}