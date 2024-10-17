import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import DogMarketplace from "./Pages/DogMarketplace";
import Home from "./Pages/Home";
import PetDetailPage from "./Pages/PetDetailPage";
import PetKnowledgeCards from "./Pages/PetKnowledgeCards";
import PetGallery from "./Pages/PetPage";
import PetProducts from "./Pages/ProductsPage";

function App() {
  return (
    <Router>
        <div className="container mx-auto px-0"> 
          {/* Render Navbar only on specific routes */}
          <NavbarWithCondition />
          <Routes>
            <Route path="/" element={
              <>
                <Home />
                <PetGallery />
                <PetProducts />
                <PetKnowledgeCards />
              </>
            } />
            <Route path="/dog-marketplace" element={<DogMarketplace />} />
            <Route path="/pet-detail" element={<PetDetailPage />} />
          </Routes>
          <Footer />
        </div>

    </Router>
  );
}

function NavbarWithCondition() {
  const location = useLocation();

  // Check if the current path is one of the two specified routes
  const showNavbar = location.pathname === "/dog-marketplace" || location.pathname === "/pet-detail";

  return showNavbar ? <Navbar /> : null;
}

export default App;
