import Footer from "./footer/footer";
import Navbar from "./navbar/navbar";

export default function Layout({ children }) {
  return (
    <div className="h-100">
      <Navbar/>
      {children}    
      <Footer />
    </div>
  );
}
