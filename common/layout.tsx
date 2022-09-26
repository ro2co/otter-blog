import Header from './header'
import Footer from "./footer"
const Layout = ({children}) =>{
  return (
    <div className="ibody">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
export default Layout
