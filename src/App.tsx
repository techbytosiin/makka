import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Mission from './pages/Mission';
import Vision from './pages/Vision';
import Academics from './pages/Academics';
import Gallery from './pages/Gallery';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}
