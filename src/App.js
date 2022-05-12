import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import Home from "./components/pages/Home";
import NewProject from "./components/pages/NewProject";
import Project from "./components/pages/Project";

// import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Projects from "./components/pages/Projects";

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mx-auto xl:max-w-7xl text-#262e30">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/company" element={<Company />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/newproject" element={<NewProject />} />
                    <Route path="/project/:id" element={<Project />} />
                </Routes>
            </div>
            {/* <Footer /> */}
        </Router>
    );
}

export default App;
