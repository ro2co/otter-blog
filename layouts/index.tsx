import Header from '@/components/header'
import Footer from '@/components/footer'
import Setting from '@/components/setting'
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
