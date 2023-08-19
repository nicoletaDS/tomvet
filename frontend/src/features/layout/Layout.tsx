import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-full min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
