import Header from '@/components/header'
import Footer from '@/components/footer'
const Layout = ({children} :any) =>{
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
export default Layout
