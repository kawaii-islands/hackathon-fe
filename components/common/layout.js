import Navbar from "./navbar";
import Footer from "./footer";
import BottomNavbar from "./bottom-navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <BottomNavbar />
      <div className="layout">{children}</div>
      <Footer />
    </>
  );
}
